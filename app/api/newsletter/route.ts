import { NextRequest, NextResponse } from 'next/server'
import { sendEmail, getAdminEmails } from '@/lib/mail'
import { appendToGoogleSheet } from '@/lib/google-sheets'
import { sendLeadToZyntexCRM } from '@/lib/zyntex-crm'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null)
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ success: false, error: 'Invalid data' }, { status: 400 })
    }

    const { email } = body
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email))) {
      return NextResponse.json({ success: false, error: 'Valid email address is required' }, { status: 400 })
    }

    const cleanEmail = String(email).trim().toLowerCase()

    const sourceLabel = 'Website Newsletter Subscription Form'

    // Prepare Tasks: Admin Email, Welcome Email, and Google Sheets Sync
    const tasks: Promise<any>[] = []

    // 1. Send Alert to Owner/Admin
    const adminEmails = getAdminEmails()
    if (adminEmails.length > 0) {
      tasks.push(
        sendEmail({
          to: adminEmails,
          replyTo: cleanEmail,
          subject: `📬 [${sourceLabel}] New Subscriber: ${cleanEmail}`,
          html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 620px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;">
            <div style="text-align: center; margin-bottom: 20px;">
              <span style="display: inline-block; background-color: #0b2940; color: #ffffff; padding: 4px 12px; border-radius: 50px; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px;">
                ${sourceLabel}
              </span>
              <h2 style="color: #0b2940; margin: 10px 0 4px; font-size: 22px;">📬 New Newsletter Subscriber</h2>
              <p style="color: #64748b; font-size: 13px; margin: 0;">Subscribed from Website Homepage / Footer</p>
            </div>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
            <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
              <tr>
                <td style="padding: 7px 0; color: #64748b; width: 150px;"><strong>Form / Source:</strong></td>
                <td style="padding: 7px 0; color: #00b4d8; font-weight: bold;">${sourceLabel}</td>
              </tr>
              <tr>
                <td style="padding: 7px 0; color: #64748b;"><strong>Subscriber Email:</strong></td>
                <td style="padding: 7px 0; color: #0b2940; font-weight: bold;"><a href="mailto:${cleanEmail}" style="color: #00b4d8; text-decoration: none;">${cleanEmail}</a></td>
              </tr>
              <tr>
                <td style="padding: 7px 0; color: #64748b;"><strong>Timestamp:</strong></td>
                <td style="padding: 7px 0; color: #64748b;">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} (IST)</td>
              </tr>
            </table>
          </div>
        `,
        }).catch((err) => {
          console.error('Newsletter admin notification failed:', err)
          return { success: false, error: err?.message }
        })
      )
    }

    // 2. Send Welcome Email to Subscriber
    if (cleanEmail) {
      tasks.push(
        sendEmail({
          to: cleanEmail,
          subject: `🎉 Welcome to the Tribe! (${sourceLabel}) — Travel Tribes`,
          html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 620px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;">
            <div style="text-align: center; margin-bottom: 24px;">
              <h1 style="color: #0b2940; font-size: 24px; margin: 0 0 6px;">Travel Tribes</h1>
              <p style="color: #00b4d8; font-weight: bold; font-size: 13px; margin: 0; text-transform: uppercase; letter-spacing: 1px;">Small Groups. Big Adventures.</p>
            </div>
            <div style="background-color: #f8fafc; border-radius: 12px; padding: 20px; border: 1px solid #e2e8f0; text-align: center;">
              <h2 style="color: #0b2940; font-size: 18px; margin: 0 0 10px;">You're on the list! 🎉</h2>
              <p style="color: #475569; font-size: 14px; line-height: 1.6; margin: 0;">
                Thank you for subscribing via our <strong>${sourceLabel}</strong>. You'll be the first to know about secret trail releases, long weekend trips, early bird discounts, and epic community adventures.
              </p>
            </div>
            <div style="text-align: center; margin: 24px 0;">
              <a href="https://traveltribes.in/upcoming-trips" style="display: inline-block; background-color: #0b2940; color: #ffffff; padding: 12px 24px; border-radius: 50px; font-weight: bold; text-decoration: none; font-size: 14px;">
                Explore Upcoming Trips ➔
              </a>
            </div>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
            <div style="text-align: center; color: #94a3b8; font-size: 12px;">
              <p style="margin: 0; font-weight: bold; color: #0b2940;">Travel Tribes — Tribe hai to vibe hai! 🚀</p>
            </div>
          </div>
        `,
        }).catch((err) => {
          console.error('Newsletter subscriber email failed:', err)
          return { success: false, error: err?.message }
        })
      )
    }

    // 3. Sync Newsletter Subscriber to Google Sheets
    tasks.push(
      appendToGoogleSheet({
        type: 'newsletter',
        source: 'Website Newsletter Subscription',
        email: cleanEmail,
        fullName: 'Subscriber',
        message: 'Subscribed to Travel Tribes updates'
      }).catch((err) => {
        console.error('Newsletter Google Sheets sync failed:', err)
        return { success: false, error: err?.message }
      })
    )

    // 4. Push Newsletter Subscriber to Zyntex CRM Platform
    tasks.push(
      sendLeadToZyntexCRM({
        name: 'Newsletter Subscriber',
        phone: '',
        email: cleanEmail,
        source: 'Website Newsletter Subscription',
        message: 'Subscribed to Travel Tribes travel deals & updates'
      }).catch((err) => {
        console.error('Zyntex CRM dispatch error:', err)
        return { success: false, error: err?.message }
      })
    )

    // Await all notification tasks before responding
    await Promise.allSettled(tasks)

    return NextResponse.json({
      success: true,
      message: 'Subscribed successfully',
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Newsletter API Error:', error)
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 })
  }
}
