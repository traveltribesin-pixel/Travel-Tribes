'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Briefcase,
  Building2,
  Users,
  Calendar,
  MapPin,
  Mail,
  Phone,
  ArrowRight,
  CheckCircle2,
  Loader2,
  ShieldCheck,
  Sparkles,
  FileText,
  Compass,
  Award,
  Globe2,
  Receipt,
  Headphones,
  Zap,
  Star,
  ChevronDown,
  Play,
  Tent,
  Mountain,
  Utensils,
  GlassWater,
  PartyPopper,
  Flame,
  Waves,
  Lightbulb,
  Heart,
  ChevronLeft,
  ChevronRight,
  Smile,
  Check
} from 'lucide-react'
import { PageFrame } from '@/components/site-shell'

// 3 Ways to Take Your Team Out
const WAYS_TO_TRAVEL = [
  {
    number: '01.',
    title: 'Weekend Experiences',
    subtitle: 'Near Mumbai & Pune (and Major Hubs)',
    description: 'Quick getaways for teams who want to refresh, recharge and reconnect without taking half the week off.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=85',
    features: [
      'Trekking & Hiking',
      'Camping & Bonfires',
      'Team Building Activities',
      'Workshops & Wellness',
      'One Day / Overnight Events'
    ],
    ctaText: 'Explore Weekend Events',
    typeValue: 'Weekend Offsite',
    locations: 'Lonavala · Pawna · Karjat · Matheran · Alibaug · Igatpuri · Kolad · Bhandardara'
  },
  {
    number: '02.',
    title: 'Domestic Offsites',
    subtitle: 'Across India',
    description: 'Turn your annual offsite into something people actually look forward to. From mountains to beaches, we plan end-to-end corporate trips across India.',
    image: 'https://images.unsplash.com/photo-1528605248659-144006cb075b?auto=format&fit=crop&w=800&q=85',
    features: [
      '2–6 Day Offsites',
      'Stays, Travel & Activities',
      'Team Building & Workshops',
      'Adventure & Local Experiences',
      'Fully Customised Itineraries'
    ],
    ctaText: 'Explore Domestic Offsites',
    typeValue: 'Domestic Offsite',
    locations: 'Goa · Coorg · Udaipur · Himachal · Kerala · Rishikesh · Spiti · Meghalaya · Andaman'
  },
  {
    number: '03.',
    title: 'International Offsites',
    subtitle: 'Beyond Borders',
    description: 'Take your team to new countries, new cultures and unforgettable experiences. We handle the moving parts so your team can just enjoy the journey.',
    image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=800&q=85',
    features: [
      'Incentive Trips',
      'Visa & Travel Support',
      'Stays, Experiences & Celebrations',
      'End-to-End Logistics',
      'Customised For Your Team'
    ],
    ctaText: 'Explore International Offsites',
    typeValue: 'International Offsite',
    locations: 'Bali · Thailand · Vietnam · Dubai · Singapore · Sri Lanka · Mauritius'
  }
]

// 6 Experience Pillars
const EXPERIENCE_PILLARS = [
  { icon: Users, label: 'Team Building Activities' },
  { icon: Lightbulb, label: 'Workshops & Strategy Days' },
  { icon: Mountain, label: 'Adventure Experiences' },
  { icon: Heart, label: 'Wellness & Nature Retreats' },
  { icon: PartyPopper, label: 'Entertainment & Celebrations' },
  { icon: Award, label: 'Incentive Trips' }
]

// 6 Activity Photo Cards
const TEAM_ACTIVITIES = [
  {
    title: 'Trek',
    image: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Camp',
    image: 'https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Raft',
    image: 'https://images.unsplash.com/photo-1533240332313-0db49b459ad6?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Explore',
    image: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Cook',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=600&q=80'
  },
  {
    title: 'Celebrate',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80'
  }
]

