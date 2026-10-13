'use client'

import { useState, useMemo, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CalendarDays,
  Users,
  MapPin,
  Clock3,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  PhoneCall,
  Download,
  Share2,
  ChevronDown,
  Sparkles,
  CreditCard,
  Building2,
  Smartphone,
  AlertCircle,
  Tag,
  X
} from 'lucide-react'
import { trips } from '@/lib/travel-data'
import type { Trip } from '@/lib/travel-data'
import { calculateBookingPricing, sanitizeGuests, validateCoupon, MAX_GUESTS, MIN_GUESTS } from '@/lib/pricing-calculator'
import { getTripPrimaryDate, filterUpcomingDates, isDateUpcoming } from '@/lib/date-utils'

export type TravellerInfo = {
  fullName: string
  age: string
  gender: string
  phone?: string
  email?: string
}

export function BookingContent() {
  const searchParams = useSearchParams()
  const tripParam = searchParams.get('trip')
  const dateParam = searchParams.get('date')
  const guestsParam = searchParams.get('guests')

  // Find selected trip or default to first
  const initialTrip = trips.find((t) => t.slug === tripParam) || trips[0]
  const [selectedTrip, setSelectedTrip] = useState<Trip>(initialTrip)

  // Dates - Filtered exclusively for upcoming active departures
  const availableDates = useMemo(() => {
    if (selectedTrip.dates && selectedTrip.dates.length > 0) {
      const filtered = filterUpcomingDates(selectedTrip.dates)
      if (filtered.length > 0) return filtered
    }
    const primary = getTripPrimaryDate(selectedTrip)
    return [primary]
  }, [selectedTrip])

  const [selectedDate, setSelectedDate] = useState<string>(() => {
    if (dateParam) {
      const decoded = decodeURIComponent(dateParam)
      if (isDateUpcoming(decoded)) return decoded
    }
    return availableDates[0]
  })

  // Guests - rigorously sanitized
  const [guests, setGuests] = useState<number>(() => sanitizeGuests(guestsParam || 2))

  // Package options
  const pkgParam = searchParams.get('pkg') || searchParams.get('package')
  const [selectedPackageIndex, setSelectedPackageIndex] = useState<number>(() => {
    if (pkgParam) {
      const parsed = parseInt(pkgParam, 10)
      if (!isNaN(parsed) && parsed >= 0) return parsed
    }
    return 0
  })
  const [isDoubleSharing, setIsDoubleSharing] = useState<boolean>(false)

  // Payment choice: 'advance' or 'full'
  const [paymentType, setPaymentType] = useState<'advance' | 'full'>('advance')

  // Coupon state
  const [couponInput, setCouponInput] = useState<string>('')
  const [appliedCoupon, setAppliedCoupon] = useState<string>('')
  const [couponError, setCouponError] = useState<string | null>(null)
  const [couponSuccess, setCouponSuccess] = useState<string | null>(null)

  // Dynamic Multi-Traveller Form state
  const [travellers, setTravellers] = useState<TravellerInfo[]>(() => {
    const initialCount = sanitizeGuests(guestsParam || 2)
    return Array.from({ length: initialCount }, () => ({
      fullName: '',
      age: '',
      gender: 'Male',
      phone: '',
      email: ''
    }))
  })

  // General group notes
  const [city, setCity] = useState<string>('')
  const [specialRequest, setSpecialRequest] = useState<string>('')

  // Sync travellers array with guests count
  useEffect(() => {
    setTravellers((prev) => {
      if (prev.length === guests) return prev
      const updated = [...prev]
      if (updated.length < guests) {
        while (updated.length < guests) {
          updated.push({
            fullName: '',
            age: '',
            gender: 'Male',
            phone: '',
            email: ''
          })
        }
      } else if (updated.length > guests) {
        return updated.slice(0, guests)
      }
      return updated
    })
  }, [guests])

  const updateTraveller = (index: number, field: keyof TravellerInfo, value: string) => {
    setTravellers((prev) => {
      const updated = [...prev]
      updated[index] = { ...updated[index], [field]: value }
      return updated
    })
  }

  // Booking state
  const [isProcessing, setIsProcessing] = useState(false)
  const [isBooked, setIsBooked] = useState(false)
  const [bookingId, setBookingId] = useState('')
  const [paymentId, setPaymentId] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // Rigorous Anti-Tamper Pricing Engine Calculation (Dynamically adjusts based on selected departure date)
  const pricing = useMemo(() => {
    return calculateBookingPricing({
      tripSlug: selectedTrip.slug,
      selectedDate,
      packageIndex: selectedPackageIndex,
      guests,
      isDoubleSharing,
      paymentType,
      couponCode: appliedCoupon
    })
  }, [selectedTrip.slug, selectedDate, selectedPackageIndex, guests, isDoubleSharing, paymentType, appliedCoupon])

  // Auto-reset double sharing selection when navigating to a trip or package without double sharing add-on
  useEffect(() => {
    if (pricing.doubleSharingRate === 0 && isDoubleSharing) {
      setIsDoubleSharing(false)
    }
  }, [pricing.doubleSharingRate, isDoubleSharing])

  const {
    basePricePerPerson,
    subtotal,
    isInternational,
    gstAmount,
    tcsAmount,
    grandTotal,
    advanceTotal,
    fullPaymentDiscount,
    couponCode,
    couponDiscount,
    couponDescription,
    amountToPayToday,
    remainingBalance,
    isFullPayment
  } = pricing

  const selectedPackage = pricing.availablePackages?.[selectedPackageIndex]


  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault()
    setCouponError(null)
    setCouponSuccess(null)
    const clean = couponInput.trim().toUpperCase()
    if (!clean) {
      setCouponError('Please enter a coupon code.')
      return
    }
    const res = validateCoupon(clean)
    if (res.valid) {
      setAppliedCoupon(res.cleanCode || clean)
      setCouponSuccess(`Coupon ${res.cleanCode} applied! ₹${res.discount} discount savings.`)
      setCouponInput('')
    } else {
      setCouponError('Invalid coupon code. Please check and try again.')
    }
  }

  const handleRemoveCoupon = () => {
    setAppliedCoupon('')
    setCouponInput('')
    setCouponError(null)
    setCouponSuccess(null)
  }

  const handleTripChange = (slug: string) => {
    const found = trips.find((t) => t.slug === slug)
    if (found) {
      setSelectedTrip(found)
      const primary = getTripPrimaryDate(found)
      setSelectedDate(primary)
      setSelectedPackageIndex(0)
      setIsDoubleSharing(false)
    }
  }

  const updateGuests = (nextVal: number) => {
    setGuests(sanitizeGuests(nextVal))
  }

  // Dynamically load Razorpay standard checkout script
  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (typeof window !== 'undefined' && (window as any).Razorpay) {
        resolve(true)
        return
      }
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.async = true
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)

    // Validate All Selected Travellers
    for (let i = 0; i < guests; i++) {
      const member = travellers[i] || { fullName: '', email: '', phone: '', age: '', gender: 'Male' }
      const name = (member.fullName || '').trim()
      const email = (member.email || '').trim()
      const phone = (member.phone || '').trim()
      const ageNum = parseInt((member.age || '').trim(), 10)
      const isLead = i === 0
      const label = isLead ? 'Traveller 1 (Lead)' : `Traveller ${i + 1}`

      if (!name) {
        setErrorMessage(`Please enter the full name for ${label}.`)
        document.getElementById('traveller-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        return
      }

      // Phone is compulsory for Lead Traveller; optional for companions (validated if provided)
      if (isLead) {
        if (!phone) {
          setErrorMessage(`Please enter the WhatsApp / contact phone number for ${label}.`)
          document.getElementById('traveller-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
          return
        }
        const phoneDigits = phone.replace(/[^\d]/g, '')
        if (phoneDigits.length < 10) {
          setErrorMessage(`Please enter a valid 10-digit WhatsApp / phone number for ${label}.`)
          document.getElementById('traveller-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
          return
        }
      } else if (phone) {
        const phoneDigits = phone.replace(/[^\d]/g, '')
        if (phoneDigits.length < 10) {
          setErrorMessage(`Please enter a valid 10-digit phone number for ${label}, or leave it blank.`)
          document.getElementById('traveller-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
          return
        }
      }

      // Email is optional for all travellers; validated only if provided
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setErrorMessage(`Please enter a valid email address for ${label}, or leave it blank.`)
        document.getElementById('traveller-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        return
      }

      if (!member.age || isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
        setErrorMessage(`Please enter a valid age (between 1 and 120) for ${label}.`)
        document.getElementById('traveller-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        return
      }
    }

    const lead = travellers[0] || { fullName: '', email: '', phone: '', age: '', gender: 'Male' }
    const trimmedLeadName = (lead.fullName || '').trim()
    const trimmedLeadEmail = (lead.email || '').trim()
    const trimmedLeadPhone = (lead.phone || '').trim()
    const leadAgeNum = parseInt((lead.age || '').trim(), 10) || 25

    setIsProcessing(true)

    try {
      // 1. Ensure Razorpay script is loaded
      const isScriptLoaded = await loadRazorpayScript()
      if (!isScriptLoaded) {
        throw new Error('Could not connect to Razorpay payment gateway. Please check your internet connection.')
      }

      // 2. Create Razorpay order on server
      const orderRes = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tripSlug: selectedTrip.slug,
          packageIndex: selectedPackageIndex,
          guests,
          isDoubleSharing,
          paymentType,
          couponCode: appliedCoupon,
          date: selectedDate,
          fullName: trimmedLeadName,
          email: trimmedLeadEmail,
          phone: trimmedLeadPhone,
          age: leadAgeNum,
          city: city.trim(),
          specialRequest: specialRequest.trim(),
          travellers: travellers.map((t, idx) => ({
            fullName: t.fullName.trim(),
            age: parseInt(t.age.trim(), 10) || (idx === 0 ? leadAgeNum : 25),
            gender: t.gender || 'Male',
            phone: (t.phone || '').trim(),
            email: (t.email || '').trim()
          }))
        })
      })

      const orderData = await orderRes.json()

      if (!orderRes.ok || !orderData.success) {
        throw new Error(orderData.error || 'Failed to initialize payment. Please check your details.')
      }

      // 3. Configure and Launch Razorpay Checkout Modal
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency || 'INR',
        name: 'Travel Tribes',
        description: `${orderData.pricing.tripTitle} (${orderData.pricing.packageLabel})`,
        image: '/image/Logowithbg.png',
        order_id: orderData.orderId,
        prefill: {
          name: trimmedLeadName,
          email: trimmedLeadEmail,
          contact: trimmedLeadPhone
        },
        notes: {
          bookingId: orderData.bookingId,
          travelDate: selectedDate
        },
        theme: {
          color: '#0b2940'
        },
        handler: async function (paymentResponse: any) {
          setIsProcessing(true)
          try {
            // 4. Verify Payment on Server
            const verifyRes = await fetch('/api/razorpay/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: paymentResponse.razorpay_order_id,
                razorpay_payment_id: paymentResponse.razorpay_payment_id,
                razorpay_signature: paymentResponse.razorpay_signature,
                bookingId: orderData.bookingId,
                bookingConfig: orderData.bookingConfig,
                pricing: orderData.pricing,
                traveller: orderData.traveller
              })
            })

            const verifyData = await verifyRes.json()

            if (!verifyRes.ok || !verifyData.success) {
              throw new Error(verifyData.error || 'Payment verification encountered an issue.')
            }

            setBookingId(orderData.bookingId)
            setPaymentId(paymentResponse.razorpay_payment_id)
            setIsProcessing(false)
            setIsBooked(true)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          } catch (verifyErr: any) {
            console.error('Verification error:', verifyErr)
            setErrorMessage(verifyErr?.message || 'Payment received but verification encountered an issue. Our team has been notified.')
            setIsProcessing(false)
          }
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false)
            setErrorMessage('Payment window was closed. You can complete your booking whenever ready.')
          }
        }
      }

      const rzp = new (window as any).Razorpay(options)
      rzp.on('payment.failed', function (response: any) {
        setIsProcessing(false)
        setErrorMessage(
          `Payment Failed: ${response.error?.description || response.error?.reason || 'Payment could not be processed'}`
        )
      })
      rzp.open()

    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Payment connection failed. Please retry.'
      setErrorMessage(msg)
      setIsProcessing(false)
    }
  }

  return (
    <div className="bg-[#f7fbfd] min-h-screen py-5 pb-32 sm:py-8 lg:py-12 lg:pb-14 text-slate-800">
      <div className="max-w-[1160px] mx-auto px-2.5 sm:px-6 lg:px-8">

        {/* Header Breadcrumb */}
        <div className="flex items-center justify-between gap-3 mb-4 sm:mb-8">
          <div>
            <div className="flex items-center gap-1.5 text-[10.5px] sm:text-[11px] font-bold text-[var(--sky)] uppercase tracking-wider mb-1 flex-wrap">
              <Link href="/" className="hover:underline">Home</Link>
              <span>/</span>
              <Link href={`/itinerary/${selectedTrip.slug}`} className="hover:underline truncate max-w-[170px] sm:max-w-none inline-block align-bottom">{selectedTrip.title}</Link>
              <span>/</span>
              <span className="text-slate-400">Checkout</span>
            </div>
            <h1 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--navy)]">
              {isBooked ? 'Booking Confirmed! 🎉' : 'Complete Your Booking'}
            </h1>
          </div>
          <div className="hidden sm:flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-xs">
            <ShieldCheck size={15} className="text-emerald-500" />
            <span>100% Safe & Verified</span>
          </div>
        </div>

        {/* BOOKED CONFIRMATION VOUCHER SCREEN */}
        {isBooked ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-10 border border-[var(--sky-pale)] shadow-[0_15px_40px_rgba(67,169,209,0.15)]"
          >
            <div className="text-center pb-5 sm:pb-6 border-b border-slate-100">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-xs">
                <CheckCircle2 size={32} className="sm:w-9 sm:h-9" />
              </div>
              <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-2">
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[var(--sky)] bg-[var(--sky-pale)] px-2.5 py-0.5 rounded-full">
                  Booking ID: {bookingId}
                </span>
                {paymentId && (
                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 size={12} className="text-emerald-600" />
                    Payment ID: {paymentId}
                  </span>
                )}
              </div>
              <h2 className="text-xl sm:text-3xl font-extrabold text-[var(--navy)] mt-2 sm:mt-3">
                Pack Your Bags, {(travellers[0]?.fullName || 'Traveller').split(' ')[0]}!
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm mt-1 max-w-md mx-auto">
                Your payment is verified and your slot is officially confirmed. A receipt has been emailed to you.
              </p>
            </div>

            {/* Voucher Details Card */}
            <div className="my-5 bg-slate-50 rounded-xl sm:rounded-2xl p-3.5 sm:p-5 border border-slate-200/80 space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Trip Name</span>
                <span className="font-bold text-[var(--navy)] text-right">{selectedTrip.title}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Departure Date</span>
                <span className="font-semibold text-slate-800">{selectedDate}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Number of Travellers</span>
                <span className="font-semibold text-slate-800">{guests} {guests > 1 ? 'Persons' : 'Person'}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Lead Contact</span>
                <span className="font-semibold text-slate-800">
                  {travellers[0]?.fullName} ({travellers[0]?.phone})
                </span>
              </div>
              {/* All Travellers Roster */}
              <div className="py-2 border-b border-slate-200/60">
                <span className="text-slate-500 block mb-1 font-medium">Traveller List ({guests})</span>
                <div className="space-y-1 pl-1">
                  {travellers.map((t, i) => (
                    <div key={i} className="flex justify-between text-xs text-slate-700 font-semibold">
                      <span>{i + 1}. {t.fullName || `Traveller ${i + 1}`} {t.gender ? `(${t.gender})` : ''}</span>
                      <span className="text-slate-500">Age: {t.age || '-'}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Payment Option</span>
                <span className="font-bold text-[var(--navy)]">
                  {isFullPayment ? 'Full Payment (Discount Applied)' : 'Advance Booking'}
                </span>
              </div>
              {paymentId && (
                <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                  <span className="text-slate-500">Razorpay Ref</span>
                  <span className="font-mono text-xs font-bold text-slate-700">{paymentId}</span>
                </div>
              )}
              {couponDiscount > 0 && (
                <div className="flex justify-between items-center py-1 border-b border-slate-200/60 text-emerald-700 font-semibold">
                  <span className="flex items-center gap-1.5"><Tag size={13} className="text-emerald-600" /> Promo Code ({couponCode})</span>
                  <span>-₹{couponDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}
              {isFullPayment && (
                <div className="flex justify-between items-center py-1 border-b border-slate-200/60 text-emerald-700 font-semibold">
                  <span className="flex items-center gap-1.5"><Sparkles size={13} className="text-emerald-600" /> Full Payment Discount</span>
                  <span>-₹{fullPaymentDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Amount Paid Today</span>
                <span className="font-bold text-emerald-600 text-base">₹{amountToPayToday.toLocaleString('en-IN')}</span>
              </div>
              {remainingBalance > 0 ? (
                <div className="flex justify-between items-center pt-1 text-slate-600 text-xs">
                  <span>Balance Due (Before Departure)</span>
                  <span className="font-semibold">₹{remainingBalance.toLocaleString('en-IN')}</span>
                </div>
              ) : (
                <div className="flex justify-between items-center pt-1 text-emerald-700 text-xs font-bold">
                  <span>Booking Status</span>
                  <span className="bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full text-[11px]">100% Fully Paid</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-1">
              <a
                href={`https://wa.me/919975822023?text=${encodeURIComponent(
                  `Hi Travel Tribes! I just booked *${selectedTrip.title}* for *${selectedDate}* (${guests} Guests:\n${travellers.map((t, i) => `${i + 1}. ${t.fullName} (Age ${t.age})`).join('\n')}).\nBooking ID: *${bookingId}*${paymentId ? ` (Payment ID: ${paymentId})` : ''}. Payment Mode: ${isFullPayment ? `Full Payment (₹${amountToPayToday.toLocaleString('en-IN')})` : `Advance Payment (₹${amountToPayToday.toLocaleString('en-IN')})`}${couponDiscount > 0 ? ` [Coupon ${couponCode}: ₹${couponDiscount} off]` : ''}. Please share the group chat link and preparation guide!`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-3 sm:py-3.5 px-5 rounded-full font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-300"
              >
                <Smartphone size={17} /> Connect on WhatsApp for Trip Updates
              </a>

              <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                <button
                  onClick={() => window.print()}
                  className="py-2.5 sm:py-3 px-3 sm:px-4 border border-slate-200 rounded-full font-semibold text-xs text-slate-600 hover:bg-slate-100 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Download size={14} /> Save Receipt
                </button>
                <Link
                  href="/"
                  className="py-2.5 sm:py-3 px-3 sm:px-4 bg-[var(--sky-pale)] text-[var(--sky)] rounded-full font-bold text-xs hover:bg-[var(--sky)] hover:text-white transition-colors flex items-center justify-center gap-1.5"
                >
                  Explore More Trips
                </Link>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 items-start">

            {/* LEFT COLUMN: Booking Config & Traveller Info (7 cols) */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6">

              {/* Step 1: Trip & Departure Selection */}
              <div className="bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-7 lg:p-8 border border-[var(--border)] shadow-[0_4px_20px_rgba(67,169,209,0.06)]">
                <div className="flex items-center gap-2.5 sm:gap-3 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-slate-100">
                  <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[var(--sky-pale)] text-[var(--sky)] font-extrabold text-xs sm:text-sm flex items-center justify-center shrink-0">
                    1
                  </span>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-[var(--navy)] leading-tight">Trip & Departure Details</h2>
                    <p className="text-[11px] sm:text-xs text-slate-400">Select your destination, batch date, and party size</p>
                  </div>
                </div>

                <div className="space-y-4 sm:space-y-5">
                  {/* Selected Itinerary Trip (Read-only / Locked) */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-[11px] sm:text-xs font-bold text-slate-700">
                        Destination Trip
                      </label>
                      <span className="text-[9.5px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-md">
                        <Lock size={10} className="text-slate-400" /> Selected from Itinerary
                      </span>
                    </div>
                    <div className="w-full bg-slate-50 border border-slate-200/90 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-[var(--navy)] font-bold flex items-center justify-between">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-2 h-2 rounded-full bg-[var(--sky)] shrink-0" />
                        <span className="truncate">{selectedTrip.title} ({selectedTrip.duration})</span>
                      </div>
                      <span className="text-xs font-extrabold text-[var(--sky)] shrink-0 ml-2">from {selectedTrip.price}</span>
                    </div>
                  </div>

                  {/* Date & Guests Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {/* Batch Date Dropdown */}
                    <div>
                      <label className="block text-[11px] sm:text-xs font-bold text-slate-700 mb-1">
                        Departure Batch
                      </label>
                      <div className="relative">
                        <select
                          value={selectedDate}
                          onChange={(e) => {
                            setSelectedDate(e.target.value)
                            setSelectedPackageIndex(0)
                          }}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-[var(--navy)] font-semibold focus:outline-none focus:border-[var(--sky)] focus:bg-white appearance-none cursor-pointer transition-all"
                        >
                          {availableDates.map((d, i) => (
                            <option key={i} value={d}>
                              {d}
                            </option>
                          ))}
                        </select>
                        <CalendarDays size={15} className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                      </div>
                    </div>

                    {/* Guest Counter */}
                    <div>
                      <label className="block text-[11px] sm:text-xs font-bold text-slate-700 mb-1">
                        Travellers Count
                      </label>
                      <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl p-1 justify-between">
                        <button
                          type="button"
                          onClick={() => updateGuests(guests - 1)}
                          disabled={guests <= MIN_GUESTS}
                          className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center font-bold text-slate-600 hover:bg-slate-100 disabled:opacity-40 transition-colors cursor-pointer"
                        >
                          -
                        </button>
                        <div className="flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-[var(--navy)]">
                          <Users size={15} className="text-[var(--sky)]" />
                          <span>{guests} {guests > 1 ? 'Guests' : 'Guest'}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => updateGuests(guests + 1)}
                          disabled={guests >= MAX_GUESTS}
                          className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center font-bold text-slate-600 hover:bg-slate-100 disabled:opacity-40 transition-colors cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Batch Type Badge Indicator */}
                  {(pricing.isLongWeekend || pricing.isFestive) && (
                    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[var(--sky-pale)]/70 border border-[var(--sky)]/30 text-[11.5px] sm:text-xs font-bold text-[var(--navy)]">
                      <Sparkles size={14} className="text-[var(--sky)] shrink-0" />
                      <span>
                        {pricing.isFestive
                          ? '🎉 Christmas & New Year Special Batch — Festive Rates Applied'
                          : '⭐ Long Weekend Batch (LW) — Special Long Weekend Rates Applied'}
                      </span>
                    </div>
                  )}

                  {/* Package Tier Options (e.g. Sleeper / 3AC / Quad / Triple) */}
                  {pricing.availablePackages && pricing.availablePackages.length > 0 && (
                    <div className="pt-1">
                      <label className="block text-[11px] sm:text-xs font-bold text-slate-700 mb-1.5">
                        Select Travel / Room Package
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                        {pricing.availablePackages.map((opt, idx) => {
                          const isSelected = selectedPackageIndex === idx
                          return (
                            <div
                              key={idx}
                              onClick={() => setSelectedPackageIndex(idx)}
                              className={`p-3 sm:p-3.5 rounded-xl sm:rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                                isSelected
                                  ? 'border-[var(--sky)] bg-[var(--sky-pale)]/50 shadow-xs'
                                  : 'border-slate-200 bg-slate-50/70 hover:bg-slate-100/80'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-[var(--navy)]">{opt.label}</span>
                                {isSelected && <CheckCircle2 size={15} className="text-[var(--sky)] shrink-0" />}
                              </div>
                              <div className="mt-1.5 flex items-baseline justify-between">
                                <span className="text-xs sm:text-sm font-extrabold text-[var(--navy)]">{opt.price}</span>
                                {opt.note && <span className="text-[10px] text-slate-400 font-medium">{opt.note}</span>}
                              </div>
                            </div>
                          )
                        })}
                      </div>

                      {/* Double Sharing Room Addon Checkbox */}
                      {pricing.doubleSharingRate > 0 &&
                      !pricing.availablePackages.some((p) => p.label.toLowerCase().includes('double')) ? (
                        <div
                          className="mt-2.5 p-3 sm:p-3.5 bg-amber-50/70 border border-amber-200/80 rounded-xl flex items-center justify-between cursor-pointer"
                          onClick={() => setIsDoubleSharing(!isDoubleSharing)}
                        >
                          <div className="flex items-center gap-2.5">
                            <input
                              type="checkbox"
                              checked={isDoubleSharing}
                              onChange={(e) => setIsDoubleSharing(e.target.checked)}
                              className="w-4 h-4 accent-[var(--sky)] cursor-pointer shrink-0"
                            />
                            <div>
                              <span className="text-xs font-bold text-amber-950">Add Double Sharing Room</span>
                              <p className="text-[10px] text-amber-800/80">
                                Private room for 2 persons (+₹{pricing.doubleSharingRate.toLocaleString('en-IN')} / person)
                              </p>
                            </div>
                          </div>
                          <span className="text-xs font-bold text-amber-900 shrink-0 ml-2">
                            +₹{pricing.doubleSharingRate.toLocaleString('en-IN')}
                          </span>
                        </div>
                      ) : null}
                    </div>
                  )}

                </div>
              </div>

              {/* Step 2: Traveller Details Form */}
              <form id="traveller-form" onSubmit={handleFormSubmit} className="bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-7 lg:p-8 border border-[var(--border)] shadow-[0_4px_20px_rgba(67,169,209,0.06)]">
                <div className="flex items-center gap-2.5 sm:gap-3 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-slate-100">
                  <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[var(--sky-pale)] text-[var(--sky)] font-extrabold text-xs sm:text-sm flex items-center justify-center shrink-0">
                    2
                  </span>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-[var(--navy)] leading-tight">
                      Traveller Details ({guests} {guests > 1 ? 'Travellers' : 'Traveller'})
                    </h2>
                    <p className="text-[11px] sm:text-xs text-slate-400">Fill details for all members travelling in your party</p>
                  </div>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  {travellers.map((traveller, index) => {
                    const isLead = index === 0
                    return (
                      <div
                        key={index}
                        className={`p-3 sm:p-4.5 rounded-xl sm:rounded-2xl border transition-all ${
                          isLead
                            ? 'bg-sky-50/30 border-[var(--sky-pale)] shadow-xs'
                            : 'bg-slate-50/60 border-slate-200/80'
                        } space-y-3`}
                      >
                        <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
                          <div className="flex items-center gap-2 min-w-0">
                            <span
                              className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full text-[10px] sm:text-xs font-bold flex items-center justify-center shrink-0 ${
                                isLead
                                  ? 'bg-[var(--sky)] text-white'
                                  : 'bg-slate-300 text-slate-700'
                              }`}
                            >
                              {index + 1}
                            </span>
                            <span className="text-xs sm:text-sm font-bold text-[var(--navy)] truncate">
                              {isLead
                                ? 'Lead Traveller'
                                : `Traveller ${index + 1}`}
                            </span>
                          </div>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                              isLead
                                ? 'text-[var(--sky)] bg-[var(--sky-pale)]'
                                : 'text-slate-500 bg-slate-200/60'
                            }`}
                          >
                            {isLead ? 'Primary Contact' : `Guest ${index + 1}`}
                          </span>
                        </div>

                        {/* Name */}
                        <div>
                          <label className="block text-[11px] sm:text-xs font-bold text-slate-700 mb-1">
                            Full Name <span className="text-rose-500">*</span>
                          </label>
                          <input
                            required
                            type="text"
                            placeholder={isLead ? 'e.g. Rahul Sharma (Lead)' : `e.g. Guest ${index + 1} Full Name`}
                            value={traveller.fullName}
                            onChange={(e) => updateTraveller(index, 'fullName', e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 sm:px-3.5 sm:py-2.5 text-xs sm:text-sm font-semibold text-[var(--navy)] placeholder:text-slate-400 focus:outline-none focus:border-[var(--sky)] transition-all"
                          />
                        </div>

                        {/* WhatsApp Number & Email Address */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                          <div>
                            <label className="block text-[11px] sm:text-xs font-bold text-slate-700 mb-1">
                              WhatsApp / Phone {isLead && <span className="text-rose-500">*</span>}
                              {!isLead && <span className="text-slate-400 font-normal ml-1">(Optional)</span>}
                            </label>
                            <input
                              required={isLead}
                              type="tel"
                              placeholder={isLead ? '+91 99758 22023' : `+91 Mobile / WhatsApp`}
                              value={traveller.phone || ''}
                              onChange={(e) => updateTraveller(index, 'phone', e.target.value)}
                              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 sm:px-3.5 sm:py-2.5 text-xs sm:text-sm font-semibold text-[var(--navy)] placeholder:text-slate-400 focus:outline-none focus:border-[var(--sky)] transition-all"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] sm:text-xs font-bold text-slate-700 mb-1">
                              Email Address <span className="text-slate-400 font-normal ml-1">(Optional)</span>
                            </label>
                            <input
                              type="email"
                              placeholder={isLead ? 'rahul@gmail.com' : `guest${index + 1}@gmail.com`}
                              value={traveller.email || ''}
                              onChange={(e) => updateTraveller(index, 'email', e.target.value)}
                              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 sm:px-3.5 sm:py-2.5 text-xs sm:text-sm font-semibold text-[var(--navy)] placeholder:text-slate-400 focus:outline-none focus:border-[var(--sky)] transition-all"
                            />
                          </div>
                        </div>

                        {/* Age & Gender side by side on mobile */}
                        <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                          <div>
                            <label className="block text-[11px] sm:text-xs font-bold text-slate-700 mb-1">
                              Age <span className="text-rose-500">*</span>
                            </label>
                            <input
                              required
                              type="number"
                              min="1"
                              max="120"
                              placeholder="e.g. 24"
                              value={traveller.age}
                              onChange={(e) => updateTraveller(index, 'age', e.target.value)}
                              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 sm:px-3.5 sm:py-2.5 text-xs sm:text-sm font-semibold text-[var(--navy)] placeholder:text-slate-400 focus:outline-none focus:border-[var(--sky)] transition-all"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] sm:text-xs font-bold text-slate-700 mb-1">
                              Gender <span className="text-rose-500">*</span>
                            </label>
                            <select
                              value={traveller.gender || 'Male'}
                              onChange={(e) => updateTraveller(index, 'gender', e.target.value)}
                              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 sm:px-3.5 sm:py-2.5 text-xs sm:text-sm font-semibold text-[var(--navy)] focus:outline-none focus:border-[var(--sky)] transition-all cursor-pointer"
                            >
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    )
                  })}

                  {/* General Details (City & Special Requests) */}
                  <div className="pt-2 border-t border-slate-100">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                      <div>
                        <label className="block text-[11px] sm:text-xs font-bold text-slate-700 mb-1">
                          Departure City / Pickup Point
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Mumbai / Pune / Delhi"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 sm:px-3.5 sm:py-2.5 text-xs sm:text-sm text-[var(--navy)] font-semibold placeholder:text-slate-400 focus:outline-none focus:border-[var(--sky)] focus:bg-white transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] sm:text-xs font-bold text-slate-700 mb-1">
                          Special Requests (Optional)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Pure Veg, Jain, early check-in"
                          value={specialRequest}
                          onChange={(e) => setSpecialRequest(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 sm:px-3.5 sm:py-2.5 text-xs sm:text-sm text-[var(--navy)] font-semibold placeholder:text-slate-400 focus:outline-none focus:border-[var(--sky)] focus:bg-white transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Error Banner */}
                {errorMessage && (
                  <div className="mt-4 p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-xs text-rose-700 font-semibold animate-in fade-in duration-200">
                    <AlertCircle size={15} className="text-rose-600 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Mobile Pay CTA inside form */}
                <div className="mt-5 pt-4 border-t border-slate-100 lg:hidden">
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="glow-btn w-full py-3.5 rounded-full font-bold text-sm flex items-center justify-center gap-2 shadow-md disabled:opacity-50 cursor-pointer"
                  >
                    {isProcessing ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                        Processing Secure Payment...
                      </span>
                    ) : (
                      <>Pay Now • ₹{amountToPayToday.toLocaleString('en-IN')} <ArrowRight size={16} /></>
                    )}
                  </button>
                </div>
              </form>

            </div>

            {/* RIGHT COLUMN: Summary & Payment Box (5 cols) */}
            <div className="lg:col-span-5 space-y-4 sm:space-y-6 lg:sticky lg:top-24">

              {/* Trip Overview Card */}
              <div className="bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-7 border border-[var(--border)] shadow-[0_4px_20px_rgba(67,169,209,0.06)]">
                <div className="flex gap-3 sm:gap-4 items-center sm:items-start pb-3.5 sm:pb-5 border-b border-slate-100">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl sm:rounded-2xl overflow-hidden shrink-0 bg-slate-100 shadow-xs">
                    <Image
                      src={selectedTrip.image}
                      alt={selectedTrip.alt}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-bold text-[var(--sky)] uppercase tracking-wider flex items-center gap-1">
                      <MapPin size={11} className="shrink-0" /> <span className="truncate">{selectedTrip.location.split(' · ')[0]}</span>
                    </span>
                    <h3 className="font-bold text-base sm:text-lg text-[var(--navy)] leading-snug mt-0.5 line-clamp-2">
                      {selectedTrip.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 text-[11px] sm:text-xs text-slate-500 mt-1.5 font-medium">
                      <span className="flex items-center gap-1"><Clock3 size={12} className="text-[var(--sky)] shrink-0" /> {selectedTrip.duration}</span>
                      <span>•</span>
                      <span>{selectedTrip.spots}</span>
                    </div>
                  </div>
                </div>

                {/* Trip Selected Info Quick Chips */}
                <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap items-center gap-1.5 text-[11px]">
                  <div className="bg-slate-100/90 text-slate-700 px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1.5">
                    <CalendarDays size={12} className="text-[var(--sky)] shrink-0" />
                    <span className="truncate max-w-[140px] sm:max-w-none">{selectedDate}</span>
                  </div>
                  <div className="bg-slate-100/90 text-slate-700 px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1.5">
                    <Users size={12} className="text-[var(--sky)] shrink-0" />
                    <span>{guests} {guests > 1 ? 'Guests' : 'Guest'}</span>
                  </div>
                  {selectedPackage && (
                    <div className="bg-[var(--sky-pale)]/60 text-[var(--navy)] px-2.5 py-1 rounded-lg font-bold text-[10.5px]">
                      {selectedPackage.label}
                    </div>
                  )}
                </div>

                {/* Payment Option Toggle: Advance vs Full */}
                <div className="pt-4 sm:pt-5">
                  <div className="flex flex-wrap items-center justify-between gap-1 mb-2">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Payment Preference
                    </label>
                    <span className="text-[10px] sm:text-[10.5px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Sparkles size={11} className="text-emerald-600 shrink-0" /> Save ₹{(1000 * guests).toLocaleString('en-IN')} on Full Pay
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-slate-50/80 p-1.5 rounded-2xl border border-slate-200">
                    <button
                      type="button"
                      onClick={() => setPaymentType('advance')}
                      className={`p-2.5 sm:p-3 rounded-xl text-left transition-all flex flex-col justify-between cursor-pointer ${
                        paymentType === 'advance'
                          ? 'bg-[var(--sky)] text-white shadow-xs'
                          : 'bg-white/80 hover:bg-white text-slate-700 hover:text-[var(--navy)] border border-transparent'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="text-xs font-bold">Pay Advance Only</span>
                        {paymentType === 'advance' && <CheckCircle2 size={15} className="text-white shrink-0" />}
                      </div>
                      <div className="mt-1 flex items-baseline justify-between">
                        <span className={`text-xs font-extrabold ${paymentType === 'advance' ? 'text-white' : 'text-slate-800'}`}>
                          ₹{advanceTotal.toLocaleString('en-IN')}
                        </span>
                        <span className={`text-[10px] ${paymentType === 'advance' ? 'text-sky-100' : 'text-slate-400'}`}>
                          Slot Confirmed
                        </span>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentType('full')}
                      className={`p-2.5 sm:p-3 rounded-xl text-left transition-all flex flex-col justify-between relative overflow-hidden cursor-pointer ${
                        paymentType === 'full'
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-white/80 hover:bg-white text-slate-700 hover:text-[var(--navy)] border border-emerald-200/80'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold">Pay Full Amount</span>
                          <span className={`text-[9px] font-black uppercase px-1.5 py-0.2 rounded ${
                            paymentType === 'full' ? 'bg-white text-emerald-700' : 'bg-emerald-600 text-white'
                          }`}>
                            -₹{(1000 * guests).toLocaleString('en-IN')}
                          </span>
                        </div>
                        {paymentType === 'full' && <CheckCircle2 size={15} className="text-white shrink-0" />}
                      </div>
                      <div className="flex items-baseline gap-1.5 mt-1">
                        <span className={`text-[10px] line-through ${paymentType === 'full' ? 'text-emerald-200' : 'text-slate-400'}`}>
                          ₹{grandTotal.toLocaleString('en-IN')}
                        </span>
                        <span className={`text-xs font-extrabold ${paymentType === 'full' ? 'text-white' : 'text-emerald-700'}`}>
                          ₹{Math.max(0, grandTotal - (1000 * guests)).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </button>
                  </div>
                </div>

                {/* DISCOUNT COUPON CODE SECTION */}
                <div className="pt-4 sm:pt-5 mt-4 sm:mt-5 border-t border-slate-100">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-[var(--navy)] flex items-center gap-1.5">
                      <Tag size={13} className="text-[var(--sky)] shrink-0" />
                      <span>Have a Discount Coupon?</span>
                    </label>
                  </div>

                  {appliedCoupon ? (
                    <div className="p-2.5 sm:p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between animate-in fade-in duration-200">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-6 h-6 sm:w-7 sm:h-7 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center font-bold text-xs shrink-0">
                          ✓
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-emerald-900 flex items-center gap-1.5 flex-wrap">
                            <span>{appliedCoupon}</span>
                            <span className="text-[10px] bg-emerald-200/80 text-emerald-800 px-1.5 py-0.2 rounded font-semibold">
                              -₹{couponDiscount.toLocaleString('en-IN')} OFF
                            </span>
                          </div>
                          {couponDescription && (
                            <p className="text-[10px] text-emerald-700 truncate">{couponDescription}</p>
                          )}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleRemoveCoupon}
                        className="text-xs text-slate-400 hover:text-rose-600 font-bold px-2 py-1 rounded hover:bg-rose-50 transition-colors flex items-center gap-1 shrink-0 cursor-pointer"
                        title="Remove coupon"
                      >
                        <X size={13} /> Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                      <div className="flex gap-2">
                        <div className="relative flex-1 min-w-0">
                          <input
                            type="text"
                            placeholder="Enter coupon code"
                            value={couponInput}
                            onChange={(e) => {
                              setCouponInput(e.target.value)
                              if (couponError) setCouponError(null)
                            }}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 sm:py-2.5 text-xs text-[var(--navy)] font-semibold uppercase placeholder:normal-case placeholder:text-slate-400 focus:outline-none focus:border-[var(--sky)] focus:bg-white transition-all"
                          />
                        </div>
                        <button
                          type="submit"
                          className="px-4 py-2 sm:py-2.5 rounded-xl bg-[var(--navy)] hover:bg-[var(--navy)]/90 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs shrink-0"
                        >
                          Apply
                        </button>
                      </div>

                      {couponError && (
                        <p className="text-[11px] text-rose-600 font-medium pl-1 flex items-center gap-1">
                          <AlertCircle size={12} className="shrink-0" /> {couponError}
                        </p>
                      )}
                    </form>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="pt-4 sm:pt-5 space-y-2 text-xs text-slate-600 border-t border-slate-100 mt-4 sm:mt-5">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Base Package (₹{basePricePerPerson.toLocaleString('en-IN')} × {guests})</span>
                    <span className="font-bold text-slate-800">₹{(basePricePerPerson * guests).toLocaleString('en-IN')}</span>
                  </div>

                  {isDoubleSharing && pricing.doubleSharingAddonPerPerson > 0 && (
                    <div className="flex justify-between items-center text-amber-800 font-medium">
                      <span>Double Sharing Addon (₹{pricing.doubleSharingRate.toLocaleString('en-IN')} × {guests})</span>
                      <span className="font-bold">+₹{(pricing.doubleSharingRate * guests).toLocaleString('en-IN')}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">GST (5%)</span>
                    <span className="font-bold text-slate-800">₹{gstAmount.toLocaleString('en-IN')}</span>
                  </div>

                  {isInternational && tcsAmount > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-1.5 text-slate-600">
                        <span>TCS (2%)</span>
                        <span className="text-[10px] font-bold text-sky-700 bg-sky-50 px-1.5 py-0.2 rounded border border-sky-200">International</span>
                      </span>
                      <span className="font-bold text-slate-800">₹{tcsAmount.toLocaleString('en-IN')}</span>
                    </div>
                  )}

                  {couponDiscount > 0 && (
                    <div className="flex justify-between items-center text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">
                      <span className="flex items-center gap-1"><Tag size={12} /> Coupon ({couponCode})</span>
                      <span>-₹{couponDiscount.toLocaleString('en-IN')}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                    <span className="text-slate-600 font-medium">Trip Subtotal</span>
                    <span className={`font-bold ${isFullPayment ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                      ₹{grandTotal.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {isFullPayment && (
                    <div className="flex justify-between items-center bg-emerald-50 text-emerald-700 font-bold px-2.5 py-1.5 rounded-xl text-xs border border-emerald-200/80">
                      <span className="flex items-center gap-1.5">
                        <Sparkles size={13} className="text-emerald-600 shrink-0" />
                        <span>Full Pay Discount (₹1,000 × {guests})</span>
                      </span>
                      <span>-₹{fullPaymentDiscount.toLocaleString('en-IN')}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-2 border-t border-slate-200 text-sm">
                    <span className="font-extrabold text-[var(--navy)]">
                      {isFullPayment ? 'Final Total (After Discount)' : 'Total Trip Cost'}
                    </span>
                    <span className="font-black text-[var(--navy)] text-base">
                      ₹{(isFullPayment ? Math.max(0, grandTotal - fullPaymentDiscount) : grandTotal).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Amount to Pay Today Highlight Box */}
                <div className={`mt-4 sm:mt-5 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border transition-all duration-300 ${
                  isFullPayment
                    ? 'bg-gradient-to-br from-emerald-50 via-teal-50/40 to-emerald-50/20 border-emerald-200 shadow-xs'
                    : 'bg-gradient-to-br from-sky-50 to-blue-50/60 border-[var(--sky-pale)]'
                }`}>
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="text-[11px] sm:text-xs font-bold text-slate-600 uppercase tracking-wider">Amount To Pay Now</span>
                    <div className="text-right">
                      {isFullPayment && (
                        <span className="text-xs text-slate-400 line-through mr-1.5 font-medium">
                          ₹{grandTotal.toLocaleString('en-IN')}
                        </span>
                      )}
                      <span className={`text-xl sm:text-2xl font-black ${isFullPayment ? 'text-emerald-600' : 'text-[var(--sky)]'}`}>
                        ₹{amountToPayToday.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {paymentType === 'advance' ? (
                    <div className="space-y-1 mt-2 pt-2 border-t border-[var(--sky-pale)]/60">
                      <p className="text-[11px] text-slate-600 font-medium">
                        Remaining <span className="font-bold text-slate-800">₹{remainingBalance.toLocaleString('en-IN')}</span> payable before trip departure.
                      </p>
                      <button
                        type="button"
                        onClick={() => setPaymentType('full')}
                        className="text-[11px] font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 hover:underline cursor-pointer"
                      >
                        <Sparkles size={12} className="text-emerald-600 shrink-0" /> Pay full amount & save ₹{(1000 * guests).toLocaleString('en-IN')} instantly!
                      </button>
                    </div>
                  ) : (
                    <div className="mt-2 flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-white/90 py-1.5 px-2.5 rounded-lg border border-emerald-200">
                      <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                      <span>Flat ₹{(1000 * guests).toLocaleString('en-IN')} instant discount applied!</span>
                    </div>
                  )}
                </div>

                {/* Right Column Error Banner */}
                {errorMessage && (
                  <div className="mt-4 p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-xs text-rose-700 font-semibold animate-in fade-in duration-200">
                    <AlertCircle size={15} className="text-rose-600 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Desktop Pay Here Button */}
                <div className="hidden lg:block mt-6">
                  <button
                    type="button"
                    onClick={handleFormSubmit}
                    disabled={isProcessing}
                    className="glow-btn w-full py-4 rounded-full font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 cursor-pointer"
                  >
                    {isProcessing ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                        Processing Secure Payment...
                      </span>
                    ) : (
                      <>Pay Here • ₹{amountToPayToday.toLocaleString('en-IN')} <ArrowRight size={18} /></>
                    )}
                  </button>
                  <p className="text-center text-[11px] text-slate-400 mt-3 flex items-center justify-center gap-1.5">
                    <Lock size={12} className="text-emerald-500" /> 256-Bit Bank-Grade SSL Encrypted
                  </p>
                </div>

                {/* Payment Methods Accepted Icons */}
                <div className="mt-5 pt-4 border-t border-slate-100 text-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    Accepted Payment Methods
                  </span>
                  <div className="flex items-center justify-center gap-2 text-xs text-slate-500 font-semibold flex-wrap">
                    <span className="bg-slate-50 border border-slate-200 px-2 py-1 rounded-md text-[11px]">UPI (GPay/PhonePe)</span>
                    <span className="bg-slate-50 border border-slate-200 px-2 py-1 rounded-md text-[11px]">Credit/Debit Cards</span>
                    <span className="bg-slate-50 border border-slate-200 px-2 py-1 rounded-md text-[11px]">NetBanking</span>
                  </div>
                </div>

              </div>

              {/* Need Assistance card */}
              <div className="bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 border border-slate-200/80 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[var(--sky-pale)] text-[var(--sky)] flex items-center justify-center shrink-0">
                    <PhoneCall size={16} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[var(--navy)]">Have Questions Before Booking?</div>
                    <div className="text-[10.5px] sm:text-[11px] text-slate-400">Talk to our friendly trip coordinators</div>
                  </div>
                </div>
                <a
                  href="tel:+919975822023"
                  className="px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-[var(--sky)] hover:text-white text-slate-700 text-xs font-bold transition-colors shrink-0"
                >
                  Call Now
                </a>
              </div>

            </div>

          </div>
        )}

      </div>

      {/* MOBILE STICKY BOTTOM BAR (Matching Itinerary Details Page) */}
      {!isBooked && (
        <div className="fixed bottom-0 left-0 right-0 top-auto w-full z-40 lg:hidden bg-white/95 backdrop-blur-md px-3.5 sm:px-6 py-2.5 sm:py-3 border-t border-slate-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] flex items-center justify-between gap-3">
          <div className="flex flex-col min-w-0 leading-none">
            <div className="flex items-center gap-1 mb-1 leading-none">
              {isFullPayment ? (
                <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wide flex items-center gap-0.5">
                  <Sparkles size={10} className="text-emerald-600 shrink-0" /> Full Pay (₹{fullPaymentDiscount.toLocaleString('en-IN')} off)
                </span>
              ) : (
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                  Advance To Pay
                </span>
              )}
            </div>
            <div className="flex items-baseline gap-1.5 leading-none">
              <span className="text-xl sm:text-2xl font-black text-[var(--navy)] tracking-tight leading-none">
                ₹{amountToPayToday.toLocaleString('en-IN')}
              </span>
              <span className="text-slate-500 font-bold text-[11px] leading-none">
                ({guests} {guests > 1 ? 'guests' : 'guest'})
              </span>
            </div>
          </div>

          <div className="w-[145px] sm:w-[170px] shrink-0">
            <button
              type="button"
              onClick={handleFormSubmit}
              disabled={isProcessing}
              className="glow-btn w-full inline-flex items-center justify-center gap-1.5 py-2.5 sm:py-3 rounded-full font-bold text-xs sm:text-sm disabled:opacity-50 cursor-pointer shadow-md"
            >
              {isProcessing ? (
                <span className="inline-flex items-center gap-1.5">
                  <span className="animate-spin w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full" />
                  Processing...
                </span>
              ) : (
                <>Pay Now <ArrowRight size={14} /></>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

