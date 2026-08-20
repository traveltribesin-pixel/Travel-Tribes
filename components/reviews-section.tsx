'use client'

import { HorizontalRail, ReviewCard, SectionHeading } from '@/components/trip-components'
import { testimonials } from '@/lib/travel-data'

export function ReviewsSection() {
  return (
    <section 
      className="py-[110px] max-[850px]:py-[40px] bg-[var(--sky-pale)]"
      style={{
        paddingLeft: 'max(5vw, calc((100% - 1160px) / 2))',
        paddingRight: 'max(5vw, calc((100% - 1160px) / 2))',
      }}
    >
      <SectionHeading 
        eyebrow="Kind words from the road" 
        title="Loved by curious people." 
        text="Read the stories and experiences shared by our wonderful travellers. We pour our hearts into every journey, and it shows."
        center
      />
      <HorizontalRail label="Traveller reviews">
        {testimonials.map(t => (
          <ReviewCard key={t.name} {...t} />
        ))}
      </HorizontalRail>
    </section>
  )
}
