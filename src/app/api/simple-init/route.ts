import { connectToDatabase } from '@/lib/mongodb';

export async function GET() {
  try {
    console.log('🚀 Starting database initialization...');
    const { db } = await connectToDatabase();
    
    // Test connection
    await db.admin().ping();
    console.log('✅ Database connection successful');
    
    // Create indexes for better performance
    console.log('📊 Creating database indexes...');
    
    try {
      // Daily posts indexes
      await db.collection('dailyPosts').createIndex({ order: 1 });
      await db.collection('dailyPosts').createIndex({ isActive: 1, order: 1 });
      console.log('✅ Daily posts indexes created');
      
      // Case studies indexes
      await db.collection('caseStudies').createIndex({ slug: 1 }, { unique: true });
      await db.collection('caseStudies').createIndex({ isPublished: 1, order: 1 });
      await db.collection('caseStudies').createIndex({ tags: 1 });
      console.log('✅ Case studies indexes created');
      
      // Contact inquiries indexes
      await db.collection('contactInquiries').createIndex({ createdAt: -1 });
      await db.collection('contactInquiries').createIndex({ status: 1, createdAt: -1 });
      console.log('✅ Contact inquiries indexes created');
    } catch (indexError) {
      console.log('ℹ️ Some indexes may already exist, continuing...');
    }
    
    // Insert sample case studies if none exist
    const existingCases = await db.collection('caseStudies').countDocuments();
    console.log(`📁 Found ${existingCases} existing case studies`);
    
    if (existingCases === 0) {
      console.log('📝 Inserting sample case studies...');
      
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
      
      const result = await db.collection('caseStudies').insertMany(sampleCases);
      console.log(`✅ Inserted ${result.insertedCount} sample case studies`);
    }
    
    // Get final status
    const collections = await db.listCollections().toArray();
    const totalCases = await db.collection('caseStudies').countDocuments();
    const totalPosts = await db.collection('dailyPosts').countDocuments();
    const totalInquiries = await db.collection('contactInquiries').countDocuments();
    
    console.log('🎉 Database initialization complete!');
    
    return Response.json({ 
      success: true,
      message: 'Database initialized successfully!',
      database: 'portfolio',
      collections: collections.map(c => c.name),
      data: {
        caseStudies: totalCases,
        dailyPosts: totalPosts,
        contactInquiries: totalInquiries
      },
      timestamp: new Date().toISOString()
    });
    
  } catch (error: any) {
    console.error('❌ Database initialization failed:', error);
    return Response.json({ 
      success: false,
      error: error.message,
      message: 'Database initialization failed',
      troubleshooting: [
        'Check MongoDB connection string in .env.local',
        'Verify MongoDB Atlas cluster is running',
        'Confirm network access allows 0.0.0.0/0',
        'Check database user permissions'
      ]
    }, { status: 500 });
  }
}