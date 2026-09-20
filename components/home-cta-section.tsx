'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function HomeCtaSection() {
  return (
    <section
      className="relative flex items-center justify-center min-h-[420px] md:min-h-[500px] py-14 sm:py-18 px-6 overflow-hidden"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=2200&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Premium Dark Overlay for contrast */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto mt-4">
        <span className="text-[10px] md:text-[11px] font-extrabold tracking-[0.25em] uppercase text-[#c5eaf6] mb-4 inline-block bg-[#0b2940]/60 px-4 py-1.5 rounded-full backdrop-blur-md border border-[#c5eaf6]/20 shadow-md">
          YOUR NEXT STORY IS WAITING
        </span>

        <h2 className="font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.15] text-white mb-4 drop-shadow-lg tracking-tight uppercase">
          Your friends are busy. <br />
          <span className="text-[var(--sun)] drop-shadow-md">Go anyway.</span>
        </h2>

        <p className="text-white/95 text-sm md:text-lg max-w-2xl mx-auto mb-8 font-bold drop-shadow-md leading-relaxed">
          Meet new people. Explore new places. Find your tribe.
        </p>

        <Link
          className="glow-btn inline-flex items-center justify-center gap-3 px-10 py-5 text-[15px] font-extrabold rounded-full mt-2 shadow-2xl hover:scale-105 transition-all uppercase tracking-wider"
          href="/upcoming-trips"
        >
          Explore Trips <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  )
}
