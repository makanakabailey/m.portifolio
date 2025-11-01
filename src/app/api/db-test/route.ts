import { connectToDatabase } from '@/lib/mongodb';

export async function GET() {
  try {
    console.log('Testing MongoDB connection...');
    const { db } = await connectToDatabase();
    
    // Test basic connection
    await db.admin().ping();
    console.log('✅ MongoDB connection successful');
    
    // Test collections
    const collections = await db.listCollections().toArray();
    console.log('📁 Available collections:', collections.map(c => c.name));
    
    // Test a simple operation
    const testResult = await db.collection('test').insertOne({ 
      message: 'Database connection test', 
      timestamp: new Date() 
    });
    console.log('✅ Test document inserted:', testResult.insertedId);
    
    // Clean up test document
    await db.collection('test').deleteOne({ _id: testResult.insertedId });
    console.log('🧹 Test document cleaned up');
    
    return Response.json({ 
      success: true,
      message: 'MongoDB Atlas connection successful!',
      database: 'portfolio',
      collections: collections.map(c => c.name),
      timestamp: new Date().toISOString(),
      connectionString: 'mongodb+srv://Makanaka:***@cluster0.mebby4n.mongodb.net/portfolio'
    });
    
  } catch (error: any) {
    console.error('❌ MongoDB connection failed:', error);
    
    return Response.json({ 
      success: false,
      error: error.message,
      message: 'MongoDB Atlas connection failed',
      troubleshooting: [
        'Check if password is correct in connection string',
        'Verify network access allows 0.0.0.0/0',
        'Confirm database user has read/write permissions',
        'Check if cluster is running'
      ]
    }, { status: 500 });
  }
}