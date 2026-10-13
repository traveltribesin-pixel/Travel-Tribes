'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Play,
  Pause,
  Video,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

export interface VideoReel {
  id: string
  poster: string
  videoUrl: string
}

export const videoReels: VideoReel[] = [
  {
    id: 'tribe-video-1',
    poster: '/image/Gokarna/1000004087.jpg',
    videoUrl: 'https://res.cloudinary.com/sqm7dvic/video/upload/q_auto,f_auto/v1791717726/Video-21105.mp4',
  },
  {
    id: 'tribe-video-2',
    poster: '/image/Meghalaya/IMG_0857.JPEG',
    videoUrl: 'https://res.cloudinary.com/sqm7dvic/video/upload/q_auto,f_auto/v1791717732/Video-21573.mp4',
  },
  {
    id: 'tribe-video-3',
    poster: '/image/Hampi/IMG_9698.JPEG',
    videoUrl: 'https://res.cloudinary.com/sqm7dvic/video/upload/q_auto,f_auto/v1791717736/Video-27668.mp4',
  },
  {
    id: 'tribe-video-4',
    poster: '/image/Coorg/IMG_5499.JPEG',
    videoUrl: 'https://res.cloudinary.com/sqm7dvic/video/upload/q_auto,f_auto/v1791717745/Video-29416.mp4',
  },
  {
    id: 'tribe-video-5',
    poster: '/image/Udaipur/IMG_4003.JPG',
    videoUrl: 'https://res.cloudinary.com/sqm7dvic/video/upload/q_auto,f_auto/v1791717742/Video-38285.mp4',
  },
  {
    id: 'tribe-video-6',
    poster: '/image/Spiti/IMG_5483.jpg',
    videoUrl: 'https://res.cloudinary.com/sqm7dvic/video/upload/q_auto,f_auto/v1791717750/Video-40613.mp4',
  },
  {
    id: 'tribe-video-7',
    poster: '/image/Gokarna/1000052570.jpg',
    videoUrl: 'https://res.cloudinary.com/sqm7dvic/video/upload/q_auto,f_auto/v1791717747/Video-46629.mp4',
  },
  {
    id: 'tribe-video-8',
    poster: '/image/Meghalaya/IMG_1370.JPEG',
    videoUrl: 'https://res.cloudinary.com/sqm7dvic/video/upload/q_auto,f_auto/v1791717754/Video-48547.mp4',
  },
  {
    id: 'tribe-video-9',
    poster: '/image/Hampi/IMG_0438.JPEG',
    videoUrl: 'https://res.cloudinary.com/sqm7dvic/video/upload/q_auto,f_auto/v1791717755/Video-55721.mp4',
  },
  {
    id: 'tribe-video-10',
    poster: '/image/Coorg/IMG_7410.JPEG',
    videoUrl: 'https://res.cloudinary.com/sqm7dvic/video/upload/q_auto,f_auto/v1791717754/Video-66864.mp4',
  },
  {
    id: 'tribe-video-11',
    poster: '/image/Udaipur/IMG_1667.JPG',
    videoUrl: 'https://res.cloudinary.com/sqm7dvic/video/upload/q_auto,f_auto/v1791717735/Video-70154.mp4',
  },
  {
    id: 'tribe-video-12',
    poster: '/image/Gokarna/IMG_8908_Original.JPEG',
    videoUrl: 'https://res.cloudinary.com/sqm7dvic/video/upload/q_auto,f_auto/v1791717752/Video-71261.mp4',
  },
  {
    id: 'tribe-video-13',
    poster: '/image/Hampi/IMG_6658.JPG',
    videoUrl: 'https://res.cloudinary.com/sqm7dvic/video/upload/q_auto,f_auto/v1791717730/Video-7164.mp4',
  },
  {
    id: 'tribe-video-14',
    poster: '/image/Gokarna/IMG_4170.JPG',
    videoUrl: 'https://res.cloudinary.com/sqm7dvic/video/upload/q_auto,f_auto/v1791717726/Video-78991.mp4',
  },
  {
    id: 'tribe-video-15',
    poster: '/image/Spiti/20250110_161941_8E27C2.jpeg',
    videoUrl: 'https://res.cloudinary.com/sqm7dvic/video/upload/q_auto,f_auto/v1791717751/Video-82115.mp4',
  },
  {
    id: 'tribe-video-16',
    poster: '/image/Gokarna/20251231_100322_Original.JPEG',
    videoUrl: 'https://res.cloudinary.com/sqm7dvic/video/upload/q_auto,f_auto/v1791717762/Video-99158.mp4',
  },
  {
    id: 'tribe-video-17',
    poster: 'https://res.cloudinary.com/sqm7dvic/video/upload/so_0,q_auto,f_auto/v1791717767/IMG_1415.jpg',
    videoUrl: 'https://res.cloudinary.com/sqm7dvic/video/upload/q_auto,f_auto/v1791717767/IMG_1415.mp4',
  },
  {
    id: 'tribe-video-18',
    poster: 'https://res.cloudinary.com/sqm7dvic/video/upload/so_0,q_auto,f_auto/v1791717758/copy_BB114A4A-BAC9-424F-A33D-118DA1EE5854.jpg',
    videoUrl: 'https://res.cloudinary.com/sqm7dvic/video/upload/q_auto,f_auto/v1791717758/copy_BB114A4A-BAC9-424F-A33D-118DA1EE5854.mp4',
  },
]

