import { Account, Client, Databases } from "appwrite";

export const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("6781c73400396ac1fcd7");

export const databases = new Databases(client);

export const account = new Account(client);

export { ID } from "appwrite";
