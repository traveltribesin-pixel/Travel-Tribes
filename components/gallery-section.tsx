'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { HorizontalRail, SectionHeading } from '@/components/trip-components'
import { gallery } from '@/lib/travel-data'
import { MapPin, Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react'

export function GallerySection() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null)

  // Handle keyboard navigation for lightbox
  useEffect(() => {
    if (selectedPhotoIndex === null) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedPhotoIndex(null)
      if (e.key === 'ArrowRight') setSelectedPhotoIndex((prev) => (prev !== null ? (prev + 1) % gallery.length : 0))
      if (e.key === 'ArrowLeft') setSelectedPhotoIndex((prev) => (prev !== null ? (prev - 1 + gallery.length) % gallery.length : 0))
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedPhotoIndex])

  return (
    <section className="w-full max-w-[1280px] py-12 sm:py-16 px-[5vw] mx-auto gallery-section">
      <SectionHeading 
        eyebrow="A glimpse of the good life" 
        title="Postcards from the tribe." 
        text="Browse through our collection of memories. A visual journey of the beautiful places we've been and the amazing people we've met."
        center
      />

      <HorizontalRail label="Travel gallery">
        {gallery.map((item, i) => (
          <div
            key={item.image}
            onClick={() => setSelectedPhotoIndex(i)}
            className="gallery-card group relative overflow-hidden rounded-3xl cursor-pointer border border-[var(--sky-pale)] hover:border-[var(--sky)] shadow-[0_4px_16px_rgba(67,169,209,0.08)] hover:shadow-[0_16px_36px_rgba(67,169,209,0.22)] transition-all duration-500 hover:-translate-y-1.5 bg-slate-900 !h-[340px] sm:!h-[380px] !w-full"
          >
            {/* Uniform Image Container */}
            <Image 
              src={item.image} 
              alt={item.alt} 
              fill 
              sizes="(max-width: 700px) 88vw, (max-width: 1024px) 45vw, 30vw" 
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-300" />

            {/* Top Expand Pill Button */}
            <div className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md text-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-105 border border-white/20">
              <Maximize2 size={16} />
            </div>

            {/* Bottom Caption Pill */}
            <div className="absolute bottom-0 left-0 right-0 p-5 z-10 text-white transform transition-transform duration-300">
              {item.location && (
                <div className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest text-sky-300 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full mb-2 border border-white/10">
                  <MapPin size={11} className="shrink-0" />
                  <span>{item.location}</span>
                </div>
              )}
              <h4 className="text-lg font-bold text-white drop-shadow-sm leading-snug line-clamp-1">
                {item.title || item.alt}
              </h4>
            </div>
          </div>
        ))}
      </HorizontalRail>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedPhotoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={() => setSelectedPhotoIndex(null)}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedPhotoIndex(null)}
              className="absolute top-6 right-6 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors border border-white/20"
              aria-label="Close photo preview"
            >
              <X size={22} />
            </button>

            {/* Prev button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                setSelectedPhotoIndex((selectedPhotoIndex - 1 + gallery.length) % gallery.length)
              }}
              className="absolute left-4 sm:left-8 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors border border-white/20"
              aria-label="Previous photo"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Next button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                setSelectedPhotoIndex((selectedPhotoIndex + 1) % gallery.length)
              }}
              className="absolute right-4 sm:right-8 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors border border-white/20"
              aria-label="Next photo"
            >
              <ChevronRight size={24} />
            </button>

            {/* Main Lightbox Content */}
            <motion.div
              key={selectedPhotoIndex}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-4xl w-full max-h-[85vh] rounded-3xl overflow-hidden bg-slate-950 border border-white/10 shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-[55vh] sm:h-[65vh] bg-slate-900">
                <Image
                  src={gallery[selectedPhotoIndex].image}
                  alt={gallery[selectedPhotoIndex].alt}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="p-5 bg-slate-900/90 backdrop-blur-md border-t border-white/10 flex items-center justify-between text-white">
                <div>
                  <div className="flex items-center gap-2 text-xs text-sky-400 font-bold uppercase tracking-wider mb-0.5">
                    <MapPin size={13} />
                    <span>{gallery[selectedPhotoIndex].location || 'Travel Tribes Memory'}</span>
                  </div>
                  <h3 className="text-lg font-bold">
                    {gallery[selectedPhotoIndex].title || gallery[selectedPhotoIndex].alt}
                  </h3>
                </div>
                <span className="text-xs font-semibold text-slate-400 bg-white/10 px-3 py-1.5 rounded-full">
                  {selectedPhotoIndex + 1} / {gallery.length}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
