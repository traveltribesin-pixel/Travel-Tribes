'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, MessageCircle, HelpCircle, Sparkles, ArrowRight } from 'lucide-react'
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
    <section className={`w-full max-w-[1060px] py-6 sm:py-8 px-4 sm:px-6 mx-auto ${className}`}>
      {/* Header Container */}
      <div className="text-center max-w-2xl mx-auto mb-5 sm:mb-6">
        <div className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest text-[var(--sky)] mb-1.5 bg-[var(--sky-pale)] px-2.5 py-1 rounded-full border border-[var(--sky)]/20">
          <HelpCircle size={12} className="text-[var(--sky)]" />
          <span>{eyebrow}</span>
        </div>
        <h2 className="text-lg sm:text-2xl md:text-3xl font-extrabold text-[var(--navy)] leading-tight tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-slate-500 text-xs sm:text-[13px] mt-1 max-w-xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {/* Sleek Accordion List */}
      <div className="max-w-3xl mx-auto space-y-2 sm:space-y-2.5">
        {items.map((faq, index) => {
          const isOpen = openIndex === index
          const itemNumber = (index + 1).toString().padStart(2, '0')

          return (
            <div
              key={faq.id}
              className={`rounded-xl sm:rounded-2xl transition-all duration-200 border overflow-hidden ${
                isOpen
                  ? 'bg-white border-[var(--sky)]/60 shadow-sm ring-1 ring-[var(--sky)]/20'
                  : 'bg-white/90 hover:bg-white border-slate-200/80 hover:border-slate-300'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleAccordion(index)}
                className="w-full text-left py-2.5 px-3.5 sm:py-3 sm:px-4 flex items-center justify-between gap-3 cursor-pointer select-none group"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
                  <span
                    className={`text-[11px] sm:text-xs font-bold tracking-tight shrink-0 transition-colors ${
                      isOpen ? 'text-[var(--sky)]' : 'text-slate-300 group-hover:text-slate-400'
                    }`}
                  >
                    {itemNumber}
                  </span>
                  <div className="flex items-center gap-2 flex-wrap min-w-0">
                    <span
                      className={`text-xs sm:text-[13.5px] font-bold transition-colors leading-snug ${
                        isOpen ? 'text-[var(--navy)]' : 'text-slate-800 group-hover:text-[var(--navy)]'
                      }`}
                    >
                      {faq.question}
                    </span>
                    {faq.category && (
                      <span className="hidden sm:inline-block text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 border border-slate-200/60">
                        {faq.category}
                      </span>
                    )}
                  </div>
                </div>

                <div
                  className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ${
                    isOpen
                      ? 'bg-[var(--sky)] text-white rotate-180 shadow-xs'
                      : 'bg-slate-100 group-hover:bg-[var(--sky-pale)] text-slate-500 group-hover:text-[var(--sky)]'
                  }`}
                >
                  <ChevronDown size={14} className="stroke-[2.5]" />
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-3.5 pb-3 sm:px-4 sm:pb-3.5 pt-1 text-[11.5px] sm:text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                      <div className="pl-6 sm:pl-7 space-y-1.5">
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
        <div className="text-center mt-5">
          <Link
            href="/why-us"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-xs font-bold text-[var(--navy)] hover:border-[var(--sky)] hover:text-[var(--sky)] shadow-2xs hover:shadow-xs transition-all"
          >
            <span>View All {whyUsFaqs.length} Questions & Why Us</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      )}

      {/* Still Have Questions CTA Card */}
      <div className="mt-6 sm:mt-8 max-w-3xl mx-auto">
        <div className="bg-gradient-to-br from-[var(--navy)] to-[#154668] rounded-2xl p-4 sm:p-5 text-white shadow-md relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Background Decorative Pattern */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-[var(--sky)]/15 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-extrabold text-[var(--sky)] uppercase tracking-wider mb-1">
              <Sparkles size={12} className="text-[var(--sky)]" />
              <span>We're Just A Message Away</span>
            </div>
            <h3 className="text-base sm:text-lg font-extrabold text-white leading-tight">
              Still have questions?
            </h3>
            <p className="text-slate-300 text-xs mt-0.5 max-w-sm">
              Chat directly with our team on WhatsApp for quick answers or customized trip plans.
            </p>
          </div>

          <div className="relative z-10 shrink-0">
            <a
              href="https://wa.me/919975822023?text=Hi%20Travel%20Tribes,%20I%20have%20a%20question%20about%20your%20trips!"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs shadow-md transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <MessageCircle size={15} className="fill-white stroke-none" />
              <span>Chat on WhatsApp</span>
              <ArrowRight size={13} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

