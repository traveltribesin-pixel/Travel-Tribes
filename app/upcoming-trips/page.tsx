import { TripsPage } from '@/app/trips-page'
import { trips } from '@/lib/travel-data'
export default function Page() { return <TripsPage eyebrow="The calendar" title="Upcoming trips." intro="The next places we are going, and the people you could go with. Pick a date, then let the anticipation begin." image="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2200&q=88" trips={trips} /> }