/**
 * Smart Autoplay Reel Card:
 * Lazy loads video only when the user scrolls near the card and autoplays smoothly.
 */
function AutoplayReelCard({
  reel,
  onSelect,
}: {
  reel: VideoReel
  onSelect: () => void
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isInView, setIsInView] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  // Observe when card enters the viewport before loading/playing video
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            if (videoRef.current) {
              videoRef.current.play().catch(() => {})
            }
          } else {
            if (videoRef.current) {
              videoRef.current.pause()
            }
          }
        })
      },
      { rootMargin: '200px 0px 200px 0px', threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !isInView) return

    video.muted = true
    video.defaultMuted = true

    const tryPlay = () => {
      video.play().catch(() => {})
    }

    tryPlay()
    video.addEventListener('loadeddata', tryPlay)
    video.addEventListener('canplay', tryPlay)

    return () => {
      video.removeEventListener('loadeddata', tryPlay)
      video.removeEventListener('canplay', tryPlay)
    }
  }, [isInView])

  return (
    <div
      ref={containerRef}
      onClick={onSelect}
      className="group relative bg-slate-900 rounded-3xl overflow-hidden shrink-0 w-[205px] sm:w-[240px] md:w-[265px] aspect-[9/15.5] shadow-[0_10px_30px_rgba(11,41,64,0.12)] cursor-pointer hover:scale-[1.03] transition-all duration-300 border border-slate-200/90 hover:border-[var(--sky)] hover:shadow-[0_16px_40px_rgba(67,169,209,0.28)] select-none"
    >
      {/* Fallback Poster Image */}
      <Image
        src={reel.poster}
        alt="Travel Tribes Reel"
        fill
        sizes="(max-width: 768px) 210px, 275px"
        quality={75}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          isLoaded ? 'opacity-0' : 'opacity-100 brightness-[0.96]'
        }`}
      />

      {/* Autoplaying HTML5 Video with smart lazy load */}
      {isInView && (
        <video
          ref={videoRef}
          src={reel.videoUrl}
          poster={reel.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onLoadedData={() => setIsLoaded(true)}
          className="absolute inset-0 w-full h-full object-cover brightness-[0.98] group-hover:brightness-105 transition-all duration-300"
        />
      )}

      {/* Subtle bottom gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10 pointer-events-none" />

      {/* Subtle hover play indicator */}
      <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20 pointer-events-none">
        <div className="w-13 h-13 rounded-full bg-white/30 backdrop-blur-md border border-white/60 flex items-center justify-center text-white shadow-xl transform scale-75 group-hover:scale-100 transition-transform duration-300">
          <Play size={22} className="fill-white translate-x-0.5" />
        </div>
      </div>
    </div>
  )
}

export function VideoGallerySection() {
  const [selectedVideoIndex, setSelectedVideoIndex] = useState<number | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const isInteractingRef = useRef(false)
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null)
  const dragStartRef = useRef<{ x: number; scrollLeft: number } | null>(null)
  const hasDraggedRef = useRef(false)

  // 2 repeating sets of video reels for continuous infinite seamless slide
  const infiniteReels = [...videoReels, ...videoReels]

  // Modal navigation
  const selectedVideo = selectedVideoIndex !== null ? videoReels[selectedVideoIndex] : null

  const handlePrevReel = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation()
    setSelectedVideoIndex((prev) =>
      prev !== null ? (prev - 1 + videoReels.length) % videoReels.length : 0
    )
  }, [])

  const handleNextReel = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation()
    setSelectedVideoIndex((prev) =>
      prev !== null ? (prev + 1) % videoReels.length : 0
    )
  }, [])

  // Smooth linear auto-scroll loop with pause-on-interaction & auto-resume
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    let animationFrameId: number
    let lastTime = performance.now()
    const baseSpeed = 0.8 // Smooth, comfortable speed (~50px/sec)

    const loop = (currentTime: number) => {
      const delta = currentTime - lastTime
      lastTime = currentTime

      if (!isInteractingRef.current && container) {
        const halfWidth = container.scrollWidth / 2
        const step = baseSpeed * (delta / 16.67)
        container.scrollLeft += step

        // Infinite wrap-around
        if (container.scrollLeft >= halfWidth) {
          container.scrollLeft -= halfWidth
        } else if (container.scrollLeft <= 0) {
          container.scrollLeft += halfWidth
        }
      }

      animationFrameId = requestAnimationFrame(loop)
    }

    animationFrameId = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(animationFrameId)
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
    }
  }, [])

  // Seamless boundary wrap when user scrolls/swipes manually
  const handleScroll = () => {
    const container = scrollContainerRef.current
    if (!container) return
    const halfWidth = container.scrollWidth / 2
    if (container.scrollLeft >= halfWidth * 1.8) {
      container.scrollLeft -= halfWidth
    } else if (container.scrollLeft <= 5) {
      container.scrollLeft += halfWidth
    }
  }

  // Touch Swipe Handlers for mobile fingers
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

  // Mouse Drag Handlers for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    isInteractingRef.current = true
    hasDraggedRef.current = false
    setIsDragging(true)
    dragStartRef.current = {
      x: e.pageX,
      scrollLeft: scrollContainerRef.current?.scrollLeft || 0,
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragStartRef.current || !scrollContainerRef.current) return
    const dx = e.pageX - dragStartRef.current.x
    if (Math.abs(dx) > 6) {
      hasDraggedRef.current = true
    }
    scrollContainerRef.current.scrollLeft = dragStartRef.current.scrollLeft - dx
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

  const scrollByAmount = (amount: number) => {
    isInteractingRef.current = true
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: amount, behavior: 'smooth' })
    }
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
    resumeTimerRef.current = setTimeout(() => {
      isInteractingRef.current = false
    }, 2500)
  }

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedVideoIndex === null) return
      if (e.key === 'Escape') setSelectedVideoIndex(null)
      if (e.key === 'ArrowLeft') handlePrevReel()
      if (e.key === 'ArrowRight') handleNextReel()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedVideoIndex, handlePrevReel, handleNextReel])

  return (
    <section className="py-12 sm:py-16 bg-[#f8fafc] relative overflow-hidden select-none">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[var(--sky-pale)]/50 rounded-full blur-3xl pointer-events-none" />

      {/* Section Header */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-6 sm:mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--sky-pale)] text-[var(--sky)] text-xs font-extrabold uppercase tracking-wider mb-2.5">
            <Video size={14} className="text-[var(--sky)]" />
            <span>Real Tribe Moments</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--navy)] tracking-tight">
            Watch The Adventures Come Alive
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm max-w-xl mt-1.5">
            Unfiltered moments captured by our travellers on the road. Swipe or tap any video to watch in fullscreen with sound.
          </p>
        </div>
      </div>

      {/* CONTINUOUS AUTO-SLIDING + MANUAL SWIPEABLE TRACK */}
      <div className="relative w-full overflow-hidden py-3 group/track">
        {/* Soft edge fade overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-[#f8fafc] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-[#f8fafc] to-transparent z-10 pointer-events-none" />

        {/* Desktop Quick Nav Arrows (Hover Reveal) */}
        <button
          onClick={() => scrollByAmount(-320)}
          aria-label="Previous videos"
          className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/95 hover:bg-white text-slate-700 hover:text-[var(--sky)] shadow-lg items-center justify-center border border-slate-200 transition-all opacity-0 group-hover/track:opacity-100 hover:scale-105 cursor-pointer"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={() => scrollByAmount(320)}
          aria-label="Next videos"
          className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/95 hover:bg-white text-slate-700 hover:text-[var(--sky)] shadow-lg items-center justify-center border border-slate-200 transition-all opacity-0 group-hover/track:opacity-100 hover:scale-105 cursor-pointer"
        >
          <ChevronRight size={20} />
        </button>

        {/* Swipeable & Scrollable Container */}
        <div
          ref={scrollContainerRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onScroll={handleScroll}
          className={`flex items-center gap-4 sm:gap-6 overflow-x-auto px-6 sm:px-12 py-2 select-none ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {infiniteReels.map((reel, index) => {
            const realIndex = index % videoReels.length
            return (
              <AutoplayReelCard
                key={`${reel.id}-set-${index}`}
                reel={reel}
                onSelect={() => {
                  if (hasDraggedRef.current) return
                  setSelectedVideoIndex(realIndex)
                }}
              />
            )
          })}
        </div>
      </div>

      {/* PURE CLEAN FULLSCREEN VIDEO MODAL (WITH SOUND CONTROLS) */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedVideoIndex(null)}
          >
            {/* Minimal Floating Close Button */}
            <button
              onClick={() => setSelectedVideoIndex(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 hover:scale-105 active:scale-95 text-white flex items-center justify-center backdrop-blur-md border border-white/25 transition-all cursor-pointer shadow-xl"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            {/* Video Container with Left/Right Navigation Arrows */}
            <div className="relative flex items-center justify-center max-w-full">
              {/* Prev Button */}
              <button
                onClick={handlePrevReel}
                className="hidden sm:flex absolute -left-16 md:-left-20 z-40 w-12 h-12 rounded-full bg-white/15 hover:bg-white/30 text-white items-center justify-center transition-all border border-white/20 cursor-pointer shadow-xl hover:scale-110 active:scale-95 backdrop-blur-md"
                aria-label="Previous reel"
              >
                <ChevronLeft size={26} />
              </button>

              {/* Pure High-Res Video Player Box */}
              <motion.div
                key={selectedVideo.id}
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.92, opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-[360px] sm:max-w-[420px] h-[72vh] max-h-[640px] bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/20"
              >
                <video
                  src={selectedVideo.videoUrl}
                  poster={selectedVideo.poster}
                  autoPlay
                  loop
                  controls
                  playsInline
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Next Button */}
              <button
                onClick={handleNextReel}
                className="hidden sm:flex absolute -right-16 md:-right-20 z-40 w-12 h-12 rounded-full bg-white/15 hover:bg-white/30 text-white items-center justify-center transition-all border border-white/20 cursor-pointer shadow-xl hover:scale-110 active:scale-95 backdrop-blur-md"
                aria-label="Next reel"
              >
                <ChevronRight size={26} />
              </button>
            </div>

            {/* Mobile bottom prev/next icon controls */}
            <div className="flex sm:hidden items-center justify-between w-full max-w-[360px] absolute bottom-6 px-4 gap-4 z-40 pointer-events-none">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handlePrevReel()
                }}
                className="w-12 h-12 rounded-full bg-white/20 text-white flex items-center justify-center border border-white/25 backdrop-blur-md shadow-lg pointer-events-auto active:scale-95"
                aria-label="Previous"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleNextReel()
                }}
                className="w-12 h-12 rounded-full bg-white/20 text-white flex items-center justify-center border border-white/25 backdrop-blur-md shadow-lg pointer-events-auto active:scale-95"
                aria-label="Next"
              >
                <ChevronRight size={22} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
