import { connectToDatabase } from '@/lib/mongodb';
import { requireAdmin } from '@/lib/auth';

export async function POST(request: Request) {
  const adminPin = request.headers.get('X-Admin-Pin');
  
  try {
    requireAdmin(adminPin!);
  } catch (error) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    const { db } = await connectToDatabase();
    
    // Create indexes for better performance
    console.log('Creating database indexes...');
    
    // Daily posts indexes
    await db.collection('dailyPosts').createIndex({ order: 1 });
    await db.collection('dailyPosts').createIndex({ isActive: 1, order: 1 });
    await db.collection('dailyPosts').createIndex({ createdAt: -1 });
    
    // Case studies indexes
    await db.collection('caseStudies').createIndex({ slug: 1 }, { unique: true });
    await db.collection('caseStudies').createIndex({ isPublished: 1, order: 1 });
    await db.collection('caseStudies').createIndex({ tags: 1 });
    await db.collection('caseStudies').createIndex({ industry: 1 });
    await db.collection('caseStudies').createIndex({ createdAt: -1 });
    
    // Contact inquiries indexes
    await db.collection('contactInquiries').createIndex({ createdAt: -1 });
    await db.collection('contactInquiries').createIndex({ status: 1, createdAt: -1 });
    await db.collection('contactInquiries').createIndex({ email: 1 });
    
    console.log('✅ Database indexes created successfully');
    
    // Insert sample case studies if none exist
    const existingCases = await db.collection('caseStudies').countDocuments();
    if (existingCases === 0) {
      console.log('Inserting sample case studies...');
      
      const sampleCases = [
        {
          title: "Authority Builder - Business Consultant Portfolio",
          slug: "authority-builder",
          tags: ["Copywriting", "Lead Generation", "Trust Building"],
          description: "A comprehensive business consultant portfolio designed to establish authority and generate high-quality leads.",
          thumbnailUrl: "/assets/case-authority-builder.jpg",
          detailImages: [
            "/assets/detail-authority-1.jpg",
            "/assets/detail-authority-2.jpg",
            "/assets/detail-authority-3.jpg",
            "/assets/detail-authority-4.jpg",
            "/assets/detail-authority-5.jpg",
            "/assets/detail-authority-6.jpg"
          ],
          industry: "Business Consulting",
          projectType: "Portfolio Website",
          companyType: "Independent Consultant",
          services: ["Web Design", "Copywriting", "SEO", "Lead Generation"],
          order: 1,
          isPublished: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Architect Portfolio - Visual Storytelling",
          slug: "architect-portfolio",
          tags: ["Visual Design", "UX", "Architecture"],
          description: "A stunning visual portfolio showcasing architectural projects with immersive storytelling.",
          thumbnailUrl: "/assets/case-architect-portfolio.jpg",
          detailImages: [
            "/assets/detail-architect-1.jpg",
            "/assets/detail-architect-2.jpg",
            "/assets/detail-architect-3.jpg",
            "/assets/detail-architect-4.jpg",
            "/assets/detail-architect-5.jpg",
            "/assets/detail-architect-6.jpg"
          ],
          industry: "Architecture",
          projectType: "Portfolio Website",
          companyType: "Architecture Firm",
          services: ["Web Design", "Visual Design", "UX", "Photography Integration"],
          order: 2,
          isPublished: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Marketing Agency - Results Machine",
          slug: "marketing-agency",
          tags: ["ROI", "Analytics", "B2B"],
          description: "A data-driven marketing agency website focused on demonstrating ROI and client results.",
          thumbnailUrl: "/assets/case-marketing-agency.jpg",
          detailImages: [
            "/assets/detail-marketing-1.jpg",
            "/assets/detail-marketing-2.jpg",
            "/assets/detail-marketing-3.jpg",
            "/assets/detail-marketing-4.jpg",
            "/assets/detail-marketing-5.jpg",
            "/assets/detail-marketing-6.jpg"
          ],
          industry: "Marketing",
          projectType: "Agency Website",
          companyType: "Marketing Agency",
          services: ["Web Development", "Analytics", "Dashboard", "CRM Integration"],
          order: 3,
          isPublished: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ];
      
      await db.collection('caseStudies').insertMany(sampleCases);
      console.log('✅ Sample case studies inserted');
    }
    
    return Response.json({ 
      success: true,
      message: 'Database initialized successfully!',
      indexes: 'Created',
      sampleData: existingCases === 0 ? 'Inserted' : 'Already exists',
      collections: ['dailyPosts', 'caseStudies', 'contactInquiries']
    });
    
  } catch (error: any) {
    console.error('Database initialization failed:', error);
    return Response.json({ 
      success: false,
      error: error.message,
      message: 'Database initialization failed'
    }, { status: 500 });
  }
}