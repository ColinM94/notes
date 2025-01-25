import { DocumentMetadata } from "./general";

export interface Note extends DocumentMetadata {
  heading: string;
  text: string;
}
