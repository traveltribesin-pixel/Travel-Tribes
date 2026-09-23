'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  User,
  Phone,
  Mail,
  Calendar,
  MapPin,
  ArrowRight,
  CheckCircle2,
  Loader2,
  Sparkles,
  ShieldCheck,
  Compass,
  ChevronDown
} from 'lucide-react'

const TRAVEL_MONTHS = [
  'Immediate / Next 7 Days',
  'Next Month',
  'October 2026',
  'November 2026',
  'December 2026 (Xmas & New Year)',
  'January 2027',
  'February 2027',
  'March 2027',
  'Flexible / Planning Ahead'
]

export function LeadCaptureModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [travelMonth, setTravelMonth] = useState('October 2026')
  const [destination, setDestination] = useState('')

  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Check if user already dismissed or submitted the modal in this session
    const isDismissed = sessionStorage.getItem('tt_lead_modal_dismissed')
    if (isDismissed) return

    // Trigger popup after exactly 10 seconds (10000ms)
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 10000)

    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    sessionStorage.setItem('tt_lead_modal_dismissed', 'true')
  }

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!fullName.trim() || !phone.trim() || !email.trim()) {
      setError('Please fill in your Name, Phone Number, and Email Address.')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/custom-trip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formSource: '10-Second Quick Trip Popup Form',
          fullName: fullName.trim(),
          phone: phone.trim(),
          email: email.trim(),
          destination: destination.trim() || 'Undecided / Exploring Options',
          travelDates: travelMonth,
          groupType: 'Popup Lead Form',
          tripVibe: 'Quick Trip Inquiry',
          notes: `Lead captured from 10-second site popup. Destination: ${destination || 'Not specified'}. Travel Month: ${travelMonth}`
        })
      })

      const data = await res.json()
      if (data.success) {
        setSubmitted(true)
        sessionStorage.setItem('tt_lead_modal_dismissed', 'true')
      } else {
        setError(data.error || 'Could not submit your request. Please try again.')
      }
    } catch (err) {
      console.error('Lead popup submit error:', err)
      setError('Something went wrong. Please try again or message us on WhatsApp.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-[840px] bg-white rounded-3xl shadow-2xl overflow-hidden z-10 my-auto border border-slate-100"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              aria-label="Close form"
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-100/90 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer shadow-xs"
            >
              <X size={18} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12 min-h-[480px]">
              
              {/* Left Side Banner (Desktop/Tablet) */}
              <div className="hidden md:flex md:col-span-5 relative bg-[#0b2940] text-white p-8 flex-col justify-between overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-40">
                  <Image
                    src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=85"
                    alt="Travel Tribes Mountain Sunset"
                    fill
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b2940] via-[#0b2940]/70 to-[#0b2940]/50" />
                </div>

                {/* Top Brand & Tagline */}
                <div className="relative z-10 space-y-2">
                  <Image
                    src="/image/Logowhite.png"
                    alt="Travel Tribes"
                    width={120}
                    height={40}
                    className="w-auto h-8 object-contain mb-3"
                  />
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/15 text-[10px] font-black uppercase tracking-wider text-[#85cfe7] backdrop-blur-md">
                    <Sparkles size={11} />
                    Personalised Plans
                  </span>
                  <h3 className="text-xl lg:text-2xl font-black leading-tight pt-1">
                    Plan your next <br />
                    <span className="text-[#f5be18] font-serif italic font-normal">adventure with us.</span>
                  </h3>
                </div>

                {/* Perks Checklist */}
                <div className="relative z-10 space-y-3 pt-6 border-t border-white/15 text-xs text-slate-200">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={16} className="text-[var(--sky)] shrink-0" />
                    <span>Curated boutique stays & itineraries</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Compass size={16} className="text-[var(--sky)] shrink-0" />
                    <span>Solo-friendly & group adventures</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={16} className="text-[var(--sky)] shrink-0" />
                    <span>24/7 dedicated trip support</span>
                  </div>
                </div>

                {/* Footer Stamp */}
                <div className="relative z-10 pt-4 text-[11px] font-serif italic text-[#85cfe7]">
                  ✨ Tribe hai to vibe hai!
                </div>
              </div>

              {/* Right Side Form */}
              <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-center">
                
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-6 text-center space-y-4"
                  >
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                      <CheckCircle2 size={34} />
                    </div>
                    <h4 className="text-2xl font-black text-[var(--navy)]">Details Received! 🎉</h4>
                    <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                      Thank you <strong>{fullName}</strong>. Our custom trip architects will get in touch with you shortly with the best options and itinerary for <strong>{destination || 'your trip'}</strong>!
                    </p>
                    <div className="pt-3 flex flex-col gap-2">
                      <a
                        href={`https://wa.me/919975822023?text=Hi%20Travel%20Tribes,%20I%20just%20submitted%20my%20details%20for%20${encodeURIComponent(destination || 'a custom trip')}.%20Please%20connect!`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md transition-all"
                      >
                        💬 Connect on WhatsApp (+91 99758 22023)
                      </a>
                      <button
                        type="button"
                        onClick={handleClose}
                        className="text-xs font-bold text-slate-500 hover:text-[var(--navy)] py-2"
                      >
                        Close window
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <div>
                    {/* Header */}
                    <div className="mb-5 pr-8">
                      <div className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-[var(--sky)] mb-1">
                        <Compass size={12} />
                        <span>QUICK TRIP INQUIRY</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black text-[var(--navy)] tracking-tight">
                        Where would you like to go?
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        Fill in your details to receive customized itineraries & pricing.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-3.5">
                      
                      {/* Name & Phone */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                            Name <span className="text-rose-500">*</span>
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                              <User size={15} />
                            </div>
                            <input
                              required
                              type="text"
                              placeholder="Your full name"
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                              style={{ paddingLeft: '2.2rem' }}
                              className="w-full h-10 pr-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-[var(--navy)] placeholder:text-slate-400 focus:outline-none focus:border-[var(--sky)] focus:bg-white focus:ring-2 focus:ring-[var(--sky)]/20 transition-all font-medium"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                            Number <span className="text-rose-500">*</span>
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 font-bold text-xs">
                              +91
                            </div>
                            <input
                              required
                              type="tel"
                              placeholder="98765 43210"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              style={{ paddingLeft: '2.5rem' }}
                              className="w-full h-10 pr-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-[var(--navy)] placeholder:text-slate-400 focus:outline-none focus:border-[var(--sky)] focus:bg-white focus:ring-2 focus:ring-[var(--sky)]/20 transition-all font-medium"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Email ID */}
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Mail ID <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                            <Mail size={15} />
                          </div>
                          <input
                            required
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ paddingLeft: '2.2rem' }}
                            className="w-full h-10 pr-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-[var(--navy)] placeholder:text-slate-400 focus:outline-none focus:border-[var(--sky)] focus:bg-white focus:ring-2 focus:ring-[var(--sky)]/20 transition-all font-medium"
                          />
                        </div>
                      </div>

                      {/* Month of Travel & Destination */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                            Month of travel
                          </label>
                          <div className="relative">
                            <select
                              value={travelMonth}
                              onChange={(e) => setTravelMonth(e.target.value)}
                              className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-[var(--navy)] focus:outline-none focus:border-[var(--sky)] focus:bg-white focus:ring-2 focus:ring-[var(--sky)]/20 transition-all font-medium cursor-pointer appearance-none"
                            >
                              {TRAVEL_MONTHS.map((m, idx) => (
                                <option key={idx} value={m}>{m}</option>
                              ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                              <ChevronDown size={15} />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                            Destination
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                              <MapPin size={15} />
                            </div>
                            <input
                              type="text"
                              placeholder="e.g. Bali, Ladakh, Spiti, Goa"
                              value={destination}
                              onChange={(e) => setDestination(e.target.value)}
                              style={{ paddingLeft: '2.2rem' }}
                              className="w-full h-10 pr-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-[var(--navy)] placeholder:text-slate-400 focus:outline-none focus:border-[var(--sky)] focus:bg-white focus:ring-2 focus:ring-[var(--sky)]/20 transition-all font-medium"
                            />
                          </div>
                        </div>
                      </div>

                      {error && (
                        <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-medium">
                          {error}
                        </div>
                      )}

                      {/* Submit Button */}
                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full h-11 bg-[#0b2940] hover:bg-[#134e75] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-60 cursor-pointer"
                        >
                          {loading ? (
                            <>
                              <Loader2 size={16} className="animate-spin" />
                              <span>Sending Details...</span>
                            </>
                          ) : (
                            <>
                              <span>Get Free Itinerary & Quote</span>
                              <ArrowRight size={15} />
                            </>
                          )}
                        </button>
                      </div>

                      <p className="text-center text-[10.5px] text-slate-400 font-medium">
                        🔒 100% confidential. No spam, only custom travel plans.
                      </p>

                    </form>
                  </div>
                )}

              </div>

            </div>
          </motion.div>

        </div>
      )}
    </AnimatePresence>
  )
}
