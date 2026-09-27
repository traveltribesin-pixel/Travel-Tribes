import { NextRequest, NextResponse } from 'next/server'
import { verifyRazorpaySignature, getRazorpayInstance } from '@/lib/razorpay'
import { calculateBookingPricing, sanitizeGuests } from '@/lib/pricing-calculator'
import { sendEmail, getAdminEmails } from '@/lib/mail'
import { appendToGoogleSheet } from '@/lib/google-sheets'

// In-memory ledger to prevent Replay / Double-Processing attacks
const processedPayments = new Set<string>()

// Rate limiter
const verifyRequestCounts = new Map<string, { count: number; timestamp: number }>()

function isRateLimited(ip: string, maxRequests: number = 30, windowMs: number = 60000): boolean {
  const now = Date.now()
  const record = verifyRequestCounts.get(ip)

  if (!record || now - record.timestamp > windowMs) {
    verifyRequestCounts.set(ip, { count: 1, timestamp: now })
    return false
  }

  if (record.count >= maxRequests) {
    return true
  }

  record.count++
  return false
}

// Anti-XSS and Anti-Header Injection Sanitizer
function sanitizeString(input: unknown, maxLength: number = 250): string {
  if (typeof input !== 'string') return ''
  return input
    .replace(/[<>'"`;()]/g, '')
    .replace(/[\r\n]/g, ' ') // prevent email header injection
    .trim()
    .slice(0, maxLength)
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1'
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, error: 'Too many verification attempts. Please wait.' },
        { status: 429 }
      )
    }

    const body = await req.json().catch(() => null)
    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { success: false, error: 'Invalid verification request payload.' },
        { status: 400 }
      )
    }

    const razorpay_order_id = sanitizeString(body.razorpay_order_id, 100)
    const razorpay_payment_id = sanitizeString(body.razorpay_payment_id, 100)
    const razorpay_signature = String(body.razorpay_signature || '').trim()
    const bookingId = sanitizeString(body.bookingId, 50)
    const traveller = body.traveller || {}
    const bookingConfig = body.bookingConfig || {}

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { success: false, error: 'Missing required Razorpay verification credentials.' },
        { status: 400 }
      )
    }

    // 1. REPLAY ATTACK CHECK
    if (processedPayments.has(razorpay_payment_id)) {
      console.warn(`⚠️ [Security Alert] Replay attempt detected for Payment ID: ${razorpay_payment_id}`)
      return NextResponse.json({
        success: true,
        bookingId,
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
        note: 'Payment has already been verified and recorded.',
      })
    }

    // 2. CRYPTOGRAPHIC SIGNATURE VERIFICATION (Timing-Safe)
    const isSignatureValid = verifyRazorpaySignature({
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      signature: razorpay_signature,
    })

    if (!isSignatureValid) {
      console.error(`🚨 [Security Alert] Cryptographic signature MISMATCH for Payment: ${razorpay_payment_id}`)
      return NextResponse.json(
        {
          success: false,
          error: 'Payment verification failed: Signature mismatch or tampering detected.',
        },
        { status: 400 }
      )
    }

    // 3. DIRECT RAZORPAY API AUDIT & STATUS VERIFICATION
    const razorpay = getRazorpayInstance()
    if (!razorpay) {
      return NextResponse.json(
        { success: false, error: 'Razorpay server instance not initialized.' },
        { status: 500 }
      )
    }

    const paymentDetails: any = await razorpay.payments.fetch(razorpay_payment_id).catch((err) => {
      console.error('Failed to fetch payment details from Razorpay:', err)
      return null
    })

    if (!paymentDetails) {
      return NextResponse.json(
        { success: false, error: 'Could not fetch verified payment record from Razorpay.' },
        { status: 400 }
      )
    }

    // Verify order ID on Razorpay matches our order ID
    if (paymentDetails.order_id !== razorpay_order_id) {
      console.error(`🚨 [Security Alert] Order ID mismatch! Payment Order: ${paymentDetails.order_id} vs Request Order: ${razorpay_order_id}`)
      return NextResponse.json(
        { success: false, error: 'Order ID mismatch between Razorpay record and request.' },
        { status: 400 }
      )
    }

    // Verify payment status is captured or authorized
    if (paymentDetails.status !== 'captured' && paymentDetails.status !== 'authorized') {
      console.error(`🚨 [Security Alert] Payment not captured. Status: ${paymentDetails.status}`)
      return NextResponse.json(
        { success: false, error: `Payment is in '${paymentDetails.status}' status, not captured.` },
        { status: 400 }
      )
    }

    // 4. SERVER-SIDE PRICE RECONCILIATION
    // Recalculate price strictly from database/data to ensure zero amount tampering
    const tripSlug = sanitizeString(bookingConfig.tripSlug || paymentDetails.notes?.tripSlug || '', 100)
    const packageIndex = Number(bookingConfig.packageIndex ?? paymentDetails.notes?.packageIndex ?? 0)
    const guests = sanitizeGuests(bookingConfig.guests ?? paymentDetails.notes?.guests ?? 1)
    const isDoubleSharing = Boolean(bookingConfig.isDoubleSharing ?? paymentDetails.notes?.isDoubleSharing === 'true')
    const paymentType = (bookingConfig.paymentType ?? paymentDetails.notes?.paymentType) === 'full' ? 'full' : 'advance'
    const couponCode = sanitizeString(bookingConfig.couponCode || paymentDetails.notes?.couponCode || '', 30)

    const authoritativePricing = calculateBookingPricing({
      tripSlug,
      packageIndex,
      guests,
      isDoubleSharing,
      paymentType,
      couponCode,
    })

    const expectedAmountInPaise = Math.round(authoritativePricing.amountToPayToday * 100)

    // Compare captured amount in paise with server-computed expected amount
    if (paymentDetails.amount !== expectedAmountInPaise) {
      console.error(
        `🚨 [CRITICAL TAMPER ALERT] Amount Mismatch! Captured: ${paymentDetails.amount} paise (₹${paymentDetails.amount / 100}) vs Expected: ${expectedAmountInPaise} paise (₹${authoritativePricing.amountToPayToday})`
      )
      return NextResponse.json(
        {
          success: false,
          error: `Payment amount ₹${paymentDetails.amount / 100} does not match verified trip price ₹${authoritativePricing.amountToPayToday}. Booking flagged.`,
        },
        { status: 400 }
      )
    }

    // Mark as processed in-memory to prevent replay
    processedPayments.add(razorpay_payment_id)

    // 5. Sanitize Traveller Information for notifications
    const fullName = sanitizeString(traveller.fullName || paymentDetails.notes?.travellerName || 'Valued Traveller', 100)
    const email = sanitizeString(traveller.email || paymentDetails.notes?.travellerEmail || paymentDetails.email || '', 120).toLowerCase()
    const phone = sanitizeString(traveller.phone || paymentDetails.notes?.travellerPhone || paymentDetails.contact || '', 30)
    const age = Number(traveller.age) || ''
    const city = sanitizeString(traveller.city, 80)
    const specialRequest = sanitizeString(traveller.specialRequest, 500)
    const travelDate = sanitizeString(traveller.date || paymentDetails.notes?.travelDate || 'Confirmed Departure Batch', 60)

    const tripTitle = authoritativePricing.tripTitle
    const packageLabel = authoritativePricing.packageLabel
    const totalGuests = authoritativePricing.guests
    const amountPaid = authoritativePricing.amountToPayToday
    const grandTotal = authoritativePricing.grandTotal
    const remainingBalance = authoritativePricing.remainingBalance
    const isFullPayment = authoritativePricing.isFullPayment
    const paymentMethodUsed = paymentDetails.method ? String(paymentDetails.method).toUpperCase() : 'ONLINE'

    // 6. Asynchronously Send Verified Emails and Update Google Sheets
    const tasks: Promise<any>[] = []

    // Admin Notification Email
    const adminEmails = getAdminEmails()
    if (adminEmails.length > 0) {
      tasks.push(
        sendEmail({
          to: adminEmails,
          replyTo: email,
          subject: `💳 [PAID via Razorpay] New Booking: ${tripTitle} (${bookingId}) - ₹${amountPaid.toLocaleString('en-IN')}`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 640px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;">
              <div style="text-align: center; margin-bottom: 20px;">
                <span style="display: inline-block; background-color: #10b981; color: #ffffff; padding: 5px 14px; border-radius: 50px; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px;">
                  ✅ Payment Authenticated & Captured (Razorpay ${paymentMethodUsed})
                </span>
                <h2 style="color: #0b2940; margin: 12px 0 4px; font-size: 22px;">🎉 New Booking Paid!</h2>
                <p style="color: #64748b; font-size: 13px; margin: 0;">Booking Reference: <strong style="color: #00b4d8;">${bookingId}</strong></p>
              </div>
              <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
              
              <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 10px; padding: 14px; margin-bottom: 16px;">
                <h4 style="margin: 0 0 6px; color: #166534; font-size: 13px; text-transform: uppercase;">Verified Razorpay Transaction</h4>
                <p style="margin: 2px 0; font-size: 13px; color: #15803d;"><strong>Payment ID:</strong> ${razorpay_payment_id}</p>
                <p style="margin: 2px 0; font-size: 13px; color: #15803d;"><strong>Order ID:</strong> ${razorpay_order_id}</p>
                <p style="margin: 2px 0; font-size: 13px; color: #15803d;"><strong>Payment Mode:</strong> ${paymentMethodUsed}</p>
                <p style="margin: 2px 0; font-size: 13px; color: #15803d;"><strong>Amount Captured:</strong> ₹${amountPaid.toLocaleString('en-IN')}</p>
              </div>

              <h3 style="color: #00b4d8; font-size: 14px; margin: 0 0 12px; text-transform: uppercase; letter-spacing: 0.5px;">Trip Details</h3>
              <table style="width: 100%; font-size: 14px; border-collapse: collapse; margin-bottom: 16px;">
                <tr>
                  <td style="padding: 6px 0; color: #64748b; width: 160px;"><strong>Trip:</strong></td>
                  <td style="padding: 6px 0; color: #0b2940; font-weight: bold; font-size: 16px;">${tripTitle}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #64748b;"><strong>Travel Date:</strong></td>
                  <td style="padding: 6px 0; color: #0b2940;">${travelDate}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #64748b;"><strong>Package:</strong></td>
                  <td style="padding: 6px 0; color: #0b2940;">${packageLabel}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #64748b;"><strong>Travellers:</strong></td>
                  <td style="padding: 6px 0; color: #0b2940;">${totalGuests} Person(s)</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #64748b;"><strong>Payment Mode:</strong></td>
                  <td style="padding: 6px 0; color: #0b2940;">${isFullPayment ? 'Full Payment' : 'Advance Booking'}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #64748b;"><strong>Amount Paid Online:</strong></td>
                  <td style="padding: 6px 0; color: #10b981; font-weight: bold; font-size: 16px;">₹${amountPaid.toLocaleString('en-IN')} (Captured)</td>
                </tr>
                ${
                  remainingBalance > 0
                    ? `
                <tr>
                  <td style="padding: 6px 0; color: #64748b;"><strong>Remaining Balance:</strong></td>
                  <td style="padding: 6px 0; color: #e11d48; font-weight: bold;">₹${remainingBalance.toLocaleString('en-IN')} (Due before departure)</td>
                </tr>`
                    : ''
                }
                <tr>
                  <td style="padding: 6px 0; color: #64748b;"><strong>Total Trip Cost:</strong></td>
                  <td style="padding: 6px 0; color: #0b2940; font-weight: bold;">₹${grandTotal.toLocaleString('en-IN')}</td>
                </tr>
              </table>

              <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
              <h3 style="color: #00b4d8; font-size: 14px; margin: 0 0 12px; text-transform: uppercase; letter-spacing: 0.5px;">Traveller Information</h3>
              <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
                <tr>
                  <td style="padding: 6px 0; color: #64748b; width: 160px;"><strong>Lead Traveller:</strong></td>
                  <td style="padding: 6px 0; color: #0b2940;">${fullName} ${age ? `(Age: ${age})` : ''}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #64748b;"><strong>Email:</strong></td>
                  <td style="padding: 6px 0; color: #0b2940;"><a href="mailto:${email}" style="color: #00b4d8; text-decoration: none;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #64748b;"><strong>Phone:</strong></td>
                  <td style="padding: 6px 0; color: #0b2940;">
                    <a href="tel:${phone}" style="color: #00b4d8; text-decoration: none;">${phone}</a> 
                    (<a href="https://wa.me/${phone.replace(/[^\d]/g, '')}" style="color: #10b981; text-decoration: none; font-weight: bold;">WhatsApp</a>)
                  </td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #64748b;"><strong>City:</strong></td>
                  <td style="padding: 6px 0; color: #0b2940;">${city || 'Not specified'}</td>
                </tr>
                ${
                  specialRequest
                    ? `
                <tr>
                  <td style="padding: 6px 0; color: #64748b;"><strong>Special Notes:</strong></td>
                  <td style="padding: 6px 0; color: #0b2940;">${specialRequest}</td>
                </tr>`
                    : ''
                }
              </table>
            </div>
          `,
        }).catch((err) => {
          console.error('Razorpay admin email error:', err)
          return { success: false, error: err?.message }
        })
      )
    }

    // Traveller Confirmation Voucher Email
    if (email) {
      tasks.push(
        sendEmail({
          to: email,
          subject: `✈️ Booking Confirmed: ${tripTitle} (${bookingId}) — Travel Tribes`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 620px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;">
              <div style="text-align: center; margin-bottom: 24px;">
                <h1 style="color: #0b2940; font-size: 26px; margin: 0 0 6px;">Travel Tribes</h1>
                <p style="color: #00b4d8; font-weight: bold; font-size: 13px; margin: 0; text-transform: uppercase; letter-spacing: 1px;">Small Groups. Big Adventures.</p>
              </div>
              <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 20px; text-align: center; margin-bottom: 24px;">
                <h2 style="color: #166534; font-size: 20px; margin: 0 0 6px;">Payment Successful! You're going on an adventure! 🎉</h2>
                <p style="color: #15803d; font-size: 14px; margin: 0;">
                  Hi <strong>${fullName}</strong>, we have received your payment of <strong>₹${amountPaid.toLocaleString('en-IN')}</strong> for <strong>${tripTitle}</strong>.
                </p>
                <div style="margin-top: 14px; display: inline-flex; gap: 12px; flex-wrap: wrap; justify-content: center;">
                  <div style="background-color: #ffffff; border: 1px dashed #16a34a; border-radius: 8px; padding: 6px 14px;">
                    <span style="color: #64748b; font-size: 12px;">Booking ID: </span>
                    <strong style="color: #0b2940; font-size: 14px;">${bookingId}</strong>
                  </div>
                  <div style="background-color: #ffffff; border: 1px dashed #16a34a; border-radius: 8px; padding: 6px 14px;">
                    <span style="color: #64748b; font-size: 12px;">Payment ID: </span>
                    <strong style="color: #0b2940; font-size: 14px;">${razorpay_payment_id}</strong>
                  </div>
                </div>
              </div>
              
              <h3 style="color: #0b2940; font-size: 14px; margin: 0 0 12px; text-transform: uppercase; letter-spacing: 0.5px;">Booking Summary</h3>
              <table style="width: 100%; font-size: 14px; border-collapse: collapse; margin-bottom: 20px;">
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 10px 0; color: #64748b;"><strong>Trip:</strong></td>
                  <td style="padding: 10px 0; color: #0b2940; font-weight: bold; text-align: right;">${tripTitle}</td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 10px 0; color: #64748b;"><strong>Departure Date:</strong></td>
                  <td style="padding: 10px 0; color: #0b2940; text-align: right;">${travelDate}</td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 10px 0; color: #64748b;"><strong>Package:</strong></td>
                  <td style="padding: 10px 0; color: #0b2940; text-align: right;">${packageLabel}</td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 10px 0; color: #64748b;"><strong>Total Travellers:</strong></td>
                  <td style="padding: 10px 0; color: #0b2940; text-align: right;">${totalGuests} Person(s)</td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 10px 0; color: #64748b;"><strong>Total Trip Package:</strong></td>
                  <td style="padding: 10px 0; color: #0b2940; font-weight: bold; text-align: right;">₹${grandTotal.toLocaleString('en-IN')}</td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 10px 0; color: #166534;"><strong>Amount Paid Online:</strong></td>
                  <td style="padding: 10px 0; color: #166534; font-weight: bold; text-align: right;">₹${amountPaid.toLocaleString('en-IN')} (PAID)</td>
                </tr>
                ${
                  remainingBalance > 0
                    ? `
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 10px 0; color: #64748b;"><strong>Remaining Balance:</strong></td>
                  <td style="padding: 10px 0; color: #e11d48; font-weight: bold; text-align: right;">₹${remainingBalance.toLocaleString('en-IN')} (Due before departure)</td>
                </tr>`
                    : ''
                }
              </table>

              <div style="background-color: #f8fafc; border-radius: 12px; padding: 16px; margin-bottom: 24px; border: 1px solid #e2e8f0;">
                <h4 style="color: #0b2940; font-size: 13px; margin: 0 0 8px; text-transform: uppercase;">What happens next?</h4>
                <ol style="color: #475569; font-size: 13px; line-height: 1.6; margin: 0; padding-left: 18px;">
                  <li>Our dedicated Trip Captain will connect with you on WhatsApp within 12-24 hours.</li>
                  <li>You will be added to the official batch WhatsApp group 3–5 days prior to departure.</li>
                  <li>Packing checklist, flight/train guidance, and stay details will be shared in the group.</li>
                </ol>
              </div>

              <div style="text-align: center; margin: 24px 0;">
                <a href="https://wa.me/919975822023?text=Hi%20Travel%20Tribes,%20I%20have%20completed%20payment%20for%20${encodeURIComponent(tripTitle)}%20(Booking%20ID:%20${bookingId},%20Payment%20ID:%20${razorpay_payment_id}).%20Please%20connect%20with%20me!" style="display: inline-block; background-color: #10b981; color: #ffffff; padding: 12px 24px; border-radius: 50px; font-weight: bold; text-decoration: none; font-size: 14px;">
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
        }).catch((err) => {
          console.error('Razorpay traveller email error:', err)
          return { success: false, error: err?.message }
        })
      )
    }

    // Google Sheets Auto-Sync
    tasks.push(
      appendToGoogleSheet({
        type: 'booking',
        status: `PAID (Razorpay - ${paymentMethodUsed})`,
        bookingId,
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
        fullName,
        email,
        phone,
        age: age || '',
        city: city || '',
        tripTitle,
        date: travelDate,
        packageLabel,
        guests: totalGuests,
        paymentType: isFullPayment ? 'Full Payment' : 'Advance Booking',
        amountToPayToday: `₹${amountPaid.toLocaleString('en-IN')}`,
        remainingBalance: `₹${remainingBalance.toLocaleString('en-IN')}`,
        grandTotal: `₹${grandTotal.toLocaleString('en-IN')}`,
        specialRequest: specialRequest || '',
      }).catch((err) => {
        console.error('Razorpay Google Sheet sync error:', err)
        return { success: false, error: err?.message }
      })
    )

    await Promise.allSettled(tasks)

    return NextResponse.json({
      success: true,
      bookingId,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
    })
  } catch (error: any) {
    console.error('❌ [Razorpay] Verification Error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Server error verifying Razorpay payment.',
      },
      { status: 500 }
    )
  }
}
