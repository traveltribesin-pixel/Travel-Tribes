'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Play,
  X,
  MapPin,
  Eye,
  Heart,
  ArrowRight,
  ArrowLeft,
  Video,
  Compass
} from 'lucide-react'

export interface VideoReel {
  id: string
  title: string
  location: string
  category: 'Mountains' | 'Coastal' | 'Heritage' | 'Adventure'
  tripSlug: string
  poster: string
  videoUrl?: string
  duration: string
  views: string
  likes: string
  caption: string
}

export const videoReels: VideoReel[] = [
  {
    id: 'spiti-winter',
    title: 'Frozen Wonders of Winter Spiti',
    location: 'Spiti Valley · Kaza · Kalpa',
    category: 'Mountains',
    tripSlug: 'spiti-winter-expedition',
    poster: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-winter-snow-covered-mountain-peaks-in-the-sun-41133-large.mp4',
    duration: '0:48',
    views: '24.8K',
    likes: '2.1K',
    caption: 'Sub-zero temperatures, frozen Spiti river, warm homestay tea and stargazing with 12 amazing strangers!'
  },
  {
    id: 'gokarna-beach',
    title: 'Cliff Hikes & Kudle Beach Sunsets',
    location: 'Gokarna · Honnavar · Murdeshwar',
    category: 'Coastal',
    tripSlug: 'gokarna-backpacking',
    poster: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-waves-coming-to-the-beach-5016-large.mp4',
    duration: '0:35',
    views: '18.4K',
    likes: '1.7K',
    caption: 'Trekking from Belekan to Om Beach with sea breeze in our hair and laughter around the campfire.'
  },
  {
    id: 'udaipur-sunset',
    title: 'Golden Hour at Lake Pichola',
    location: 'Udaipur · Bahubali Hills · Monsoon Palace',
    category: 'Heritage',
    tripSlug: 'udaipur-backpacking',
    poster: 'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-near-lake-42514-large.mp4',
    duration: '0:42',
    views: '15.9K',
    likes: '1.4K',
    caption: 'Palaces floating on water, rooftop folk dances, and sunrise over Badi lake.'
  },
  {
    id: 'coorg-mist',
    title: 'Coffee Plantations & Abbey Waterfalls',
    location: 'Coorg · Mandalpatti · Namdroling',
    category: 'Adventure',
    tripSlug: 'coorg-backpacking',
    poster: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-drone-view-of-a-lush-green-forest-and-stream-41221-large.mp4',
    duration: '0:39',
    views: '21.2K',
    likes: '1.9K',
    caption: 'Misty jeep safari to Mandalpatti peak and peaceful chants at the Golden Temple monastery.'
  },
  {
    id: 'chandrataal-camp',
    title: 'Stargazing at Chandrataal Lake',
    location: 'Spiti Valley · Chandrataal · Manali',
    category: 'Mountains',
    tripSlug: 'spiti-valley-chandrataal',
    poster: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-starry-night-sky-timelapse-over-a-mountain-41586-large.mp4',
    duration: '0:52',
    views: '29.3K',
    likes: '3.4K',
    caption: 'The moon lake at 14,000 feet. Crystal clear blue reflections and endless shooting stars.'
  },
  {
    id: 'honnavar-backwaters',
    title: 'Mangrove Boating in Honnavar',
    location: 'Honnavar · Sharavathi River',
    category: 'Coastal',
    tripSlug: 'gokarna-backpacking',
    poster: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-shot-of-waves-crashing-on-a-tropical-beach-43305-large.mp4',
    duration: '0:31',
    views: '12.5K',
    likes: '980',
    caption: 'Cruising through lush green mangrove tunnels as the sun dips beneath the Arabian sea.'
  }
]

