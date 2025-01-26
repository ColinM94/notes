import { Models } from "appwrite";
import { DocumentMetadata } from "./general";

export interface Note extends Models.Document {
  heading: string;
  text: string;
}
