import { connectToDatabase } from '@/lib/mongodb';
import { requireAdmin } from '@/lib/auth';
import { del } from '@vercel/blob';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  try {
    const { db } = await connectToDatabase();
    const caseStudy = await db.collection('caseStudies').findOne({ 
      slug: slug,
      isPublished: true 
    });
    
    if (!caseStudy) {
      return Response.json({ error: 'Case study not found' }, { status: 404 });
    }
    
    return Response.json(caseStudy);
  } catch (error) {
    console.error('Failed to fetch case study:', error);
    return Response.json({ error: 'Failed to fetch case study' }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const adminPin = request.headers.get('X-Admin-Pin');
  
  try {
    requireAdmin(adminPin!);
    
    const { db } = await connectToDatabase();
    const body = await request.json();
    
    const result = await db.collection('caseStudies').updateOne(
      { slug: slug },
      { 
        $set: { 
          ...body, 
          updatedAt: new Date() 
        } 
      }
    );
    
    if (result.matchedCount === 0) {
      return Response.json({ error: 'Case study not found' }, { status: 404 });
    }
    
    return Response.json({ success: true });
  } catch (error) {
    console.error('Failed to update case study:', error);
    return Response.json({ error: 'Failed to update case study' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const adminPin = request.headers.get('X-Admin-Pin');
  
  try {
    requireAdmin(adminPin!);
    
    const { db } = await connectToDatabase();
    const caseStudy = await db.collection('caseStudies').findOne({ slug: slug });
    
    if (!caseStudy) {
      return Response.json({ error: 'Case study not found' }, { status: 404 });
    }
    
    // Delete images from Vercel Blob if they exist
    const allImages = [caseStudy.thumbnailUrl, ...(caseStudy.detailImages || [])];
    for (const imageUrl of allImages) {
      if (imageUrl && imageUrl.includes('blob.vercel-storage.com')) {
        try {
          await del(imageUrl);
        } catch (deleteError) {
          console.error('Failed to delete image:', deleteError);
        }
      }
    }
    
    await db.collection('caseStudies').deleteOne({ slug: slug });
    return Response.json({ success: true });
  } catch (error) {
    console.error('Failed to delete case study:', error);
    return Response.json({ error: 'Failed to delete case study' }, { status: 500 });
  }
}