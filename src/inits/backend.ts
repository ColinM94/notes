import { Client, Databases } from "appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("6781c73400396ac1fcd7");

const databases = new Databases(client);

export { client, databases };
