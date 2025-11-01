import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  try {
    console.log('Testing Resend email integration...');
    
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Test <onboarding@resend.dev>',
      to: [process.env.ADMIN_EMAIL!],
      subject: 'Portfolio Email Test - Success!',
      html: `
        <h2>🎉 Email Integration Working!</h2>
        <p>Your portfolio contact form is ready to receive inquiries.</p>
        <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
        <p><strong>From:</strong> Portfolio Application</p>
        <hr>
        <p><em>This is a test email to verify your Resend integration is working correctly.</em></p>
      `,
    });

    if (error) {
      console.error('❌ Resend error:', error);
      return Response.json({ 
        success: false, 
        error: error.message,
        message: 'Email test failed'
      }, { status: 500 });
    }

    console.log('✅ Test email sent successfully:', data);
    
    return Response.json({ 
      success: true,
      message: 'Test email sent successfully!',
      emailId: data?.id,
      to: process.env.ADMIN_EMAIL,
      timestamp: new Date().toISOString()
    });
    
  } catch (error: any) {
    console.error('❌ Email test failed:', error);
    return Response.json({ 
      success: false,
      error: error.message,
      message: 'Email test failed'
    }, { status: 500 });
  }
}