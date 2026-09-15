'use client'

import { Users, Heart, Flame, ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'

export function BrandValuesSection() {
  const values = [
    {
      title: 'FIND YOUR TRIBE',
      tagline: 'Come solo. Find your people.',
      desc: "You don't need a travel buddy to join. Show up solo, meet people who love to travel, and leave with a new group chat.",
      icon: Users,
      badge: 'Solo Friendly',
      color: 'from-[var(--sky-pale)] to-white',
      border: 'border-[var(--sky-pale)] hover:border-[var(--sky)]',
      iconBg: 'bg-[var(--sky)] text-white'
    },
    {
      title: 'REAL CONNECTIONS',
      tagline: 'Strangers on Day 1. Friends by Day 5.',
      desc: 'Shared adventures have a funny way of bringing people together. Expect new faces, inside jokes and friendships that last beyond the trip.',
      icon: Heart,
      badge: 'Genuine Bonds',
      color: 'from-amber-50/60 to-white',
      border: 'border-amber-200/60 hover:border-amber-400',
      iconBg: 'bg-amber-500 text-white'
    },
    {
      title: 'ZERO BORING VIBES',
      tagline: 'Less sightseeing. More living.',
      desc: "We skip the boring checklist and focus on experiences you'll actually remember — hidden spots, local food, spontaneous plans and plenty of stories.",
      icon: Flame,
      badge: 'Curated Trails',
      color: 'from-emerald-50/60 to-white',
      border: 'border-emerald-200/60 hover:border-emerald-400',
      iconBg: 'bg-emerald-500 text-white'
    }
  ]

  return (
    <section
      className="py-12 sm:py-16 bg-white relative overflow-hidden border-b border-slate-100"
      style={{
        paddingLeft: 'max(5vw, calc((100% - 1160px) / 2))',
        paddingRight: 'max(5vw, calc((100% - 1160px) / 2))',
      }}
    >
      {/* Background Decorative Gradient Blobs */}
      <div className="absolute top-1/2 -left-40 w-96 h-96 bg-[var(--sky)]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 text-[11px] font-extrabold text-[var(--sky)] uppercase tracking-widest bg-[var(--sky-pale)] border border-[var(--sky)]/20 px-4 py-1.5 rounded-full mb-3 shadow-xs">
          <Sparkles size={14} className="text-[var(--sky)]" />
          <span>WHY TRAVEL TRIBES</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--navy)] leading-tight tracking-tight">
          Not Your Usual Travel Company.
        </h2>

        <p className="text-slate-600 text-sm sm:text-base lg:text-lg font-semibold mt-2.5 max-w-2xl mx-auto leading-relaxed">
          Small groups. Like-minded people. Experiences worth leaving home for.
        </p>
      </div>

      {/* 3 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
        {values.map((v, idx) => {
          const Icon = v.icon
          return (
            <div
              key={idx}
              className={`bg-gradient-to-b ${v.color} rounded-3xl p-7 sm:p-8 border ${v.border} shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_36px_rgba(67,169,209,0.14)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group`}
            >
              <div>
                {/* Top Badge & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-12 h-12 rounded-2xl ${v.iconBg} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                    <Icon size={22} className="stroke-[2.5]" />
                  </div>
                  <span className="text-[10px] font-extrabold tracking-wider uppercase px-3 py-1 rounded-full bg-white text-slate-700 border border-slate-200/80 shadow-xs">
                    {v.badge}
                  </span>
                </div>

                {/* Title & Tagline */}
                <h3 className="text-xs font-black uppercase tracking-wider text-[var(--sky)] mb-1.5">
                  {v.title}
                </h3>
                <h4 className="text-lg sm:text-xl font-extrabold text-[var(--navy)] leading-snug mb-3.5">
                  {v.tagline}
                </h4>

                {/* Description */}
                <p className="text-slate-600 text-xs sm:text-[13.5px] leading-relaxed">
                  {v.desc}
                </p>
              </div>

              {/* Bottom Subtle Accent */}
              <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-[var(--navy)] group-hover:text-[var(--sky)] transition-colors">
                <span>Find Your Tribe</span>
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
