import { PageFrame } from '@/components/site-shell'
import { Newsletter } from '@/components/trip-components'
import { HeroSection } from '@/components/hero-section'
import { UpcomingTripsSection } from '@/components/upcoming-trips-section'
import { DomesticJourneysSection } from '@/components/domestic-journeys-section'
import { InternationalTripsSection } from '@/components/international-trips-section'
import { HoneymoonEscapesSection } from '@/components/honeymoon-escapes-section'
import { ReviewsSection } from '@/components/reviews-section'
import { GallerySection } from '@/components/gallery-section'
import { BlogSection } from '@/components/blog-section'
import { HomeCtaSection } from '@/components/home-cta-section'

export default function Home() {
  return (
    <PageFrame>
      <main>
        <HeroSection />
        <UpcomingTripsSection />
        <DomesticJourneysSection />
        <InternationalTripsSection />
        <HoneymoonEscapesSection />
        <ReviewsSection />
        <GallerySection />
        <BlogSection />
        <HomeCtaSection />
        <Newsletter />
      </main>
    </PageFrame>
  )
}
