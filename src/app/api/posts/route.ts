import { connectToDatabase, isMongoAvailable } from '@/lib/mongodb';
import { requireAdmin } from '@/lib/auth';
import { dailyPostSchema, sanitizeHtml } from '@/lib/validation';
import { mockDb } from '@/lib/mock-db';
import { NextRequest } from 'next/server';
import { z } from 'zod';

export async function GET() {
  try {
    // Try MongoDB first, fallback to mock database
    if (await isMongoAvailable()) {
      const { db } = await connectToDatabase();
      const posts = await db
        .collection('dailyPosts')
        .find({ isActive: true })
        .sort({ order: 1 })
        .limit(4)
        .toArray();
      
      return Response.json(posts);
    } else {
      // Use mock database
      const posts = mockDb.posts.find().slice(0, 4);
      return Response.json(posts);
    }
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    // Fallback to mock database
    const posts = mockDb.posts.find().slice(0, 4);
    return Response.json(posts);
  }
}

export async function POST(request: NextRequest) {
  const adminPin = request.headers.get('X-Admin-Pin');
  
  try {
    requireAdmin(adminPin!);
    
    const { db } = await connectToDatabase();
    const body = await request.json();
    
    // Validate input data
    const validatedData = dailyPostSchema.parse({
      ...body,
      title: sanitizeHtml(body.title || ''),
      description: sanitizeHtml(body.description || ''),
      order: body.order || 0,
      isActive: body.isActive !== false
    });
    
    // Check if we already have 4 posts
    const existingCount = await db.collection('dailyPosts').countDocuments({ isActive: true });
    if (existingCount >= 4) {
      return Response.json({ error: 'Maximum 4 posts allowed' }, { status: 400 });
    }
    
    const newPost = {
      ...validatedData,
      order: existingCount,
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true
    };
    
    const result = await db.collection('dailyPosts').insertOne(newPost);
    return Response.json({ id: result.insertedId, ...newPost });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return Response.json({ 
        error: 'Validation failed', 
        details: error.issues 
      }, { status: 400 });
    }
    console.error('Failed to create post:', error);
    return Response.json({ error: 'Failed to create post' }, { status: 500 });
  }
}