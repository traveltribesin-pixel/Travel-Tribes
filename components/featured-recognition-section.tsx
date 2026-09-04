'use client'

import { motion } from 'framer-motion'
import { Award, CheckCircle2, ShieldCheck, Sparkles, Star } from 'lucide-react'

export const recognitionPartners = [
  {
    name: 'TripAdvisor',
    role: 'Travelers’ Choice 2025',
    tag: '4.9/5 Rating',
    icon: '🏆',
    description: 'Recognized among the top 10% of experiential travel organizers in India.'
  },
  {
    name: 'Condé Nast Traveller',
    role: 'Featured Community',
    tag: 'Top Youth Trips',
    icon: '✨',
    description: 'Featured for authentic solo-friendly backpacking trips and local homestays.'
  },
  {
    name: 'Lonely Planet',
    role: 'Curated Itineraries',
    tag: 'Verified Partner',
    icon: '🌍',
    description: 'Recommended for offbeat Himalayan trails & Western Ghats coastal expeditions.'
  },
  {
    name: 'Outlook Traveller',
    role: 'Best Group Experiences',
    tag: 'Editor’s Pick',
    icon: '⭐',
    description: 'Celebrated for safe solo-female travel and community-first experiences.'
  },
  {
    name: 'Incredible India',
    role: 'Eco-Tourism Ally',
    tag: 'Sustainable Travel',
    icon: '🌿',
    description: 'Promoting zero-waste trekking and responsible cultural exploration.'
  },
  {
    name: 'Decathlon India',
    role: 'Outdoor Gear Partner',
    tag: 'Official Partner',
    icon: '🎒',
    description: 'Collaborating on high-altitude winter gear & trekking essentials.'
  },
  {
    name: 'GoPro Creators',
    role: 'Adventure Moments',
    tag: 'Content Creator',
    icon: '📹',
    description: 'Documenting unfiltered memories and 4K storytelling across all expeditions.'
  },
  {
    name: 'National Geographic Travellers',
    role: 'Culture & Heritage',
    tag: 'Community Pick',
    icon: '🧭',
    description: 'Spotlighting ancient monastery trails in Spiti Valley and sacred temples.'
  }
]

export function FeaturedRecognitionSection() {
  // Duplicate array for seamless infinite marquee loop
  const marqueeItems = [...recognitionPartners, ...recognitionPartners]

  return (
    <section className="relative w-full py-12 lg:py-16 bg-gradient-to-b from-[#f7fbfd] via-white to-[#f7fbfd] overflow-hidden border-y border-slate-100">
      <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--sky-pale)] text-[var(--sky)] text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles size={14} />
          <span>Featured & Recognized</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[var(--navy)]">
          Trusted by Global Travel Leaders & Travellers Alike
        </h2>
        <p className="text-slate-500 text-xs sm:text-sm max-w-xl mx-auto mt-2">
          From top travel publications to leading adventure brands, here is who backs our vision of community-first backpacking.
        </p>
      </div>

      {/* Infinite Auto-Scrolling Marquee Track */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <style dangerouslySetInnerHTML={{
          __html: `
          @keyframes marquee-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            display: flex;
            width: max-content;
            animation: marquee-scroll 32s linear infinite;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}} />

        <div className="animate-marquee flex items-center gap-5 py-2">
          {marqueeItems.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 bg-white/90 hover:bg-white px-5 py-4 rounded-2xl border border-slate-200/90 hover:border-[var(--sky)] shadow-[0_4px_16px_rgba(67,169,209,0.06)] hover:shadow-[0_8px_24px_rgba(67,169,209,0.14)] transition-all duration-300 min-w-[280px] sm:min-w-[320px] group cursor-default"
            >
              <div className="w-12 h-12 rounded-xl bg-[var(--sky-pale)] text-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-0.5">
                  <h4 className="font-bold text-sm text-[var(--navy)] group-hover:text-[var(--sky)] transition-colors truncate">
                    {item.name}
                  </h4>
                  <span className="text-[10px] font-extrabold text-[var(--sky)] bg-sky-50 px-2 py-0.5 rounded-full border border-sky-100 shrink-0">
                    {item.tag}
                  </span>
                </div>
                <div className="text-[11px] font-medium text-slate-500 truncate">
                  {item.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust Badges Bar Underneath */}
      <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-slate-200/70 text-center">
          <div className="flex items-center justify-center gap-2.5 text-slate-700 text-xs sm:text-sm font-semibold">
            <ShieldCheck size={18} className="text-emerald-500" />
            <span>100% Verified Trips</span>
          </div>
          <div className="flex items-center justify-center gap-2.5 text-slate-700 text-xs sm:text-sm font-semibold">
            <Star size={18} className="text-amber-500 fill-amber-500" />
            <span>4.9★ (1,200+ Reviews)</span>
          </div>
          <div className="flex items-center justify-center gap-2.5 text-slate-700 text-xs sm:text-sm font-semibold">
            <CheckCircle2 size={18} className="text-[var(--sky)]" />
            <span>Solo-Female Friendly</span>
          </div>
          <div className="flex items-center justify-center gap-2.5 text-slate-700 text-xs sm:text-sm font-semibold">
            <Award size={18} className="text-[var(--sun)]" />
            <span>Experienced Captains</span>
          </div>
        </div>
      </div>
    </section>
  )
}
