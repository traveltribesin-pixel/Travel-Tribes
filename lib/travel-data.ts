export type Trip = {
  slug: string
  title: string
  location: string
  region: 'Domestic' | 'International' | 'Weekend' | 'Honeymoon'
  date: string
  duration: string
  price: string
  image: string
  alt: string
  tag: string
  description: string
  spots: string
}

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=88`

export const trips: Trip[] = [
  { slug: 'coastal-karnataka', title: 'Coastal Karnataka', location: 'Gokarna · Murudeshwar', region: 'Domestic', date: 'Oct 18–22, 2026', duration: '5 days', price: '₹18,900', image: img('photo-1593693397690-362cb9666fc2'), alt: 'Quiet beach with palms in Karnataka', tag: 'Slow travel', description: 'Temple towns, sea-side homestays and sunsets you remember.', spots: '8 spots left' },
  { slug: 'meghalaya-clouds', title: 'Meghalaya in the Clouds', location: 'Shillong · Cherrapunji', region: 'Domestic', date: 'Nov 5–10, 2026', duration: '6 days', price: '₹24,500', image: img('photo-1598091383021-15ddea10925d'), alt: 'Green hills and mist in Meghalaya', tag: 'Most loved', description: 'Living root bridges and villages tucked into the clouds.', spots: '5 spots left' },
  { slug: 'japan-autumn', title: 'Japan in Autumn', location: 'Tokyo · Kyoto · Osaka', region: 'International', date: 'Nov 12–21, 2026', duration: '10 days', price: '₹1,48,000', image: img('photo-1493976040374-85c8e12f0c0e'), alt: 'Japanese temple surrounded by autumn trees', tag: 'New route', description: 'Maple season, neighbourhood discoveries and beautiful rituals.', spots: '6 spots left' },
  { slug: 'bali-beyond', title: 'Bali, Beyond the Beach', location: 'Ubud · Sidemen · Nusa Penida', region: 'International', date: 'Dec 2–8, 2026', duration: '7 days', price: '₹72,000', image: img('photo-1537996194471-e657df975ab4'), alt: 'Balinese temple gate in tropical greenery', tag: 'Easy escape', description: 'Rice terraces, thoughtful stays and the island unhurried.', spots: '11 spots left' },
  { slug: 'pondicherry-weekend', title: 'Pondicherry Long Weekend', location: 'Pondicherry · Auroville', region: 'Weekend', date: 'Sep 12–15, 2026', duration: '4 days', price: '₹12,500', image: img('photo-1582510003544-4d00b7f74220'), alt: 'Colorful street in Pondicherry', tag: 'Long weekend', description: 'French lanes, good coffee and slow mornings by the sea.', spots: '4 spots left' },
  { slug: 'amalfi-honeymoon', title: 'Amalfi, For Two', location: 'Positano · Capri', region: 'Honeymoon', date: 'Apr 3–10, 2027', duration: '8 days', price: '₹1,86,000', image: img('photo-1533105079780-92b9be482077'), alt: 'Amalfi coast village and blue sea', tag: 'For two', description: 'Sea-view stays, long lunches and a little Italian magic.', spots: '4 spots left' },
]
export const navItems = [{ label: 'Upcoming trips', href: '/upcoming-trips' }, { label: 'Domestic', href: '/domestic-trips' }, { label: 'International', href: '/international-trips' }, { label: 'Weekend getaways', href: '/weekend-getaways' }, { label: 'About us', href: '/about' }]
export const testimonials = [{ quote: 'The rare group trip that feels genuinely personal. Every detail was considered.', name: 'Aditi S.', detail: 'Meghalaya, 2025' }, { quote: 'I came for the itinerary and stayed for the people. Travelled solo, came home with a new circle.', name: 'Rohan M.', detail: 'Bali, 2025' }, { quote: 'Beautiful stays and enough unstructured time to actually feel away.', name: 'Nisha K.', detail: 'Coastal Karnataka, 2026' }]
export const gallery = [{ image: img('photo-1476514525535-07fb3b4ae5f1'), alt: 'Kayak on a turquoise lake' }, { image: img('photo-1500534623283-312aade485b7'), alt: 'Mountain landscape at golden hour' }, { image: img('photo-1500530855697-b586d89ba3ee'), alt: 'Traveller walking through a valley' }, { image: img('photo-1528127269322-539801943592'), alt: 'Tropical beach and palm trees' }, { image: img('photo-1516483638261-f4dbaf036963'), alt: 'Colourful European coastal town' }]
export const blogs = [{ title: 'How to choose your first group trip', category: 'Travel notes', image: img('photo-1527631746610-bca00a040d60') }, { title: 'The art of leaving room for wonder', category: 'Journal', image: img('photo-1464822759023-fed622ff2c3b') }, { title: 'A slower way to see the world', category: 'Field guide', image: img('photo-1500534623283-312aade485b7') }]
export const honeymoonTrips = trips.filter(t => t.region === 'Honeymoon')
export const categories = [{ title: 'Domestic', desc: 'Closer than you think.', href: '/domestic-trips', image: img('photo-1506461883276-594a12b11cf3') }, { title: 'International', desc: 'Go further, together.', href: '/international-trips', image: img('photo-1516483638261-f4dbaf036963') }, { title: 'Honeymoons', desc: 'For your next chapter.', href: '/contact', image: img('photo-1533105079780-92b9be482077') }]
