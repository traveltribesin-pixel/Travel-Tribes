import { PageFrame } from '@/components/site-shell'
import { Newsletter } from '@/components/trip-components'
import { HeroSection } from '@/components/hero-section'
import { FeaturedRecognitionSection } from '@/components/featured-recognition-section'
import { UpcomingTripsSection } from '@/components/upcoming-trips-section'
import { DomesticJourneysSection } from '@/components/domestic-journeys-section'
import { CommunityBannerSection } from '@/components/community-banner-section'
import { InternationalTripsSection } from '@/components/international-trips-section'
import { HoneymoonEscapesSection } from '@/components/honeymoon-escapes-section'
import { VideoGallerySection } from '@/components/video-gallery-section'
import { ReviewsSection } from '@/components/reviews-section'
import { GallerySection } from '@/components/gallery-section'
import { BlogSection } from '@/components/blog-section'
import { HomeCtaSection } from '@/components/home-cta-section'

export default function Home() {
  return (
    <PageFrame>
      <main>
        {/* 1. Hero Section */}
        <HeroSection />

        {/* 2. Upcoming Trips */}
        <UpcomingTripsSection />

        {/* 3. Domestic Journeys */}
        <DomesticJourneysSection />

        {/* 4. International Trips */}
        <InternationalTripsSection />

        {/* 5. High Impact Community Banner & WhatsApp CTA */}
        <CommunityBannerSection />

        {/* 7. Honeymoon Escapes */}
        <HoneymoonEscapesSection />

        {/* 8. Interactive Video Gallery & Tribe Reels */}
        <VideoGallerySection />

        {/* 9. Travellers Reviews */}
        <ReviewsSection />

        {/* 10. Photo Gallery */}
        <GallerySection />

        {/* 2. Featured & Recognition (Auto-sliding brand logos & media) */}
        <FeaturedRecognitionSection />

        {/* 11. Blog & Travel Guides */}
        <BlogSection />

        {/* 12. Community CTA Section */}
        <HomeCtaSection />

        {/* 13. Newsletter */}
        <Newsletter />
      </main>
    </PageFrame>
  )
}
