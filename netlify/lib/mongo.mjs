import { MongoClient } from 'mongodb';

let cachedClient;
let cachedDb;

export async function getDb() {
  if (cachedDb) return cachedDb;
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI is not configured');
  if (!cachedClient) {
    cachedClient = new MongoClient(uri, { maxPoolSize: 5, serverSelectionTimeoutMS: 10000 });
    await cachedClient.connect();
  }
  cachedDb = cachedClient.db();
  await Promise.all([
    cachedDb.collection('users').createIndex({ email: 1 }, { unique: true }),
    cachedDb.collection('applications').createIndex({ trackingId: 1 }, { unique: true }),
    cachedDb.collection('applications').createIndex({ userId: 1, createdAt: -1 }),
  ]);
  return cachedDb;
}