// Trusted Logos
const BRAND_LOGOS = [
  'Google',
  'AWS',
  'Microsoft',
  'dunzo',
  'PhonePe',
  'Swiggy',
  'zepto',
  'CRED'
]

export function CorporateContent() {
  const formRef = useRef<HTMLDivElement>(null)
  const nameInputRef = useRef<HTMLInputElement>(null)

  // Form States
  const [name, setName] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [workEmail, setWorkEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [teamSize, setTeamSize] = useState('20-50 People')
  const [expectedDate, setExpectedDate] = useState('')
  const [tripType, setTripType] = useState('Domestic Offsite')
  const [destinationPreference, setDestinationPreference] = useState('')

  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const scrollToForm = (typePreset?: string) => {
    if (typePreset) {
      setTripType(typePreset)
    }
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
      setTimeout(() => {
        nameInputRef.current?.focus()
      }, 500)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!name.trim() || !companyName.trim() || !workEmail.trim() || !phone.trim()) {
      setError('Please fill in your Name, Company Name, Work Email, and Phone Number.')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/custom-trip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formSource: 'Corporate Offsite Proposal Form',
          fullName: `${name.trim()} (${companyName.trim()})`,
          phone: phone.trim(),
          email: workEmail.trim(),
          destination: destinationPreference.trim() || 'Corporate Offsite',
          travelDates: expectedDate || 'Flexible dates',
          groupType: `Corporate (${teamSize})`,
          tripVibe: tripType,
          notes: `Corporate Offsite Request: Company: ${companyName}. Contact: ${name}. Team Size: ${teamSize}. Trip Type: ${tripType}. Preferred Destination: ${destinationPreference}`
        })
      })

      const data = await res.json()
      if (data.success) {
        setSubmitted(true)
      } else {
        setError(data.error || 'Could not submit your request. Please try again.')
      }
    } catch (err) {
      console.error('Corporate inquiry error:', err)
      setError('Something went wrong. Please connect with our team directly on WhatsApp or Call.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageFrame>
      <main className="w-full bg-[#f7fbfd] text-[var(--navy)] overflow-hidden">

        {/* =========================================================================
            SECTION 1: HERO SECTION
        ========================================================================== */}
        <section className="relative w-full min-h-[640px] lg:min-h-[500px] flex items-end text-white overflow-hidden select-none">
          {/* Panoramic Mountain Summit Team Background */}
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2400&q=90"
              alt="Corporate team on mountain summit watching sunset"
              fill
              priority
              className="object-cover object-center scale-105"
            />
            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b2940] via-[#0b2940]/60 to-[#0b2940]/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0b2940]/85 via-[#0b2940]/50 to-transparent" />
          </div>

          <div className="relative z-10 max-w-[1240px] w-full mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 lg:pb-20">

            {/* Top Right Floating Sticker */}
            <div className="absolute top-10 right-4 sm:right-8 lg:right-12 hidden md:block">
              <div className="inline-flex items-center gap-1 text-[#f5be18] font-serif italic text-base lg:text-lg font-bold bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-2xl border border-white/20 shadow-lg transform rotate-2">
                <span>✨ Better Teams, Happier People</span>
              </div>
            </div>

            <div className="max-w-2xl space-y-6">

              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#85cfe7]">
                <span>CORPORATE TRIPS & EVENTS</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl sm:text-5xl lg:text-[58px] font-black leading-[1.08] tracking-tight">
                Your team deserves <br />
                more than a <br />
                <span className="text-[#e07a5f] font-serif italic font-normal">meeting room.</span>
              </h1>

              {/* Description */}
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal max-w-lg">
                Corporate offsites, team outings and retreats designed around people, experiences and a little adventure.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => scrollToForm()}
                  className="px-7 py-3.5 bg-white text-[var(--navy)] hover:bg-[var(--sky)] hover:text-white font-extrabold text-xs uppercase tracking-wider rounded-full shadow-xl transition-all duration-300 hover:-translate-y-0.5 cursor-pointer inline-flex items-center gap-2"
                >
                  <span>Plan Your Offsite</span>
                  <ArrowRight size={15} />
                </button>

                <a
                  href="https://wa.me/919975822023?text=Hi%20Travel%20Tribes,%20we%20want%20to%20plan%20a%20corporate%20offsite!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3.5 bg-white/10 hover:bg-white/20 border border-white/25 text-white font-bold text-xs uppercase tracking-wider rounded-full backdrop-blur-md transition-all inline-flex items-center gap-2"
                >
                  <Phone size={14} className="text-emerald-400" />
                  <span>Talk to Corporate Desk</span>
                </a>
              </div>

              {/* 5 Bottom Pillars Strip */}
              <div className="pt-8 border-t border-white/15 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-slate-300 text-xs font-bold">
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-[var(--sky)] shrink-0" />
                  <span>Team Outings</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 size={16} className="text-[var(--sky)] shrink-0" />
                  <span>Corporate Offsites</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart size={16} className="text-[var(--sky)] shrink-0" />
                  <span>Retreats & Workshops</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award size={16} className="text-[var(--sky)] shrink-0" />
                  <span>Incentive Trips</span>
                </div>
                <div className="flex items-center gap-2">
                  <SettingsIcon size={16} className="text-[var(--sky)] shrink-0" />
                  <span>End-to-End Planning</span>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* =========================================================================
            SECTION 2: WHY CORPORATE TRAVEL?
        ========================================================================== */}
        <section className="w-full py-16 sm:py-20 bg-white border-b border-slate-200/80">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

              {/* Left narrative */}
              <div className="lg:col-span-6 space-y-3">
                <span className="text-xs font-black uppercase tracking-widest text-[var(--sky)] block">
                  WHY CORPORATE TRAVEL?
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-[var(--navy)] leading-tight tracking-tight">
                  Take the team <br />
                  out of the <span className="text-[#e07a5f] font-serif italic font-normal">office.</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-2">
                  We create custom corporate experiences that bring teams together outside their usual work environment — through adventure, travel, workshops, games and shared experiences that actually bring people closer.
                </p>
              </div>

              {/* Right 4 Pillars */}
              <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-4 gap-3">

                <div className="flex flex-col items-center text-center p-3.5 rounded-2xl bg-[#f7fbfd] border border-slate-200/80 shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-[var(--sky)] flex items-center justify-center mb-2 shadow-xs">
                    <Compass size={18} />
                  </div>
                  <span className="text-[11px] font-extrabold text-[var(--navy)] leading-tight">Customised Experiences</span>
                </div>

                <div className="flex flex-col items-center text-center p-3.5 rounded-2xl bg-[#f7fbfd] border border-slate-200/80 shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-emerald-600 flex items-center justify-center mb-2 shadow-xs">
                    <Users size={18} />
                  </div>
                  <span className="text-[11px] font-extrabold text-[var(--navy)] leading-tight">For Any Team Size</span>
                </div>

                <div className="flex flex-col items-center text-center p-3.5 rounded-2xl bg-[#f7fbfd] border border-slate-200/80 shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-indigo-600 flex items-center justify-center mb-2 shadow-xs">
                    <Globe2 size={18} />
                  </div>
                  <span className="text-[11px] font-extrabold text-[var(--navy)] leading-tight">Domestic & International</span>
                </div>

                <div className="flex flex-col items-center text-center p-3.5 rounded-2xl bg-[#f7fbfd] border border-slate-200/80 shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-amber-600 flex items-center justify-center mb-2 shadow-xs">
                    <ShieldCheck size={18} />
                  </div>
                  <span className="text-[11px] font-extrabold text-[var(--navy)] leading-tight">End-to-End Support</span>
                </div>

              </div>

            </div>

          </div>
        </section>

        {/* =========================================================================
            SECTION 3: THREE WAYS TO TAKE YOUR TEAM OUT
        ========================================================================== */}
        <section className="w-full py-16 sm:py-20 bg-[#f7fbfd] border-b border-slate-200/80">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-4">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-[var(--sky)] block mb-1">
                  THREE WAYS TO TAKE YOUR TEAM OUT
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[var(--navy)] tracking-tight">
                  Choose the format that fits your team.
                </h2>
              </div>
              <div className="inline-flex items-center gap-1.5 self-start md:self-end font-serif italic text-sm sm:text-base font-bold text-[#e07a5f] bg-orange-50 px-3.5 py-1.5 rounded-full border border-orange-200/80">
                <span>Pick Your Vibe ✍️</span>
              </div>
            </div>

            {/* 3 Large Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-7">
              {WAYS_TO_TRAVEL.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  {/* Top Image */}
                  <div className="relative h-56 w-full overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover object-balanced group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                    <div className="absolute bottom-3 left-4 text-white">
                      <span className="text-xs font-mono font-black text-amber-300 mr-2">{item.number}</span>
                      <span className="text-base font-black">{item.title}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-5">

                    <div className="space-y-3">
                      <div>
                        <h3 className="text-sm font-extrabold text-[var(--sky)] uppercase tracking-wider">
                          {item.subtitle}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1.5 font-normal">
                          {item.description}
                        </p>
                      </div>

                      {/* Feature Bullet points */}
                      <ul className="space-y-2 pt-2 border-t border-slate-100">
                        {item.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-center gap-2.5 text-xs font-semibold text-slate-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--sky)] shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Button & Popular Locations */}
                    <div className="space-y-3 pt-3 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => scrollToForm(item.typeValue)}
                        className="w-full py-3 px-4 rounded-xl bg-[#0b2940] hover:bg-[#134e75] text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer group/btn"
                      >
                        <span>{item.ctaText}</span>
                        <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                      </button>

                      <div className="text-[10px] text-slate-500 leading-normal">
                        <strong className="text-[var(--navy)]">Popular destinations:</strong> {item.locations}
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* =========================================================================
            SECTION 4: MORE THAN JUST A TRIP / EXPERIENCES THAT BRING TEAMS TOGETHER
        ========================================================================== */}
        <section className="w-full py-16 sm:py-20 bg-[#0b2940] text-white">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

            {/* Header */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-end border-b border-white/10 pb-8">
              <div className="lg:col-span-6 space-y-2">
                <span className="text-xs font-black uppercase tracking-widest text-[#85cfe7] block">
                  MORE THAN JUST A TRIP
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight tracking-tight">
                  Experiences that <br />
                  bring teams together.
                </h2>
              </div>
              <div className="lg:col-span-6">
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  From adventure to workshops, we design experiences that match your team&apos;s goals — whether it&apos;s bonding, brainstorming or simply celebrating a milestone.
                </p>
              </div>
            </div>

            {/* 6 Pillars */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 text-center">
              {EXPERIENCE_PILLARS.map((item, idx) => {
                const Icon = item.icon
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/25 hover:bg-white/10 transition-all flex flex-col items-center justify-center space-y-2.5 group"
                  >
                    <div className="w-11 h-11 rounded-xl bg-white/10 text-[#85cfe7] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon size={20} />
                    </div>
                    <span className="text-xs font-bold text-slate-200 leading-snug">
                      {item.label}
                    </span>
                  </div>
                )
              })}
            </div>

          </div>
        </section>

        {/* =========================================================================
            SECTION 5: HOW IT WORKS
        ========================================================================== */}
        <section className="w-full py-16 sm:py-20 bg-white border-b border-slate-200/80">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">

            {/* Header */}
            <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-1.5 font-serif italic text-sm font-bold text-[#e07a5f] bg-orange-50 px-3.5 py-1 rounded-full border border-orange-200/80 mb-3">
                <span>How it Works? ✍️</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[var(--navy)] tracking-tight">
                You give us the brief. We build the experience.
              </h2>
            </div>

            {/* 4 Steps */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

              {/* Step 01 */}
              <div className="p-6 rounded-3xl bg-[#f7fbfd] border border-slate-200/80 flex flex-col justify-between space-y-4 hover:border-[var(--sky)] transition-colors">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-slate-300 font-mono">01</span>
                    <div className="w-10 h-10 rounded-2xl bg-sky-50 text-[var(--sky)] flex items-center justify-center">
                      <FileText size={18} />
                    </div>
                  </div>
                  <h3 className="text-sm font-black text-[var(--navy)] uppercase tracking-wider mb-1.5">
                    Tell us about your team
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Team size, dates, budget and what you&apos;re looking for.
                  </p>
                </div>
              </div>

              {/* Step 02 */}
              <div className="p-6 rounded-3xl bg-[#f7fbfd] border border-slate-200/80 flex flex-col justify-between space-y-4 hover:border-[var(--sky)] transition-colors">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-slate-300 font-mono">02</span>
                    <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                      <Users size={18} />
                    </div>
                  </div>
                  <h3 className="text-sm font-black text-[var(--navy)] uppercase tracking-wider mb-1.5">
                    We build the plan
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Our team puts together destination options, activities and an itinerary.
                  </p>
                </div>
              </div>

              {/* Step 03 */}
              <div className="p-6 rounded-3xl bg-[#f7fbfd] border border-slate-200/80 flex flex-col justify-between space-y-4 hover:border-[var(--sky)] transition-colors">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-slate-300 font-mono">03</span>
                    <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <Check size={18} />
                    </div>
                  </div>
                  <h3 className="text-sm font-black text-[var(--navy)] uppercase tracking-wider mb-1.5">
                    You approve
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Choose the experience that works best for your team.
                  </p>
                </div>
              </div>

              {/* Step 04 */}
              <div className="p-6 rounded-3xl bg-[#f7fbfd] border border-slate-200/80 flex flex-col justify-between space-y-4 hover:border-[var(--sky)] transition-colors">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-slate-300 font-mono">04</span>
                    <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
                      <Award size={18} />
                    </div>
                  </div>
                  <h3 className="text-sm font-black text-[var(--navy)] uppercase tracking-wider mb-1.5">
                    We take it from there
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    From bookings to on-ground coordination, we handle it all.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* =========================================================================
            SECTION 6: POPULAR EXPERIENCES (WHAT SHOULD YOUR TEAM DO?)
        ========================================================================== */}
        <section className="w-full py-16 sm:py-20 bg-[#f7fbfd] border-b border-slate-200/80">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-[var(--sky)] block mb-1">
                  POPULAR EXPERIENCES
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[var(--navy)] tracking-tight">
                  What should your team do?
                </h2>
              </div>
              <button
                type="button"
                onClick={() => scrollToForm()}
                className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[var(--sky)] hover:text-[var(--navy)] uppercase tracking-wider transition-colors self-start md:self-end"
              >
                <span>View All Activities</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* 6 Activity Tiles */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {TEAM_ACTIVITIES.map((act, idx) => (
                <div
                  key={idx}
                  onClick={() => scrollToForm()}
                  className="group relative h-48 sm:h-52 rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all cursor-pointer"
                >
                  <Image
                    src={act.image}
                    alt={act.title}
                    fill
                    className="object-cover object-balanced group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 text-white">
                    <span className="text-base font-black">{act.title}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* =========================================================================
            SECTION 7: WHAT TEAMS SAY (TESTIMONIALS)
        ========================================================================== */}
        <section className="w-full py-16 sm:py-20 bg-white border-b border-slate-200/80">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

              {/* Left headline */}
              <div className="lg:col-span-5 space-y-3">
                <span className="text-xs font-black uppercase tracking-widest text-[var(--sky)] block">
                  WHAT TEAMS SAY
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[var(--navy)] leading-tight tracking-tight">
                  The best offsites create stronger teams.
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 font-normal">
                  Here&apos;s what companies say about travelling with us.
                </p>
              </div>

              {/* Right testimonial card */}
              <div className="lg:col-span-7 bg-[#f7fbfd] p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center gap-6">
                <div className="relative w-full sm:w-48 h-40 sm:h-44 rounded-2xl overflow-hidden shrink-0">
                  <Image
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80"
                    alt="Happy corporate team"
                    fill
                    className="object-cover object-center"
                  />
                </div>
                <div className="space-y-4">
                  <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed italic">
                    “The best offsite we&apos;ve had in years. Everything was so well planned — from the stay and activities to the little details. Our team came back more connected, motivated and with a lot of great stories.”
                  </p>
                  <div className="flex items-center gap-3 pt-2 border-t border-slate-200">
                    <div className="w-9 h-9 rounded-full bg-indigo-600 text-white font-black text-xs flex items-center justify-center">
                      Z
                    </div>
                    <div>
                      <h4 className="text-xs font-extrabold text-[var(--navy)]">HR Team</h4>
                      <p className="text-[11px] text-slate-500 font-bold">Zepto</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* =========================================================================
            SECTION 8: TRUSTED BY AMAZING TEAMS
        ========================================================================== */}
        <section className="w-full py-12 bg-white border-b border-slate-200/80">
          <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <span className="text-[11px] font-black uppercase tracking-widest text-slate-400 block">
              TRUSTED BY AMAZING TEAMS
            </span>
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-70 grayscale hover:grayscale-0 transition-all">
              {BRAND_LOGOS.map((brand, bIdx) => (
                <span
                  key={bIdx}
                  className="text-lg sm:text-xl font-black tracking-tight text-slate-700 hover:text-[var(--navy)] transition-colors select-none"
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 9: BOTTOM HERO CTA & INTERACTIVE PROPOSAL FORM
        ========================================================================== */}
        <section className="relative w-full py-16 sm:py-24 bg-[#0b2940] text-white overflow-hidden" ref={formRef}>

          {/* Background Image */}
          <div className="absolute inset-0 z-0 opacity-25">
            <Image
              src="https://images.unsplash.com/photo-1528605248659-144006cb075b?auto=format&fit=crop&w=2200&q=88"
              alt="Team cheering around sunset bonfire"
              fill
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0b2940] via-[#0b2940]/90 to-transparent" />
          </div>

          <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

              {/* Left Column */}
              <div className="lg:col-span-5 space-y-6">

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-[1.1] tracking-tight">
                  Ready to take your team <br />
                  somewhere <br />
                  <span className="text-[#e07a5f] font-serif italic font-normal">unforgettable?</span>
                </h2>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                  Tell us your team size, dates, budget and what you&apos;re looking for. We&apos;ll build a custom plan for you.
                </p>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => nameInputRef.current?.focus()}
                    className="px-7 py-3.5 bg-white text-[var(--navy)] hover:bg-[var(--sky)] hover:text-white font-extrabold text-xs uppercase tracking-wider rounded-full shadow-xl transition-all duration-300 hover:-translate-y-0.5 cursor-pointer inline-flex items-center gap-2"
                  >
                    <span>Plan Your Corporate Trip</span>
                    <ArrowRight size={15} />
                  </button>
                </div>

              </div>

              {/* Right Column: Let's Plan Your Offsite Form Card */}
              <div className="lg:col-span-7">
                <div className="bg-white rounded-3xl p-6 sm:p-8 text-[var(--navy)] shadow-2xl border border-slate-100">

                  <div className="mb-6">
                    <h3 className="text-2xl font-black tracking-tight text-[var(--navy)]">
                      Let&apos;s Plan Your Offsite
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      Tell us a few details and we&apos;ll get back to you with a customised plan.
                    </p>
                  </div>

                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-8 text-center space-y-4"
                    >
                      <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                        <CheckCircle2 size={34} />
                      </div>
                      <h4 className="text-2xl font-black text-[var(--navy)]">Corporate Proposal Request Received! 🚀</h4>
                      <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                        Thank you <strong>{name}</strong> from <strong>{companyName}</strong>. Our corporate offsite designers are crafting your proposal for <strong>{tripType}</strong>. We will get in touch with you within 24 hours on WhatsApp / Email!
                      </p>
                      <div className="pt-3">
                        <button
                          type="button"
                          onClick={() => {
                            setSubmitted(false)
                            setName('')
                            setCompanyName('')
                            setWorkEmail('')
                            setPhone('')
                            setExpectedDate('')
                            setDestinationPreference('')
                          }}
                          className="px-5 py-2 text-xs font-bold text-[var(--sky)] hover:underline cursor-pointer"
                        >
                          Submit another inquiry ➔
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">

                      {/* Name & Company */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                            Name <span className="text-rose-500">*</span>
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                              <Users size={16} />
                            </div>
                            <input
                              ref={nameInputRef}
                              required
                              type="text"
                              placeholder="Enter your name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              style={{ paddingLeft: '2.4rem' }}
                              className="w-full h-11 pr-3 bg-slate-50/80 border border-slate-200 rounded-xl text-xs sm:text-sm text-[var(--navy)] placeholder:text-slate-400 focus:outline-none focus:border-[var(--sky)] focus:bg-white focus:ring-2 focus:ring-[var(--sky)]/20 transition-all font-medium"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                            Company Name <span className="text-rose-500">*</span>
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                              <Building2 size={16} />
                            </div>
                            <input
                              required
                              type="text"
                              placeholder="Your company"
                              value={companyName}
                              onChange={(e) => setCompanyName(e.target.value)}
                              style={{ paddingLeft: '2.4rem' }}
                              className="w-full h-11 pr-3 bg-slate-50/80 border border-slate-200 rounded-xl text-xs sm:text-sm text-[var(--navy)] placeholder:text-slate-400 focus:outline-none focus:border-[var(--sky)] focus:bg-white focus:ring-2 focus:ring-[var(--sky)]/20 transition-all font-medium"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Work Email & Phone Number */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                            Work Email <span className="text-rose-500">*</span>
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                              <Mail size={16} />
                            </div>
                            <input
                              required
                              type="email"
                              placeholder="you@company.com"
                              value={workEmail}
                              onChange={(e) => setWorkEmail(e.target.value)}
                              style={{ paddingLeft: '2.4rem' }}
                              className="w-full h-11 pr-3 bg-slate-50/80 border border-slate-200 rounded-xl text-xs sm:text-sm text-[var(--navy)] placeholder:text-slate-400 focus:outline-none focus:border-[var(--sky)] focus:bg-white focus:ring-2 focus:ring-[var(--sky)]/20 transition-all font-medium"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                            Phone Number <span className="text-rose-500">*</span>
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 font-bold text-xs">
                              +91
                            </div>
                            <input
                              required
                              type="tel"
                              placeholder="98765 43210"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              style={{ paddingLeft: '2.6rem' }}
                              className="w-full h-11 pr-3 bg-slate-50/80 border border-slate-200 rounded-xl text-xs sm:text-sm text-[var(--navy)] placeholder:text-slate-400 focus:outline-none focus:border-[var(--sky)] focus:bg-white focus:ring-2 focus:ring-[var(--sky)]/20 transition-all font-medium"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Team Size & Expected Date */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                            Team Size <span className="text-rose-500">*</span>
                          </label>
                          <div className="relative">
                            <select
                              value={teamSize}
                              onChange={(e) => setTeamSize(e.target.value)}
                              className="w-full h-11 px-3 bg-slate-50/80 border border-slate-200 rounded-xl text-xs sm:text-sm text-[var(--navy)] focus:outline-none focus:border-[var(--sky)] focus:bg-white focus:ring-2 focus:ring-[var(--sky)]/20 transition-all font-medium cursor-pointer appearance-none"
                            >
                              <option value="10-25 People">10–25 People</option>
                              <option value="25-50 People">25–50 People</option>
                              <option value="50-100 People">50–100 People</option>
                              <option value="100-250 People">100–250 People</option>
                              <option value="250+ People">250+ People (Large Enterprise)</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                              <ChevronDown size={16} />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                            Expected Date <span className="text-rose-500">*</span>
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                              <Calendar size={16} />
                            </div>
                            <input
                              required
                              type="text"
                              placeholder="Select dates"
                              value={expectedDate}
                              onChange={(e) => setExpectedDate(e.target.value)}
                              style={{ paddingLeft: '2.4rem' }}
                              className="w-full h-11 pr-3 bg-slate-50/80 border border-slate-200 rounded-xl text-xs sm:text-sm text-[var(--navy)] placeholder:text-slate-400 focus:outline-none focus:border-[var(--sky)] focus:bg-white focus:ring-2 focus:ring-[var(--sky)]/20 transition-all font-medium"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Trip Type */}
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Trip Type <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <select
                            value={tripType}
                            onChange={(e) => setTripType(e.target.value)}
                            className="w-full h-11 px-3 bg-slate-50/80 border border-slate-200 rounded-xl text-xs sm:text-sm text-[var(--navy)] focus:outline-none focus:border-[var(--sky)] focus:bg-white focus:ring-2 focus:ring-[var(--sky)]/20 transition-all font-medium cursor-pointer appearance-none"
                          >
                            <option value="Weekend Offsite">Weekend Offsite (Near City)</option>
                            <option value="Domestic Offsite">Domestic Offsite (Goa, Rishikesh, Kerala, etc.)</option>
                            <option value="International Offsite">International Offsite (Bali, Thailand, Dubai, etc.)</option>
                            <option value="Leadership Retreat">Executive Leadership Retreat</option>
                          </select>
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                            <ChevronDown size={16} />
                          </div>
                        </div>
                      </div>

                      {/* Destination Preference */}
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Destination Preference
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                            <MapPin size={16} />
                          </div>
                          <input
                            type="text"
                            placeholder="Tell us if you have a destination in mind (e.g. Goa, Rishikesh, Bali)"
                            value={destinationPreference}
                            onChange={(e) => setDestinationPreference(e.target.value)}
                            style={{ paddingLeft: '2.4rem' }}
                            className="w-full h-11 pr-3 bg-slate-50/80 border border-slate-200 rounded-xl text-xs sm:text-sm text-[var(--navy)] placeholder:text-slate-400 focus:outline-none focus:border-[var(--sky)] focus:bg-white focus:ring-2 focus:ring-[var(--sky)]/20 transition-all font-medium"
                          />
                        </div>
                      </div>

                      {error && (
                        <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-medium">
                          {error}
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-12 bg-[#0b2940] hover:bg-[#134e75] text-white font-extrabold text-sm rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-xl transition-all duration-300 disabled:opacity-60 cursor-pointer"
                      >
                        {loading ? (
                          <>
                            <Loader2 size={18} className="animate-spin" />
                            <span>Submitting Offsite Request...</span>
                          </>
                        ) : (
                          <>
                            <span>Get a Custom Proposal</span>
                            <ArrowRight size={16} />
                          </>
                        )}
                      </button>

                      <p className="text-center text-[11px] text-slate-400 font-medium">
                        We&apos;ll get back to you as soon as possible.
                      </p>

                    </form>
                  )}

                </div>
              </div>

            </div>
          </div>
        </section>

      </main>
    </PageFrame>
  )
}

function SettingsIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}
