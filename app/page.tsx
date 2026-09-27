import { PageFrame } from '@/components/site-shell'
import { Newsletter } from '@/components/trip-components'
import { HeroSection } from '@/components/hero-section'
import { BrandValuesSection } from '@/components/brand-values-section'
import { FeaturedRecognitionSection } from '@/components/featured-recognition-section'
import { UpcomingTripsSection } from '@/components/upcoming-trips-section'
import { DomesticJourneysSection } from '@/components/domestic-journeys-section'
import { CommunityBannerSection } from '@/components/community-banner-section'
import { InternationalTripsSection } from '@/components/international-trips-section'
import { HoneymoonEscapesSection } from '@/components/honeymoon-escapes-section'
import { VideoGallerySection } from '@/components/video-gallery-section'
import { ReviewsSection } from '@/components/reviews-section'
import { CustomTripBuilderSection } from '@/components/custom-trip-builder-section'
import { FaqAccordionSection } from '@/components/faq-accordion-section'
import { GallerySection } from '@/components/gallery-section'
import { BlogSection } from '@/components/blog-section'
import { HomeCtaSection } from '@/components/home-cta-section'

export default function Home() {
  return (
    <PageFrame>
      <main>
        {/* 1. Hero Section */}
        <HeroSection />

        {/* 2. Not Your Usual Travel Company (Brand Values) */}


        {/* 3. Upcoming Trips */}
        <UpcomingTripsSection />
        <BrandValuesSection />

        {/* 3. Domestic Journeys */}
        <DomesticJourneysSection />

        {/* 4. International Trips */}
        <InternationalTripsSection />

        {/* 5. High Impact Community Banner & WhatsApp CTA */}
        <CommunityBannerSection />

        {/* 7. Honeymoon Escapes */}
        {/* <HoneymoonEscapesSection /> */}

        {/* 11. Photo Gallery */}
        <GallerySection />

        {/* 8. Interactive Video Gallery & Tribe Reels */}
        <VideoGallerySection />

        {/* 9. Travellers Reviews */}
        <ReviewsSection />

        {/* 10. Can't find your trip? Make your own (Custom Trip Builder) */}
        <CustomTripBuilderSection />





        {/* 12. Featured & Recognition (Auto-sliding brand logos & media) */}
        <FeaturedRecognitionSection />
        {/* 11. Frequently Asked Questions Accordion Section */}
        <FaqAccordionSection
          title="Frequently Asked Questions"
          eyebrow="GOT QUESTIONS?"
          subtitle="Everything you need to know about our community trips, solo travel safety, on-ground trip captains, and bookings."
          showViewAllButton
        />

        {/* 13. Blog & Travel Guides */}
        <BlogSection />

        {/* 14. Community CTA Section  */}
        {/* <HomeCtaSection /> */}

        {/* 15. Newsletter */}
        <Newsletter />
      </main>
    </PageFrame>
  )
}
