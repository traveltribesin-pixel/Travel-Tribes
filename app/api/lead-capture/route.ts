import { NextRequest, NextResponse } from 'next/server'
import { sendEmail, getAdminEmails } from '@/lib/mail'
import { appendToGoogleSheet } from '@/lib/google-sheets'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null)
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ success: false, error: 'Invalid data' }, { status: 400 })
    }

    const { formSource, fullName, phone, email, tripSlug, tripTitle } = body

    if (!fullName || !phone || !email) {
      return NextResponse.json({ success: false, error: 'Name, phone and email are required' }, { status: 400 })
    }

    const cleanName = String(fullName).trim()
    const cleanEmail = String(email).trim().toLowerCase()
    const cleanPhone = String(phone).trim()
    const tripName = String(tripTitle || tripSlug || 'Upcoming Trip').trim()
    const sourceLabel = String(formSource || 'Itinerary PDF Download Form').trim()

    // Log the captured lead for CRM / WhatsApp followups
    console.log(`[Lead Capture] Source: ${sourceLabel}, Name: ${cleanName}, Phone: ${cleanPhone}, Email: ${cleanEmail}, Trip: ${tripName}, Date: ${new Date().toISOString()}`)

    // Prepare Tasks: Admin Email, User Confirmation Email, and Google Sheets Sync
    const tasks: Promise<any>[] = []

    // 1. Send Lead Alert Email to Admin/Owner
    const adminEmails = getAdminEmails()
    if (adminEmails.length > 0) {
      tasks.push(
        sendEmail({
          to: adminEmails,
          replyTo: cleanEmail,
          subject: `📥 [${sourceLabel}] New Lead: ${tripName} (${cleanName})`,
          html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 620px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;">
            <div style="text-align: center; margin-bottom: 20px;">
              <span style="display: inline-block; background-color: #0b2940; color: #ffffff; padding: 4px 12px; border-radius: 50px; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px;">
                ${sourceLabel}
              </span>
              <h2 style="color: #0b2940; margin: 10px 0 4px; font-size: 22px;">📥 New Lead: Itinerary Download</h2>
              <p style="color: #64748b; font-size: 13px; margin: 0;">Captured via <strong>${sourceLabel}</strong></p>
            </div>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
            <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
              <tr>
                <td style="padding: 7px 0; color: #64748b; width: 150px;"><strong>Form / Source:</strong></td>
                <td style="padding: 7px 0; color: #00b4d8; font-weight: bold;">${sourceLabel}</td>
              </tr>
              <tr>
                <td style="padding: 7px 0; color: #64748b;"><strong>Trip Destination:</strong></td>
                <td style="padding: 7px 0; color: #0b2940; font-weight: bold; font-size: 16px;">${tripName}</td>
              </tr>
              <tr>
                <td style="padding: 7px 0; color: #64748b;"><strong>Full Name:</strong></td>
                <td style="padding: 7px 0; color: #0b2940; font-weight: bold;">${cleanName}</td>
              </tr>
              <tr>
                <td style="padding: 7px 0; color: #64748b;"><strong>WhatsApp / Phone:</strong></td>
                <td style="padding: 7px 0; color: #0b2940;">
                  <a href="tel:${cleanPhone}" style="color: #00b4d8; text-decoration: none; font-weight: bold;">${cleanPhone}</a> 
                  (<a href="https://wa.me/${cleanPhone.replace(/[^\d]/g, '')}" style="color: #10b981; text-decoration: none; font-weight: bold;">Chat on WhatsApp</a>)
                </td>
              </tr>
              <tr>
                <td style="padding: 7px 0; color: #64748b;"><strong>Email:</strong></td>
                <td style="padding: 7px 0; color: #0b2940;"><a href="mailto:${cleanEmail}" style="color: #00b4d8; text-decoration: none;">${cleanEmail}</a></td>
              </tr>
              <tr>
                <td style="padding: 7px 0; color: #64748b;"><strong>Timestamp:</strong></td>
                <td style="padding: 7px 0; color: #64748b;">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} (IST)</td>
              </tr>
            </table>
            <div style="margin-top: 24px; padding: 14px; background-color: #f0f9ff; border: 1px solid #bae6fd; border-radius: 10px; font-size: 12px; color: #0369a1;">
              💡 <strong>Action Suggested:</strong> Follow up with ${cleanName} on WhatsApp (<a href="https://wa.me/${cleanPhone.replace(/[^\d]/g, '')}" style="color: #0284c7; font-weight: bold;">Click to open WhatsApp</a>) or Email regarding upcoming batch dates and seat availability.
            </div>
          </div>
        `,
        }).catch((err) => {
          console.error('Lead admin email notification failed:', err)
          return { success: false, error: err?.message }
        })
      )
    }

    // 2. Send Friendly Confirmation & Itinerary Email to the User
    if (cleanEmail) {
      tasks.push(
        sendEmail({
          to: cleanEmail,
          subject: `🎒 Your Itinerary Guide for ${tripName} — Travel Tribes`,
          html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 620px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;">
            <div style="text-align: center; margin-bottom: 24px;">
              <h1 style="color: #0b2940; font-size: 24px; margin: 0 0 6px;">Travel Tribes</h1>
              <p style="color: #00b4d8; font-weight: bold; font-size: 13px; margin: 0; text-transform: uppercase; letter-spacing: 1px;">Small Groups. Big Adventures.</p>
            </div>
            <div style="background-color: #f8fafc; border-radius: 12px; padding: 20px; border: 1px solid #e2e8f0; margin-bottom: 20px;">
              <h2 style="color: #0b2940; font-size: 18px; margin: 0 0 10px;">Hi ${cleanName}, thank you for exploring with us! ✨</h2>
              <p style="color: #475569; font-size: 14px; line-height: 1.6; margin: 0;">
                Your requested itinerary details for <strong>${tripName}</strong> have been downloaded via our <strong>${sourceLabel}</strong>. We are excited to welcome you into the Tribe!
              </p>
            </div>
            <div style="padding: 16px; background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; margin-bottom: 20px;">
              <h3 style="color: #166534; font-size: 14px; margin: 0 0 8px;">What's Included on Travel Tribes Trips?</h3>
              <ul style="color: #15803d; font-size: 13px; line-height: 1.6; margin: 0; padding-left: 20px;">
                <li>Curated boutique stays & authentic local experiences</li>
                <li>Comfortable transfers & guided sightseeing</li>
                <li>Experienced Trip Captains ensuring safety & great group vibes</li>
                <li>Solo-friendly community with lifelong travel friendships</li>
              </ul>
            </div>
            <div style="text-align: center; margin: 28px 0;">
              <a href="https://wa.me/919975822023?text=Hi%20Travel%20Tribes,%20I%20downloaded%20the%20itinerary%20for%20${encodeURIComponent(tripName)}%20and%20would%20like%20to%20know%20more%20about%20upcoming%20batches!" style="display: inline-block; background-color: #10b981; color: #ffffff; padding: 12px 24px; border-radius: 50px; font-weight: bold; text-decoration: none; font-size: 14px;">
                💬 Chat with us on WhatsApp (+91 99758 22023)
              </a>
            </div>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
            <div style="text-align: center; color: #94a3b8; font-size: 12px;">
              <p style="margin: 0 0 4px;">Have questions? Reply directly to this email or call us at <a href="tel:+919975822023" style="color: #00b4d8; text-decoration: none;">+91 99758 22023</a>.</p>
              <p style="margin: 0; font-weight: bold; color: #0b2940;">Tribe hai to vibe hai! 🚀</p>
            </div>
          </div>
        `,
        }).catch((err) => {
          console.error('Lead user confirmation email failed:', err)
          return { success: false, error: err?.message }
        })
      )
    }

    // 3. Sync Lead Data to Google Sheets
    tasks.push(
      appendToGoogleSheet({
        type: 'lead',
        fullName: cleanName,
        phone: cleanPhone,
        email: cleanEmail,
        tripTitle: `${sourceLabel}: ${tripName}`,
        tripSlug: tripSlug || ''
      }).catch((err) => {
        console.error('Lead Google Sheets sync failed:', err)
        return { success: false, error: err?.message }
      })
    )

    // Await all notification tasks before responding
    await Promise.allSettled(tasks)

    return NextResponse.json({
      success: true,
      message: 'Lead captured and emails dispatched successfully',
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Lead Capture Error:', error)
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 })
  }
}
