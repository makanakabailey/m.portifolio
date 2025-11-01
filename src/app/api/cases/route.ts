import { connectToDatabase, isMongoAvailable } from '@/lib/mongodb';
import { requireAdmin } from '@/lib/auth';
import { mockDb } from '@/lib/mock-db';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const industry = searchParams.get('industry');
    const tags = searchParams.get('tags');
    
    // Try MongoDB first, fallback to mock database
    if (await isMongoAvailable()) {
      const { db } = await connectToDatabase();
      
      // Build filter query
      const filter: any = { isPublished: true };
      
      if (industry && industry !== 'All') {
        filter.industry = { $regex: industry, $options: 'i' };
      }
      
      if (tags && tags !== 'All') {
        filter.tags = { $in: [tags] };
      }
      
      const cases = await db
        .collection('caseStudies')
        .find(filter)
        .sort({ order: 1, createdAt: -1 })
        .toArray();
      
      return Response.json(cases);
    } else {
      // Use mock database
      let cases = mockDb.cases.find();
      
      // Apply filters
      if (industry && industry !== 'All') {
        cases = cases.filter(c => c.tags.some(tag => 
          tag.toLowerCase().includes(industry.toLowerCase())
        ));
      }
      
      if (tags && tags !== 'All') {
        cases = cases.filter(c => c.tags.includes(tags));
      }
      
      return Response.json(cases);
    }
  } catch (error) {
    console.error('Failed to fetch cases:', error);
    // Fallback to mock database
    const cases = mockDb.cases.find();
    return Response.json(cases);
  }
}

export async function POST(request: NextRequest) {
  const adminPin = request.headers.get('X-Admin-Pin');
  
  try {
    requireAdmin(adminPin!);
    
    const { db } = await connectToDatabase();
    const body = await request.json();
    
    // Generate slug from title
    const slug = body.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    
    // Check if slug already exists
    const existingCase = await db.collection('caseStudies').findOne({ slug });
    if (existingCase) {
      return Response.json({ error: 'Case with this title already exists' }, { status: 400 });
    }
    
    const newCase = {
      ...body,
      slug,
      createdAt: new Date(),
      updatedAt: new Date(),
      isPublished: true,
      order: 0
    };
    
    const result = await db.collection('caseStudies').insertOne(newCase);
    return Response.json({ id: result.insertedId, ...newCase });
  } catch (error) {
    console.error('Failed to create case:', error);
    return Response.json({ error: 'Failed to create case' }, { status: 500 });
  }
}