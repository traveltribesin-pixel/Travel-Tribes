import { TripsPage } from '@/app/trips-page'
import { trips } from '@/lib/travel-data'
export default function Page() { return <TripsPage eyebrow="Go further, together" title="International trips." intro="New cultures, familiar laughter and the kind of perspective you only get by stepping outside the everyday." image="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=2200&q=88" trips={trips.filter(t => t.region === 'International')} /> }
