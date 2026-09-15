import { NextRequest, NextResponse } from 'next/server'
import { calculateBookingPricing } from '@/lib/pricing-calculator'

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
    const city = sanitizeString(body.city, 80)
    const specialRequest = sanitizeString(body.specialRequest, 500)
    const date = sanitizeString(body.date, 60)

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

    // 2. RECALCULATE PRICING STRICTLY ON THE SERVER
    // Never trust any price, discount, or amount sent by the client
    const pricing = calculateBookingPricing({
      tripSlug: String(body.tripSlug || ''),
      packageIndex: Number(body.packageIndex),
      guests: Number(body.guests),
      isDoubleSharing: Boolean(body.isDoubleSharing),
      paymentType: body.paymentType === 'full' ? 'full' : 'advance'
    })

    // 3. Generate Secure Booking ID
    const year = new Date().getFullYear()
    const randomSuffix = Math.floor(1000 + Math.random() * 9000)
    const bookingId = `TT-${year}-${randomSuffix}`

    // 4. Return the verified booking response
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
        amountToPayToday: pricing.amountToPayToday,
        remainingBalance: pricing.remainingBalance,
        isFullPayment: pricing.isFullPayment,
        currency: pricing.currency
      },
      traveller: {
        fullName,
        email,
        phone,
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
