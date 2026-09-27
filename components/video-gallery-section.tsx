'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Play, Video, Maximize2, Volume2, ChevronLeft, ChevronRight } from 'lucide-react'

export interface VideoReel {
  id: string
  poster: string
  videoUrl: string
  title?: string
  location?: string
}

export const videoReels: VideoReel[] = [
  {
    id: 'tribe-video-1',
    poster: '/image/Gokarna/1000004087.jpg',
    videoUrl: '/Videos/Video-21105.mp4',
    title: 'Gokarna Sunset Vibe',
    location: 'Gokarna Beach',
  },
  {
    id: 'tribe-video-2',
    poster: '/image/Meghalaya/IMG_0857.JPEG',
    videoUrl: '/Videos/Video-21573.mp4',
    title: 'Meghalaya Waterfalls',
    location: 'Cherrapunjee',
  },
  {
    id: 'tribe-video-3',
    poster: '/image/Hampi/IMG_9698.JPEG',
    videoUrl: '/Videos/Video-27668.mp4',
    title: 'Hampi Boulder Sunset',
    location: 'Sanapur Lake',
  },
  {
    id: 'tribe-video-4',
    poster: '/image/Coorg/IMG_5499.JPEG',
    videoUrl: '/Videos/Video-29416.mp4',
    title: 'Misty Coffee Trails',
    location: 'Coorg',
  },
  {
    id: 'tribe-video-5',
    poster: '/image/Udaipur/IMG_4003.JPG',
    videoUrl: '/Videos/Video-38285.mp4',
    title: 'Lakeside Palace Glow',
    location: 'Udaipur',
  },
  {
    id: 'tribe-video-6',
    poster: '/image/Spiti/IMG_5483.jpg',
    videoUrl: '/Videos/Video-40613.mp4',
    title: 'High Altitude Expeditions',
    location: 'Spiti Valley',
  },
  {
    id: 'tribe-video-7',
    poster: '/image/Gokarna/1000052570.jpg',
    videoUrl: '/Videos/Video-46629.mp4',
    title: 'Paradise Beach Trek',
    location: 'Gokarna',
  },
  {
    id: 'tribe-video-8',
    poster: '/image/Meghalaya/IMG_1370.JPEG',
    videoUrl: '/Videos/Video-48547.mp4',
    title: 'Crystal Clear River Jump',
    location: 'Dawki & Shnongpdeng',
  },
  {
    id: 'tribe-video-9',
    poster: '/image/Hampi/IMG_0438.JPEG',
    videoUrl: '/Videos/Video-55721.mp4',
    title: 'Ancient Stone Chariots',
    location: 'Hampi Ruins',
  },
  {
    id: 'tribe-video-10',
    poster: '/image/Coorg/IMG_7410.JPEG',
    videoUrl: '/Videos/Video-66864.mp4',
    title: 'Mandalpatti 4x4 Jeep Safari',
    location: 'Coorg Hills',
  },
  {
    id: 'tribe-video-11',
    poster: '/image/Udaipur/IMG_1667.JPG',
    videoUrl: '/Videos/Video-70154.mp4',
    title: 'Bahubali Sunrise Hilltop',
    location: 'Udaipur',
  },
  {
    id: 'tribe-video-12',
    poster: '/image/Gokarna/IMG_8908_Original.JPEG',
    videoUrl: '/Videos/Video-71261.mp4',
    title: 'Tribe Vibe & Bonfire Nights',
    location: 'Murdeshwar',
  },
  {
    id: 'tribe-video-13',
    poster: '/image/Hampi/IMG_6658.JPG',
    videoUrl: '/Videos/Video-7164.mp4',
    title: 'Golden Hour Cliff Vibes',
    location: 'Hampi Hippie Island',
  },
  {
    id: 'tribe-video-14',
    poster: '/image/Gokarna/IMG_4170.JPG',
    videoUrl: '/Videos/Video-78991.mp4',
    title: 'Limestone Yana Caves',
    location: 'Karnataka',
  },
  {
    id: 'tribe-video-15',
    poster: '/image/Spiti/20250110_161941_8E27C2.jpeg',
    videoUrl: '/Videos/Video-82115.mp4',
    title: 'Winter Snow Wonderland',
    location: 'Kaza, Spiti',
  },
  {
    id: 'tribe-video-16',
    poster: '/image/Gokarna/20251231_100322_Original.JPEG',
    videoUrl: '/Videos/Video-99158.mp4',
    title: 'New Year Beach Countdown',
    location: 'Kudle Beach',
  },
  {
    id: 'tribe-video-17',
    poster: '/image/Gokarna/1000002342.jpeg',
    videoUrl: '/Videos/copy_BB114A4A-BAC9-424F-A33D-118DA1EE5854.mov',
    title: 'Mangrove Backwater Boat',
    location: 'Honnavar',
  },
  {
    id: 'tribe-video-18',
    poster: '/image/Gokarna/1000003396.jpg',
    videoUrl: '/Videos/IMG_1415.MOV',
    title: 'Tribe Bonding on Road',
    location: 'On the Go',
  },
]