export function VideoGallerySection() {
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const [selectedVideo, setSelectedVideo] = useState<VideoReel | null>(null)
  const [likedVideos, setLikedVideos] = useState<Record<string, boolean>>({})

  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const categories = ['All', 'Mountains', 'Coastal', 'Heritage', 'Adventure']

  const filteredVideos = activeCategory === 'All'
    ? videoReels
    : videoReels.filter(v => v.category === activeCategory)

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 5)
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 5)
    }
  }

  useEffect(() => {
    checkScroll()
    window.addEventListener('resize', checkScroll)
    return () => window.removeEventListener('resize', checkScroll)
  }, [filteredVideos])

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setLikedVideos(prev => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <section className="py-8 sm:py-10 bg-white relative overflow-hidden">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--sky-pale)]/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--sky-pale)] text-[var(--sky)] text-xs font-bold uppercase tracking-wider mb-2.5">
              <Video size={14} />
              <span>Real Tribe Moments</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-[var(--navy)] tracking-tight">
              Watch The Adventures Come Alive
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm max-w-xl mt-1.5">
              Unfiltered, real video reels shot by our trip captains and travellers across expeditions.
            </p>
          </div>

          {/* Category Filter Pills & Navigation Arrows */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                    activeCategory === cat
                      ? 'bg-[var(--sky)] text-white shadow-md shadow-[var(--sky)]/20'
                      : 'bg-slate-100 hover:bg-slate-200/80 text-slate-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Desktop Navigation Arrows */}
            <div className="hidden sm:flex items-center gap-2 shrink-0">
              <button
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-[var(--sky-pale)] hover:text-[var(--sky)] transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
                aria-label="Scroll left"
              >
                <ArrowLeft size={16} />
              </button>
              <button
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-[var(--sky-pale)] hover:text-[var(--sky)] transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
                aria-label="Scroll right"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* SINGLE-LINE HORIZONTAL SCROLLABLE REELS */}
        <div
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="flex items-stretch gap-5 overflow-x-auto pb-6 pt-2 no-scrollbar scroll-smooth"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {filteredVideos.map((reel) => {
            const isLiked = likedVideos[reel.id]
            return (
              <motion.div
                key={reel.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedVideo(reel)}
                className="group relative bg-slate-900 rounded-3xl overflow-hidden shrink-0 w-[82vw] sm:w-[290px] lg:w-[310px] aspect-[9/14] shadow-[0_8px_30px_rgb(0,0,0,0.08)] cursor-pointer hover:-translate-y-1.5 transition-all duration-300 border border-[var(--sky-pale)] hover:border-[var(--sky)]"
                style={{ scrollSnapAlign: 'start' }}
              >
                {/* Poster Image */}
                <Image
                  src={reel.poster}
                  alt={reel.title}
                  fill
                  sizes="(max-width: 640px) 85vw, 320px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.88]"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/30 group-hover:via-black/15 transition-all" />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                  <span className="bg-black/40 backdrop-blur-md text-white text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full border border-white/20 flex items-center gap-1">
                    <MapPin size={11} className="text-[var(--sky)]" />
                    {reel.category}
                  </span>
                  <span className="bg-black/50 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                    {reel.duration}
                  </span>
                </div>

                {/* Center Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/25 backdrop-blur-md border border-white/40 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-[var(--sky)] group-hover:border-[var(--sky)] transition-all duration-300 shadow-xl">
                    <Play size={22} className="fill-white translate-x-0.5" />
                  </div>
                </div>

                {/* Bottom Content & Meta */}
                <div className="absolute bottom-0 left-0 right-0 p-5 z-10 text-white">
                  <div className="text-[11px] font-medium text-slate-300 flex items-center gap-1.5 mb-1.5">
                    <Compass size={12} className="text-[var(--sun)]" />
                    <span>{reel.location}</span>
                  </div>
                  <h3 className="font-extrabold text-lg sm:text-xl text-white leading-snug mb-2 group-hover:text-[var(--sky)] transition-colors">
                    {reel.title}
                  </h3>
                  <p className="text-slate-300 text-xs line-clamp-2 mb-3 font-normal opacity-90 leading-relaxed">
                    {reel.caption}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-white/15 text-xs text-slate-300">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Eye size={13} /> {reel.views}
                      </span>
                      <button
                        onClick={(e) => toggleLike(reel.id, e)}
                        className={`flex items-center gap-1 transition-colors ${
                          isLiked ? 'text-rose-500 font-bold' : 'hover:text-white'
                        }`}
                      >
                        <Heart size={13} className={isLiked ? 'fill-rose-500' : ''} />
                        {reel.likes}
                      </button>
                    </div>
                    <span className="text-[var(--sky)] font-bold text-[11px] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Watch Reel <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

      </div>

      {/* VIDEO PLAYER MODAL */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-white/10"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-colors backdrop-blur-sm border border-white/20"
              >
                <X size={20} />
              </button>

              {/* Video Player */}
              <div className="relative aspect-[9/14] sm:aspect-[9/13] w-full bg-black">
                {selectedVideo.videoUrl ? (
                  <video
                    src={selectedVideo.videoUrl}
                    poster={selectedVideo.poster}
                    autoPlay
                    loop
                    controls
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Image
                    src={selectedVideo.poster}
                    alt={selectedVideo.title}
                    fill
                    className="object-cover"
                  />
                )}
              </div>

              {/* Modal Footer info */}
              <div className="p-5 bg-slate-900 text-white">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div>
                    <span className="text-[10px] font-bold text-[var(--sky)] uppercase tracking-wider block">
                      {selectedVideo.location}
                    </span>
                    <h4 className="font-extrabold text-lg text-white">
                      {selectedVideo.title}
                    </h4>
                  </div>
                  <Link
                    href={`/itinerary/${selectedVideo.tripSlug}`}
                    onClick={() => setSelectedVideo(null)}
                    className="glow-btn text-xs px-4 py-2 rounded-full font-bold shrink-0 flex items-center gap-1.5"
                  >
                    View Trip <ArrowRight size={13} />
                  </Link>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed">
                  {selectedVideo.caption}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
