import { connectToDatabase } from '@/lib/mongodb';
import { requireAdmin } from '@/lib/auth';
import { ObjectId } from 'mongodb';
import { del } from '@vercel/blob';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const adminPin = request.headers.get('X-Admin-Pin');
  
  try {
    requireAdmin(adminPin!);
    
    const { db } = await connectToDatabase();
    const post = await db.collection('dailyPosts').findOne({ _id: new ObjectId(id) });
    
    if (!post) {
      return Response.json({ error: 'Post not found' }, { status: 404 });
    }
    
    // Delete file from Vercel Blob if exists
    if (post.mediaUrl && post.mediaUrl.includes('blob.vercel-storage.com')) {
      await del(post.mediaUrl);
    }
    
    await db.collection('dailyPosts').deleteOne({ _id: new ObjectId(id) });
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}

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
    
    const result = await db.collection('dailyPosts').updateOne(
      { _id: new ObjectId(id) },
      { 
        $set: { 
          ...body, 
          updatedAt: new Date() 
        } 
      }
    );
    
    if (result.matchedCount === 0) {
      return Response.json({ error: 'Post not found' }, { status: 404 });
    }
    
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: 'Failed to update post' }, { status: 500 });
  }
}