'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Sparkles,
  Users,
  Compass,
  Star,
  CheckCircle2,
  ShieldCheck,
  MessageCircle,
  Flame
} from 'lucide-react'

export function CommunityBannerSection() {
  return (
    <section className="py-6 sm:py-8 bg-[#f7fbfd]">
      <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-[var(--navy)] text-white p-6 sm:p-10 lg:p-14 border border-slate-700/40 shadow-[0_20px_50px_rgba(11,41,64,0.25)]">

          {/* Background Image with Artistic Overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=85"
              alt="Travel community camping under starlit sky"
              fill
              priority
              className="object-cover object-center brightness-[0.35] scale-105"
            />
            {/* Color Wash Gradients */}
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--navy)] via-[var(--navy)]/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy)] via-transparent to-transparent" />
          </div>

          {/* Banner Content Grid */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Left Content Column */}
            <div className="lg:col-span-8 space-y-4 sm:space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-[var(--sky)] text-xs font-extrabold uppercase tracking-wider border border-white/15">
                <Flame size={14} className="text-[var(--sun)]" />
                <span>Next Departures Filling Fast</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                Come as a Solo Explorer. <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-[var(--sky)] via-sky-300 to-[var(--sun)] bg-clip-text text-transparent">
                  Return with a Lifelong Tribe.
                </span>
              </h2>

              <p className="text-slate-300 text-xs sm:text-sm sm:leading-relaxed max-w-2xl font-normal opacity-95">
                Say goodbye to cancelled plans with friends. Join curated group trips designed for 20s–30s solo travellers, remote workers, and adventurers. Handpicked stays, experienced trip captains, and zero hassle.
              </p>

              {/* Highlights Chips */}
              <div className="flex flex-wrap items-center gap-2.5 pt-2">
                <span className="flex items-center gap-1.5 text-xs bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-white font-medium">
                  <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                  Small Groups (12–15 People)
                </span>
                <span className="flex items-center gap-1.5 text-xs bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-white font-medium">
                  <ShieldCheck size={14} className="text-[var(--sky)] shrink-0" />
                  Solo-Female Friendly
                </span>
                <span className="flex items-center gap-1.5 text-xs bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-white font-medium">
                  <Compass size={14} className="text-[var(--sun)] shrink-0" />
                  Certified Trip Captains
                </span>
              </div>

              {/* CTA Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-4">
                <Link
                  href="/upcoming-trips"
                  className="glow-btn py-3.5 px-7 rounded-full font-bold text-xs sm:text-sm flex items-center justify-center gap-2 text-center shadow-lg"
                >
                  Explore Upcoming Batches <ArrowRight size={16} />
                </Link>

                <a
                  href={`https://wa.me/919975822023?text=${encodeURIComponent(
                    "Hi Travel Tribes! I'm planning my next backpacking trip and would like to know the upcoming dates and available slots."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3.5 px-6 rounded-full font-bold text-xs sm:text-sm bg-white/10 hover:bg-white/20 text-white border border-white/20 flex items-center justify-center gap-2 transition-colors duration-300"
                >
                  <MessageCircle size={16} className="text-[#25D366]" /> Chat on WhatsApp (+91 99758 22023)
                </a>
              </div>
            </div>

            {/* Right Stats / Trust Card */}
            <div className="lg:col-span-4 bg-white/10 backdrop-blur-xl border border-white/15 rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="text-center pb-4 border-b border-white/10">
                <div className="flex justify-center items-center gap-1 text-amber-400 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-amber-400" />
                  ))}
                </div>
                <div className="font-bold text-lg text-white">4.9 / 5.0 Rating</div>
                <p className="text-[11px] text-slate-300">Over 1,200+ Verified Reviews</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-3 bg-black/20 rounded-2xl border border-white/5">
                  <div className="text-2xl sm:text-3xl font-black text-[var(--sky)]">5,000+</div>
                  <div className="text-[10px] sm:text-[11px] font-bold text-slate-300 uppercase tracking-wider mt-0.5">
                    Happy Travellers
                  </div>
                </div>

                <div className="p-3 bg-black/20 rounded-2xl border border-white/5">
                  <div className="text-2xl sm:text-3xl font-black text-[var(--sun)]">100+</div>
                  <div className="text-[10px] sm:text-[11px] font-bold text-slate-300 uppercase tracking-wider mt-0.5">
                    Batches Done
                  </div>
                </div>
              </div>

              <div className="p-3.5 bg-[var(--sky)]/15 border border-[var(--sky)]/30 rounded-2xl text-center">
                <span className="text-xs font-bold text-sky-200">
                  ⚡ ₹1,000 Early Bird Discount
                </span>
                <p className="text-[10px] text-slate-300 mt-0.5">
                  Applied automatically on bookings made 15 days in advance
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