function MarqueeVideoCard({
  reel,
  onSelect,
}: {
  reel: VideoReel
  onSelect: (reel: VideoReel) => void
}) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.muted = true
    video.defaultMuted = true

    const playVideo = () => {
      if (video.paused) {
        video.play().catch(() => {
          video.muted = true
          video.play().catch(() => {})
        })
      }
    }

    if (video.readyState >= 2) {
      playVideo()
    } else {
      video.addEventListener('canplay', playVideo)
      video.addEventListener('loadeddata', playVideo)
    }

    return () => {
      video.removeEventListener('canplay', playVideo)
      video.removeEventListener('loadeddata', playVideo)
    }
  }, [])

  return (
    <div
      onClick={() => onSelect(reel)}
      className="group relative bg-slate-900 rounded-3xl overflow-hidden shrink-0 w-[190px] sm:w-[230px] md:w-[260px] aspect-[9/15] shadow-[0_10px_30px_rgba(11,41,64,0.12)] cursor-pointer hover:scale-[1.03] transition-all duration-300 border border-slate-200/80 hover:border-[var(--sky)] hover:shadow-[0_16px_40px_rgba(67,169,209,0.25)]"
    >
      {/* Autoplaying muted looping clean video */}
      <video
        ref={videoRef}
        src={reel.videoUrl}
        poster={reel.poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="w-full h-full object-cover brightness-[0.95] group-hover:brightness-105 transition-all duration-500"
      />

      {/* Subtle bottom gradient with title if available */}
      <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none">
        {reel.title && (
          <p className="text-white font-bold text-xs line-clamp-1 drop-shadow-sm">
            {reel.title}
          </p>
        )}
        {reel.location && (
          <p className="text-white/80 text-[10px] font-medium drop-shadow-sm">
            {reel.location}
          </p>
        )}
      </div>

      {/* Minimal Hover Overlay with Expand & Sound Icon */}
      <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-md border border-white/60 flex items-center justify-center text-white shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
          <Play size={20} className="fill-white translate-x-0.5" />
        </div>
        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center">
          <Maximize2 size={14} />
        </div>
        <div className="absolute bottom-3 inset-x-3 text-center">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-bold text-white border border-white/20">
            <Volume2 size={12} className="text-[var(--sky)]" />
            Click to Play
          </span>
        </div>
      </div>
    </div>
  )
}

