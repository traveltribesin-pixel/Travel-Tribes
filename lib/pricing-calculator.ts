import { trips, type Trip, type TripPricingOption } from '@/lib/travel-data'
import { isLongWeekendDate, isFestiveDate } from '@/lib/date-utils'

export interface PricingBreakdown {
  tripSlug: string
  tripTitle: string
  isInternational: boolean
  selectedDate?: string
  selectedPackageIndex: number
  packageLabel: string
  basePricePerPerson: number
  isDoubleSharing: boolean
  doubleSharingRate: number
  doubleSharingAddonPerPerson: number
  totalPerPerson: number
  guests: number
  subtotal: number
  gstRate: number
  gstAmount: number
  tcsRate: number
  tcsAmount: number
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
  isLongWeekend: boolean
  isFestive: boolean
  currency: string
  availablePackages: TripPricingOption[]
}

export const FULL_PAYMENT_DISCOUNT_PER_PERSON = 1000
export const FULL_PAYMENT_DISCOUNT_AMOUNT = 1000 // alias for backward compatibility
export const GST_RATE = 0.05
export const INTERNATIONAL_TCS_RATE = 0.02
export const DEFAULT_DOUBLE_SHARING_RATE = 1500
export const MIN_GUESTS = 1
export const MAX_GUESTS = 50

export const VALID_COUPONS: Record<string, { discount: number; description: string }> = {
  VIBE100: { discount: 100, description: '₹100 OFF' },
  WANDER200: { discount: 200, description: '₹200 OFF' },
  TREAT300: { discount: 300, description: '₹300 OFF' },
  GOODVIBES400: { discount: 400, description: '₹400 OFF' },
  TRIBECLUB: { discount: 500, description: '₹500 OFF' },
  YOL0500: { discount: 500, description: '₹500 OFF' },
  SOL0500: { discount: 500, description: '₹500 OFF' },
  HIGHFIVE: { discount: 500, description: '₹500 OFF' },
  WANDER600: { discount: 600, description: '₹600 OFF' },
  BIGSAVE700: { discount: 700, description: '₹700 OFF' },
  ADVENTURE700: { discount: 700, description: '₹700 OFF' },
  TRIPMODE800: { discount: 800, description: '₹800 OFF' },
  TRIBELOVE900: { discount: 900, description: '₹900 OFF' },
  TRIBEFAM: { discount: 1000, description: '₹1,000 OFF' },
  TRIBE1000: { discount: 1000, description: '₹1,000 OFF' },
}

/**
 * Validates a coupon code and returns discount amount & description
 */
