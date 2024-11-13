import { RxDocument } from 'rxdb/plugins/core'

export type TodoDocType = {
  id: string
  name: string
  state: 'open' | 'done'
  lastChange: number
}

export type RxTodoDocument = RxDocument<TodoDocType>
