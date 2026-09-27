import { trips, type Trip } from '@/lib/travel-data'

export interface PricingBreakdown {
  tripSlug: string
  tripTitle: string
  selectedPackageIndex: number
  packageLabel: string
  basePricePerPerson: number
  isDoubleSharing: boolean
  doubleSharingAddonPerPerson: number
  totalPerPerson: number
  guests: number
  subtotal: number
  gstAmount: number
  grandTotal: number
  advancePerPerson: number
  advanceTotal: number
  paymentType: 'advance' | 'full'
  fullPaymentDiscount: number
  couponCode?: string
  couponDiscount: number
  couponDescription?: string
  amountToPayToday: number
  remainingBalance: number
  isFullPayment: boolean
  currency: string
}

export const FULL_PAYMENT_DISCOUNT_AMOUNT = 1000
export const GST_RATE = 0.05
export const DOUBLE_SHARING_ADDON_RATE = 1500
export const MIN_GUESTS = 1
export const MAX_GUESTS = 50

export const VALID_COUPONS: Record<string, { discount: number; description: string }> = {
  TRIBE500: { discount: 500, description: '₹500 off for the Tribe' },
  EARLYBIRD: { discount: 500, description: '₹500 Early Bird Savings' },
  TRAVEL1000: { discount: 1000, description: '₹1,000 Special Wanderlust savings' },
  EXPLORE10: { discount: 1000, description: '₹1,000 Explorer promo code' },
  WANDERLUST: { discount: 750, description: '₹750 Wanderlust discount' },
}

/**
 * Validates a coupon code and returns discount amount & description
 */
export function validateCoupon(code?: string): { valid: boolean; discount: number; description?: string; cleanCode?: string } {
  if (!code || typeof code !== 'string') return { valid: false, discount: 0 }
  const cleanCode = code.trim().toUpperCase()
  const found = VALID_COUPONS[cleanCode]
  if (found) {
    return { valid: true, discount: found.discount, description: found.description, cleanCode }
  }
  return { valid: false, discount: 0 }
}

/**
 * Parses numeric price from any price string (e.g. "₹8,499", "₹ 4,000 / person")
 */
export function parseNumericPrice(priceStr?: string, fallback: number = 8499): number {
  if (!priceStr || typeof priceStr !== 'string') return fallback
  const match = priceStr.match(/(\d[\d,]*)/)
  if (!match) return fallback
  const cleaned = match[1].replace(/,/g, '')
  const parsed = parseInt(cleaned, 10)
  return isNaN(parsed) || parsed <= 0 ? fallback : parsed
}

/**
 * Validates and clamps the number of guests strictly between 1 and 50
 */
export function sanitizeGuests(guestsInput: unknown): number {
  const num = typeof guestsInput === 'number' ? guestsInput : parseInt(String(guestsInput), 10)
  if (isNaN(num) || !isFinite(num)) return 1
  return Math.max(MIN_GUESTS, Math.min(MAX_GUESTS, Math.floor(num)))
}

/**
 * Single Authoritative Pricing Engine
 * Recalculates every rupee exclusively from official trip records.
 * NEVER trusts client-side price strings or tampered figures.
 */
