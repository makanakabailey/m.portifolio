import { connectToDatabase } from '@/lib/mongodb';

export async function GET() {
  try {
    // Test database connection
    const { db } = await connectToDatabase();
    
    // Test basic database operation
    const collections = await db.listCollections().toArray();
    
    return Response.json({ 
      success: true, 
      message: 'Backend is working!',
      database: 'Connected',
      collections: collections.map(c => c.name),
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Database connection error:', error);
    return Response.json({ 
      success: false, 
      message: 'Database connection failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      note: 'Make sure MongoDB Atlas is configured in .env.local'
    }, { status: 500 });
  }
}