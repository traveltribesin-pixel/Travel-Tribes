'use client'

import Image from 'next/image'
import { HorizontalRail, SectionHeading } from '@/components/trip-components'
import { gallery } from '@/lib/travel-data'

export function GallerySection() {
  return (
    <section className="w-full max-w-[1280px] py-[110px] max-[850px]:py-[75px] px-[5vw] mx-auto gallery-section">
      <SectionHeading eyebrow="A glimpse of the good life" title="Postcards from the tribe." />
      <HorizontalRail label="Travel gallery">
        {gallery.map((item, i) => (
          <div className={`gallery-card gallery-${i} group relative overflow-hidden rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(11,41,64,0.05)] border border-slate-100`} key={item.image}>
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
