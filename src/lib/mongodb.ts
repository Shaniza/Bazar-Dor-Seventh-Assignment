import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClient: MongoClient | undefined;
}

const client =
  global._mongoClient ??
  new MongoClient(uri, {
    maxPoolSize: 5,
    serverSelectionTimeoutMS: 10000,
  });
global._mongoClient = client;

 
client.connect().catch((err) => {
  console.error("MongoDB connect error:", err.message);
});

export { client };
export const db = client.db();