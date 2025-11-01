import { put } from '@vercel/blob';
import { requireAdmin } from '@/lib/auth';
import { sanitizeFilename } from '@/lib/validation';

export async function POST(request: Request) {
  const adminPin = request.headers.get('X-Admin-Pin');
  
  try {
    requireAdmin(adminPin!);
  } catch (error) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    // Comprehensive file validation
    if (!file) {
      return Response.json({ error: 'No file provided' }, { status: 400 });
    }
    
    // File size validation (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      return Response.json({ 
        error: 'File too large. Maximum size is 5MB.',
        maxSize: '5MB',
        actualSize: `${(file.size / 1024 / 1024).toFixed(2)}MB`
      }, { status: 400 });
    }
    
    // File type validation
    const allowedTypes = [
      'image/jpeg', 'image/png', 'image/gif', 'image/webp',
      'video/mp4', 'video/webm', 'video/quicktime'
    ];
    
    if (!allowedTypes.includes(file.type)) {
      return Response.json({ 
        error: 'Invalid file type. Allowed: JPEG, PNG, GIF, WebP, MP4, WebM',
        allowedTypes,
        actualType: file.type
      }, { status: 400 });
    }
    
    // Filename validation and sanitization
    const sanitizedFilename = sanitizeFilename(file.name);
    const timestamp = Date.now();
    const finalFilename = `${timestamp}-${sanitizedFilename}`;
    
    // Upload to Vercel Blob
    const blob = await put(finalFilename, file, {
      access: 'public',
      addRandomSuffix: true, // Prevents filename conflicts
    });
    
    return Response.json({ 
      success: true,
      url: blob.url,
      filename: finalFilename,
      size: file.size,
      type: file.type
    });
    
  } catch (error: any) {
    console.error('Upload error:', error);
    return Response.json({ 
      error: 'Upload failed',
      message: error.message || 'Unknown error occurred'
    }, { status: 500 });
  }
}