import { Models } from "appwrite";

export interface Note extends Models.Document {
  heading: string;
  text: string;
}
