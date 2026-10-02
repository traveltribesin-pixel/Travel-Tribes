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
    videoUrl: '/Videos/Video-21105.mp4',
  },
  {
    id: 'tribe-video-2',
    poster: '/image/Meghalaya/IMG_0857.JPEG',
    videoUrl: '/Videos/Video-21573.mp4',
  },
  {
    id: 'tribe-video-3',
    poster: '/image/Hampi/IMG_9698.JPEG',
    videoUrl: '/Videos/Video-27668.mp4',
  },
  {
    id: 'tribe-video-4',
    poster: '/image/Coorg/IMG_5499.JPEG',
    videoUrl: '/Videos/Video-29416.mp4',
  },
  {
    id: 'tribe-video-5',
    poster: '/image/Udaipur/IMG_4003.JPG',
    videoUrl: '/Videos/Video-38285.mp4',
  },
  {
    id: 'tribe-video-6',
    poster: '/image/Spiti/IMG_5483.jpg',
    videoUrl: '/Videos/Video-40613.mp4',
  },
  {
    id: 'tribe-video-7',
    poster: '/image/Gokarna/1000052570.jpg',
    videoUrl: '/Videos/Video-46629.mp4',
  },
  {
    id: 'tribe-video-8',
    poster: '/image/Meghalaya/IMG_1370.JPEG',
    videoUrl: '/Videos/Video-48547.mp4',
  },
  {
    id: 'tribe-video-9',
    poster: '/image/Hampi/IMG_0438.JPEG',
    videoUrl: '/Videos/Video-55721.mp4',
  },
  {
    id: 'tribe-video-10',
    poster: '/image/Coorg/IMG_7410.JPEG',
    videoUrl: '/Videos/Video-66864.mp4',
  },
  {
    id: 'tribe-video-11',
    poster: '/image/Udaipur/IMG_1667.JPG',
    videoUrl: '/Videos/Video-70154.mp4',
  },
  {
    id: 'tribe-video-12',
    poster: '/image/Gokarna/IMG_8908_Original.JPEG',
    videoUrl: '/Videos/Video-71261.mp4',
  },
  {
    id: 'tribe-video-13',
    poster: '/image/Hampi/IMG_6658.JPG',
    videoUrl: '/Videos/Video-7164.mp4',
  },
  {
    id: 'tribe-video-14',
    poster: '/image/Gokarna/IMG_4170.JPG',
    videoUrl: '/Videos/Video-78991.mp4',
  },
  {
    id: 'tribe-video-15',
    poster: '/image/Spiti/20250110_161941_8E27C2.jpeg',
    videoUrl: '/Videos/Video-82115.mp4',
  },
  {
    id: 'tribe-video-16',
    poster: '/image/Gokarna/20251231_100322_Original.JPEG',
    videoUrl: '/Videos/Video-99158.mp4',
  },
  {
    id: 'tribe-video-17',
    poster: '/image/Gokarna/1000002342.jpeg',
    videoUrl: '/Videos/copy_BB114A4A-BAC9-424F-A33D-118DA1EE5854.mov',
  },
  {
    id: 'tribe-video-18',
    poster: '/image/Gokarna/1000003396.jpg',
    videoUrl: '/Videos/IMG_1415.MOV',
  },
]

