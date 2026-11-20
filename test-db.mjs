import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
await client.connect();
await client.db().command({ ping: 1 });
console.log("MongoDB connected ✅");
await client.close();