import Razorpay from 'razorpay'
import crypto from 'crypto'

export function getRazorpayKeys() {
  const keyId =
    process.env.RAZORPAY_KEY_ID ||
    process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ||
    ''
  const keySecret = process.env.RAZORPAY_KEY_SECRET || ''

  return { keyId, keySecret }
}

export function getRazorpayInstance(): Razorpay | null {
  const { keyId, keySecret } = getRazorpayKeys()

  if (!keyId || !keySecret) {
    console.warn('⚠️ [Razorpay] RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET is missing in environment variables.')
    return null
  }

  return new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  })
}

/**
 * Timing-Safe Cryptographic Signature Verification
 * Prevents side-channel timing attacks by using crypto.timingSafeEqual
 */
export function verifyRazorpaySignature(params: {
  orderId: string
  paymentId: string
  signature: string
}): boolean {
  const { keySecret } = getRazorpayKeys()
  if (!keySecret) return false

  try {
    const generatedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(`${params.orderId}|${params.paymentId}`)
      .digest('hex')

    const generatedBuf = Buffer.from(generatedSignature, 'utf8')
    const signatureBuf = Buffer.from(params.signature, 'utf8')

    if (generatedBuf.length !== signatureBuf.length) {
      return false
    }

    return crypto.timingSafeEqual(generatedBuf, signatureBuf)
  } catch (err) {
    console.error('❌ [Razorpay] Cryptographic Signature Verification Error:', err)
    return false
  }
}
