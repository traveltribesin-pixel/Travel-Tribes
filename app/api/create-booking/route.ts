import { NextRequest, NextResponse } from 'next/server'
import { calculateBookingPricing } from '@/lib/pricing-calculator'
import { sendEmail, getAdminEmails } from '@/lib/mail'

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

    // 4. Send Confirmation & Admin Notification Emails (Non-blocking)
    const adminEmails = getAdminEmails()
    if (adminEmails.length > 0) {
      sendEmail({
        to: adminEmails,
        subject: `🎉 New Booking Alert: ${pricing.tripTitle} (${bookingId})`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
            <h2 style="color: #0b2940; margin-bottom: 4px;">🎉 New Trip Booking Received!</h2>
            <p style="color: #64748b; font-size: 14px;">Booking ID: <strong>${bookingId}</strong></p>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
            <h3 style="color: #43a9d1; margin-bottom: 8px;">Trip Details</h3>
            <p><strong>Trip:</strong> ${pricing.tripTitle}</p>
            <p><strong>Travel Date:</strong> ${date || 'Selected Date'}</p>
            <p><strong>Package:</strong> ${pricing.packageLabel}</p>
            <p><strong>Number of Guests:</strong> ${pricing.guests}</p>
            <p><strong>Total Amount:</strong> ₹${pricing.grandTotal.toLocaleString('en-IN')}</p>
            <p><strong>Paid Today:</strong> ₹${pricing.amountToPayToday.toLocaleString('en-IN')}</p>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
            <h3 style="color: #43a9d1; margin-bottom: 8px;">Traveller Details</h3>
            <p><strong>Name:</strong> ${fullName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>City:</strong> ${city || 'Not provided'}</p>
            ${specialRequest ? `<p><strong>Special Request:</strong> ${specialRequest}</p>` : ''}
          </div>
        `,
      }).catch((err) => console.error('Booking admin email failed:', err))

      // Send confirmation to Traveller
      sendEmail({
        to: email,
        subject: `✈️ Booking Confirmation: ${pricing.tripTitle} (${bookingId}) - Travel Tribes`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
            <h2 style="color: #0b2940; margin-bottom: 4px;">You're Going to ${pricing.tripTitle}! 🎉</h2>
            <p style="color: #64748b; font-size: 14px;">Hi ${fullName}, your booking has been received. Booking ID: <strong>${bookingId}</strong></p>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
            <p><strong>Travel Date:</strong> ${date || 'Selected Date'}</p>
            <p><strong>Guests:</strong> ${pricing.guests}</p>
            <p><strong>Total Amount:</strong> ₹${pricing.grandTotal.toLocaleString('en-IN')}</p>
            <p><strong>Amount Paid:</strong> ₹${pricing.amountToPayToday.toLocaleString('en-IN')}</p>
            <p style="color: #64748b; font-size: 13px; margin-top: 20px;">Our team will reach out to you with all on-ground coordinator and group chat details shortly!</p>
            <p style="color: #43a9d1; font-weight: bold; margin-top: 16px;">Travel Tribes — Tribe hai to vibe hai! ✨</p>
          </div>
        `,
      }).catch((err) => console.error('Booking traveller email failed:', err))
    }

    // 5. Return the verified booking response
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
