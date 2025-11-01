import { connectToDatabase } from '@/lib/mongodb';
import { requireAdmin } from '@/lib/auth';
import { ObjectId } from 'mongodb';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const adminPin = request.headers.get('X-Admin-Pin');
  
  try {
    requireAdmin(adminPin!);
    
    const { db } = await connectToDatabase();
    const body = await request.json();
    
    const updateData: any = {
      ...body,
      updatedAt: new Date()
    };
    
    // If status is being changed to 'contacted', set contactedAt
    if (body.status === 'contacted') {
      updateData.contactedAt = new Date();
    }
    
    const result = await db.collection('contactInquiries').updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );
    
    if (result.matchedCount === 0) {
      return Response.json({ error: 'Inquiry not found' }, { status: 404 });
    }
    
    return Response.json({ success: true });
  } catch (error: any) {
    console.error('Failed to update inquiry:', error);
    return Response.json({ error: 'Failed to update inquiry' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const adminPin = request.headers.get('X-Admin-Pin');
  
  try {
    requireAdmin(adminPin!);
    
    const { db } = await connectToDatabase();
    const result = await db.collection('contactInquiries').deleteOne({ 
      _id: new ObjectId(id) 
    });
    
    if (result.deletedCount === 0) {
      return Response.json({ error: 'Inquiry not found' }, { status: 404 });
    }
    
    return Response.json({ success: true });
  } catch (error: any) {
    console.error('Failed to delete inquiry:', error);
    return Response.json({ error: 'Failed to delete inquiry' }, { status: 500 });
  }
}