import { NextRequest, NextResponse } from 'next/server'
import { calculateBookingPricing } from '@/lib/pricing-calculator'
import { sendEmail, getAdminEmails } from '@/lib/mail'
import { appendToGoogleSheet } from '@/lib/google-sheets'

// Simple in-memory rate limiting map for basic DDoS/spam prevention
const requestCounts = new Map<string, { count: number; timestamp: number }>()

function isRateLimited(ip: string, maxRequests: number = 20, windowMs: number = 60000): boolean {
  const now = Date.now()
  const record = requestCounts.get(ip)
  
  if (!record || now - record.timestamp > windowMs) {
    requestCounts.set(ip, { count: 1, timestamp: now })
    return false
  }
  
  if (record.count >= maxRequests) {
    return true
  }
  
  record.count++
  return false
}

// Input sanitizer to prevent XSS / script injection
function sanitizeString(input: unknown, maxLength: number = 250): string {
  if (typeof input !== 'string') return ''
  return input
    .replace(/[<>]/g, '') // remove html bracket injection
    .trim()
    .slice(0, maxLength)
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/[^\d]/g, '')
  return digits.length >= 10 && digits.length <= 15
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1'
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please try again in a minute.' },
        { status: 429 }
      )
    }

    const body = await req.json().catch(() => null)
    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { success: false, error: 'Invalid request body.' },
        { status: 400 }
      )
    }

    // 1. Sanitize Traveller Details
    const fullName = sanitizeString(body.fullName, 100)
    const email = sanitizeString(body.email, 120).toLowerCase()
    const phone = sanitizeString(body.phone, 30)
    const ageNum = parseInt(String(body.age || ''), 10)
    const age = (!isNaN(ageNum) && ageNum >= 1 && ageNum <= 120) ? ageNum : null
    const city = sanitizeString(body.city, 80)
    const specialRequest = sanitizeString(body.specialRequest, 500)
    const date = sanitizeString(body.date, 60)
    const couponCode = sanitizeString(body.couponCode, 30)

    if (!fullName || fullName.length < 2) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid full name.' },
        { status: 400 }
      )
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address.' },
        { status: 400 }
      )
    }

    if (!isValidPhone(phone)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid 10-digit phone/WhatsApp number.' },
        { status: 400 }
      )
    }

    if (!age) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid traveller age (1–120).' },
        { status: 400 }
      )
    }

    // 2. RECALCULATE PRICING STRICTLY ON THE SERVER
    // Never trust any price, discount, or amount sent by the client
    const pricing = calculateBookingPricing({
      tripSlug: String(body.tripSlug || ''),
      packageIndex: Number(body.packageIndex),
      guests: Number(body.guests),
      isDoubleSharing: Boolean(body.isDoubleSharing),
      paymentType: body.paymentType === 'full' ? 'full' : 'advance',
      couponCode
    })

    // 3. Generate Secure Booking ID
    const year = new Date().getFullYear()
    const randomSuffix = Math.floor(1000 + Math.random() * 9000)
    const bookingId = `TT-${year}-${randomSuffix}`

    // 4. Send Confirmation & Admin Notification Emails (Independent & Non-blocking)
    const adminEmails = getAdminEmails()
    if (adminEmails.length > 0) {
      sendEmail({
        to: adminEmails,
        replyTo: email,
        subject: `🎉 New Booking Alert: ${pricing.tripTitle} (${bookingId}) - ${fullName}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 620px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;">
            <div style="text-align: center; margin-bottom: 20px;">
              <h2 style="color: #0b2940; margin: 0; font-size: 22px;">🎉 New Booking Confirmed!</h2>
              <p style="color: #64748b; font-size: 13px; margin: 4px 0 0;">Booking Reference: <strong style="color: #00b4d8;">${bookingId}</strong></p>
            </div>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
            <h3 style="color: #00b4d8; font-size: 15px; margin: 0 0 12px; text-transform: uppercase; letter-spacing: 0.5px;">Trip Details</h3>
            <table style="width: 100%; font-size: 14px; border-collapse: collapse; margin-bottom: 16px;">
              <tr>
                <td style="padding: 6px 0; color: #64748b; width: 140px;"><strong>Trip:</strong></td>
                <td style="padding: 6px 0; color: #0b2940; font-weight: bold;">${pricing.tripTitle}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b;"><strong>Travel Date:</strong></td>
                <td style="padding: 6px 0; color: #0b2940;">${date || 'Selected Date'}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b;"><strong>Package:</strong></td>
                <td style="padding: 6px 0; color: #0b2940;">${pricing.packageLabel}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b;"><strong>Guests:</strong></td>
                <td style="padding: 6px 0; color: #0b2940;">${pricing.guests} Person(s)</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b;"><strong>Payment Mode:</strong></td>
                <td style="padding: 6px 0; color: #0b2940;">${pricing.isFullPayment ? 'Full Payment' : 'Advance Booking'}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b;"><strong>Amount Paid Today:</strong></td>
                <td style="padding: 6px 0; color: #10b981; font-weight: bold; font-size: 16px;">₹${pricing.amountToPayToday.toLocaleString('en-IN')}</td>
              </tr>
              ${pricing.remainingBalance > 0 ? `
              <tr>
                <td style="padding: 6px 0; color: #64748b;"><strong>Remaining Balance:</strong></td>
                <td style="padding: 6px 0; color: #e11d48; font-weight: bold;">₹${pricing.remainingBalance.toLocaleString('en-IN')} (Due on/before departure)</td>
              </tr>` : ''}
              <tr>
                <td style="padding: 6px 0; color: #64748b;"><strong>Total Trip Cost:</strong></td>
                <td style="padding: 6px 0; color: #0b2940; font-weight: bold;">₹${pricing.grandTotal.toLocaleString('en-IN')}</td>
              </tr>
            </table>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
            <h3 style="color: #00b4d8; font-size: 15px; margin: 0 0 12px; text-transform: uppercase; letter-spacing: 0.5px;">Traveller Information</h3>
            <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
              <tr>
                <td style="padding: 6px 0; color: #64748b; width: 140px;"><strong>Lead Name:</strong></td>
                <td style="padding: 6px 0; color: #0b2940;">${fullName} (Age: ${age})</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b;"><strong>Email:</strong></td>
                <td style="padding: 6px 0; color: #0b2940;"><a href="mailto:${email}" style="color: #00b4d8; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b;"><strong>Phone:</strong></td>
                <td style="padding: 6px 0; color: #0b2940;"><a href="tel:${phone}" style="color: #00b4d8; text-decoration: none;">${phone}</a> (<a href="https://wa.me/${phone.replace(/[^\d]/g, '')}" style="color: #10b981; text-decoration: none;">WhatsApp</a>)</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b;"><strong>Departure City:</strong></td>
                <td style="padding: 6px 0; color: #0b2940;">${city || 'Not specified'}</td>
              </tr>
              ${specialRequest ? `
              <tr>
                <td style="padding: 6px 0; color: #64748b;"><strong>Special Request:</strong></td>
                <td style="padding: 6px 0; color: #0b2940;">${specialRequest}</td>
              </tr>` : ''}
            </table>
          </div>
        `,
      }).catch((err) => console.error('Booking admin email failed:', err))
    }

    // Send confirmation voucher to Traveller
    sendEmail({
      to: email,
      subject: `✈️ Booking Confirmed: ${pricing.tripTitle} (${bookingId}) — Travel Tribes`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 620px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;">
          <div style="text-align: center; margin-bottom: 24px;">
            <h1 style="color: #0b2940; font-size: 26px; margin: 0 0 6px;">Travel Tribes</h1>
            <p style="color: #00b4d8; font-weight: bold; font-size: 13px; margin: 0; text-transform: uppercase; letter-spacing: 1px;">Small Groups. Big Adventures.</p>
          </div>
          <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 20px; text-align: center; margin-bottom: 24px;">
            <h2 style="color: #166534; font-size: 20px; margin: 0 0 6px;">Woohoo! You're going on an adventure! 🎉</h2>
            <p style="color: #15803d; font-size: 14px; margin: 0;">
              Hi <strong>${fullName}</strong>, your booking for <strong>${pricing.tripTitle}</strong> is successfully received.
            </p>
            <div style="margin-top: 12px; display: inline-block; background-color: #ffffff; border: 1px dashed #16a34a; border-radius: 8px; padding: 6px 16px;">
              <span style="color: #64748b; font-size: 12px;">Booking ID: </span>
              <strong style="color: #0b2940; font-size: 15px;">${bookingId}</strong>
            </div>
          </div>
          
          <h3 style="color: #0b2940; font-size: 15px; margin: 0 0 12px; text-transform: uppercase; letter-spacing: 0.5px;">Booking Summary</h3>
          <table style="width: 100%; font-size: 14px; border-collapse: collapse; margin-bottom: 20px;">
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; color: #64748b;"><strong>Trip Name:</strong></td>
              <td style="padding: 10px 0; color: #0b2940; font-weight: bold; text-align: right;">${pricing.tripTitle}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; color: #64748b;"><strong>Departure Date:</strong></td>
              <td style="padding: 10px 0; color: #0b2940; text-align: right;">${date || 'Confirmed Batch'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; color: #64748b;"><strong>Package:</strong></td>
              <td style="padding: 10px 0; color: #0b2940; text-align: right;">${pricing.packageLabel}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; color: #64748b;"><strong>Total Travellers:</strong></td>
              <td style="padding: 10px 0; color: #0b2940; text-align: right;">${pricing.guests} Person(s)</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; color: #64748b;"><strong>Total Package Amount:</strong></td>
              <td style="padding: 10px 0; color: #0b2940; font-weight: bold; text-align: right;">₹${pricing.grandTotal.toLocaleString('en-IN')}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; color: #166534;"><strong>Amount Paid:</strong></td>
              <td style="padding: 10px 0; color: #166534; font-weight: bold; text-align: right;">₹${pricing.amountToPayToday.toLocaleString('en-IN')}</td>
            </tr>
            ${pricing.remainingBalance > 0 ? `
            <tr>
              <td style="padding: 10px 0; color: #64748b;"><strong>Remaining Balance:</strong></td>
              <td style="padding: 10px 0; color: #e11d48; font-weight: bold; text-align: right;">₹${pricing.remainingBalance.toLocaleString('en-IN')}</td>
            </tr>` : ''}
          </table>

          <div style="background-color: #f8fafc; border-radius: 12px; padding: 16px; margin-bottom: 24px; border: 1px solid #e2e8f0;">
            <h4 style="color: #0b2940; font-size: 13px; margin: 0 0 8px; text-transform: uppercase;">What happens next?</h4>
            <ol style="color: #475569; font-size: 13px; line-height: 1.6; margin: 0; padding-left: 18px;">
              <li>Our dedicated Trip Captain will reach out to you on WhatsApp within 12-24 hours.</li>
              <li>You will be added to the official Batch WhatsApp Tribe group 3–5 days prior to departure.</li>
              <li>Complete packing checklist, train/flight timings, and meeting points will be shared.</li>
            </ol>
          </div>

          <div style="text-align: center; margin: 24px 0;">
            <a href="https://wa.me/919975822023?text=Hi%20Travel%20Tribes,%20I%20have%20booked%20${encodeURIComponent(pricing.tripTitle)}%20(Booking%20ID:%20${bookingId}).%20Please%20connect%20with%20me!" style="display: inline-block; background-color: #10b981; color: #ffffff; padding: 12px 24px; border-radius: 50px; font-weight: bold; text-decoration: none; font-size: 14px;">
              💬 Connect with Trip Captain on WhatsApp
            </a>
          </div>

          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <div style="text-align: center; color: #94a3b8; font-size: 12px;">
            <p style="margin: 0 0 4px;">24/7 Helpline: <a href="tel:+919975822023" style="color: #00b4d8; text-decoration: none;">+91 99758 22023</a> | Email: <a href="mailto:hello@traveltribes.in" style="color: #00b4d8; text-decoration: none;">hello@traveltribes.in</a></p>
            <p style="margin: 0; font-weight: bold; color: #0b2940;">Travel Tribes — Tribe hai to vibe hai! 🚀</p>
          </div>
        </div>
      `,
    }).catch((err) => console.error('Booking traveller email failed:', err))

    // 5. Sync Booking Data to Google Sheets (Non-blocking)
    appendToGoogleSheet({
      type: 'booking',
      bookingId,
      fullName,
      email,
      phone,
      age: age || '',
      city: city || '',
      tripTitle: pricing.tripTitle,
      date: date || 'Selected Date',
      packageLabel: pricing.packageLabel,
      guests: pricing.guests,
      paymentType: pricing.isFullPayment ? 'Full Payment' : 'Advance Booking',
      amountToPayToday: `₹${pricing.amountToPayToday.toLocaleString('en-IN')}`,
      remainingBalance: `₹${pricing.remainingBalance.toLocaleString('en-IN')}`,
      grandTotal: `₹${pricing.grandTotal.toLocaleString('en-IN')}`,
      specialRequest: specialRequest || ''
    }).catch((err) => console.error('Booking Google Sheets sync failed:', err))

    // 6. Return the verified booking response
    return NextResponse.json({
      success: true,
      bookingId,
      verifiedPricing: {
        tripSlug: pricing.tripSlug,
        tripTitle: pricing.tripTitle,
        packageLabel: pricing.packageLabel,
        guests: pricing.guests,
        subtotal: pricing.subtotal,
        gstAmount: pricing.gstAmount,
        grandTotal: pricing.grandTotal,
        paymentType: pricing.paymentType,
        fullPaymentDiscount: pricing.fullPaymentDiscount,
        couponCode: pricing.couponCode,
        couponDiscount: pricing.couponDiscount,
        couponDescription: pricing.couponDescription,
        amountToPayToday: pricing.amountToPayToday,
        remainingBalance: pricing.remainingBalance,
        isFullPayment: pricing.isFullPayment,
        currency: pricing.currency
      },
      traveller: {
        fullName,
        email,
        phone,
        age,
        city,
        specialRequest,
        date
      },
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Server Booking Error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error processing booking.' },
      { status: 500 }
    )
  }
}
