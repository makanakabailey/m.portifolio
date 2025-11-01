import { Resend } from 'resend';
import { connectToDatabase, isMongoAvailable } from '@/lib/mongodb';
import { requireAdmin } from '@/lib/auth';
import { contactFormSchema, sanitizeHtml } from '@/lib/validation';
import { rateLimit, getClientIP } from '@/lib/rate-limit';
import { mockDb } from '@/lib/mock-db';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes'),
  email: z.string()
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters')
    .toLowerCase(),
  phone: z.string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(20, 'Phone number must be less than 20 characters')
    .regex(/^[\+]?[0-9\s\-\(\)]+$/, 'Please enter a valid phone number'),
  service: z.string()
    .max(100, 'Service selection must be less than 100 characters')
    .optional(),
  message: z.string()
    .max(2000, 'Message must be less than 2000 characters')
    .optional(),
});

// GET endpoint for admin to view inquiries
export async function GET(request: Request) {
  const adminPin = request.headers.get('X-Admin-Pin');
  
  try {
    // Validate admin access
    if (!adminPin) {
      return Response.json({ error: 'Admin PIN required' }, { status: 401 });
    }
    
    requireAdmin(adminPin);
    
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '50');
    const skip = parseInt(searchParams.get('skip') || '0');
    
    // Try MongoDB first, fallback to mock database
    let inquiries, total;
    
    if (await isMongoAvailable()) {
      const { db } = await connectToDatabase();
      
      // Build filter
      const filter: any = {};
      if (status && status !== 'all') {
        filter.status = status;
      }
      
      inquiries = await db
        .collection('contactInquiries')
        .find(filter)
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip(skip)
        .toArray();
      
      total = await db.collection('contactInquiries').countDocuments(filter);
    } else {
      // Use mock database
      let allInquiries = mockDb.contacts.find();
      
      if (status && status !== 'all') {
        allInquiries = allInquiries.filter(i => i.status === status);
      }
      
      total = allInquiries.length;
      inquiries = allInquiries.slice(skip, skip + limit);
    }
    
    return Response.json({
      success: true,
      inquiries,
      total,
      hasMore: skip + limit < total
    });
  } catch (error: any) {
    console.error('Failed to fetch inquiries:', error);
    return Response.json({ 
      success: false,
      error: error.message,
      inquiries: [],
      total: 0
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    // Rate limiting
    const clientIP = getClientIP(request);
    const rateLimitResult = rateLimit(`contact:${clientIP}`, 3, 15 * 60 * 1000); // 3 requests per 15 minutes
    
    if (!rateLimitResult.success) {
      return Response.json({ 
        error: 'Too many requests. Please try again later.',
        resetTime: new Date(rateLimitResult.resetTime).toISOString()
      }, { status: 429 });
    }
    
    const body = await request.json();
    
    // Enhanced validation with sanitization
    const validated = contactFormSchema.parse({
      name: sanitizeHtml(body.name || ''),
      email: (body.email || '').toLowerCase().trim(),
      phone: (body.phone || '').trim(),
      service: body.service ? sanitizeHtml(body.service) : undefined,
      message: body.message ? sanitizeHtml(body.message) : undefined,
    });
    
    // Get additional client information for tracking
    const userAgent = request.headers.get('user-agent') || 'unknown';
    const referrer = request.headers.get('referer') || 'direct';
    
    // Parse UTM parameters if available
    const url = new URL(request.url);
    const utmSource = url.searchParams.get('utm_source');
    const utmMedium = url.searchParams.get('utm_medium');
    const utmCampaign = url.searchParams.get('utm_campaign');
    
    // Save to database
    const contactInquiry = {
      ...validated,
      status: 'new' as const,
      source: 'contact_form',
      ipAddress: clientIP,
      userAgent,
      referrer,
      utmSource,
      utmMedium,
      utmCampaign,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    let result;
    
    if (await isMongoAvailable()) {
      const { db } = await connectToDatabase();
      result = await db.collection('contactInquiries').insertOne(contactInquiry);
    } else {
      // Use mock database
      const newContact = mockDb.contacts.create({
        name: validated.name,
        email: validated.email,
        message: validated.message || `Phone: ${validated.phone}${validated.service ? `, Service: ${validated.service}` : ''}`,
        date: new Date().toISOString(),
        status: 'new' as const
      });
      result = { insertedId: newContact._id };
    }
    
    // Create email content
    const emailContent = `
New Portfolio Inquiry

Name: ${validated.name}
Email: ${validated.email}
Phone: ${validated.phone}
${validated.service ? `Service: ${validated.service}` : ''}
${validated.message ? `Message: ${validated.message}` : ''}

---
Inquiry ID: ${result.insertedId}
Source: ${contactInquiry.source}
${referrer !== 'direct' ? `Referrer: ${referrer}` : ''}
IP: ${clientIP}
Time: ${new Date().toLocaleString()}
    `;
    
    // Send email notification
    try {
      await resend.emails.send({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: [process.env.ADMIN_EMAIL!],
        replyTo: validated.email,
        subject: `New Portfolio Inquiry from ${validated.name}`,
        text: emailContent,
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Don't fail the request if email fails, inquiry is still saved
    }
    
    return Response.json({ 
      success: true, 
      message: 'Your inquiry has been sent successfully!',
      inquiryId: result.insertedId 
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ 
        error: 'Validation failed', 
        details: error.issues 
      }, { status: 400 });
    }
    
    console.error('Contact form error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}