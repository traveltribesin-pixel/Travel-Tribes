import { PageFrame } from '@/components/site-shell'
import { TripExplorer } from '@/components/trip-components'
import type { Trip } from '@/lib/travel-data'

export function TripsPage({
  eyebrow,
  title,
  intro,
  trips,
  image,
  categories,
}: {
  eyebrow: string
  title: string
  intro: string
  trips: Trip[]
  image: string
  categories?: { value: string; title: string }[]
}) {
  return (
    <PageFrame>
      <main>
        <section className="page-hero" style={{ backgroundImage: `url(${image})` }}>
          <div>
            <span className="eyebrow light">{eyebrow}</span>
            <h1>{title}</h1>
            <p>{intro}</p>
          </div>
          <div className="page-hero-line" />
        </section>
        <section className="listing-section section-pad">
          <TripExplorer trips={trips} categories={categories} />
        </section>
      </main>
    </PageFrame>
  )
}
