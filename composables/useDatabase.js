import { useRuntimeConfig } from "#imports";
import {
  createRxDatabase,
  defaultHashSha256,
  addRxPlugin,
  randomCouchString,
  deepEqual,
  RXDB_VERSION,
} from "rxdb/plugins/core";
import {
  replicateWebRTC,
  getConnectionHandlerSimplePeer,
} from "rxdb/plugins/replication-webrtc";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";

let databasePromise = null;

export const useDatabase = async () => {
  if (databasePromise) {
    return databasePromise;
  }

  const config = useRuntimeConfig();
  const mode = config.public.mode;
  let storage = getRxStorageDexie();

  async function initDatabase() {
    if (mode === "development") {
      await import("rxdb/plugins/dev-mode").then((module) =>
        addRxPlugin(module.RxDBDevModePlugin)
      );
      await import("rxdb/plugins/validate-ajv").then((module) => {
        storage = module.wrappedValidateAjvStorage({ storage });
      });
    }

    const roomId = window.location.hash;
    if (!roomId || roomId.length < 5) {
      window.location.hash = "room-" + randomCouchString(10);
      window.location.reload();
    }
    const roomHash = await defaultHashSha256(roomId);

    const database = await createRxDatabase({
      name:
        "tpdp-" +
        RXDB_VERSION.replace(/\./g, "-") +
        "-" +
        roomHash.substring(0, 10),
      storage,
    });

    const conflictHandler = async (input) => {
      if (deepEqual(input.newDocumentState, input.realMasterState)) {
        return { isEqual: true };
      }
      return {
        isEqual: false,
        documentData:
          input.newDocumentState.lastChange > input.realMasterState.lastChange
            ? input.newDocumentState
            : input.realMasterState,
      };
    };

    await database.addCollections({
      todos: {
        schema: {
          version: 0,
          primaryKey: "id",
          type: "object",
          properties: {
            id: { type: "string", maxLength: 20 },
            pushupCount: { type: "number", minimum: 0 },
            state: { type: "string", enum: ["open", "done"], maxLength: 10 },
            lastChange: {
              type: "number",
              minimum: 0,
              maximum: 2701307494132,
              multipleOf: 1,
            },
            createdBy: {
              type: "string",
              maxLength: 50,
            },
            timestamp: {
              type: "number"
            }
          },
          required: ["id", "pushupCount", "state", "lastChange", "createdBy", "timestamp"],
          indexes: ["state", ["state", "lastChange"], "createdBy"],
        },
        conflictHandler,
      },
    });

    database.todos.preSave((d) => {
      d.lastChange = Date.now();
      return d;
    }, true);

  

    replicateWebRTC({
      collection: database.todos,
      connectionHandlerCreator: getConnectionHandlerSimplePeer({}),
      topic: roomHash.substring(0, 10),
      pull: {},
      push: {},
    }).then((replicationState) => {
      replicationState.error$.subscribe((err) => {
        console.log("replication error:");
        console.dir(err);
      });
      replicationState.peerStates$.subscribe((s) => {
        console.log("new peer states:");
        console.dir(s);
      });
    });
    return database;
  }

  databasePromise = initDatabase();
  return databasePromise;
}; 