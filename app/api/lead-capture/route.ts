import { NextRequest, NextResponse } from 'next/server'
import { sendEmail, getAdminEmails } from '@/lib/mail'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null)
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ success: false, error: 'Invalid data' }, { status: 400 })
    }

    const { fullName, phone, email, tripSlug, tripTitle } = body

    if (!fullName || !phone || !email) {
      return NextResponse.json({ success: false, error: 'Name, phone and email are required' }, { status: 400 })
    }

    // Log the captured lead for CRM / WhatsApp followups
    console.log(`[Itinerary Download Lead] Name: ${fullName}, Phone: ${phone}, Email: ${email}, Trip: ${tripTitle || tripSlug}, Date: ${new Date().toISOString()}`)

    // Send Lead Alert Email to Admin (Non-blocking)
    const adminEmails = getAdminEmails()
    if (adminEmails.length > 0) {
      sendEmail({
        to: adminEmails,
        subject: `📥 New Itinerary Download Lead: ${tripTitle || tripSlug}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
            <h2 style="color: #0b2940; margin-bottom: 4px;">📥 New Lead Captured (Itinerary PDF)</h2>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
            <p><strong>Trip:</strong> ${tripTitle || tripSlug}</p>
            <p><strong>Name:</strong> ${fullName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Date:</strong> ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
          </div>
        `,
      }).catch((err) => console.error('Lead email notification failed:', err))
    }

    return NextResponse.json({
      success: true,
      message: 'Lead captured successfully',
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Lead Capture Error:', error)
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 })
  }
}
