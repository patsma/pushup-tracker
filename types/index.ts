import type { RxDocument } from "rxdb";

export interface PushupDocType {
  id: string;
  name: string;
  state: "open" | "done";
  lastChange: number;
  createdBy: string;
}

export type RxPushupDocument = RxDocument<PushupDocType>;
