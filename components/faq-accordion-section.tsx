'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, MessageCircle, HelpCircle, Sparkles, ArrowRight, ShieldCheck, Users, Compass } from 'lucide-react'
import { whyUsFaqs } from '@/lib/travel-data'

interface FaqAccordionSectionProps {
  title?: string
  eyebrow?: string
  subtitle?: string
  className?: string
  limit?: number
  showViewAllButton?: boolean
}

export function FaqAccordionSection({
  title = 'Frequently Asked Questions',
  eyebrow = 'GOT QUESTIONS?',
  subtitle = 'Everything you need to know about our trips, solo travel safety, trip captains, and community vibe.',
  className = '',
  limit,
  showViewAllButton = false,
}: FaqAccordionSectionProps) {
  // Only one accordion item open at a time
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const items = limit ? whyUsFaqs.slice(0, limit) : whyUsFaqs

  const toggleAccordion = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index))
  }

  return (
    <section
      className={`py-12 sm:py-16 bg-gradient-to-b from-white via-[var(--sky-pale)]/30 to-white relative overflow-hidden ${className}`}
      style={{
        paddingLeft: 'max(5vw, calc((100% - 1160px) / 2))',
        paddingRight: 'max(5vw, calc((100% - 1160px) / 2))',
      }}
    >
      {/* Background Glows */}
      <div className="absolute top-1/4 -left-32 w-80 h-80 bg-[var(--sky)]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-[var(--navy)]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 text-[11px] font-extrabold text-[var(--sky)] uppercase tracking-widest bg-[var(--sky-pale)] border border-[var(--sky)]/20 px-3.5 py-1.5 rounded-full mb-2.5 shadow-xs">
          <HelpCircle size={14} className="text-[var(--sky)]" />
          <span>{eyebrow}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--navy)] leading-tight tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-slate-600 text-xs sm:text-sm lg:text-base mt-2 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {/* Single Open Accordion Container */}
      <div className="max-w-4xl mx-auto space-y-3.5 sm:space-y-4">
        {items.map((faq, index) => {
          const isOpen = openIndex === index
          const itemNumber = (index + 1).toString().padStart(2, '0')

          return (
            <div
              key={faq.id}
              className={`rounded-2xl sm:rounded-3xl transition-all duration-300 border ${
                isOpen
                  ? 'bg-white border-[var(--sky)] shadow-[0_8px_30px_rgba(67,169,209,0.14)] ring-1 ring-[var(--sky)]/20'
                  : 'bg-white/80 hover:bg-white border-slate-200/80 hover:border-slate-300 shadow-xs'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleAccordion(index)}
                className="w-full text-left p-5 sm:p-6 sm:py-5.5 flex items-center justify-between gap-4 cursor-pointer select-none group"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-3.5 sm:gap-4.5 min-w-0">
                  <span
                    className={`text-xs sm:text-sm font-black tracking-tight shrink-0 transition-colors ${
                      isOpen ? 'text-[var(--sky)]' : 'text-slate-300 group-hover:text-slate-400'
                    }`}
                  >
                    {itemNumber}
                  </span>
                  <div className="flex items-center gap-2.5 flex-wrap min-w-0">
                    <span
                      className={`text-sm sm:text-base font-bold transition-colors leading-snug ${
                        isOpen ? 'text-[var(--navy)]' : 'text-slate-800 group-hover:text-[var(--navy)]'
                      }`}
                    >
                      {faq.question}
                    </span>
                    {faq.category && (
                      <span className="hidden sm:inline-block text-[9.5px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-500 border border-slate-200/60">
                        {faq.category}
                      </span>
                    )}
                  </div>
                </div>

                <div
                  className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                    isOpen
                      ? 'bg-[var(--sky)] text-white rotate-180 shadow-sm'
                      : 'bg-slate-100 group-hover:bg-[var(--sky-pale)] text-slate-500 group-hover:text-[var(--sky)]'
                  }`}
                >
                  <ChevronDown size={18} className="stroke-[2.5]" />
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.04, 0.62, 0.23, 0.98] }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-1 sm:pt-1 text-xs sm:text-[13.5px] text-slate-600 leading-relaxed border-t border-slate-100/80 mt-1">
                      <div className="pl-6 sm:pl-8 space-y-2.5">
                        {faq.answer.split('\n\n').map((para, pIdx) => (
                          <p key={pIdx} className="leading-relaxed">
                            {para}
                          </p>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>

      {/* Optional View All Link */}
      {showViewAllButton && limit && limit < whyUsFaqs.length && (
        <div className="text-center mt-10">
          <Link
            href="/why-us"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-slate-200 text-xs sm:text-sm font-bold text-[var(--navy)] hover:border-[var(--sky)] hover:text-[var(--sky)] shadow-sm hover:shadow-md transition-all"
          >
            <span>View All {whyUsFaqs.length} Questions & Why Us</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      )}

      {/* Still Have Questions CTA Card */}
      <div className="mt-10 sm:mt-12 max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-[var(--navy)] to-[#154668] rounded-3xl p-6 sm:p-10 text-white shadow-[0_12px_40px_rgba(11,41,64,0.18)] relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Background Decorative Pattern */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--sky)]/15 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-white/5 rounded-full blur-xl pointer-events-none" />

          <div className="relative z-10 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-extrabold text-[var(--sky)] uppercase tracking-wider mb-2">
              <Sparkles size={14} className="text-[var(--sky)]" />
              <span>We're Just A Message Away</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              Still have questions?
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm mt-1.5 max-w-md">
              Chat directly with our team on WhatsApp for quick answers, customized trip plans, or dates.
            </p>
          </div>

          <div className="relative z-10 shrink-0">
            <a
              href="https://wa.me/919975822023?text=Hi%20Travel%20Tribes,%20I%20have%20a%20question%20about%20your%20trips!"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs sm:text-sm shadow-lg hover:shadow-emerald-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <MessageCircle size={18} className="fill-white stroke-none" />
              <span>Chat With Us</span>
              <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
