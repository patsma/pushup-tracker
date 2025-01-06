import type { RxDocument } from "rxdb";

interface TodoDocType {
  id: string;
  name: string;
  state: "open" | "done";
  lastChange: number;
  createdBy: string;
}

export type RxTodoDocument = RxDocument<TodoDocType>;
