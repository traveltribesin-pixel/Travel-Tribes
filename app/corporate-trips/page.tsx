import type { Metadata } from 'next'
import { CorporateContent } from './corporate-content'

export const metadata: Metadata = {
  title: 'Corporate Offsites, Team Retreats & Group Trips | Travel Tribes',
  description: 'Custom corporate offsites, team retreats and workations designed by Travel Tribes. Boost team bonding with adventure, stays, activities and seamless coordination.',
  openGraph: {
    title: 'Corporate Offsites, Team Retreats & Group Trips | Travel Tribes',
    description: 'Custom corporate offsites, team retreats and workations designed by Travel Tribes. Boost team bonding with adventure, stays, activities and seamless coordination.',
    images: ['/image/Logowithbg.png']
  }
}

export default function CorporatePage() {
  return <CorporateContent />
}
