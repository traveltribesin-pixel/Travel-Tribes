import { filterFestiveDates, filterUpcomingDates } from '@/lib/date-utils'

export type TripReview = {
  name: string
  quote: string
  role?: string
  detail?: string
  reviewCount?: string
  photoCount?: string
  rating?: number
  timeAgo?: string
}

export type TripPricingOption = {
  label: string
  price: string
  note?: string
}

export type Trip = {
  slug: string
  title: string
  location: string
  region: 'Domestic' | 'International' | 'Weekend' | 'Honeymoon' | 'Xmas & New Year'
  date: string
  dates?: string[]
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
  pricingOptions?: TripPricingOption[]
  bookingAmount?: string
  reviews?: TripReview[]
}

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=88`

export const trips: Trip[] = [
  {
    slug: 'hampi-backpacking',
    title: 'Hampi Backpacking Trip',
    location: 'Hampi · Hospete · Sanapur Lake · Karnataka',
    region: 'Domestic',
    date: 'Oct 01–05, 2026',
    dates: [
      'Aug 20–24, 2026',
      'Aug 27–31, 2026',
      'Sep 03–07, 2026 (Long Weekend)',
      'Sep 10–14, 2026 (Long Weekend)',
      'Sep 17–21, 2026',
      'Sep 24–28, 2026',
      'Oct 01–05, 2026 (Long Weekend)',
      'Oct 08–12, 2026',
      'Oct 15–19, 2026 (Long Weekend)',
      'Oct 22–26, 2026',
      'Oct 29–Nov 02, 2026',
      'Nov 05–09, 2026 (Long Weekend)',
      'Nov 12–16, 2026',
      'Nov 19–23, 2026',
      'Nov 26–30, 2026',
      'Dec 03–07, 2026',
      'Dec 10–14, 2026',
      'Dec 17–21, 2026',
      'Dec 23–27, 2026 (Long Weekend)',
      'Dec 28–Jan 02, 2027 (New Year Special)'
    ],
    duration: '4N/5D',
    price: '₹7,999',
    image: '/image/Hampi/hampi_img.jpeg',
    alt: 'Hampi Backpacking Trip — Vijayanagara Ruins & Boulder Sunsets',
    tag: 'City of Ruins',
    description: 'Step back in time to the majestic 14th-century Vijayanagara Empire with our Hampi Backpacking Trip from Mumbai & Pune. Discover the UNESCO World Heritage ruins, the iconic Vittala Stone Chariot, the living Virupaksha Temple, thrilling cliff jumping and coracle boating at Sanapur Lake, and a mystical sunrise at Lord Hanuman’s birthplace (Anjaneya Hill). Explore boulder-strewn landscapes, vibrant hippie cafés, and create lifelong bonds with fellow travellers. Come solo or with friends — find your tribe in the City of Ruins.',
    spots: '6 spots left',
    gallery: [
      { image: "/image/Hampi/hampi_img.jpeg", alt: "Hampi Heritage & Boulders — Main Highlight & Scenic View" },
      { image: "/image/Hampi/20250317_110606_4F68B9.jpeg", alt: "Hampi Heritage & Boulders Community Trip & Sightseeing" },
      { image: "/image/Hampi/20250317_125503_435353.jpeg", alt: "Hampi Heritage & Boulders Community Trip & Sightseeing" },
      { image: "/image/Hampi/20250317_132240_444826.jpeg", alt: "Hampi Heritage & Boulders Community Trip & Sightseeing" },
      { image: "/image/Hampi/20250317_135444_44942A.jpeg", alt: "Hampi Heritage & Boulders Community Trip & Sightseeing" },
      { image: "/image/Hampi/20250317_135444_4E9EB3.jpeg", alt: "Hampi Heritage & Boulders Community Trip & Sightseeing" },
      { image: "/image/Hampi/20250317_135855_44BD0E.jpeg", alt: "Hampi Heritage & Boulders Community Trip & Sightseeing" },
      { image: "/image/Hampi/20250317_141334_4322B4.jpeg", alt: "Hampi Heritage & Boulders Community Trip & Sightseeing" },
      { image: "/image/Hampi/20250317_141334_4713A3.jpeg", alt: "Hampi Heritage & Boulders Community Trip & Sightseeing" },
      { image: "/image/Hampi/20250317_141334_47F7B1.jpeg", alt: "Hampi Heritage & Boulders Community Trip & Sightseeing" },
      { image: "/image/Hampi/20250317_142804_4F7966.jpeg", alt: "Hampi Heritage & Boulders Community Trip & Sightseeing" },
      { image: "/image/Hampi/20250317_170628_4BBD42.jpeg", alt: "Hampi Heritage & Boulders Community Trip & Sightseeing" },
      { image: "/image/Hampi/20250317_201853_462356.jpeg", alt: "Hampi Heritage & Boulders Community Trip & Sightseeing" },
      { image: "/image/Hampi/20250317_202223_4052BA.jpeg", alt: "Hampi Heritage & Boulders Community Trip & Sightseeing" },
      { image: "/image/Hampi/20250317_202223_4A8B29.jpeg", alt: "Hampi Heritage & Boulders Community Trip & Sightseeing" },
      { image: "/image/Hampi/20250317_202223_4DE3E0.jpeg", alt: "Hampi Heritage & Boulders Community Trip & Sightseeing" },
      { image: "/image/Hampi/20250317_202223_4F80B0.jpeg", alt: "Hampi Heritage & Boulders Community Trip & Sightseeing" },
      { image: "/image/Hampi/20250317_202224_4D9955.jpeg", alt: "Hampi Heritage & Boulders Community Trip & Sightseeing" },
      { image: "/image/Hampi/IMG_0316.JPEG", alt: "Hampi Heritage & Boulders Community Trip & Sightseeing" },
      { image: "/image/Hampi/IMG_0392.JPEG", alt: "Hampi Heritage & Boulders Community Trip & Sightseeing" },
      { image: "/image/Hampi/IMG_0406.JPEG", alt: "Hampi Heritage & Boulders Community Trip & Sightseeing" },
      { image: "/image/Hampi/IMG_0421.JPEG", alt: "Hampi Heritage & Boulders Community Trip & Sightseeing" },
      { image: "/image/Hampi/IMG_0438.JPEG", alt: "Hampi Heritage & Boulders Community Trip & Sightseeing" },
      { image: "/image/Hampi/IMG_0446.JPEG", alt: "Hampi Heritage & Boulders Community Trip & Sightseeing" },
      { image: "/image/Hampi/IMG_0484.JPEG", alt: "Hampi Heritage & Boulders Community Trip & Sightseeing" },
      { image: "/image/Hampi/IMG_0495.JPEG", alt: "Hampi Heritage & Boulders Community Trip & Sightseeing" },
      { image: "/image/Hampi/IMG_0524.JPEG", alt: "Hampi Heritage & Boulders Community Trip & Sightseeing" },
      { image: "/image/Hampi/IMG_0533.JPEG", alt: "Hampi Heritage & Boulders Community Trip & Sightseeing" },
      { image: "/image/Hampi/IMG_0554.JPEG", alt: "Hampi Heritage & Boulders Community Trip & Sightseeing" },
      { image: "/image/Hampi/IMG_0570.JPEG", alt: "Hampi Heritage & Boulders Community Trip & Sightseeing" },
      { image: "/image/Hampi/IMG_0763.JPEG", alt: "Hampi Heritage & Boulders Community Trip & Sightseeing" },
      { image: "/image/Hampi/IMG_6658.JPG", alt: "Hampi Heritage & Boulders Community Trip & Sightseeing" },
      { image: "/image/Hampi/IMG_9632.JPEG", alt: "Hampi Heritage & Boulders Community Trip & Sightseeing" },
      { image: "/image/Hampi/IMG_9636.JPEG", alt: "Hampi Heritage & Boulders Community Trip & Sightseeing" },
      { image: "/image/Hampi/IMG_9650.JPEG", alt: "Hampi Heritage & Boulders Community Trip & Sightseeing" },
      { image: "/image/Hampi/IMG_9652.JPEG", alt: "Hampi Heritage & Boulders Community Trip & Sightseeing" },
      { image: "/image/Hampi/IMG_9654.JPEG", alt: "Hampi Heritage & Boulders Community Trip & Sightseeing" },
      { image: "/image/Hampi/IMG_9657.JPEG", alt: "Hampi Heritage & Boulders Community Trip & Sightseeing" },
      { image: "/image/Hampi/IMG_9680.JPEG", alt: "Hampi Heritage & Boulders Community Trip & Sightseeing" },
      { image: "/image/Hampi/IMG_9682.JPEG", alt: "Hampi Heritage & Boulders Community Trip & Sightseeing" },
      { image: "/image/Hampi/IMG_9684.JPEG", alt: "Hampi Heritage & Boulders Community Trip & Sightseeing" },
      { image: "/image/Hampi/IMG_9685.JPEG", alt: "Hampi Heritage & Boulders Community Trip & Sightseeing" },
      { image: "/image/Hampi/IMG_9698.JPEG", alt: "Hampi Heritage & Boulders Community Trip & Sightseeing" },
      { image: "/image/Hampi/IMG_9705.JPEG", alt: "Hampi Heritage & Boulders Community Trip & Sightseeing" },
      { image: "/image/Hampi/IMG_9708.JPEG", alt: "Hampi Heritage & Boulders Community Trip & Sightseeing" },
      { image: "/image/Hampi/IMG_9711.JPEG", alt: "Hampi Heritage & Boulders Community Trip & Sightseeing" },
      { image: "/image/Hampi/IMG_9718.JPEG", alt: "Hampi Heritage & Boulders Community Trip & Sightseeing" },
      { image: "/image/Hampi/IMG_9720.JPEG", alt: "Hampi Heritage & Boulders Community Trip & Sightseeing" },
      { image: "/image/Hampi/IMG_9730.JPEG", alt: "Hampi Heritage & Boulders Community Trip & Sightseeing" },
      { image: "/image/Hampi/IMG_9741.JPEG", alt: "Hampi Heritage & Boulders Community Trip & Sightseeing" },
      { image: "/image/Hampi/IMG_9756.JPEG", alt: "Hampi Heritage & Boulders Community Trip & Sightseeing" },
      { image: "/image/Hampi/IMG_9760.JPEG", alt: "Hampi Heritage & Boulders Community Trip & Sightseeing" },
      { image: "/image/Hampi/IMG_9770.JPEG", alt: "Hampi Heritage & Boulders Community Trip & Sightseeing" },
      { image: "/image/Hampi/IMG_9772.JPEG", alt: "Hampi Heritage & Boulders Community Trip & Sightseeing" },
      { image: "/image/Hampi/IMG_9773.JPEG", alt: "Hampi Heritage & Boulders Community Trip & Sightseeing" },
      { image: "/image/Hampi/IMG_9779.JPEG", alt: "Hampi Heritage & Boulders Community Trip & Sightseeing" },
      { image: "/image/Hampi/IMG_9787.JPEG", alt: "Hampi Heritage & Boulders Community Trip & Sightseeing" },
      { image: "/image/Hampi/IMG_9800.JPEG", alt: "Hampi Heritage & Boulders Community Trip & Sightseeing" },
      { image: "/image/Hampi/IMG_9804.JPEG", alt: "Hampi Heritage & Boulders Community Trip & Sightseeing" }
    ],
    highlights: [
      "Vijaya Vitthala Temple: Explore the iconic stone chariot and musical pillars in this UNESCO World Heritage Site.",
      "Virupaksha Temple: Visit the ancient 7th-century temple dedicated to Lord Shiva, which is still in active worship.",
      "Matanga Hill: Hike up this hill for a breathtaking 360-degree sunset view across the entire Hampi boulder landscape.",
      "Hemakuta Hill Temples: Explore the cluster of ancient pre-Vijayanagara shrines for panoramic heritage views.",
      "Achyutaraya Temple: Discover the grandeur of this secluded temple complex and its intricate carvings.",
      "Royal Enclosure: Wander through the ruins of this once-majestic capital, including the stepped tank (Pushkarni).",
      "Cliff Jumping: Experience an adrenaline rush by cliff jumping into Sanapur Lake / Tungabhadra waters with safety jackets.",
      "Coracle Ride: Enjoy a traditional round coracle boat ride on the scenic rocky riverbanks.",
      "Birthplace of Lord Hanuman: Hike up Anjaneya (Anjandri) Hill for a magical sunrise and visit the sacred temple atop it.",
      "Hippie Cafe Hopping: Experience Hampi's vibrant chilled café culture, thalis, live music, and bonding sessions."
    ],
    itinerary: [
      {
        day: 1,
        title: 'Mumbai & Pune to Hospete | The Train Journey 🚂',
        activities: [
          "Get ready for an epic adventure as we board train 11139 CSMT Express from Mumbai and Pune!",
          "Boarding stations & timings: CSMT 09:20 PM | Dadar 09:30 PM | Thane 09:50 PM | Kalyan 11:10 PM | Pune 01:05 AM.",
          "Meet your fellow tribe members on the train, kick off with ice-breaking games, travel chats, and lots of fun.",
          "Overnight train journey to Hospete.",
          "Meals: Not Included on the train."
        ]
      },
      {
        day: 2,
        title: 'Bella Hanuman Temple & Chintamani Cave Sunset 🌅',
        activities: [
          "Arrive at Hospete by afternoon and take internal transport to our accommodation in Hampi.",
          "Quick check-in, freshen up, and enjoy an authentic local lunch.",
          "In the evening, head to the mystical Chintamani Cave temples and witness an awe-inspiring sunset from Bella Hanuman Temple.",
          "The stunning hilltop views make for magical golden-hour photos and Insta-worthy moments!",
          "As the sun sets, head out for some chilled café hopping and delicious dinner with the Tribe.",
          "Meals: Lunch Included."
        ]
      },
      {
        day: 3,
        title: 'Virupaksha Temple, Stone Chariot, UNESCO Heritage & Matanga Sunset 🛕',
        activities: [
          "Start the morning with the iconic Virupaksha Temple, admiring its rich history and intricate Dravidian architecture.",
          "Walk to the Monolithic Nandi statue carved out of a single gigantic rock.",
          "Keep your ₹50 note ready to click the classic photo with the world-famous Stone Chariot in the Vittala Temple complex.",
          "Visit the Lakshmi Narasimha Temple and marvel at the sacred stepped tank (Pushkarni).",
          "Relish an authentic South Indian thali lunch.",
          "Climb up Hemakuta Hill for panoramic UNESCO World Heritage vistas.",
          "Ascend Matanga Hill to witness a breathtaking sunset over the endless boulder landscape, followed by dinner at a local café.",
          "Meals: Breakfast & Lunch Included."
        ]
      },
      {
        day: 4,
        title: 'Hanuman Birthplace Sunrise, Coracle Ride & Cliff Jumping 🛶',
        activities: [
          "Rise early for a mystical sunrise hike up Anjaneya (Anjandri) Hill, believed to be the birthplace of Lord Hanuman.",
          "Head to Sanapur Lake for exhilarating cliff jumping and a traditional round coracle boat ride with safety gear.",
          "Explore bohemian cafés on the other side of the river for lunch.",
          "Freshen up, pack your bags, and head to Hospete station.",
          "Board the return train to Pune and Mumbai, carrying unforgettable memories and lifelong friendships.",
          "Meals: Breakfast Included."
        ]
      },
      {
        day: 5,
        title: 'Back to Pune & Mumbai 🏠',
        activities: [
          "Reach Pune by approx 01:00 AM and Mumbai by approx 05:00 AM.",
          "Bid farewell to your newfound tribe members and cherish the memories of the City of Ruins forever!",
          "Until the next adventure — Tribe hai to vibe hai! ✨",
          "Meals: Not Included."
        ]
      }
    ],
    inclusions: [
      "Train Travel from Mumbai / Pune and back in Sleeper Non-AC (3AC upgrade available on extra cost)",
      "2 Nights hotel stay in Hampi on Triple / Quad sharing basis",
      "4 Meals (2 Breakfasts & 2 Lunches)",
      "Traditional Coracle Boating experience",
      "Cliff Jumping at Sanapur Lake with safety assistance",
      "Internal Transport in Hampi with Bike / Auto / Private vehicle",
      "All Monument Entry Fees, UNESCO passes and Parking charges",
      "Experienced Travel Tribes Trip Captain cum friend to assist you with the best service throughout the trip"
    ],
    exclusions: [
      "Any food or beverage not included in the package (dinners, alcoholic drinks, packaged mineral water, meals on highway)",
      "Any extra railway costs and personal train food",
      "Tatkal ticket charges, if applicable",
      "Any personal expenses like tips to driver, entry for personal cameras/video cameras, laundry, etc.",
      "Any cost arising due to natural calamities like landslides, roadblocks, etc. (to be borne directly on the spot)",
      "Anything not mentioned in the inclusions",
      "5% GST"
    ],
    thingsToCarry: [
      "Valid Government Photo ID (Aadhaar / Driving License / Passport) — Mandatory",
      "Comfortable trekking shoes / sneakers with good grip and casual flip-flops",
      "Light and breathable cotton clothes, swimwear / quick-dry towel",
      "Small backpack / daypack (15–20L) for day tours and hikes",
      "Sun protection: Sunscreen (SPF 50+), sunglasses, and wide cap/hat",
      "Personal medications, basic first-aid, ORS / Glucose",
      "Power bank, charging cables, and waterproof phone pouch",
      "Reusable water bottle",
      "A crisp ₹50 currency note for the iconic Stone Chariot photo!"
    ],
    policies: [
      "Book your trip at least 25–30 days prior to departure date to secure confirmed train berths.",
      "Booking Amount: ₹3,000/- advance per person (Non-refundable upon cancellation; transferable to another person or convertible to 3-month Travel Tribes credit).",
      "Pricing: Ex-Hospete ₹7,999 | Ex-Mumbai/Pune Non-AC ₹8,999 | Ex-Mumbai/Pune 3AC ₹10,999 | Double Sharing Add-on ₹1,000.",
      "Long Weekend & Festive Batches: Add-on ₹1,000 applicable on LW and New Year dates.",
      "Room Sharing: Standard package is on Triple/Quad sharing basis. Double sharing available on request.",
      "Trip Authority: The trip leader has all rights to alter/skip sightseeing in case of emergencies, roadblocks or unfavorable weather.",
      "Cancellation 10–30 days prior: 25% deduction on remaining balance.",
      "Cancellation 8–10 days prior: 50% deduction on remaining balance.",
      "Cancellation 6–8 days prior: 70% deduction on remaining balance.",
      "Cancellation 3–6 days prior: 90% deduction on remaining balance.",
      "Cancellation < 2 days / No-Show: 100% deduction (No refund for unused services).",
      "Company Cancellation: 100% full refund within 4–7 business days if the trip is cancelled by the operator."
    ],
    pricingOptions: [
      { label: 'Ex-Hospete (Hospete to Hospete)', price: '₹7,999 / person' },
      { label: 'Ex-Mumbai & Pune (Non-AC Sleeper Train)', price: '₹8,999 / person' },
      { label: 'Ex-Mumbai & Pune (AC 3-Tier Train)', price: '₹10,999 / person' },
      { label: 'Add-On (Double Sharing Room)', price: '+₹1,000 / person' },
      { label: 'Long Weekend / Festive Batch', price: '+₹1,000 / person', note: 'Applicable on LW & NY dates' }
    ],
    bookingAmount: '₹3,000 / person',
    reviews: [
      {
        name: 'Siddharth Joshi',
        role: 'Local Guide',
        reviewCount: '19 reviews',
        photoCount: '42 photos',
        rating: 5,
        quote: 'Hampi with Travel Tribes was magical! The stone chariot, coracle ride, and the cliff jumping at Sanapur lake were unforgettable. Our trip leader managed everything so smoothly. Had the best solo trip experience with an awesome tribe!'
      },
      {
        name: 'Pranali Sawant',
        reviewCount: '8 reviews',
        photoCount: '14 photos',
        rating: 5,
        quote: 'The sunrise at Hanuman hill and sunset from Matanga hill was surreal. Everything from train tickets, stays, food to local transport was well organized. Highly recommended for anyone looking to explore Hampi hassle-free!'
      },
      {
        name: 'Tanmay Kulkarni',
        reviewCount: '11 reviews',
        photoCount: '25 photos',
        timeAgo: 'a year ago',
        rating: 5,
        quote: 'Hampi had been on my bucket list for so long. Joining Travel Tribes was the best decision. The café vibes, the ancient ruins history, and the crazy fun group games made it a 10/10 trip!'
      }
    ]
  },
  {
    slug: 'meghalaya-with-kaziranga',
    title: 'Meghalaya with Kaziranga Expedition',
    location: 'Shillong · Cherrapunji · Dawki · Kaziranga · Guwahati',
    region: 'Domestic',
    date: 'Oct 02–08, 2026',
    dates: [
      'Oct 02–08, 2026',
      'Oct 10–16, 2026',
      'Oct 17–23, 2026',
      'Oct 24–30, 2026',
      'Oct 31–Nov 06, 2026',
      'Nov 07–13, 2026',
      'Nov 14–20, 2026',
      'Nov 21–27, 2026',
      'Nov 28–Dec 04, 2026',
      'Dec 05–11, 2026',
      'Dec 12–18, 2026',
      'Dec 19–25, 2026',
      'Dec 24–31, 2026 (XMAS Special)',
      'Dec 27–Jan 02, 2027 (New Year Special)',
      'Jan 02–08, 2027',
      'Jan 09–15, 2027',
      'Jan 16–22, 2027',
      'Jan 23–29, 2027'
    ],
    duration: '6N/7D',
    price: '₹24,500',
    image: '/image/Meghalaya/meghalaya_img.JPEG',
    alt: 'Nongriat Double Decker Living Root Bridge and lush rainforest of Meghalaya',
    tag: 'Abode of Clouds & Safari',
    description: 'Immerse yourself in the mystical beauty of Northeast India with our 7-day Meghalaya with Kaziranga group adventure starting from Guwahati. Trek through lush rainforests to the world-famous Nongriat Double Decker Living Root Bridge, swim in the surreal crystal waters of Blue Lagoon & Krang Suri, camp by the transparent Umngot River in Dawki/Shnongpdeng, and gaze into the clouds from Laitlum Canyons and Nohkalikai Falls. Crown your adventure with a thrilling wildlife safari in Kaziranga National Park to encounter majestic One-horned Rhinoceroses, tigers, and wild elephants in their natural habitat. Explore Northeast with fellow curious wanderers and find your tribe.',
    spots: '5 spots left',
    gallery: [
      { image: "/image/Meghalaya/meghalaya_img.JPEG", alt: "Meghalaya with Kaziranga — Main Highlight & Scenic View" },
      { image: "/image/Meghalaya/282de9aa-b476-49c7-bab8-e10867877acb.jpg", alt: "Meghalaya with Kaziranga Community Trip & Sightseeing" },
      { image: "/image/Meghalaya/51f20b25-fa3e-423b-a34e-dee77bab399e.jpg", alt: "Meghalaya with Kaziranga Community Trip & Sightseeing" },
      { image: "/image/Meghalaya/685219C4-3541-436C-8431-425413D41143.jpg", alt: "Meghalaya with Kaziranga Community Trip & Sightseeing" },
      { image: "/image/Meghalaya/d1b25528-4a8c-4c0b-9fbc-3a72c76c13a4.jpg", alt: "Meghalaya with Kaziranga Community Trip & Sightseeing" },
      { image: "/image/Meghalaya/IMG_0789.JPEG", alt: "Meghalaya with Kaziranga Community Trip & Sightseeing" },
      { image: "/image/Meghalaya/IMG_0857.JPEG", alt: "Meghalaya with Kaziranga Community Trip & Sightseeing" },
      { image: "/image/Meghalaya/IMG_0865.JPEG", alt: "Meghalaya with Kaziranga Community Trip & Sightseeing" },
      { image: "/image/Meghalaya/IMG_0884.JPEG", alt: "Meghalaya with Kaziranga Community Trip & Sightseeing" },
      { image: "/image/Meghalaya/IMG_0893.JPEG", alt: "Meghalaya with Kaziranga Community Trip & Sightseeing" },
      { image: "/image/Meghalaya/IMG_0934.JPEG", alt: "Meghalaya with Kaziranga Community Trip & Sightseeing" },
      { image: "/image/Meghalaya/IMG_0974.JPEG", alt: "Meghalaya with Kaziranga Community Trip & Sightseeing" },
      { image: "/image/Meghalaya/IMG_0977.JPEG", alt: "Meghalaya with Kaziranga Community Trip & Sightseeing" },
      { image: "/image/Meghalaya/IMG_1008.JPEG", alt: "Meghalaya with Kaziranga Community Trip & Sightseeing" },
      { image: "/image/Meghalaya/IMG_1011.JPEG", alt: "Meghalaya with Kaziranga Community Trip & Sightseeing" },
      { image: "/image/Meghalaya/IMG_1033.JPEG", alt: "Meghalaya with Kaziranga Community Trip & Sightseeing" },
      { image: "/image/Meghalaya/IMG_1034.JPEG", alt: "Meghalaya with Kaziranga Community Trip & Sightseeing" },
      { image: "/image/Meghalaya/IMG_1043.JPEG", alt: "Meghalaya with Kaziranga Community Trip & Sightseeing" },
      { image: "/image/Meghalaya/IMG_1046.JPEG", alt: "Meghalaya with Kaziranga Community Trip & Sightseeing" },
      { image: "/image/Meghalaya/IMG_1047.JPEG", alt: "Meghalaya with Kaziranga Community Trip & Sightseeing" },
      { image: "/image/Meghalaya/IMG_1048.JPEG", alt: "Meghalaya with Kaziranga Community Trip & Sightseeing" },
      { image: "/image/Meghalaya/IMG_1124.JPEG", alt: "Meghalaya with Kaziranga Community Trip & Sightseeing" },
      { image: "/image/Meghalaya/IMG_1139.JPEG", alt: "Meghalaya with Kaziranga Community Trip & Sightseeing" },
      { image: "/image/Meghalaya/IMG_1156.JPEG", alt: "Meghalaya with Kaziranga Community Trip & Sightseeing" },
      { image: "/image/Meghalaya/IMG_1192.JPEG", alt: "Meghalaya with Kaziranga Community Trip & Sightseeing" },
      { image: "/image/Meghalaya/IMG_1193.JPEG", alt: "Meghalaya with Kaziranga Community Trip & Sightseeing" },
      { image: "/image/Meghalaya/IMG_1250.JPEG", alt: "Meghalaya with Kaziranga Community Trip & Sightseeing" },
      { image: "/image/Meghalaya/IMG_1257.JPEG", alt: "Meghalaya with Kaziranga Community Trip & Sightseeing" },
      { image: "/image/Meghalaya/IMG_1266.JPEG", alt: "Meghalaya with Kaziranga Community Trip & Sightseeing" },
      { image: "/image/Meghalaya/IMG_1297.JPEG", alt: "Meghalaya with Kaziranga Community Trip & Sightseeing" },
      { image: "/image/Meghalaya/IMG_1330.JPEG", alt: "Meghalaya with Kaziranga Community Trip & Sightseeing" },
      { image: "/image/Meghalaya/IMG_1370.JPEG", alt: "Meghalaya with Kaziranga Community Trip & Sightseeing" },
      { image: "/image/Meghalaya/IMG_2093.JPG", alt: "Meghalaya with Kaziranga Community Trip & Sightseeing" },
      { image: "/image/Meghalaya/IMG_6639.jpg", alt: "Meghalaya with Kaziranga Community Trip & Sightseeing" },
      { image: "/image/Meghalaya/IMG_6739.jpg", alt: "Meghalaya with Kaziranga Community Trip & Sightseeing" },
      { image: "/image/Meghalaya/IMG_6837.JPEG", alt: "Meghalaya with Kaziranga Community Trip & Sightseeing" },
      { image: "/image/Meghalaya/IMG_6964.jpg", alt: "Meghalaya with Kaziranga Community Trip & Sightseeing" },
      { image: "/image/Meghalaya/IMG_7113.jpg", alt: "Meghalaya with Kaziranga Community Trip & Sightseeing" },
      { image: "/image/Meghalaya/IMG_7117.jpg", alt: "Meghalaya with Kaziranga Community Trip & Sightseeing" },
      { image: "/image/Meghalaya/IMG_8325.JPEG", alt: "Meghalaya with Kaziranga Community Trip & Sightseeing" },
      { image: "/image/Meghalaya/IMG_8342.JPEG", alt: "Meghalaya with Kaziranga Community Trip & Sightseeing" },
      { image: "/image/Meghalaya/IMG_8344.JPEG", alt: "Meghalaya with Kaziranga Community Trip & Sightseeing" },
      { image: "/image/Meghalaya/IMG_8436.JPEG", alt: "Meghalaya with Kaziranga Community Trip & Sightseeing" },
      { image: "/image/Meghalaya/IMG_8524.JPEG", alt: "Meghalaya with Kaziranga Community Trip & Sightseeing" }
    ],
    highlights: [
      "Visit Umiam Lake (Barapani) for scenic hillside views and a tranquil boat ride.",
      "Witness the stunning Laitlum Canyons, famously known as the “End of the World”.",
      "Experience the beauty of Krang Suri Waterfalls and vibrant turquoise Phe Phe Falls.",
      "Stay in riverside camps at Shnongpdeng / Dawki, famous for crystal-clear transparent waters.",
      "Enjoy a scenic boat ride on the Umngot River at Shnongpdeng / Dawki.",
      "Visit Mawlynnong Village — celebrated as Asia’s Cleanest Village, with Bamboo Sky Walk.",
      "Stop by the Indo-Bangladesh Border for a unique international frontier viewpoint.",
      "Trek through rainforests to the world-famous Nongriat Double Decker Living Root Bridge.",
      "Discover the surreal natural emerald waters of the Blue Lagoon and take a refreshing swim.",
      "Discover the mysterious Arwah Caves, Mawsmai Cave and Garden of Caves.",
      "Marvel at Nohkalikai Falls (India’s tallest plunge waterfall) and Seven Sisters Falls.",
      "Admire panoramic green canyon views from Mawkdok Dympep Valley viewpoint.",
      "Embark on an early morning thrilling Jeep Safari in Kaziranga National Park to spot One-horned Rhinos and wildlife.",
      "Seek blessings at the sacred Maa Kamakhya Temple in Guwahati."
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Guwahati | Transfer to Shillong via Umiam Lake 🚗',
        activities: [
          "Arrive at Guwahati Airport (GAU) before 11:00 AM. Our Travel Tribes representative will meet and greet you at the airport.",
          "The group departs for Shillong at 12:00 PM in private tempo traveller / SUV.",
          "Enjoy a scenic 4-hour uphill drive from Guwahati to Shillong through lush pine hills.",
          "En route, stop at the beautiful Umiam Lake (Barapani) and capture its mesmerising waters and landscape.",
          "Arrive in Shillong, check in to your hotel and freshen up.",
          "In the evening, explore the vibrant cafes, street music, and shopping at Police Bazaar.",
          "Overnight stay in Shillong. (Meals: Not Included)."
        ]
      },
      {
        day: 2,
        title: 'Shillong – Laitlum Canyons – Krang Suri & Phe Phe Falls – Dawki / Shnongpdeng 🏞️',
        activities: [
          "Enjoy a delicious breakfast in the morning and check out from your Shillong hotel.",
          "Proceed towards the breathtaking Laitlum Canyons for 360-degree dramatic cliff and gorge views.",
          "Drive to Jowai and explore the magical turquoise cascade of Krang Suri Waterfalls and Phe Phe Falls.",
          "After exploring the stunning waterfalls, proceed towards Dawki / Shnongpdeng.",
          "Check in to your riverside camps, soak in the tranquil vibe under the stars.",
          "Enjoy a warm dinner with your tribe by the riverbanks.",
          "Overnight camping in Dawki / Shnongpdeng. (Meals: Breakfast & Dinner Included)."
        ]
      },
      {
        day: 3,
        title: 'Dawki – Mawlynnong Village – Cherrapunjee 🛶',
        activities: [
          "Wake up to the sounds of nature, have breakfast, and check out from your camp.",
          "Enjoy a memorable boat ride on the crystal-clear, transparent waters of the Umngot River where boats appear to float on air.",
          "Visit the Indo-Bangladesh Border outpost.",
          "Proceed towards Mawlynnong Village, renowned as Asia’s cleanest village.",
          "Explore the Bamboo Sky Walk viewpoint and the Single Decker Living Root Bridge in Riwai.",
          "Later, take a scenic drive through the clouds towards Cherrapunjee (Sohra).",
          "Check in to your hotel and relax with your fellow tribe members.",
          "Overnight stay in Cherrapunjee. (Meals: Breakfast Included)."
        ]
      },
      {
        day: 4,
        title: 'Trek to Double Decker Living Root Bridge & Blue Lagoon 🌿💧',
        activities: [
          "Energizing breakfast and depart for Tyrna Village, the base point of our iconic trek.",
          "Begin your descent (approx 3,300 steps one way) through dense tropical rainforests and suspension bridges.",
          "Cross the Single Decker Root Bridge and arrive at the world-renowned Nongriat Double Decker Living Root Bridge — an ancient bio-engineering marvel.",
          "Continue a short hike to the pristine Blue Lagoon natural pool and take a refreshing swim in crystal emerald waters.",
          "Trek back up to Tyrna Village (approx 6,600 steps total round trip).",
          "Return to your Cherrapunjee hotel for a well-deserved hearty dinner and sound sleep.",
          "Overnight stay in Cherrapunjee. (Meals: Breakfast & Dinner Included)."
        ]
      },
      {
        day: 5,
        title: 'Cherrapunjee Sightseeing – Mawsmai, Nohkalikai & Arwah Caves – Shillong 🪨🌊',
        activities: [
          "Enjoy a wholesome breakfast and check out from Cherrapunjee.",
          "Explore the limestone formations and fossils inside the famous Mawsmai Cave and Arwah Cave.",
          "Stop at the breathtaking Mawkdok Dympep Valley viewpoint for dramatic landscape panoramas.",
          "Visit the enchanting Garden of Caves with its natural rock formations and hidden cascades.",
          "Witness the awe-inspiring Nohkalikai Falls, India's tallest plunge waterfall (1,115 ft).",
          "Visit the magnificent Seven Sisters Falls (Nohsngithiang Falls) and Eco Park.",
          "Drive back to Shillong in the evening, check in to the hotel, and relax.",
          "Overnight stay in Shillong. (Meals: Breakfast Included)."
        ]
      },
      {
        day: 6,
        title: 'Shillong to Kaziranga National Park 🦏',
        activities: [
          "Enjoy breakfast, check out from Shillong, and depart for Kaziranga in Assam.",
          "Enjoy a scenic drive transitioning from the misty Khasi hills to the rolling tea gardens of Assam.",
          "Arrive in Kaziranga by late afternoon / evening and check in to your resort/hotel.",
          "Spend the evening at leisure exploring local Assamese cultural shows or chilling with tribe mates.",
          "Overnight stay in Kaziranga. (Meals: Breakfast Included)."
        ]
      },
      {
        day: 7,
        title: 'Kaziranga Wildlife Jeep Safari – Return to Guwahati Airport 🚙🦏',
        activities: [
          "Set out early in the morning for a thrilling open Jeep Safari in Kaziranga National Park.",
          "Spot the world-famous Great Indian One-horned Rhinoceros, wild water buffaloes, Asian elephants, swamp deer, and rich birdlife in their natural habitat.",
          "Return to the resort, freshen up, enjoy a hearty breakfast, and check out.",
          "Scenic return drive to Guwahati Airport (GAU) with a brief stop near Maa Kamakhya Temple if time permits.",
          "Bid farewell to your tribe members with unforgettable memories and thousands of photographs!",
          "Note: Please book return flights departing after 06:00 PM from Guwahati (GAU).",
          "Meals: Breakfast Included."
        ]
      }
    ],
    inclusions: [
      "Entire ground travel as per itinerary by Tempo Traveller / SUV / Sedan based on group size",
      "6 Nights Accommodation (Double / Triple sharing): 2N Shillong Hotel, 1N Dawki/Shnongpdeng Riverside Camping, 2N Cherrapunjee Hotel, 1N Kaziranga Hotel",
      "6 Breakfasts (Day 2 to Day 7) & 2 Dinners (Day 2 & Day 4)",
      "Kaziranga National Park Open Jeep Safari included",
      "Crystal-clear Umngot River Boat Ride at Dawki / Shnongpdeng",
      "Guided treks to Double Decker Living Root Bridge & Blue Lagoon",
      "All necessary Inner Line / state permits, toll taxes, driver night charges and parking fees",
      "Medical kit for basic emergency assistance",
      "Experienced Travel Tribes Trip Captain to ensure top-notch experience and bonding throughout"
    ],
    exclusions: [
      "Airfare or train fare to and from Guwahati (GAU)",
      "Lunches and dinners not explicitly mentioned in the itinerary",
      "Travel insurance",
      "Entry tickets to monuments, caves, waterfalls, or optional water sports/ziplining",
      "Personal expenses (tips, laundry, phone calls, camera/drone charges, packaged water)",
      "Any cost arising due to natural calamities like landslides, roadblocks, etc. (to be borne directly on spot)",
      "Anything not mentioned in the inclusions",
      "5% GST"
    ],
    policies: [
      "Book your trip at least 25–30 days prior to departure to secure early bird slots and best flight rates.",
      "Flight recommendation: Book arrival flight reaching Guwahati (GAU) before 11:00 AM on Day 1, and return flight departing after 06:00 PM on Day 7.",
      "Booking Advance: ₹5,000/- per person (Non-refundable upon cancellation; transferable or convertible to 3-month Travel Tribes credit).",
      "Pricing: Regular Triple Sharing ₹24,500 | Regular Double Sharing ₹26,500 | Xmas & New Year Triple Sharing ₹26,500 | Xmas & New Year Double Sharing ₹28,500 (+5% GST).",
      "Room Sharing: Standard package is on Triple sharing (extra mattress provided). Double sharing room option available on request.",
      "Trek Fitness: Day 4 trek involves approx 6,600 steps total (Tyrna to Nongriat & return). Moderate fitness is recommended.",
      "Trip Authority: The trip leader reserves the right to alter or skip sightseeing in case of roadblocks, weather conditions, or local advisories.",
      "Cancellation 30+ days prior: 10% deduction on total trip cost.",
      "Cancellation 15–29 days prior: 25% deduction on remaining balance.",
      "Cancellation 8–14 days prior: 50% deduction on remaining balance.",
      "Cancellation < 7 days / No-Show: 100% deduction (No refund for unused services).",
      "Company Cancellation: 100% full refund within 4–7 business days if the trip is cancelled by the operator."
    ],
    pricingOptions: [
      { label: 'Triple Sharing (Guwahati to Guwahati)', price: '₹24,500 / person' },
      { label: 'Double Sharing (Guwahati to Guwahati)', price: '₹26,500 / person' },
      { label: 'Xmas & New Year (Triple Sharing)', price: '₹26,500 / person', note: 'Applicable on Dec 24 & Dec 27 batches' },
      { label: 'Xmas & New Year (Double Sharing)', price: '₹28,500 / person', note: 'Applicable on Dec 24 & Dec 27 batches' }
    ],
    bookingAmount: '₹5,000 / person',
    reviews: [
      {
        name: 'Sayali Mhatre',
        role: 'Verified Traveller',
        detail: 'Meghalaya & Kaziranga Expedition',
        rating: 5,
        quote: 'Meghalaya with Travel Tribes was a dream come true! The crystal clear water at Dawki, the double decker root bridge trek, and seeing one-horned rhinos in Kaziranga was breathtaking. The tribe vibe was top notch!'
      },
      {
        name: 'Arjun Deshmukh',
        role: 'Verified Traveller',
        detail: 'Meghalaya & Kaziranga Expedition',
        rating: 5,
        quote: 'Best group trip ever. Everything from the stays, food, waterfall hikes to Kaziranga safari was super well organized. Our trip captain made everyone feel like old friends within the first day.'
      },
      {
        name: 'Priyanka Bose',
        role: 'Local Guide',
        reviewCount: '14 reviews',
        photoCount: '38 photos',
        detail: 'Meghalaya with Kaziranga',
        rating: 5,
        quote: 'Nohkalikai falls, Krang Suri, and swimming in Blue Lagoon were pure magic. If you are travelling solo to Northeast, Travel Tribes is 100% the best choice. Tribe hai to vibe hai!'
      }
    ]
  },
  {
    slug: 'sri-lanka-island-escape',
    title: 'Sri Lanka – The Island Escape',
    location: 'Colombo · Kandy · Sigiriya · Ella · Mirissa · Sri Lanka',
    region: 'International',
    date: 'Oct 17–24, 2026',
    dates: [
      'Oct 17–24, 2026',
      'Nov 07–14, 2026',
      'Nov 21–28, 2026',
      'Dec 19–26, 2026 (XMAS Special)',
      'Dec 27–Jan 03, 2027 (New Year Special)'
    ],
    duration: '7N/8D',
    price: '₹53,000',
    image: img('photo-1588598198321-9735fd52455b'),
    alt: 'Sri Lanka iconic Nine Arch Bridge surrounded by lush tea hills in Ella',
    tag: 'International Island Escape',
    description: 'Discover the pure magic of Sri Lanka on an 8-day tropical island group escape with Travel Tribes designed for 18–40 year old wanderers. From sun-kissed palm beaches in Mirissa and ocean surfing in Weligama to the misty emerald tea hills of Nuwara Eliya and Ella. Climb the ancient Sigiriya Lion Rock Fortress, explore sacred Dambulla cave temples, feed gentle giants at Pinnawala, and experience the world’s most iconic scenic blue train journey from Nanu Oya to Ella. Stay in premium 4-star hotels, watch whales in the Indian Ocean, and create unforgettable bonds with your tribe.',
    spots: '6 spots left',
    gallery: [
      { image: img('photo-1588598198321-9735fd52455b'), alt: 'Iconic Nine Arch Bridge in Ella Sri Lanka' },
      { image: img('photo-1546708973-b339540b5162'), alt: 'Sigiriya Lion Rock Fortress UNESCO World Heritage' },
      { image: img('photo-1507525428034-b723cf961d3e'), alt: 'Mirissa Tropical Beach and Coconut Tree Hill' },
      { image: img('photo-1544735716-392fe2489ffa'), alt: 'Pinnawala Elephant Orphanage River Bath' },
      { image: img('photo-1476514525535-07fb3b4ae5f1'), alt: 'Nanu Oya to Ella Scenic Mountain Train Journey' },
      { image: img('photo-1516483638261-f4dbaf036963'), alt: 'Temple of the Sacred Tooth Relic in Kandy' },
      { image: img('photo-1528127269322-539801943592'), alt: 'Weligama Beach Surfing and Ocean Sunset' },
      { image: img('photo-1539635278303-d4002c07eae3'), alt: 'Little Adam’s Peak Hiking Panorama in Ella' }
    ],
    highlights: [
      "Explore the cultural charm of Kandy and the sacred Temple of the Sacred Tooth Relic.",
      "Visit the famous Pinnawala Elephant Orphanage & Herbal Spice Garden.",
      "Climb the iconic Sigiriya Lion Rock Fortress — an ancient UNESCO World Heritage wonder.",
      "Experience an authentic Sri Lankan Rural Village Adventure with traditional bullock cart ride & canoe ride.",
      "Relish an authentic traditional Sri Lankan lunch prepared with fresh local spices.",
      "Explore the ancient Dambulla Cave Temple complex featuring 150+ Buddha statues and murals.",
      "Witness the high-energy Kandy Cultural Dance Show with traditional drummers and fire dancers.",
      "Explore lush rolling Tea Gardens & historic Tea Factories in Ramboda.",
      "Experience the world-renowned Nanu Oya to Ella scenic train journey through misty tea plantations.",
      "Hike to Little Adam’s Peak for breathtaking panoramic valley views.",
      "Visit the iconic Nine Arch Bridge in Ella and catch the train crossing.",
      "Fly over lush green valleys on the adrenaline-pumping Rawana Mega Zip Line.",
      "Relax at Mirissa Beach with soft sands, laid-back beachside cafés and golden sunsets.",
      "Set out on an exciting Whale & Dolphin Watching ocean safari in Mirissa (seasonal).",
      "Try surfing, snorkelling, or scuba diving in Weligama / Mirissa ocean waters."
    ],
    itinerary: [
      {
        day: 1,
        title: 'Welcome to Sri Lanka | Arrival in Colombo / Negombo 🌴',
        activities: [
          "Arrive at Bandaranaike International Airport (CMB) in Colombo, where our friendly Travel Tribes representative greets you.",
          "Short 20-minute transfer to our hotel in Negombo / Colombo.",
          "Check in to your hotel, freshen up and relax after your flight.",
          "Spend the rest of the day at leisure exploring the golden sands of Negombo beach or relaxing by the pool.",
          "Overnight stay in Negombo / Colombo. (Meals: Not Included)."
        ]
      },
      {
        day: 2,
        title: 'Negombo to Kandy | Pinnawala Elephants & Cultural Dance Show 🐘🛕',
        activities: [
          "Breakfast at the hotel, check out and begin your scenic journey towards the cultural capital of Kandy.",
          "En route, visit the famous Pinnawala Elephant Orphanage and watch gentle giants bathe in the river.",
          "Visit a traditional Spice & Herbal Garden to learn about Sri Lanka's famous Ayurvedic herbs and spices.",
          "In Kandy, visit the Gem Museum & Lapidary and the revered Temple of the Sacred Tooth Relic.",
          "Enjoy a picturesque drive around Kandy Upper Lake viewpoint.",
          "In the evening, attend the vibrant Kandy Cultural Dance & Fire Walking Show.",
          "Check in to your 4-star hotel in Kandy, enjoy dinner with the tribe, and relax.",
          "Overnight stay in Kandy. (Meals: Breakfast Included)."
        ]
      },
      {
        day: 3,
        title: 'Kandy – Sigiriya Lion Rock – Rural Village Adventure – Dambulla Caves 🦁🌾',
        activities: [
          "Early breakfast and depart at 8:00 AM for a thrilling full-day excursion.",
          "Climb the majestic Sigiriya Lion Rock Fortress (UNESCO World Heritage Site), marveling at ancient frescoes and panoramic views from the summit.",
          "Immerse yourself in authentic village life with a Rural Village Adventure including a traditional bullock cart ride and catamaran canoe ride across the lake.",
          "Savour a delicious traditional Sri Lankan lunch cooked in clay pots.",
          "Explore the UNESCO-listed Dambulla Cave Temple complex dating back to the 1st century BC, housing over 150 Buddha statues.",
          "Return to Kandy in the evening to relax.",
          "Overnight stay in Kandy. (Meals: Breakfast & Lunch Included)."
        ]
      },
      {
        day: 4,
        title: 'Kandy – Nuwara Eliya – Iconic Scenic Train to Ella 🚂⛰️',
        activities: [
          "Enjoy breakfast and check out from Kandy. Depart for Nuwara Eliya (Little England) at 7:30 AM.",
          "Visit a working Tea Factory and lush Tea Gardens in Ramboda to discover the secret behind Ceylon Tea.",
          "Stop at the magnificent Ramboda Waterfalls for photos.",
          "Board the world-famous blue scenic train from Nanu Oya to Ella (approx 3–4 hours).",
          "Hang by the open doors and soak in jaw-dropping views of misty emerald mountains, roaring waterfalls, and endless tea estates.",
          "Arrive in the charming hill town of Ella, transfer to your hotel and unwind.",
          "Overnight stay in Ella. (Meals: Breakfast Included)."
        ]
      },
      {
        day: 5,
        title: 'Ella Exploration & Adventure | Little Adam’s Peak, Nine Arch Bridge & Zipline 🌉✨',
        activities: [
          "Delicious breakfast with mountain views at the hotel.",
          "Begin the morning with an easy hike up Little Adam’s Peak for 360-degree vistas of Ella Gap.",
          "Visit the architectural wonder of Nine Arch Bridge and watch the train rumble across the arches nestled in green jungle.",
          "Get your adrenaline rush on the thrilling Rawana Mega Zip Line flying over tea plantations.",
          "Explore the historic and legendary Rawana Caves.",
          "Spend the evening cafe hopping in Ella town, listening to live acoustic music and chilling with your tribe.",
          "Overnight stay in Ella. (Meals: Breakfast Included)."
        ]
      },
      {
        day: 6,
        title: 'Ella to Mirissa | Rawana Waterfall to Tropical Beachfront 🌊🏖️',
        activities: [
          "Breakfast at the hotel, check out and begin a scenic 5–6 hour drive descending from the hills to the southern coastline.",
          "En route, make a stop at the roaring Rawana Waterfall for epic photos.",
          "Arrive in tropical Mirissa and check in to your beachfront / boutique resort.",
          "Spend a relaxing afternoon on soft golden sands with coconut water in hand.",
          "Watch a mesmerizing Indian Ocean sunset at Mirissa Beach and enjoy fresh seafood and chilled music at beach shacks.",
          "Overnight stay in Mirissa. (Meals: Breakfast Included)."
        ]
      },
      {
        day: 7,
        title: 'Mirissa & Weligama | Whale Watching, Surfing & Ocean Adventures 🐋🏄‍♂️',
        activities: [
          "Early morning departure for an exhilarating Whale & Dolphin Watching Tour into the deep Indian Ocean to spot Blue Whales and playful spinner dolphins (seasonal Nov–Apr).",
          "Return to the hotel for breakfast and freshen up.",
          "Head towards Weligama Bay for beach adventures: try surfing with beginner-friendly lessons and boards.",
          "Optionally explore snorkelling among colourful coral reefs or certified scuba diving.",
          "Visit the historic UNESCO World Heritage Galle Fort and its charming Dutch colonial streets.",
          "Farewell evening dinner and tribe celebrations by the ocean in Mirissa.",
          "Overnight stay in Mirissa. (Meals: Breakfast Included)."
        ]
      },
      {
        day: 8,
        title: 'Mirissa to Colombo Airport | Farewell Sri Lanka 🛫🇱🇰',
        activities: [
          "Enjoy your final tropical breakfast at the hotel and soak in the ocean breeze.",
          "Check out and board our comfortable private AC transfer towards Bandaranaike International Airport (CMB) in Colombo.",
          "Arrive at the airport for your onward flight home.",
          "Bid farewell to the paradise island of Sri Lanka and your incredible tribe family with memories to last a lifetime!",
          "Note: Please book return flights departing after 05:00 PM from Colombo (CMB).",
          "Meals: Breakfast Included."
        ]
      }
    ],
    inclusions: [
      "7 Nights Accommodation on Double / Triple sharing in 4-Star / Handpicked Boutique Hotels (1N Negombo/Colombo, 2N Kandy, 2N Ella, 2N Mirissa)",
      "7 Breakfasts + 1 Authentic Traditional Sri Lankan Village Lunch",
      "All local and intercity transfers as per itinerary in comfortable AC Van / Coach with airport pick-up and drop-off",
      "World-famous Nanu Oya to Ella Scenic Train Experience (subject to seat availability)",
      "Sigiriya Lion Rock Fortress Day Excursion & Entry / Guided Tour",
      "Authentic Rural Village Experience with Bullock Cart & Catamaran Canoe Ride",
      "Dambulla Cave Temple & Pinnawala Elephant Orphanage visits",
      "Kandy Cultural Dance Show & Temple of the Tooth Relic visit",
      "Tea Gardens & Factory Guided Tour in Ramboda",
      "Little Adam’s Peak hike & Nine Arch Bridge excursion",
      "Galle Fort exploration & Mirissa beach excursions",
      "Experienced Travel Tribes Trip Leader & 24/7 on-ground support",
      "Driver night charges, toll taxes, parking and local state taxes"
    ],
    exclusions: [
      "International flight tickets to and from Colombo (CMB)",
      "5% GST & 2% TCS as applicable",
      "Lunches and dinners not explicitly mentioned in the itinerary",
      "Any alcoholic drinks, packaged mineral water, personal snacks",
      "Optional activities / tickets: Whale watching safari boat, Surfing lesson/board rental, Scuba diving, Rawana Zipline",
      "Personal expenses like tips to drivers/guides, laundry, camera/drone permits, telephone bills",
      "Any cost arising due to natural calamities like roadblocks, landslides, flight delays (to be borne directly on spot)",
      "Travel & medical insurance",
      "Anything not mentioned in the inclusions"
    ],
    policies: [
      "Visa Policy: Sri Lanka offers easy Online ETA / Visa (free for Indian passport holders as per current government regulations). Passport must have at least 6 months validity.",
      "Flight recommendation: Book arrival flight reaching Colombo (CMB) on Day 1 morning/afternoon, and return flight departing after 05:00 PM on Day 8.",
      "Booking Advance: ₹15,000/- per person to secure your slot (Non-refundable upon cancellation; transferable or convertible to Travel Tribes credit as per policy).",
      "Pricing: Standard Batches ₹53,000 / person | Xmas & New Year Batches ₹57,000 / person (+5% GST & 2% TCS).",
      "Payment Policy: Balance payment must be cleared at least 30 days prior to departure date.",
      "Accommodation: Stays in premium 4-Star hotels (Mirage Colombo / Earl’s City Kandy / Oak Ray Ella / Somerset Blue Mirissa or similar).",
      "Scenic Train Note: Nanu Oya to Ella train tickets are subject to government railway availability. If train is unavailable, scenic drive through the tea country will be provided.",
      "Cancellation 30+ days prior: Advance amount retained / converted to credit.",
      "Cancellation 15–29 days prior: 50% deduction of total trip cost.",
      "Cancellation < 14 days / No-Show: 100% deduction (No refund for unused services).",
      "Company Cancellation: 100% full refund within 4–7 business days if the trip is cancelled by the operator."
    ],
    pricingOptions: [
      { label: 'Standard Batch (Triple / Double Sharing)', price: '₹53,000 / person' },
      { label: 'Xmas & New Year Special Batch', price: '₹57,000 / person', note: 'Applicable on Dec 19 & Dec 27 departures' }
    ],
    bookingAmount: '₹15,000 / person',
    reviews: [
      {
        name: 'Rohan Mehta',
        role: 'Verified Traveller',
        detail: 'Sri Lanka Island Escape',
        rating: 5,
        quote: 'Sri Lanka with Travel Tribes was beyond words! The scenic train from Nanu Oya to Ella and the Nine Arch Bridge looked straight out of a fairy tale. Stays were super luxurious and the group vibe was unmatched.'
      },
      {
        name: 'Devika Nair',
        role: 'Verified Traveller',
        detail: 'Sri Lanka Community Trip',
        rating: 5,
        quote: 'My first international group trip and I could not have asked for a better experience. Climbing Sigiriya Rock and surfing at Weligama were highlights of my year. Our trip captain took care of every single detail!'
      },
      {
        name: 'Karan Singhania',
        role: 'Local Guide',
        reviewCount: '22 reviews',
        photoCount: '64 photos',
        detail: 'Sri Lanka – The Island Escape',
        rating: 5,
        quote: 'Whale watching in Mirissa, village lunch in Sigiriya, and cafe hopping in Ella made this trip a 10/10. Travel Tribes knows how to curate the perfect balance of adventure, luxury, and community bonding.'
      }
    ]
  },
  {
    slug: 'bali-gili-islands',
    title: 'Bali w/ Gili T. – Island of Vibe',
    location: 'Seminyak · Nusa Penida · Gili Trawangan · Ubud · Bali',
    region: 'International',
    date: 'Sep 26–Oct 04, 2026',
    dates: [
      'Sep 26–Oct 04, 2026',
      'Oct 17–25, 2026',
      'Nov 14–22, 2026',
      'Dec 19–27, 2026 (XMAS Special)',
      'Dec 27–Jan 04, 2027 (New Year Special)'
    ],
    duration: '8N/9D',
    price: '₹53,000',
    image: img('photo-1537996194471-e657df975ab4'),
    alt: 'Bali and Gili Islands — Tropical Beaches, Kelingking Cliff, Mount Batur Jeep Safari and Ubud Culture',
    tag: 'Island of Vibe',
    description: 'Get ready for Bali magic — lush jungles, hike majestic volcanoes, dance your heart out at beach clubs, explore tropical beaches, and soak in endless island vibes with your tribe! Curated exclusively for 18–40 year olds, this 8 Nights / 9 Days expedition takes you across Seminyak, Kuta, the dramatic coastal cliffs of Nusa Penida, the turquoise waters of Gili Trawangan, and the cultural highlands of Ubud. From an epic 4x4 Mount Batur Sunrise Jeep Safari and thrilling Jungle ATV adventure to sunset Kecak Fire Dance at Uluwatu, swimming under Tegenungan Waterfall, partying at Omma Day Club, and snorkelling with wild sea turtles in Gili T. Premium 4-star stays, island-to-jungle transfers, and lifelong tribe memories await.',
    spots: '6 spots left',
    gallery: [
      { image: img('photo-1537996194471-e657df975ab4'), alt: 'Bali Uluwatu Cliff Temple & Sunset Panorama' },
      { image: img('photo-1552733407-5d5c46c3bb3b'), alt: 'Kelingking Beach T-Rex Cliff Nusa Penida' },
      { image: img('photo-1518548419970-58e3b4079ab2'), alt: 'Gili Trawangan Turquoise Waters & White Sand Beach' },
      { image: img('photo-1544644181-1484b3fdfc62'), alt: 'Mount Batur Sunrise & Volcanic Black Lava' },
      { image: img('photo-1537953773345-d172ccf13cf1'), alt: 'Tegalalang Rice Terraces & Jungle Swings Ubud' },
      { image: img('photo-1512100356356-de1b84283e18'), alt: 'Tropical Waterfalls & Tegenungan Pools' },
      { image: img('photo-1540555700478-4be289fbecef'), alt: 'Omma Day Club Party & Jungle Lounging' },
      { image: img('photo-1507525428034-b723cf961d3e'), alt: 'Gili Island Turtle Snorkelling & Sunset Beach Bars' }
    ],
    highlights: [
      "Explore the stunning dramatic cliffs, hidden beaches, and spiritual aura of Uluwatu.",
      "Experience the iconic sunset Kecak Fire Dance on a cliff edge overlooking the Indian Ocean.",
      "Full-day Nusa Penida Island tour: Kelingking Beach (T-Rex Cliff), Broken Beach, Angel’s Billabong & Crystal Bay.",
      "Fast boat cruise to Gili Trawangan and traditional Cidomo (horse cart) island transport.",
      "Free day to explore Gili T: Snorkel with sea turtles, scuba dive, cafe hop, and chill at sunset beach bars.",
      "Explore the sacred Ubud Monkey Forest Sanctuary and discover vibrant bohemian art markets.",
      "Go on a thrilling 1-Hour Tandem Jungle ATV Adventure through riverbeds and rainforest trails.",
      "Visit scenic Tegenungan Waterfall for breathtaking photos and a refreshing dip in natural pools.",
      "Chill, lounge, and party at Omma Day Club with infinity pools overlooking jungle waterfalls.",
      "Epic 4x4 Mount Batur Sunrise Jeep Safari across volcanic ridges and surreal Black Lava fields.",
      "Visit Bali’s iconic Tegalalang Rice Terraces and admire timeless stepped emerald paddies.",
      "Stay in handpicked 4-star hotels & luxury Ubud villas with an energetic community of 18–40 year olds."
    ],
    itinerary: [
      {
        day: 1,
        title: 'Welcome to Bali | Arrival in Seminyak 🌴',
        activities: [
          "Arrive at Bali Ngurah Rai International Airport (DPS) and meet your friendly Travel Tribes Trip Captain.",
          "Board your comfortable AC transfer to our 4-star hotel in Seminyak (Paragon Hotel or similar).",
          "Check in, freshen up, get comfortable, and soak in the tropical Bali vibes.",
          "Spend the afternoon relaxing by the pool or exploring the nearby streets and boutiques.",
          "In the evening, head out for a local Balinese food trail — try authentic Nasi Goreng, Satay, or refreshing tropical beverages.",
          "Overnight stay in Seminyak. (Meals: Not Included)."
        ]
      },
      {
        day: 2,
        title: 'Surfing Lesson (Optional) – Uluwatu Cliff Temple – Sunset Kecak Fire Dance 🏄‍♂️🛕🔥',
        activities: [
          "Start your day with a delicious breakfast at the hotel.",
          "Kick off the morning with an optional 2-hour basic surfing session with a professional instructor at the beach.",
          "Head towards southern Bali and relax at a secluded, beautiful hidden beach under dramatic limestone cliffs.",
          "Visit the iconic Uluwatu Temple, perched dramatically on a 70-meter cliff overlooking the Indian Ocean.",
          "Soak in the peaceful spiritual atmosphere and learn about its deep cultural significance.",
          "In the evening, witness the world-famous Kecak Fire Dance against a breathtaking sunset backdrop.",
          "Return to Seminyak after an exhilarating day and enjoy the evening at leisure.",
          "Overnight stay in Seminyak. (Meals: Breakfast Included)."
        ]
      },
      {
        day: 3,
        title: 'Full-Day Nusa Penida Island Tour – Seminyak Nightlife 🚤🏖️🍹',
        activities: [
          "Fuel up with an early breakfast and head to the harbour for a full-day fast boat excursion to Nusa Penida Island.",
          "Explore some of Indonesia’s most breathtaking coastal landscapes and iconic viewpoints.",
          "Visit famous spots: Angel’s Billabong (natural tidal pool), Broken Beach (scenic geological arch), Kelingking Beach (world-famous T-Rex cliff), and Crystal Bay.",
          "Take in panoramic ocean views, capture epic Instagram photos, and swim in turquoise waters.",
          "Return to mainland Bali by fast boat in the evening.",
          "Later, head into Seminyak to explore its vibrant beach clubs, lively cocktail bars, and buzzing nightlife with your tribe.",
          "Overnight stay in Seminyak. (Meals: Breakfast Included)."
        ]
      },
      {
        day: 4,
        title: 'Seminyak to Gili Trawangan | Island Vibes ⛵🏝️',
        activities: [
          "Enjoy breakfast and check out from your Seminyak hotel.",
          "Transfer to the harbour and board a scenic fast boat to the paradise island of Gili Trawangan.",
          "Experience Gili’s unique, eco-friendly transport — the traditional horse cart (Cidomo), as no motorized vehicles are allowed on the island.",
          "Check in to your island stay (Frii Hotel or similar) and soak in the laid-back island lifestyle.",
          "Spend the rest of the day cycling around the island, relaxing on white sand beaches, or chilling by the ocean.",
          "Get ready for exciting island adventures ahead.",
          "Overnight stay in Gili Islands. (Meals: Breakfast Included)."
        ]
      },
      {
        day: 5,
        title: 'Gili Islands | Turtle Snorkelling, Scuba, Cafe Hopping & Sunset Beach Bars 🐢🤿🌅',
        activities: [
          "Wake up to the gentle ocean breeze and enjoy breakfast at your resort.",
          "Enjoy a free day to explore the island at your own pace.",
          "Choose from exciting optional activities: island-hopping boat tour to snorkel with sea turtles & reef sharks, certified scuba diving, cafe hopping, or a relaxing Balinese massage.",
          "In the evening, head to one of Gili’s famous beachfront sunset bars.",
          "Watch a mesmerizing golden sunset over the water, sip refreshing cocktails, and soak in the laid-back Gili island vibes.",
          "Overnight stay in Gili Islands. (Meals: Breakfast Included)."
        ]
      },
      {
        day: 6,
        title: 'Gili Islands to Ubud | Island to Jungle Vibes 🌴🐒🌿',
        activities: [
          "Start your day with a delicious breakfast by the beach.",
          "Enjoy the morning at leisure and depart from Gili to mainland Bali via fast boat around midday.",
          "Bid farewell to tropical beach vibes and begin your journey towards the lush highlands of Ubud.",
          "Travel from scenic coastal roads into Bali’s peaceful countryside and emerald rice paddies.",
          "Visit the famous sacred Ubud Monkey Forest and meet its playful macaque residents among ancient banyan trees.",
          "Explore Ubud town, artisan markets, and bohemian cafes.",
          "Check in to your luxury villa (Bumi Linggah Villas or similar) and unwind.",
          "Overnight stay in Ubud. (Meals: Breakfast Included)."
        ]
      },
      {
        day: 7,
        title: 'Ubud Jungle ATV Adventure – Tegenungan Waterfall – Omma Day Club 🏎️💦🎉',
        activities: [
          "Wholesome breakfast at the villa.",
          "Get ready for a thrilling 1-hour tandem ATV quad bike adventure through jungle trails, muddy tracks, riverbeds, and lush landscapes.",
          "Visit the beautiful Tegenungan Waterfall, surrounded by dense tropical greenery.",
          "Capture stunning pictures and enjoy a refreshing swim in the natural plunge pool.",
          "Later, head to Omma Day Club to relax, chill on daybeds, swim in infinity pools, and enjoy vibrant Bali party vibes right next to the waterfall.",
          "Spend the evening at leisure exploring Ubud's dining scene.",
          "Overnight stay in Ubud. (Meals: Breakfast Included)."
        ]
      },
      {
        day: 8,
        title: 'Mount Batur 4x4 Jeep Sunrise Safari – Black Lava & Rice Terraces 🌋🚙🌾',
        activities: [
          "Begin your day early with a 2:00 AM departure for an unforgettable sunrise expedition.",
          "Experience an exciting 4x4 Jeep ride up Mount Batur, driving across scenic volcanic ridges.",
          "Reach the prime viewpoint to witness a breathtaking sunrise over Mount Batur volcano and Lake Batur.",
          "Enjoy breakfast with stunning panoramic morning views above the clouds.",
          "Explore the unique Black Lava fields formed by ancient volcanic eruptions around Mount Batur.",
          "Later, visit Bali’s iconic Tegalalang Rice Terraces and admire their timeless stepped beauty (optional giant Bali Swings).",
          "Enjoy a special Farewell Tribe Dinner celebrating our unforgettable journey.",
          "Overnight stay in Ubud. (Meals: Breakfast, Lunch & Welcome/Farewell Dinner Included)."
        ]
      },
      {
        day: 9,
        title: 'Ubud to Bali DPS Airport | Departure 🛫✨',
        activities: [
          "Enjoy breakfast and complete the check-out process from your villa.",
          "Gather your belongings and meet your driver for your comfortable private transfer to Bali Ngurah Rai International Airport (DPS).",
          "Keep your travel documents and passport handy for a smooth journey.",
          "Bid farewell to Bali, your trip captain, and your fellow tribe travellers, taking home lifetime friendships and unforgettable memories!",
          "Note: You can book your return flight anytime on Day 9.",
          "Meals: Breakfast Included."
        ]
      }
    ],
    inclusions: [
      "Stay for 8 nights on Double / Triple Sharing in 4-Star Hotels & Luxury Villas (3N Hotel in Seminyak, 2N Hotel in Gili Trawangan, 3N Villa in Ubud)",
      "10 Meals: 8 Breakfasts, 1 Lunch & Welcome / Farewell Dinner",
      "All local and intercity transfers as per itinerary in comfortable AC Van / Coach with airport pick-up and drop-off",
      "Return Fast Boat tickets between Bali mainland and Gili Trawangan",
      "Full-Day Nusa Penida Island Excursion by Fast Boat (Kelingking Beach, Broken Beach, Angel’s Billabong, Crystal Bay)",
      "Traditional Cidomo (horse cart) transfer on Gili Trawangan",
      "4x4 Mount Batur Sunrise Jeep Safari across volcanic ridges and Black Lava fields",
      "Thrilling 1-Hour Tandem Jungle ATV Quad Bike Adventure in Ubud",
      "Entry tickets: Uluwatu Temple & Sunset Kecak Fire Dance, Ubud Monkey Forest, Tegenungan Waterfall, Tegalalang Rice Terraces",
      "Omma Day Club visit and entry",
      "Experienced Travel Tribes Trip Captain & 24/7 on-ground assistance",
      "Driver night charges, toll taxes, parking fees, and local taxes"
    ],
    exclusions: [
      "5% GST & 2% TCS (applicable at checkout)",
      "International and domestic flight tickets to and from Bali (DPS)",
      "Bali Visa on Arrival (approx ₹2,500 / 500,000 IDR for Indian passport holders)",
      "Any kind of food or beverage not included in the package (alcoholic drinks, packaged mineral water, highway lunches)",
      "Optional activities: 2-hour surfing lesson with instructor, Scuba diving, Turtle snorkelling gear hire, Bali Swings",
      "Personal expenses (tips to driver/guides, laundry, telephone bills, personal camera/drone charges)",
      "Any cost arising due to natural calamities like roadblocks, landslides, sea conditions, flight delays (to be borne directly on spot)",
      "Travel & medical insurance",
      "Anything not explicitly mentioned in the inclusions"
    ],
    policies: [
      "Flight guidelines: Flights arriving at Bali DPS Airport in the morning or around noon on Day 1 will be most suitable. You can book your return flight anytime on Day 9.",
      "Visa & Passport: Visa on arrival is available for Indian passport holders at approx ₹2,500 (500,000 IDR). Ensure your passport has at least 6 months validity from your travel date.",
      "Booking Advance: ₹15,000/- advance per person to secure your seat. Pay the balance at least 30 days before departure.",
      "Pricing: Standard Batches ₹53,000 / person | Xmas & New Year Special Batches ₹59,000 / person (+5% GST & 2% TCS).",
      "Accommodation: 4-Star Stays (Paragon Hotel Seminyak / Frii Hotel Gili T / Bumi Linggah Villas Ubud or similar).",
      "Weather & Safety: Activities like surfing, scuba diving, snorkelling, and fast boat ferry transfers are subject to sea and weather conditions. The Trip Captain reserves the right to alter the schedule for safety.",
      "Cancellation 30+ days prior: Advance amount retained / converted to Travel Tribes credit as per policy.",
      "Cancellation 15–29 days prior: 50% deduction of total trip cost.",
      "Cancellation < 14 days / No-Show: 100% deduction (No refund for unused services).",
      "Company Cancellation: 100% full refund within 4–7 business days if the trip is cancelled by the operator."
    ],
    pricingOptions: [
      { label: 'Standard Batch (Triple / Double Sharing)', price: '₹53,000 / person' },
      { label: 'Xmas & New Year Special Batch', price: '₹59,000 / person', note: 'Applicable on Dec 19 & Dec 27 departures' }
    ],
    bookingAmount: '₹15,000 / person',
    reviews: [
      {
        name: 'Aditya Kashyap',
        role: 'Verified Traveller',
        detail: 'Bali w/ Gili T. – Island of Vibe',
        rating: 5,
        quote: 'Bali with Travel Tribes was hands down the best trip of my life! The 4x4 Mount Batur sunrise jeep safari and the sunset Kecak dance at Uluwatu cliffs were surreal. Gili Trawangan had such peaceful island vibes — swimming with sea turtles was an unforgettable bucket-list moment. 10/10 management and tribe vibe!'
      },
      {
        name: 'Tanvi Deshmukh',
        role: 'Verified Traveller',
        detail: 'Bali Community Trip',
        rating: 5,
        quote: 'Joined as a solo female traveller and felt completely safe and at home from Day 1. The Jungle ATV in Ubud, Omma Day Club pool party, and Kelingking beach in Nusa Penida were mind-blowing. Stays at Seminyak and Ubud villas were top class. Tribe hai to vibe hai!'
      },
      {
        name: 'Rohan Varma',
        role: 'Local Guide',
        reviewCount: '28 reviews',
        photoCount: '85 photos',
        detail: 'Bali w/ Gili T. Island Escape',
        rating: 5,
        quote: 'Super well-planned 9-day itinerary covering everything from beaches and beach clubs to waterfalls, volcanoes, and rice terraces. Our trip captain handled all fast boats and transfers seamlessly. Definitely travelling with Travel Tribes again!'
      }
    ]
  },
  {
    slug: 'bhutan-backpacking',
    title: 'Bhutan – Land of the Thunder Dragon',
    location: 'Phuentsholing · Thimphu · Punakha · Paro · Bhutan',
    region: 'International',
    date: 'Oct 10–16, 2026',
    dates: [
      'Oct 10–16, 2026',
      'Nov 07–13, 2026',
      'Dec 12–18, 2026'
    ],
    duration: '6N/7D',
    price: '₹26,499',
    image: img('photo-1578637387939-43c525550085'),
    alt: 'Bhutan Taktsang Tiger’s Nest Monastery, Punakha Dzong and Himalayan Valleys',
    tag: 'Land of the Thunder Dragon',
    description: 'Get ready for Bhutan magic — drive through breathtaking Himalayan valleys, explore majestic 17th-century dzongs, hike to the world-famous Tiger’s Nest monastery perched on a cliff, witness panoramic mountain vistas at Dochula Pass, and soak in the peaceful spiritual vibes of the Land of the Thunder Dragon with your tribe! Curated for 18–40 year olds, this 7-day backpacking journey takes you through Phuentsholing, Thimphu, Punakha, and Paro. Experience authentic Bhutanese living culture at Simply Bhutan, traditional archery, a royal Gho & Kira costume photoshoot, thrilling suspension bridges, and unforgettable mountain bonding.',
    spots: '6 spots left',
    gallery: [
      { image: img('photo-1578637387939-43c525550085'), alt: 'Tiger’s Nest Taktsang Monastery Clifftop in Paro' },
      { image: img('photo-1584810359583-96fc3448beaa'), alt: 'Majestic Punakha Dzong at River Confluence' },
      { image: img('photo-1561571994-3c39121109be'), alt: 'Buddha Dordenma Bronze Statue in Thimphu' },
      { image: img('photo-1506744038136-46273834b3fb'), alt: 'Dochula Pass 108 Druk Wangyal Chortens & Himalayas' },
      { image: img('photo-1476514525535-07fb3b4ae5f1'), alt: 'Punakha Suspension Bridge and Valley River' },
      { image: img('photo-1516483638261-f4dbaf036963'), alt: 'Simply Bhutan Living Heritage & Traditional Culture' },
      { image: img('photo-1527631746610-bca00a040d60'), alt: 'Scenic Paro Valley and Mountain Pine Forests' },
      { image: img('photo-1519671482749-fd09be7ccebf'), alt: 'Travel Tribes Tribe Bonding & Cultural Night' }
    ],
    highlights: [
      "Trek to the iconic Tiger’s Nest Monastery (Taktsang) dramatically perched on a 900m sheer cliff.",
      "Enjoy breathtaking 360-degree Himalayan views and 108 Druk Wangyal Chortens at Dochula Pass (3,050m).",
      "Explore the magnificent Punakha Dzong (Palace of Great Happiness) at the confluence of Pho Chhu & Mo Chhu rivers.",
      "Visit the colossal 169-foot bronze Buddha Dordenma Statue overlooking Thimphu Valley.",
      "Experience rich Bhutanese traditions, folk music, and archery at Simply Bhutan living museum.",
      "Dress up in traditional Bhutanese royal outfits (Gho & Kira) for a fun tribe group photoshoot.",
      "Walk across the thrilling Punakha Suspension Bridge — one of the longest hanging bridges in Bhutan.",
      "Stop at the scenic Chuzom Bridge where the Paro and Thimphu rivers converge with royal portraits.",
      "Explore the vibrant local handicraft and night markets of Thimphu and Paro.",
      "Drive through picturesque Himalayan valleys, pine forests, pristine rivers, and mountain waterfalls.",
      "Optional serene river rafting on Punakha river and traditional medicinal Hot-Stone Bath.",
      "Travel with an experienced Travel Tribes Trip Captain, certified English-speaking Bhutanese guide & trek leader."
    ],
    itinerary: [
      {
        day: 1,
        title: 'Bagdogra to Phuentsholing | Gateway to Bhutan 🇧🇹',
        activities: [
          "Arrive at Bagdogra Airport (IXB) before 12:00 PM and meet your Travel Tribes Trip Captain and fellow travellers.",
          "Board our private AC vehicle and embark on a scenic drive through North Bengal tea gardens to Jaigaon, the Indian border town.",
          "Cross the Indo-Bhutan border gate into Phuentsholing and complete Bhutan immigration, biometric, and entry permit formalities.",
          "Check in to your hotel (Hotel Meto Pema or similar), relax, and soak in the serene cleanliness and charm of Bhutan.",
          "Take an evening stroll around the border town and explore local Bhutanese cafes.",
          "Overnight stay in Phuentsholing. (Meals: Dinner Included)."
        ]
      },
      {
        day: 2,
        title: 'Phuentsholing to Thimphu | Scenic Himalayan Drive 🏔️🚗',
        activities: [
          "Enjoy a wholesome breakfast and begin your scenic mountain ascent towards Thimphu, the capital of Bhutan.",
          "Drive through winding mountain roads surrounded by lush pine forests, roadside waterfalls, and charming Bhutanese villages.",
          "Stop at the scenic Chuzom Bridge, where the Paro and Thimphu Rivers meet, adorned with traditional stupas and royal portraits.",
          "Optional: Experience a fun and serene river rafting adventure along the valley waters en route.",
          "Arrive in Thimphu by late afternoon and check in to your hotel (Hotel Park or similar).",
          "Later, explore the vibrant local markets, Clock Tower square, and handicraft bazaars of the capital city.",
          "Overnight stay in Thimphu. (Meals: Breakfast & Dinner Included)."
        ]
      },
      {
        day: 3,
        title: 'Thimphu – Dochula Pass – Punakha Dzong – Thimphu 🛕⛰️🎉',
        activities: [
          "Early breakfast and set out for a breathtaking excursion towards Punakha Valley.",
          "Drive up to the scenic Dochula Pass (3,050 m) and enjoy panoramic 360-degree views of snow-capped Himalayan peaks.",
          "Visit the beautiful 108 Druk Wangyal Chortens standing gracefully amidst misty mountain air.",
          "Descend to Punakha Dzong, one of Bhutan’s most magnificent 17th-century architectural landmarks located at the confluence of two rivers.",
          "Walk across the thrilling Punakha Suspension Bridge hanging high over the Pho Chhu river.",
          "Return to Thimphu in the evening for a fun game night, karaoke session, and dinner with the group.",
          "Overnight stay in Thimphu. (Meals: Breakfast & Dinner Included)."
        ]
      },
      {
        day: 4,
        title: 'Thimphu Cultural Exploration & Transfer to Paro 🏛️🎨🏔️',
        activities: [
          "Enjoy breakfast, check out from the hotel, and visit the giant bronze Buddha Dordenma Statue overlooking Thimphu Valley.",
          "En route, visit Simply Bhutan, an immersive living museum showcasing Bhutanese culture, architecture, traditional music, and archery.",
          "Continue your scenic drive towards Paro, one of Bhutan’s most picturesque valleys.",
          "Arrive in Paro and check in to your riverside resort (Riverfront / Ananda Resort or similar).",
          "In the evening, explore the charming Paro Town Market for souvenirs, prayer wheels, and handicrafts.",
          "Rest well, hydrate, and get ready for the iconic hike tomorrow.",
          "Overnight stay in Paro. (Meals: Breakfast & Dinner Included)."
        ]
      },
      {
        day: 5,
        title: 'Paro – The Iconic Tiger’s Nest (Taktsang) Trek 🥾🐅⛩️',
        activities: [
          "Start your day with an early breakfast and gear up for the world-famous Tiger’s Nest Trek.",
          "Hike through beautiful pine forests and fluttering prayer flags to reach the sacred Taktsang Monastery (approx 2–4 hours depending on pace).",
          "Explore one of Bhutan’s most revered spiritual landmarks, dramatically perched on a sheer cliff 900 metres above the valley floor.",
          "Soak in the serene atmosphere, ancient meditation caves, and awe-inspiring Himalayan vistas.",
          "Trek back down and return to Paro.",
          "Optional: Relax your tired muscles with a soothing traditional Bhutanese Hot-Stone Bath infused with mountain herbs.",
          "Overnight stay in Paro. (Meals: Breakfast & Dinner Included)."
        ]
      },
      {
        day: 6,
        title: 'Paro to Siliguri via Phuentsholing | Return Journey 📸🚙',
        activities: [
          "Enjoy breakfast and check out from your hotel in Paro.",
          "Dress up in traditional Bhutanese outfits (Gho for men, Kira for women) for a fun tribe group photoshoot.",
          "Stop at a scenic viewpoint to capture stunning pictures of the iconic Paro International Airport valley.",
          "Begin your return drive through Bhutan’s beautiful valleys and winding highways.",
          "Cross Phuentsholing, complete exit formalities, re-enter India, and continue towards Siliguri.",
          "Arrive in Siliguri by evening, check in to your hotel (Hotel Saffron Crest or similar), and relax after the journey.",
          "Overnight stay in Siliguri. (Meals: Breakfast Included)."
        ]
      },
      {
        day: 7,
        title: 'Siliguri to Bagdogra Airport | Departure 🛫✨',
        activities: [
          "Enjoy your final breakfast and check out from the hotel.",
          "Transfer to Bagdogra Airport (IXB) as per your flight timing.",
          "Bid farewell to your fellow tribe travellers and the incredible Land of the Thunder Dragon.",
          "Head back home with unforgettable memories, lifelong friendships, and stories for a lifetime!",
          "Note: You can book your return flight from Bagdogra on Day 7 at any time.",
          "Meals: Breakfast Included."
        ]
      }
    ],
    inclusions: [
      "Stay for 6 Nights on Double Sharing in Handpicked 3-Star Hotels / Resorts (1N Phuentsholing, 2N Thimphu, 2N Paro, 1N Siliguri)",
      "10 Meals: 6 Breakfasts & 4 Dinners",
      "All local and intercity transfers as per itinerary in comfortable AC Van / Coach with Bagdogra Airport pick-up",
      "Tiger’s Nest (Taktsang Monastery) guided trek with experienced local guide & trek leader 🥾",
      "Buddha Dordenma (Buddha Point), Dochula Pass & 108 Druk Wangyal Chortens excursions",
      "Punakha Dzong & Punakha Suspension Bridge visits",
      "Simply Bhutan living cultural museum entry & traditional costume photoshoot",
      "Bhutan entry permit processing & paperwork assistance",
      "Experienced Travel Tribes Trip Captain & Local English-speaking Bhutanese guide throughout",
      "Driver night charges, toll taxes, parking fees, and state taxes"
    ],
    exclusions: [
      "5% GST & 2% TCS (applicable at checkout)",
      "Mandatory Bhutan SDF (Sustainable Development Fee / Visa): ₹1,200 per night per person × 5 nights = ₹6,000 per person",
      "Domestic & international flight tickets to and from Bagdogra Airport (IXB)",
      "Monument & Dzong entry tickets (payable on spot)",
      "Any food or beverage not included in the package (alcoholic drinks, packaged mineral water, highway lunches)",
      "Optional activities: White water river rafting in Punakha, Traditional Bhutanese Hot-Stone Herbal Bath",
      "Personal expenses (tips to driver/guide, laundry, telephone bills, personal camera charges)",
      "Any cost arising due to natural calamities like landslides, roadblocks, weather delays (to be borne directly on spot)",
      "Travel & medical insurance",
      "Anything not explicitly mentioned in the inclusions"
    ],
    policies: [
      "Flight guidelines: Please book your arrival flight reaching Bagdogra Airport (IXB) before 12:00 PM on Day 1. You can book your return flight from Bagdogra anytime on Day 7.",
      "Documents & Permit: Valid Indian Passport (with min 6 months validity) or Original Voter ID Card is mandatory for Bhutan entry permit. Aadhaar Card is NOT accepted for Bhutan permits.",
      "SDF (Visa) Fee: Mandatory SDF charges of ₹1,200 per night per person (₹6,000 total for 5 nights) are collected as per Royal Government of Bhutan regulations.",
      "Booking Advance: ₹10,000/- advance per person to secure your seat. Pay the balance at least 15–30 days before departure.",
      "Pricing: Ex-Bagdogra Package ₹26,499 / person (+5% GST & 2% TCS + ₹6,000 SDF).",
      "Accommodation: Stays in handpicked 3-Star properties: Hotel Meto Pema Phuentsholing / Hotel Park Thimphu / Riverfront or Ananda Resort Paro / Hotel Saffron Crest Siliguri (or similar).",
      "Trek Fitness: Tiger’s Nest trek is moderately challenging (approx 4–5 hours round-trip hiking). Comfortable trekking shoes and reasonable fitness are recommended.",
      "Cancellation 30+ days prior: Advance amount retained / converted to Travel Tribes credit as per policy.",
      "Cancellation 15–29 days prior: 50% deduction of total trip cost.",
      "Cancellation < 14 days / No-Show: 100% deduction (No refund for unused services).",
      "Company Cancellation: 100% full refund within 4–7 business days if the trip is cancelled by the operator."
    ],
    pricingOptions: [
      { label: 'Ex-Bagdogra (Double Sharing Package)', price: '₹26,499 / person', note: 'Excludes mandatory SDF ₹6,000' },
      { label: 'All-Inclusive Package (With Bhutan SDF)', price: '₹32,499 / person', note: 'Includes ₹6,000 Bhutan SDF fee' }
    ],
    bookingAmount: '₹10,000 / person',
    reviews: [
      {
        name: 'Soumya Bannerjee',
        role: 'Verified Traveller',
        detail: 'Bhutan – Land of the Thunder Dragon',
        rating: 5,
        quote: 'Bhutan with Travel Tribes was a spiritual and soul-soothing journey. Hiking up to Tiger’s Nest Monastery was on my bucket list for years, and doing it with such an encouraging group and captain made it so memorable. The scenic drive across Dochula Pass with 108 stupas was breathtaking!'
      },
      {
        name: 'Ritika Sharma',
        role: 'Verified Traveller',
        detail: 'Bhutan Backpacking Trip',
        rating: 5,
        quote: 'Everything was organized flawlessly from Bagdogra pick-up and immigration permits to the stays and guides. Punakha Dzong looked magnificent by the river, and dressing up in Kira for the traditional photoshoot was super fun. Highly recommend Travel Tribes!'
      },
      {
        name: 'Manish Rawat',
        role: 'Local Guide',
        reviewCount: '15 reviews',
        photoCount: '48 photos',
        detail: 'Bhutan Group Expedition',
        rating: 5,
        quote: 'The cleanliness, warmth of Bhutanese people, and the peaceful vibes are unmatched. Our trip captain and Bhutanese guide took the best care of all of us. Great food, great hotel stays, and top-tier community vibes!'
      }
    ]
  },
  {
    slug: 'bhutan-tshechu-festival',
    title: 'Bhutan Tshechu Festival Special',
    location: 'Phuentsholing · Thimphu · Punakha · Paro · Bhutan',
    region: 'International',
    date: 'Sep 20–26, 2026',
    dates: [
      'Sep 20–26, 2026'
    ],
    duration: '6N/7D',
    price: '₹29,499',
    image: img('photo-1544735716-392fe2489ffa'),
    alt: 'Bhutan Tshechu Festival Masked Cham Dances, Punakha Dzong and Tiger’s Nest Paro',
    tag: 'Tshechu Festival Special',
    description: 'Experience vibrant masked dances, ancient Buddhist traditions, Himalayan magic & unforgettable memories with your tribe! Curated exclusively for 18–40 year olds, this 6 Nights / 7 Days festival expedition takes you to the heart of the sacred Thimphu / Punakha Tshechu Festival. Witness dramatic Cham masked dances, colorful silk costumes, trumpet fanfares, and spiritual blessings. Journey through Phuentsholing, Thimphu, the 108 stupas of Dochula Pass (3,050m), the majestic Punakha Dzong, and hike to the world-famous cliffside Tiger’s Nest Monastery (Paro Taktsang). 3-star handpicked stays, cultural living museum, and traditional photoshoot included.',
    spots: '4 spots left',
    gallery: [
      { image: img('photo-1544735716-392fe2489ffa'), alt: 'Thimphu Tshechu Festival Masked Cham Dances & Sacred Rituals' },
      { image: img('photo-1578637387939-43c525550085'), alt: 'Tiger’s Nest Taktsang Monastery Clifftop in Paro' },
      { image: img('photo-1584810359583-96fc3448beaa'), alt: 'Majestic Punakha Dzong at River Confluence' },
      { image: img('photo-1506744038136-46273834b3fb'), alt: 'Dochula Pass 108 Druk Wangyal Chortens & Himalayas' },
      { image: img('photo-1561571994-3c39121109be'), alt: 'Buddha Dordenma Bronze Statue in Thimphu' },
      { image: img('photo-1476514525535-07fb3b4ae5f1'), alt: 'Punakha Suspension Bridge and Valley River' },
      { image: img('photo-1516483638261-f4dbaf036963'), alt: 'Simply Bhutan Living Heritage & Traditional Outfits' },
      { image: img('photo-1527631746610-bca00a040d60'), alt: 'Scenic Paro Valley and Mountain Pine Forests' }
    ],
    highlights: [
      "Experience the colourful Thimphu / Punakha Tshechu Festival: Witness sacred Cham masked dances, colourful costumes & authentic rituals.",
      "Trek to the iconic cliff-hanging Tiger’s Nest Monastery (Taktsang) perched 900m above Paro Valley.",
      "Enjoy breathtaking 360-degree Himalayan views and 108 Druk Wangyal Chortens at Dochula Pass (3,050m).",
      "Explore the magnificent 17th-century Punakha Dzong at the confluence of Pho Chhu and Mo Chhu rivers.",
      "Visit the colossal 169-foot bronze Buddha Dordenma Statue overlooking Thimphu Valley.",
      "Experience Bhutanese culture, folk music, and archery at Simply Bhutan living museum.",
      "Dress up in traditional Bhutanese royal outfits (Gho & Kira) for a fun tribe photoshoot.",
      "Walk across the thrilling Punakha Suspension Bridge — one of Bhutan’s longest hanging bridges.",
      "Stop at the scenic Chuzom Bridge where the Paro and Thimphu rivers meet with the King & Queen portraits.",
      "Explore the vibrant local markets and handicraft bazaars of Thimphu and Paro.",
      "Drive through Bhutan’s picturesque valleys, pine forests, pristine rivers, and mountain waterfalls.",
      "Optional serene river rafting on Punakha river and traditional herbal Hot-Stone Bath."
    ],
    itinerary: [
      {
        day: 1,
        title: 'Bagdogra – Jaigaon – Phuentsholing | Gateway to Bhutan 🇧🇹',
        activities: [
          "Arrive at Bagdogra Airport (IXB) before 12:00 PM and begin your journey towards Bhutan.",
          "Drive through scenic landscapes and North Bengal tea estates to Jaigaon, the gateway to Bhutan.",
          "Cross the border gate and enter Phuentsholing.",
          "Complete Bhutan immigration, biometric, and entry permit formalities.",
          "Check in to the hotel (Hotel Meto Pema or similar), relax, and get ready for the adventures ahead.",
          "Overnight stay in Phuentsholing. (Meals: Dinner Included)."
        ]
      },
      {
        day: 2,
        title: 'Phuentsholing – Thimphu | Scenic Mountain Journey 🏔️🚗',
        activities: [
          "Enjoy breakfast and begin a scenic journey towards Thimphu through beautiful mountains, forests, waterfalls, and villages.",
          "Optional: Experience a serene and fun river rafting adventure along the river en route.",
          "Stop at the famous Chuzom Bridge, where the Paro and Thimphu Rivers meet.",
          "Witness the iconic portrait of the King and Queen welcoming visitors and capture beautiful photos.",
          "Arrive in Thimphu by evening, check in to your hotel (Hotel Park or similar), and relax.",
          "Explore the local markets, Clock Tower square, and experience the charm of Bhutan’s capital city.",
          "Overnight stay in Thimphu. (Meals: Breakfast & Dinner Included)."
        ]
      },
      {
        day: 3,
        title: 'Thimphu – Dochula Pass – Punakha – Thimphu Tshechu Festival 🎭🛕🎉',
        activities: [
          "Explore Thimphu’s famous cultural landmarks and visit the giant Buddha Dordenma Statue.",
          "Drive to the scenic Dochula Pass (3,050 m) and enjoy breathtaking Himalayan views.",
          "Visit the beautiful 108 Druk Wangyal Chortens standing gracefully amidst misty mountain air.",
          "Continue to Punakha Dzong, one of Bhutan’s most magnificent landmarks located at the confluence of two rivers.",
          "Experience the vibrant Thimphu Tshechu Festival, witnessing traditional masked dances, colourful costumes, sacred rituals, and Bhutanese culture at its finest.",
          "Check in to your hotel, followed by a fun game night and bonding session with the group.",
          "Overnight stay in Thimphu. (Meals: Breakfast & Dinner Included)."
        ]
      },
      {
        day: 4,
        title: 'Thimphu Exploration & Departure to Paro 🏛️🎨🏔️',
        activities: [
          "Enjoy breakfast, check out from the hotel, and begin your journey towards Paro.",
          "En route, visit Simply Bhutan, an immersive living museum showcasing Bhutanese culture, architecture, and traditional lifestyle.",
          "Continue your scenic drive towards Paro, one of Bhutan’s most beautiful valleys.",
          "Arrive in Paro and check in to your hotel (Riverfront / Ananda Resort or similar).",
          "In the evening, explore the local Paro Market and shop for souvenirs, Thangka paintings, and handicrafts.",
          "Relax and get ready for the exciting adventures ahead.",
          "Overnight stay in Paro. (Meals: Breakfast & Dinner Included)."
        ]
      },
      {
        day: 5,
        title: 'Paro – Tiger’s Nest (Taktsang) Trek – Paro 🥾🐅⛩️',
        activities: [
          "Start your day with breakfast and get ready for the iconic Tiger’s Nest Trek.",
          "Hike through beautiful pine forests to reach the sacred Taktsang Monastery (approximately 2–4 hours, depending on your pace).",
          "Explore one of Bhutan’s most famous and spiritual landmarks, dramatically perched on a cliff 900 metres above the valley.",
          "Soak in the peaceful atmosphere, prayer flags, stunning views, and spiritual vibes of the monastery.",
          "Trek back and return to Paro.",
          "Optional: Relax your tired muscles with a traditional Bhutanese herbal hot-stone bath.",
          "Overnight stay in Paro. (Meals: Breakfast & Dinner Included)."
        ]
      },
      {
        day: 6,
        title: 'Paro – Phuentsholing – Siliguri | Return Journey 📸🚙',
        activities: [
          "Enjoy breakfast and check out from your hotel in Paro.",
          "Before leaving, dress up in a traditional Bhutanese outfit (Gho/Kira) for a fun group photoshoot.",
          "Stop at a scenic viewpoint to capture beautiful views of the iconic Paro Airport.",
          "Begin your return journey through Bhutan’s beautiful valleys and landscapes.",
          "Cross Phuentsholing, re-enter India, and continue towards Siliguri.",
          "Arrive in Siliguri by evening, check in to the hotel (Hotel Saffron Crest or similar), and relax after the journey.",
          "Overnight stay in Siliguri. (Meals: Breakfast Included)."
        ]
      },
      {
        day: 7,
        title: 'Siliguri – Bagdogra Airport | Departure 🛫✨',
        activities: [
          "Enjoy your final breakfast and check out from the hotel.",
          "Depart for Bagdogra Airport (IXB) as per your flight timing.",
          "Bid farewell to your fellow travellers and the incredible Bhutan journey.",
          "Head back home with unforgettable memories, new friendships, and stories for a lifetime!",
          "Note: You can book your return flight from Bagdogra on Day 7 at any time.",
          "Meals: Breakfast Included."
        ]
      }
    ],
    inclusions: [
      "Stay for 6 Nights on Double Sharing in Handpicked 3-Star Hotels / Resorts (1N Phuentsholing, 2N Thimphu, 2N Paro, 1N Siliguri)",
      "10 Meals: 6 Breakfasts & 4 Dinners",
      "All local and intercity transfers as per itinerary in comfortable AC Van / Coach with Bagdogra Airport pick-up",
      "Punakha / Thimphu Tshechu Festival experience & entry assistance 🎭",
      "Tiger’s Nest (Taktsang Monastery) guided trek with experienced local guide & trek leader 🥾",
      "Buddha Dordenma (Buddha Point), Dochula Pass & 108 Druk Wangyal Chortens excursions",
      "Punakha Dzong & Punakha Suspension Bridge visits",
      "Simply Bhutan living cultural museum entry & traditional costume photoshoot",
      "Bhutan entry permit processing & paperwork assistance",
      "Experienced Travel Tribes Trip Captain & Local English-speaking Bhutanese guide throughout",
      "Driver night charges, toll taxes, parking fees, and state taxes"
    ],
    exclusions: [
      "5% GST & 2% TCS (applicable at checkout)",
      "Mandatory Bhutan SDF (Sustainable Development Fee / Visa): ₹1,200 per night per person × 5 nights = ₹6,000 per person",
      "Domestic & international flight tickets to and from Bagdogra Airport (IXB)",
      "Monument & Dzong entry tickets (payable on spot)",
      "Any food or beverage not included in the package (alcoholic drinks, packaged mineral water, highway lunches)",
      "Optional activities: White water river rafting in Punakha, Traditional Bhutanese Hot-Stone Herbal Bath",
      "Personal expenses (tips to driver/guide, laundry, telephone bills, personal camera charges)",
      "Any cost arising due to natural calamities like landslides, roadblocks, weather delays (to be borne directly on spot)",
      "Travel & medical insurance",
      "Anything not explicitly mentioned in the inclusions"
    ],
    policies: [
      "Flight guidelines: Please book your arrival flight reaching Bagdogra Airport (IXB) before 12:00 PM on Day 1. You can book your return flight from Bagdogra anytime on Day 7.",
      "Documents & Permit: Valid Indian Passport (with min 6 months validity) or Original Voter ID Card is mandatory for Bhutan entry permit. Aadhaar Card is NOT accepted for Bhutan permits.",
      "SDF (Visa) Fee: Mandatory SDF charges of ₹1,200 per night per person (₹6,000 total for 5 nights) are collected as per Royal Government of Bhutan regulations.",
      "Booking Advance: ₹10,000/- advance per person to secure your seat. Pay the balance at least 15–30 days before departure.",
      "Pricing: Festival Special Ex-Bagdogra Package ₹29,499 / person (+5% GST & 2% TCS + ₹6,000 SDF).",
      "Accommodation: Stays in handpicked 3-Star properties: Hotel Meto Pema Phuentsholing / Hotel Park Thimphu / Riverfront or Ananda Resort Paro / Hotel Saffron Crest Siliguri (or similar).",
      "Tshechu Schedule: The Tshechu festival schedule and timings are managed by local authorities and may be subject to changes.",
      "Trek Fitness: Tiger’s Nest trek is moderately challenging (approx 4–5 hours round-trip hiking). Comfortable trekking shoes and reasonable fitness are recommended.",
      "Cancellation 30+ days prior: Advance amount retained / converted to Travel Tribes credit as per policy.",
      "Cancellation 15–29 days prior: 50% deduction of total trip cost.",
      "Cancellation < 14 days / No-Show: 100% deduction (No refund for unused services).",
      "Company Cancellation: 100% full refund within 4–7 business days if the trip is cancelled by the operator."
    ],
    pricingOptions: [
      { label: 'Ex-Bagdogra (Festival Special Batch)', price: '₹29,499 / person', note: 'Excludes mandatory SDF ₹6,000' },
      { label: 'All-Inclusive Package (With Bhutan SDF)', price: '₹35,499 / person', note: 'Includes ₹6,000 Bhutan SDF fee' }
    ],
    bookingAmount: '₹10,000 / person',
    reviews: [
      {
        name: 'Ananya Sengupta',
        role: 'Verified Traveller',
        detail: 'Bhutan Tshechu Festival Special',
        rating: 5,
        quote: 'Watching the Thimphu Tshechu masked dances and colourful Cham rituals in person was surreal! The monks, trumpets, and sacred vibe gave me goosebumps. Combine that with Dochula pass and Tiger’s Nest trek, this trip was pure magic.'
      },
      {
        name: 'Kavita Joshi',
        role: 'Verified Traveller',
        detail: 'Bhutan Festival Community Trip',
        rating: 5,
        quote: 'The best cultural trip ever! Travel Tribes organized everything seamlessly — permits, stays, transfers, and guides. The traditional Kira photoshoot and karaoke night in Thimphu were super fun.'
      },
      {
        name: 'Prateek Mehra',
        role: 'Local Guide',
        reviewCount: '19 reviews',
        photoCount: '52 photos',
        detail: 'Bhutan Tshechu Festival Expedition',
        rating: 5,
        quote: 'Punakha Dzong and Tiger’s nest were breathtaking. Being in Bhutan during Tshechu festival is something everyone should experience at least once in their life. 10/10 management!'
      }
    ]
  },
  {
    slug: 'konkan-coastal-roadtrip',
    title: 'Konkan Coastal Road Trip – Maharashtra',
    location: 'Ganpatipule · Aare Ware · Ratnagiri · Devghali Beach · Maharashtra',
    region: 'Domestic',
    date: 'Sep 24–28, 2026',
    dates: [
      'Sep 24–28, 2026',
      'Oct 01–05, 2026 (Long Weekend)',
      'Oct 16–20, 2026 (Long Weekend)',
      'Oct 22–26, 2026',
      'Oct 29–Nov 02, 2026',
      'Nov 06–10, 2026 (Long Weekend)',
      'Nov 12–16, 2026',
      'Nov 19–23, 2026',
      'Nov 26–30, 2026',
      'Dec 03–07, 2026',
      'Dec 10–14, 2026',
      'Dec 17–21, 2026',
      'Dec 23–27, 2026 (Christmas Weekend)',
      'Dec 29–Jan 02, 2027 (New Year Special)'
    ],
    duration: '4N/4D',
    price: '₹8,499',
    image: img('photo-1507525428034-b723cf961d3e'),
    alt: 'Konkan Coastal Road Trip — Ganpatipule Beach, Aare Ware Coastal Road and Ratnadurg Fort',
    tag: 'Coastal Roadtrip',
    description: 'Hit the open road along Maharashtra’s most scenic Arabian Sea coastline with Travel Tribes on a 4-Day Konkan Coastal Road Trip from Mumbai & Pune! From the 400-year-old seaside Ganpatipule Ganesha Temple and pristine golden sands to driving along the famous cliffside Aare-Ware coastal road with India’s first sea-facing zipline. Explore the historic Ratnadurg sea fort, seek blessings at Bhagwati Temple, catch panoramic sunset vistas at Table Point and Ratnagiri Lighthouse, and discover the hidden paradise of Devghali (Kasheli) Beach. Curated for 18–40 year old wanderers with AC bus travel, stays, meals, and unforgettable tribe bonding.',
    spots: '8 spots left',
    gallery: [
      { image: img('photo-1507525428034-b723cf961d3e'), alt: 'Ganpatipule Clean Shores and Arabian Sea Beach' },
      { image: img('photo-1506744038136-46273834b3fb'), alt: 'Aare-Ware Scenic Ocean Highway and Cliff Road' },
      { image: img('photo-1512100356356-de1b84283e18'), alt: 'Ratnadurg Fort Bastions and Ocean Panorama' },
      { image: img('photo-1527631746610-bca00a040d60'), alt: 'Sea-Facing Zipline Over Arabian Sea Waves' },
      { image: img('photo-1516483638261-f4dbaf036963'), alt: 'Ganpatipule 400-Year-Old Seaside Ganesha Temple' },
      { image: img('photo-1533105079780-92b9be482077'), alt: 'Table Point Golden Sunset and Coastal Vistas' },
      { image: img('photo-1519671482749-fd09be7ccebf'), alt: 'Tribe Vibe Evening Music, Bonfire & Games' },
      { image: img('photo-1500530855697-b586d89ba3ee'), alt: 'Devghali Kasheli Hidden Monsoon Coastal Gem' }
    ],
    highlights: [
      "Visit the 400-year-old Ganpatipule Temple, a serene seaside shrine of Lord Ganesha.",
      "Relax at Ganpatipule Beach with its clean shores and calm Arabian Sea waves.",
      "Drive along the picturesque Aarey-Ware Coastal Road, one of Maharashtra’s most scenic routes.",
      "Experience the thrill of India’s first sea-facing zipline at Aarey-Ware over the ocean (Optional).",
      "Explore the historic Ratnadurg Fort with its panoramic 360-degree ocean views.",
      "Seek blessings at the ancient Bhagwati Temple located inside Ratnadurg Fort.",
      "Capture stunning views from the Ratnagiri Lighthouse overlooking the Konkan coastline.",
      "Discover the offbeat charm of Devghali (Kasheli) Beach, a hidden coastal gem.",
      "Visit Basra Ship Point and witness a breathtaking sunset at Table Point.",
      "Enjoy fun community games, delicious Konkani thali dinners, music, and tribe bonding."
    ],
    itinerary: [
      {
        day: 1,
        title: 'Thursday Night – Departure from Mumbai & Pune 🚌💨',
        activities: [
          "Board our comfortable AC Bus from Mumbai or Pune and begin your coastal road trip.",
          "Mumbai Pickups: Borivali (08:30 PM) → Andheri → Bandra → Sion → Chembur → Vashi → Panvel.",
          "Pune Pickups: 10:00 PM BMCC College, FC Road | 10:30 PM Xion Mall, Hinjewadi.",
          "Kick off the trip with fun ice-breaking games, travel playlists, and overnight AC journey towards Ratnagiri.",
          "Meals: Not Included."
        ]
      },
      {
        day: 2,
        title: 'Friday – Ganpatipule Beach, Temple & Aare-Ware Coastal Drive 🌊🛕✨',
        activities: [
          "Arrive in Ratnagiri in the morning and check in to your stay. Freshen up and relax.",
          "Visit the famous 400-year-old seaside Ganpatipule Temple and seek blessings of Lord Ganesha.",
          "Stroll along the clean sands and gentle waves of Ganpatipule Beach.",
          "Drive along the picturesque Aare-Ware Coastal Road — Maharashtra’s most scenic ocean drive.",
          "Optional: Experience the adrenaline rush of India’s first sea-facing zipline at Aare-Ware.",
          "Return to the stay for a delicious dinner and overnight rest.",
          "Unwind with fun community games, meet fellow travellers, and get to know your tribe.",
          "Overnight stay in Ratnagiri. (Meals: Breakfast & Dinner Included)."
        ]
      },
      {
        day: 3,
        title: 'Saturday – Ratnadurg Fort, Bhagwati Temple & Table Point Sunset 🏰🌅',
        activities: [
          "Have a wholesome breakfast at the stay.",
          "Explore the historic Ratnadurg Fort, surrounded on three sides by the Arabian Sea with majestic views.",
          "Visit the sacred Bhagwati Temple situated inside the fort ramparts.",
          "Post-lunch, visit the rugged Basra Ship Point overlooking the waves.",
          "Head to Table Point to witness a breathtaking golden sunset over the horizon.",
          "Return to the stay, relax, and have fun with fellow travellers playing community games and singing sessions.",
          "Overnight stay in Ratnagiri. (Meals: Breakfast & Dinner Included)."
        ]
      },
      {
        day: 4,
        title: 'Sunday – Devghali Beach & Return Journey 🏖️🚙',
        activities: [
          "Enjoy breakfast and check out from the stay.",
          "Visit the beautiful and offbeat Devghali Beach in Kasheli, a pristine hidden monsoon and coastal gem.",
          "Spend time exploring the beach, clicking pictures, and soaking in peaceful coastal views.",
          "After lunch at a local restaurant, begin your return journey towards Mumbai and Pune.",
          "Meals: Breakfast Included."
        ]
      },
      {
        day: 5,
        title: 'Monday – Early Morning Arrival in Mumbai & Pune 🏠✨',
        activities: [
          "Arrive back in Pune (approx 04:00 AM) and Mumbai (approx 06:00 AM).",
          "Wrap up a perfect short getaway filled with beaches, forts, ocean drives, adventure, and lifelong friendships.",
          "Until the next road trip — Tribe hai to vibe hai! 🌊",
          "Meals: Not Included."
        ]
      }
    ],
    inclusions: [
      "Mumbai to Mumbai & Pune to Pune travel in comfortable AC Bus",
      "2-Night Hotel Stay in Ratnagiri on Triple Sharing basis (Double sharing upgrade available)",
      "5 Meals Included: 3 Breakfasts & 2 Dinners (Local Konkani & Multi-cuisine food)",
      "All internal transfers and sightseeing as per itinerary",
      "Experienced Travel Tribes Trip Captain / Local Guide assistance throughout the trip",
      "All toll taxes, driver night allowances, parking charges, and entry permits"
    ],
    exclusions: [
      "5% GST",
      "Lunches throughout the trip and highway refreshments during transit",
      "Aare-Ware Sea-Facing Zipline charges (Optional)",
      "Any kind of food or beverage not included in package (alcoholic drinks, packaged mineral water)",
      "Personal expenses (tips to driver, laundry, shopping, camera/video charges)",
      "Any cost arising due to natural calamities like landslides, roadblocks, weather delays (to be borne on spot)",
      "Anything not mentioned in the inclusions"
    ],
    policies: [
      "Pickup Points: Mumbai pickups start from Borivali (08:30 PM) via WEH & Navi Mumbai. Pune pickups: BMCC College FC Road (10:00 PM) & Xion Mall Hinjewadi (10:30 PM).",
      "Booking Advance: ₹4,000/- advance per person to secure your seat (Non-refundable upon cancellation; transferable or convertible to 3-month Travel Tribes credit).",
      "Pricing: Ex-Mumbai & Pune Triple Sharing ₹8,499 / person | Double Sharing ₹9,499 / person (+₹1,000 for Long Weekend & Festive batches) +5% GST.",
      "Room Sharing: Standard package is on Triple sharing. Double sharing available at +₹1,000 per person.",
      "Trip Authority: The trip leader has all rights to alter/skip sightseeing if emergencies, roadblocks, or unfavourable weather occur.",
      "Cancellation 10–30 days prior: 25% deduction on remaining balance.",
      "Cancellation 8–10 days prior: 50% deduction on remaining balance.",
      "Cancellation 6–8 days prior: 70% deduction on remaining balance.",
      "Cancellation < 2 days / No-Show: 100% deduction (No refund for unused services).",
      "Company Cancellation: 100% full refund within 4–7 business days if the trip is cancelled by the operator."
    ],
    pricingOptions: [
      { label: 'Ex-Mumbai & Pune (Triple Sharing AC Bus)', price: '₹8,499 / person' },
      { label: 'Ex-Mumbai & Pune (Double Sharing Room)', price: '₹9,499 / person' },
      { label: 'Add-On (Double Sharing Room)', price: '+₹1,000 / person' },
      { label: 'Long Weekend / Festive Batch Add-on', price: '+₹1,000 / person', note: 'Applicable on LW & NY dates' }
    ],
    bookingAmount: '₹4,000 / person',
    reviews: [
      {
        name: 'Omkar Gokhale',
        role: 'Verified Traveller',
        detail: 'Konkan Coastal Road Trip',
        rating: 5,
        quote: 'The Aare-Ware coastal drive and the sea-facing zipline were sheer thrill! Ganpatipule temple by the beach and sunset at Table Point in Ratnagiri made this weekend trip super refreshing. Our trip leader was amazing!'
      },
      {
        name: 'Aishwarya Salunke',
        role: 'Verified Traveller',
        detail: 'Maharashtra Coastal Roadtrip',
        rating: 5,
        quote: 'Travelled solo from Pune and had the best time. The group was lively, stays were clean and cozy, and the authentic Konkani food was delicious. Devghali beach was so peaceful and untouched. Tribe vibes all the way!'
      },
      {
        name: 'Nikhil Rane',
        role: 'Local Guide',
        reviewCount: '17 reviews',
        photoCount: '39 photos',
        detail: 'Konkan Roadtrip from Mumbai',
        rating: 5,
        quote: 'Perfect 4-day escape from Mumbai hustle. AC bus was super comfortable, Ratnadurg fort had breathtaking 360-degree ocean views, and community games at night brought everyone together like family.'
      }
    ]
  },
  {
    slug: 'gokarna-backpacking',
    title: 'Gokarna Backpacking Trip',
    location: 'Gokarna · Murdeshwar · Honnavar · Yana Caves',
    region: 'Domestic',
    date: 'Oct 18–22, 2026',
    dates: [
      'Oct 18–22, 2026',
      'Nov 14–18, 2026',
      'Dec 23–27, 2026 (Christmas Weekend)',
      'Dec 29–Jan 02, 2027 (New Year Special)'
    ],
    duration: '4N/5D',
    price: '₹8,499',
    image: '/image/Gokarna/gokarna_img.jpeg',
    alt: 'Gokarna Beach and scenic coastline',
    tag: 'Backpacking Trip',
    description: 'Looking for the perfect Gokarna trip from Mumbai? Join Travel Tribes on a 4N/5D Gokarna backpacking trip covering the beautiful beaches of Gokarna, the spiritual town of Murdeshwar, the mangrove backwaters of Honnavar and the spectacular Yana Caves. This Gokarna group trip combines beach trekking, backwater boating, sunsets, cafés, local markets, adventure, music, games and plenty of opportunities to meet fellow travellers. Come solo. Meet strangers. Explore Gokarna. Find your tribe.',
    spots: '8 spots left',
    gallery: [
      { image: "/image/Gokarna/gokarna_img.jpeg", alt: "Gokarna Beach & Mangroves — Main Highlight & Scenic View" },
      { image: "/image/Gokarna/024b9b4d-65b4-4ce9-a81e-66d9dc81f318.jpg", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/0526adb5-61d3-4b0a-8736-cf466b1a41b3.jpg", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/1000001964.jpeg", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/1000002342.jpeg", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/1000002441.JPEG", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/1000002442.JPEG", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/1000002444.JPEG", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/1000002652.jpg", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/1000002678.jpg", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/1000002916.jpg", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/1000003083.jpg", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/1000003164.jpg", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/1000003396.jpg", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/1000003611.jpg", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/1000003636.jpg", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/1000003638.jpg", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/1000003708.jpg", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/1000003712.jpg", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/1000003946.jpg", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/1000003965.jpg", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/1000004043.jpg", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/1000004057.jpg", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/1000004087.jpg", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/1000004090.jpg", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/1000004144.jpg", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/1000004173.jpg", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/1000004184.jpg", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/1000004232.jpg", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/1000004350.jpeg", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/1000004351.jpeg", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/1000004355.jpeg", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/1000004357.jpeg", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/1000004627.jpg", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/1000004651.jpg", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/1000004663.jpg", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/1000004703.jpeg", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/1000005038.jpg", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/1000005048.jpg", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/1000005054.jpg", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/1000005065.jpg", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/1000005461.jpeg", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/1000005466.jpeg", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/1000005469.jpeg", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/1000005473.jpeg", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/1000005495.jpeg", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/1000007644.jpeg", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/1000007645.jpeg", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/1000007651.jpeg", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/1000052570.jpg", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/1000055130.jpeg", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/1000099269.jpg", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/1000099288.jpg", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/1D67AC41-4688-4AF0-9E47-BD64DD22F16D.jpg", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/20241118_141641_43F1A4.jpeg", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/20241118_222631_45C628.jpeg", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/20241124_153214_0E1315.jpeg", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/20241125_141452_0A2157.jpeg", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/20241228_233238_63DEC5.jpeg", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/20250302_135913_E47404.jpeg", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/20250302_140718_E122D4.jpeg", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/20250330_173738_476F72.jpeg", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/20251003_172300_C71075.jpeg", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/20251004_165642_C08958.jpeg", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/20251004_165642_C8247E.jpeg", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/20251005_093458_C24E9F.jpeg", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/20251005_093458_C50D41.jpeg", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/20251005_093458_C8A8A2.jpeg", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/20251005_094554_C0A56F.jpeg", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/20251007_211400_C33FFA.jpeg", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/20251007_211400_C7FD33.jpeg", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/20251007_211400_CAFA86.jpeg", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/20251009_200521_C1545C.jpeg", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/20251009_200521_C654D6.jpeg", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/20251009_200521_C71B52.jpeg", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/20251009_200521_CC9197.jpeg", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/20251009_200654_C0F910.jpeg", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/20251009_200654_C3F41C.jpeg", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/20251009_200654_C82D7A.jpeg", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/20251231_100322_Original.JPEG", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/38e41882-1cd7-451b-9661-4d1116040510.jpg", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/407da14d-b6e2-4ac8-b06c-b1940438c15a.jpg", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/44b2484e-b62a-4bde-9b9d-04e861294ca0.JPEG", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/79598eaf-d5aa-4bbe-ac9b-ebaaae215d2c.jpg", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/8a1db01a-5fab-4723-bebb-e46317053eb7.jpg", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/97f5d33d-9e14-4af0-b356-ee3d2a8f52ca.jpg", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/9f083e3a-90cb-408b-ba99-453c3148ebb2.jpg", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/B4968D79-7554-44DB-A607-D6C05168BA33.jpg", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/c2b1bad2-b30b-43cc-bf6f-4f5fad9bce4e.jpg", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/IMG_1160.JPEG", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/IMG_1193.JPEG", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/IMG_1194.JPEG", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/IMG_1336.JPEG", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/IMG_1371.JPEG", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/IMG_1372.JPEG", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/IMG_1633.JPEG", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/IMG_2929.JPEG", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/IMG_2930.JPEG", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/IMG_2931.JPEG", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/IMG_2941.JPEG", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/IMG_2942.JPEG", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/IMG_4170.JPG", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/IMG_7220.JPEG", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/IMG_7230.JPEG", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/IMG_7264.JPEG", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/IMG_7330.JPEG", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/IMG_8051.JPEG", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/IMG_8244.JPEG", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/IMG_8332.JPEG", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/IMG_8837.JPEG", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" },
      { image: "/image/Gokarna/IMG_8908_Original.JPEG", alt: "Gokarna Beach & Mangroves Community Trip & Sightseeing" }
    ],
    highlights: [
      "Visit Murdeshwar Temple & Asia’s second-largest Shiva statue, a spiritual marvel.",
      "Experience Honnavar backwater boating through mesmerizing mangroves.",
      "Enjoy a Gokarna beach trek from Belekan to Om Beach with cliffside views and bonding moments.",
      "Explore Belekan Beach, Paradise Beach, Half Moon Beach and Om Beach.",
      "Experience water sports at Om Beach, from surfing to parasailing.",
      "Explore the vibrant Hippie Market / Flea Market and shop for local crafts and souvenirs.",
      "Experience breathtaking sunsets at Kudle Hilltop and Gokarna beaches.",
      "Trek to Yana Caves and discover the Bhairaveshwara & Jaganmohini peaks.",
      "Visit Vibhooti Falls, a hidden paradise for nature lovers.",
      "Indulge in local cuisine at beachside cafés and restaurants.",
      "Enjoy personalized group activities including ice-breakers, games and team challenges.",
      "Travel with an experienced Travel Tribes Trip Captain.",
      "Discover hidden spots and experience Gokarna from a unique perspective."
    ],
    itinerary: [
      {
        day: 1,
        title: 'Mumbai to Gokarna | The Train Journey 🚂',
        activities: [
          "Hello fellow Gokarna backpackers! We're all meeting on the train.",
          "Let's have a fantastic journey with ice-breaking games and lots of fun! Let the Journey Begin!!!",
          "Train Details: 12619 Matsyagandha Exp / 22629 LTT Ten Exp / 12133 Mangaluru Exp (Depends on availability. Check train timing with us before booking).",
          "Meals: Not included on the train."
        ]
      },
      {
        day: 2,
        title: 'Murdeshwar, Honnavar & Gokarna 🛕🌴',
        activities: [
          "Reach Murudeshwar station in the morning. Temporary rooms will be provided to freshen up.",
          "Visit Murudeshwar Temple, Asia's second tallest Shiva statue, followed by breakfast.",
          "Experience the most amazing mangrove forest backwaters boating in Honnavar.",
          "After boating in Honnavar, have lunch enroute and leave for Gokarna immediately to check in to your resort.",
          "Take a rest, freshen up and experience the most amazing sunset at Kudle hilltop.",
          "Later let's explore some beach side cafés and shacks for beachside dinner.",
          "Back to our stay for the Tribe Vibe session — get to know each other, listen to lots of stories, dance and music, and have a great sleep.",
          "Those who are joining from other cities can directly reach Murdeshwar by 7:00 AM and meet our crew.",
          "Meals: Breakfast & Lunch included."
        ]
      },
      {
        day: 3,
        title: 'Gokarna Beach Trek | Café Hopping & Hippie Market 🏖️',
        activities: [
          "Wake up and have breakfast.",
          "Walk through a combination of scenic cliff treks and serene beaches.",
          "Visit Belekan Beach, Paradise Beach, Half Moon Beach, Om Beach & Kudle Beach.",
          "Enjoy thrilling water sports at Om Beach / Kudle Beach.",
          "Sit back & relax till you experience yet another breathtaking sunset that Gokarna's beautiful coast has to offer.",
          "Explore the vibrant flea market / Hippie Market of Gokarna for bohemian crafts & souvenirs.",
          "Visit the ancient Mahabaleshwar Temple at your own pace.",
          "Return to your stay and rest. Enjoy free time with games, dancing, stories, and more.",
          "Meals: Breakfast & Dinner included."
        ]
      },
      {
        day: 4,
        title: 'Yana Caves, Vibhooti Falls & Board the Train 🌿',
        activities: [
          "After breakfast, check out and prepare for an excursion to Yana Caves.",
          "Visit the sacred cave temple dedicated to Lord Shiva amidst towering rock formations.",
          "Visit Vibhooti Falls (subject to time permitting).",
          "Freshen up and have lunch en route.",
          "Head to Railway Station to board the train at 5:00 PM / 8:00 PM and proceed towards Mumbai.",
          "Meals: Breakfast included."
        ]
      },
      {
        day: 5,
        title: 'Back to Mumbai with Cherished Memories 🏠',
        activities: [
          "Returning home with cherished memories and countless pictures to look back at.",
          "Joy from all the fun experiences and newfound friendships on this incredible trip.",
          "Promise to stay in touch and plan more adventures together.",
          "Return timings: 08:27 AM — Panvel | 10:00 AM — Thane / 10:30 AM — CSMT (OR 12:30 PM — Panvel | 01:30 PM — Kalyan)."
        ]
      }
    ],
    inclusions: [
      "Train travel from Mumbai and back Sleeper Non-AC / 3AC (Confirm or RAC)",
      "2N AC stay on Hotel triple/quad sharing basis",
      "5 meals: 3 Breakfasts, 1 Lunch on Day 2, 1 Dinner on Day 3",
      "Honnavar Backwaters Boating experience",
      "Transfers for Honnavar, Yana Caves & Murdeshwar by private bus/vehicle",
      "Entry fee and parking charges",
      "Guided Gokarna Beach Trek",
      "Travel Tribes Trip Captain cum friend to assist you with the best service throughout the trip"
    ],
    exclusions: [
      "Train meals are not included",
      "Personal expenses and shopping",
      "Any extra railway cost and train food",
      "Tatkal ticket charges, if applicable",
      "Any personal expense like tips to driver, entry to monuments, camera/video camera charges, laundry, telephone bills, etc.",
      "Water sports charges at Om Beach",
      "Any cost arising due to natural calamities like landslides, roadblocks, etc. to be borne directly by the customer on the spot",
      "GST 5%"
    ],
    thingsToCarry: [
      "Valid photo ID for all members (Aadhaar / Driving License / Passport) — Mandatory",
      "Comfortable trekking shoes / sneakers with good grip and casual flip-flops",
      "Light and breathable cotton clothes, swimwear / beachwear, and quick-dry towel",
      "Small backpack / daypack (20–30L) for day tours and beach trek",
      "Sun protection: Sunscreen (SPF 50+), sunglasses, and wide cap/hat",
      "Personal medications, basic first-aid, ORS / Glucose",
      "Power bank, charging cables, and waterproof phone pouch",
      "Reusable water bottle",
      "Sufficient cash for local flea market shopping and personal café orders"
    ],
    policies: [
      "Book your trip at least 30 days prior to the departure date to get confirmed train tickets.",
      "Booking Amount: ₹4,000/- advance per person (Non-refundable upon cancellation; transferable to another person or convertible to 3-month Travel Tribes credit).",
      "Pricing: Ex-Gokarna ₹8,499 | Ex-Mumbai Non-AC ₹9,499 | Ex-Mumbai AC ₹11,499 | Add-on Double Sharing ₹1,500.",
      "Room Sharing: In triple/quad-sharing rooms, an extra mattress is provided (not to be confused with a separate bed frame).",
      "Trip Authority: The trip leader has all rights to alter/skip sightseeing if emergencies, acts of God, or unfavorable weather occur.",
      "Discipline & Alignment: Participants should coordinate, be disciplined, and align together as a team during the trip.",
      "Punctuality: Any delay at particular sightseeing spots by participants may result in the cancellation of further sightseeing.",
      "Safety: Safety is a top priority; however, organizers are not liable for individual severe injuries or fatal events.",
      "Harassment: Travel Tribes strictly stands against any form of harassment.",
      "Vehicle & Hill Driving: AC may not be operated in hilly regions. Point-to-point vehicle usage only.",
      "Cancellation 10–30 days prior: 25% deduction on remaining balance.",
      "Cancellation 8–10 days prior: 50% deduction on remaining balance.",
      "Cancellation 6–8 days prior: 70% deduction on remaining balance.",
      "Cancellation 3–6 days prior: 90% deduction on remaining balance.",
      "Cancellation < 2 days / No-Show: 100% deduction (No refund for unused services).",
      "Company Cancellation: 100% full refund within 4–7 business days if the trip is cancelled by the operator."
    ],
    pricingOptions: [
      { label: 'Ex-Gokarna (Gokarna to Gokarna)', price: '₹8,499 / person' },
      { label: 'Ex-Mumbai (Non-AC Sleeper Train)', price: '₹9,499 / person' },
      { label: 'Ex-Mumbai (AC 3-Tier Train)', price: '₹11,499 / person' },
      { label: 'Add-On (Double Sharing Room)', price: '+₹1,500 / person' },
      { label: 'New Year / Festive Batch Special', price: '₹9,999 / person', note: 'Applicable on Christmas & New Year batches' }
    ],
    bookingAmount: '₹4,000 / person',
    reviews: [
      {
        name: 'Deepak Dhiver',
        role: 'Local Guide',
        reviewCount: '16 reviews',
        photoCount: '51 photos',
        rating: 5,
        quote: 'I went on a trip to Gokarna, and this was my 1st Solo trip ever, I met great people during the trip. We visited many places in 3 days and our tour guide (Mr.Shah) was very experienced. All the arrangents were perfectly made. I enjoyed my 1st solo trip ✨️'
      },
      {
        name: 'Shrutika More',
        reviewCount: '2 reviews',
        photoCount: '13 photos',
        rating: 5,
        quote: 'Recently had my second trip to Gokarna with travel tribes and it was the hella amazing trip I ever had. The trip was absolutely amazing and all the credit goes to our fantastic trio Adil, Parag and Nihir who managed everything well. I’m really grateful to travel tribes for arranging a cake for my birthday and making it a special day for me. It was unexpected surprise for me. I will always cherish this memorable trip as I met so many amazing people, we bonded and enjoyed together. I would highly recommend you all to go with travel tribes and have your banger trip because Tribe hai to vibe hai guyss 🔥🫶🥳'
      },
      {
        name: 'Sayli Rane',
        role: 'Local Guide',
        reviewCount: '21 reviews',
        photoCount: '6 photos',
        rating: 5,
        quote: 'I recently went on gokarna trip with travel tribes. It was my first solo trip was bit nervous till I boarded the train..but as the journey began…it was a trip filled with fun and adventure. All the trip leaders adil arzoo raj viju were so friendly and caring. Best trip i had in 2023. Stay location was also good its near the beach . Room conditions can be improved by the resort owner. Though not bad as resort is besides beach.'
      },
      {
        name: 'Abhishek Dutta',
        reviewCount: '10 reviews',
        photoCount: '9 photos',
        timeAgo: '2 years ago',
        rating: 5,
        quote: 'Had one of the best trips ever with Travel Tribes. Really nice people and awesome management team. This was my 1st group trip as strangers and we left the trip becoming great friends. Had gone to Gokarna for new year party and had the best beach front resort & party.'
      },
      {
        name: 'Raj Jaiswal',
        reviewCount: '6 reviews',
        photoCount: '12 photos',
        timeAgo: '2 years ago',
        rating: 5,
        quote: 'I think Travel Tribes is one of the most friendly travel organising company, I had recently gone to Gokarna with them & never felt that I am with the strangers on the trip, they just took trip to next level & it\'s been almost 5 days I am still mentally with them & lost in those memories. Highly recommended for solo as well for group travellers, if you wanna #Vibe then Choose the Travel Tribes.'
      },
      {
        name: 'Bhakti Shirke',
        reviewCount: '5 reviews',
        photoCount: '8 photos',
        timeAgo: 'a year ago',
        rating: 5,
        quote: 'Had an amazing time on the Gokarna trip! Everything was perfectly organized – from the transportation to the accommodations and the itinerary. The team ensured we had a seamless and fun experience. Highly recommend for anyone looking for a stress-free and memorable group getaway!'
      },
      {
        name: 'Khushi Singh',
        role: 'Local Guide',
        reviewCount: '13 reviews',
        photoCount: '12 photos',
        timeAgo: 'a year ago',
        rating: 5,
        quote: 'Gokarna trip with travel tribes was the best trip I have ever had. It was my first solo trip and trust me the experience I had with people and with parag it was really special to me. I will always remember this memorable trip I met so many amazing people we bonded quickly and enjoyed so much I would highly recommend to go with travel tribes. As it was my pre- birthday trip so parag made it special for me as well celebrated, overall the trip was worth every penny. 🫶🏻'
      },
      {
        name: 'Nakusa Indalkar',
        role: 'Local Guide',
        reviewCount: '12 reviews',
        photoCount: '11 photos',
        timeAgo: '2 years ago',
        rating: 5,
        quote: 'Gokarna was my second solo trip with Travel Tribe. Our host Adil is a cool guy. All the arrangements done starting from train journey, local travel at Gokarna, accommodation, meals everything was hassle-free. We could visit all places as mentioned in itinerary easily. Not for a moment we felt that we are solo travelers meeting for the first time. And as we all experienced it I will definitely say - TRIBE HAI TO VIBE HAI !'
      },
      {
        name: 'Daksha Bhanushali',
        reviewCount: '10 reviews',
        photoCount: '4 photos',
        timeAgo: 'a year ago',
        rating: 5,
        quote: 'I just finished my Gokarna trip with Travel Tribes, as this was my 2nd trip with them everything went well as expected, it was an incredible experience from start to finish. Our tour Captain Parag was friendly, he took care of every detail, making sure everything went smoothly. Honestly, everything was perfect. I highly recommend them to anyone looking for a well-coordinated and enjoyable travel specially for solo travelers. I am looking forward to the book more such amazing trips with them. Thanks to the Travel tribe for this amazing experience.'
      },
      {
        name: 'Mohil Khare',
        role: 'Local Guide',
        reviewCount: '82 reviews',
        photoCount: '101 photos',
        timeAgo: 'a year ago',
        rating: 5,
        quote: 'This was my second trip with Travel Tribes and they just seem to keep pushing the bar for amazing travel experiences. My trip to Gokarna was made memorable with a great itinerary, good planning and kindest friends made through the trip. Our trip captain Parag was simply a delight and was on top of things at all times, while ensuring we all had a great time. Anyone considering a trip should definitely give these guys a shot! Highly recommended! ❤️'
      },
      {
        name: 'Nidhi Gupta',
        role: 'Local Guide',
        reviewCount: '9 reviews',
        photoCount: '6 photos',
        rating: 5,
        quote: 'I joined Travel Tribes Gokarna trip as a solo traveler, and had a memorable time with them. The group members and leader were friendly, warm and approachable. They ensured the temple darshans, chill time at the beach/waterfall and most importantly safety. Every single person\'s comfort, health and food preferences were considered and respected. It was heartwarming to see other solo travelers, and being a part of group games, group videos, singing sessions and ice cream treats. By the second day I had forgotten I had joined solo - we all had become friends, had inside jokes, took beautiful pictures of each other and made sweet memories together. One of the best trips! ❤️'
      },
      {
        name: 'Akshay Karnik',
        reviewCount: '8 reviews',
        photoCount: '1 photo',
        rating: 5,
        quote: 'Thank you Travel Tribes for the lovely experience. The Trip was very well planned. We reached Gokarna with a mind full of excitement and curiosity about the place and the travel group and we returned with a bag full of memories and happiness. 😊'
      }
    ]
  },
  {
    slug: 'coorg-backpacking',
    title: 'Coorg Backpacking Trip',
    location: 'Coorg · Madikeri · Mandalpatti · Mangalore',
    region: 'Domestic',
    date: 'Nov 14–18, 2026',
    dates: [
      'Nov 14–18, 2026',
      'Dec 23–27, 2026 (Christmas Weekend)',
      'Dec 29–Jan 02, 2027 (New Year Special)'
    ],
    duration: '4N/5D',
    price: '₹8,499',
    image: '/image/Coorg/coorg_img.JPEG',
    alt: 'Misty hills and lush coffee plantations of Coorg',
    tag: 'Scotland of India',
    description: 'Looking for a Coorg trip from Mumbai, a Coorg backpacking trip, or a fun Coorg group trip with strangers? Join Travel Tribes for an unforgettable journey to Coorg, the Scotland of India, and explore misty hills, lush coffee plantations, waterfalls, viewpoints, monasteries and scenic landscapes. From Abbey Falls and Mandalpatti Peak 4x4 Jeep ride to Raja’s Seat, Namdroling Monastery (Golden Temple), Elephant Camp, and coffee tasting. Come solo. Meet strangers. Explore Coorg. Find your tribe.',
    spots: '6 spots left',
    gallery: [
      { image: "/image/Coorg/coorg_img.JPEG", alt: "Coorg Scotland of India — Main Highlight & Scenic View" },
      { image: "/image/Coorg/138baea4-d2d4-4a8b-b67d-ca75cf62e820.jpg", alt: "Coorg Scotland of India Community Trip & Sightseeing" },
      { image: "/image/Coorg/20250102_143730_2E60D7.jpeg", alt: "Coorg Scotland of India Community Trip & Sightseeing" },
      { image: "/image/Coorg/20260102_195453_146EDF.jpeg", alt: "Coorg Scotland of India Community Trip & Sightseeing" },
      { image: "/image/Coorg/20260102_221209_1350B4.jpeg", alt: "Coorg Scotland of India Community Trip & Sightseeing" },
      { image: "/image/Coorg/20260103_124057_1B1347.jpeg", alt: "Coorg Scotland of India Community Trip & Sightseeing" },
      { image: "/image/Coorg/20260103_140021_1C8236.jpeg", alt: "Coorg Scotland of India Community Trip & Sightseeing" },
      { image: "/image/Coorg/20260103_180831_15BB1D.jpeg", alt: "Coorg Scotland of India Community Trip & Sightseeing" },
      { image: "/image/Coorg/20260103_180831_1680CF.jpeg", alt: "Coorg Scotland of India Community Trip & Sightseeing" },
      { image: "/image/Coorg/20260103_181142_13D3AE.jpeg", alt: "Coorg Scotland of India Community Trip & Sightseeing" },
      { image: "/image/Coorg/20260103_182458_16D444.jpeg", alt: "Coorg Scotland of India Community Trip & Sightseeing" },
      { image: "/image/Coorg/20260103_194731_136C3A.jpeg", alt: "Coorg Scotland of India Community Trip & Sightseeing" },
      { image: "/image/Coorg/20260103_200007_196F17.jpeg", alt: "Coorg Scotland of India Community Trip & Sightseeing" },
      { image: "/image/Coorg/20260904_122633_722606.jpeg", alt: "Coorg Scotland of India Community Trip & Sightseeing" },
      { image: "/image/Coorg/20260904_202301_74B610.jpeg", alt: "Coorg Scotland of India Community Trip & Sightseeing" },
      { image: "/image/Coorg/20260904_212930_73DB89.jpeg", alt: "Coorg Scotland of India Community Trip & Sightseeing" },
      { image: "/image/Coorg/20260905_211911_73E594.jpeg", alt: "Coorg Scotland of India Community Trip & Sightseeing" },
      { image: "/image/Coorg/20260906_162928_7A440F.jpeg", alt: "Coorg Scotland of India Community Trip & Sightseeing" },
      { image: "/image/Coorg/20260906_162928_7F8968.jpeg", alt: "Coorg Scotland of India Community Trip & Sightseeing" },
      { image: "/image/Coorg/3dbaf629-74d7-402c-84cb-50faea2f72ce.jpg", alt: "Coorg Scotland of India Community Trip & Sightseeing" },
      { image: "/image/Coorg/4a5642ac-99cc-4cbc-9c44-c0c56ffb2827.jpg", alt: "Coorg Scotland of India Community Trip & Sightseeing" },
      { image: "/image/Coorg/5bdd6c6b-aa2d-409f-a793-4e8ecd67a61c.jpg", alt: "Coorg Scotland of India Community Trip & Sightseeing" },
      { image: "/image/Coorg/5cade0a7-ec5e-4ef6-9a8d-938f06132b79.jpg", alt: "Coorg Scotland of India Community Trip & Sightseeing" },
      { image: "/image/Coorg/5db0ceae-ed17-481c-a3e8-d99bde631140.JPG", alt: "Coorg Scotland of India Community Trip & Sightseeing" },
      { image: "/image/Coorg/7cfee5be-d496-4521-ad29-c81b1c072f9f.jpg", alt: "Coorg Scotland of India Community Trip & Sightseeing" },
      { image: "/image/Coorg/8094697e-d5c9-45bb-956a-bd77bb0830bf.jpg", alt: "Coorg Scotland of India Community Trip & Sightseeing" },
      { image: "/image/Coorg/8e222374-3299-4b0f-9716-c3d4b146b78e.jpg", alt: "Coorg Scotland of India Community Trip & Sightseeing" },
      { image: "/image/Coorg/9532a3ed-5593-4673-b3c9-98d39eea24d3.jpg", alt: "Coorg Scotland of India Community Trip & Sightseeing" },
      { image: "/image/Coorg/9f1b3977-ae65-425a-ba00-e9f136604eed.jpg", alt: "Coorg Scotland of India Community Trip & Sightseeing" },
      { image: "/image/Coorg/dabfbb70-a76d-40f2-9470-f35f3a2aca3f.jpg", alt: "Coorg Scotland of India Community Trip & Sightseeing" },
      { image: "/image/Coorg/IMG_0060.JPEG", alt: "Coorg Scotland of India Community Trip & Sightseeing" },
      { image: "/image/Coorg/IMG_0105.JPEG", alt: "Coorg Scotland of India Community Trip & Sightseeing" },
      { image: "/image/Coorg/IMG_5327.JPEG", alt: "Coorg Scotland of India Community Trip & Sightseeing" },
      { image: "/image/Coorg/IMG_5336.JPEG", alt: "Coorg Scotland of India Community Trip & Sightseeing" },
      { image: "/image/Coorg/IMG_5374.JPEG", alt: "Coorg Scotland of India Community Trip & Sightseeing" },
      { image: "/image/Coorg/IMG_5455.JPEG", alt: "Coorg Scotland of India Community Trip & Sightseeing" },
      { image: "/image/Coorg/IMG_5499.JPEG", alt: "Coorg Scotland of India Community Trip & Sightseeing" },
      { image: "/image/Coorg/IMG_5726.JPEG", alt: "Coorg Scotland of India Community Trip & Sightseeing" },
      { image: "/image/Coorg/IMG_5769.JPEG", alt: "Coorg Scotland of India Community Trip & Sightseeing" },
      { image: "/image/Coorg/IMG_5834.JPEG", alt: "Coorg Scotland of India Community Trip & Sightseeing" },
      { image: "/image/Coorg/IMG_5835.JPEG", alt: "Coorg Scotland of India Community Trip & Sightseeing" },
      { image: "/image/Coorg/IMG_5844.JPEG", alt: "Coorg Scotland of India Community Trip & Sightseeing" },
      { image: "/image/Coorg/IMG_6851.JPEG", alt: "Coorg Scotland of India Community Trip & Sightseeing" },
      { image: "/image/Coorg/IMG_6888.JPEG", alt: "Coorg Scotland of India Community Trip & Sightseeing" },
      { image: "/image/Coorg/IMG_6912.JPEG", alt: "Coorg Scotland of India Community Trip & Sightseeing" },
      { image: "/image/Coorg/IMG_6938.JPEG", alt: "Coorg Scotland of India Community Trip & Sightseeing" },
      { image: "/image/Coorg/IMG_6944.JPEG", alt: "Coorg Scotland of India Community Trip & Sightseeing" },
      { image: "/image/Coorg/IMG_6967.JPEG", alt: "Coorg Scotland of India Community Trip & Sightseeing" },
      { image: "/image/Coorg/IMG_7410.JPEG", alt: "Coorg Scotland of India Community Trip & Sightseeing" },
      { image: "/image/Coorg/IMG_7801.JPEG", alt: "Coorg Scotland of India Community Trip & Sightseeing" },
      { image: "/image/Coorg/IMG_7804.JPEG", alt: "Coorg Scotland of India Community Trip & Sightseeing" },
      { image: "/image/Coorg/IMG_7871.JPEG", alt: "Coorg Scotland of India Community Trip & Sightseeing" },
      { image: "/image/Coorg/IMG_7878.JPEG", alt: "Coorg Scotland of India Community Trip & Sightseeing" },
      { image: "/image/Coorg/IMG_7889.JPEG", alt: "Coorg Scotland of India Community Trip & Sightseeing" },
      { image: "/image/Coorg/IMG_8960.JPEG", alt: "Coorg Scotland of India Community Trip & Sightseeing" },
      { image: "/image/Coorg/IMG_8963.JPEG", alt: "Coorg Scotland of India Community Trip & Sightseeing" },
      { image: "/image/Coorg/IMG_9565.JPEG", alt: "Coorg Scotland of India Community Trip & Sightseeing" },
      { image: "/image/Coorg/IMG_9825.JPEG", alt: "Coorg Scotland of India Community Trip & Sightseeing" }
    ],
    highlights: [
      "Explore the lush green landscapes of Coorg, the Scotland of India.",
      "Walk through scenic Coorg coffee plantations and learn the coffee-growing process.",
      "Visit the picturesque Abbey Falls surrounded by dense greenery.",
      "Experience an exciting off-roading 4×4 Jeep ride to Mandalpatti Peak.",
      "Enjoy panoramic Western Ghats sunrise views from Mandalpatti Peak.",
      "Experience the mesmerising views and sunset from Raja’s Seat.",
      "Visit the Elephant Camp to spend time with the gentle giants.",
      "Explore Namdroling Monastery (Golden Temple) — one of the largest Tibetan settlements in India.",
      "Visit the peaceful Chiklihole Dam reservoir and nature trails.",
      "Explore Nisargadhama bamboo island and bird sanctuary.",
      "Visit historic Madikeri Fort and Omkareshwar Temple.",
      "Explore the local market and shop for authentic Coorg coffee, spices, and homemade chocolates.",
      "Enjoy ice-breakers, games, bonfire, dinner, and quality time with your tribe.",
      "Travel with an experienced Travel Tribes Trip Captain."
    ],
    itinerary: [
      {
        day: 1,
        title: 'Mumbai to Mangalore | The Train Journey 🚂',
        activities: [
          "Hello fellow Coorg Travellers! We're all meeting on the train.",
          "Netravati Express (16345) departure points: 11:40 AM (LTT), 12:05 PM (Thane), 12:50 PM (Panvel).",
          "Let's have a fantastic journey with ice-breaking games, music, stories, and lots of fun! Let the Journey Begin!",
          "Meals: Not included on the train."
        ]
      },
      {
        day: 2,
        title: 'Coorg Plantation, Wine Tasting & Raja’s Seat Sunset ☕🍷',
        activities: [
          "Reach Mangalore Station by 5:00 AM.",
          "Start your journey towards Coorg immediately (3–4 hrs). En route breakfast stop.",
          "Check-in to our stay and freshen up. Get ready for the next adventure!",
          "Start the day with an immersive Coffee Plantation Tour through the lush green plantations of Coorg.",
          "Explore the beautiful coffee estates and learn about the coffee-growing process and Coorg's rich coffee culture.",
          "Next, explore a Spice Garden and discover the variety of aromatic spices grown in the region.",
          "Enjoy a Wine Tasting Experience and sample different varieties while learning about regional flavours and wine-making.",
          "Later, head towards Raja’s Seat for stunning panoramic views of Coorg's hills, valleys, and sunset.",
          "Relax at the viewpoint and capture some beautiful Insta-worthy pictures.",
          "Return to stay for delicious dinner, tribe vibes, and relaxing night with fellow travellers.",
          "Meals: Breakfast & Dinner included."
        ]
      },
      {
        day: 3,
        title: 'Chiklihole Dam, Golden Temple & Elephant Camp 🐘🛕',
        activities: [
          "After breakfast, first visit Chiklihole Dam — a peaceful spot where nature meets a stunning man-made reservoir.",
          "Next up is the Namdroling Monastery (Golden Temple) — a calm, spiritual escape and one of the largest Tibetan settlements in India.",
          "Head to the Elephant Camp to spend time observing and interacting with the gentle giants.",
          "If time permits, explore Nisargadhama bamboo forest and deer park.",
          "Later, enjoy free time at the local market to experience and shop for Coorg's famous coffee, homemade chocolates, and spices.",
          "Dinner and restful night back at the stay!",
          "Meals: Breakfast & Dinner included."
        ]
      },
      {
        day: 4,
        title: 'Mandalpatti 4x4 Jeep Sunrise, Abbey Falls & Board the Train 🚙🌄',
        activities: [
          "Wake up early in the morning and get ready for an exciting adventure.",
          "Leave for Mandalpatti Peak in a 4×4 Jeep and experience an exciting off-roading ride through scenic trails.",
          "Reach Mandalpatti Peak early morning and witness the breathtaking sunrise over the Western Ghats.",
          "Return from Mandalpatti and head towards Abbey Falls to witness its majestic cascading beauty surrounded by lush greenery.",
          "Later, visit Omkareshwar Temple, a historic architectural marvel located in Madikeri.",
          "Freshen up, enjoy lunch en route, and proceed towards Mangalore Railway Station.",
          "Reach Mangalore Station and board your return train (Netravati Exp 16349) towards Mumbai.",
          "Meals: Breakfast included."
        ]
      },
      {
        day: 5,
        title: 'Back to Mumbai with Cherished Memories 🏠',
        activities: [
          "Returning home with cherished memories, countless pictures to look back at, and the joy of all the fun experiences on this incredible trip.",
          "Promise to stay in touch and plan more adventures together.",
          "Train: Netravati Exp 16349."
        ]
      }
    ],
    inclusions: [
      "Train Travel from Mumbai and back in Sleeper Non-AC / 3AC (Confirm or RAC)",
      "2 Nights stay in Hotel/Resort on Triple / Quad sharing basis",
      "5 Meals: 3 Breakfasts & 2 Dinners",
      "Jeep ride at Mandalpatti Peak (4x4 Off-roading)",
      "Internal transport in Private Vehicle (6-Seater / Tempo Traveller / Bus)",
      "Entry fee and parking charges",
      "Coffee Plantation Tour entry charges",
      "Travel Tribes Trip Captain cum friend to assist you with the best service throughout the trip"
    ],
    exclusions: [
      "Train meals are not included",
      "Lunch throughout the trip",
      "Personal expenses (shopping, personal café visits, etc.)",
      "Any extra railway cost and train food",
      "Tatkal ticket charges, if applicable",
      "Any personal expense like tips to driver, entry to monuments, camera/video camera charges, laundry, telephone bills, etc.",
      "Any cost arising due to natural calamities like landslides, roadblocks, etc. to be borne directly by the customer on the spot",
      "Animal feeding charges at Elephant Camp and Nisargadhama",
      "GST 5%"
    ],
    thingsToCarry: [
      "Valid Government Photo ID for all members (Aadhaar / Driving License / Passport) — Mandatory",
      "Comfortable trekking shoes / sneakers with good grip and casual flip-flops",
      "Comfortable cotton clothes, light woollens/jackets for chilly mornings/evenings",
      "Small daypack (20–30L) for day tours and Mandalpatti Jeep trek",
      "Sun protection: Sunscreen (SPF 50+), sunglasses, and wide cap/hat",
      "Personal medications, basic first-aid, ORS / Glucose",
      "Power bank, camera, and charging cables",
      "Reusable water bottle",
      "Sufficient cash for local market shopping (coffee, spices, chocolates) and personal café orders"
    ],
    policies: [
      "Book your trip at least 30 days prior to the departure date to get confirmed train tickets.",
      "Booking Amount: ₹4,000/- advance per person (Non-refundable upon cancellation; transferable to another person or convertible to 3-month Travel Tribes credit).",
      "Pricing: Ex-Mangalore ₹8,499 | Ex-Mumbai Non-AC ₹9,499 | Ex-Mumbai 3AC ₹11,999 | Double Sharing Add-on ₹1,500 (+5% GST; ₹1,000/- extra on long weekends).",
      "Room Sharing: In triple/quad-sharing rooms, an extra mattress is provided.",
      "Trip Authority: The trip leader has all rights to alter/skip sightseeing if emergencies, acts of God, or unfavorable weather occur.",
      "Discipline & Alignment: Participants should coordinate, be disciplined, and align together as a team during the trip.",
      "Punctuality: Any delay at particular sightseeing spots by participants may result in the cancellation of further sightseeing.",
      "Safety: Safety is a top priority; however, organizers are not liable for individual severe injuries or fatal events.",
      "Harassment: Travel Tribes strictly stands against any form of harassment.",
      "Vehicle & Hill Driving: AC may not be operated in hilly regions. Point-to-point vehicle usage only.",
      "Cancellation 10–30 days prior: 25% deduction on remaining balance.",
      "Cancellation 8–10 days prior: 50% deduction on remaining balance.",
      "Cancellation 6–8 days prior: 70% deduction on remaining balance.",
      "Cancellation 3–6 days prior: 90% deduction on remaining balance.",
      "Cancellation < 2 days / No-Show: 100% deduction (No refund for unused services).",
      "Company Cancellation: 100% full refund within 4–7 business days if the trip is cancelled by the operator."
    ],
    pricingOptions: [
      { label: 'Ex-Mangalore (Mangalore to Mangalore)', price: '₹8,499 / person' },
      { label: 'Ex-Mumbai (Non-AC Sleeper Train)', price: '₹9,499 / person' },
      { label: 'Ex-Mumbai (3AC Train Ticket)', price: '₹11,999 / person' },
      { label: 'Add-On (Double Sharing Room)', price: '+₹1,500 / person' },
      { label: 'New Year / Festive Batch Special', price: '₹9,999 / person', note: 'Applicable on Christmas & New Year batches' }
    ],
    bookingAmount: '₹4,000 / person',
    reviews: [
      {
        name: 'Snigdha More',
        detail: 'First Solo Trip',
        rating: 5,
        quote: 'Chooses Travel tribes for my first solo trip to coorg and glad I went with them. They handled the trip from tickets, covering points even changing itenrary when required as per our preference. Adil was very helpful and involved throughout and always part of the group. The team handled trip very smoothly. They not just covered the points for the sake of it, but also looked into the ice breaking and involvement sessions which made the solo travellers bonding with others strong. So though we came as strangers, we left as family.'
      },
      {
        name: 'Gauravi More',
        rating: 5,
        quote: 'I recently went on a trip to Coorg, and honestly, it was incredibly well-managed. We were able to enjoy every single sightseeing point properly, without ever feeling rushed. The tour guide was very friendly and created a wonderful vibe throughout the journey. Thanks to the fun ice-breaking sessions and games, a group of strangers quickly felt like family. I would definitely travel with this agency again!! ❤️✨'
      },
      {
        name: 'Himani More',
        rating: 5,
        quote: 'Coorg was such a vibe! 🌿🫶🏻 Had a really fun and memorable trip with Travel Tribe. Everything was well managed, the coordination was smooth, and the group energy made the experience even better. From the beautiful views to all the random fun moments, it was the perfect little escape from the routine. 💚 Thank you, Travel Tribe & trip coordinator, for making the trip so enjoyable 🎀 Would definitely love to join another trip with you guys. 🏔️✨'
      },
      {
        name: 'Rutuja Kore',
        rating: 5,
        quote: 'It was really the awesome trip that I have ever experienced.🔥🔥the vibe,the arrangements,the stay everything was perfect and top notch .we didn\'t skip any places and visited each and every spot mentioned in iternery 😊😊and about the tour leader Adil, he was the best leader ever,he maintained the vibe, managed everything,guided us throughout,played ice breaking games with us and bcoz of him the vibe was maintained throughout. Thank you travel tribe for giving us such a beautiful and memorable experience. Bcoz of you the coorg has a special place in my heart ❤️ Thank you so much ❤️'
      },
      {
        name: 'Tejas Pangarikar',
        rating: 5,
        quote: 'Had a really great experience with Travel Tribe! Definitely one of the best options for solo travellers. Everything was well planned and the team was super friendly and helpful throughout the trip. The best part was meeting new people, making friends, and enjoying the whole trip together. If you’re travelling solo and want a fun, hassle-free experience, I’d definitely recommend Travel Tribe! 🌍✨'
      },
      {
        name: 'Swaranjali Teli',
        rating: 5,
        quote: 'Had an amazing Coorg trip with Travel Tribes! 🌿✨ Everything was well planned and experience was truly memorable. A special thanks to Jatin and Prem for being such amazing leaders, energetic and making sure everyone had a great time.'
      },
      {
        name: 'Shruti Thakur',
        rating: 5,
        quote: 'I had such a great time in Coorg! The trip was full of fun, beautiful places, and good memories. Big thanks to Prem and Jatin for coordinating everything so well and being super supportive throughout. Really enjoyed the whole experience!'
      }
    ]
  },
  {
    slug: 'udaipur-backpacking',
    title: 'Udaipur Backpacking Trip',
    location: 'Udaipur · Lake Pichola · Fateh Sagar · Bahubali Hills',
    region: 'Domestic',
    date: 'Nov 20–24, 2026',
    dates: [
      'Nov 20–24, 2026',
      'Dec 23–27, 2026 (Christmas Weekend)',
      'Dec 29–Jan 02, 2027 (New Year Special)'
    ],
    duration: '4N/5D',
    price: '₹9,999',
    image: '/image/Udaipur/udaipur_img.JPEG',
    alt: 'Majestic City Palace overlooking Lake Pichola in Udaipur',
    tag: 'City of Lakes',
    description: 'Looking for a Udaipur trip from Mumbai, a Udaipur backpacking trip, or a fun Udaipur group trip with strangers? Join Travel Tribes for a 5-day backpacking adventure to the City of Lakes — Udaipur. Explore magnificent palaces, beautiful lakes, historic ghats, vibrant markets, cultural performances and some of the best viewpoints in the city. From City Palace and Lake Pichola to Sajjangarh Monsoon Palace sunset, Bahubali Hills sunrise, Karni Mata ropeway, Bagore Ki Haveli show and street-food trails. Come solo. Meet strangers. Explore Udaipur. Find your tribe.',
    spots: '7 spots left',
    gallery: [
      { image: "/image/Udaipur/udaipur_img.JPEG", alt: "Udaipur City of Lakes — Main Highlight & Scenic View" },
      { image: "/image/Udaipur/20241201_210230_847B8D.jpeg", alt: "Udaipur City of Lakes Community Trip & Sightseeing" },
      { image: "/image/Udaipur/20251004_154020_2174BD.jpeg", alt: "Udaipur City of Lakes Community Trip & Sightseeing" },
      { image: "/image/Udaipur/20251004_154020_243CFA.jpeg", alt: "Udaipur City of Lakes Community Trip & Sightseeing" },
      { image: "/image/Udaipur/20251004_154059_2897E1.jpeg", alt: "Udaipur City of Lakes Community Trip & Sightseeing" },
      { image: "/image/Udaipur/20251005_190539_2B20DD.jpeg", alt: "Udaipur City of Lakes Community Trip & Sightseeing" },
      { image: "/image/Udaipur/20251005_190843_256EF0.jpeg", alt: "Udaipur City of Lakes Community Trip & Sightseeing" },
      { image: "/image/Udaipur/20251005_190843_269DAE.jpeg", alt: "Udaipur City of Lakes Community Trip & Sightseeing" },
      { image: "/image/Udaipur/20251116_005822_D5B67F.jpeg", alt: "Udaipur City of Lakes Community Trip & Sightseeing" },
      { image: "/image/Udaipur/20251116_194013_D84D79.jpeg", alt: "Udaipur City of Lakes Community Trip & Sightseeing" },
      { image: "/image/Udaipur/20251117_073846_DFCB14.jpeg", alt: "Udaipur City of Lakes Community Trip & Sightseeing" },
      { image: "/image/Udaipur/20251117_092723_D9AA17.jpeg", alt: "Udaipur City of Lakes Community Trip & Sightseeing" },
      { image: "/image/Udaipur/20251117_092855_D586AB.jpeg", alt: "Udaipur City of Lakes Community Trip & Sightseeing" },
      { image: "/image/Udaipur/20251117_115904_D3F3E1.jpeg", alt: "Udaipur City of Lakes Community Trip & Sightseeing" },
      { image: "/image/Udaipur/20251117_115904_D4F3BE.jpeg", alt: "Udaipur City of Lakes Community Trip & Sightseeing" },
      { image: "/image/Udaipur/20251117_115904_D87B5F.jpeg", alt: "Udaipur City of Lakes Community Trip & Sightseeing" },
      { image: "/image/Udaipur/F7005D37-51F4-4368-B7E7-4DF7EF9EB13A.jpg", alt: "Udaipur City of Lakes Community Trip & Sightseeing" },
      { image: "/image/Udaipur/IMG_0424.JPG", alt: "Udaipur City of Lakes Community Trip & Sightseeing" },
      { image: "/image/Udaipur/IMG_0878.JPG", alt: "Udaipur City of Lakes Community Trip & Sightseeing" },
      { image: "/image/Udaipur/IMG_1015.JPEG", alt: "Udaipur City of Lakes Community Trip & Sightseeing" },
      { image: "/image/Udaipur/IMG_1019.JPEG", alt: "Udaipur City of Lakes Community Trip & Sightseeing" },
      { image: "/image/Udaipur/IMG_1020.JPEG", alt: "Udaipur City of Lakes Community Trip & Sightseeing" },
      { image: "/image/Udaipur/IMG_1067.JPEG", alt: "Udaipur City of Lakes Community Trip & Sightseeing" },
      { image: "/image/Udaipur/IMG_1076.JPEG", alt: "Udaipur City of Lakes Community Trip & Sightseeing" },
      { image: "/image/Udaipur/IMG_1087.JPEG", alt: "Udaipur City of Lakes Community Trip & Sightseeing" },
      { image: "/image/Udaipur/IMG_1111.JPEG", alt: "Udaipur City of Lakes Community Trip & Sightseeing" },
      { image: "/image/Udaipur/IMG_1132.JPEG", alt: "Udaipur City of Lakes Community Trip & Sightseeing" },
      { image: "/image/Udaipur/IMG_1148.JPEG", alt: "Udaipur City of Lakes Community Trip & Sightseeing" },
      { image: "/image/Udaipur/IMG_1152.JPEG", alt: "Udaipur City of Lakes Community Trip & Sightseeing" },
      { image: "/image/Udaipur/IMG_1241.JPEG", alt: "Udaipur City of Lakes Community Trip & Sightseeing" },
      { image: "/image/Udaipur/IMG_1258.JPEG", alt: "Udaipur City of Lakes Community Trip & Sightseeing" },
      { image: "/image/Udaipur/IMG_1288.JPEG", alt: "Udaipur City of Lakes Community Trip & Sightseeing" },
      { image: "/image/Udaipur/IMG_1310.JPEG", alt: "Udaipur City of Lakes Community Trip & Sightseeing" },
      { image: "/image/Udaipur/IMG_1353.JPEG", alt: "Udaipur City of Lakes Community Trip & Sightseeing" },
      { image: "/image/Udaipur/IMG_1507.JPG", alt: "Udaipur City of Lakes Community Trip & Sightseeing" },
      { image: "/image/Udaipur/IMG_1667.JPG", alt: "Udaipur City of Lakes Community Trip & Sightseeing" },
      { image: "/image/Udaipur/IMG_2132.JPEG", alt: "Udaipur City of Lakes Community Trip & Sightseeing" },
      { image: "/image/Udaipur/IMG_2165.JPEG", alt: "Udaipur City of Lakes Community Trip & Sightseeing" },
      { image: "/image/Udaipur/IMG_3363.JPEG", alt: "Udaipur City of Lakes Community Trip & Sightseeing" },
      { image: "/image/Udaipur/IMG_3857.JPG", alt: "Udaipur City of Lakes Community Trip & Sightseeing" },
      { image: "/image/Udaipur/IMG_3859.jpg", alt: "Udaipur City of Lakes Community Trip & Sightseeing" },
      { image: "/image/Udaipur/IMG_3878.jpg", alt: "Udaipur City of Lakes Community Trip & Sightseeing" },
      { image: "/image/Udaipur/IMG_3892.jpg", alt: "Udaipur City of Lakes Community Trip & Sightseeing" },
      { image: "/image/Udaipur/IMG_4001.JPG", alt: "Udaipur City of Lakes Community Trip & Sightseeing" },
      { image: "/image/Udaipur/IMG_4003.JPG", alt: "Udaipur City of Lakes Community Trip & Sightseeing" },
      { image: "/image/Udaipur/IMG_4007.JPG", alt: "Udaipur City of Lakes Community Trip & Sightseeing" },
      { image: "/image/Udaipur/IMG_4010.JPG", alt: "Udaipur City of Lakes Community Trip & Sightseeing" },
      { image: "/image/Udaipur/IMG_6202.JPEG", alt: "Udaipur City of Lakes Community Trip & Sightseeing" },
      { image: "/image/Udaipur/IMG_6206.JPEG", alt: "Udaipur City of Lakes Community Trip & Sightseeing" },
      { image: "/image/Udaipur/IMG_6246.JPEG", alt: "Udaipur City of Lakes Community Trip & Sightseeing" },
      { image: "/image/Udaipur/IMG_6253.JPEG", alt: "Udaipur City of Lakes Community Trip & Sightseeing" },
      { image: "/image/Udaipur/IMG_6257.JPEG", alt: "Udaipur City of Lakes Community Trip & Sightseeing" },
      { image: "/image/Udaipur/IMG_6260.JPEG", alt: "Udaipur City of Lakes Community Trip & Sightseeing" },
      { image: "/image/Udaipur/IMG_6276.JPEG", alt: "Udaipur City of Lakes Community Trip & Sightseeing" },
      { image: "/image/Udaipur/IMG_6291.JPEG", alt: "Udaipur City of Lakes Community Trip & Sightseeing" },
      { image: "/image/Udaipur/IMG_6297.JPEG", alt: "Udaipur City of Lakes Community Trip & Sightseeing" },
      { image: "/image/Udaipur/IMG_6338.JPEG", alt: "Udaipur City of Lakes Community Trip & Sightseeing" },
      { image: "/image/Udaipur/IMG_6348.JPEG", alt: "Udaipur City of Lakes Community Trip & Sightseeing" },
      { image: "/image/Udaipur/IMG_6362.JPEG", alt: "Udaipur City of Lakes Community Trip & Sightseeing" },
      { image: "/image/Udaipur/IMG_7273.JPEG", alt: "Udaipur City of Lakes Community Trip & Sightseeing" },
      { image: "/image/Udaipur/IMG_7299.JPEG", alt: "Udaipur City of Lakes Community Trip & Sightseeing" },
      { image: "/image/Udaipur/IMG_7396.JPEG", alt: "Udaipur City of Lakes Community Trip & Sightseeing" },
      { image: "/image/Udaipur/IMG_7418.JPEG", alt: "Udaipur City of Lakes Community Trip & Sightseeing" },
      { image: "/image/Udaipur/IMG_7435.JPEG", alt: "Udaipur City of Lakes Community Trip & Sightseeing" },
      { image: "/image/Udaipur/IMG_7454.JPEG", alt: "Udaipur City of Lakes Community Trip & Sightseeing" },
      { image: "/image/Udaipur/IMG_7484.JPEG", alt: "Udaipur City of Lakes Community Trip & Sightseeing" },
      { image: "/image/Udaipur/IMG_7505.JPEG", alt: "Udaipur City of Lakes Community Trip & Sightseeing" },
      { image: "/image/Udaipur/IMG_7578.JPEG", alt: "Udaipur City of Lakes Community Trip & Sightseeing" },
      { image: "/image/Udaipur/IMG_7591.JPEG", alt: "Udaipur City of Lakes Community Trip & Sightseeing" },
      { image: "/image/Udaipur/IMG_7680.JPG", alt: "Udaipur City of Lakes Community Trip & Sightseeing" },
      { image: "/image/Udaipur/IMG_8534.JPEG", alt: "Udaipur City of Lakes Community Trip & Sightseeing" },
      { image: "/image/Udaipur/IMG_8901.JPEG", alt: "Udaipur City of Lakes Community Trip & Sightseeing" },
      { image: "/image/Udaipur/IMG_8911.JPEG", alt: "Udaipur City of Lakes Community Trip & Sightseeing" },
      { image: "/image/Udaipur/IMG_8919.JPEG", alt: "Udaipur City of Lakes Community Trip & Sightseeing" }
    ],
    highlights: [
      "City Palace with stunning Lake Pichola views.",
      "Boat ride to Jag Mandir Palace on Lake Pichola.",
      "Explore serene Fateh Sagar Lake.",
      "Sunset at Sajjangarh Monsoon Palace.",
      "Experience the Bagore Ki Haveli cultural dance & puppet show.",
      "Explore Gangore Ghat & Ambrai Ghat.",
      "Visit historic 17th-century Jagdish Temple.",
      "Explore the beautiful Saheliyon-ki-Bari gardens.",
      "Experience the Karni Mata cable car / ropeway ride.",
      "Catch the breathtaking sunrise at Bahubali Hills.",
      "Explore Hathipole & Bada Bazaar markets.",
      "Experience a local Rajasthani street-food trail (Pyaz Kachori, Poha, Rabdi & more).",
      "Explore vibrant lakeside cafés.",
      "Meet fellow travellers through the Travel Tribes community experience."
    ],
    itinerary: [
      {
        day: 1,
        title: 'Mumbai to Udaipur | The Journey Begins 🚂',
        activities: [
          "Hello, fellow backpackers! Begin your journey from Mumbai to Udaipur by train.",
          "Train: 22901 – BDTS UDZ SF Exp (Bandra Terminus: 11:25 PM, Borivali: 11:52 PM).",
          "Let's have a fantastic journey with ice-breaking games, stories, music, and lots of fun! Let the journey begin!",
          "Meals: Not Included on the train."
        ]
      },
      {
        day: 2,
        title: 'Fateh Sagar Lake, Bagore Ki Haveli, Gangore & Ambrai Ghats 🌊💃',
        activities: [
          "Upon reaching Udaipur in the afternoon, check in to the stay.",
          "Have a delicious lunch and freshen up.",
          "By evening, immerse yourself in the serene ambiance of Fateh Sagar Lake and witness an enchanting sunset.",
          "Later, watch a captivating cultural dance and puppet show at Bagore Ki Haveli.",
          "Explore Gangore Ghat and enjoy the magical illuminated evening ambiance at Ambrai Ghat.",
          "Explore lakeside cafés for dinner and relaxing time with your tribe.",
          "Meals: Lunch included."
        ]
      },
      {
        day: 3,
        title: 'City Palace, Jag Mandir & Sajjangarh Monsoon Palace 🏰🌅',
        activities: [
          "Begin your day with a guided tour of the magnificent City Palace — a captivating blend of Mughal and Rajasthani architecture.",
          "Get to know the rich royal history and take in stunning views of Lake Pichola.",
          "Next, immerse yourself in the serene ambiance of Jag Mandir Palace via boat ride on Lake Pichola.",
          "As the day winds down, head to Sajjangarh Fort (Monsoon Palace) perched on a hilltop for a breathtaking panoramic sunset.",
          "Enjoy dinner at a rooftop lakeside café, return to the stay, and relax with your fellow travellers.",
          "Meals: Breakfast included."
        ]
      },
      {
        day: 4,
        title: 'Bahubali Hills Sunrise, Karni Mata Ropeway & Udaipur Bazaars 🌄🚡',
        activities: [
          "Get up early to catch a glorious sunrise over the tranquil waters at Bahubali Hills.",
          "Return to the stay, freshen up, check out, and have breakfast.",
          "Visit Karni Mata Temple via Ropeway for 360° panoramic city views.",
          "Explore Saheliyon-ki-Bari — the beautiful royal garden built for queens with marble fountains and lotus pools.",
          "In the afternoon, explore Hathipole and Bada Bazaar markets — indulge in street food (Pyaz Kachori, Poha, Rabdi) and shop for souvenirs.",
          "In the evening, board your return train (22902 – UDZ BDTS SF Exp) back towards Mumbai.",
          "Meals: Breakfast included."
        ]
      },
      {
        day: 5,
        title: 'Back to Mumbai with Royal Memories 🏠',
        activities: [
          "Returning home with cherished memories and countless pictures to look back at.",
          "Relive the joy of all the fun experiences we had on this incredible trip.",
          "Promise to stay in touch and plan more adventures together.",
          "Meals: Not Included."
        ]
      }
    ],
    inclusions: [
      "2-night hotel stay on Triple / Quad sharing basis",
      "Train from Mumbai and back in 3AC or Non-AC Sleeper (Confirmed or RAC)",
      "Internal transfers as per the itinerary",
      "3 Meals: 1 Lunch (Day 2) & 2 Breakfasts (Day 3 & Day 4)",
      "Bahubali Hill sunrise excursion",
      "Entry Fees & Local Charges at: City Palace, Bagore Ki Haveli, Saheliyon Ki Bari",
      "Travel Tribes Trip Captain cum friend to assist you with the best service throughout the trip"
    ],
    exclusions: [
      "Train meals are not included",
      "Lunch throughout the trip (except Day 2 Lunch)",
      "Personal expenses and shopping",
      "Any extra railway cost and train food",
      "Tatkal ticket charges, if applicable",
      "Any personal expense like tips to driver, entry to monuments, camera/video camera charges, laundry, telephone bills, etc.",
      "Any cost arising due to natural calamities like landslides, roadblocks, etc. to be borne directly by the customer on the spot",
      "Optional boating charges at Fateh Sagar Lake & Lake Pichola (Jag Mandir)",
      "GST 5%"
    ],
    thingsToCarry: [
      "Valid Government Photo ID for all members (Aadhaar / Driving License / Passport) — Mandatory",
      "Comfortable walking / trekking shoes and sandals",
      "Comfortable cotton clothing and smart casuals for photography",
      "Light sweater or jacket for cooler evenings / early mornings",
      "Sun protection: Sunscreen (SPF 50+), sunglasses, and wide cap/hat",
      "Personal medications, basic first-aid, ORS / Glucose",
      "Power bank, camera, and charging cables",
      "Reusable water bottle",
      "Sufficient cash for local bazaar shopping (handicrafts, juttis) and street food"
    ],
    policies: [
      "Book your trip at least 30 days prior to the departure date to get confirmed train tickets.",
      "Booking Amount: ₹4,000/- advance per person (Non-refundable upon cancellation; transferable to another person or convertible to 3-month Travel Tribes credit).",
      "Pricing: Ex-Mumbai Non-AC ₹9,999 | Ex-Mumbai 3AC ₹11,999 | Double Sharing Add-on ₹1,000 (+5% GST).",
      "Room Sharing: In triple/quad-sharing rooms, an extra mattress is provided.",
      "Trip Authority: The trip leader has all rights to alter/skip sightseeing if emergencies, acts of God, or unfavorable weather occur.",
      "Discipline & Alignment: Participants should coordinate, be disciplined, and align together as a team during the trip.",
      "Punctuality: Any delay at particular sightseeing spots by participants may result in the cancellation of further sightseeing.",
      "Safety: Safety is a top priority; however, organizers are not liable for individual severe injuries or fatal events.",
      "Harassment: Travel Tribes strictly stands against any form of harassment.",
      "Cancellation 10–30 days prior: 25% deduction on remaining balance.",
      "Cancellation 8–10 days prior: 50% deduction on remaining balance.",
      "Cancellation 6–8 days prior: 70% deduction on remaining balance.",
      "Cancellation 3–6 days prior: 90% deduction on remaining balance.",
      "Cancellation < 2 days / No-Show: 100% deduction (No refund for unused services).",
      "Company Cancellation: 100% full refund within 4–7 business days if the trip is cancelled by the operator."
    ],
    pricingOptions: [
      { label: 'Mumbai to Mumbai (Non-AC Train)', price: '₹9,999 / person' },
      { label: 'Mumbai to Mumbai (3AC Train)', price: '₹11,999 / person' },
      { label: 'Add-On (Double Sharing Room)', price: '+₹1,000 / person' },
      { label: 'New Year / Festive Batch Special', price: '₹10,999 / person', note: 'Applicable on Christmas & New Year batches' }
    ],
    bookingAmount: '₹4,000 / person',
    reviews: [
      {
        name: 'Anushree',
        detail: 'Girls Trip',
        rating: 5,
        quote: 'Superb experience!!! we went to udaipur recently with travel tribes it was our first trip with them, and that too a girls trip, we were very skeptical to go on a girls trip with a bunch of strangers but the hosts made us feel so much at home. All i can say is its gonna be an experience you remember for a life time 10/10 recommended ♥️'
      },
      {
        name: 'Mansi Sinha',
        rating: 5,
        quote: 'One of the best travel experiences I’ve had so far, especially compared to other travel companies I’ve travelled with! ❤️ What I loved most was how flexible and thoughtfully planned the itinerary was. It wasn’t hellishly packed, yet we managed to cover so much without ever feeling rushed. The way Adil & Aarjoo manages to pull everything together so effortlessly is truly wonderful. It was an absolutely memorable experience, and I’m already looking forward to planning my next trip with them! ✨ Thank you, Travel Tribes, for making Udaipur so beautiful and memorable. 💛'
      },
      {
        name: 'Vindu Pal',
        rating: 5,
        quote: 'Really enjoyed my Udaipur trip with travel tribe. The overall experience was very good, the arrangements were well managed, and the trip was comfortable and enjoyable. Adil and Arzoo were really helpful and cooperative throughout. Had a great time exploring Udaipur and making some lovely memories. Definitely recommended for anyone planning a trip! 😊'
      },
      {
        name: 'Kajal Rambhia',
        detail: 'Solo Traveller',
        rating: 5,
        quote: 'I planned two trips with Travel Tribes and both of these were the best trips of my life! The vibe is amazing. New friends, new places, new experiences - truly positive, safe, comfortable and memorable. Especially the Udaipur trip... I travelled SOLO! What fun and memories!!'
      },
      {
        name: 'Ankita Iyer',
        rating: 5,
        quote: 'Udaipur is seriously one of those places that looks even better in real life! 🥹 The sunset by the lake was unreal and the sunrise from Bahubali Hills was 100% worth waking up early for. 🌅 Travel Tribes planned the trip really well and our trip leader made the whole experience even better. Loved every bit of it!'
      },
      {
        name: 'Kunal Jadhav',
        rating: 5,
        quote: 'Still not over this Udaipur trip! 😭❤️ The lakeside sunset was straight out of a movie and Bahubali Hills at sunrise was just WOW. The itinerary was really well planned, stay and food were good, and our trip leader was amazing. Such a wholesome group trip!'
      },
      {
        name: 'Ankita Patil',
        rating: 5,
        quote: 'Had such a good time in Udaipur! The city is gorgeous, especially during sunset by the lake. The sunrise at Bahubali Hills was honestly worth waking up early for. 😭🌅 Travel Tribes handled everything really well and our trip leader was super helpful and fun. Definitely coming back for another trip!'
      },
      {
        name: 'Vipul Choube',
        rating: 5,
        quote: 'Udaipur was SUCH a vibe! 🥹🌅 Sunset by the lake, sunrise at Bahubali Hills, beautiful streets and the whole city just hits different. Travel Tribes made it even better — everything was sorted and our trip leader was a total W. Would 100% do this trip again!'
      }
    ]
  },
  {
    slug: 'spiti-valley-chandrataal',
    title: 'Spiti Valley with Chandrataal',
    location: 'Chitkul · Tabo · Kaza · Chandrataal · Manali',
    region: 'Domestic',
    date: 'Jun 12–20, 2027',
    duration: '8N/9D',
    price: '₹18,999',
    image: '/image/Spiti/spiti_img.JPEG',
    alt: 'High-altitude Himalayan desert and snow peaks of Spiti Valley',
    tag: 'Himalayan Expedition',
    description: 'Looking for a Spiti Valley trip from Delhi, a Spiti backpacking trip, or an unforgettable Spiti Valley group trip? Travel Tribes takes you on an epic Himalayan road trip through Shimla, Chitkul, Tabo, Dhankar, Kaza, Langza, Hikkim, Komic, Kibber, Chicham Bridge, Chandrataal and Manali. From remote villages and ancient monasteries to stargazing by Chandrataal Lake and Old Manali cafés. Come solo. Meet strangers. Explore Spiti. Leave with a tribe.',
    spots: '5 spots left',
    gallery: [
      { image: "/image/Spiti/spiti_img.JPEG", alt: "Spiti Valley with Chandrataal — Main Highlight & Scenic View" },
      { image: "/image/Spiti/20241021_134930_DE4130.jpeg", alt: "Spiti Valley with Chandrataal Community Trip & Sightseeing" },
      { image: "/image/Spiti/20241021_141105_DE01D1.jpeg", alt: "Spiti Valley with Chandrataal Community Trip & Sightseeing" },
      { image: "/image/Spiti/20241021_175648_D27479.jpeg", alt: "Spiti Valley with Chandrataal Community Trip & Sightseeing" },
      { image: "/image/Spiti/20241021_181120_D69BC4.jpeg", alt: "Spiti Valley with Chandrataal Community Trip & Sightseeing" },
      { image: "/image/Spiti/20241021_192612_DD3A38.jpeg", alt: "Spiti Valley with Chandrataal Community Trip & Sightseeing" },
      { image: "/image/Spiti/20241021_192612_DE6C40.jpeg", alt: "Spiti Valley with Chandrataal Community Trip & Sightseeing" },
      { image: "/image/Spiti/20241021_194431_D67541.jpeg", alt: "Spiti Valley with Chandrataal Community Trip & Sightseeing" },
      { image: "/image/Spiti/20241021_200517_D1A652.jpeg", alt: "Spiti Valley with Chandrataal Community Trip & Sightseeing" },
      { image: "/image/Spiti/20241021_200540_D98AB8.jpeg", alt: "Spiti Valley with Chandrataal Community Trip & Sightseeing" },
      { image: "/image/Spiti/20241021_200540_DEADEB.jpeg", alt: "Spiti Valley with Chandrataal Community Trip & Sightseeing" },
      { image: "/image/Spiti/20241021_201038_D841DB.jpeg", alt: "Spiti Valley with Chandrataal Community Trip & Sightseeing" },
      { image: "/image/Spiti/20241021_201038_DE8C72.jpeg", alt: "Spiti Valley with Chandrataal Community Trip & Sightseeing" },
      { image: "/image/Spiti/20241023_192435_DF28A8.jpeg", alt: "Spiti Valley with Chandrataal Community Trip & Sightseeing" },
      { image: "/image/Spiti/20241025_115041_D6C91D.jpeg", alt: "Spiti Valley with Chandrataal Community Trip & Sightseeing" },
      { image: "/image/Spiti/20250110_154329_88A2CE.jpeg", alt: "Spiti Valley with Chandrataal Community Trip & Sightseeing" },
      { image: "/image/Spiti/20250110_154342_88BF4D.jpeg", alt: "Spiti Valley with Chandrataal Community Trip & Sightseeing" },
      { image: "/image/Spiti/20250110_154344_8A75EE.jpeg", alt: "Spiti Valley with Chandrataal Community Trip & Sightseeing" },
      { image: "/image/Spiti/20250110_154507_844C81.jpeg", alt: "Spiti Valley with Chandrataal Community Trip & Sightseeing" },
      { image: "/image/Spiti/20250110_154840_88D013.jpeg", alt: "Spiti Valley with Chandrataal Community Trip & Sightseeing" },
      { image: "/image/Spiti/20250110_154841_8079AD.jpeg", alt: "Spiti Valley with Chandrataal Community Trip & Sightseeing" },
      { image: "/image/Spiti/20250110_155331_8BF02C.jpeg", alt: "Spiti Valley with Chandrataal Community Trip & Sightseeing" },
      { image: "/image/Spiti/20250110_161203_82E076.jpeg", alt: "Spiti Valley with Chandrataal Community Trip & Sightseeing" },
      { image: "/image/Spiti/20250110_161645_87218F.jpeg", alt: "Spiti Valley with Chandrataal Community Trip & Sightseeing" },
      { image: "/image/Spiti/20250110_161941_8E27C2.jpeg", alt: "Spiti Valley with Chandrataal Community Trip & Sightseeing" },
      { image: "/image/Spiti/20250110_162802_823AC0.jpeg", alt: "Spiti Valley with Chandrataal Community Trip & Sightseeing" },
      { image: "/image/Spiti/20250110_162802_88500D.jpeg", alt: "Spiti Valley with Chandrataal Community Trip & Sightseeing" },
      { image: "/image/Spiti/20250110_162908_850E9E.jpeg", alt: "Spiti Valley with Chandrataal Community Trip & Sightseeing" },
      { image: "/image/Spiti/20250110_162911_8FD291.jpeg", alt: "Spiti Valley with Chandrataal Community Trip & Sightseeing" },
      { image: "/image/Spiti/20250110_162922_83C2C6.jpeg", alt: "Spiti Valley with Chandrataal Community Trip & Sightseeing" },
      { image: "/image/Spiti/409510d4-1e8a-43d3-a747-fb0a9ffc09b7.jpg", alt: "Spiti Valley with Chandrataal Community Trip & Sightseeing" },
      { image: "/image/Spiti/41f1d386-870b-46d5-8436-ade3caac5c64.jpg", alt: "Spiti Valley with Chandrataal Community Trip & Sightseeing" },
      { image: "/image/Spiti/61c09245-22ff-44b2-a488-3025b8aeb94b.jpg", alt: "Spiti Valley with Chandrataal Community Trip & Sightseeing" },
      { image: "/image/Spiti/666e3045-652e-4876-8084-cd2111d6c349_Original.JPEG", alt: "Spiti Valley with Chandrataal Community Trip & Sightseeing" },
      { image: "/image/Spiti/7038e44b-4591-4892-85d6-789cc11c61db.jpg", alt: "Spiti Valley with Chandrataal Community Trip & Sightseeing" },
      { image: "/image/Spiti/84644681-a30f-4618-b194-216d777bbab0.jpg", alt: "Spiti Valley with Chandrataal Community Trip & Sightseeing" },
      { image: "/image/Spiti/85bce403-7f83-4560-84e8-45ab3fbd43ca.jpg", alt: "Spiti Valley with Chandrataal Community Trip & Sightseeing" },
      { image: "/image/Spiti/d1678a9a-97d1-4239-9d43-02d42413c3ae.jpg", alt: "Spiti Valley with Chandrataal Community Trip & Sightseeing" },
      { image: "/image/Spiti/d825b113-5a4c-4d08-bf4f-7e37e568281c.jpg", alt: "Spiti Valley with Chandrataal Community Trip & Sightseeing" },
      { image: "/image/Spiti/IMG_4969.JPEG", alt: "Spiti Valley with Chandrataal Community Trip & Sightseeing" },
      { image: "/image/Spiti/IMG_4971.JPEG", alt: "Spiti Valley with Chandrataal Community Trip & Sightseeing" },
      { image: "/image/Spiti/IMG_4993.JPEG", alt: "Spiti Valley with Chandrataal Community Trip & Sightseeing" },
      { image: "/image/Spiti/IMG_5065.JPEG", alt: "Spiti Valley with Chandrataal Community Trip & Sightseeing" },
      { image: "/image/Spiti/IMG_5120.JPEG", alt: "Spiti Valley with Chandrataal Community Trip & Sightseeing" },
      { image: "/image/Spiti/IMG_5129.JPEG", alt: "Spiti Valley with Chandrataal Community Trip & Sightseeing" },
      { image: "/image/Spiti/IMG_5149.JPEG", alt: "Spiti Valley with Chandrataal Community Trip & Sightseeing" },
      { image: "/image/Spiti/IMG_5152.JPEG", alt: "Spiti Valley with Chandrataal Community Trip & Sightseeing" },
      { image: "/image/Spiti/IMG_5271.JPEG", alt: "Spiti Valley with Chandrataal Community Trip & Sightseeing" },
      { image: "/image/Spiti/IMG_5323.JPEG", alt: "Spiti Valley with Chandrataal Community Trip & Sightseeing" },
      { image: "/image/Spiti/IMG_5385.JPEG", alt: "Spiti Valley with Chandrataal Community Trip & Sightseeing" },
      { image: "/image/Spiti/IMG_5430.JPEG", alt: "Spiti Valley with Chandrataal Community Trip & Sightseeing" },
      { image: "/image/Spiti/IMG_5431.JPEG", alt: "Spiti Valley with Chandrataal Community Trip & Sightseeing" },
      { image: "/image/Spiti/IMG_5432.JPEG", alt: "Spiti Valley with Chandrataal Community Trip & Sightseeing" },
      { image: "/image/Spiti/IMG_5444.JPEG", alt: "Spiti Valley with Chandrataal Community Trip & Sightseeing" },
      { image: "/image/Spiti/IMG_5450.JPEG", alt: "Spiti Valley with Chandrataal Community Trip & Sightseeing" },
      { image: "/image/Spiti/IMG_5453_Original.JPEG", alt: "Spiti Valley with Chandrataal Community Trip & Sightseeing" },
      { image: "/image/Spiti/IMG_5483.jpg", alt: "Spiti Valley with Chandrataal Community Trip & Sightseeing" },
      { image: "/image/Spiti/IMG_5496.jpg", alt: "Spiti Valley with Chandrataal Community Trip & Sightseeing" },
      { image: "/image/Spiti/IMG_5559.JPEG", alt: "Spiti Valley with Chandrataal Community Trip & Sightseeing" },
      { image: "/image/Spiti/IMG_5565.jpg", alt: "Spiti Valley with Chandrataal Community Trip & Sightseeing" },
      { image: "/image/Spiti/IMG_5589.JPEG", alt: "Spiti Valley with Chandrataal Community Trip & Sightseeing" },
      { image: "/image/Spiti/IMG_5603.jpg", alt: "Spiti Valley with Chandrataal Community Trip & Sightseeing" },
      { image: "/image/Spiti/IMG_5645.JPEG", alt: "Spiti Valley with Chandrataal Community Trip & Sightseeing" },
      { image: "/image/Spiti/IMG_5667.jpg", alt: "Spiti Valley with Chandrataal Community Trip & Sightseeing" },
      { image: "/image/Spiti/IMG_7185.JPEG", alt: "Spiti Valley with Chandrataal Community Trip & Sightseeing" },
      { image: "/image/Spiti/IMG_7217.JPEG", alt: "Spiti Valley with Chandrataal Community Trip & Sightseeing" },
      { image: "/image/Spiti/IMG_7218.JPEG", alt: "Spiti Valley with Chandrataal Community Trip & Sightseeing" }
    ],
    highlights: [
      "Explore the spectacular high-altitude landscapes of Spiti Valley.",
      "Visit Chitkul — the last inhabited village before the Indo-China border.",
      "Enjoy Pahadon Wali Maggi by the pristine Baspa River.",
      "Explore the 1000-year-old ancient Tabo Monastery and meditation caves.",
      "Visit the dramatic cliffside Dhankar Monastery.",
      "Explore the iconic Key Monastery perched high on a hill.",
      "Cross Chicham Bridge — Asia's Highest Suspension Bridge.",
      "Send postcards from Hikkim — the world's highest post office.",
      "Visit Komic — one of the world's highest motorable villages.",
      "Explore Langza — India's fossil village with the giant Buddha statue.",
      "Spot snow leopards around Kibber Village (subject to season and luck).",
      "Experience the breathtaking crescent-shaped Chandrataal Lake.",
      "Camp at Chandrataal under the starlit Himalayan night sky.",
      "Explore the vibrant cafés, live music, and bohemian vibe of Old Manali.",
      "Meet fellow travellers through the Travel Tribes community experience."
    ],
    itinerary: [
      {
        day: 1,
        title: 'Delhi to Shimla | The Journey Begins 🚍',
        activities: [
          "Meet your fellow travellers in Delhi at Kashmiri Gate / R K Ashram.",
          "Board our Semi Sleeper AC Volvo bus for an overnight journey to Shimla starting at 8:00 PM.",
          "Get comfortable, introduce yourself to your tribe, and get ready for an epic Himalayan adventure.",
          "Meals: Not Included."
        ]
      },
      {
        day: 2,
        title: 'Shimla to Chitkul | The Last Indian Village 🏡',
        activities: [
          "Arrive in Shimla as the first light of day breaks, and the real mountain adventure begins!",
          "Hit the mountain roads in our Tempo Traveller, following the Sutlej River towards Kinnaur.",
          "Take a thrilling turn along the mesmerizing Baspa River towards Chitkul — the last inhabited village on the Indo-China border.",
          "Explore the wooden architecture, apple orchards, and peaceful mountain atmosphere of this remote village.",
          "Overnight stay and warm dinner in Chitkul / Sangla.",
          "Meals: Dinner included."
        ]
      },
      {
        day: 3,
        title: 'Chitkul to Tabo | Entering the Spiti Realm 🏔️',
        activities: [
          "Wake up in Chitkul and savor the flavors of hot 'pahadon wali maggi' by the serene Baspa River.",
          "Short exploration of Sangla village before continuing our journey into the dramatic moonscape terrain of Spiti Valley.",
          "Drive along the confluence of Spiti and Sutlej rivers at Khab, passing through Nako.",
          "Prepare for an overnight stay in Tabo, where ancient history and spiritual mystique await.",
          "Meals: Breakfast & Dinner included."
        ]
      },
      {
        day: 4,
        title: 'Tabo to Kaza via Dhankar Monastery 🛕',
        activities: [
          "Have a homely cooked breakfast and start the day exploring Tabo's ancient meditation caves.",
          "Visit the awe-inspiring, 1000-year-old Tabo Monastery (Ajanta of the Himalayas).",
          "Journey towards the ancient Dhankar Monastery perched dramatically on a high cliff with breathtaking valley views.",
          "Continue driving towards Kaza, the heart and cultural center of Spiti Valley.",
          "Reach Kaza, check in to your homestay, enjoy hot dinner, and rest.",
          "Meals: Breakfast & Dinner included."
        ]
      },
      {
        day: 5,
        title: 'Kaza, Key Monastery, Hikkim, Komic & Langza 📮🕉️',
        activities: [
          "After breakfast, explore the high-altitude marvels of Spiti Valley.",
          "Visit the iconic Key Monastery and cross Chicham Bridge (Asia's Highest Bridge).",
          "Head towards Hikkim (14,400 ft) to send postcards to your loved ones from the world's highest post office.",
          "Continue towards Komic (15,027 ft) — one of the highest motorable villages in the world.",
          "Explore Langza, known for its giant golden Buddha statue and rich marine fossils.",
          "Return to Kaza by evening for group dinner and restful overnight stay.",
          "Meals: Breakfast & Dinner included."
        ]
      },
      {
        day: 6,
        title: 'Kaza to Chandrataal Lake | Stargazing Campsite ⛺🌌',
        activities: [
          "After breakfast and check-out, drive towards the mesmerizing moon-lake — Chandrataal.",
          "Take a short halt at Losar (the last village of Spiti Valley) and traverse through high-altitude Kunzum Pass (14,931 ft).",
          "Reach Chandrataal campsite by evening and check in to your shared Swiss tents.",
          "Trek to the pristine crystal-clear turquoise waters of Chandrataal Lake.",
          "Enjoy dinner under the starlit sky and end the day with an unforgettable high-altitude camping experience.",
          "Meals: Breakfast & Dinner included."
        ]
      },
      {
        day: 7,
        title: 'Chandrataal to Manali via Atal Tunnel 🚗🌲',
        activities: [
          "Enjoy an early breakfast surrounded by crisp mountain air.",
          "Depart on a thrilling scenic drive through Batal, Chhatru, and the legendary Atal Tunnel towards Manali.",
          "Experience the dramatic transition from rugged barren Spiti terrain to lush green cedar valleys of Manali.",
          "Check in to your hotel in Manali and relax.",
          "In the evening, explore the charming cafés, live music, and vibrant atmosphere of Old Manali at your own pace.",
          "Return to hotel for group dinner and overnight stay.",
          "Meals: Breakfast & Dinner included."
        ]
      },
      {
        day: 8,
        title: 'Manali Exploration & Departure to Delhi 🛍️🚍',
        activities: [
          "Wake up to beautiful pine-covered mountain views and enjoy breakfast.",
          "Visit the ancient wooden Hadimba Devi Temple and take a stroll down bustling Mall Road.",
          "Explore the bohemian lanes, bakeries, and souvenir shops of Old Manali at leisure.",
          "In the evening, board your AC Volvo bus from Manali for the overnight return journey to Delhi.",
          "Meals: Breakfast included."
        ]
      },
      {
        day: 9,
        title: 'Back to Delhi with Lifetime Memories 🏠',
        activities: [
          "Reach Delhi in the morning by 8:00 AM.",
          "Return home with cherished memories of rugged Spiti passes, high-altitude monasteries, and starry camping nights.",
          "Carry back countless pictures, stories, and a lifelong bond with your new tribe.",
          "Meals: Not Included."
        ]
      }
    ],
    inclusions: [
      "Delhi to Shimla: AC Semi-Sleeper Volvo Bus",
      "Shimla to Kaza to Manali: Dedicated Tempo Traveller / SUV for entire circuit",
      "Manali to Delhi: AC Volvo Bus",
      "6 Nights Stay: 1N Hotel at Chitkul/Sangla, 1N Homestay at Tabo, 2N Homestay at Kaza, 1N Swiss Camp at Chandrataal, 1N Hotel at Manali",
      "12 Meals: 6 Breakfasts & 6 Dinners",
      "Experienced Travel Tribes Trip Captain & certified high-altitude mountain driver throughout the circuit"
    ],
    exclusions: [
      "Any food or beverage not included in package (alcoholic drinks, mineral water)",
      "Meals, refreshments, and lunches on highways / cafés",
      "Entry fees to monuments/monasteries and room heaters (if requested)",
      "Personal expenses (shopping, café visits in Old Manali, laundry, tips)",
      "Any cost arising due to unforeseen natural calamities (landslides, roadblocks, snow blockages, etc.)",
      "Expenses in Delhi (fresh-up, food, stay)",
      "GST 5%"
    ],
    thingsToCarry: [
      "Valid Government Photo ID (Aadhaar / Passport / Driving License) — Mandatory",
      "Heavy woollens, thermals (top & bottom), fleece jackets, windproof/waterproof down jacket",
      "Comfortable high-ankle trekking shoes with good grip + warm woollen socks",
      "Woollen cap / beanie, balaclava, neck gaiter, and insulated gloves",
      "UV protection sunglasses (essential for snow/high altitude) & high SPF 50+ sunscreen + lip balm",
      "Personal medical kit (Diamox for AMS, basic cold/fever meds, ORS, Band-Aids)",
      "Power banks (batteries drain fast in cold weather) and universal chargers",
      "Reusable insulated thermos water bottle",
      "Cash (ATMs in Kaza and remote Spiti are frequently non-operational)"
    ],
    policies: [
      "High Altitude & Acclimatization: Adequate hydration and rest are essential. Trip captain holds authority to adjust route if needed for safety.",
      "Booking Amount: ₹5,000/- advance per person (Non-refundable on cancellation; transferable to another person or convertible to 3-month Travel Tribes credit).",
      "Pricing: Triple Sharing ₹18,999 | Double Sharing ₹21,999 (+5% GST).",
      "Room Sharing: In triple-sharing rooms, an extra mattress is provided (standard in mountain homestays).",
      "Trip Authority: Trip leader has all rights to alter/skip spots in case of emergencies, roadblocks, landslides, or acts of God.",
      "Discipline & Punctuality: Team coordination is mandatory for high-altitude road journeys.",
      "Safety & Harassment: Travel Tribes strictly stands against any form of harassment.",
      "Vehicle in Hills: AC is not operated on mountain uphill terrain. Point-to-point vehicle usage only.",
      "Cancellation 10–30 days prior: 25% deduction on remaining balance.",
      "Cancellation 8–10 days prior: 50% deduction on remaining balance.",
      "Cancellation 6–8 days prior: 70% deduction on remaining balance.",
      "Cancellation 3–6 days prior: 90% deduction on remaining balance.",
      "Cancellation < 2 days / No-Show: 100% deduction (No refund).",
      "Operator Cancellation: 100% full refund within 4–7 business days if trip cancelled by operator."
    ],
    pricingOptions: [
      { label: 'Triple Sharing (Delhi to Delhi)', price: '₹18,999 / person' },
      { label: 'Double Sharing (Delhi to Delhi)', price: '₹21,999 / person' }
    ],
    bookingAmount: '₹5,000 / person'
  },
  {
    slug: 'spiti-winter-expedition',
    title: 'Spiti Valley Winter Expedition',
    location: 'Chitkul · Tabo · Kaza · Kalpa · Kinnaur',
    region: 'Domestic',
    date: 'Jan 16–24, 2027',
    duration: '8N/9D',
    price: '₹18,999',
    image: '/image/Spiti/spiti_img.JPEG',
    alt: 'Snow-covered winter wonderland of Spiti Valley and Key Monastery in white',
    tag: 'Winter Expedition',
    description: 'Snow-covered mountains, frozen landscapes, remote Himalayan villages, ancient monasteries and dramatic mountain roads — welcome to the Spiti Valley Winter Expedition. Travel from Delhi to Spiti Valley with Travel Tribes through Chitkul, Tabo, Kaza, Langza, Hikkim, Komic, Key Monastery, Chicham Bridge, Kibber Village, 500-year-old Gue Mummy, and the stunning snow views of Kalpa with Kinner Kailash peak. Come solo. Meet strangers. Explore Spiti in winter. Leave with a tribe.',
    spots: '4 spots left',
    gallery: [
      { image: "/image/Spiti/spiti_img.JPEG", alt: "Spiti Valley Winter Expedition — Main Highlight & Scenic View" },
      { image: "/image/Spiti/20241021_134930_DE4130.jpeg", alt: "Spiti Valley Winter Expedition Community Trip & Sightseeing" },
      { image: "/image/Spiti/20241021_141105_DE01D1.jpeg", alt: "Spiti Valley Winter Expedition Community Trip & Sightseeing" },
      { image: "/image/Spiti/20241021_175648_D27479.jpeg", alt: "Spiti Valley Winter Expedition Community Trip & Sightseeing" },
      { image: "/image/Spiti/20241021_181120_D69BC4.jpeg", alt: "Spiti Valley Winter Expedition Community Trip & Sightseeing" },
      { image: "/image/Spiti/20241021_192612_DD3A38.jpeg", alt: "Spiti Valley Winter Expedition Community Trip & Sightseeing" },
      { image: "/image/Spiti/20241021_192612_DE6C40.jpeg", alt: "Spiti Valley Winter Expedition Community Trip & Sightseeing" },
      { image: "/image/Spiti/20241021_194431_D67541.jpeg", alt: "Spiti Valley Winter Expedition Community Trip & Sightseeing" },
      { image: "/image/Spiti/20241021_200517_D1A652.jpeg", alt: "Spiti Valley Winter Expedition Community Trip & Sightseeing" },
      { image: "/image/Spiti/20241021_200540_D98AB8.jpeg", alt: "Spiti Valley Winter Expedition Community Trip & Sightseeing" },
      { image: "/image/Spiti/20241021_200540_DEADEB.jpeg", alt: "Spiti Valley Winter Expedition Community Trip & Sightseeing" },
      { image: "/image/Spiti/20241021_201038_D841DB.jpeg", alt: "Spiti Valley Winter Expedition Community Trip & Sightseeing" },
      { image: "/image/Spiti/20241021_201038_DE8C72.jpeg", alt: "Spiti Valley Winter Expedition Community Trip & Sightseeing" },
      { image: "/image/Spiti/20241023_192435_DF28A8.jpeg", alt: "Spiti Valley Winter Expedition Community Trip & Sightseeing" },
      { image: "/image/Spiti/20241025_115041_D6C91D.jpeg", alt: "Spiti Valley Winter Expedition Community Trip & Sightseeing" },
      { image: "/image/Spiti/20250110_154329_88A2CE.jpeg", alt: "Spiti Valley Winter Expedition Community Trip & Sightseeing" },
      { image: "/image/Spiti/20250110_154342_88BF4D.jpeg", alt: "Spiti Valley Winter Expedition Community Trip & Sightseeing" },
      { image: "/image/Spiti/20250110_154344_8A75EE.jpeg", alt: "Spiti Valley Winter Expedition Community Trip & Sightseeing" },
      { image: "/image/Spiti/20250110_154507_844C81.jpeg", alt: "Spiti Valley Winter Expedition Community Trip & Sightseeing" },
      { image: "/image/Spiti/20250110_154840_88D013.jpeg", alt: "Spiti Valley Winter Expedition Community Trip & Sightseeing" },
      { image: "/image/Spiti/20250110_154841_8079AD.jpeg", alt: "Spiti Valley Winter Expedition Community Trip & Sightseeing" },
      { image: "/image/Spiti/20250110_155331_8BF02C.jpeg", alt: "Spiti Valley Winter Expedition Community Trip & Sightseeing" },
      { image: "/image/Spiti/20250110_161203_82E076.jpeg", alt: "Spiti Valley Winter Expedition Community Trip & Sightseeing" },
      { image: "/image/Spiti/20250110_161645_87218F.jpeg", alt: "Spiti Valley Winter Expedition Community Trip & Sightseeing" },
      { image: "/image/Spiti/20250110_161941_8E27C2.jpeg", alt: "Spiti Valley Winter Expedition Community Trip & Sightseeing" },
      { image: "/image/Spiti/20250110_162802_823AC0.jpeg", alt: "Spiti Valley Winter Expedition Community Trip & Sightseeing" },
      { image: "/image/Spiti/20250110_162802_88500D.jpeg", alt: "Spiti Valley Winter Expedition Community Trip & Sightseeing" },
      { image: "/image/Spiti/20250110_162908_850E9E.jpeg", alt: "Spiti Valley Winter Expedition Community Trip & Sightseeing" },
      { image: "/image/Spiti/20250110_162911_8FD291.jpeg", alt: "Spiti Valley Winter Expedition Community Trip & Sightseeing" },
      { image: "/image/Spiti/20250110_162922_83C2C6.jpeg", alt: "Spiti Valley Winter Expedition Community Trip & Sightseeing" },
      { image: "/image/Spiti/409510d4-1e8a-43d3-a747-fb0a9ffc09b7.jpg", alt: "Spiti Valley Winter Expedition Community Trip & Sightseeing" },
      { image: "/image/Spiti/41f1d386-870b-46d5-8436-ade3caac5c64.jpg", alt: "Spiti Valley Winter Expedition Community Trip & Sightseeing" },
      { image: "/image/Spiti/61c09245-22ff-44b2-a488-3025b8aeb94b.jpg", alt: "Spiti Valley Winter Expedition Community Trip & Sightseeing" },
      { image: "/image/Spiti/666e3045-652e-4876-8084-cd2111d6c349_Original.JPEG", alt: "Spiti Valley Winter Expedition Community Trip & Sightseeing" },
      { image: "/image/Spiti/7038e44b-4591-4892-85d6-789cc11c61db.jpg", alt: "Spiti Valley Winter Expedition Community Trip & Sightseeing" },
      { image: "/image/Spiti/84644681-a30f-4618-b194-216d777bbab0.jpg", alt: "Spiti Valley Winter Expedition Community Trip & Sightseeing" },
      { image: "/image/Spiti/85bce403-7f83-4560-84e8-45ab3fbd43ca.jpg", alt: "Spiti Valley Winter Expedition Community Trip & Sightseeing" },
      { image: "/image/Spiti/d1678a9a-97d1-4239-9d43-02d42413c3ae.jpg", alt: "Spiti Valley Winter Expedition Community Trip & Sightseeing" },
      { image: "/image/Spiti/d825b113-5a4c-4d08-bf4f-7e37e568281c.jpg", alt: "Spiti Valley Winter Expedition Community Trip & Sightseeing" },
      { image: "/image/Spiti/IMG_4969.JPEG", alt: "Spiti Valley Winter Expedition Community Trip & Sightseeing" },
      { image: "/image/Spiti/IMG_4971.JPEG", alt: "Spiti Valley Winter Expedition Community Trip & Sightseeing" },
      { image: "/image/Spiti/IMG_4993.JPEG", alt: "Spiti Valley Winter Expedition Community Trip & Sightseeing" },
      { image: "/image/Spiti/IMG_5065.JPEG", alt: "Spiti Valley Winter Expedition Community Trip & Sightseeing" },
      { image: "/image/Spiti/IMG_5120.JPEG", alt: "Spiti Valley Winter Expedition Community Trip & Sightseeing" },
      { image: "/image/Spiti/IMG_5129.JPEG", alt: "Spiti Valley Winter Expedition Community Trip & Sightseeing" },
      { image: "/image/Spiti/IMG_5149.JPEG", alt: "Spiti Valley Winter Expedition Community Trip & Sightseeing" },
      { image: "/image/Spiti/IMG_5152.JPEG", alt: "Spiti Valley Winter Expedition Community Trip & Sightseeing" },
      { image: "/image/Spiti/IMG_5271.JPEG", alt: "Spiti Valley Winter Expedition Community Trip & Sightseeing" },
      { image: "/image/Spiti/IMG_5323.JPEG", alt: "Spiti Valley Winter Expedition Community Trip & Sightseeing" },
      { image: "/image/Spiti/IMG_5385.JPEG", alt: "Spiti Valley Winter Expedition Community Trip & Sightseeing" },
      { image: "/image/Spiti/IMG_5430.JPEG", alt: "Spiti Valley Winter Expedition Community Trip & Sightseeing" },
      { image: "/image/Spiti/IMG_5431.JPEG", alt: "Spiti Valley Winter Expedition Community Trip & Sightseeing" },
      { image: "/image/Spiti/IMG_5432.JPEG", alt: "Spiti Valley Winter Expedition Community Trip & Sightseeing" },
      { image: "/image/Spiti/IMG_5444.JPEG", alt: "Spiti Valley Winter Expedition Community Trip & Sightseeing" },
      { image: "/image/Spiti/IMG_5450.JPEG", alt: "Spiti Valley Winter Expedition Community Trip & Sightseeing" },
      { image: "/image/Spiti/IMG_5453_Original.JPEG", alt: "Spiti Valley Winter Expedition Community Trip & Sightseeing" },
      { image: "/image/Spiti/IMG_5483.jpg", alt: "Spiti Valley Winter Expedition Community Trip & Sightseeing" },
      { image: "/image/Spiti/IMG_5496.jpg", alt: "Spiti Valley Winter Expedition Community Trip & Sightseeing" },
      { image: "/image/Spiti/IMG_5559.JPEG", alt: "Spiti Valley Winter Expedition Community Trip & Sightseeing" },
      { image: "/image/Spiti/IMG_5565.jpg", alt: "Spiti Valley Winter Expedition Community Trip & Sightseeing" },
      { image: "/image/Spiti/IMG_5589.JPEG", alt: "Spiti Valley Winter Expedition Community Trip & Sightseeing" },
      { image: "/image/Spiti/IMG_5603.jpg", alt: "Spiti Valley Winter Expedition Community Trip & Sightseeing" },
      { image: "/image/Spiti/IMG_5645.JPEG", alt: "Spiti Valley Winter Expedition Community Trip & Sightseeing" },
      { image: "/image/Spiti/IMG_5667.jpg", alt: "Spiti Valley Winter Expedition Community Trip & Sightseeing" },
      { image: "/image/Spiti/IMG_7185.JPEG", alt: "Spiti Valley Winter Expedition Community Trip & Sightseeing" },
      { image: "/image/Spiti/IMG_7217.JPEG", alt: "Spiti Valley Winter Expedition Community Trip & Sightseeing" },
      { image: "/image/Spiti/IMG_7218.JPEG", alt: "Spiti Valley Winter Expedition Community Trip & Sightseeing" }
    ],
    highlights: [
      "Explore Chitkul — the last inhabited village before the Indo-China border in snow.",
      "Enjoy hot Maggi by the frozen/winter Baspa River.",
      "Explore the 1,025-year-old ancient Tabo Monastery and meditation caves.",
      "Visit the cliffside Dhankar Monastery in snow.",
      "Send postcards from Hikkim — the world's highest post office.",
      "Visit Komic — the world's highest village.",
      "Explore Langza — India's fossil village with the snow-backed giant Buddha statue.",
      "Visit Key Monastery, dating back to the 11th century surrounded by white snowscapes.",
      "Cross Chicham Bridge — Asia's Highest Suspension Bridge.",
      "Explore Kibber Village, famous for snow leopard sightings.",
      "Visit the 500-year-old preserved monk mummy at Gue Monastery.",
      "Experience Kalpa and its stunning views of Kinner Kailash Peak.",
      "Capture memories at Suicide Point in Kalpa.",
      "Meet fellow travellers and conquer the sub-zero winter expedition with your tribe."
    ],
    itinerary: [
      {
        day: 1,
        title: 'Delhi to Shimla | The Winter Expedition Begins 🚍',
        activities: [
          "Meet your fellow travellers at Kashmiri Gate / R K Ashram in Delhi.",
          "Board our Semi-Sleeper AC Volvo bus starting at 8:00 PM for an overnight ride to Shimla.",
          "Get comfortable, meet your fellow travellers, and enjoy a meetup & ice-breaking games session.",
          "Meals: Not Included."
        ]
      },
      {
        day: 2,
        title: 'Shimla to Chitkul | Snow Village on Indo-China Border 🏡',
        activities: [
          "As the first light of day breaks, arrive in Shimla and transition to our dedicated mountain vehicle.",
          "Hit the mountain road following the Sutlej River, taking a thrilling turn towards Chitkul along the Baspa River.",
          "Chitkul, the last inhabited village before the Indo-China border, awaits for an unforgettable stay.",
          "Enjoy warm dinner and cozy overnight stay in the quaint village of Chitkul / Sangla.",
          "Meals: Breakfast & Dinner included."
        ]
      },
      {
        day: 3,
        title: 'Chitkul to Tabo via Khab Sangam 🏔️',
        activities: [
          "After breakfast, explore Chitkul village and enjoy hot Maggi at the last dhaba of India by the Baspa River.",
          "Move towards Tabo, halting en route at Khab Sangam — the confluence of Sutlej and Spiti River.",
          "Check into a cozy local homestay in Tabo and enjoy a warm, authentic home-cooked meal.",
          "Meals: Breakfast & Dinner included."
        ]
      },
      {
        day: 4,
        title: 'Tabo to Kaza via Dhankar Monastery 🛕',
        activities: [
          "Tabo, with its 1,025-year-old history, holds ancient spiritual secrets waiting to be uncovered.",
          "Explore the ancient caves and the awe-inspiring Tabo Monastery (Ajanta of the Himalayas).",
          "Journey towards the ancient Dhankar Monastery perched dramatically on a high cliff with valley views.",
          "Continue driving towards Kaza — the heart and winter capital of Spiti.",
          "Check into your homestay in Kaza, enjoy dinner, and rest.",
          "Meals: Breakfast & Dinner included."
        ]
      },
      {
        day: 5,
        title: 'Kaza, Langza, Hikkim & Komic | High-Altitude Snow Villages 📮❄️',
        activities: [
          "After enjoying a delicious local breakfast at the homestay, get ready to explore Hikkim (14,400 ft) — the highest post office in the world.",
          "Post letters and postcards to loved ones from the top of the world.",
          "Visit Komic Village (15,027 ft) — one of the highest motorable villages in the world.",
          "Continue to Langza, the fossil village of India, and photograph the iconic golden Buddha statue against snow peaks.",
          "Return to Kaza by evening, explore the local Kaza market, and enjoy dinner at the stay.",
          "Meals: Breakfast & Dinner included."
        ]
      },
      {
        day: 6,
        title: 'Key Monastery, Chicham Bridge & Kibber Village 🕉️🐆',
        activities: [
          "Prepare for awe-inspiring sights as we visit the famous 11th-century Key Monastery perched high on a hill.",
          "Cross the incredible Chicham Bridge — Asia's highest suspension bridge over a dramatic snow canyon.",
          "Journey into Kibber Village, famous for high-altitude wildlife and snow leopard spotting.",
          "Return to Kaza and enjoy some local home-cooked dinner and stories by the heater.",
          "Meals: Breakfast & Dinner included."
        ]
      },
      {
        day: 7,
        title: 'Kaza to Kalpa via Gue Mummy & Nako 🏛️',
        activities: [
          "After an early breakfast, start our return journey towards Kinnaur.",
          "Visit Gue Monastery to witness the 500-year-old naturally preserved monk mummy.",
          "Take a quick halt at Nako for lunch.",
          "Reach Kalpa, check into your hotel rooms, enjoy dinner, and unwind.",
          "Meals: Breakfast & Dinner included."
        ]
      },
      {
        day: 8,
        title: 'Kalpa, Suicide Point & Departure to Delhi 🌄🚍',
        activities: [
          "Wake up to the breathtaking view of the sacred, snow-covered Kinner Kailash Peak.",
          "Post breakfast, explore Kalpa and capture memories at the famous Suicide Point.",
          "Drive down towards Shimla to catch your evening Volvo bus to Delhi.",
          "Leave for Delhi on an overnight bus with unforgettable winter memories.",
          "Meals: Breakfast included."
        ]
      },
      {
        day: 9,
        title: 'Back to Delhi with Lifetime Winter Memories 🏠',
        activities: [
          "Arrive in Delhi on Sunday morning after your overnight journey.",
          "Return home with cherished memories of Winter Spiti Valley, frozen rivers, and white desert landscapes.",
          "Carry back countless pictures, stories, and a lifelong bond with your new tribe.",
          "Meals: Not Included."
        ]
      }
    ],
    inclusions: [
      "Delhi to Shimla: AC Semi-Sleeper Volvo Bus",
      "Shimla to Kaza to Shimla: Dedicated Mountain Tempo Traveller / SUV for entire circuit",
      "Shimla to Delhi: AC Volvo Bus",
      "6 Nights Stay: 1N Hotel at Chitkul/Sangla, 1N Homestay at Tabo, 3N Homestay at Kaza, 1N Hotel in Kalpa",
      "12 Meals: 6 Breakfasts & 6 Dinners",
      "Experienced Travel Tribes Trip Captain throughout the trip",
      "Driver night charges, toll taxes, parking charges"
    ],
    exclusions: [
      "5% GST",
      "Highway meals, refreshments, lunches on the highway",
      "Alcoholic drinks & mineral water",
      "Entry fees to monuments/monasteries, camera charges, room heaters (if requested directly)",
      "Personal expenses, shopping, laundry, tips to driver",
      "Unforeseen costs arising due to natural calamities (landslides, roadblocks, heavy snow)",
      "Expenses in Delhi (stay, fresh-up, food)",
      "Anything not mentioned in the inclusions"
    ],
    thingsToCarry: [
      "Valid Government Photo ID (Aadhaar / Passport / Driving License) — Mandatory",
      "Heavy sub-zero winter wear: Thermals (2-3 pairs), fleece layers, heavy down jacket (-15°C rated)",
      "High-ankle waterproof trekking snow boots with good grip + 4-5 pairs of woollen socks",
      "Woollen beanie, balaclava / face mask, neck warmer, and insulated snow gloves",
      "UV protection polarized sunglasses (essential against snow blindness) & cold-cream + lip balm",
      "Personal medical kit (Diamox, cold/fever tablets, pain relief, glucose)",
      "High-capacity power bank (cold drains battery fast) & universal chargers",
      "Thermos insulated water bottle (prevents drinking water from freezing)",
      "Sufficient cash for remote locations in Spiti"
    ],
    policies: [
      "Winter & Sub-Zero Conditions: Participants must prepare for sub-zero temperatures (-10°C to -25°C). Trip captain holds full authority to alter route for safety.",
      "Booking Amount: ₹5,000/- advance per person (Non-refundable upon cancellation; transferable to another person or convertible to 3-month Travel Tribes credit).",
      "Pricing: Triple Sharing ₹18,999 | Double Sharing ₹21,999 (+5% GST).",
      "Room Sharing: In triple-sharing rooms, an extra mattress is provided.",
      "Discipline & Punctuality: Team coordination and alignment are strictly required on mountain routes.",
      "Safety & Harassment: Travel Tribes strictly stands against any form of harassment.",
      "Cancellation 10–30 days prior: 25% deduction on remaining balance.",
      "Cancellation 8–10 days prior: 50% deduction on remaining balance.",
      "Cancellation 6–8 days prior: 70% deduction on remaining balance.",
      "Cancellation 3–6 days prior: 90% deduction on remaining balance.",
      "Cancellation < 2 days / No-Show: 100% deduction (No refund).",
      "Operator Cancellation: 100% full refund within 4–7 business days if trip is cancelled by the operator."
    ],
    pricingOptions: [
      { label: 'Triple Sharing (Delhi to Delhi)', price: '₹18,999 / person' },
      { label: 'Double Sharing (Delhi to Delhi)', price: '₹21,999 / person' }
    ],
    bookingAmount: '₹5,000 / person'
  }
]

export const navItems = [
  { label: 'Upcoming trips', href: '/upcoming-trips' },
  { label: 'Domestic', href: '/domestic-trips' },
  { label: 'International', href: '/international-trips' },
  { label: 'Weekend getaways', href: '/weekend-getaways' },
  { label: 'Xmas & New Year', href: '/xmas-new-year-trips' },
  { label: 'Why Us', href: '/why-us' },
  { label: 'About us', href: '/about' }
]

export const testimonials: TripReview[] = [
  // --- GOKARNA REVIEWS (12) ---
  {
    name: 'Deepak Dhiver',
    role: 'Local Guide',
    reviewCount: '16 reviews',
    photoCount: '51 photos',
    detail: 'Gokarna Backpacking Trip',
    rating: 5,
    quote: 'I went on a trip to Gokarna, and this was my 1st Solo trip ever, I met great people during the trip. We visited many places in 3 days and our tour guide (Mr.Shah) was very experienced. All the arrangents were perfectly made. I enjoyed my 1st solo trip ✨️'
  },
  {
    name: 'Shrutika More',
    reviewCount: '2 reviews',
    photoCount: '13 photos',
    detail: 'Gokarna Backpacking (2nd Trip)',
    rating: 5,
    quote: 'Recently had my second trip to Gokarna with travel tribes and it was the hella amazing trip I ever had. The trip was absolutely amazing and all the credit goes to our fantastic trio Adil, Parag and Nihir who managed everything well. I’m really grateful to travel tribes for arranging a cake for my birthday and making it a special day for me. It was unexpected surprise for me. I will always cherish this memorable trip as I met so many amazing people, we bonded and enjoyed together. I would highly recommend you all to go with travel tribes and have your banger trip because Tribe hai to vibe hai guyss 🔥🫶🥳'
  },
  {
    name: 'Sayli Rane',
    role: 'Local Guide',
    reviewCount: '21 reviews',
    photoCount: '6 photos',
    detail: 'Gokarna Backpacking Trip',
    rating: 5,
    quote: 'I recently went on gokarna trip with travel tribes. It was my first solo trip was bit nervous till I boarded the train..but as the journey began…it was a trip filled with fun and adventure. All the trip leaders adil arzoo raj viju were so friendly and caring. Best trip i had in 2023. Stay location was also good its near the beach . Room conditions can be improved by the resort owner. Though not bad as resort is besides beach.'
  },
  {
    name: 'Abhishek Dutta',
    reviewCount: '10 reviews',
    photoCount: '9 photos',
    timeAgo: '2 years ago',
    detail: 'Gokarna New Year Party',
    rating: 5,
    quote: 'Had one of the best trips ever with Travel Tribes. Really nice people and awesome management team. This was my 1st group trip as strangers and we left the trip becoming great friends. Had gone to Gokarna for new year party and had the best beach front resort & party.'
  },
  {
    name: 'Raj Jaiswal',
    reviewCount: '6 reviews',
    photoCount: '12 photos',
    timeAgo: '2 years ago',
    detail: 'Gokarna Backpacking Trip',
    rating: 5,
    quote: 'I think Travel Tribes is one of the most friendly travel organising company, I had recently gone to Gokarna with them & never felt that I am with the strangers on the trip, they just took trip to next level & it\'s been almost 5 days I am still mentally with them & lost in those memories. Highly recommended for solo as well for group travellers, if you wanna #Vibe then Choose the Travel Tribes.'
  },
  {
    name: 'Bhakti Shirke',
    reviewCount: '5 reviews',
    photoCount: '8 photos',
    timeAgo: 'a year ago',
    detail: 'Gokarna Backpacking Trip',
    rating: 5,
    quote: 'Had an amazing time on the Gokarna trip! Everything was perfectly organized – from the transportation to the accommodations and the itinerary. The team ensured we had a seamless and fun experience. Highly recommend for anyone looking for a stress-free and memorable group getaway!'
  },
  {
    name: 'Khushi Singh',
    role: 'Local Guide',
    reviewCount: '13 reviews',
    photoCount: '12 photos',
    timeAgo: 'a year ago',
    detail: 'Gokarna Backpacking Trip',
    rating: 5,
    quote: 'Gokarna trip with travel tribes was the best trip I have ever had. It was my first solo trip and trust me the experience I had with people and with parag it was really special to me. I will always remember this memorable trip I met so many amazing people we bonded quickly and enjoyed so much I would highly recommend to go with travel tribes. As it was my pre- birthday trip so parag made it special for me as well celebrated, overall the trip was worth every penny. 🫶🏻'
  },
  {
    name: 'Nakusa Indalkar',
    role: 'Local Guide',
    reviewCount: '12 reviews',
    photoCount: '11 photos',
    timeAgo: '2 years ago',
    detail: 'Gokarna Backpacking (2nd Trip)',
    rating: 5,
    quote: 'Gokarna was my second solo trip with Travel Tribe. Our host Adil is a cool guy. All the arrangements done starting from train journey, local travel at Gokarna, accommodation, meals everything was hassle-free. We could visit all places as mentioned in itinerary easily. Not for a moment we felt that we are solo travelers meeting for the first time. And as we all experienced it I will definitely say - TRIBE HAI TO VIBE HAI !'
  },
  {
    name: 'Daksha Bhanushali',
    reviewCount: '10 reviews',
    photoCount: '4 photos',
    timeAgo: 'a year ago',
    detail: 'Gokarna Backpacking (2nd Trip)',
    rating: 5,
    quote: 'I just finished my Gokarna trip with Travel Tribes, as this was my 2nd trip with them everything went well as expected, it was an incredible experience from start to finish. Our tour Captain Parag was friendly, he took care of every detail, making sure everything went smoothly. Honestly, everything was perfect. I highly recommend them to anyone looking for a well-coordinated and enjoyable travel specially for solo travelers. I am looking forward to the book more such amazing trips with them. Thanks to the Travel tribe for this amazing experience.'
  },
  {
    name: 'Mohil Khare',
    role: 'Local Guide',
    reviewCount: '82 reviews',
    photoCount: '101 photos',
    timeAgo: 'a year ago',
    detail: 'Gokarna Backpacking (2nd Trip)',
    rating: 5,
    quote: 'This was my second trip with Travel Tribes and they just seem to keep pushing the bar for amazing travel experiences. My trip to Gokarna was made memorable with a great itinerary, good planning and kindest friends made through the trip. Our trip captain Parag was simply a delight and was on top of things at all times, while ensuring we all had a great time. Anyone considering a trip should definitely give these guys a shot! Highly recommended! ❤️'
  },
  {
    name: 'Nidhi Gupta',
    role: 'Local Guide',
    reviewCount: '9 reviews',
    photoCount: '6 photos',
    detail: 'Gokarna Backpacking Trip',
    rating: 5,
    quote: 'I joined Travel Tribes Gokarna trip as a solo traveler, and had a memorable time with them. The group members and leader were friendly, warm and approachable. They ensured the temple darshans, chill time at the beach/waterfall and most importantly safety. Every single person\'s comfort, health and food preferences were considered and respected. It was heartwarming to see other solo travelers, and being a part of group games, group videos, singing sessions and ice cream treats. By the second day I had forgotten I had joined solo - we all had become friends, had inside jokes, took beautiful pictures of each other and made sweet memories together. One of the best trips! ❤️'
  },
  {
    name: 'Akshay Karnik',
    reviewCount: '8 reviews',
    photoCount: '1 photo',
    detail: 'Gokarna Backpacking Trip',
    rating: 5,
    quote: 'Thank you Travel Tribes for the lovely experience. The Trip was very well planned. We reached Gokarna with a mind full of excitement and curiosity about the place and the travel group and we returned with a bag full of memories and happiness. 😊'
  },

  // --- COORG REVIEWS (7) ---
  {
    name: 'Snigdha More',
    detail: 'Coorg Backpacking (Solo Trip)',
    role: 'Verified Traveller',
    rating: 5,
    quote: 'Chooses Travel tribes for my first solo trip to coorg and glad I went with them. They handled the trip from tickets, covering points even changing itenrary when required as per our preference. Adil was very helpful and involved throughout and always part of the group. The team handled trip very smoothly. They not just covered the points for the sake of it, but also looked into the ice breaking and involvement sessions which made the solo travellers bonding with others strong. So though we came as strangers, we left as family.'
  },
  {
    name: 'Gauravi More',
    detail: 'Coorg Backpacking Trip',
    role: 'Verified Traveller',
    rating: 5,
    quote: 'I recently went on a trip to Coorg, and honestly, it was incredibly well-managed. We were able to enjoy every single sightseeing point properly, without ever feeling rushed. The tour guide was very friendly and created a wonderful vibe throughout the journey. Thanks to the fun ice-breaking sessions and games, a group of strangers quickly felt like family. I would definitely travel with this agency again!! ❤️✨'
  },
  {
    name: 'Himani More',
    detail: 'Coorg Backpacking Trip',
    role: 'Verified Traveller',
    rating: 5,
    quote: 'Coorg was such a vibe! 🌿🫶🏻 Had a really fun and memorable trip with Travel Tribe. Everything was well managed, the coordination was smooth, and the group energy made the experience even better. From the beautiful views to all the random fun moments, it was the perfect little escape from the routine. 💚 Thank you, Travel Tribe & trip coordinator, for making the trip so enjoyable 🎀 Would definitely love to join another trip with you guys. 🏔️✨'
  },
  {
    name: 'Rutuja Kore',
    detail: 'Coorg Backpacking Trip',
    role: 'Verified Traveller',
    rating: 5,
    quote: 'It was really the awesome trip that I have ever experienced.🔥🔥the vibe,the arrangements,the stay everything was perfect and top notch .we didn\'t skip any places and visited each and every spot mentioned in iternery 😊😊and about the tour leader Adil, he was the best leader ever,he maintained the vibe, managed everything,guided us throughout,played ice breaking games with us and bcoz of him the vibe was maintained throughout. Thank you travel tribe for giving us such a beautiful and memorable experience. Bcoz of you the coorg has a special place in my heart ❤️ Thank you so much ❤️'
  },
  {
    name: 'Tejas Pangarikar',
    detail: 'Coorg Backpacking Trip',
    role: 'Verified Traveller',
    rating: 5,
    quote: 'Had a really great experience with Travel Tribe! Definitely one of the best options for solo travellers. Everything was well planned and the team was super friendly and helpful throughout the trip. The best part was meeting new people, making friends, and enjoying the whole trip together. If you’re travelling solo and want a fun, hassle-free experience, I’d definitely recommend Travel Tribe! 🌍✨'
  },
  {
    name: 'Swaranjali Teli',
    detail: 'Coorg Backpacking Trip',
    role: 'Verified Traveller',
    rating: 5,
    quote: 'Had an amazing Coorg trip with Travel Tribes! 🌿✨ Everything was well planned and experience was truly memorable. A special thanks to Jatin and Prem for being such amazing leaders, energetic and making sure everyone had a great time.'
  },
  {
    name: 'Shruti Thakur',
    detail: 'Coorg Backpacking Trip',
    role: 'Verified Traveller',
    rating: 5,
    quote: 'I had such a great time in Coorg! The trip was full of fun, beautiful places, and good memories. Big thanks to Prem and Jatin for coordinating everything so well and being super supportive throughout. Really enjoyed the whole experience!'
  },

  // --- UDAIPUR REVIEWS (8) ---
  {
    name: 'Anushree',
    detail: 'Udaipur Backpacking (Girls Trip)',
    role: 'Verified Traveller',
    rating: 5,
    quote: 'Superb experience!!! we went to udaipur recently with travel tribes it was our first trip with them, and that too a girls trip, we were very skeptical to go on a girls trip with a bunch of strangers but the hosts made us feel so much at home. All i can say is its gonna be an experience you remember for a life time 10/10 recommended ♥️'
  },
  {
    name: 'Mansi Sinha',
    detail: 'Udaipur Backpacking Trip',
    role: 'Verified Traveller',
    rating: 5,
    quote: 'One of the best travel experiences I’ve had so far, especially compared to other travel companies I’ve travelled with! ❤️ What I loved most was how flexible and thoughtfully planned the itinerary was. It wasn’t hellishly packed, yet we managed to cover so much without ever feeling rushed. The way Adil & Aarjoo manages to pull everything together so effortlessly is truly wonderful. It was an absolutely memorable experience, and I’m already looking forward to planning my next trip with them! ✨ Thank you, Travel Tribes, for making Udaipur so beautiful and memorable. 💛'
  },
  {
    name: 'Vindu Pal',
    detail: 'Udaipur Backpacking Trip',
    role: 'Verified Traveller',
    rating: 5,
    quote: 'Really enjoyed my Udaipur trip with travel tribe. The overall experience was very good, the arrangements were well managed, and the trip was comfortable and enjoyable. Adil and Arzoo were really helpful and cooperative throughout. Had a great time exploring Udaipur and making some lovely memories. Definitely recommended for anyone planning a trip! 😊'
  },
  {
    name: 'Kajal Rambhia',
    detail: 'Udaipur Backpacking (Solo Trip)',
    role: 'Verified Traveller',
    rating: 5,
    quote: 'I planned two trips with Travel Tribes and both of these were the best trips of my life! The vibe is amazing. New friends, new places, new experiences - truly positive, safe, comfortable and memorable. Especially the Udaipur trip... I travelled SOLO! What fun and memories!!'
  },
  {
    name: 'Ankita Iyer',
    detail: 'Udaipur Backpacking Trip',
    role: 'Verified Traveller',
    rating: 5,
    quote: 'Udaipur is seriously one of those places that looks even better in real life! 🥹 The sunset by the lake was unreal and the sunrise from Bahubali Hills was 100% worth waking up early for. 🌅 Travel Tribes planned the trip really well and our trip leader made the whole experience even better. Loved every bit of it!'
  },
  {
    name: 'Kunal Jadhav',
    detail: 'Udaipur Backpacking Trip',
    role: 'Verified Traveller',
    rating: 5,
    quote: 'Still not over this Udaipur trip! 😭❤️ The lakeside sunset was straight out of a movie and Bahubali Hills at sunrise was just WOW. The itinerary was really well planned, stay and food were good, and our trip leader was amazing. Such a wholesome group trip!'
  },
  {
    name: 'Ankita Patil',
    detail: 'Udaipur Backpacking Trip',
    role: 'Verified Traveller',
    rating: 5,
    quote: 'Had such a good time in Udaipur! The city is gorgeous, especially during sunset by the lake. The sunrise at Bahubali Hills was honestly worth waking up early for. 😭🌅 Travel Tribes handled everything really well and our trip leader was super helpful and fun. Definitely coming back for another trip!'
  },
  {
    name: 'Vipul Choube',
    detail: 'Udaipur Backpacking Trip',
    role: 'Verified Traveller',
    rating: 5,
    quote: 'Udaipur was SUCH a vibe! 🥹🌅 Sunset by the lake, sunrise at Bahubali Hills, beautiful streets and the whole city just hits different. Travel Tribes made it even better — everything was sorted and our trip leader was a total W. Would 100% do this trip again!'
  }
]

export interface GalleryItem {
  image: string
  alt: string
  title: string
  location: string
  widthClass?: string
}

export const galleryRow1: GalleryItem[] = [
  { image: img('photo-1529156069898-49953e39b3ac'), alt: 'Tribe friends on scenic suspension bridge', title: 'Tribe Bond at Valley Bridge', location: 'Manali & Kasol', widthClass: 'w-[300px] sm:w-[360px]' },
  { image: img('photo-1506461883276-594a12b11cf3'), alt: 'Snow covered hill town nestled in Himalayas', title: 'Winter Wonderland', location: 'Kedarkantha & Spiti', widthClass: 'w-[420px] sm:w-[500px]' },
  { image: img('photo-1539635278303-d4002c07eae3'), alt: 'Group of backpackers smiling on mountain ridge', title: 'Summit High Fives', location: 'Triund Trek Peaks', widthClass: 'w-[360px] sm:w-[430px]' },
  { image: img('photo-1507525428034-b723cf961d3e'), alt: 'Crystal turquoise sea and rocky shores', title: 'Paradise Found', location: 'Gokarna Hidden Beach', widthClass: 'w-[280px] sm:w-[330px]' },
  { image: img('photo-1476514525535-07fb3b4ae5f1'), alt: 'Kayak on a turquoise lake', title: 'Emerald Lake Serenity', location: 'Honnavar Backwaters', widthClass: 'w-[380px] sm:w-[460px]' },
  { image: img('photo-1516483638261-f4dbaf036963'), alt: 'Colourful coastal town', title: 'Heritage & Old Town Vibes', location: 'Vietnam & Bali', widthClass: 'w-[290px] sm:w-[350px]' },
  { image: img('photo-1519671482749-fd09be7ccebf'), alt: 'Friends having fun around campfire', title: 'Campfire Stories & Acoustic Jam', location: 'Jibhi Pine Valley', widthClass: 'w-[350px] sm:w-[420px]' },
]

export const galleryRow2: GalleryItem[] = [
  { image: img('photo-1527631746610-bca00a040d60'), alt: 'Friends celebrating at mountain viewpoint rock', title: 'Rock Top Adventures', location: 'Coorg Peaks & Trails', widthClass: 'w-[330px] sm:w-[390px]' },
  { image: img('photo-1506744038136-46273834b3fb'), alt: 'Dramatic limestone karst peaks in emerald bay', title: 'Karst Peaks & Emerald Waters', location: 'Halong Bay & Krabi', widthClass: 'w-[440px] sm:w-[520px]' },
  { image: img('photo-1464822759023-fed622ff2c3b'), alt: 'Group posing under towering pine cliffs', title: 'Mountain Tribe Reunion', location: 'Dharamshala Valley', widthClass: 'w-[370px] sm:w-[450px]' },
  { image: img('photo-1528127269322-539801943592'), alt: 'Tropical beach and palm trees', title: 'Sunset at Kudle Beach', location: 'Gokarna Coastline', widthClass: 'w-[280px] sm:w-[340px]' },
  { image: img('photo-1500530855697-b586d89ba3ee'), alt: 'Traveller walking through a valley', title: 'Wanderer in Paradise', location: 'Meghalaya Living Roots', widthClass: 'w-[310px] sm:w-[370px]' },
  { image: img('photo-1533105079780-92b9be482077'), alt: 'Starlit Mountain Camping', title: 'Stargazing with Tribe', location: 'Chandrataal Lake', widthClass: 'w-[380px] sm:w-[460px]' },
  { image: img('photo-1500534623283-312aade485b7'), alt: 'Mountain landscape at golden hour', title: 'Golden Hour Trails', location: 'Spiti Valley Peaks', widthClass: 'w-[340px] sm:w-[410px]' },
]

export const gallery: GalleryItem[] = [...galleryRow1, ...galleryRow2]


export const blogs = [
  { title: 'How to choose your first group trip', category: 'Travel notes', image: img('photo-1527631746610-bca00a040d60') },
  { title: 'The art of leaving room for wonder', category: 'Journal', image: img('photo-1464822759023-fed622ff2c3b') },
  { title: 'A slower way to see the world', category: 'Field guide', image: img('photo-1500534623283-312aade485b7') }
]

export const honeymoonTrips = trips.filter(t => t.region === 'Honeymoon')

/**
 * Transforms a standard trip into its dedicated Xmas & New Year festive presentation:
 * - Dates strictly filtered to ONLY Xmas & New Year departure dates.
 * - Price updated to the festive batch price.
 * - Tag updated to 'New Year Special' or festive tag.
 */
export function toFestiveTrip(trip: Trip): Trip | null {
  const allDates = trip.dates && trip.dates.length > 0 ? trip.dates : [trip.date]
  const festiveDates = filterFestiveDates(allDates)

  if (
    festiveDates.length === 0 &&
    trip.region !== 'Xmas & New Year' &&
    !trip.tag?.toLowerCase().includes('new year') &&
    !trip.tag?.toLowerCase().includes('xmas')
  ) {
    return null
  }

  const finalDates = festiveDates.length > 0 ? festiveDates : [trip.date]
  const upcomingFestive = filterUpcomingDates(finalDates)
  const primaryFestiveDate = upcomingFestive.length > 0 ? upcomingFestive[0] : finalDates[0]

  // Resolve festive price
  let festivePrice = trip.price
  if (trip.pricingOptions && trip.pricingOptions.length > 0) {
    const festiveOpt = trip.pricingOptions.find(
      (opt) =>
        opt.label.toLowerCase().includes('xmas') ||
        opt.label.toLowerCase().includes('new year') ||
        opt.label.toLowerCase().includes('festive')
    )
    if (festiveOpt) {
      if (festiveOpt.price.startsWith('+')) {
        const baseNum = parseInt(trip.price.replace(/[^\d]/g, ''), 10) || 0
        const addNum = parseInt(festiveOpt.price.replace(/[^\d]/g, ''), 10) || 1000
        festivePrice = `₹${(baseNum + addNum).toLocaleString('en-IN')}`
      } else {
        const optNum = parseInt(festiveOpt.price.replace(/[^\d]/g, ''), 10) || 0
        festivePrice = `₹${optNum.toLocaleString('en-IN')}`
      }
    }
  }

  // Prioritize festive options in pricingOptions
  let festivePricingOptions = trip.pricingOptions
  if (trip.pricingOptions && trip.pricingOptions.length > 0) {
    const festiveOpts = trip.pricingOptions.filter(
      (opt) =>
        opt.label.toLowerCase().includes('xmas') ||
        opt.label.toLowerCase().includes('new year') ||
        opt.label.toLowerCase().includes('festive') ||
        opt.label.toLowerCase().includes('double sharing') ||
        opt.label.toLowerCase().includes('package')
    )
    if (festiveOpts.length > 0) {
      festivePricingOptions = festiveOpts
    }
  }

  return {
    ...trip,
    date: primaryFestiveDate,
    dates: finalDates,
    price: festivePrice,
    pricingOptions: festivePricingOptions,
    tag: trip.tag?.toLowerCase().includes('new year') || trip.tag?.toLowerCase().includes('xmas')
      ? trip.tag
      : 'New Year Special',
  }
}

export const xmasNewYearTrips: Trip[] = trips
  .map(toFestiveTrip)
  .filter((t): t is Trip => t !== null)

export const categories = [
  { title: 'Domestic', desc: 'Closer than you think.', href: '/domestic-trips', image: img('photo-1506461883276-594a12b11cf3') },
  { title: 'International', desc: 'Go further, together.', href: '/international-trips', image: img('photo-1516483638261-f4dbaf036963') },
  { title: 'Honeymoons', desc: 'For your next chapter.', href: '/contact', image: img('photo-1533105079780-92b9be482077') }
]

export interface FaqItem {
  id: string
  question: string
  answer: string
  category?: string
}

export const whyUsFaqs: FaqItem[] = [
  {
    id: 'what-is-travel-tribes',
    question: 'What is Travel Tribes?',
    category: 'About Us',
    answer: 'Travel Tribes is a New age community-led travel brand that brings people together through group trips across India and around the world. Whether you come solo, with friends or as a couple, our goal is simple — help you explore more, meet great people and find your tribe.'
  },
  {
    id: 'different-from-regular-tours',
    question: 'What makes our trips different from regular group tours?',
    category: 'Experience',
    answer: 'We don’t do cookie-cutter tours or checklist-style travel. Our trips are built around small groups, real experiences and the people you travel with. You’ll explore the destination, meet like-minded travellers and have enough room for spontaneous moments along the way.'
  },
  {
    id: 'what-are-community-trips',
    question: 'What are community trips?',
    category: 'Community',
    answer: 'Community trips are group adventures designed to bring like-minded travellers together. You may arrive knowing nobody, but shared experiences, conversations and a little travel chaos have a way of turning strangers into friends.'
  },
  {
    id: 'safe-for-solo-female-travellers',
    question: 'Are your trips safe for solo female travellers?',
    category: 'Safety',
    answer: 'Yes. Solo female travellers are welcome on our trips. We carefully plan our stays, transportation and experiences, with trip leaders supporting the group throughout the journey. We also believe everyone should feel comfortable, respected and included while travelling with us.'
  },
  {
    id: 'who-manages-trip-on-ground',
    question: 'Who travels with us and manages the trip on-ground?',
    category: 'Trip Captain',
    answer: 'Every Travel Tribes trip is accompanied by a Trip Captain - someone from our team who is there to handle the on-ground logistics, keep the trip running smoothly and, most importantly, keep the Tribe together.\n\nFrom coordinating transport and stays to helping with plans, activities and those unexpected travel moments, your Trip Captain has got it covered.\n\nYou focus on exploring. We’ll handle the rest.'
  },
  {
    id: 'what-is-a-trip-captain',
    question: 'What is a Trip Captain?',
    category: 'Trip Captain',
    answer: 'A Trip Captain is more than just a trip coordinator. They’re your on-ground point of contact, problem-solver and vibe keeper throughout the journey.\n\nThey make sure the group stays connected, the plans stay on track and nobody feels like they’re travelling alone.\n\nBasically: logistics handled. Good vibes guaranteed.'
  },
  {
    id: 'join-trip-alone',
    question: 'Can I join a trip alone?',
    category: 'Solo Travel',
    answer: 'Absolutely. Most of our travellers join solo. You don’t need to know anyone before the trip — that’s kind of the point. You’ll meet your tribe along the way.'
  },
  {
    id: 'who-usually-travels',
    question: 'Who usually travels with Travel Tribes?',
    category: 'Community',
    answer: 'Our trips are for curious, easy-going travellers who love exploring new places and meeting new people. Expect a mix of solo travellers, friends, couples, and small groups.'
  },
  {
    id: 'only-for-young-people',
    question: 'Are Travel Tribes trips only for young people?',
    category: 'Community',
    answer: 'Our community is largely made up of young travellers, but we care more about your travel vibe than your age. If you’re curious, social and up for an adventure, you’ll fit right in.'
  },
  {
    id: 'group-size',
    question: 'How big are the groups?',
    category: 'Group Travel',
    answer: 'We keep our groups small enough to actually connect, rather than feeling like a typical large tour group. Group size can vary by destination and trip.'
  },
  {
    id: 'share-room',
    question: 'Do I have to share a room with someone?',
    category: 'Stay & Rooms',
    answer: 'Most of our trips are planned on a sharing basis. Room-sharing details and available options are mentioned on the respective trip page.'
  },
  {
    id: 'how-to-book',
    question: 'How do I book a trip?',
    category: 'Booking',
    answer: 'Choose your destination, select your travel date and book your spot through the trip page. Once your booking is confirmed, we\'ll share the next steps and trip details with you.'
  },
  {
    id: 'dont-know-anyone',
    question: 'What if I don\'t know anyone on the trip?',
    category: 'Solo Travel',
    answer: 'Perfect. 😄 Come solo, show up with an open mind, and let the trip do the rest. Many of our travellers meet their future travel buddies on their very first trip with us.'
  },
  {
    id: 'customise-trip',
    question: 'Can I customise a trip?',
    category: 'Custom Trips',
    answer: 'Yes. If your dream destination or dates aren\'t on our calendar, reach out to us and we\'ll help you plan a customised trip.'
  },
  {
    id: 'travelling-with-friends',
    question: 'Can I join if I’m travelling with my friends?',
    category: 'Group Travel',
    answer: 'Of course. Bring your people or come solo — either way, you’re part of the Tribe.'
  },
  {
    id: 'cancellation-policy',
    question: 'What happens if I need to cancel my trip?',
    category: 'Policies',
    answer: 'Cancellation and refund policies vary by trip. Please check the cancellation policy on your specific trip page before booking.'
  }
]

