'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function HomeCtaSection() {
  return (
    <section
      className="relative flex items-center justify-center min-h-[550px] md:min-h-[650px] py-24 px-6 overflow-hidden"
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
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto mt-8">
        <span className="text-[10px] md:text-[11px] font-extrabold tracking-[0.25em] uppercase text-[#c5eaf6] mb-6 inline-block bg-[#0b2940]/40 px-5 py-2 rounded-full backdrop-blur-md border border-[#c5eaf6]/20">
          Your next great story
        </span>

        <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-white mb-6 drop-shadow-lg">
          Go somewhere <br />
          <em className="text-[#ef9b62] italic font-light drop-shadow-md">that changes you.</em>
        </h2>

        <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto mb-10 font-medium drop-shadow-md leading-relaxed">
          Embark on a journey designed for the curious soul. Handcrafted itineraries, small groups, and moments that stay with you forever.
        </p>

        <Link
          className="glow-btn inline-flex items-center justify-center gap-3 px-10 py-5 text-[15px] font-bold rounded-full mt-4"
          href="/contact"
        >
          Start planning <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  )
}