export function calculateBookingPricing(params: {
  tripSlug: string
  packageIndex?: number
  guests?: number
  isDoubleSharing?: boolean
  paymentType?: 'advance' | 'full'
  couponCode?: string
}): PricingBreakdown {
  const { tripSlug } = params
  
  // 1. Locate authoritative trip record
  const trip: Trip = trips.find((t) => t.slug === tripSlug) || trips[0]

  // 2. Sanitize guest count
  const guests = sanitizeGuests(params.guests)

  // 3. Resolve and sanitize package index
  const availablePricingOptions = trip.pricingOptions || []
  let selectedPackageIndex = 0
  let packageLabel = 'Standard Package'
  let basePricePerPerson = parseNumericPrice(trip.price, 8499)

  if (availablePricingOptions.length > 0) {
    const rawIdx = typeof params.packageIndex === 'number' ? Math.floor(params.packageIndex) : 0
    selectedPackageIndex = Math.max(0, Math.min(availablePricingOptions.length - 1, rawIdx))
    const selectedOption = availablePricingOptions[selectedPackageIndex]
    packageLabel = selectedOption.label
    if (
      selectedOption.price.startsWith('+') ||
      selectedOption.label.toLowerCase().includes('add-on') ||
      selectedOption.label.toLowerCase().includes('upgrade')
    ) {
      const tripBase = parseNumericPrice(trip.price, 8499)
      const addon = parseNumericPrice(selectedOption.price, 0)
      basePricePerPerson = tripBase + addon
    } else if (!selectedOption.price.toLowerCase().includes('request')) {
      basePricePerPerson = parseNumericPrice(selectedOption.price, basePricePerPerson)
    }
  }

  // 4. Double sharing calculation
  const isDoubleSharing = Boolean(params.isDoubleSharing)
  const isPackageAlreadyDoubleSharing = packageLabel.toLowerCase().includes('double sharing')
  const doubleSharingAddonOpt = availablePricingOptions.find(
    (o) =>
      o.label.toLowerCase().includes('double sharing') &&
      (o.label.toLowerCase().includes('add-on') || o.price.startsWith('+'))
  )
  const dynamicDoubleSharingRate = doubleSharingAddonOpt
    ? parseNumericPrice(doubleSharingAddonOpt.price, DOUBLE_SHARING_ADDON_RATE)
    : DOUBLE_SHARING_ADDON_RATE
  const doubleSharingAddonPerPerson =
    isDoubleSharing && !isPackageAlreadyDoubleSharing ? dynamicDoubleSharingRate : 0
  const totalPerPerson = basePricePerPerson + doubleSharingAddonPerPerson

  // 5. Subtotal & GST
  const subtotal = totalPerPerson * guests
  const gstAmount = Math.round(subtotal * GST_RATE)
  let rawGrandTotal = subtotal + gstAmount

  // 6. Coupon Discount
  const couponValidation = validateCoupon(params.couponCode)
  const couponDiscount = couponValidation.valid ? Math.min(couponValidation.discount, rawGrandTotal) : 0
  const couponCode = couponValidation.valid ? couponValidation.cleanCode : undefined
  const couponDescription = couponValidation.valid ? couponValidation.description : undefined
  const grandTotal = Math.max(0, rawGrandTotal - couponDiscount)

  // 7. Advance calculation
  const advancePerPerson = parseNumericPrice(trip.bookingAmount, 4000)
  const rawAdvanceTotal = advancePerPerson * guests
  const advanceTotal = Math.min(rawAdvanceTotal, grandTotal)

  // 8. Payment Type & Discount (₹1,000 off strictly for full payment)
  const paymentType: 'advance' | 'full' = params.paymentType === 'full' ? 'full' : 'advance'
  const isFullPayment = paymentType === 'full'

  // Guarantee discount cannot make price negative
  const fullPaymentDiscount = isFullPayment ? Math.min(FULL_PAYMENT_DISCOUNT_AMOUNT, grandTotal) : 0
  const fullPaymentTotal = Math.max(0, grandTotal - fullPaymentDiscount)

  const amountToPayToday = isFullPayment ? fullPaymentTotal : advanceTotal
  const remainingBalance = isFullPayment ? 0 : Math.max(0, grandTotal - advanceTotal)

  return Object.freeze({
    tripSlug: trip.slug,
    tripTitle: trip.title,
    selectedPackageIndex,
    packageLabel,
    basePricePerPerson,
    isDoubleSharing,
    doubleSharingAddonPerPerson,
    totalPerPerson,
    guests,
    subtotal,
    gstAmount,
    grandTotal,
    advancePerPerson,
    advanceTotal,
    paymentType,
    fullPaymentDiscount,
    couponCode,
    couponDiscount,
    couponDescription,
    amountToPayToday,
    remainingBalance,
    isFullPayment,
    currency: 'INR'
  })
}