export function VideoGallerySection() {
  const [selectedVideoIndex, setSelectedVideoIndex] = useState<number | null>(null)

  const selectedVideo = selectedVideoIndex !== null ? videoReels[selectedVideoIndex] : null

  const handlePrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation()
    setSelectedVideoIndex((prev) => (prev !== null ? (prev - 1 + videoReels.length) % videoReels.length : 0))
  }, [])

  const handleNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation()
    setSelectedVideoIndex((prev) => (prev !== null ? (prev + 1) % videoReels.length : 0))
  }, [])

  // Close on Escape key & Arrow navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedVideoIndex(null)
      if (e.key === 'ArrowLeft') handlePrev()
      if (e.key === 'ArrowRight') handleNext()
    }
    if (selectedVideoIndex !== null) {
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedVideoIndex, handlePrev, handleNext])

  // Duplicated list for seamless infinite looping marquee
  const infiniteVideos = [...videoReels, ...videoReels]

  return (
    <section className="py-10 sm:py-14 bg-[#f8fafc] relative overflow-hidden select-none">
      {/* Scoped CSS for slow smooth video marquee */}
      <style jsx>{`
        @keyframes videoMarqueeSlow {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        .animate-video-slow {
          display: flex;
          width: max-content;
          animation: videoMarqueeSlow 110s linear infinite;
          will-change: transform;
        }
        @media (hover: hover) {
          .animate-video-slow:hover {
            animation-play-state: paused;
          }
        }
      `}</style>

      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[var(--sky-pale)]/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-6 sm:mb-8 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--sky-pale)] text-[var(--sky)] text-xs font-bold uppercase tracking-wider mb-2">
          <Video size={14} />
          <span>Real Tribe Moments</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--navy)] tracking-tight">
          Watch The Adventures Come Alive
        </h2>
        <p className="text-slate-500 text-xs sm:text-sm max-w-lg mx-auto mt-1.5">
          Unfiltered moments captured by our travellers on the road. Click any reel to watch with sound.
        </p>
      </div>

      {/* CONTINUOUS SMOOTH SLOW AUTO-SCROLLING VIDEO TRACK */}
      <div className="relative w-full overflow-hidden py-3">
        {/* Left & Right subtle edge fade */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-[#f8fafc] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-[#f8fafc] to-transparent z-10 pointer-events-none" />

        <div className="animate-video-slow flex items-center gap-4 sm:gap-6 w-max">
          {infiniteVideos.map((reel, index) => {
            const realIndex = index % videoReels.length
            return (
              <MarqueeVideoCard
                key={`${reel.id}-${index}`}
                reel={reel}
                onSelect={() => setSelectedVideoIndex(realIndex)}
              />
            )
          })}
        </div>
      </div>

      {/* COMPACT & ELEGANT FULLSCREEN VIDEO REEL MODAL (UNMUTED WITH AUDIO) */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center p-4"
            onClick={() => setSelectedVideoIndex(null)}
          >
            {/* Top Bar with title & close button */}
            <div className="w-full max-w-[340px] sm:max-w-[380px] flex items-center justify-between mb-2.5 px-1">
              <div>
                {selectedVideo.title && (
                  <p className="text-white font-bold text-sm leading-tight">
                    {selectedVideo.title}
                  </p>
                )}
                {selectedVideo.location && (
                  <p className="text-white/70 text-xs">
                    {selectedVideo.location}
                  </p>
                )}
              </div>
              <button
                onClick={() => setSelectedVideoIndex(null)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white font-bold text-xs backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-lg hover:scale-105"
              >
                <X size={15} />
                <span>Close</span>
              </button>
            </div>

            {/* Video Container with Left/Right Nav Buttons */}
            <div className="relative flex items-center justify-center">
              {/* Prev Button */}
              <button
                onClick={handlePrev}
                className="hidden sm:flex absolute -left-16 z-30 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white items-center justify-center transition-colors border border-white/20 cursor-pointer shadow-lg hover:scale-105"
                aria-label="Previous reel"
              >
                <ChevronLeft size={22} />
              </button>

              <motion.div
                key={selectedVideo.id}
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.92, opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-[340px] sm:max-w-[380px] h-[68vh] max-h-[580px] bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/20"
              >
                {/* Internal Floating Close Button */}
                <button
                  onClick={() => setSelectedVideoIndex(null)}
                  className="absolute top-3.5 right-3.5 z-30 w-9 h-9 rounded-full bg-black/60 hover:bg-rose-600 text-white flex items-center justify-center transition-all backdrop-blur-md border border-white/30 cursor-pointer shadow-md hover:scale-105"
                  aria-label="Close video"
                >
                  <X size={18} />
                </button>

                {/* High-res Interactive Player with sound unmuted */}
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
                onClick={handleNext}
                className="hidden sm:flex absolute -right-16 z-30 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white items-center justify-center transition-colors border border-white/20 cursor-pointer shadow-lg hover:scale-105"
                aria-label="Next reel"
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

