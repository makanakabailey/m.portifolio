import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Check environment variables
    const mongoUri = process.env.MONGODB_URI;
    
    if (!mongoUri) {
      return NextResponse.json({ 
        success: false,
        error: 'MONGODB_URI environment variable not set'
      }, { status: 500 });
    }

    // Mask the password in the URI for logging
    const maskedUri = mongoUri.replace(/:([^:@]+)@/, ':***@');
    
    return NextResponse.json({ 
      success: true,
      message: 'Environment check passed',
      mongoUri: maskedUri,
      nodeEnv: process.env.NODE_ENV
    });
    
  } catch (error: any) {
    return NextResponse.json({ 
      success: false,
      error: error.message
    }, { status: 500 });
  }
}