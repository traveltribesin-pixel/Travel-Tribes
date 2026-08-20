import { TripsPage } from '@/app/trips-page'
import { trips } from '@/lib/travel-data'
export default function Page() { return <TripsPage eyebrow="A little time away" title="Weekend getaways." intro="Short on days, never on feeling. These are compact escapes made for a reset, a first trip or a spontaneous yes." trips={trips.filter(t => t.region === 'Weekend')} /> }
