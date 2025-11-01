import { connectToDatabase } from '@/lib/mongodb';

export async function GET() {
  try {
    console.log('🧪 Creating test contact inquiry...');
    
    const { db } = await connectToDatabase();
    
    const testInquiry = {
      name: "Test User",
      email: "test@example.com",
      phone: "+1234567890",
      service: "Complete Package",
      message: "This is a test inquiry to verify the contact system is working properly.",
      status: 'new' as const,
      source: 'test_api',
      ipAddress: '127.0.0.1',
      userAgent: 'Test Agent',
      referrer: 'direct',
      utmSource: null,
      utmMedium: null,
      utmCampaign: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    const result = await db.collection('contactInquiries').insertOne(testInquiry);
    console.log('✅ Test inquiry created:', result.insertedId);
    
    return Response.json({ 
      success: true,
      message: 'Test contact inquiry created successfully!',
      inquiryId: result.insertedId,
      inquiry: testInquiry
    });
    
  } catch (error: any) {
    console.error('❌ Failed to create test inquiry:', error);
    return Response.json({ 
      success: false,
      error: error.message,
      message: 'Failed to create test inquiry'
    }, { status: 500 });
  }
}