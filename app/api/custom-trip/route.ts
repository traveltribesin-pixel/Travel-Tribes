import { NextRequest, NextResponse } from 'next/server'
import { sendEmail, getAdminEmails } from '@/lib/mail'
import { appendToGoogleSheet } from '@/lib/google-sheets'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null)
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ success: false, error: 'Invalid data' }, { status: 400 })
    }

    const {
      destination,
      travelDates,
      groupType,
      tripVibe,
      notes,
      fullName,
      email,
      phone
    } = body

    if (!destination || !fullName || !email) {
      return NextResponse.json(
        { success: false, error: 'Destination, Name and Email are required' },
        { status: 400 }
      )
    }

    const cleanName = String(fullName).trim()
    const cleanEmail = String(email).trim().toLowerCase()
    const cleanPhone = phone ? String(phone).trim() : 'Not provided'
    const cleanDestination = String(destination).trim()
    const cleanDates = String(travelDates || 'Flexible / To be decided').trim()
    const cleanGroupType = String(groupType || 'Not specified').trim()
    const cleanTripVibe = String(tripVibe || 'Custom').trim()
    const cleanNotes = String(notes || 'None').trim()

    // 1. Send Notification Email to Owner/Admin
    const adminEmails = getAdminEmails()
    if (adminEmails.length > 0) {
      sendEmail({
        to: adminEmails,
        replyTo: cleanEmail,
        subject: `🎨 New Custom Trip Request: ${cleanDestination} (${cleanName})`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 620px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;">
            <div style="text-align: center; margin-bottom: 20px;">
              <h2 style="color: #0b2940; margin: 0; font-size: 22px;">🎨 New Custom Trip Request</h2>
              <p style="color: #64748b; font-size: 13px; margin: 4px 0 0;">Received from Custom Trip Builder on Home Page</p>
            </div>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
            <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
              <tr>
                <td style="padding: 6px 0; color: #64748b; width: 160px;"><strong>Destination:</strong></td>
                <td style="padding: 6px 0; color: #0b2940; font-weight: bold; font-size: 16px;">${cleanDestination}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b;"><strong>Travel Dates:</strong></td>
                <td style="padding: 6px 0; color: #0b2940;">${cleanDates}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b;"><strong>Who's Coming:</strong></td>
                <td style="padding: 6px 0; color: #0b2940;">${cleanGroupType}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b;"><strong>Trip Vibe / Style:</strong></td>
                <td style="padding: 6px 0; color: #0b2940;">${cleanTripVibe}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b;"><strong>Lead Name:</strong></td>
                <td style="padding: 6px 0; color: #0b2940; font-weight: bold;">${cleanName}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b;"><strong>Email:</strong></td>
                <td style="padding: 6px 0; color: #0b2940;"><a href="mailto:${cleanEmail}" style="color: #00b4d8; text-decoration: none;">${cleanEmail}</a></td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b;"><strong>WhatsApp / Phone:</strong></td>
                <td style="padding: 6px 0; color: #0b2940;"><a href="tel:${cleanPhone}" style="color: #00b4d8; text-decoration: none;">${cleanPhone}</a> (<a href="https://wa.me/${cleanPhone.replace(/[^\d]/g, '')}" style="color: #10b981; text-decoration: none;">WhatsApp</a>)</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b;"><strong>Timestamp:</strong></td>
                <td style="padding: 6px 0; color: #64748b;">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} (IST)</td>
              </tr>
            </table>
            ${cleanNotes !== 'None' ? `
            <div style="margin-top: 16px;">
              <strong style="color: #0b2940; font-size: 14px;">Additional Notes / Preferences:</strong>
              <div style="background-color: #f8fafc; padding: 14px 18px; border-left: 4px solid #00b4d8; border-radius: 6px; margin-top: 8px; font-size: 14px; color: #334155; line-height: 1.6;">
                ${cleanNotes.replace(/\n/g, '<br/>')}
              </div>
            </div>` : ''}
          </div>
        `,
      }).catch((err) => console.error('Custom trip admin notification failed:', err))
    }

    // 2. Send Confirmation Email to the User
    sendEmail({
      to: cleanEmail,
      subject: `✨ We're Planning Your Custom Trip to ${cleanDestination}! — Travel Tribes`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 620px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;">
          <div style="text-align: center; margin-bottom: 24px;">
            <h1 style="color: #0b2940; font-size: 26px; margin: 0 0 6px;">Travel Tribes</h1>
            <p style="color: #00b4d8; font-weight: bold; font-size: 13px; margin: 0; text-transform: uppercase; letter-spacing: 1px;">Small Groups. Big Adventures.</p>
          </div>
          <div style="background-color: #fdf8f6; border: 1px solid #fed7aa; border-radius: 12px; padding: 20px; text-align: center; margin-bottom: 24px;">
            <h2 style="color: #c2410c; font-size: 20px; margin: 0 0 6px;">You dream it. We plan it! 🗺️</h2>
            <p style="color: #9a3412; font-size: 14px; margin: 0;">
              Hi <strong>${cleanName}</strong>, thank you for sharing your dream trip idea for <strong>${cleanDestination}</strong>.
            </p>
          </div>
          
          <h3 style="color: #0b2940; font-size: 15px; margin: 0 0 12px; text-transform: uppercase; letter-spacing: 0.5px;">Trip Preferences Summary</h3>
          <table style="width: 100%; font-size: 14px; border-collapse: collapse; margin-bottom: 20px;">
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; color: #64748b;"><strong>Destination:</strong></td>
              <td style="padding: 10px 0; color: #0b2940; font-weight: bold; text-align: right;">${cleanDestination}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; color: #64748b;"><strong>Travel Dates:</strong></td>
              <td style="padding: 10px 0; color: #0b2940; text-align: right;">${cleanDates}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; color: #64748b;"><strong>Group Type:</strong></td>
              <td style="padding: 10px 0; color: #0b2940; text-align: right;">${cleanGroupType}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; color: #64748b;"><strong>Trip Vibe:</strong></td>
              <td style="padding: 10px 0; color: #0b2940; text-align: right;">${cleanTripVibe}</td>
            </tr>
          </table>

          <div style="background-color: #f8fafc; border-radius: 12px; padding: 16px; margin-bottom: 24px; border: 1px solid #e2e8f0;">
            <h4 style="color: #0b2940; font-size: 13px; margin: 0 0 8px; text-transform: uppercase;">What happens next?</h4>
            <p style="color: #475569; font-size: 13px; line-height: 1.6; margin: 0;">
              Our dedicated custom trip architects are crafting a tailored day-by-day itinerary, stay recommendations, and estimated quote for you. A trip designer will connect with you within 24 hours on WhatsApp / Email.
            </p>
          </div>

          <div style="text-align: center; margin: 24px 0;">
            <a href="https://wa.me/919975822023?text=Hi%20Travel%20Tribes,%20I%20requested%20a%20custom%20trip%20for%20${encodeURIComponent(cleanDestination)}.%20Please%20connect!" style="display: inline-block; background-color: #10b981; color: #ffffff; padding: 12px 24px; border-radius: 50px; font-weight: bold; text-decoration: none; font-size: 14px;">
              💬 Chat with Trip Designer on WhatsApp (+91 99758 22023)
            </a>
          </div>

          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <div style="text-align: center; color: #94a3b8; font-size: 12px;">
            <p style="margin: 0 0 4px;">Direct Helpline: <a href="tel:+919975822023" style="color: #00b4d8; text-decoration: none;">+91 99758 22023</a> | Email: <a href="mailto:hello@traveltribes.in" style="color: #00b4d8; text-decoration: none;">hello@traveltribes.in</a></p>
            <p style="margin: 0; font-weight: bold; color: #0b2940;">Travel Tribes — Tribe hai to vibe hai! 🚀</p>
          </div>
        </div>
      `,
    }).catch((err) => console.error('Custom trip user confirmation email failed:', err))

    // 3. Sync to Google Sheets (Non-blocking)
    appendToGoogleSheet({
      type: 'contact',
      firstName: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      trip: `Custom Trip: ${cleanDestination} (${cleanGroupType})`,
      message: `Dates: ${cleanDates} | Vibe: ${cleanTripVibe} | Notes: ${cleanNotes}`
    }).catch((err) => console.error('Custom trip Google Sheets sync failed:', err))

    return NextResponse.json({
      success: true,
      message: 'Custom trip request submitted successfully',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Custom Trip Error:', error)
    return NextResponse.json(
      { success: false, error: 'Server error processing custom trip request.' },
      { status: 500 }
    )
  }
}
