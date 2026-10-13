'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { gallery, galleryRow1, galleryRow2 } from '@/lib/travel-data'
import type { GalleryItem } from '@/lib/travel-data'
import { X, ChevronLeft, ChevronRight, Camera } from 'lucide-react'

function GalleryPhotoCard({
  item,
  index,
  onSelect,
}: {
  item: GalleryItem
  index: number
  onSelect: (index: number) => void
}) {
  return (
    <div
      onClick={() => onSelect(index)}
      className={`group relative overflow-hidden rounded-2xl sm:rounded-3xl cursor-pointer border border-white/80 shadow-[0_4px_16px_rgba(11,41,64,0.06)] hover:shadow-[0_16px_36px_rgba(67,169,209,0.18)] transition-all duration-500 hover:-translate-y-1 bg-slate-100 h-[190px] sm:h-[230px] md:h-[260px] shrink-0 ${item.widthClass || 'w-[300px] sm:w-[380px]'}`}
    >
      <Image
        src={item.image}
        alt={item.alt}
        fill
        sizes="(max-width: 768px) 320px, 480px"
        quality={70}
        loading="lazy"
        className="object-cover object-balanced transition-transform duration-700 ease-out group-hover:scale-105"
      />
    </div>
  )
}

function SwipeableGalleryRow({
  items,
  direction = 'left',
  baseIndex = 0,
  onSelectPhoto,
  speed = 0.65,
}: {
  items: GalleryItem[]
  direction?: 'left' | 'right'
  baseIndex?: number
  onSelectPhoto: (index: number) => void
  speed?: number
}) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const isInteractingRef = useRef(false)
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null)
  const dragStartRef = useRef<{ x: number; scrollLeft: number } | null>(null)
  const hasDraggedRef = useRef(false)
  const [isDragging, setIsDragging] = useState(false)

  const duplicatedItems = [...items, ...items]

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    // Initial position setup for smooth start
    const halfWidth = container.scrollWidth / 2
    if (direction === 'right') {
      container.scrollLeft = halfWidth
    } else {
      container.scrollLeft = 10
    }

    let animationFrameId: number
    let lastTime = performance.now()

    const loop = (currentTime: number) => {
      const delta = currentTime - lastTime
      lastTime = currentTime

      if (!isInteractingRef.current && container) {
        const currentHalfWidth = container.scrollWidth / 2
        const step = speed * (delta / 16.67)

        if (direction === 'left') {
          container.scrollLeft += step
          if (container.scrollLeft >= currentHalfWidth) {
            container.scrollLeft -= currentHalfWidth
          } else if (container.scrollLeft <= 0) {
            container.scrollLeft += currentHalfWidth
          }
        } else {
          container.scrollLeft -= step
          if (container.scrollLeft <= 5) {
            container.scrollLeft += currentHalfWidth
          } else if (container.scrollLeft >= currentHalfWidth * 1.95) {
            container.scrollLeft -= currentHalfWidth
          }
        }
      }

      animationFrameId = requestAnimationFrame(loop)
    }

    animationFrameId = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(animationFrameId)
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
    }
  }, [direction, speed])

  const handleScroll = () => {
    const container = scrollRef.current
    if (!container) return
    const halfWidth = container.scrollWidth / 2
    if (container.scrollLeft >= halfWidth * 1.85) {
      container.scrollLeft -= halfWidth
    } else if (container.scrollLeft <= 5) {
      container.scrollLeft += halfWidth
    }
  }

  // Touch handlers for mobile
  const handleTouchStart = () => {
    isInteractingRef.current = true
    hasDraggedRef.current = false
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
  }

  const handleTouchMove = () => {
    hasDraggedRef.current = true
  }

  const handleTouchEnd = () => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
    resumeTimerRef.current = setTimeout(() => {
      isInteractingRef.current = false
      hasDraggedRef.current = false
    }, 2200)
  }

  // Mouse drag handlers for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    isInteractingRef.current = true
    hasDraggedRef.current = false
    setIsDragging(true)
    dragStartRef.current = {
      x: e.pageX,
      scrollLeft: scrollRef.current?.scrollLeft || 0,
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragStartRef.current || !scrollRef.current) return
    const dx = e.pageX - dragStartRef.current.x
    if (Math.abs(dx) > 6) {
      hasDraggedRef.current = true
    }
    scrollRef.current.scrollLeft = dragStartRef.current.scrollLeft - dx
  }

  const handleMouseUp = () => {
    dragStartRef.current = null
    setIsDragging(false)
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
    resumeTimerRef.current = setTimeout(() => {
      isInteractingRef.current = false
      hasDraggedRef.current = false
    }, 2200)
  }

  const handleMouseEnter = () => {
    if (typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches) {
      isInteractingRef.current = true
    }
  }

  const handleMouseLeave = () => {
    if (dragStartRef.current) {
      handleMouseUp()
    } else {
      isInteractingRef.current = false
    }
  }

  return (
    <div className="relative w-full overflow-hidden">
      <div
        ref={scrollRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onScroll={handleScroll}
        className={`flex gap-4 sm:gap-6 overflow-x-auto select-none py-1.5 ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {duplicatedItems.map((item, idx) => {
          const realIndex = baseIndex + (idx % items.length)
          return (
            <GalleryPhotoCard
              key={`${direction}-item-${idx}`}
              item={item}
              index={realIndex}
              onSelect={() => {
                if (hasDraggedRef.current) return
                onSelectPhoto(realIndex)
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

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
    <section className="w-full py-8 sm:py-10 relative overflow-hidden bg-[var(--background)]">
      {/* Header Container */}
      <div className="w-full max-w-[1280px] px-[5vw] mx-auto mb-6 sm:mb-8">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-widest text-[var(--sky)] mb-2">
            <Camera size={14} />
            <span>A glimpse of the good life</span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-[var(--navy)] leading-tight">
            Postcards from the Tribe.
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-1.5 max-w-xl leading-relaxed">
            Unfiltered memories, epic summit views, campfire jams, and genuine friendships. Swipe or tap any photo to explore.
          </p>
        </div>
      </div>

      {/* Dual Infinite Horizontal Marquee Container */}
      <div className="relative w-full overflow-hidden flex flex-col gap-4 sm:gap-6 group/gallery">
        {/* Left & Right Soft Edge Fade Overlays */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-28 md:w-40 bg-gradient-to-r from-[var(--background)] to-transparent z-20" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-28 md:w-40 bg-gradient-to-l from-[var(--background)] to-transparent z-20" />

        {/* Row 1 (Top Row): Sliding to the Right + Manual Swipe */}
        <SwipeableGalleryRow
          items={galleryRow1}
          direction="right"
          baseIndex={0}
          onSelectPhoto={setSelectedPhotoIndex}
          speed={0.65}
        />

        {/* Row 2 (Bottom Row): Sliding to the Left + Manual Swipe */}
        <SwipeableGalleryRow
          items={galleryRow2}
          direction="left"
          baseIndex={galleryRow1.length}
          onSelectPhoto={setSelectedPhotoIndex}
          speed={0.65}
        />
      </div>

      {/* Clean Lightbox Modal */}
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
              className="absolute top-6 right-6 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors border border-white/20 cursor-pointer"
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
              className="absolute left-4 sm:left-8 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors border border-white/20 cursor-pointer"
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
              className="absolute right-4 sm:right-8 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors border border-white/20 cursor-pointer"
              aria-label="Next photo"
            >
              <ChevronRight size={24} />
            </button>

            {/* Main Lightbox Content without text */}
            <motion.div
              key={selectedPhotoIndex}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-5xl w-full max-h-[88vh] rounded-3xl overflow-hidden bg-black/95 border border-white/10 shadow-2xl flex flex-col items-center justify-center p-2"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-[65vh] sm:h-[78vh]">
                <Image
                  src={gallery[selectedPhotoIndex].image}
                  alt={gallery[selectedPhotoIndex].alt}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
