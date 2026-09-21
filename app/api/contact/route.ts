import { NextRequest, NextResponse } from 'next/server'
import { sendEmail, getAdminEmails } from '@/lib/mail'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null)
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ success: false, error: 'Invalid data' }, { status: 400 })
    }

    const { firstName, email, trip, message } = body

    if (!firstName || !email || !message) {
      return NextResponse.json({ success: false, error: 'Name, email and message are required' }, { status: 400 })
    }

    const adminEmails = getAdminEmails()
    if (adminEmails.length > 0) {
      sendEmail({
        to: adminEmails,
        replyTo: email,
        subject: `📩 New Contact Enquiry from ${firstName} (${trip || 'General'})`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
            <h2 style="color: #0b2940; margin-bottom: 4px;">📩 New Contact Enquiry</h2>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
            <p><strong>Name:</strong> ${firstName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Trip Interest:</strong> ${trip || 'General'}</p>
            <p><strong>Message:</strong></p>
            <blockquote style="background: #f8fafc; padding: 12px 16px; border-left: 4px solid #43a9d1; margin: 8px 0; font-style: normal;">
              ${message.replace(/\n/g, '<br/>')}
            </blockquote>
            <p><strong>Time:</strong> ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
          </div>
        `,
      }).catch((err) => console.error('Contact email notification failed:', err))
    }

    return NextResponse.json({
      success: true,
      message: 'Enquiry submitted successfully',
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Contact API Error:', error)
    return NextResponse.json({ success: false, error: 'Failed to submit enquiry' }, { status: 500 })
  }
}
