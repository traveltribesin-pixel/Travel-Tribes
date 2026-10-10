import type { Metadata } from 'next'
import { ContactContent } from './contact-content'

export const metadata: Metadata = {
  title: 'Contact Travel Tribes | 24/7 Travel Support & Inquiries',
  description: 'Get in touch with Travel Tribes. Call +91 99758 22023 or email hello@traveltribes.in for trip inquiries, batch bookings and custom travel planning.',
  openGraph: {
    title: 'Contact Travel Tribes | 24/7 Travel Support & Inquiries',
    description: 'Get in touch with Travel Tribes. Call +91 99758 22023 or email hello@traveltribes.in for trip inquiries, batch bookings and custom travel planning.',
    images: ['/image/Logowithbg.png']
  }
}

export default function ContactPage() {
  return <ContactContent />
}
