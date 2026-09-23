'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Play, Video, Maximize2 } from 'lucide-react'

export interface VideoReel {
  id: string
  poster: string
  videoUrl: string
}

export const videoReels: VideoReel[] = [
  {
    id: 'spiti-winter',
    poster: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-winter-snow-covered-mountain-peaks-in-the-sun-41133-large.mp4',
  },
  {
    id: 'gokarna-beach',
    poster: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-waves-coming-to-the-beach-5016-large.mp4',
  },
  {
    id: 'udaipur-sunset',
    poster: 'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-near-lake-42514-large.mp4',
  },
  {
    id: 'coorg-mist',
    poster: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-drone-view-of-a-lush-green-forest-and-stream-41221-large.mp4',
  },
  {
    id: 'chandrataal-camp',
    poster: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-starry-night-sky-timelapse-over-a-mountain-41586-large.mp4',
  },
  {
    id: 'honnavar-backwaters',
    poster: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-shot-of-waves-crashing-on-a-tropical-beach-43305-large.mp4',
  },
  {
    id: 'kashmir-forest',
    poster: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-waterfall-in-forest-2213-large.mp4',
  },
  {
    id: 'himalaya-trek',
    poster: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hikers-walking-on-a-trail-in-the-mountains-41243-large.mp4',
  }
]

export function VideoGallerySection() {
  const [selectedVideo, setSelectedVideo] = useState<VideoReel | null>(null)

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedVideo(null)
    }
    if (selectedVideo) {
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedVideo])

  // Duplicated list for seamless infinite looping
  const infiniteVideos = [...videoReels, ...videoReels, ...videoReels]

  return (
    <section className="py-10 sm:py-14 bg-[#f8fafc] relative overflow-hidden select-none">
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
          Unfiltered moments captured by our travellers on the road.
        </p>
      </div>

      {/* CONTINUOUS SMOOTH AUTO-SCROLLING VIDEO TRACK */}
      <div className="relative w-full overflow-hidden py-3">
        
        {/* Left & Right subtle edge fade */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-[#f8fafc] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-[#f8fafc] to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee-left flex items-center gap-4 sm:gap-6 w-max">
          {infiniteVideos.map((reel, index) => (
            <div
              key={`${reel.id}-${index}`}
              onClick={() => setSelectedVideo(reel)}
              className="group relative bg-slate-900 rounded-3xl overflow-hidden shrink-0 w-[190px] sm:w-[230px] md:w-[260px] aspect-[9/15] shadow-[0_10px_30px_rgba(11,41,64,0.12)] cursor-pointer hover:scale-[1.03] transition-all duration-300 border border-slate-200/80 hover:border-[var(--sky)] hover:shadow-[0_16px_40px_rgba(67,169,209,0.25)]"
            >
              {/* Autoplaying muted looping clean video */}
              <video
                src={reel.videoUrl}
                poster={reel.poster}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="w-full h-full object-cover brightness-[0.95] group-hover:brightness-105 transition-all duration-500"
              />

              {/* Minimal Hover Overlay with Expand Icon */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-md border border-white/60 flex items-center justify-center text-white shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                  <Play size={20} className="fill-white translate-x-0.5" />
                </div>
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center">
                  <Maximize2 size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* COMPACT & ELEGANT FULLSCREEN VIDEO MODAL */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-4"
            onClick={() => setSelectedVideo(null)}
          >
            {/* Top Close Bar */}
            <div className="w-full max-w-[320px] sm:max-w-[360px] flex justify-end mb-2.5">
              <button
                onClick={() => setSelectedVideo(null)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white font-bold text-xs backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-lg hover:scale-105"
              >
                <X size={15} />
                <span>Close</span>
              </button>
            </div>

            {/* Video Container constrained to comfortable height */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[320px] sm:max-w-[360px] h-[68vh] max-h-[580px] bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/20"
            >
              {/* Internal Floating Close Button */}
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-3.5 right-3.5 z-30 w-9 h-9 rounded-full bg-black/60 hover:bg-rose-600 text-white flex items-center justify-center transition-all backdrop-blur-md border border-white/30 cursor-pointer shadow-md hover:scale-105"
                aria-label="Close video"
              >
                <X size={18} />
              </button>

              {/* High-res Interactive Player */}
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
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