function AutoPlayVideoCard({
  reel,
  onSelect,
}: {
  reel: VideoReel
  onSelect: () => void
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)

  // IntersectionObserver to auto-play when visible, pause when off-screen
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.muted = true
            video.play().catch(() => {})
          } else {
            video.pause()
          }
        })
      },
      { threshold: 0.15 }
    )

    observer.observe(video)
    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <div
      onClick={onSelect}
      className="group relative bg-slate-900 rounded-3xl overflow-hidden shrink-0 w-[210px] sm:w-[245px] md:w-[275px] aspect-[9/15.5] shadow-[0_10px_30px_rgba(11,41,64,0.12)] cursor-pointer hover:scale-[1.03] transition-all duration-300 border border-slate-200/90 hover:border-[var(--sky)] hover:shadow-[0_16px_40px_rgba(67,169,209,0.28)] select-none"
    >
      {/* Fallback Poster Image */}
      <Image
        src={reel.poster}
        alt="Travel Tribes Reel"
        fill
        sizes="(max-width: 768px) 210px, 275px"
        quality={75}
        loading="lazy"
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          isVideoLoaded ? 'opacity-0' : 'opacity-100 brightness-[0.95]'
        }`}
      />

      {/* Autoplaying HTML5 Video with Zero Overlay Text */}
      <video
        ref={videoRef}
        src={reel.videoUrl}
        poster={reel.poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        onLoadedData={() => setIsVideoLoaded(true)}
        className="absolute inset-0 w-full h-full object-cover brightness-[0.98] group-hover:brightness-105 transition-all duration-300"
      />

      {/* Subtle hover play indicator */}
      <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
        <div className="w-13 h-13 rounded-full bg-white/30 backdrop-blur-md border border-white/60 flex items-center justify-center text-white shadow-xl transform scale-75 group-hover:scale-100 transition-transform duration-300">
          <Play size={22} className="fill-white translate-x-0.5" />
        </div>
      </div>
    </div>
  )
}

export function VideoGallerySection() {
  const [selectedVideoIndex, setSelectedVideoIndex] = useState<number | null>(null)
  const [isAutoScrolling, setIsAutoScrolling] = useState(true)
  const [isDragging, setIsDragging] = useState(false)

  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const animFrameIdRef = useRef<number | null>(null)
  const isInteractingRef = useRef<boolean>(false)
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Drag state refs to avoid unnecessary re-renders
  const dragStartXRef = useRef<number>(0)
  const dragStartScrollLeftRef = useRef<number>(0)
  const hasMovedSignificantlyRef = useRef<boolean>(false)

  // 3 sets of videos for infinite seamless loop
  const tripleVideos = [...videoReels, ...videoReels, ...videoReels]

  const pauseAutoScrollTemporarily = useCallback((duration = 3000) => {
    isInteractingRef.current = true
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
    resumeTimeoutRef.current = setTimeout(() => {
      isInteractingRef.current = false
    }, duration)
  }, [])

  // Continuous smooth auto-scroll loop with infinite wrap-around
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    // Initialize in the middle set if scroll is at 0
    const initTimer = setTimeout(() => {
      if (container && container.scrollLeft === 0) {
        const singleSetWidth = container.scrollWidth / 3
        if (singleSetWidth > 0) {
          container.scrollLeft = singleSetWidth
        }
      }
    }, 150)

    let lastTime = performance.now()

    const step = (currentTime: number) => {
      const delta = Math.min((currentTime - lastTime) / 1000, 0.05)
      lastTime = currentTime

      if (
        container &&
        isAutoScrolling &&
        !isInteractingRef.current &&
        !isDragging &&
        selectedVideoIndex === null
      ) {
        // ~50px per second for smooth, steady continuous flow
        container.scrollLeft += 52 * delta

        const singleSetWidth = container.scrollWidth / 3
        if (singleSetWidth > 100) {
          if (container.scrollLeft >= singleSetWidth * 2) {
            container.scrollLeft -= singleSetWidth
          } else if (container.scrollLeft <= 10) {
            container.scrollLeft += singleSetWidth
          }
        }
      }
      animFrameIdRef.current = requestAnimationFrame(step)
    }

    animFrameIdRef.current = requestAnimationFrame(step)

    return () => {
      clearTimeout(initTimer)
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current)
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
    }
  }, [isAutoScrolling, isDragging, selectedVideoIndex])

  // Manual slide left / right
  const handleManualSlide = (direction: 'left' | 'right') => {
    pauseAutoScrollTemporarily(5000)
    const container = scrollContainerRef.current
    if (!container) return

    const cardWidth = container.clientWidth > 640 ? 300 : 230
    const scrollOffset = direction === 'left' ? -cardWidth * 1.5 : cardWidth * 1.5

    container.scrollBy({
      left: scrollOffset,
      behavior: 'smooth',
    })
  }

  // Mouse Drag to Slide Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    const container = scrollContainerRef.current
    if (!container) return

    setIsDragging(true)
    isInteractingRef.current = true
    hasMovedSignificantlyRef.current = false
    dragStartXRef.current = e.pageX - container.offsetLeft
    dragStartScrollLeftRef.current = container.scrollLeft
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    const container = scrollContainerRef.current
    if (!container) return

    e.preventDefault()
    const x = e.pageX - container.offsetLeft
    const walk = (x - dragStartXRef.current) * 1.4
    if (Math.abs(walk) > 6) {
      hasMovedSignificantlyRef.current = true
    }
    container.scrollLeft = dragStartScrollLeftRef.current - walk
  }

  const handleMouseUpOrLeave = () => {
    if (isDragging) {
      setIsDragging(false)
      pauseAutoScrollTemporarily(3500)
    }
  }

  // Touch Handlers for mobile
  const handleTouchStart = () => {
    isInteractingRef.current = true
    hasMovedSignificantlyRef.current = false
  }

  const handleTouchEnd = () => {
    pauseAutoScrollTemporarily(3500)
  }

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
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--sky-pale)] text-[var(--sky)] text-xs font-extrabold uppercase tracking-wider mb-2.5">
              <Video size={14} className="text-[var(--sky)]" />
              <span>Real Tribe Moments</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--navy)] tracking-tight">
              Watch The Adventures Come Alive
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm max-w-xl mt-1.5">
              Unfiltered moments captured by our travellers on the road. Drag, slide or click any reel to watch with sound.
            </p>
          </div>

          {/* Navigation Controls: Prev, Next & Auto-scroll Toggle */}
          <div className="flex items-center gap-2.5 self-start md:self-end">
            <button
              onClick={() => setIsAutoScrolling(!isAutoScrolling)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold transition-all border cursor-pointer ${
                isAutoScrolling
                  ? 'bg-white text-[var(--navy)] border-slate-200 shadow-sm hover:border-[var(--sky)]'
                  : 'bg-[var(--sky)] text-white border-[var(--sky)] shadow-md'
              }`}
              title={isAutoScrolling ? 'Pause Auto-scroll' : 'Resume Auto-scroll'}
            >
              {isAutoScrolling ? (
                <>
                  <Pause size={13} className="text-[var(--sky)]" />
                  <span>Auto-scroll ON</span>
                </>
              ) : (
                <>
                  <Play size={13} className="fill-white" />
                  <span>Auto-scroll Paused</span>
                </>
              )}
            </button>

            <div className="flex items-center gap-1.5 bg-white p-1 rounded-full border border-slate-200 shadow-sm">
              <button
                onClick={() => handleManualSlide('left')}
                className="w-9 h-9 rounded-full bg-slate-50 hover:bg-[var(--sky-pale)] hover:text-[var(--sky)] text-[var(--navy)] flex items-center justify-center transition-all cursor-pointer"
                aria-label="Slide left"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => handleManualSlide('right')}
                className="w-9 h-9 rounded-full bg-slate-50 hover:bg-[var(--sky-pale)] hover:text-[var(--sky)] text-[var(--navy)] flex items-center justify-center transition-all cursor-pointer"
                aria-label="Slide right"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CONTINUOUS SMOOTH VIDEO TRACK (SLIDER + AUTOPLAY + DRAG) */}
      <div className="relative w-full overflow-hidden py-3 group/track">
        {/* Left Floating Overlay Navigation Button */}
        <button
          onClick={() => handleManualSlide('left')}
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/90 hover:bg-white text-[var(--navy)] hover:text-[var(--sky)] shadow-[0_8px_25px_rgba(11,41,64,0.18)] border border-slate-200 backdrop-blur-md hidden sm:flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer opacity-80 group-hover/track:opacity-100"
          aria-label="Previous videos"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Right Floating Overlay Navigation Button */}
        <button
          onClick={() => handleManualSlide('right')}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/90 hover:bg-white text-[var(--navy)] hover:text-[var(--sky)] shadow-[0_8px_25px_rgba(11,41,64,0.18)] border border-slate-200 backdrop-blur-md hidden sm:flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer opacity-80 group-hover/track:opacity-100"
          aria-label="Next videos"
        >
          <ChevronRight size={24} />
        </button>

        {/* Soft edge fade overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-20 bg-gradient-to-r from-[#f8fafc] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-20 bg-gradient-to-l from-[#f8fafc] to-transparent z-10 pointer-events-none" />

        {/* Horizontal Scrollable Slider with Zero Text on Cards */}
        <div
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="flex items-center gap-4 sm:gap-6 px-6 sm:px-12 overflow-x-auto no-scrollbar scroll-auto cursor-grab active:cursor-grabbing select-none"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {tripleVideos.map((reel, index) => {
            const realIndex = index % videoReels.length
            return (
              <AutoPlayVideoCard
                key={`${reel.id}-set-${index}`}
                reel={reel}
                onSelect={() => {
                  if (!hasMovedSignificantlyRef.current) {
                    setSelectedVideoIndex(realIndex)
                  }
                }}
              />
            )
          })}
        </div>
      </div>

      {/* PURE CLEAN FULLSCREEN VIDEO MODAL (ZERO TEXT) */}
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
