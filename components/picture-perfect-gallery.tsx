'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Camera, Maximize2, X, Images } from 'lucide-react'

export interface GalleryPhoto {
  image: string
  alt: string
  caption?: string
}

interface PicturePerfectGalleryProps {
  images: GalleryPhoto[]
  tripTitle?: string
  location?: string
  className?: string
}

export function PicturePerfectGallery({
  images,
  tripTitle = 'Trip',
  location,
  className = ''
}: PicturePerfectGalleryProps) {
  // Ensure we have at least 4 photos for the 4-card curve
  const photos = useMemo(() => {
    if (!images || images.length === 0) return []
    if (images.length >= 4) return images
    const duplicated = [...images]
    while (duplicated.length < 8) {
      duplicated.push(...images)
    }
    return duplicated
  }, [images])

  const [currentIndex, setCurrentIndex] = useState(0)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [isPaused, setIsPaused] = useState(false)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const [isHovered, setIsHovered] = useState(false)

  const totalPhotos = photos.length

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalPhotos) % totalPhotos)
  }, [totalPhotos])

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalPhotos)
  }, [totalPhotos])

  // Auto-advance every 3.5s
  useEffect(() => {
    if (totalPhotos <= 1 || isPaused || isHovered || lightboxIndex !== null) return

    const interval = setInterval(() => {
      handleNext()
    }, 3500)

    return () => clearInterval(interval)
  }, [totalPhotos, isPaused, isHovered, lightboxIndex, handleNext])

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (lightboxIndex === null) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null)
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev !== null ? (prev - 1 + totalPhotos) % totalPhotos : null))
      }
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev !== null ? (prev + 1) % totalPhotos : null))
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxIndex, totalPhotos])

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true)
    setTouchStartX(e.touches[0].clientX)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    setIsPaused(false)
    if (touchStartX === null) return
    const touchEndX = e.changedTouches[0].clientX
    const diff = touchStartX - touchEndX

    if (diff > 40) {
      handleNext()
    } else if (diff < -40) {
      handlePrev()
    }
    setTouchStartX(null)
  }

  if (photos.length === 0) return null

  // 4 visible items
  const visibleCards = [0, 1, 2, 3].map((offset) => {
    const photoIdx = (currentIndex + offset) % totalPhotos
    return {
      photo: photos[photoIdx],
      photoIdx,
      slot: offset
    }
  })

  // Exact polygon clip-paths that form the continuous cylindrical curved ribbon (WanderOn style)
  const getDesktopClipPath = (slot: number) => {
    switch (slot) {
      case 0:
        // Leftmost: top-left is highest (0 0), slopes down to 4.5% on right; bottom slopes up from 100% to 95.5%
        return 'polygon(0 0, 100% 4.8%, 100% 95.2%, 0 100%)'
      case 1:
        // Mid-left: slopes from 4.8% down to 7.2%; bottom slopes from 95.2% up to 92.8%
        return 'polygon(0 4.8%, 100% 7.2%, 100% 92.8%, 0 95.2%)'
      case 2:
        // Mid-right: slopes from 7.2% up to 4.8%; bottom slopes from 92.8% down to 95.2%
        return 'polygon(0 7.2%, 100% 4.8%, 100% 95.2%, 0 92.8%)'
      case 3:
        // Rightmost: slopes from 4.8% up to 0 on top-right (100% 0); bottom slopes from 95.2% down to 100% (100% 100%)
        return 'polygon(0 4.8%, 100% 0, 100% 100%, 0 95.2%)'
      default:
        return 'none'
    }
  }

  // Responsive mobile 2-card clip-path
  const getMobileClipPath = (slot: number) => {
    if (slot === 0) {
      return 'polygon(0 0, 100% 5%, 100% 95%, 0 100%)'
    } else if (slot === 1) {
      return 'polygon(0 5%, 100% 0, 100% 100%, 0 95%)'
    }
    return 'none'
  }

  return (
    <section id="gallery" className={`w-full py-8 sm:py-12 scroll-mt-28 relative ${className}`}>
      <div className="max-w-[1240px] mx-auto px-2 sm:px-4 lg:px-6">
        
        {/* Section Header - Exact WanderOn title */}
        <div className="text-center mb-6 sm:mb-9">
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-slate-800 tracking-normal">
            Pictures Perfect Moments
          </h2>
        </div>

        {/* 3D Curved Cylindrical Ribbon Showcase */}
        <div 
          className="relative max-w-[1140px] mx-auto select-none"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Circular Cyan Navigation Buttons (Left & Right) matching WanderOn */}
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-1 sm:-left-4 lg:-left-5 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#00b4d8] hover:bg-[#0096c7] text-white flex items-center justify-center transition-all duration-200 shadow-[0_4px_14px_rgba(0,180,216,0.45)] hover:scale-105 active:scale-95 cursor-pointer"
            aria-label="Previous photos"
          >
            <ChevronLeft size={22} className="stroke-[2.5]" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="absolute right-1 sm:-right-4 lg:-right-5 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#00b4d8] hover:bg-[#0096c7] text-white flex items-center justify-center transition-all duration-200 shadow-[0_4px_14px_rgba(0,180,216,0.45)] hover:scale-105 active:scale-95 cursor-pointer"
            aria-label="Next photos"
          >
            <ChevronRight size={22} className="stroke-[2.5]" />
          </button>

          {/* Curved Ribbon Container */}
          <div className="w-full px-1 sm:px-2 py-2">
            {/* Desktop 4-Card Curved Ribbon */}
            <div className="hidden md:grid grid-cols-4 gap-2.5 items-stretch h-[360px] lg:h-[400px]">
              {visibleCards.map(({ photo, photoIdx, slot }) => {
                const clipPath = getDesktopClipPath(slot)

                return (
                  <div
                    key={`desk-${slot}-${photoIdx}`}
                    onClick={() => setLightboxIndex(photoIdx)}
                    style={{ clipPath }}
                    className="group relative h-full w-full overflow-hidden cursor-pointer bg-slate-200 transition-all duration-300"
                  >
                    <Image
                      src={photo.image}
                      alt={photo.alt || `${tripTitle} photo`}
                      fill
                      sizes="25vw"
                      priority={slot === 0 || slot === 1}
                      className="object-cover object-balanced transition-transform duration-700 ease-out group-hover:scale-108"
                    />

                    {/* Clean Hover Overlay */}
                    <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-slate-800 shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
                        <Maximize2 size={16} />
                      </div>
                    </div>

                    {/* Bottom Caption */}
                    {photo.alt && (
                      <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-white text-[11px] font-semibold bg-black/50 px-2.5 py-1 rounded-md backdrop-blur-sm truncate block">
                          {photo.alt}
                        </span>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Mobile & Tablet (1 Full Main Card + Next Card Peeking from right) */}
            <div className="flex md:hidden gap-2.5 items-stretch h-[300px] sm:h-[340px] w-full overflow-hidden">
              {visibleCards.slice(0, 2).map(({ photo, photoIdx, slot }) => {
                const clipPath = getMobileClipPath(slot)

                return (
                  <div
                    key={`mob-${slot}-${photoIdx}`}
                    onClick={() => setLightboxIndex(photoIdx)}
                    style={{ clipPath }}
                    className="group relative h-full w-[80%] sm:w-[75%] shrink-0 overflow-hidden cursor-pointer bg-slate-200 transition-all duration-300"
                  >
                    <Image
                      src={photo.image}
                      alt={photo.alt || `${tripTitle} photo`}
                      fill
                      sizes="80vw"
                      className="object-cover object-balanced transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-slate-800 shadow">
                        <Maximize2 size={14} />
                      </div>
                    </div>
                    {photo.alt && slot === 0 && (
                      <div className="absolute bottom-2.5 left-2.5 right-2.5">
                        <span className="text-white text-[10px] font-semibold bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm truncate inline-block max-w-[90%]">
                          {photo.alt}
                        </span>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Bottom Bar: Position Indicator & View All Photos */}
          <div className="mt-4 flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700">
                {String(currentIndex + 1).padStart(2, '0')}
              </span>
              <div className="w-20 sm:w-28 h-1 bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#00b4d8] transition-all duration-300 rounded-full"
                  style={{ width: `${((currentIndex + 1) / totalPhotos) * 100}%` }}
                />
              </div>
              <span className="text-xs font-bold text-slate-400">
                {String(totalPhotos).padStart(2, '0')}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setLightboxIndex(0)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-slate-200 bg-white text-slate-700 hover:text-[#00b4d8] text-xs font-semibold transition-all shadow-sm cursor-pointer"
            >
              <Images size={14} className="text-[#00b4d8]" />
              <span>View All {totalPhotos} Photos</span>
            </button>
          </div>

        </div>

      </div>

      {/* FULLSCREEN PHOTO LIGHTBOX */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-between p-4 sm:p-8"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Top Bar */}
            <div
              className="w-full max-w-5xl flex items-center justify-between z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white/10 text-white text-xs font-bold px-3.5 py-1.5 rounded-full backdrop-blur-md border border-white/10 flex items-center gap-2">
                <Camera size={14} className="text-[#00b4d8]" />
                <span>{lightboxIndex + 1} / {totalPhotos}</span>
              </div>
              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/10"
                aria-label="Close lightbox"
              >
                <X size={20} />
              </button>
            </div>

            {/* Stage */}
            <div
              className="relative w-full max-w-5xl flex-1 flex items-center justify-center my-4"
              onClick={(e) => e.stopPropagation()}
            >
              {totalPhotos > 1 && (
                <button
                  type="button"
                  onClick={() =>
                    setLightboxIndex((lightboxIndex - 1 + totalPhotos) % totalPhotos)
                  }
                  className="absolute left-1 sm:left-4 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-[#00b4d8] text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer backdrop-blur-sm shadow-xl"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={24} />
                </button>
              )}

              <div className="relative w-full h-[68vh] sm:h-[80vh] max-w-4xl">
                <Image
                  src={photos[lightboxIndex].image}
                  alt={photos[lightboxIndex].alt || 'Trip photo'}
                  fill
                  priority
                  className="object-contain"
                />
              </div>

              {totalPhotos > 1 && (
                <button
                  type="button"
                  onClick={() => setLightboxIndex((lightboxIndex + 1) % totalPhotos)}
                  className="absolute right-1 sm:right-4 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-[#00b4d8] text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer backdrop-blur-sm shadow-xl"
                  aria-label="Next image"
                >
                  <ChevronRight size={24} />
                </button>
              )}
            </div>

            {/* Bottom Caption */}
            <div
              className="w-full max-w-xl text-center z-10 pb-2 space-y-1"
              onClick={(e) => e.stopPropagation()}
            >
              {photos[lightboxIndex].alt && (
                <p className="text-white text-sm font-semibold">
                  {photos[lightboxIndex].alt}
                </p>
              )}
              <span className="text-white/40 text-xs block">
                Click anywhere outside or press Esc to close • Use arrow keys to navigate
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
