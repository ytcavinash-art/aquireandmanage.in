import mongodb from 'mongodb';

const { MongoClient } = mongodb;
let clientPromise;

export async function getDatabase() {
  if (!process.env.MONGO_URI) {
    throw new Error('Database is not configured.');
  }

  if (!clientPromise) {
    const client = new MongoClient(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 8_000,
    });
    clientPromise = client.connect().catch((error) => {
      clientPromise = undefined;
      throw error;
    });
  }

  const client = await clientPromise;
  return client.db(process.env.MONGO_DB_NAME || undefined);
}
