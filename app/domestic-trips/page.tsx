import { TripsPage } from '@/app/trips-page'
import { trips } from '@/lib/travel-data'
export default function Page() { return <TripsPage eyebrow="Closer than you think" title="Domestic trips." intro="From mountain mornings to coastlines that keep going. See the country slowly, thoughtfully and with good company." image="https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=2200&q=88" trips={trips.filter(t => t.region === 'Domestic')} /> }
