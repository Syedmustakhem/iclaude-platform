import {
  MongoClient,
  type Db,
} from "mongodb";

let client: MongoClient | undefined;
let database: Db | undefined;

export async function getDatabase(env: Env): Promise<Db> {
  if (database) {
    return database;
  }

  if (!env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not configured.");
  }

  client = new MongoClient(env.MONGODB_URI);

  await client.connect();

  database = client.db("iclaude");

  return database;
}