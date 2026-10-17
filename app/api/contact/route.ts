import { NextRequest, NextResponse } from 'next/server'
import { sendEmail, getAdminEmails } from '@/lib/mail'
import { appendToGoogleSheet } from '@/lib/google-sheets'
import { addLead } from '@/lib/crm-store'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null)
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ success: false, error: 'Invalid data' }, { status: 400 })
    }

    const { formSource, firstName, email, phone, trip, message } = body

    if (!firstName || !email || !message) {
      return NextResponse.json({ success: false, error: 'Name, email and message are required' }, { status: 400 })
    }

    const cleanName = String(firstName).trim()
    const cleanEmail = String(email).trim().toLowerCase()
    const cleanPhone = phone ? String(phone).trim() : 'Not provided'
    const tripInterest = String(trip || 'General Enquiry').trim()
    const cleanMessage = String(message).trim()
    const sourceLabel = String(formSource || 'Contact Us Page Form').trim()

    // Prepare Tasks: Admin Email, User Confirmation Email, and Google Sheets Sync
    const tasks: Promise<any>[] = []

    // 1. Send Notification Email to Owner/Admin
    const adminEmails = getAdminEmails()
    if (adminEmails.length > 0) {
      tasks.push(
        sendEmail({
          to: adminEmails,
          replyTo: cleanEmail,
          subject: `📩 [${sourceLabel}] New Enquiry: ${cleanName} (${tripInterest})`,
          html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 620px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;">
            <div style="text-align: center; margin-bottom: 20px;">
              <span style="display: inline-block; background-color: #0b2940; color: #ffffff; padding: 4px 12px; border-radius: 50px; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px;">
                ${sourceLabel}
              </span>
              <h2 style="color: #0b2940; margin: 10px 0 4px; font-size: 22px;">📩 New Contact Form Enquiry</h2>
              <p style="color: #64748b; font-size: 13px; margin: 0;">Received from <strong>traveltribes.in/contact</strong></p>
            </div>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
            <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
              <tr>
                <td style="padding: 7px 0; color: #64748b; width: 150px;"><strong>Form / Source:</strong></td>
                <td style="padding: 7px 0; color: #00b4d8; font-weight: bold;">${sourceLabel}</td>
              </tr>
              <tr>
                <td style="padding: 7px 0; color: #64748b;"><strong>Name:</strong></td>
                <td style="padding: 7px 0; color: #0b2940; font-weight: bold;">${cleanName}</td>
              </tr>
              <tr>
                <td style="padding: 7px 0; color: #64748b;"><strong>WhatsApp / Phone:</strong></td>
                <td style="padding: 7px 0; color: #0b2940;">
                  <a href="tel:${cleanPhone}" style="color: #00b4d8; text-decoration: none; font-weight: bold;">${cleanPhone}</a> 
                  ${cleanPhone !== 'Not provided' ? `(<a href="https://wa.me/${cleanPhone.replace(/[^\d]/g, '')}" style="color: #10b981; text-decoration: none; font-weight: bold;">WhatsApp</a>)` : ''}
                </td>
              </tr>
              <tr>
                <td style="padding: 7px 0; color: #64748b;"><strong>Email:</strong></td>
                <td style="padding: 7px 0; color: #0b2940;"><a href="mailto:${cleanEmail}" style="color: #00b4d8; text-decoration: none;">${cleanEmail}</a></td>
              </tr>
              <tr>
                <td style="padding: 7px 0; color: #64748b;"><strong>Trip Interest:</strong></td>
                <td style="padding: 7px 0; color: #0b2940; font-weight: bold;">${tripInterest}</td>
              </tr>
              <tr>
                <td style="padding: 7px 0; color: #64748b;"><strong>Timestamp:</strong></td>
                <td style="padding: 7px 0; color: #64748b;">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} (IST)</td>
              </tr>
            </table>
            <div style="margin-top: 16px;">
              <strong style="color: #0b2940; font-size: 13px; text-transform: uppercase;">Message Content:</strong>
              <div style="background-color: #f8fafc; padding: 14px 18px; border-left: 4px solid #00b4d8; border-radius: 6px; margin-top: 6px; font-size: 14px; color: #334155; line-height: 1.6;">
                ${cleanMessage.replace(/\n/g, '<br/>')}
              </div>
            </div>
            <div style="margin-top: 24px; padding: 14px; background-color: #f0f9ff; border: 1px solid #bae6fd; border-radius: 10px; font-size: 12px; color: #0369a1;">
              💡 <strong>Action Required:</strong> Please reply to ${cleanName} via WhatsApp or Email within 24 hours.
            </div>
          </div>
        `,
        }).catch((err) => {
          console.error('Contact admin notification failed:', err)
          return { success: false, error: err?.message }
        })
      )
    }

    // 2. Send Friendly Auto-Acknowledgement Email to the User
    if (cleanEmail) {
      tasks.push(
        sendEmail({
          to: cleanEmail,
          subject: `👋 We've received your inquiry via ${sourceLabel}, ${cleanName}! — Travel Tribes`,
          html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 620px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;">
            <div style="text-align: center; margin-bottom: 24px;">
              <h1 style="color: #0b2940; font-size: 24px; margin: 0 0 6px;">Travel Tribes</h1>
              <p style="color: #00b4d8; font-weight: bold; font-size: 13px; margin: 0; text-transform: uppercase; letter-spacing: 1px;">Small Groups. Big Adventures.</p>
            </div>
            <div style="background-color: #f8fafc; border-radius: 12px; padding: 20px; border: 1px solid #e2e8f0; margin-bottom: 20px;">
              <h2 style="color: #0b2940; font-size: 18px; margin: 0 0 10px;">Hi ${cleanName}, thank you for reaching out! 🙌</h2>
              <p style="color: #475569; font-size: 14px; line-height: 1.6; margin: 0;">
                We have received your enquiry submitted through the <strong>${sourceLabel}</strong> regarding <strong>${tripInterest}</strong>. A dedicated trip designer is reviewing your note and will get back to you within 24 hours.
              </p>
            </div>
            <div style="padding: 16px; background-color: #f1f5f9; border-radius: 10px; margin-bottom: 20px;">
              <strong style="color: #475569; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Summary of your message:</strong>
              <p style="color: #1e293b; font-size: 13px; font-style: italic; margin: 8px 0 0; line-height: 1.5;">
                "${cleanMessage}"
              </p>
            </div>
            <div style="text-align: center; margin: 24px 0;">
              <p style="font-size: 13px; color: #64748b; margin-bottom: 12px;">Need instant answers or customized planning?</p>
              <a href="https://wa.me/919975822023?text=Hi%20Travel%20Tribes,%20I%20sent%20a%20message%20regarding%20${encodeURIComponent(tripInterest)}.%20Please%20connect!" style="display: inline-block; background-color: #10b981; color: #ffffff; padding: 12px 24px; border-radius: 50px; font-weight: bold; text-decoration: none; font-size: 14px;">
                💬 Chat with us directly on WhatsApp (+91 99758 22023)
              </a>
            </div>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
            <div style="text-align: center; color: #94a3b8; font-size: 12px;">
              <p style="margin: 0 0 4px;">Direct Helpline: <a href="tel:+919975822023" style="color: #00b4d8; text-decoration: none;">+91 99758 22023</a> | Email: <a href="mailto:hello@traveltribes.in" style="color: #00b4d8; text-decoration: none;">hello@traveltribes.in</a></p>
              <p style="margin: 0; font-weight: bold; color: #0b2940;">Tribe hai to vibe hai! 🌍</p>
            </div>
          </div>
        `,
        }).catch((err) => {
          console.error('Contact user confirmation email failed:', err)
          return { success: false, error: err?.message }
        })
      )
    }

    // 3. Sync Contact Enquiry to Google Sheets
    tasks.push(
      appendToGoogleSheet({
        type: 'contact',
        source: sourceLabel || 'Contact Us Page',
        fullName: cleanName,
        email: cleanEmail,
        phone: cleanPhone !== 'Not provided' ? cleanPhone : '',
        tripTitle: tripInterest,
        message: cleanMessage
      }).catch((err) => {
        console.error('Contact Google Sheets sync failed:', err)
        return { success: false, error: err?.message }
      })
    )

    // 4. Save into Built-in CRM Store
    try {
      addLead({
        fullName: cleanName,
        email: cleanEmail,
        phone: cleanPhone !== 'Not provided' ? cleanPhone : '',
        source: sourceLabel,
        tripTitle: tripInterest,
        message: cleanMessage,
        priority: 'HIGH'
      })
    } catch (crmErr) {
      console.error('CRM lead store failed:', crmErr)
    }

    // Await all notification tasks to complete before responding
    await Promise.allSettled(tasks)

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
