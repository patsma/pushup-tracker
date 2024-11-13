import { ref } from 'vue'
import { useRuntimeConfig } from '#imports'
import {
  RxCollection,
  createRxDatabase,
  defaultHashSha256,
  addRxPlugin,
  randomCouchString,
  RxJsonSchema,
  deepEqual,
  RxConflictHandler,
  RXDB_VERSION,
  RxStorage
} from 'rxdb/plugins/core'
import {
  replicateWebRTC,
  getConnectionHandlerSimplePeer,
  SimplePeer
} from 'rxdb/plugins/replication-webrtc'
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie'
import nodeDatachannelPolyfill from 'node-datachannel'

// Singleton pattern: Store database instance to prevent multiple instantiations
let databasePromise: Promise<RxDatabase> | null = null

export const useDatabase = async () => {
  // Return existing database instance if available
  if (databasePromise) {
    return databasePromise
  }

  const config = useRuntimeConfig()
  const mode = config.public.mode as 'production' | 'development'
  // Initialize IndexedDB storage using Dexie.js
  let storage: RxStorage<any, any> = getRxStorageDexie()

  async function initDatabase() {
    // Development-only plugins for better debugging and validation
    if (mode === 'development') {
      await import('rxdb/plugins/dev-mode').then(module =>
        addRxPlugin(module.RxDBDevModePlugin)
      )
      await import('rxdb/plugins/validate-ajv').then(module => {
        storage = module.wrappedValidateAjvStorage({ storage })
      })
    }

    // Create or validate room ID from URL hash for P2P communication
    const roomId = window.location.hash
    if (!roomId || roomId.length < 5) {
      window.location.hash = 'room-' + randomCouchString(10)
      window.location.reload()
    }
    const roomHash = await defaultHashSha256(roomId)

    // Create the RxDB database with a unique name based on version and room
    const database = await createRxDatabase<{
      todos: RxCollection<TodoDocType, {}>
    }>({
      name:
        'tpdp-' +
        RXDB_VERSION.replace(/\./g, '-') +
        '-' +
        roomHash.substring(0, 10),
      storage
    })

    // Conflict resolution strategy:
    // When conflicts occur between peers, keep the version with the newest timestamp
    const conflictHandler: RxConflictHandler<TodoDocType> = async input => {
      if (deepEqual(input.newDocumentState, input.realMasterState)) {
        return { isEqual: true }
      }
      return {
        isEqual: false,
        documentData:
          input.newDocumentState.lastChange > input.realMasterState.lastChange
            ? input.newDocumentState
            : input.realMasterState
      }
    }

    // Define the todos collection with schema and conflict handler
    await database.addCollections({
      todos: {
        schema: {
          version: 0,
          primaryKey: 'id',
          type: 'object',
          properties: {
            id: {
              type: 'string',
              maxLength: 20
            },
            name: {
              type: 'string'
            },
            state: {
              type: 'string',
              enum: ['open', 'done'],
              maxLength: 10
            },
            lastChange: {
              type: 'number',
              minimum: 0,
              maximum: 2701307494132,
              multipleOf: 1
            }
          },
          required: ['id', 'name', 'state', 'lastChange'],
          indexes: ['state', ['state', 'lastChange']]
        },
        conflictHandler
      }
    })

    // Automatically update lastChange timestamp before saving
    database.todos.preSave(d => {
      d.lastChange = Date.now()
      return d
    }, true)

    // Insert initial todos if collection is empty
    await database.todos.bulkInsert(
      [
        '👋 Hello Nuxt Nation 2024!',
        "👩‍🚀 Let's explore the future of local-first apps!"
      ].map((name, idx) => ({
        id: 'todo-' + idx,
        name,
        lastChange: 0,
        state: 'open'
      }))
    )

    // Setup WebRTC peer-to-peer replication
    replicateWebRTC<TodoDocType, SimplePeer>({
      collection: database.todos,
      connectionHandlerCreator: getConnectionHandlerSimplePeer({}),
      topic: roomHash.substring(0, 10),
      pull: {},
      push: {}
    }).then(replicationState => {
      // Subscribe to replication errors and peer state changes
      replicationState.error$.subscribe((err: any) => {
        console.log('replication error:')
        console.dir(err)
      })
      replicationState.peerStates$.subscribe(s => {
        console.log('new peer states:')
        console.dir(s)
      })
    })
    return database
  }

  // Store the promise of database creation
  databasePromise = initDatabase()

  return databasePromise
}
