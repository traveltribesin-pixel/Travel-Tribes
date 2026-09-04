'use client'

import Image from 'next/image'
import { HorizontalRail, SectionHeading } from '@/components/trip-components'
import { gallery } from '@/lib/travel-data'

export function GallerySection() {
  return (
    <section className="w-full max-w-[1280px] py-[110px] max-[850px]:py-[40px] px-[5vw] mx-auto gallery-section">
      <SectionHeading 
        eyebrow="A glimpse of the good life" 
        title="Postcards from the tribe." 
        text="Browse through our collection of memories. A visual journey of the beautiful places we've been and the amazing people we've met."
        center
      />
      <HorizontalRail label="Travel gallery">
        {gallery.map((item, i) => (
          <div className={`gallery-card gallery-${i} group relative overflow-hidden rounded-3xl shadow-[0_4px_16px_rgba(67,169,209,0.08)] hover:shadow-[0_14px_30px_rgba(67,169,209,0.18)] transition-all duration-300 hover:-translate-y-1 border border-[var(--sky-pale)] hover:border-[var(--sky)]`} key={item.image}>
            <Image 
              src={item.image} 
              alt={item.alt} 
              fill 
              sizes="(max-width: 700px) 72vw, 24vw" 
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ))}
      </HorizontalRail>
    </section>
  )
}
