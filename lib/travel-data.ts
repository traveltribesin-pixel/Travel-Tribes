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
  gallery?: { image: string; alt: string }[]
  highlights?: string[]
  itinerary?: { day: number; title: string; activities: string[] }[]
  inclusions?: string[]
  exclusions?: string[]
  thingsToCarry?: string[]
  policies?: string[]
}

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=88`

const mockItinerary = [
  { day: 1, title: 'Arrival & Welcome', activities: ['Arrive at the destination and transfer to the hotel.', 'Settle into your premium accommodation.', 'Meet the group for a welcome dinner and briefing.'] },
  { day: 2, title: 'Local Exploration', activities: ['Start the day with a guided tour of the local attractions.', 'Visit historical landmarks and vibrant markets.', 'Enjoy a free evening to explore at your own pace.'] },
  { day: 3, title: 'Adventure Day', activities: ['Embark on an exciting outdoor activity early morning.', 'Take in the breathtaking landscapes and scenic viewpoints.', 'Enjoy a curated picnic lunch amidst nature.'] },
  { day: 4, title: 'Cultural Immersion', activities: ['Visit local villages to understand the rich culture.', 'Participate in an optional traditional cooking class.', 'Watch a local cultural performance in the evening.'] },
  { day: 5, title: 'Farewell & Departure', activities: ['Enjoy a final breakfast together with the group.', 'Check out of the hotel and transfer to the airport.', 'Board your flight for the onward journey.'] }
]

const mockHighlights = [
  'Stay in carefully curated boutique properties.',
  'Travel with a small, intimate group of like-minded individuals.',
  'Enjoy a balance of planned activities and unstructured free time.',
  'Savor local, authentic cuisine curated by experts.'
]

const mockInclusions = ['Accommodation in premium properties', 'All mentioned transfers', 'Daily breakfast & select dinners', 'Expert local guides', 'All entry fees & permits']
const mockExclusions = ['Flights to/from destination', 'Personal expenses', 'Travel insurance', 'Meals not specified']
const mockThingsToCarry = ['Valid ID proof / Passport', 'Comfortable walking shoes', 'Sunscreen, sunglasses and hat', 'Personal medications', 'Light jacket or sweater for evenings']
const mockPolicies = ['50% advance payment required for booking confirmation.', 'Free cancellation up to 30 days before departure.', 'No refund for cancellations within 15 days of departure.', 'Itinerary is subject to change based on weather conditions.']

export const trips: Trip[] = [
  { 
    slug: 'coastal-karnataka', title: 'Coastal Karnataka', location: 'Gokarna · Murudeshwar', region: 'Domestic', date: 'Oct 18–22, 2026', duration: '5 days', price: '₹18,900', image: img('photo-1593693397690-362cb9666fc2'), alt: 'Quiet beach with palms in Karnataka', tag: 'Slow travel', description: 'Temple towns, sea-side homestays and sunsets you remember.', spots: '8 spots left',
    gallery: [{image: img('photo-1593693397690-362cb9666fc2'), alt: 'Beach'}, {image: img('photo-1528127269322-539801943592'), alt: 'Palm trees'}, {image: img('photo-1500534623283-312aade485b7'), alt: 'Sunsets'}],
    highlights: mockHighlights, itinerary: mockItinerary, inclusions: mockInclusions, exclusions: mockExclusions, thingsToCarry: mockThingsToCarry, policies: mockPolicies
  },
  { 
    slug: 'meghalaya-clouds', title: 'Meghalaya in the Clouds', location: 'Shillong · Cherrapunji', region: 'Domestic', date: 'Nov 5–10, 2026', duration: '6 days', price: '₹24,500', image: img('photo-1598091383021-15ddea10925d'), alt: 'Green hills and mist in Meghalaya', tag: 'Most loved', description: 'Living root bridges and villages tucked into the clouds.', spots: '5 spots left',
    gallery: [{image: img('photo-1598091383021-15ddea10925d'), alt: 'Hills'}, {image: img('photo-1500530855697-b586d89ba3ee'), alt: 'Valley'}],
    highlights: mockHighlights, itinerary: mockItinerary.concat({day: 6, title: 'Final morning in the clouds', activities: ['Wake up to the mist one last time before departing.']}), inclusions: mockInclusions, exclusions: mockExclusions, thingsToCarry: mockThingsToCarry, policies: mockPolicies
  },
  { 
    slug: 'japan-autumn', title: 'Japan in Autumn', location: 'Tokyo · Kyoto · Osaka', region: 'International', date: 'Nov 12–21, 2026', duration: '10 days', price: '₹1,48,000', image: img('photo-1493976040374-85c8e12f0c0e'), alt: 'Japanese temple surrounded by autumn trees', tag: 'New route', description: 'Maple season, neighbourhood discoveries and beautiful rituals.', spots: '6 spots left',
    gallery: [{image: img('photo-1493976040374-85c8e12f0c0e'), alt: 'Temple'}, {image: img('photo-1464822759023-fed622ff2c3b'), alt: 'Autumn trees'}],
    highlights: mockHighlights, itinerary: Array.from({length: 10}, (_, i) => ({day: i+1, title: `Exploring Japan - Day ${i+1}`, activities: ['Dive deep into the local culture, cuisine, and landscapes.']})), inclusions: mockInclusions, exclusions: mockExclusions, thingsToCarry: mockThingsToCarry, policies: mockPolicies
  },
  { 
    slug: 'bali-beyond', title: 'Bali, Beyond the Beach', location: 'Ubud · Sidemen · Nusa Penida', region: 'International', date: 'Dec 2–8, 2026', duration: '7 days', price: '₹72,000', image: img('photo-1537996194471-e657df975ab4'), alt: 'Balinese temple gate in tropical greenery', tag: 'Easy escape', description: 'Rice terraces, thoughtful stays and the island unhurried.', spots: '11 spots left',
    gallery: [{image: img('photo-1537996194471-e657df975ab4'), alt: 'Temple'}, {image: img('photo-1516483638261-f4dbaf036963'), alt: 'Greenery'}],
    highlights: mockHighlights, itinerary: Array.from({length: 7}, (_, i) => ({day: i+1, title: `Bali magic - Day ${i+1}`, activities: ['Relax and unwind in the beautiful island of Bali.']})), inclusions: mockInclusions, exclusions: mockExclusions, thingsToCarry: mockThingsToCarry, policies: mockPolicies
  },
  { 
    slug: 'pondicherry-weekend', title: 'Pondicherry Long Weekend', location: 'Pondicherry · Auroville', region: 'Weekend', date: 'Sep 12–15, 2026', duration: '4 days', price: '₹12,500', image: img('photo-1582510003544-4d00b7f74220'), alt: 'Colorful street in Pondicherry', tag: 'Long weekend', description: 'French lanes, good coffee and slow mornings by the sea.', spots: '4 spots left',
    gallery: [{image: img('photo-1582510003544-4d00b7f74220'), alt: 'Street'}, {image: img('photo-1476514525535-07fb3b4ae5f1'), alt: 'Sea'}],
    highlights: mockHighlights, itinerary: Array.from({length: 4}, (_, i) => ({day: i+1, title: `Weekend getaway - Day ${i+1}`, activities: ['Enjoy the slow life and French architecture.']})), inclusions: mockInclusions, exclusions: mockExclusions, thingsToCarry: mockThingsToCarry, policies: mockPolicies
  },
  { 
    slug: 'amalfi-honeymoon', title: 'Amalfi, For Two', location: 'Positano · Capri', region: 'Honeymoon', date: 'Apr 3–10, 2027', duration: '8 days', price: '₹1,86,000', image: img('photo-1533105079780-92b9be482077'), alt: 'Amalfi coast village and blue sea', tag: 'For two', description: 'Sea-view stays, long lunches and a little Italian magic.', spots: '4 spots left',
    gallery: [{image: img('photo-1533105079780-92b9be482077'), alt: 'Coast'}, {image: img('photo-1516483638261-f4dbaf036963'), alt: 'Village'}],
    highlights: mockHighlights, itinerary: Array.from({length: 8}, (_, i) => ({day: i+1, title: `Romantic escape - Day ${i+1}`, activities: ['Make memories that last a lifetime on the Amalfi coast.']})), inclusions: mockInclusions, exclusions: mockExclusions, thingsToCarry: mockThingsToCarry, policies: mockPolicies
  },
]
export const navItems = [{ label: 'Upcoming trips', href: '/upcoming-trips' }, { label: 'Domestic', href: '/domestic-trips' }, { label: 'International', href: '/international-trips' }, { label: 'Weekend getaways', href: '/weekend-getaways' }, { label: 'About us', href: '/about' }]
export const testimonials = [{ quote: 'The rare group trip that feels genuinely personal. Every detail was considered.', name: 'Aditi S.', detail: 'Meghalaya, 2025' }, { quote: 'I came for the itinerary and stayed for the people. Travelled solo, came home with a new circle.', name: 'Rohan M.', detail: 'Bali, 2025' }, { quote: 'Beautiful stays and enough unstructured time to actually feel away.', name: 'Nisha K.', detail: 'Coastal Karnataka, 2026' }]
export const gallery = [{ image: img('photo-1476514525535-07fb3b4ae5f1'), alt: 'Kayak on a turquoise lake' }, { image: img('photo-1500534623283-312aade485b7'), alt: 'Mountain landscape at golden hour' }, { image: img('photo-1500530855697-b586d89ba3ee'), alt: 'Traveller walking through a valley' }, { image: img('photo-1528127269322-539801943592'), alt: 'Tropical beach and palm trees' }, { image: img('photo-1516483638261-f4dbaf036963'), alt: 'Colourful European coastal town' }]
export const blogs = [{ title: 'How to choose your first group trip', category: 'Travel notes', image: img('photo-1527631746610-bca00a040d60') }, { title: 'The art of leaving room for wonder', category: 'Journal', image: img('photo-1464822759023-fed622ff2c3b') }, { title: 'A slower way to see the world', category: 'Field guide', image: img('photo-1500534623283-312aade485b7') }]
export const honeymoonTrips = trips.filter(t => t.region === 'Honeymoon')
export const categories = [{ title: 'Domestic', desc: 'Closer than you think.', href: '/domestic-trips', image: img('photo-1506461883276-594a12b11cf3') }, { title: 'International', desc: 'Go further, together.', href: '/international-trips', image: img('photo-1516483638261-f4dbaf036963') }, { title: 'Honeymoons', desc: 'For your next chapter.', href: '/contact', image: img('photo-1533105079780-92b9be482077') }]
