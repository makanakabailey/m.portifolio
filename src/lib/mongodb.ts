import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';
const options = {
  serverSelectionTimeoutMS: 5000,
  connectTimeoutMS: 10000,
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(uri, options);
    (global as any)._mongoClientPromise = client.connect();
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
  try {
    const client = await clientPromise;
    const db = client.db('portfolio');
    
    // Test the connection
    await db.admin().ping();
    
    return { client, db };
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new Error('Failed to connect to database');
  }
}

// Helper function to check if MongoDB is available
export async function isMongoAvailable(): Promise<boolean> {
  try {
    // Skip MongoDB connection if no URI provided
    if (!process.env.MONGODB_URI || process.env.MONGODB_URI === 'mongodb://localhost:27017/portfolio') {
      return false;
    }
    await connectToDatabase();
    return true;
  } catch {
    return false;
  }
}