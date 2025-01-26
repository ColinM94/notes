import { Account, Client, Databases } from "appwrite";

export const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("679618060034570be9cf");

export const databases = new Databases(client);

export const account = new Account(client);

export { ID } from "appwrite";
