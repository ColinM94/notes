import { DatabaseRecord } from "./general";

export interface Task extends DatabaseRecord {
  name: string;
  description: string;
  type: "once" | "daily" | "weekly" | "monthly";
  completed: boolean;
}