export function validateCoupon(code?: string): {
  valid: boolean
  discount: number
  description?: string
  cleanCode?: string
} {
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
 * Resolves dynamic packages and pricing for a specific trip and date directly from travel-data.ts.
 * All pricing options, long weekend rates, festive rates, and double sharing add-ons reside in travel-data.ts.
 */
export function resolveTripDynamicPackages(trip: Trip, selectedDate?: string): {
  packages: TripPricingOption[]
  doubleSharingRate: number
  isLongWeekend: boolean
  isFestive: boolean
} {
  const isLW = isLongWeekendDate(selectedDate)
  const isFestive = isFestiveDate(selectedDate)

  // 1. Festive Batch Resolution (Christmas & New Year)
  if (isFestive && trip.festivePackages && trip.festivePackages.length > 0) {
    const doubleRate =
      typeof trip.festiveDoubleSharingRate === 'number'
        ? trip.festiveDoubleSharingRate
        : typeof trip.doubleSharingRate === 'number'
        ? trip.doubleSharingRate
        : 0
    const hasDoubleInPackages = trip.festivePackages.some((p) => p.label.toLowerCase().includes('double'))

    return {
      packages: trip.festivePackages,
      doubleSharingRate: hasDoubleInPackages ? 0 : doubleRate,
      isLongWeekend: isLW,
      isFestive: true,
    }
  }

  // 2. Long Weekend Batch Resolution
  if (isLW && trip.longWeekendPackages && trip.longWeekendPackages.length > 0) {
    const doubleRate = typeof trip.doubleSharingRate === 'number' ? trip.doubleSharingRate : 0
    const hasDoubleInPackages = trip.longWeekendPackages.some((p) => p.label.toLowerCase().includes('double'))

    return {
      packages: trip.longWeekendPackages,
      doubleSharingRate: hasDoubleInPackages ? 0 : doubleRate,
      isLongWeekend: true,
      isFestive: false,
    }
  }

  // 3. Regular Batch Resolution
  if (trip.regularPackages && trip.regularPackages.length > 0) {
    const doubleRate = typeof trip.doubleSharingRate === 'number' ? trip.doubleSharingRate : 0
    const hasDoubleInPackages = trip.regularPackages.some((p) => p.label.toLowerCase().includes('double'))

    return {
      packages: trip.regularPackages,
      doubleSharingRate: hasDoubleInPackages ? 0 : doubleRate,
      isLongWeekend: isLW,
      isFestive: isFestive,
    }
  }

  // 4. Backward Compatibility Fallback from trip.pricingOptions
  let fallbackList =
    trip.pricingOptions && trip.pricingOptions.length > 0
      ? trip.pricingOptions.filter(
          (o) =>
            !o.label.toLowerCase().includes('add-on') &&
            !o.label.toLowerCase().includes('booking advance') &&
            !o.label.toLowerCase().includes('taxes') &&
            !o.price.startsWith('+') &&
            !o.price.toLowerCase().includes('on request') &&
            !o.price.toLowerCase().includes('as applicable')
        )
      : [{ label: 'Standard Package', price: trip.price }]

  if (isFestive) {
    const festiveMatches = fallbackList.filter((o) => {
      const txt = (o.label + ' ' + (o.note || '')).toLowerCase()
      return (
        txt.includes('xmas') ||
        txt.includes('christmas') ||
        txt.includes('new year') ||
        txt.includes('festive') ||
        txt.includes('special batch')
      )
    })
    if (festiveMatches.length > 0) {
      fallbackList = festiveMatches
    }
  } else {
    const nonFestiveMatches = fallbackList.filter((o) => {
      const txt = (o.label + ' ' + (o.note || '')).toLowerCase()
      return (
        !txt.includes('xmas') &&
        !txt.includes('christmas') &&
        !txt.includes('new year') &&
        !txt.includes('festive') &&
        !txt.includes('special batch')
      )
    })
    if (nonFestiveMatches.length > 0) {
      fallbackList = nonFestiveMatches
    }
  }

  const hasDoubleInPackages = fallbackList.some((p) => p.label.toLowerCase().includes('double'))
  const doubleRate =
    typeof trip.doubleSharingRate === 'number'
      ? trip.doubleSharingRate
      : hasDoubleInPackages
      ? 0
      : DEFAULT_DOUBLE_SHARING_RATE

  return {
    packages: fallbackList.length > 0 ? fallbackList : [{ label: 'Standard Package', price: trip.price }],
    doubleSharingRate: hasDoubleInPackages ? 0 : doubleRate,
    isLongWeekend: isLW,
    isFestive: isFestive,
  }
}

/**
 * Single Authoritative Dynamic Pricing Engine
 * Recalculates every rupee exclusively based on the exact selected departure date & package.
 */
export function calculateBookingPricing(params: {
  tripSlug: string
  selectedDate?: string
  packageIndex?: number
  guests?: number
  isDoubleSharing?: boolean
  paymentType?: 'advance' | 'full'
  couponCode?: string
}): PricingBreakdown {
  const { tripSlug, selectedDate } = params

  // 1. Locate trip record
  const trip: Trip = trips.find((t) => t.slug === tripSlug) || trips[0]

  // 2. Sanitize guest count
  const guests = sanitizeGuests(params.guests)

  // 3. Resolve dynamic packages for the selected date
  const { packages, doubleSharingRate, isLongWeekend, isFestive } = resolveTripDynamicPackages(
    trip,
    selectedDate
  )

  // 4. Resolve package selection
  let selectedPackageIndex = 0
  let packageLabel = 'Standard Package'
  let basePricePerPerson = parseNumericPrice(trip.price, 8499)

  if (packages.length > 0) {
    const rawIdx = typeof params.packageIndex === 'number' ? Math.floor(params.packageIndex) : 0
    selectedPackageIndex = Math.max(0, Math.min(packages.length - 1, rawIdx))
    const selectedOption = packages[selectedPackageIndex]
    packageLabel = selectedOption.label
    basePricePerPerson = parseNumericPrice(selectedOption.price, basePricePerPerson)
  }

  // 5. Double sharing calculation
  // If packages already contain double sharing tiers (e.g. Spiti, Meghalaya), double sharing is NOT an add-on
  const hasDoubleInPackages =
    packages.some((p) => p.label.toLowerCase().includes('double')) ||
    packageLabel.toLowerCase().includes('double')

  const effectiveDoubleSharingRate = hasDoubleInPackages ? 0 : doubleSharingRate
  const isDoubleSharing = Boolean(params.isDoubleSharing) && effectiveDoubleSharingRate > 0
  const doubleSharingAddonPerPerson = isDoubleSharing ? effectiveDoubleSharingRate : 0

  const totalPerPerson = basePricePerPerson + doubleSharingAddonPerPerson

  // 6. Subtotal, GST & TCS (2% TCS exclusively on International trips)
  const subtotal = totalPerPerson * guests
  const gstAmount = Math.round(subtotal * GST_RATE)
  const isInternational = trip.region === 'International'
  const tcsRate = isInternational ? INTERNATIONAL_TCS_RATE : 0
  const tcsAmount = isInternational ? Math.round(subtotal * INTERNATIONAL_TCS_RATE) : 0
  const rawGrandTotal = subtotal + gstAmount + tcsAmount

  // 7. Coupon Discount
  const couponValidation = validateCoupon(params.couponCode)
  const couponDiscount = couponValidation.valid ? Math.min(couponValidation.discount, rawGrandTotal) : 0
  const couponCode = couponValidation.valid ? couponValidation.cleanCode : undefined
  const couponDescription = couponValidation.valid ? couponValidation.description : undefined
  const grandTotal = Math.max(0, rawGrandTotal - couponDiscount)

  // 8. Advance calculation
  const advancePerPerson = parseNumericPrice(trip.bookingAmount, 4000)
  const rawAdvanceTotal = advancePerPerson * guests
  const advanceTotal = Math.min(rawAdvanceTotal, grandTotal)

  // 9. Payment Type & Discount (₹1,000 off per person strictly for full payment)
  const paymentType: 'advance' | 'full' = params.paymentType === 'full' ? 'full' : 'advance'
  const isFullPayment = paymentType === 'full'

  const totalFullPaymentDiscount = FULL_PAYMENT_DISCOUNT_PER_PERSON * guests
  const fullPaymentDiscount = isFullPayment ? Math.min(totalFullPaymentDiscount, grandTotal) : 0
  const fullPaymentTotal = Math.max(0, grandTotal - fullPaymentDiscount)

  const amountToPayToday = isFullPayment ? fullPaymentTotal : advanceTotal
  const remainingBalance = isFullPayment ? 0 : Math.max(0, grandTotal - advanceTotal)

  return Object.freeze({
    tripSlug: trip.slug,
    tripTitle: trip.title,
    isInternational,
    selectedDate,
    selectedPackageIndex,
    packageLabel,
    basePricePerPerson,
    isDoubleSharing,
    doubleSharingRate,
    doubleSharingAddonPerPerson,
    totalPerPerson,
    guests,
    subtotal,
    gstRate: GST_RATE,
    gstAmount,
    tcsRate,
    tcsAmount,
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
    isLongWeekend,
    isFestive,
    currency: 'INR',
    availablePackages: packages,
  })
}
