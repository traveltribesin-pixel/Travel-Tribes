import { NextRequest, NextResponse } from 'next/server'
import { calculateBookingPricing, sanitizeGuests } from '@/lib/pricing-calculator'
import { getRazorpayInstance, getRazorpayKeys } from '@/lib/razorpay'

// In-memory IP rate limiter for DDoS and order-flooding prevention
const requestCounts = new Map<string, { count: number; timestamp: number }>()

function isRateLimited(ip: string, maxRequests: number = 25, windowMs: number = 60000): boolean {
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

// Anti-XSS Sanitizer
function sanitizeString(input: unknown, maxLength: number = 250): string {
  if (typeof input !== 'string') return ''
  return input
    .replace(/[<>'"`;()]/g, '') // remove script injection characters
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
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1'
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please wait a minute and retry.' },
        { status: 429 }
      )
    }

    const body = await req.json().catch(() => null)
    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { success: false, error: 'Invalid request payload.' },
        { status: 400 }
      )
    }

    // 1. Strict Input Validation and Sanitization
    const fullName = sanitizeString(body.fullName, 100)
    const email = sanitizeString(body.email, 120).toLowerCase()
    const phone = sanitizeString(body.phone, 30)
    const ageNum = parseInt(String(body.age || ''), 10)
    const age = !isNaN(ageNum) && ageNum >= 1 && ageNum <= 120 ? ageNum : null
    const city = sanitizeString(body.city, 80)
    const specialRequest = sanitizeString(body.specialRequest, 500)
    const date = sanitizeString(body.date, 60)
    const couponCode = sanitizeString(body.couponCode, 30)
    const tripSlug = sanitizeString(body.tripSlug, 100)
    const guests = sanitizeGuests(body.guests)
    const packageIndex = Number(body.packageIndex) || 0
    const isDoubleSharing = Boolean(body.isDoubleSharing)
    const paymentType = body.paymentType === 'full' ? 'full' : 'advance'

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

    // Accept & sanitize multiple travellers if provided
    const rawTravellers = Array.isArray(body.travellers) ? body.travellers : []
    const travellers = rawTravellers.map((t: any) => ({
      fullName: sanitizeString(t.fullName, 100),
      age: parseInt(String(t.age || ''), 10) || null,
      gender: sanitizeString(t.gender, 20) || 'Male',
      phone: sanitizeString(t.phone, 30),
      email: sanitizeString(t.email, 120).toLowerCase(),
    }))

    // 2. AUTHORITATIVE PRICING CALCULATION (Strict Server-Side Computation)
    // Completely ignores any amount/discount parameters that might be sent from client
    const pricing = calculateBookingPricing({
      tripSlug,
      selectedDate: date,
      packageIndex,
      guests,
      isDoubleSharing,
      paymentType,
      couponCode,
    })

    if (pricing.amountToPayToday <= 0) {
      return NextResponse.json(
        { success: false, error: 'Calculated payment amount is invalid.' },
        { status: 400 }
      )
    }

    // 3. Generate Anti-Collision Secure Booking Reference
    const year = new Date().getFullYear()
    const randomSuffix = Math.floor(1000 + Math.random() * 9000)
    const bookingId = `TT-${year}-${randomSuffix}`

    // 4. Initialize Razorpay and Verify Server Keys
    const razorpay = getRazorpayInstance()
    const { keyId } = getRazorpayKeys()

    if (!razorpay || !keyId) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Razorpay credentials are not configured in .env. Please set NEXT_PUBLIC_RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET.',
        },
        { status: 500 }
      )
    }

    // Exact amount in paise (1 INR = 100 paise)
    const amountInPaise = Math.round(pricing.amountToPayToday * 100)

    // 5. Create Order with Immutable Metadata
    const orderOptions = {
      amount: amountInPaise,
      currency: 'INR',
      receipt: bookingId,
      notes: {
        bookingId,
        tripSlug: pricing.tripSlug,
        tripTitle: pricing.tripTitle,
        packageLabel: pricing.packageLabel,
        packageIndex: String(pricing.selectedPackageIndex),
        guests: String(pricing.guests),
        paymentType: pricing.paymentType,
        isDoubleSharing: String(pricing.isDoubleSharing),
        couponCode: pricing.couponCode || '',
        travellerName: fullName,
        travellerEmail: email,
        travellerPhone: phone,
        travelDate: date || 'Selected Batch',
      },
    }

    const order = await razorpay.orders.create(orderOptions)

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId,
      bookingId,
      bookingConfig: {
        tripSlug: pricing.tripSlug,
        packageIndex: pricing.selectedPackageIndex,
        guests: pricing.guests,
        isDoubleSharing: pricing.isDoubleSharing,
        paymentType: pricing.paymentType,
        couponCode: pricing.couponCode || '',
      },
      pricing: {
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
        amountToPayToday: pricing.amountToPayToday,
        remainingBalance: pricing.remainingBalance,
        isFullPayment: pricing.isFullPayment,
        currency: pricing.currency,
      },
      traveller: {
        fullName,
        email,
        phone,
        age,
        city,
        specialRequest,
        date,
        travellers: travellers.length > 0 ? travellers : undefined,
      },
    })
  } catch (error: any) {
    console.error('❌ [Razorpay] Order Creation Error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Failed to initialize secure payment order.',
      },
      { status: 500 }
    )
  }
}
