'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  MapPin,
  Calendar,
  Users,
  Compass,
  FileText,
  User,
  Phone,
  Mail,
  ArrowRight,
  Sparkles,
  HeartHandshake,
  CheckCircle2,
  Loader2,
  BookOpen,
  Settings,
  Globe2,
  ChevronDown,
  Plane,
  ShieldCheck,
  Zap
} from 'lucide-react'

const TRIP_FEATURES = [
  { id: 'solo', label: 'Solo Escape', icon: User },
  { id: 'friends', label: "Friends' Trip", icon: Users },
  { id: 'couple', label: 'Couple Getaway', icon: HeartHandshake },
  { id: 'family', label: 'Family Holiday', icon: Users },
  { id: 'group', label: 'Private Group', icon: Users },
]

export function CustomTripBuilderSection() {
  // Client Form States
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [destination, setDestination] = useState('')
  const [travelDates, setTravelDates] = useState('')
  const [groupType, setGroupType] = useState('Friends')
  const [tripVibe, setTripVibe] = useState('Adventure')
  const [notes, setNotes] = useState('')

  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!fullName.trim() || !phone.trim() || !email.trim() || !destination.trim()) {
      setError('Please fill in your Full Name, Contact Number, Email id, and Destination.')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/custom-trip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formSource: 'Homepage Custom Trip Builder',
          fullName: fullName.trim(),
          phone: phone.trim(),
          email: email.trim(),
          destination: destination.trim(),
          travelDates: travelDates || 'Flexible dates',
          groupType,
          tripVibe,
          notes: notes.trim()
        })
      })

      const data = await res.json()
      if (data.success) {
        setSubmitted(true)
      } else {
        setError(data.error || 'Could not submit your request. Please try again.')
      }
    } catch (err) {
      console.error('Custom trip submission error:', err)
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="relative w-full py-12 sm:py-16 lg:py-14 overflow-hidden bg-slate-900 select-none">
      {/* Background Image with Crisp High-Contrast Light Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2200&q=88"
          alt="Scenic Mountain Sunset Adventure"
          fill
          priority
          className="object-cover object-balanced opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-50/98 via-slate-50/95 to-[#edf5f8]/90" />
      </div>

      <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">

          {/* Left Column: Client Specified Copy */}
          <div className="lg:col-span-6 xl:col-span-6 space-y-4 sm:space-y-5">

            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2.5 text-xs font-black uppercase tracking-widest text-[var(--sky)] bg-[var(--sky-pale)]/90 px-3.5 py-1 rounded-full border border-[var(--sky)]/30">
              <span>CUSTOM TRIPS</span>
            </div>

            {/* Main Heading: CAN'T FIND YOUR TRIP? MAKE YOUR OWN. */}
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-[var(--navy)] leading-[1.12] tracking-tight uppercase">
              Can&apos;t find your trip? <br />
              <span className="text-[#e07a5f] font-serif italic font-bold normal-case">Make your own.</span>
            </h2>

            {/* Subheading: Your destination. Your dates. Your people. Your rules. */}
            <p className="text-base sm:text-lg font-black text-[var(--navy)] leading-snug">
              Your destination. Your dates. Your people. Your rules.
            </p>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-700 max-w-lg leading-relaxed font-medium">
              Tell us what you&apos;re imagining and we&apos;ll build a personalised trip around it.
            </p>

            {/* 5 Category Icons */}
            <div className="pt-1">
              <div className="grid grid-cols-5 gap-2 sm:gap-2.5 max-w-lg">
                {TRIP_FEATURES.map((item) => {
                  const Icon = item.icon
                  return (
                    <div
                      key={item.id}
                      className="bg-white/95 backdrop-blur-sm border border-slate-200/90 rounded-2xl p-2 sm:p-2.5 shadow-xs flex flex-col items-center text-center space-y-1.5 hover:border-[var(--sky)] hover:shadow-md transition-all"
                    >
                      <div className="w-8 h-8 flex items-center justify-center text-[var(--navy)]">
                        <Icon size={20} strokeWidth={2} />
                      </div>
                      <span className="text-[10px] sm:text-[11px] font-bold text-[var(--navy)] leading-tight">
                        {item.label}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Punchline Stamp: You dream it. We plan it. */}
            <div className="pt-2 sm:pt-3">
              <div className="inline-block transform -rotate-1">
                <p className="font-serif italic font-black text-2xl sm:text-3xl text-[var(--navy)] leading-tight">
                  You dream it. <br />
                  <span className="text-[#e07a5f]">We plan it.</span>
                </p>
                <div className="w-24 h-1 bg-[#e07a5f] rounded-full mt-1 opacity-90" />
              </div>
            </div>

          </div>

          {/* Right Column: LET'S BUILD YOUR NEXT ADVENTURE Card */}
          <div className="lg:col-span-6 xl:col-span-6">
            <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-[0_16px_45px_rgba(11,41,64,0.1)] border border-slate-200/90 relative">

              {/* Top-Right Badge */}
              <div className="absolute top-4 right-4 sm:top-5 sm:right-5 text-right select-none pointer-events-none">
                <div className="inline-flex items-center gap-1.5 font-serif italic text-[11px] font-bold text-[#e07a5f] bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-200 shadow-xs">
                  <span>Custom Trips</span>
                  <Sparkles size={12} className="text-amber-500" />
                </div>
              </div>

              {/* Card Title & Subtitle */}
              <div className="mb-4 pr-24">
                <h3 className="text-lg sm:text-xl font-black text-[var(--navy)] tracking-tight uppercase">
                  Let&apos;s Build Your Next Adventure
                </h3>
                <p className="text-xs text-slate-500 mt-0.5 font-medium">
                  We&apos;ll get back to you with a personalised plan.
                </p>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-8 text-center space-y-3"
                >
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 size={28} />
                  </div>
                  <h4 className="text-lg font-black text-[var(--navy)]">Custom Trip Request Received! 🎉</h4>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed font-medium">
                    Thank you <strong>{fullName}</strong>. Our custom trip architects are designing your personalized <strong>{destination}</strong> itinerary. We will connect with you within 24 hours on WhatsApp / Email!
                  </p>
                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false)
                        setFullName('')
                        setPhone('')
                        setEmail('')
                        setDestination('')
                        setNotes('')
                      }}
                      className="px-4 py-1.5 text-xs font-bold text-[var(--sky)] hover:underline cursor-pointer"
                    >
                      Plan another destination ➔
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-2.5">

                  {/* Row 1: Full name & Contact Number */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Full name <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                          <User size={15} />
                        </div>
                        <input
                          required
                          type="text"
                          placeholder="Enter Your name"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          style={{ paddingLeft: '2.2rem' }}
                          className="w-full h-10 pr-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-[var(--navy)] placeholder:text-slate-400 focus:outline-none focus:border-[var(--sky)] focus:bg-white focus:ring-2 focus:ring-[var(--sky)]/20 transition-all font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Contact Number <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                          <Phone size={15} />
                        </div>
                        <input
                          required
                          type="tel"
                          placeholder="Enter Your Number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          style={{ paddingLeft: '2.2rem' }}
                          className="w-full h-10 pr-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-[var(--navy)] placeholder:text-slate-400 focus:outline-none focus:border-[var(--sky)] focus:bg-white focus:ring-2 focus:ring-[var(--sky)]/20 transition-all font-medium"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Email id & Where do you want to go? */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Email id <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                          <Mail size={15} />
                        </div>
                        <input
                          required
                          type="email"
                          placeholder="Enter Your Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          style={{ paddingLeft: '2.2rem' }}
                          className="w-full h-10 pr-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-[var(--navy)] placeholder:text-slate-400 focus:outline-none focus:border-[var(--sky)] focus:bg-white focus:ring-2 focus:ring-[var(--sky)]/20 transition-all font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Where do you want to go? <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                          <MapPin size={15} />
                        </div>
                        <input
                          required
                          type="text"
                          placeholder="Enter destination"
                          value={destination}
                          onChange={(e) => setDestination(e.target.value)}
                          style={{ paddingLeft: '2.2rem' }}
                          className="w-full h-10 pr-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-[var(--navy)] placeholder:text-slate-400 focus:outline-none focus:border-[var(--sky)] focus:bg-white focus:ring-2 focus:ring-[var(--sky)]/20 transition-all font-medium"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 3: When do you want to travel? & Who's coming? */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        When do you want to travel?
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                          <Calendar size={15} />
                        </div>
                        <input
                          type="text"
                          placeholder="Select dates (e.g. Next Month)"
                          value={travelDates}
                          onChange={(e) => setTravelDates(e.target.value)}
                          style={{ paddingLeft: '2.2rem' }}
                          className="w-full h-10 pr-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-[var(--navy)] placeholder:text-slate-400 focus:outline-none focus:border-[var(--sky)] focus:bg-white focus:ring-2 focus:ring-[var(--sky)]/20 transition-all font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Who&apos;s coming?
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                          <Users size={15} />
                        </div>
                        <select
                          value={groupType}
                          onChange={(e) => setGroupType(e.target.value)}
                          style={{ paddingLeft: '2.2rem' }}
                          className="w-full h-10 pr-8 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-[var(--navy)] focus:outline-none focus:border-[var(--sky)] focus:bg-white focus:ring-2 focus:ring-[var(--sky)]/20 transition-all font-medium appearance-none cursor-pointer"
                        >
                          <option value="Couple">Couple</option>
                          <option value="Friends">Friends</option>
                          <option value="Family">Family</option>
                          <option value="Group">Group</option>
                          <option value="Corporate">Corporate</option>
                          <option value="College trip">College trip</option>
                          <option value="School trip">School trip</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                          <ChevronDown size={14} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Row 4: Trip Style & Anything else? */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Trip vibe & style
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                          <Compass size={15} />
                        </div>
                        <select
                          value={tripVibe}
                          onChange={(e) => setTripVibe(e.target.value)}
                          style={{ paddingLeft: '2.2rem' }}
                          className="w-full h-10 pr-8 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-[var(--navy)] focus:outline-none focus:border-[var(--sky)] focus:bg-white focus:ring-2 focus:ring-[var(--sky)]/20 transition-all font-medium appearance-none cursor-pointer"
                        >
                          <option value="Adventure">Adventure</option>
                          <option value="Relaxed">Relaxed</option>
                          <option value="Backpacking">Backpacking</option>
                          <option value="Honeymoon">Honeymoon</option>
                          <option value="Luxury">Luxury</option>
                          <option value="Mixed">Mixed</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                          <ChevronDown size={14} />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Special requests / Notes
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                          <FileText size={15} />
                        </div>
                        <input
                          type="text"
                          placeholder="Budget, preferences, etc."
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          style={{ paddingLeft: '2.2rem' }}
                          className="w-full h-10 pr-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-[var(--navy)] placeholder:text-slate-400 focus:outline-none focus:border-[var(--sky)] focus:bg-white focus:ring-2 focus:ring-[var(--sky)]/20 transition-all font-medium"
                        />
                      </div>
                    </div>
                  </div>

                  {error && (
                    <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-semibold">
                      {error}
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={loading}
                      className="glow-btn w-full h-11 rounded-xl bg-[var(--navy)] hover:bg-[var(--navy)]/90 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-60 uppercase tracking-wider"
                    >
                      {loading ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          <span>Building Your Trip...</span>
                        </>
                      ) : (
                        <>
                          <span>CREATE MY TRIP</span>
                          <ArrowRight size={16} />
                        </>
                      )}
                    </button>

                    {/* Trust indicators */}
                    <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 text-[11px] text-slate-600 mt-2 font-bold">
                      <span className="flex items-center gap-1 text-amber-700">
                        <Zap size={12} className="text-amber-500 fill-amber-500" />
                        100% Personalised
                      </span>
                      <span className="w-1 h-1 bg-slate-300 rounded-full" />
                      <span className="flex items-center gap-1 text-sky-700">
                        <Sparkles size={12} className="text-[var(--sky)]" />
                        Free Itinerary
                      </span>
                      <span className="w-1 h-1 bg-slate-300 rounded-full" />
                      <span className="flex items-center gap-1 text-emerald-700">
                        <ShieldCheck size={12} className="text-emerald-500" />
                        Quick Response
                      </span>
                    </div>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

        {/* Bottom Horizontal Value Bar in Elevated Card for Crystal Clear Visibility */}
        <div className="mt-8 sm:mt-10 bg-white/95 backdrop-blur-md px-5 sm:px-8 py-4 rounded-2xl shadow-sm border border-slate-200/90 flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6 text-slate-900 font-extrabold text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <BookOpen size={16} className="text-[var(--sky)] shrink-0" />
              <span>Personalised Itineraries</span>
            </div>
            <div className="hidden sm:block w-1.5 h-1.5 bg-slate-300 rounded-full" />
            <div className="flex items-center gap-2">
              <Settings size={16} className="text-[var(--sky)] shrink-0" />
              <span>End-to-End Planning</span>
            </div>
            <div className="hidden sm:block w-1.5 h-1.5 bg-slate-300 rounded-full" />
            <div className="flex items-center gap-2">
              <Users size={16} className="text-[var(--sky)] shrink-0" />
              <span>For Any Group Size</span>
            </div>
            <div className="hidden sm:block w-1.5 h-1.5 bg-slate-300 rounded-full" />
            <div className="flex items-center gap-2">
              <Globe2 size={16} className="text-[var(--sky)] shrink-0" />
              <span>Domestic & International</span>
            </div>
          </div>

          {/* Airplane Doodle & Stamp */}
          <div className="flex items-center gap-2 font-serif italic text-xs sm:text-sm font-bold text-slate-800 shrink-0">
            <Plane size={15} className="text-amber-500 transform -rotate-45" />
            <span className="tracking-wide">Your next adventure starts here.</span>
          </div>

        </div>

      </div>
    </section>
  )
}

