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
  id: string
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
  itinerary?: { id?: string; day: number; title: string; activities: string[] }[]
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
    id: 'hampi-backpacking',
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
      { image: "/image/Hampi/hampi_img.jpeg", alt: "Hampi Heritage & Boulders" },
      { image: "/image/Hampi/IMG_0316.JPEG", alt: "Virupaksha Temple Architecture" },
      { image: "/image/Hampi/IMG_0438.JPEG", alt: "Vittala Temple Stone Chariot" },
      { image: "/image/Hampi/IMG_0570.JPEG", alt: "Vijayanagara Ancient Ruins" },
      { image: "/image/Hampi/IMG_0763.JPEG", alt: "Sanapur Lake Cliff & Boulders" },
      { image: "/image/Hampi/IMG_6658.JPG", alt: "Sunset at Anjaneya Hill" },
      { image: "/image/Hampi/IMG_9632.JPEG", alt: "Hemakuta Hill Sunset Shrines" },
      { image: "/image/Hampi/IMG_9657.JPEG", alt: "Tungabhadra River Coracle Ride" },
      { image: "/image/Hampi/IMG_9698.JPEG", alt: "Matanga Hill Panoramic View" },
      { image: "/image/Hampi/IMG_9741.JPEG", alt: "Hippie Island Cafes & Vibe" }
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
        id: 'hampi-day-1',
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
        id: 'hampi-day-2',
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
        id: 'hampi-day-3',
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
        id: 'hampi-day-4',
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
        id: 'hampi-day-5',
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
    id: 'coorg-mysore-new-year',
    slug: 'coorg-mysore-new-year',
    title: 'Coorg with Mysore — New Year Special',
    location: 'Mumbai · Mangalore · Coorg · Mysore · Mumbai',
    region: 'Domestic',
    date: 'Dec 28–Jan 02, 2027 (New Year Special)',
    dates: [
      'Dec 28–Jan 02, 2027 (New Year Special)'
    ],
    duration: '5N/6D',
    price: '₹14,499',
    image: '/Card Image/coorg.jpg',
    alt: 'Coorg and Mysore New Year Special — Coffee Plantations, Abbey Falls and Mysore Palace Fireworks',
    tag: 'New Year Special',
    description: 'Looking for the perfect New Year trip from Mumbai? Join Travel Tribes for a 5N/6D Coorg & Mysore New Year Special packed with lush coffee plantations, misty hills, Abbey Falls, Mandalpatti, elephant encounters and the beautiful Namdroling Monastery. End the year with a one-of-a-kind New Year celebration at Mysore Palace, featuring fireworks and a royal show. Come solo. Meet strangers. Explore Coorg. Celebrate like royalty. Find your tribe.',
    spots: '6 spots left',
    gallery: [
      { image: '/image/Coorg/coorg_img.JPEG', alt: 'Coorg Lush Coffee Estate and Western Ghats' },
      { image: '/image/Coorg/IMG_7410.JPEG', alt: 'Mandalpatti Peak Jeep Safari & Misty Sunrise' },
      { image: '/image/Coorg/IMG_5499.JPEG', alt: 'Abbey Falls Cascading Water' },
      { image: '/image/Coorg/IMG_5769.JPEG', alt: 'Namdroling Golden Temple Monastery' },
      { image: '/image/Coorg/IMG_5844.JPEG', alt: 'Dubare Elephant Camp Experience' },
      { image: '/image/Coorg/IMG_6888.JPEG', alt: 'Raja’s Seat Panoramic Sunset Viewpoint' },
      { image: '/image/Coorg/IMG_7878.JPEG', alt: 'Mysore Palace Grand Illuminations & NY Celebration' },
      { image: '/image/Coorg/IMG_8960.JPEG', alt: 'Travel Tribes Coorg Tribe Bonding & Memories' }
    ],
    highlights: [
      "Explore the lush green hills and misty valleys of Coorg.",
      "Walk through scenic coffee and spice plantations.",
      "Experience a live coffee-tasting session.",
      "Visit the beautiful Abbey Falls.",
      "Get up close with elephants at the Elephant Camp.",
      "Explore the peaceful Namdroling Monastery – Golden Temple.",
      "Enjoy sunset views from Raja's Seat.",
      "Experience an exciting off-road Jeep ride to Mandalpatti Peak.",
      "Explore the magnificent Mysore Palace.",
      "Discover Mysore's local markets, food and culture.",
      "Celebrate New Year's Eve near Mysore Palace with your Travel Tribes community."
    ],
    itinerary: [
      {
        id: 'coorg-mysore-day-1',
        day: 1,
        title: 'Day 1: Mumbai → Mangalore | Train Journey & Ice-Breaking 🚂',
        activities: [
          "Meet your fellow Coorg travellers at the designated railway stations and begin your journey towards Mangalore by train.",
          "Enjoy the journey with fellow travellers and take part in ice-breaking games and group activities.",
          "Connect with your tribe, make new friends and get ready for the adventure ahead.",
          "Meals: Not included."
        ]
      },
      {
        id: 'coorg-mysore-day-2',
        day: 2,
        title: 'Day 2: Mangalore → Coorg | Coffee & Spice Plantation ☕🌿',
        activities: [
          "Arrive in Mangalore early morning around 6:00 AM and proceed towards Coorg's charming town of Madikeri.",
          "Enjoy breakfast during the journey before reaching Coorg and checking in to your stay.",
          "Explore Coorg's famous Coffee & Spice Plantations with a guided plantation tour.",
          "Experience a live coffee-tasting session and discover the region's coffee heritage.",
          "If time permits, visit Raja's Seat and enjoy panoramic views of the surrounding hills.",
          "Later, explore the local markets, cafés and streets of Madikeri at your own pace.",
          "Meals: Breakfast & Dinner."
        ]
      },
      {
        id: 'coorg-mysore-day-3',
        day: 3,
        title: 'Day 3: Namdroling Monastery → Elephant Camp → Chiklihole Dam 🛕🐘🌊',
        activities: [
          "Enjoy breakfast and get ready for another day of exploring Coorg.",
          "Visit Namdroling Buddhist Monastery, also known as the Golden Temple, one of the largest Tibetan settlements in India.",
          "Head to the Elephant Camp and experience the opportunity to see elephants up close, including bathing and rides as mentioned in the itinerary.",
          "Later, visit Chiklihole Dam, a scenic man-made reservoir surrounded by lush greenery.",
          "Return to the stay, enjoy dinner and relax after a day of exploration.",
          "Meals: Breakfast & Dinner."
        ]
      },
      {
        id: 'coorg-mysore-day-4',
        day: 4,
        title: 'Day 4: Mandalpatti → Abbey Falls → Mysore | New Year Celebration 🚙💦🎆',
        activities: [
          "Start the day early with an exciting Jeep ride to Mandalpatti Peak.",
          "Reach the viewpoint and enjoy the beautiful sunrise and panoramic views of Coorg's misty valleys.",
          "Later, visit the spectacular Abbey Falls.",
          "Visit the historic Omkareshwar Temple before leaving Coorg.",
          "Proceed towards Mysore and check in to your stay.",
          "In the evening, celebrate New Year's Eve near the magnificent Mysore Palace and welcome the New Year with your tribe.",
          "Meals: Breakfast & Dinner."
        ]
      },
      {
        id: 'coorg-mysore-day-5',
        day: 5,
        title: 'Day 5: Mysore Exploration → Mangalore → Mumbai 🏰🛍️🚂',
        activities: [
          "Start the New Year by visiting the magnificent Mysore Palace and experiencing its royal architecture.",
          "Explore Mysore's local sights, markets and food scene.",
          "Later, proceed towards Mangalore Junction for your return train journey.",
          "Board your train back towards Mumbai and spend the journey relaxing with your fellow travellers.",
          "Meals: Breakfast."
        ]
      },
      {
        id: 'coorg-mysore-day-6',
        day: 6,
        title: 'Day 6: Arrival in Mumbai 🏠✨',
        activities: [
          "Arrive back in Mumbai and conclude your Coorg–Mysore New Year adventure.",
          "Expected arrival of approximately 2:50 PM at Panvel or 3:45 PM at Thane.",
          "Return home with new friendships, photographs and memories from the trip."
        ]
      }
    ],
    inclusions: [
      "3 nights accommodation on triple/quad sharing basis.",
      "Train travel from Mumbai and back (Sleeper Non-AC tickets on Confirmed/RAC basis; 3AC upgrade available).",
      "Jeep ride to Mandalpatti Peak.",
      "Internal transportation by private vehicle.",
      "4 breakfasts and 3 dinners — 7 meals in total.",
      "Coffee & Spice Plantation Tour.",
      "Abbey Falls visit, Elephant Camp visit, Namdroling Monastery visit.",
      "Mysore Palace and local market exploration.",
      "NY Celebration at Mysore Palace.",
      "Trip Captain throughout the trip.",
      "Entry fees and parking charges.",
      "Coffee plantation tour entry charges."
    ],
    exclusions: [
      "Train meals are not included.",
      "Lunch throughout the trip is not included.",
      "Driver tips, monument entry charges, camera/video charges, laundry, telephone bills and other personal expenses.",
      "Any extra railway costs and train food.",
      "Tatkal train ticket charges, if applicable.",
      "Animal feeding charges at the Elephant Camp and Nisargadhama.",
      "Any additional expenses not specifically mentioned under inclusions.",
      "5% GST."
    ],
    thingsToCarry: [
      "Valid Government Photo ID (Aadhaar / Driving License / Passport) — Same as used during booking (Mandatory)",
      "Comfortable trekking shoes / sneakers with good grip and casual footwear",
      "Light cotton clothes, comfortable travel wear, and a light jacket / sweater for cool Coorg mornings",
      "Sun protection: Sunscreen (SPF 50+), sunglasses, and cap",
      "Personal medical kit (Band-aids, motion sickness tablets, ORS / Glucose)",
      "Power bank, camera, and charging cables",
      "Reusable water bottle"
    ],
    policies: [
      "The trip includes train travel from Mumbai to Mangalore and back, so travellers should carry the same government-issued ID used during booking.",
      "Train tickets are booked in advance by the Travel Tribes team, subject to availability.",
      "Confirmed/RAC status is subject to railway availability at the time of booking. Specific berth preferences cannot be guaranteed.",
      "Group members may not always be seated together as final seat allocation is handled by Indian Railways.",
      "If tickets are in waiting status, Tatkal booking may be used, and additional Tatkal charges will be payable by the traveller.",
      "If a confirmed Tatkal ticket cannot be secured, alternate train or transport may be arranged depending on availability, and any fare difference will apply.",
      "Book at least 30 days before departure to improve the chances of getting confirmed train tickets.",
      "Train delays, rescheduling or cancellations by Indian Railways are outside Travel Tribes' control.",
      "The Trip Leader has the right to modify, skip or alter sightseeing/itinerary in case of an emergency, force majeure or inappropriate participant behaviour.",
      "In triple-sharing rooms, an extra mattress is provided and should not be considered an extra bed.",
      "Delays caused by participants at sightseeing locations may result in the cancellation or skipping of subsequent sightseeing.",
      "Participants are expected to coordinate, maintain discipline and cooperate as a team.",
      "No refund will be provided in case of a no-show on the day of the trip.",
      "Alcohol consumption and serving in hotels/rooms are subject to the respective hotel's rules.",
      "A valid photo ID is mandatory for all members staying at the hotel.",
      "The itinerary may change slightly during public holidays or festivals.",
      "Vehicles are provided strictly as per the itinerary on a point-to-point basis and are not available for personal use.",
      "Travellers are responsible for their own luggage and belongings.",
      "Travel Tribes is not liable if sightseeing is closed due to a special occasion, public holiday, long weekend or festival.",
      "Travel Tribes does not provide insurance covering illness, accidents, theft or other losses.",
      "Water and electricity availability may be limited in some areas, and hotels may have fixed schedules for hot and cold water.",
      "Transportation and logistics may vary depending on the final group size.",
      "Travel Tribes strictly stands against any form of harassment, and physical contact should always respect another person's comfort.",
      "Participants undertake the risks associated with road travel, vehicles and nature-based activities.",
      "AC may not be available in vehicles such as Tempo Travellers, Innovas, Xylos, Scorpios or similar vehicles in hilly regions.",
      "Third-party buses may experience breakdowns, and arranging a replacement vehicle may take some time.",
      "Bus/vehicle halts for meals are predefined by the transport vendor and cannot be changed for individual convenience.",
      "Refunds will be provided only in case the trip is cancelled or postponed by the company/organisers, subject to the applicable policy.",
      "Participants consent to Travel Tribes using photos/videos taken during the trip for social media and marketing purposes.",
      "Booking Amount: ₹5,000 per person to confirm your seat.",
      "Cancellation 30+ days prior: Advance amount retained / converted to Travel Tribes credit.",
      "Cancellation 15–29 days prior: 50% deduction of total trip cost.",
      "Cancellation < 14 days / No-Show: 100% deduction (No refund for unused services).",
      "Cancellation by Travel Tribes: 100% full refund within 4–7 business days if the trip is cancelled by the operator."
    ],
    pricingOptions: [
      { label: 'Ex-Mangalore (Triple / Quad Sharing)', price: '₹12,999 / person + 5% GST' },
      { label: 'Mumbai to Mumbai (Non-AC Sleeper Train)', price: '₹14,499 / person + 5% GST' },
      { label: 'Mumbai to Mumbai (3-Tier AC Train)', price: '₹16,499 / person + 5% GST' }
    ],
    bookingAmount: '₹5,000 / person',
    reviews: [
      {
        name: 'Gaurav Shinde',
        role: 'Verified Traveller',
        detail: 'Coorg & Mysore NY Special',
        rating: 5,
        quote: 'Celebrating New Year’s Eve near Mysore Palace was one of the most magical experiences ever! The sunrise at Mandalpatti Peak and the coffee tasting in Coorg were highlights of the trip. The team took care of everything seamlessly.'
      },
      {
        name: 'Sneha Kulkarni',
        role: 'Verified Traveller',
        detail: 'Coorg New Year Group Trip',
        rating: 5,
        quote: 'Travelled solo from Mumbai and made friends for life. The train journey, games, Abbey Falls, and the Golden Temple were all super well coordinated. Perfect way to ring in the New Year!'
      },
      {
        name: 'Ketan Patel',
        role: 'Local Guide',
        reviewCount: '19 reviews',
        photoCount: '52 photos',
        detail: 'Coorg with Mysore Celebration',
        rating: 5,
        quote: 'Great management, comfortable stays, delicious meals, and the best crowd of travellers. Mysore Palace fireworks and the Mandalpatti off-road jeep ride made this trip unforgettable.'
      }
    ]
  },
  {
    id: 'meghalaya-backpacking',
    slug: 'meghalaya-backpacking',
    title: 'Meghalaya Backpacking Trip',
    location: 'Shillong · Cherrapunjee · Dawki · Mawlynnong · Guwahati',
    region: 'Domestic',
    date: 'Oct 02–07, 2026',
    dates: [
      'Oct 02–07, 2026',
      'Oct 10–15, 2026',
      'Oct 17–22, 2026',
      'Oct 24–29, 2026',
      'Oct 31–Nov 05, 2026',
      'Nov 07–12, 2026',
      'Nov 14–19, 2026',
      'Nov 21–26, 2026',
      'Nov 28–Dec 03, 2026',
      'Dec 05–10, 2026',
      'Dec 12–17, 2026',
      'Dec 19–24, 2026',
      'Dec 24–29, 2026 (XMAS Special)',
      'Dec 27–Jan 01, 2027 (New Year Special)',
      'Jan 02–07, 2027',
      'Jan 09–14, 2027',
      'Jan 16–21, 2027',
      'Jan 23–28, 2027'
    ],
    duration: '5N/6D',
    price: '₹20,999',
    image: '/Card Image/meghalaya_6_days.jpg',
    alt: 'Nongriat Double Decker Living Root Bridge and lush rainforest of Meghalaya',
    tag: 'Abode of Clouds',
    description: 'Immerse yourself in the mystical beauty of Northeast India with our 6-day Meghalaya Backpacking group adventure starting from Guwahati. Trek through lush rainforests to the world-famous Nongriat Double Decker Living Root Bridge, swim in the surreal crystal waters of Blue Lagoon & Krang Suri, camp by the transparent Umngot River in Dawki/Shnongpdeng, explore Asia’s cleanest village Mawlynnong, and gaze into the clouds from Laitlum Canyons and Nohkalikai Falls. Explore Meghalaya with fellow curious wanderers and find your tribe.',
    spots: '5 spots left',
    gallery: [
      { image: "/image/Meghalaya/meghalaya_img.JPEG", alt: "Meghalaya" },
      { image: "/image/Meghalaya/IMG_0857.JPEG", alt: "Meghalaya" },
      { image: "/image/Meghalaya/IMG_0934.JPEG", alt: "Meghalaya" },
      { image: "/image/Meghalaya/IMG_1033.JPEG", alt: "Meghalaya" },
      { image: "/image/Meghalaya/IMG_1124.JPEG", alt: "Meghalaya" },
      { image: "/image/Meghalaya/IMG_1250.JPEG", alt: "Meghalaya" },
      { image: "/image/Meghalaya/IMG_1370.JPEG", alt: "Meghalaya" },
      { image: "/image/Meghalaya/IMG_2093.JPG", alt: "Meghalaya" },
      { image: "/image/Meghalaya/IMG_6639.jpg", alt: "Meghalaya" },
      { image: "/image/Meghalaya/IMG_7113.jpg", alt: "Meghalaya" }
    ],
    highlights: [
      "Experience the scenic beauty of Umiam Lake and the panoramic views from Laitlum Canyons.",
      "Discover the turquoise waters and natural beauty of Krang Suri and Phe Phe Falls.",
      "Spend a memorable evening at Dawki/Shnongpdeng and experience the charm of Meghalaya's riverside landscapes.",
      "Explore Mawlynnong Village, along with its Bamboo Sky Walk and Living Root Bridge.",
      "Visit the Indo-Bangladesh Border and experience one of Meghalaya's unique geographical landmarks.",
      "Trek through the lush forests to the famous Double Decker Living Root Bridge.",
      "Take a refreshing swim in the crystal-clear natural pool at Blue Lagoon.",
      "Explore Mawsmai Cave, Arwah Cave and Garden of Caves in Cherrapunjee.",
      "Witness the spectacular Nohkalikai Falls and Seven Sisters Falls.",
      "Travel with a community of like-minded people and create unforgettable memories together."
    ],
    itinerary: [
      {
        id: 'meghalaya-day-1',
        day: 1,
        title: 'Day 1: Guwahati → Shillong 🚗',
        activities: [
          "Arrive at Guwahati Airport before 11:00 AM, where our representative will meet and greet you.",
          "The group will depart for Shillong at 12:00 PM and enjoy a scenic drive through the beautiful landscapes of Meghalaya.",
          "En route, stop at Umiam Lake (Barapani) to enjoy the views and capture some beautiful photographs.",
          "On arrival in Shillong, check in to the hotel and take some time to relax.",
          "In the evening, head out to explore the lively Police Bazaar and experience the local atmosphere.",
          "Return to the hotel for an overnight stay in Shillong.",
          "Meals: Not included."
        ]
      },
      {
        id: 'meghalaya-day-2',
        day: 2,
        title: 'Day 2: Shillong → Laitlum Canyons → Krang Suri → Phe Phe Falls → Dawki 🏞️',
        activities: [
          "Enjoy breakfast at the Campsite before checking out and starting the journey towards Dawki/Shnongpdeng.",
          "Visit the breathtaking Laitlum Canyons, known for its dramatic landscapes and panoramic valley views.",
          "Continue the journey and explore the beautiful Krang Suri Waterfall, surrounded by lush greenery.",
          "Later, visit the scenic Phe Phe Falls and enjoy the natural beauty of the waterfall.",
          "Continue towards Dawki/Shnongpdeng and check in to your campsite or homestay.",
          "Spend the evening at leisure, relaxing by the riverside and enjoying the peaceful surroundings.",
          "Overnight stay in Dawki/Shnongpdeng.",
          "Meals: Breakfast & Dinner."
        ]
      },
      {
        id: 'meghalaya-day-3',
        day: 3,
        title: 'Day 3: Dawki → Mawlynnong → Cherrapunjee 🛶',
        activities: [
          "Enjoy an exciting morning at Dawki River with boating, kayaking and cliff jumping.",
          "After the river activities, proceed towards Mawlynnong Village, known as one of Asia’s cleanest villages.",
          "Explore the famous Bamboo Sky Walk and Single Decker Living Root Bridge.",
          "Visit the Indo-Bangladesh Border and take in the unique views of the region.",
          "Later, proceed towards Cherrapunjee and check in to your stay.",
          "Spend the evening relaxing and enjoying the peaceful surroundings.",
          "Overnight stay: Cherrapunjee",
          "Meals: Breakfast."
        ]
      },
      {
        id: 'meghalaya-day-4',
        day: 4,
        title: 'Day 4: Cherrapunjee → Double Decker Living Root Bridge → Blue Lagoon 🌿💧',
        activities: [
          "After breakfast, depart for Tyrna Village, the starting point of your famous root bridge trek.",
          "Begin the trek towards the Single Decker Living Root Bridge and continue further through the lush forests.",
          "Reach the iconic Double Decker Living Root Bridge, one of Meghalaya's most unique natural attractions.",
          "Continue towards the beautiful Blue Lagoon Waterfall, where you can enjoy a refreshing swim in its crystal-clear natural pool.",
          "After spending time at the Blue Lagoon, trek back to Tyrna Village. The trek involves approximately 3,300 steps one way and around 6,600 steps in total.",
          "After completing the trek, drive back to Cherrapunjee for an overnight stay.",
          "Meals: Breakfast."
        ]
      },
      {
        id: 'meghalaya-day-5',
        day: 5,
        title: 'Day 5: Cherrapunjee Sightseeing → Shillong 🪨🌊',
        activities: [
          "Enjoy breakfast and check out from your stay before beginning your Cherrapunjee sightseeing.",
          "Visit the famous Mawsmai Cave and explore the fascinating Arwah Cave.",
          "Continue to the beautiful Garden of Caves, surrounded by Meghalaya's natural landscapes.",
          "Witness the spectacular Nohkalikai Falls and Seven Sisters Falls, two of the region's iconic waterfalls.",
          "Later, proceed back to Shillong and check in to your hotel.",
          "Spend the evening at leisure and enjoy an overnight stay in Shillong.",
          "Meals: Breakfast."
        ]
      },
      {
        id: 'meghalaya-day-6',
        day: 6,
        title: 'Day 6: Shillong → Guwahati Airport | Departure 🛫',
        activities: [
          "Enjoy breakfast and check out from the hotel.",
          "Depart for Guwahati Airport around 9:00 AM for your return journey.",
          "The drive to the airport takes approximately 4–5 hours, with an expected arrival around 3:00 PM.",
          "We recommend booking your return flight after 5:00 PM to allow sufficient time for the journey.",
          "Bid farewell to your fellow travellers and take home unforgettable memories from your Meghalaya adventure.",
          "Meals: Breakfast."
        ]
      }
    ],
    inclusions: [
      "Pickup & drop as per fixed timings.",
      "Transportation throughout the itinerary by Tempo Traveller/SUV/Sedan depending on group size.",
      "5 nights accommodation: 2 nights Shillong, 2 nights Cherrapunjee, 1 night Dawki/Shnongpdeng.",
      "5 breakfasts + 1 dinner at Dawki.",
      "Guide for the Nongriat Double Decker Root Bridge trek.",
      "30-minute complimentary Dawki River boating — 4 people per boat.",
      "Toll, parking, fuel and driver allowances.",
      "24×7 on-call support.",
      "Trip Leader throughout the trip."
    ],
    exclusions: [
      "Lunches and meals not mentioned.",
      "Flights/airfare and rail fare.",
      "Travel insurance.",
      "Additional activities not mentioned in the itinerary.",
      "Entry fees/tickets to attractions.",
      "Personal expenses, tips, laundry, telephone bills, camera/video charges, etc.",
      "Costs arising from landslides, roadblocks or natural calamities.",
      "5% GST is extra."
    ],
    thingsToCarry: [
      "Valid Government Photo ID (Aadhaar / Passport / Driving License) — Mandatory",
      "Comfortable trekking / walking shoes with good grip + extra pair of socks",
      "Quick-dry t-shirts, comfortable trek pants, and swimwear for Blue Lagoon / waterfalls",
      "Light rain jacket / poncho / umbrella (Cherrapunjee weather can be unpredictable)",
      "Light sweater or jacket for cooler Shillong evenings",
      "Sun protection: Sunscreen (SPF 50+), sunglasses, and wide-brim cap",
      "Personal medical kit (Band-aids, crepe bandage, pain relief spray, ORS / Glucose)",
      "Power bank, camera, and waterproof phone pouch",
      "Reusable water bottle",
      "Sufficient cash for local bazaar shopping (handicrafts, honey) and street food"
    ],
    policies: [
      "Book your trip at least 25–30 days prior to departure to secure early bird slots and best flight rates.",
      "Flight recommendation: Book arrival flight reaching Guwahati (GAU) before 11:00 AM on Day 1, and return flight departing after 5:00 PM on Day 6.",
      "Booking Amount: ₹5,000 per person to confirm your seat, with the remaining balance payable as per the payment policy.",
      "Trip Leader Authority: The trip leader reserves the right to alter or skip sightseeing in case of roadblocks, weather conditions, or local advisories.",
      "Trek Fitness: Day 4 trek involves approx 3,300 steps one way and 6,600 steps round trip. Moderate fitness is recommended.",
      "Room Sharing: Standard package is on Triple sharing (extra mattress provided). Double sharing room option available on request.",
      "Cancellation 30+ days prior: 10% deduction on total trip cost.",
      "Cancellation 15–29 days prior: 25% deduction on remaining balance.",
      "Cancellation 8–14 days prior: 50% deduction on remaining balance.",
      "Cancellation < 7 days / No-Show: 100% deduction (No refund for unused services).",
      "Cancellation by Travel Tribes: If the trip is cancelled by the operator, the booking/advance amount will be fully refundable within 4–7 business days. Rescheduling or travel credit may also be offered."
    ],
    pricingOptions: [
      { label: 'Triple Sharing (Guwahati to Guwahati)', price: '₹20,999 / person + 5% GST' },
      { label: 'Double Sharing (Guwahati to Guwahati)', price: '₹22,999 / person + 5% GST' },
      { label: 'Xmas & New Year (Triple Sharing)', price: '₹22,999 / person + 5% GST', note: 'Applicable on Dec 24 & Dec 27 batches' },
      { label: 'Xmas & New Year (Double Sharing)', price: '₹24,499 / person + 5% GST', note: 'Applicable on Dec 24 & Dec 27 batches' }
    ],
    bookingAmount: '₹5,000 / person',
    reviews: [
      {
        name: 'Sayali Mhatre',
        role: 'Verified Traveller',
        detail: 'Meghalaya Backpacking Trip',
        rating: 5,
        quote: 'Meghalaya with Travel Tribes was a dream come true! The crystal clear water at Dawki, the double decker root bridge trek, and swimming in Blue Lagoon was breathtaking. The tribe vibe was top notch!'
      },
      {
        name: 'Arjun Deshmukh',
        role: 'Verified Traveller',
        detail: 'Meghalaya Backpacking Trip',
        rating: 5,
        quote: 'Best group trip ever. Everything from the stays, food, waterfall hikes to root bridge trek was super well organized. Our trip captain made everyone feel like old friends within the first day.'
      },
      {
        name: 'Priyanka Bose',
        role: 'Local Guide',
        reviewCount: '14 reviews',
        photoCount: '38 photos',
        detail: 'Meghalaya Backpacking Trip',
        rating: 5,
        quote: 'Nohkalikai falls, Krang Suri, and swimming in Blue Lagoon were pure magic. If you are travelling solo to Northeast, Travel Tribes is 100% the best choice. Tribe hai to vibe hai!'
      }
    ]
  },
  {
    id: 'meghalaya-with-kaziranga',
    slug: 'meghalaya-with-kaziranga',
    title: 'Meghalaya with Kaziranga — 6N/7D',
    location: 'Shillong · Cherrapunjee · Dawki · Kaziranga · Guwahati',
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
    price: '₹23,999',
    image: '/Card Image/meghalaya_with_Kaziranga.png',
    alt: 'Nongriat Double Decker Living Root Bridge and Kaziranga wildlife safari in Meghalaya & Assam',
    tag: 'Abode of Clouds & Safari',
    description: 'Immerse yourself in the mystical beauty of Northeast India with our 7-day Meghalaya with Kaziranga group adventure starting from Guwahati. Trek through lush rainforests to the world-famous Nongriat Double Decker Living Root Bridge, swim in the surreal crystal waters of Blue Lagoon & Krang Suri, camp by the transparent Umngot River in Dawki/Shnongpdeng, explore Asia’s cleanest village Mawlynnong, and gaze into the clouds from Laitlum Canyons and Nohkalikai Falls. Crown your adventure with a thrilling wildlife jeep safari in Kaziranga National Park to encounter majestic One-horned Rhinoceroses, wild elephants, and rich wildlife in their natural habitat. Explore Northeast with fellow curious wanderers and find your tribe.',
    spots: '5 spots left',
    gallery: [
      { image: "/image/Meghalaya/meghalaya_img.JPEG", alt: "Meghalaya" },
      { image: "/image/Meghalaya/IMG_0857.JPEG", alt: "Meghalaya" },
      { image: "/image/Meghalaya/IMG_0934.JPEG", alt: "Meghalaya" },
      { image: "/image/Meghalaya/IMG_1033.JPEG", alt: "Meghalaya" },
      { image: "/image/Meghalaya/IMG_1124.JPEG", alt: "Meghalaya" },
      { image: "/image/Meghalaya/IMG_1250.JPEG", alt: "Meghalaya" },
      { image: "/image/Meghalaya/IMG_1370.JPEG", alt: "Meghalaya" },
      { image: "/image/Meghalaya/IMG_2093.JPG", alt: "Meghalaya" },
      { image: "/image/Meghalaya/IMG_6639.jpg", alt: "Meghalaya" },
      { image: "/image/Meghalaya/IMG_7113.jpg", alt: "Meghalaya" }
    ],
    highlights: [
      "Experience the scenic beauty of Umiam Lake and the panoramic landscapes of Laitlum Canyons.",
      "Explore the turquoise waters and natural beauty of Krang Suri and Phe Phe Falls.",
      "Stay in Dawki/Shnongpdeng and experience the charm of Meghalaya's riverside landscapes.",
      "Visit Mawlynnong Village, along with the Bamboo Sky Walk and Living Root Bridge.",
      "Enjoy the beautiful Dawki/Umngot River and experience the unique Indo-Bangladesh Border.",
      "Trek through the lush forests to the famous Double Decker Living Root Bridge.",
      "Take a refreshing swim in the crystal-clear waters of the Blue Lagoon.",
      "Explore Mawsmai Cave, Arwah Cave, Garden of Caves and Mawkdok Valley.",
      "Witness the spectacular Nohkalikai Falls and Seven Sisters Falls.",
      "Experience an exciting Jeep Safari at Kaziranga National Park and explore its rich wildlife."
    ],
    itinerary: [
      {
        id: 'meghalaya-kaziranga-day-1',
        day: 1,
        title: 'Day 1: Guwahati → Shillong 🚗',
        activities: [
          "Arrive at Guwahati Airport before 11:00 AM, where our representative will meet and greet you.",
          "The group will depart for Shillong at 12:00 PM and enjoy a scenic drive through the beautiful landscapes of Assam and Meghalaya.",
          "En route, stop at Umiam Lake (Barapani) to enjoy its mesmerising views and capture some beautiful photographs.",
          "Arrive in Shillong and check in to the hotel.",
          "In the evening, explore the lively Police Bazaar and experience the local atmosphere.",
          "Return to the hotel for an overnight stay in Shillong.",
          "Meals: Not included."
        ]
      },
      {
        id: 'meghalaya-kaziranga-day-2',
        day: 2,
        title: 'Day 2: Shillong → Laitlum → Krang Suri → Phe Phe → Dawki 🏞️',
        activities: [
          "Enjoy breakfast at the hotel before checking out and proceeding towards Dawki/Shnongpdeng.",
          "Visit the breathtaking Laitlum Canyons and enjoy panoramic views of the surrounding valleys.",
          "Continue towards Krang Suri Waterfalls and Phe Phe Falls, exploring the natural beauty of Meghalaya.",
          "After exploring the waterfalls, continue your journey towards Dawki/Shnongpdeng.",
          "Check in to your stay and relax after the day's exploration.",
          "Overnight stay in Dawki/Shnongpdeng.",
          "Meals: Breakfast & Dinner."
        ]
      },
      {
        id: 'meghalaya-kaziranga-day-3',
        day: 3,
        title: 'Day 3: Dawki → Mawlynnong → Cherrapunjee 🛶',
        activities: [
          "Enjoy an exciting morning at Dawki River with boating, kayaking and cliff jumping.",
          "After the river activities, proceed towards Mawlynnong Village, known as one of Asia’s cleanest villages.",
          "Explore the famous Bamboo Sky Walk and Single Decker Living Root Bridge.",
          "Visit the Indo-Bangladesh Border and take in the unique views of the region.",
          "Later, proceed towards Cherrapunjee and check in to your stay.",
          "Spend the evening relaxing and enjoying the peaceful surroundings.",
          "Overnight stay: Cherrapunjee",
          "Meals: Breakfast."
        ]
      },
      {
        id: 'meghalaya-kaziranga-day-4',
        day: 4,
        title: 'Day 4: Cherrapunjee → Double Decker Root Bridge → Blue Lagoon 🌿💧',
        activities: [
          "Enjoy breakfast and depart for Tyrna Village, the starting point of the day's trek.",
          "Begin the trek towards the Single Decker Living Root Bridge and continue further to the famous Double Decker Living Root Bridge.",
          "Continue through the lush surroundings to reach the beautiful Blue Lagoon Waterfall.",
          "Enjoy a refreshing swim in the crystal-clear natural pool at the Blue Lagoon.",
          "Trek back to Tyrna Village. The trek involves approximately 3,300 steps one way and around 6,600 steps in total.",
          "After completing the trek, return to Cherrapunjee for an overnight stay.",
          "Meals: Breakfast & Dinner."
        ]
      },
      {
        id: 'meghalaya-kaziranga-day-5',
        day: 5,
        title: 'Day 5: Cherrapunjee Sightseeing → Shillong 🪨🌊',
        activities: [
          "Enjoy breakfast and check out from your stay.",
          "Visit the famous Mawsmai Cave and stop at Mawkdok Valley to enjoy its breathtaking views.",
          "Explore the fascinating Arwah Cave and the beautiful Garden of Caves.",
          "Witness the majestic Nohkalikai Falls, followed by Seven Sisters Falls and Eco Park.",
          "Later, proceed back to Shillong and check in to your stay.",
          "Spend the evening at leisure and relax at the hotel.",
          "Overnight stay in Shillong.",
          "Meals: Breakfast."
        ]
      },
      {
        id: 'meghalaya-kaziranga-day-6',
        day: 6,
        title: 'Day 6: Shillong → Kaziranga 🦏',
        activities: [
          "Enjoy breakfast and check out from the hotel.",
          "Depart for Kaziranga and enjoy a scenic drive through the beautiful landscapes of Assam.",
          "Arrive in Kaziranga by evening and check in to your hotel.",
          "Spend the evening at leisure, relaxing after the journey.",
          "Overnight stay in Kaziranga.",
          "Meals: Breakfast."
        ]
      },
      {
        id: 'meghalaya-kaziranga-day-7',
        day: 7,
        title: 'Day 7: Kaziranga Safari → Guwahati 🚙🦏',
        activities: [
          "Start your morning with an exciting Jeep Safari in Kaziranga National Park.",
          "Explore the national park and look out for wildlife including one-horned rhinoceros, elephants, water buffaloes, swamp deer and other species.",
          "After the safari, drive back towards Guwahati for your return journey.",
          "We recommend booking your return flight after 6:00 PM for a comfortable departure.",
          "End the trip with unforgettable memories and photographs from your Meghalaya and Kaziranga adventure.",
          "Meals: Breakfast."
        ]
      }
    ],
    inclusions: [
      "Transportation throughout the itinerary by Tempo Traveller, SUV or Sedan, depending on group size.",
      "Accommodation on a double/triple sharing basis: 2 nights in Shillong, 1 night camping at Shnongpdeng/Dawki, 2 nights in Cherrapunjee and 1 night in Kaziranga.",
      "6 breakfasts from Day 2 to Day 7.",
      "1 dinner on Day 2.",
      "Kaziranga National Park Jeep Safari.",
      "Guided trek to various points of interest.",
      "Boat ride in the crystal-clear Umngot River at Dawki.",
      "Driver night charges, toll fees and parking charges.",
      "All necessary permits required for the trip.",
      "Trip Leader throughout the trip."
    ],
    exclusions: [
      "Lunches and any meals not specifically mentioned in the itinerary.",
      "Flights and airfare are not included.",
      "Travel insurance.",
      "Charges for additional activities not specified in the itinerary.",
      "Entry fees or tickets to attractions.",
      "Airfare or rail fare.",
      "Personal expenses such as driver tips, monument entry fees, camera/video charges, laundry, telephone bills, etc.",
      "Any additional costs arising due to landslides, roadblocks or natural calamities.",
      "5% GST."
    ],
    thingsToCarry: [
      "Valid Government Photo ID (Aadhaar / Passport / Driving License) — Mandatory",
      "Comfortable trekking / walking shoes with good grip + extra pair of socks",
      "Quick-dry t-shirts, comfortable trek pants, and swimwear for Blue Lagoon / waterfalls",
      "Light rain jacket / poncho / umbrella (Cherrapunjee weather can be unpredictable)",
      "Light sweater or jacket for cooler Shillong evenings",
      "Sun protection: Sunscreen (SPF 50+), sunglasses, and wide-brim cap",
      "Personal medical kit (Band-aids, crepe bandage, pain relief spray, ORS / Glucose)",
      "Power bank, camera, and waterproof phone pouch",
      "Reusable water bottle",
      "Sufficient cash for local bazaar shopping and street food"
    ],
    policies: [
      "Book your trip at least 25–30 days prior to departure to secure early bird slots and best flight rates.",
      "Flight recommendation: Book arrival flight reaching Guwahati (GAU) before 11:00 AM on Day 1, and return flight departing after 6:00 PM on Day 7.",
      "Booking Amount: ₹5,000 per person to confirm your seat. The remaining balance is payable as per the payment policy.",
      "Trip Leader Authority: The trip leader reserves the right to alter or skip sightseeing in case of roadblocks, weather conditions, or local advisories.",
      "Trek Fitness: Day 4 trek involves approx 3,300 steps one way and around 6,600 steps in total. Moderate fitness is recommended.",
      "Room Sharing: Standard package is on Triple sharing (extra mattress provided). Double sharing room option available on request.",
      "Cancellation 30+ days prior: 10% deduction on total trip cost.",
      "Cancellation 15–29 days prior: 25% deduction on remaining balance.",
      "Cancellation 8–14 days prior: 50% deduction on remaining balance.",
      "Cancellation < 7 days / No-Show: 100% deduction (No refund for unused services).",
      "Cancellation by Travel Tribes: If the trip is cancelled by the operator, the booking/advance amount will be fully refundable within 4–7 business days. Rescheduling or travel credit may also be offered."
    ],
    pricingOptions: [
      { label: 'Triple Sharing (Guwahati to Guwahati)', price: '₹23,999 / person + 5% GST' },
      { label: 'Double Sharing (Guwahati to Guwahati)', price: '₹25,999 / person + 5% GST' },
      { label: 'Xmas & New Year (Triple Sharing)', price: '₹26,499 / person + 5% GST', note: 'Applicable on Dec 24 & Dec 27 batches' },
      { label: 'Xmas & New Year (Double Sharing)', price: '₹28,499 / person + 5% GST', note: 'Applicable on Dec 24 & Dec 27 batches' }
    ],
    bookingAmount: '₹5,000 / person',
    reviews: [
      {
        name: 'Sayali Mhatre',
        role: 'Verified Traveller',
        detail: 'Meghalaya with Kaziranga Expedition',
        rating: 5,
        quote: 'Meghalaya with Travel Tribes was a dream come true! The crystal clear water at Dawki, the double decker root bridge trek, and seeing one-horned rhinos in Kaziranga was breathtaking. The tribe vibe was top notch!'
      },
      {
        name: 'Arjun Deshmukh',
        role: 'Verified Traveller',
        detail: 'Meghalaya with Kaziranga Expedition',
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
        quote: 'Nohkalikai falls, Krang Suri, and seeing one-horned rhinos in Kaziranga were pure magic. If you are travelling solo to Northeast, Travel Tribes is 100% the best choice. Tribe hai to vibe hai!'
      }
    ]
  },
  {
    id: 'sri-lanka-island-escape',
    slug: 'sri-lanka-island-escape',
    title: 'Sri Lanka — The Island Escape',
    location: 'Colombo · Kandy · Sigiriya · Ella · Mirissa · Sri Lanka',
    region: 'International',
    date: 'Oct 17–24, 2026',
    dates: [
      'Oct 17–24, 2026',
      'Nov 07–14, 2026',
      'Nov 21–28, 2026',
      'Dec 19–26, 2026 (Christmas Special)',
      'Dec 27–Jan 03, 2027 (New Year Special)'
    ],
    duration: '7N/8D',
    price: '₹52,999',
    image: '/Card Image/srilanka.png',
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
      "Explore the cultural charm and heritage of Kandy.",
      "Visit the famous Pinnawala Elephant Orphanage and Spice & Herbal Garden.",
      "Climb the iconic Sigiriya Lion Rock Fortress.",
      "Experience an authentic Sri Lankan Village Adventure with a bullock cart and canoe ride.",
      "Explore the ancient Dambulla Cave Temple.",
      "Witness the vibrant Kandy Cultural Dance Show.",
      "Discover Sri Lanka’s lush Tea Gardens & Tea Factories.",
      "Experience the scenic Nanu Oya to Ella train journey.",
      "Hike to Little Adam’s Peak and visit the iconic Nine Arch Bridge.",
      "Experience the thrilling Rawana Mega Zip Line and explore Rawana Caves.",
      "Relax on the beaches of Mirissa and enjoy the coastal vibes.",
      "Experience Whale & Dolphin Watching, surfing, snorkelling and optional scuba diving."
    ],
    itinerary: [
      {
        id: 'sri-lanka-day-1',
        day: 1,
        title: 'Day 1: Arrival in Sri Lanka → Negombo 🌴',
        activities: [
          "Arrive at Bandaranaike International Airport, where our local representative will welcome you.",
          "Transfer to Negombo, located approximately 20 minutes from the airport.",
          "Check in to your hotel, freshen up and relax after your journey.",
          "Spend the rest of the day at leisure and enjoy your first glimpse of Sri Lanka.",
          "Overnight stay: Negombo / Colombo."
        ]
      },
      {
        id: 'sri-lanka-day-2',
        day: 2,
        title: 'Day 2: Negombo → Kandy | Elephants & Scenic Views 🐘🛕',
        activities: [
          "Enjoy breakfast and check out from the hotel before proceeding towards Kandy.",
          "En route, visit the Pinnawala Elephant Orphanage and explore a Spice & Herbal Garden.",
          "Continue towards Kandy and visit the Gem Museum & Lapidary.",
          "Explore the Temple of the Sacred Tooth Relic, one of Sri Lanka’s most revered Buddhist sites.",
          "Enjoy a scenic drive around Kandy Upper Lake and stop at a viewpoint for panoramic views.",
          "In the evening, experience the vibrant Kandy Cultural Dance Show.",
          "Check in to the hotel, enjoy dinner and relax for the night.",
          "Overnight stay: Kandy."
        ]
      },
      {
        id: 'sri-lanka-day-3',
        day: 3,
        title: 'Day 3: Kandy → Sigiriya → Dambulla → Kandy 🦁🌾',
        activities: [
          "Start the day with an early breakfast and depart from the hotel at 8:00 AM.",
          "Climb the iconic Sigiriya Lion Rock Fortress, a UNESCO World Heritage Site, and enjoy spectacular views from the top.",
          "Experience authentic Sri Lankan village life with a traditional bullock cart ride and canoe ride.",
          "Enjoy a traditional Sri Lankan lunch during the village experience.",
          "Visit the ancient Dambulla Cave Temple, home to more than 150 Buddha statues and historic cave paintings.",
          "After a full day of sightseeing and experiences, return to Kandy.",
          "Overnight stay: Kandy."
        ]
      },
      {
        id: 'sri-lanka-day-4',
        day: 4,
        title: 'Day 4: Kandy → Nuwara Eliya → Ella 🚂⛰️',
        activities: [
          "Enjoy breakfast and check out from the hotel before departing for Nuwara Eliya at 7:30 AM.",
          "Visit a Tea Factory & Tea Gardens in Ramboda and learn about Sri Lanka’s famous tea production.",
          "Stop at the beautiful Ramboda Waterfalls for photographs and scenic views.",
          "Board the famous scenic train from Nanu Oya to Ella.",
          "Enjoy approximately 3–4 hours of scenic train travel through tea plantations, mountains and valleys.",
          "Arrive in Ella, transfer to your hotel and relax.",
          "Overnight stay: Ella."
        ]
      },
      {
        id: 'sri-lanka-day-5',
        day: 5,
        title: 'Day 5: Ella Exploration & Adventure 🌉✨',
        activities: [
          "Start your day with breakfast at the hotel.",
          "Take an easy hike to Little Adam’s Peak and enjoy breathtaking views of Ella’s green landscapes.",
          "Visit the iconic Nine Arch Bridge, one of Sri Lanka’s most picturesque landmarks.",
          "If you're lucky, watch a train pass across the bridge for a memorable photo opportunity.",
          "Experience the thrilling Rawana Mega Zip Line and fly over Ella’s beautiful surroundings.",
          "Explore the historic and legendary Rawana Caves.",
          "Spend the evening at leisure exploring the charming town of Ella.",
          "Overnight stay: Ella."
        ]
      },
      {
        id: 'sri-lanka-day-6',
        day: 6,
        title: 'Day 6: Ella → Mirissa | Waterfalls to Beach 🌊🏖️',
        activities: [
          "Enjoy breakfast and check out before beginning your scenic 5–6 hour journey towards Mirissa.",
          "Stop at the beautiful Rawana Waterfall en route and capture some photographs.",
          "Continue through Sri Lanka’s scenic landscapes towards the coast.",
          "Arrive in Mirissa and check in to your beachfront hotel.",
          "Relax and enjoy the ocean views before spending the evening at Mirissa Beach.",
          "Take a leisurely beach walk or simply relax on the sand and enjoy the coastal atmosphere.",
          "Overnight stay: Mirissa."
        ]
      },
      {
        id: 'sri-lanka-day-7',
        day: 7,
        title: 'Day 7: Mirissa → Weligama | Ocean Adventures & Leisure 🐋🏄‍♂️',
        activities: [
          "Start the day early with an exciting Whale & Dolphin Watching Tour. Sightings are subject to weather and season.",
          "Return to the hotel for breakfast and freshen up.",
          "Head towards Weligama/Mirissa for a day of beach adventures.",
          "Try surfing, suitable for both beginners and experienced surfers.",
          "Explore the underwater world through snorkelling and discover colourful marine life.",
          "For adventure enthusiasts, scuba diving is also available with certified diving centres.",
          "Spend the afternoon at leisure, relaxing by the beach, café hopping and enjoying local flavours.",
          "Return to your stay and relax for the evening.",
          "Overnight stay: Mirissa."
        ]
      },
      {
        id: 'sri-lanka-day-8',
        day: 8,
        title: 'Day 8: Mirissa → Departure 🛫🇱🇰',
        activities: [
          "Enjoy breakfast at the hotel and check out.",
          "Begin your journey towards Bandaranaike International Airport.",
          "Sit back and enjoy a comfortable transfer to the airport.",
          "Arrive at the airport and proceed for your onward journey.",
          "Bid farewell to Sri Lanka with unforgettable memories from your island adventure."
        ]
      }
    ],
    inclusions: [
      "7 nights accommodation on double/triple sharing basis: 1 night in Negombo, 2 nights in Kandy, 2 nights in Ella, 2 nights in Mirissa.",
      "All local and intercity transfers as per the itinerary in comfortable van or coach transportation throughout the trip with airport pickup and drop-off.",
      "Activities & Sightseeing: Kandy Cultural Dance Show, Sigiriya Lion Rock Day Trip, Gem Museum visit, Tea Gardens & Tea Factory visit, Little Adam’s Peak, Nine Arch Bridge, Galle Fort.",
      "Meals: 7 breakfasts + 1 lunch.",
      "Experienced Trip Leader and local support throughout the trip.",
      "Driver night charges, toll taxes and parking charges."
    ],
    exclusions: [
      "International and domestic flight tickets.",
      "Any food or beverages not included in the package, including alcoholic drinks, mineral water, highway meals, refreshments and additional lunches.",
      "Personal expenses such as driver tips, monument entry fees, camera/video charges, laundry and telephone bills.",
      "Costs arising from natural calamities such as landslides or roadblocks, which will be borne by the traveller.",
      "5% GST + 2% TCS.",
      "Anything not specifically mentioned under the inclusions."
    ],
    thingsToCarry: [
      "Valid Passport (with minimum 6 months validity) and online ETA / Visa",
      "Light, breathable cotton clothes, beachwear and swimwear",
      "Modest attire covering shoulders and knees for temple visits (Temple of Tooth, Dambulla)",
      "Comfortable trekking shoes for Sigiriya and Little Adam's Peak",
      "Sunscreen (SPF 50+), UV polarized sunglasses, and sun hat",
      "Personal medications, basic first aid, and insect repellent",
      "Universal adapter, power bank, and waterproof camera/phone case",
      "Reusable water bottle"
    ],
    policies: [
      "Flights arriving at Bandaranaike International Airport in the morning or afternoon on Day 1 are suitable for this trip.",
      "Please book your return flight on Day 8 after 5:00 PM.",
      "Visa is free for Indian passport holders as mentioned in the itinerary. Please carry a valid passport, visa and all required travel documents.",
      "The Nanu Oya–Ella scenic train journey is subject to ticket availability.",
      "Whale & Dolphin Watching is seasonal (November to April), and sightings are subject to weather conditions.",
      "The Trip Leader has the right to skip, modify or alter sightseeing or the itinerary in case of emergencies, acts of God or inappropriate participant behaviour.",
      "In triple-sharing rooms, an extra mattress will be provided and should not be considered an extra bed.",
      "Delays at any sightseeing location may result in the cancellation or skipping of subsequent sightseeing.",
      "Participants are expected to coordinate, maintain discipline and cooperate as a team throughout the trip.",
      "No refund will be provided for no-shows on the day of the trip.",
      "Alcohol consumption in hotels or rooms is subject to the respective hotel's rules and regulations.",
      "Participants must carry a valid photo ID, as required for hotel check-in.",
      "Transportation will be provided strictly as per the itinerary on a point-to-point basis and cannot be used for personal purposes.",
      "Travellers are responsible for their own luggage and personal belongings.",
      "Travel Tribes does not provide insurance covering illness, accidents, theft or loss; travellers should arrange appropriate insurance separately.",
      "Travel Tribes strictly stands against harassment.",
      "AC may not be available in vehicles in hilly regions.",
      "Booking Amount: ₹15,000 per person to confirm your seat. The remaining balance must be paid 30 days before departure.",
      "Cancellation 30+ days prior: Advance amount retained / converted to credit.",
      "Cancellation 15–29 days prior: 50% deduction of total trip cost.",
      "Cancellation < 14 days / No-Show: 100% deduction (No refund for unused services).",
      "Cancellation by Travel Tribes: 100% full refund within 4–7 business days if the trip is cancelled by the operator."
    ],
    pricingOptions: [
      { label: 'Normal Batch (Double / Triple Sharing)', price: '₹52,999 / person + 5% GST & 2% TCS' },
      { label: 'Christmas & New Year Special Batch', price: '₹56,999 / person + 5% GST & 2% TCS', note: 'Applicable on Dec 19 & Dec 27 departures' }
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
    id: 'bali-gili-islands',
    slug: 'bali-gili-islands',
    title: 'Bali with Gili — 8 Nights / 9 Days',
    location: 'Seminyak · Kuta · Nusa Penida · Gili · Ubud · Bali',
    region: 'International',
    date: 'Sep 26–Oct 04, 2026',
    dates: [
      '26 September – 4 October 2026',
      '17–25 October 2026',
      '14–22 November 2026',
      '19–27 December 2026 (Christmas Special)',
      '27 December 2026 – 4 January 2027 (New Year Special)'
    ],
    duration: '8N/9D',
    price: '₹52,999',
    image: '/Card Image/bali_with_gili.png',
    alt: 'Bali and Gili Islands — Tropical Beaches, Kelingking Cliff, Mount Batur Jeep Safari and Ubud Culture',
    tag: 'Island of Vibe',
    description: 'Get ready for Bali magic — lush jungles, hike majestic volcanoes, dance your heart out at beach clubs, explore tropical beaches, and soak in endless island vibes with your tribe! Curated exclusively for 18–40 year olds, this 8 Nights / 9 Days expedition takes you across Seminyak, Kuta, the dramatic coastal cliffs of Nusa Penida, the turquoise waters of Gili Trawangan, and the cultural highlands of Ubud. From an epic 4x4 Mount Batur Sunrise Jeep Safari and thrilling Jungle ATV adventure to sunset Kecak Fire Dance at Uluwatu, swimming under Tegenungan Waterfall, partying at Omma Day Club, and snorkelling with wild sea turtles in Gili T. Premium stays, island-to-jungle transfers, and lifelong tribe memories await.',
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
      "Explore the stunning cliffs and beaches of Uluwatu.",
      "Experience the iconic Kecak Fire Dance against a beautiful sunset.",
      "Discover the breathtaking landscapes of Nusa Penida, including Kelingking Beach, Broken Beach and Angel’s Billabong.",
      "Enjoy the relaxed island atmosphere, beautiful sunsets and beach bars of Gili.",
      "Explore the famous Ubud Monkey Forest.",
      "Experience a thrilling Jungle ATV Adventure through Bali’s lush landscapes.",
      "Relax and enjoy the vibrant atmosphere at Omma Day Club.",
      "Experience an epic 4x4 Jeep ride to Mount Batur and watch the sunrise.",
      "Explore Bali’s iconic rice terraces.",
      "Experience the perfect mix of adventure, nature, beaches and nightlife while travelling with your tribe."
    ],
    itinerary: [
      {
        id: 'bali-day-1',
        day: 1,
        title: 'Day 1: Welcome to Bali – Seminyak 🌴',
        activities: [
          "Arrive at Bali DPS Airport and meet your Trip Captain, who will accompany you throughout the journey.",
          "Transfer to your stay in Seminyak, get comfortable and settle into the tropical Bali vibes.",
          "Spend some time relaxing after your arrival.",
          "In the evening, explore the local food scene and enjoy delicious Balinese cuisine or refreshing local beverages.",
          "Overnight stay: Seminyak."
        ]
      },
      {
        id: 'bali-day-2',
        day: 2,
        title: 'Day 2: Surfing → Uluwatu → Kecak Fire Dance 🏄‍♂️🛕🔥',
        activities: [
          "Enjoy breakfast and get ready for an exciting day of exploration.",
          "Start with an optional 2-hour basic surfing session with a professional instructor.",
          "Head towards Uluwatu and relax at a beautiful hidden beach.",
          "Visit the iconic Uluwatu Temple, perched dramatically above the Indian Ocean.",
          "Explore the temple and learn about its cultural significance.",
          "In the evening, witness the famous Kecak Fire Dance against a beautiful sunset backdrop.",
          "Return to your stay and relax after an adventurous day.",
          "Overnight stay: Seminyak."
        ]
      },
      {
        id: 'bali-day-3',
        day: 3,
        title: 'Day 3: Nusa Penida Island → Seminyak Nightlife 🚤🏖️🍹',
        activities: [
          "Enjoy breakfast before heading out for a full-day trip to the stunning Nusa Penida Island.",
          "Explore some of the island’s most breathtaking landscapes and iconic viewpoints.",
          "Visit Angel’s Billabong, Broken Beach, Kelingking Beach and Crystal Bay.",
          "Take in the turquoise waters, enjoy the views and capture memorable photographs.",
          "Return to Bali in the evening.",
          "Later, head to Seminyak and explore its vibrant beach clubs and nightlife.",
          "Overnight stay: Seminyak."
        ]
      },
      {
        id: 'bali-day-4',
        day: 4,
        title: 'Day 4: Bali → Gili Islands | Island Vibes ⛵🏝️',
        activities: [
          "Enjoy breakfast before catching a fast boat to the beautiful Gili Islands.",
          "Experience the island’s traditional and eco-friendly mode of transport, the Cidomo horse cart.",
          "Check in to your stay and settle into the relaxed island atmosphere.",
          "Spend the rest of the day exploring the island, relaxing by the beach or enjoying the peaceful surroundings.",
          "Overnight stay: Gili Islands."
        ]
      },
      {
        id: 'bali-day-5',
        day: 5,
        title: 'Day 5: Gili Islands | Explore & Unwind 🐢🤿🌅',
        activities: [
          "Enjoy a free day to explore the beautiful Gili Islands at your own pace.",
          "Choose from optional experiences such as scuba diving with turtles, snorkelling with reef sharks, café hopping or a relaxing massage.",
          "Spend the evening at one of the island’s beach bars.",
          "Watch the sunset, enjoy a refreshing cocktail and soak in the laid-back Gili island vibes.",
          "Overnight stay: Gili Islands."
        ]
      },
      {
        id: 'bali-day-6',
        day: 6,
        title: 'Day 6: Gili → Bali → Ubud | Island to Jungle 🌴🐒🌿',
        activities: [
          "Enjoy breakfast and spend the morning at leisure before departing Gili for Bali around midday.",
          "Continue your journey towards Ubud, travelling from the tropical beaches to Bali’s scenic countryside and rice paddies.",
          "Visit the famous Ubud Monkey Forest and explore its beautiful surroundings.",
          "Spend some time exploring Ubud and experiencing its blend of culture, nature and laid-back atmosphere.",
          "Overnight stay: Ubud."
        ]
      },
      {
        id: 'bali-day-7',
        day: 7,
        title: 'Day 7: Ubud Adventure → Waterfall → Day Club 🏎️💦🎉',
        activities: [
          "Get ready for a thrilling 1-hour tandem ATV adventure through jungle trails and lush landscapes.",
          "Visit the beautiful Tegenungan Waterfall, surrounded by tropical greenery.",
          "Capture photographs and enjoy a refreshing swim in the natural pool.",
          "Later, head to Omma Day Club to relax, chill and enjoy Bali’s vibrant atmosphere.",
          "Spend the evening at leisure before returning to your stay.",
          "Overnight stay: Ubud."
        ]
      },
      {
        id: 'bali-day-8',
        day: 8,
        title: 'Day 8: Mount Batur Jeep Ride → Sunrise → Rice Terraces 🌋🚙🌾',
        activities: [
          "Begin the day early with a 2:00 AM departure for an unforgettable adventure.",
          "Experience an exciting 4x4 Jeep ride to Mount Batur through scenic volcanic landscapes.",
          "Reach a viewpoint to witness the breathtaking sunrise over Mount Batur.",
          "Enjoy breakfast while taking in panoramic morning views.",
          "Explore the unique Black Lava fields around Mount Batur.",
          "Later, visit Bali’s iconic rice terraces and admire the surrounding landscapes.",
          "Return to Ubud after a memorable day of adventure.",
          "Overnight stay: Ubud."
        ]
      },
      {
        id: 'bali-day-9',
        day: 9,
        title: 'Day 9: Bali → Departure 🛫✨',
        activities: [
          "Enjoy breakfast and complete the hotel check-out process.",
          "Gather your belongings and get ready for your airport transfer.",
          "Meet your driver and proceed towards Bali DPS Airport.",
          "Keep your travel documents and essentials handy for a smooth journey.",
          "Bid farewell to Bali and your fellow travellers with unforgettable memories."
        ]
      }
    ],
    inclusions: [
      "8 nights accommodation on double/triple sharing basis: 3 nights in Seminyak, 2 nights in Gili T, 3 nights in Ubud. (Hotels/villas will be provided as per the listed properties or similar options)",
      "All local and intercity transfers as per the itinerary in comfortable van or coach transportation throughout the trip with airport pickup and drop-off.",
      "Fast boat transfer to the Gili Islands.",
      "Uluwatu Temple & Kecak Fire Dance, Nusa Penida day trip.",
      "Tegenungan Waterfall, Jungle ATV Ride.",
      "Tegalalang Rice Terraces.",
      "8 breakfasts, 1 lunch and 1 welcome dinner.",
      "Experienced trip leader and local support throughout the trip.",
      "Driver night charges, toll taxes and parking charges."
    ],
    exclusions: [
      "International and domestic flight tickets.",
      "Visa on Arrival for Indians, approximately ₹2,500 as mentioned in the PDF.",
      "Food and beverages not included in the package, including alcoholic drinks, mineral water, meals, refreshments and highway lunches.",
      "Personal expenses such as driver tips, monument entry fees, camera/video charges, laundry and telephone bills.",
      "Any costs arising due to natural calamities such as landslides or roadblocks.",
      "5% GST + 2% TCS.",
      "Anything not specifically mentioned under the inclusions."
    ],
    thingsToCarry: [
      "Valid Passport (with minimum 6 months validity) and online ETA / Visa",
      "Light, breathable cotton clothes, beachwear and swimwear",
      "Modest attire covering shoulders and knees for temple visits (Uluwatu)",
      "Comfortable shoes for ATV, waterfalls, and walking",
      "Sunscreen (SPF 50+), UV sunglasses, and sun hat",
      "Personal medications, basic first aid, and insect repellent",
      "Universal adapter, power bank, and waterproof pouch for phone/camera",
      "Reusable water bottle"
    ],
    policies: [
      "Flights arriving at Bali DPS Airport in the morning or around noon on Day 1 are suitable for this trip.",
      "You can book your return flight anytime on Day 9.",
      "Visa on Arrival is available for Indians at approximately ₹2,500, as mentioned in the PDF.",
      "Your passport should be valid for at least 6 months from your date of travel.",
      "Activities such as surfing, scuba diving and snorkelling are subject to weather conditions and availability.",
      "Fast boat transfers to and from the Gili Islands are subject to sea and weather conditions.",
      "The itinerary may change due to weather, traffic, operational requirements or unforeseen circumstances.",
      "Comfortable footwear is recommended for sightseeing and adventure activities.",
      "Participants should follow the instructions of the Trip Captain and local guides throughout the trip.",
      "Personal expenses and activities not mentioned under inclusions will be at the traveller's own cost.",
      "Come prepared for a community travel experience and be ready to make new friends and memories with the Travel Tribes community.",
      "The Trip Leader has the right to skip, modify or alter sightseeing or the itinerary in case of an emergency, act of God or inappropriate participant behaviour.",
      "In triple-sharing rooms, an extra mattress will be provided and should not be considered an extra bed.",
      "Delays caused by participants at a sightseeing location may result in the cancellation or skipping of subsequent sightseeing.",
      "Participants are expected to coordinate, maintain discipline and cooperate as a team throughout the trip.",
      "No refund will be provided in case of a no-show on the day of the trip.",
      "Alcohol consumption and serving in hotels/rooms are subject to the rules and regulations of the respective hotel.",
      "A valid government photo ID is mandatory for all members staying at the hotel.",
      "The itinerary may change slightly during public holidays or festivals.",
      "Vehicles are provided strictly as per the itinerary on a point-to-point basis and are not available for personal use.",
      "Travellers are responsible for their own luggage and personal belongings.",
      "If any sightseeing location is closed due to a special occasion, public holiday, long weekend or festival, Travel Tribes will not be liable.",
      "Travel Tribes does not provide insurance covering illness, accidents, theft or loss.",
      "Transportation and logistics may vary depending on the final group size.",
      "Physical contact such as handshakes or hugs should always respect the comfort of others. Travel Tribes strictly stands against harassment.",
      "Participants undertake the risks associated with road travel, vehicles and nature-based activities.",
      "AC may not be available in vehicles such as Tempo Travellers, Innovas, Xylos, Scorpios or similar vehicles in hilly regions.",
      "Third-party vehicles may experience breakdowns, and arranging a replacement vehicle may take some time.",
      "Bus/vehicle halts for meals are predefined by the vendor and cannot be changed for individual convenience.",
      "Refunds will be provided only in cases where the trip is cancelled or postponed by Travel Tribes/organisers, subject to the applicable cancellation policy.",
      "Participants consent to Travel Tribes using photos and videos taken during the trip for social media, marketing and other promotional purposes.",
      "Booking Amount: ₹15,000 per person to confirm your seat. The remaining balance must be paid 30 days before departure. EMI and credit card payment options are available.",
      "Cancellation 30+ days prior: Advance amount retained / converted to Travel Tribes credit.",
      "Cancellation 15–29 days prior: 50% deduction of total trip cost.",
      "Cancellation < 14 days / No-Show: 100% deduction (No refund for unused services).",
      "Cancellation by Travel Tribes: 100% full refund within 4–7 business days if the trip is cancelled by the operator."
    ],
    pricingOptions: [
      { label: 'Normal Batch (Double / Triple Sharing)', price: '₹52,999 / person + 5% GST & 2% TCS' },
      { label: 'Christmas & New Year Batch', price: '₹58,999 / person + 5% GST & 2% TCS', note: 'Applicable on Dec 19 & Dec 27 departures' }
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
    id: 'bhutan-backpacking',
    slug: 'bhutan-backpacking',
    title: 'Bhutan — Land of the Thunder Dragon',
    location: 'Phuentsholing · Thimphu · Punakha · Paro · Bhutan',
    region: 'International',
    date: 'Oct 10–16, 2026',
    dates: [
      '10–16 October 2026',
      '7–13 November 2026',
      '12–18 December 2026'
    ],
    duration: '6N/7D',
    price: '₹26,499',
    image: '/Card Image/Bhutan.png',
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
      "Experience the colourful Punakha Tshechu Festival.",
      "Trek to the iconic Tiger’s Nest / Taktsang Monastery.",
      "Enjoy stunning Himalayan views from Dochula Pass.",
      "Visit the magnificent Punakha Dzong.",
      "Drive through Bhutan’s beautiful valleys, forests and waterfalls.",
      "Experience Bhutanese culture at Simply Bhutan.",
      "Explore the local markets of Thimphu and Paro.",
      "Dress up in traditional Bhutanese outfits for a group photoshoot.",
      "Stop at the scenic Chuzom Bridge.",
      "Visit the giant Buddha Dordenma Statue.",
      "Enjoy Bhutan’s peaceful spiritual atmosphere while travelling with your tribe."
    ],
    itinerary: [
      {
        id: 'bhutan-day-1',
        day: 1,
        title: 'Day 1: Bagdogra → Jaigaon → Phuentsholing 🇧🇹',
        activities: [
          "Arrive at Bagdogra Airport and begin your journey towards Bhutan.",
          "Drive through scenic landscapes towards Jaigaon, the gateway to Bhutan.",
          "Cross the India–Bhutan border and enter Phuentsholing.",
          "Complete the Bhutan immigration and entry formalities.",
          "Check in to your hotel, relax and get ready for the adventure ahead.",
          "Overnight stay: Phuentsholing."
        ]
      },
      {
        id: 'bhutan-day-2',
        day: 2,
        title: 'Day 2: Phuentsholing → Thimphu | Scenic Road Journey 🏔️🚗',
        activities: [
          "Enjoy breakfast and begin your journey towards Thimphu.",
          "Drive through winding mountain roads surrounded by lush forests, waterfalls and beautiful Bhutanese villages.",
          "Optional: Experience a fun river rafting adventure en route.",
          "Stop at the scenic Chuzom Bridge, where the Paro and Thimphu rivers meet.",
          "Capture photographs with the iconic portraits of the King and Queen.",
          "Arrive in Thimphu by evening and check in to your hotel.",
          "Later, explore the vibrant local markets of Thimphu.",
          "Overnight stay: Thimphu."
        ]
      },
      {
        id: 'bhutan-day-3',
        day: 3,
        title: 'Day 3: Thimphu → Dochula Pass → Punakha → Thimphu 🛕⛰️🎉',
        activities: [
          "Explore Thimphu’s famous cultural landmarks and visit the Buddha Dordenma Statue.",
          "Drive to Dochula Pass at 3,050 metres and enjoy breathtaking Himalayan views.",
          "Visit the beautiful 108 Druk Wangyal Chortens.",
          "Continue towards Punakha Dzong, one of Bhutan’s most magnificent landmarks.",
          "Return to Thimphu and enjoy a fun game night and karaoke evening with the group.",
          "Overnight stay: Thimphu."
        ]
      },
      {
        id: 'bhutan-day-4',
        day: 4,
        title: 'Day 4: Thimphu → Paro | Cultural Exploration 🏛️🎨🏔️',
        activities: [
          "Enjoy breakfast and check out before beginning your journey towards Paro.",
          "Visit Simply Bhutan, an immersive museum showcasing Bhutanese culture, architecture and traditional lifestyle.",
          "Continue the scenic drive towards Paro Valley.",
          "Check in to your hotel and relax.",
          "In the evening, explore Paro Market and shop for local souvenirs.",
          "Overnight stay: Paro."
        ]
      },
      {
        id: 'bhutan-day-5',
        day: 5,
        title: 'Day 5: Paro → Tiger’s Nest Trek → Paro 🥾🐅⛩️',
        activities: [
          "Enjoy breakfast and get ready for the iconic Tiger’s Nest Trek.",
          "Hike through beautiful pine forests to reach the sacred Taktsang Monastery.",
          "The trek takes approximately 2–4 hours, depending on your pace.",
          "Explore the monastery, perched dramatically around 900 metres above the valley.",
          "Enjoy the peaceful surroundings, prayer flags and spectacular mountain views.",
          "Trek back and return to Paro.",
          "Optional: Relax with a traditional Bhutanese hot-stone bath.",
          "Overnight stay: Paro."
        ]
      },
      {
        id: 'bhutan-day-6',
        day: 6,
        title: 'Day 6: Paro → Phuentsholing → Siliguri 📸🚙',
        activities: [
          "Enjoy breakfast and check out from your hotel in Paro.",
          "Dress up in a traditional Bhutanese outfit for a fun group photoshoot.",
          "Stop at a scenic viewpoint to capture views of the iconic Paro Airport.",
          "Begin your return journey through Bhutan’s beautiful valleys and landscapes.",
          "Cross Phuentsholing, re-enter India and continue towards Siliguri.",
          "Arrive in Siliguri by evening, check in and relax.",
          "Overnight stay: Siliguri."
        ]
      },
      {
        id: 'bhutan-day-7',
        day: 7,
        title: 'Day 7: Siliguri → Bagdogra Airport | Departure 🛫✨',
        activities: [
          "Enjoy your final breakfast and check out from the hotel.",
          "Arrange your own transportation to Bagdogra Airport according to your flight timing.",
          "Depart for the airport and begin your journey back home.",
          "Bid farewell to your fellow travellers and take home unforgettable memories and new friendships."
        ]
      }
    ],
    inclusions: [
      "6 nights accommodation on double sharing basis: 1 night in Phuentsholing, 1 night in Thimphu, 1 night in Punakha, 2 nights in Paro, 1 night in Siliguri.",
      "All local and intercity transfers as per the itinerary in comfortable van or coach transportation.",
      "Airport pickup as mentioned in the itinerary.",
      "Experienced Trip Leader and local support throughout the trip.",
      "Local English-speaking guide and expert trek leadership.",
      "Guided Tiger’s Nest (Taktsang Monastery) trek.",
      "Local sightseeing as mentioned in the itinerary: Visit to Buddha Dordenma Statue, Visit to Dochula Pass & 108 Druk Wangyal Chortens, Visit to Punakha Dzong.",
      "Meals: 6 breakfasts and 4 dinners.",
      "Driver night charges, toll taxes and parking charges are included."
    ],
    exclusions: [
      "International and domestic flight tickets.",
      "SDF charges: ₹1,200 per night per person × 5 nights = ₹6,000 per person.",
      "Food and beverages not included in the package, including alcoholic drinks, mineral water, meals, refreshments and highway lunches.",
      "Personal expenses such as driver tips, monument entry fees, camera/video charges, laundry and telephone bills.",
      "Monument entry tickets.",
      "Any additional costs arising due to landslides, roadblocks or natural calamities.",
      "5% GST + 2% TCS.",
      "Anything not specifically mentioned under the inclusions."
    ],
    thingsToCarry: [
      "Valid Indian Passport (min 6 months validity) or Original Voter ID card",
      "Warm layers, fleece jacket, windcheater / rain jacket, and thermal innerwear",
      "Comfortable hiking / trekking shoes with good grip and extra woollen socks",
      "Modest full-sleeve clothes covering shoulders and knees for Dzongs and temples",
      "Sunscreen (SPF 50+), UV sunglasses, lip balm, and cold cream",
      "Personal medications, basic first aid, and motion sickness medicine for mountain roads",
      "Power bank, camera, and extra batteries (cold drains batteries faster)",
      "Reusable water bottle"
    ],
    policies: [
      "Please book your arrival flight to Bagdogra Airport before 12:00 PM on Day 1.",
      "You can book your return flight from Bagdogra anytime on Day 7.",
      "SDF charges of ₹1,200 per night per person are mandatory for all travellers, totalling ₹6,000 for 5 nights.",
      "Carry a valid government-issued ID and passport as required for Bhutan entry and permit formalities. Passport/ID details submitted for permits must be correct and match your travel documents.",
      "The Punakha Tshechu Festival schedule and timings are managed by local authorities and may change.",
      "The Tiger’s Nest Trek is moderately challenging, so comfortable trekking shoes and a reasonable fitness level are recommended.",
      "Bhutan’s mountain weather can change quickly, so carry warm layers, a rain jacket and comfortable clothing.",
      "Road conditions, weather, landslides and other unforeseen circumstances may require changes to the itinerary.",
      "Optional activities such as river rafting and hot-stone baths are subject to availability and weather conditions.",
      "Follow the instructions of the Trip Leader and local guide throughout the trip.",
      "Mobile network and internet connectivity may be limited in some remote areas.",
      "Come prepared for a community travel experience and enjoy Bhutanese culture with your Travel Tribes community.",
      "The Trip Leader may skip, modify or alter sightseeing or the itinerary in case of emergencies, acts of God or inappropriate participant behaviour.",
      "In triple-sharing rooms, an extra mattress is provided and should not be considered an extra bed.",
      "Delays at a sightseeing location may result in the cancellation or skipping of subsequent sightseeing.",
      "Participants are expected to coordinate, maintain discipline and cooperate as a team throughout the trip.",
      "No refund will be provided in case of a no-show on the day of the trip.",
      "Alcohol consumption in hotels/rooms is subject to the rules of the respective hotel.",
      "A valid photo ID is mandatory for hotel stays.",
      "The itinerary may change slightly during public holidays or festivals.",
      "Vehicles are provided strictly as per the itinerary on a point-to-point basis and are not available for personal use.",
      "Travellers are responsible for their own luggage and belongings.",
      "Travel Tribes is not liable if sightseeing is closed due to a special occasion, public holiday, long weekend or festival.",
      "Travel Tribes does not provide insurance covering sickness, accidents, theft or other losses.",
      "Water and electricity availability may be limited in some hilly areas, and hotels may have fixed schedules for hot and cold water.",
      "Transportation and logistics may vary depending on the final group size.",
      "Participants are expected to respect personal boundaries and comfort; Travel Tribes strictly stands against harassment.",
      "Participants undertake the risks associated with road travel, vehicles and nature-related activities.",
      "AC may not be available in vehicles such as Tempo Travellers, Innovas, Xylos, Scorpios or similar vehicles in hilly regions.",
      "Third-party vehicles may experience breakdowns, and arranging a replacement vehicle may take some time.",
      "Meal halts are predefined by the transport vendor and cannot be changed for individual convenience.",
      "Refunds are provided only in cases where the trip is cancelled or postponed by Travel Tribes/organisers, subject to the applicable policy.",
      "Participants give consent to Travel Tribes to use photos/videos taken during the trip for social media, marketing and other promotional purposes.",
      "Booking Amount: ₹10,000 per person to confirm your seat.",
      "Cancellation 30+ days prior: Advance amount retained / converted to Travel Tribes credit.",
      "Cancellation 15–29 days prior: 50% deduction of total trip cost.",
      "Cancellation < 14 days / No-Show: 100% deduction (No refund for unused services).",
      "Cancellation by Travel Tribes: 100% full refund within 4–7 business days if the trip is cancelled by the operator."
    ],
    pricingOptions: [
      { label: 'Ex-Bagdogra (Double Sharing Package)', price: '₹26,499 / person + 5% GST & 2% TCS', note: 'Excludes mandatory SDF ₹6,000' },
      { label: 'All-Inclusive Package (With Bhutan SDF)', price: '₹32,499 / person + 5% GST & 2% TCS', note: 'Includes ₹6,000 Bhutan SDF fee' }
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
    id: 'bhutan-tshechu-festival',
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
    image: '/Card Image/Bhutan.png',
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
        id: 'bhutan-tshechu-day-1',
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
        id: 'bhutan-tshechu-day-2',
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
        id: 'bhutan-tshechu-day-3',
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
        id: 'bhutan-tshechu-day-4',
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
        id: 'bhutan-tshechu-day-5',
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
        id: 'bhutan-tshechu-day-6',
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
        id: 'bhutan-tshechu-day-7',
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
    id: 'vietnam-phu-quoc',
    slug: 'vietnam-phu-quoc',
    title: 'Vietnam with Phu Quoc',
    location: 'Phu Quoc · Da Nang · Hoi An · Ba Na Hills · Hanoi · Halong Bay · Vietnam',
    region: 'International',
    date: '16 Oct – 23 Oct 2026',
    dates: [
      '16 Oct – 23 Oct 2026',
      '23 Oct – 30 Oct 2026',
      '30 Oct – 06 Nov 2026',
      '06 Nov – 13 Nov 2026',
      '13 Nov – 20 Nov 2026',
      '20 Nov – 27 Nov 2026',
      '27 Nov – 04 Dec 2026',
      '04 Dec – 11 Dec 2026',
      '11 Dec – 18 Dec 2026',
      'Dec 24–31, 2026 (Christmas Special - On Request)',
      'Dec 28–Jan 04, 2027 (New Year Special - On Request)'
    ],
    duration: '7N/8D',
    price: '₹74,999',
    image: '/Card Image/vietnam.png',
    alt: 'Golden Bridge Ba Na Hills and Halong Bay Limestone Karsts in Vietnam',
    tag: 'Tropical Island & Heritage',
    description: 'Experience Vietnam in 8 days with an unforgettable group trip covering Phu Quoc, Da Nang, Hoi An, Hanoi and Halong Bay. Explore tropical islands, ride Vietnam’s famous cable car, discover Grand World, enjoy a basket boat ride in Hoi An, walk across the iconic Golden Bridge at Ba Na Hills, explore Hanoi’s Old Quarter and Train Street, and cruise through the breathtaking landscapes of Halong Bay. This Vietnam group trip from India combines adventure, culture, nightlife, scenic experiences and community travel into one exciting journey. Join solo, meet fellow travellers and explore Vietnam with your tribe.',
    spots: '6 spots left',
    gallery: [
      { image: img('photo-1528127269322-539801943592'), alt: 'Golden Bridge Held by Giant Hands at Ba Na Hills' },
      { image: img('photo-1507525428034-b723cf961d3e'), alt: 'Phu Quoc Tropical Islands & Cable Car' },
      { image: img('photo-1559592413-7cec4d0cae2b'), alt: 'Halong Bay Emerald Waters & Limestone Cliffs' },
      { image: img('photo-1583417319070-4a69db38a482'), alt: 'Hoi An Lantern Street & Ancient Town' },
      { image: img('photo-1526778548025-fa2f459cd5c1'), alt: 'Coconut Forest Traditional Basket Boat Ride' },
      { image: img('photo-1509042239860-f550ce710b93'), alt: 'Hanoi Famous Train Street & Egg Coffee' },
      { image: img('photo-1569154941061-e231b4725ef1'), alt: 'Grand World Phu Quoc Venice Canals' },
      { image: img('photo-1512100356356-de1b84283e18'), alt: 'Halong Bay Ti Top Island & Kayaking' }
    ],
    highlights: [
      "Grand World Phu Quoc walking tour & Venice Canal exploration.",
      "Tinh Hoa Viet Nam live cultural show showcasing Vietnamese heritage.",
      "Four Island Tour in Phu Quoc with snorkelling & beach time.",
      "Scenic Phu Quoc Cable Car ride with panoramic ocean views.",
      "Aquatopia Water Park thrilling rides & entertainment.",
      "VinPearl Safari & VinWonders themed zones & live shows.",
      "Hoi An Ancient Town UNESCO heritage & old Phung Hung houses.",
      "Traditional Coconut Forest Basket Boat Ride in Hoi An.",
      "Colourful Hoi An Lantern Street night walk.",
      "Full-day Ba Na Hills tour & walk across the iconic Golden Bridge (Giant Hands).",
      "French Village, Fantasy Park & Lunar Castle at Ba Na Hills.",
      "Hanoi Old Quarter walking tour, Mural Street & famous Train Street.",
      "Famous Vietnamese traditional egg coffee tasting experience.",
      "Full-day scenic Halong Bay Cruise with lunch.",
      "Explore Surprising Cave (Sung Sot) & hike Ti Top Island viewpoint.",
      "Kayaking and bamboo boating through Luon Cave."
    ],
    itinerary: [
      {
        id: 'vietnam-day-1',
        day: 1,
        title: 'Day 1: Arrive in Phu Quoc | Grand World & Cultural Show 🌴✨',
        activities: [
          "Arrive at Phu Quoc Airport and meet the local Travel Tribes team.",
          "Transfer to the hotel, check in and relax after your journey.",
          "In the evening, head to Grand World Phu Quoc for a walking tour.",
          "Explore the Venice Canal, shopping streets, cafés and entertainment zones.",
          "Experience Tinh Hoa Viet Nam, a spectacular live cultural show showcasing Vietnamese history, art and traditions.",
          "Overnight stay in Phu Quoc.",
          "Meals: Not included."
        ]
      },
      {
        id: 'vietnam-day-2',
        day: 2,
        title: 'Day 2: 4-Island Tour | Cable Car | Aquatopia Water Park 🏝️🚡🌊',
        activities: [
          "After breakfast, head out for an exhilarating Four Island Tour.",
          "Explore tropical islands including Hon May Rut and Hon Thom.",
          "Enjoy a scenic cable car ride with panoramic ocean views across the archipelago.",
          "Experience snorkelling, beach time and tropical island exploration.",
          "Enjoy a delicious lunch during the tour.",
          "Visit Aquatopia Water Park for world-class water rides and entertainment.",
          "Return to the hotel and overnight stay in Phu Quoc.",
          "Meals: Breakfast & Lunch."
        ]
      },
      {
        id: 'vietnam-day-3',
        day: 3,
        title: 'Day 3: VinPearl Safari | VinWonders | Flight to Da Nang 🦁🎢✈️',
        activities: [
          "After breakfast, visit VinPearl Safari, Vietnam’s premier wildlife conservation park.",
          "See exotic animals roaming in open and natural habitats.",
          "Continue to VinWonders Phu Quoc for thrilling rides, themed adventure zones, live shows and entertainment.",
          "In the evening, transfer to the airport and board your internal flight to Da Nang.",
          "Arrive in Da Nang, check in to your hotel and unwind.",
          "Overnight stay in Da Nang.",
          "Meals: Breakfast."
        ]
      },
      {
        id: 'vietnam-day-4',
        day: 4,
        title: 'Day 4: Da Nang | Hoi An | Basket Boat | Lantern Street 🏖️🛶🏮',
        activities: [
          "Enjoy a relaxed morning at My Khe Beach, known for its pristine sands and blue waters.",
          "In the afternoon, experience an exciting Basket Boat Ride at the Coconut Village.",
          "Explore the historic UNESCO World Heritage streets of Hoi An Ancient Town.",
          "Visit the ancient Phung Hung houses, Japanese Covered Bridge, and historic trading port.",
          "Walk through the magically illuminated Lantern Street.",
          "Enjoy free time to explore local cafés and boutiques in Hoi An before returning to the hotel.",
          "Overnight stay in Da Nang.",
          "Meals: Breakfast."
        ]
      },
      {
        id: 'vietnam-day-5',
        day: 5,
        title: 'Day 5: Ba Na Hills | Golden Bridge | French Village 🚡🌉🏰',
        activities: [
          "Depart for Ba Na Hills around 7:30 AM.",
          "Take the world-record cable car from Suoi Mo Station to Marseille Station.",
          "Walk across the world-famous iconic Golden Bridge held by colossal stone hands.",
          "Explore the Lunar Castle and continue towards the picturesque French Village.",
          "Enjoy Fantasy Park indoor theme park and visit King Peak for panoramic mountain vistas.",
          "Return to Da Nang for an overnight stay.",
          "Meals: Breakfast."
        ]
      },
      {
        id: 'vietnam-day-6',
        day: 6,
        title: 'Day 6: Da Nang to Hanoi | Old Quarter | Train Street ✈️☕🚂',
        activities: [
          "Early morning transfer to Da Nang Airport and fly to Hanoi, Vietnam's historic capital.",
          "Meet the guide and transfer to your centrally located hotel.",
          "Around 5:00 PM, begin an atmospheric walking tour of Hanoi Old Quarter.",
          "Explore Phung Hung Mural Street and the world-famous Hanoi Train Street.",
          "Stop at local cafés and experience authentic Vietnamese egg coffee (Ca Phe Trung).",
          "Enjoy leisure time strolling around Hoan Kiem Lake.",
          "Overnight stay in Hanoi.",
          "Meals: Breakfast."
        ]
      },
      {
        id: 'vietnam-day-7',
        day: 7,
        title: 'Day 7: Halong Bay Day Cruise | Surprising Cave & Kayaking 🚢⛰️🛶',
        activities: [
          "Transfer to Halong Bay in the morning through scenic countryside.",
          "Board your cruise at Tuan Chau Harbor for an unforgettable 5–6 hour cruise among thousands of limestone karsts.",
          "Enjoy a freshly prepared seafood/multi-cuisine lunch on board.",
          "Visit the impressive Sung Sot (Surprising Cave) with massive stalactites.",
          "Explore Ti Top Island, relax on the white beach and hike up for 360-degree bay views.",
          "Experience kayaking or bamboo boating through the tunnel of Luon Cave.",
          "Enjoy sunset tea and wine while cruising back to Tuan Chau Harbor.",
          "Return to Hanoi and overnight stay.",
          "Meals: Breakfast & Lunch."
        ]
      },
      {
        id: 'vietnam-day-8',
        day: 8,
        title: 'Day 8: Departure from Hanoi 🛫✨',
        activities: [
          "Enjoy breakfast and some leisure time for last-minute souvenir shopping.",
          "Complete check-out and transfer to Hanoi Noi Bai Airport (HAN) for your flight back home.",
          "We recommend booking return flights departing after 5:30 PM Vietnam time.",
          "Bid farewell to Vietnam with incredible memories and lifelong friendships made with your tribe!",
          "Meals: Breakfast."
        ]
      }
    ],
    inclusions: [
      "7 nights hotel accommodation on double-sharing basis in handpicked 4-star hotels.",
      "2 Internal Flights included: Phu Quoc → Da Nang and Da Nang → Hanoi.",
      "Meals: 7 breakfasts + 2 lunches (Halong Bay Cruise lunch & 4-Island Tour lunch).",
      "Grand World Phu Quoc walking tour & Tinh Hoa Viet Nam live cultural show tickets.",
      "Four Island Tour in Phu Quoc with Cable Car, snorkelling gear & Aquatopia Water Park entry.",
      "VinPearl Safari & VinWonders full-day access & tickets.",
      "Hoi An Ancient Town guided tour & Coconut Forest Basket Boat ride.",
      "Full-day Ba Na Hills tour with roundtrip Cable Car, Golden Bridge, French Village & Fantasy Park.",
      "Hanoi Old Quarter walking tour, Mural Street & Train Street egg coffee experience.",
      "Full-day Halong Bay Day Cruise with kayaking/bamboo boating, Surprising Cave & Ti Top Island.",
      "Qualified local English-speaking guides during all tours.",
      "Airport pick-up and drop-off as per group timings in comfortable AC transfers.",
      "International travel insurance included."
    ],
    exclusions: [
      "International flights from India to Vietnam and Vietnam to India.",
      "Vietnam E-Visa (approx ₹2,800, 7-day online processing).",
      "Lunch and dinner except meals specifically mentioned in inclusions.",
      "Extra meals, beverages, alcoholic drinks, and packaged mineral water.",
      "Selected optional Ba Na Hills activities (Wax Museum, Debay Wine Cellar, Alpine Coaster).",
      "Personal expenses, tips/gratuities for guides & drivers, laundry, telephone expenses.",
      "5% GST + 5% TCS.",
      "Expenses caused by flight cancellations, weather, or natural calamities.",
      "Anything not specifically mentioned under inclusions."
    ],
    thingsToCarry: [
      "Valid Passport (with minimum 6 months validity from entry date) & Vietnam E-Visa",
      "Light, breathable summer clothes, beachwear and swimwear",
      "Comfortable walking / trekking shoes for Ba Na Hills & cave exploration",
      "Light jacket / shrug for cooler evenings in Hanoi / Ba Na Hills",
      "Sun protection: Sunscreen (SPF 50+), sunglasses, and sun hat",
      "Universal travel adapter, power bank, and waterproof phone pouch",
      "Personal medications and basic first aid kit",
      "Reusable water bottle"
    ],
    policies: [
      "Flight guidelines: Return flights from Hanoi (HAN) on Day 8 should be booked after 5:30 PM Vietnam time.",
      "Airport transfers operate at fixed group timings. Early or late transfers may attract additional charges.",
      "Group departure age bracket: 18–42 years; customised private trips are available beyond this age bracket.",
      "Passport must be valid for at least 6 months after the date of entry into Vietnam.",
      "Vietnam E-Visa is required for Indian passport holders (costs approx ₹2,800 with 7-day processing).",
      "Room Sharing: Standard package is on Double Sharing basis with same-gender travellers for solo travellers.",
      "Booking Advance: ₹20,000 per person advance to confirm your seat. The remaining balance is due 30 days before departure.",
      "Cancellation Policy: The initial booking amount is non-refundable. Cancellation up to 75 days before departure: 0% cancellation fee on total trip cost | 74–45 days: 50% cancellation fee | 44–30 days: 50% cancellation fee | Less than 30 days / No-Show: 100% cancellation fee.",
      "Booking transfers are not permitted; only the names confirmed at booking can travel.",
      "The operator reserves the right to modify the itinerary in the interest of safety and traveller comfort in case of weather or unforeseen circumstances."
    ],
    pricingOptions: [
      { label: 'Regular Package (With 2 Internal Flights)', price: '₹74,999 / person + 5% GST & 5% TCS' },
      { label: 'Christmas & New Year Special Batch', price: '₹79,999 / person + 5% GST & 5% TCS', note: 'Available on request for late Dec batches' }
    ],
    bookingAmount: '₹20,000 / person',
    reviews: [
      {
        name: 'Meera Iyer',
        role: 'Verified Traveller',
        detail: 'Vietnam with Phu Quoc',
        rating: 5,
        quote: 'Vietnam with Travel Tribes was breathtaking from start to finish! The Golden Bridge in Ba Na Hills was straight out of a dream, and cruising through Halong Bay on a kayak was unforgettable. Phu Quoc beaches and Hoi An lantern street made this the trip of a lifetime!'
      },
      {
        name: 'Kabir Oberoi',
        role: 'Verified Traveller',
        detail: 'Vietnam Community Trip',
        rating: 5,
        quote: 'Travelling solo to Vietnam was the best decision ever. The group bonding, egg coffee at Hanoi train street, and the basket boat ride in Hoi An were so much fun. Everything including internal flights and transfers was super smooth.'
      },
      {
        name: 'Aakash Verma',
        role: 'Local Guide',
        reviewCount: '24 reviews',
        photoCount: '78 photos',
        detail: 'Vietnam & Phu Quoc Expedition',
        rating: 5,
        quote: 'Flawless 8-day itinerary covering the best of North, Central, and Southern Vietnam. Stays were top-notch, guides were super knowledgeable, and the tribe energy was unmatched. Highly recommended!'
      }
    ]
  },
  {
    id: 'vietnam-classic',
    slug: 'vietnam-classic',
    title: 'Vietnam — 7N/8D',
    location: 'Ho Chi Minh · Da Nang · Hoi An · Hanoi · Halong Bay · Ninh Binh · Vietnam',
    region: 'International',
    date: '02 Oct – 09 Oct 2026',
    dates: [
      '02 Oct – 09 Oct 2026',
      '10 Oct – 17 Oct 2026',
      '17 Oct – 24 Oct 2026',
      '24 Oct – 31 Oct 2026',
      '31 Oct – 07 Nov 2026',
      '07 Nov – 14 Nov 2026',
      '14 Nov – 21 Nov 2026',
      '21 Nov – 28 Nov 2026',
      '28 Nov – 05 Dec 2026',
      '05 Dec – 12 Dec 2026',
      '19 Dec – 26 Dec 2026',
      'Dec 24–31, 2026 (Christmas Special - On Request)',
      'Dec 28–Jan 04, 2027 (New Year Special - On Request)'
    ],
    duration: '7N/8D',
    price: '₹59,999',
    image: '/Card Image/vietnam.png',
    alt: 'Vietnam 7N 8D Halong Bay, Golden Bridge Ba Na Hills, Cu Chi Tunnels and Hoi An',
    tag: 'Classic Vietnam Circuit',
    description: 'Explore Vietnam in 8 days with a complete group trip covering Ho Chi Minh City, Da Nang, Hoi An, Hanoi, Halong Bay and Ninh Binh. Discover the historic Cu Chi Tunnels, experience a traditional basket boat ride in Hoi An, walk across the iconic Golden Bridge at Ba Na Hills, explore Hanoi’s Old Quarter and Train Street, cruise through Halong Bay and enjoy the scenic Trang An boat ride in Ninh Binh. This Vietnam group tour from India combines culture, adventure, iconic sightseeing and unique local experiences into one action-packed 7N/8D Vietnam itinerary. Join solo or with friends, meet fellow travellers and experience Vietnam with your tribe.',
    spots: '6 spots left',
    gallery: [
      { image: img('photo-1559592413-7cec4d0cae2b'), alt: 'Halong Bay Emerald Waters & Limestone Cliffs' },
      { image: img('photo-1528127269322-539801943592'), alt: 'Golden Bridge Held by Giant Hands at Ba Na Hills' },
      { image: img('photo-1583417319070-4a69db38a482'), alt: 'Hoi An Lantern Street & Ancient Town' },
      { image: img('photo-1526778548025-fa2f459cd5c1'), alt: 'Coconut Forest Traditional Basket Boat Ride' },
      { image: img('photo-1509042239860-f550ce710b93'), alt: 'Hanoi Famous Train Street & Egg Coffee' },
      { image: img('photo-1569154941061-e231b4725ef1'), alt: 'Ho Chi Minh City Saigon Post Office & Bui Vien Street' },
      { image: img('photo-1512100356356-de1b84283e18'), alt: 'Ninh Binh Trang An Eco-Tourism Boat Ride & Caves' },
      { image: img('photo-1507525428034-b723cf961d3e'), alt: 'Mua Cave Viewpoint Climb & Limestone Valleys' }
    ],
    highlights: [
      "Ho Chi Minh City walking tour & historic Saigon Central Post Office.",
      "Vibrant Bui Vien Walking Street & Saigon nightlife.",
      "Historic Cu Chi Tunnels tour with wartime underground system experience.",
      "Optional real shooting experience (AK-47 / M4) at Cu Chi.",
      "Hoi An Ancient Town UNESCO heritage & old Phung Hung houses.",
      "Traditional Coconut Forest Basket Boat Ride in Hoi An.",
      "Colourful Hoi An Lantern Street night walk.",
      "Full-day Ba Na Hills tour with 2-way cable car & iconic Golden Bridge (Hands of the Gods).",
      "French Village, Fantasy Park & Lunar Castle at Ba Na Hills.",
      "Hanoi Old Quarter walking tour & Mural Street.",
      "World-famous Hanoi Train Street & authentic Vietnamese egg coffee.",
      "Full-day scenic Halong Bay Cruise with Vietnamese lunch.",
      "Explore Surprising Cave (Sung Sot) & hike Ti Top Island viewpoint.",
      "Kayaking/Bamboo Boat at Luon Cave in Halong Bay.",
      "Ninh Binh & Trang An Eco-Tourism boat ride through limestone caves.",
      "Mua Cave & 500-step climb for panoramic karst valley views."
    ],
    itinerary: [
      {
        id: 'vietnam-classic-day-1',
        day: 1,
        title: 'Day 1: Ho Chi Minh City Arrival | Saigon City Walk | Bui Vien 🏛️🍹',
        activities: [
          "Arrive at Ho Chi Minh City (HCMC) Airport and meet your guide.",
          "Transfer to your centrally located hotel and check in.",
          "In the evening, explore the vibrant heart of Saigon on a guided walking tour.",
          "Visit Saigon Central Post Office and see Saigon Cathedral.",
          "Explore HCMC Town Hall and experience local Vietnamese food at the food court near the War Museum.",
          "Later at night, head to Bui Vien Walking Street for the city’s famous nightlife and street energy.",
          "Overnight stay in Ho Chi Minh City.",
          "Meals: Not included."
        ]
      },
      {
        id: 'vietnam-classic-day-2',
        day: 2,
        title: 'Day 2: Cu Chi Tunnels | Fly to Da Nang 🕳️✈️🏖️',
        activities: [
          "After breakfast, depart for the historic Cu Chi Tunnels.",
          "Stop at the Egg Shell Gallery en route.",
          "Learn about the tunnel system through an introductory presentation and video.",
          "Explore the tunnels, living quarters, kitchens, weapons areas, factories and field hospitals.",
          "Taste complimentary wartime tea and boiled cassava root.",
          "Optional AK-47 and M4 shooting experience is available at an additional cost.",
          "In the evening, transfer to the airport and fly to Da Nang.",
          "Check in and overnight stay in Da Nang.",
          "Meals: Breakfast."
        ]
      },
      {
        id: 'vietnam-classic-day-3',
        day: 3,
        title: 'Day 3: Da Nang | Hoi An | Basket Boat | Lantern Street 🏖️🛶🏮',
        activities: [
          "Enjoy a relaxed morning at the beach in Da Nang.",
          "Experience a traditional Basket Boat Ride at the Coconut Forest.",
          "Explore UNESCO World Heritage Hoi An Ancient Town.",
          "Visit the old streets, Phung Hung houses, local market and ancient port.",
          "Experience the colourful, magical Lantern Street.",
          "Enjoy free time to explore local cafés and boutiques in Hoi An before returning to the hotel.",
          "Overnight stay in Da Nang.",
          "Meals: Breakfast."
        ]
      },
      {
        id: 'vietnam-classic-day-4',
        day: 4,
        title: 'Day 4: Ba Na Hills | Golden Bridge | French Village 🚡🌉🏰',
        activities: [
          "Depart for Ba Na Hills around 7–8 AM.",
          "Take the cable car from Suoi Mo Station to Marseille Station.",
          "Visit the iconic Golden Bridge held by the giant 'Hands of the Gods'.",
          "Explore the majestic Lunar Castle.",
          "Take the funicular train to the French Village.",
          "Enjoy games, rides and entertainment at Fantasy Park.",
          "Visit King Peak for panoramic mountain views.",
          "Return to Da Nang for an overnight stay.",
          "Meals: Breakfast."
        ]
      },
      {
        id: 'vietnam-classic-day-5',
        day: 5,
        title: 'Day 5: Da Nang to Hanoi | Old Quarter | Train Street ✈️☕🚂',
        activities: [
          "Early morning transfer to the airport and fly to Hanoi.",
          "Meet your guide and transfer to the hotel.",
          "Enjoy breakfast and freshen up.",
          "Around 5 PM, begin a walking tour of Hanoi Old Quarter.",
          "Explore Mural Street and cafés around the world-famous Train Street.",
          "Try the famous authentic Vietnamese egg coffee.",
          "Overnight stay in Hanoi.",
          "Meals: Breakfast."
        ]
      },
      {
        id: 'vietnam-classic-day-6',
        day: 6,
        title: 'Day 6: Halong Bay Cruise | Surprising Cave | Ti Top Island 🚢⛰️🛶',
        activities: [
          "Transfer from Hanoi to Halong Bay.",
          "Board the cruise at Tuan Chau Harbour.",
          "Enjoy a scenic 5–6 hour cruise with refreshments and a delicious Vietnamese lunch.",
          "Visit the impressive Surprising Cave (Sung Sot Cave).",
          "Explore Ti Top Island, including the beach and scenic viewpoint hike.",
          "Experience kayaking or bamboo boating at Luon Cave.",
          "Return to Hanoi after the cruise.",
          "Overnight stay in Hanoi.",
          "Meals: Breakfast & Lunch."
        ]
      },
      {
        id: 'vietnam-classic-day-7',
        day: 7,
        title: 'Day 7: Ninh Binh | Trang An Boat Ride | Mua Cave 🚣‍♂️🏞️🪜',
        activities: [
          "After breakfast, head to Ninh Binh.",
          "Visit Mua Cave and climb approximately 500 stone steps for breathtaking karst panorama.",
          "Explore the Trang An Eco-Tourism Area by boat through serene riverways and limestone caves.",
          "Return to Hanoi for an overnight stay.",
          "Meals: Breakfast."
        ]
      },
      {
        id: 'vietnam-classic-day-8',
        day: 8,
        title: 'Day 8: Departure from Hanoi 🛫✨',
        activities: [
          "Enjoy breakfast and some leisure time before check-out.",
          "Transfer to Hanoi International Airport for your return flight home.",
          "Please ensure return flights from Hanoi are booked after 5:30 PM Vietnam time.",
          "Bid farewell to Vietnam with unforgettable memories and newfound lifelong friends from your tribe!",
          "Meals: Breakfast."
        ]
      }
    ],
    inclusions: [
      "Domestic flights: Ho Chi Minh → Da Nang & Da Nang → Hanoi.",
      "7 nights hotel accommodation on double/triple sharing (1N Ho Chi Minh City, 3N Da Nang, 3N Hanoi).",
      "8 Meals: 7 breakfasts at hotels + 1 Vietnamese lunch during Halong Bay Cruise.",
      "All surface transfers and airport pick-up & drop-off on SIC basis.",
      "Boat trips and cruise mentioned in the itinerary.",
      "Half-day Hanoi Old Quarter & Train Street walking tour with egg coffee.",
      "Halong Bay Day Cruise with Vietnamese lunch, kayaking / bamboo boating.",
      "Ninh Binh, Trang An Eco-Tourism boat tour & Mua Cave entry.",
      "Full-day Ba Na Hills tour with two-way cable car, Golden Bridge, French Village & Fantasy Park entry.",
      "Traditional Coconut Forest Basket Boat Ride in Hoi An.",
      "Hoi An Ancient Town guided walking tour.",
      "Cu Chi Tunnels guided tour with entry tickets and wartime tea/cassava tasting.",
      "English-speaking local Vietnamese tour guides for all guided tours.",
      "Visa assistance.",
      "International travel insurance."
    ],
    exclusions: [
      "International flights between India and Vietnam.",
      "Vietnam E-Visa (approx. ₹2,800).",
      "5% GST + 5% TCS extra on the package price.",
      "Early check-in or late check-out charges.",
      "Lunch and dinner except the included Halong Bay cruise lunch.",
      "Extra meals, snacks, bottled mineral water, and alcoholic/non-alcoholic beverages.",
      "Optional Ba Na Hills activities (Wax Museum, Debay Wine Cellar, Alpine Coaster).",
      "Optional AK-47 / M4 Machine Gun shooting at Cu Chi Tunnels.",
      "Additional sightseeing, optional tours, or extra vehicle usage.",
      "Transfers not mentioned in the itinerary.",
      "Activities or monument entrance fees not specifically mentioned.",
      "Gratuities and tips for guides and drivers.",
      "Expenses due to flight cancellations, weather delays, medical evacuation, strikes or force majeure."
    ],
    policies: [
      "Regular Price: ₹59,999/- per person + 5% GST & 5% TCS (Includes Land Package + 2 Internal Domestic Flights).",
      "Booking Amount: ₹20,000/- per person advance to confirm your seat. Remaining payment is payable 30 days before departure.",
      "Christmas & New Year batches: Dates available on request.",
      "Airport transfers operate at fixed group timings. Early or late transfers may incur additional charges.",
      "Group departure age limit is 18–42 years; customised trips can be arranged beyond this age bracket.",
      "Passport must be valid for at least 6 months from the date of entry into Vietnam.",
      "Vietnam E-Visa is required (approx. ₹2,800, processing time ~7 days). Visa assistance is provided by the team.",
      "Return flights from Hanoi should be booked after 5:30 PM Vietnam time on Day 8.",
      "Solo travellers will share rooms with same-gender travellers on double/triple sharing basis.",
      "Guides are not available during airport transfers or leisure time.",
      "Advance booking amount is non-refundable. Full payment must be completed before the trip.",
      "Valid government ID / Passport is mandatory for travel.",
      "Booking transfers are not permitted. Only the name mentioned during confirmation can travel.",
      "No refund is provided for inclusions that are not used.",
      "Travellers are responsible for their own luggage and belongings.",
      "Departure timings are fixed; report at the pickup point 30 minutes before departure.",
      "AC may be switched off in hilly areas or when required by the driver for safety.",
      "Drinking and smoking are prohibited during group transport journeys.",
      "Misconduct or indiscipline will not be tolerated.",
      "Weather, road conditions, accidents, breakdowns, landslides and other unforeseen circumstances may result in itinerary changes.",
      "The operator reserves the right to modify the schedule for safety, comfort and operational reasons.",
      "Cancellation Policy: Cancellation 75+ days before departure: 0% cancellation fee on total trip cost (advance retained/credited) | 74–45 days before departure: 50% cancellation fee | 44–30 days before departure: 50% cancellation fee | Less than 30 days before departure: 100% cancellation fee."
    ],
    pricingOptions: [
      { label: 'Land Package + 2 Domestic Flights (Double/Triple Sharing)', price: '₹59,999 / person' },
      { label: 'Booking Advance', price: '₹20,000 / person' },
      { label: 'Christmas & New Year Special Batch', price: 'On Request', note: 'Dates available on request' },
      { label: 'Taxes (5% GST + 5% TCS)', price: 'As Applicable', note: '5% GST + 5% TCS extra' }
    ],
    bookingAmount: '₹20,000 / person',
    reviews: [
      {
        name: 'Ananya Sen',
        role: 'Verified Traveller',
        detail: 'Vietnam Classic 7N/8D',
        rating: 5,
        quote: 'Covering Ho Chi Minh, Da Nang, Hoi An, Ba Na Hills, Hanoi, Halong Bay and Ninh Binh in 8 days was the most fulfilling trip! The domestic flights saved so much time. Golden Bridge and Halong Bay kayaking were highlight moments!'
      },
      {
        name: 'Rohan Deshmukh',
        role: 'Verified Traveller',
        detail: 'Vietnam Backpacking Community',
        rating: 5,
        quote: 'Joined solo and made friends for life. The Cu Chi Tunnels and Hanoi Train Street egg coffee were iconic experiences. Everything from hotels, internal flights to daily tours was impeccably organised.'
      },
      {
        name: 'Pooja Nair',
        role: 'Local Guide',
        reviewCount: '19 reviews',
        photoCount: '54 photos',
        detail: 'Vietnam Group Tour',
        rating: 5,
        quote: 'Trang An boat ride in Ninh Binh and the Mua Cave view were surreal. Travel Tribes gave us the best itinerary with comfortable stays and amazing English-speaking local guides. Tribe vibes all the way!'
      }
    ]
  },
  {
    id: 'vietnam-sapa',
    slug: 'vietnam-sapa',
    title: 'Vietnam with Sapa — 8N/9D',
    location: 'Ho Chi Minh City · Da Nang · Hoi An · Hanoi · Halong Bay · Sapa · Vietnam',
    region: 'International',
    date: '03 Oct – 11 Oct 2026',
    dates: [
      '03 Oct – 11 Oct 2026',
      '10 Oct – 18 Oct 2026',
      '17 Oct – 25 Oct 2026',
      '24 Oct – 01 Nov 2026',
      '31 Oct – 08 Nov 2026',
      '07 Nov – 15 Nov 2026',
      '14 Nov – 22 Nov 2026',
      '21 Nov – 29 Nov 2026',
      '28 Nov – 06 Dec 2026',
      '05 Dec – 13 Dec 2026',
      '12 Dec – 20 Dec 2026',
      'Dec 24–Jan 01, 2027 (Christmas & New Year Special - On Request)'
    ],
    duration: '8N/9D',
    price: '₹69,999',
    image: '/Card Image/vietnam.png',
    alt: 'Vietnam with Sapa Fansipan Peak, Golden Bridge Ba Na Hills and Halong Bay',
    tag: 'Highlands & Indochina Peak',
    description: "Experience Vietnam in 8 nights and 9 days with a group trip covering Ho Chi Minh City, Da Nang, Hoi An, Hanoi, Halong Bay and Sapa. Explore the historic Cu Chi Tunnels, enjoy a traditional basket boat ride in Hoi An, discover the iconic Golden Bridge at Ba Na Hills, walk through Hanoi's Old Quarter and Train Street, cruise through the limestone landscapes of Halong Bay and ride the cable car to Fansipan, the Roof of Indochina. This Vietnam group trip from India combines culture, adventure, scenic landscapes and authentic local experiences across some of Vietnam's most popular destinations.",
    spots: '6 spots left',
    gallery: [
      { image: img('photo-1528127269322-539801943592'), alt: 'Fansipan Mountain Roof of Indochina Peak and Clouds' },
      { image: img('photo-1559592413-7cec4d0cae2b'), alt: 'Halong Bay Emerald Waters & Limestone Cliffs' },
      { image: img('photo-1507525428034-b723cf961d3e'), alt: 'Golden Bridge Held by Giant Hands at Ba Na Hills' },
      { image: img('photo-1544644181-1484b3fdfc62'), alt: 'Sapa Misty Mountain Valleys and Terraced Rice Fields' },
      { image: img('photo-1583417319070-4a69db38a482'), alt: 'Hoi An Lantern Street & Ancient Town' },
      { image: img('photo-1509042239860-f550ce710b93'), alt: 'Hanoi Famous Train Street & Egg Coffee' },
      { image: img('photo-1526778548025-fa2f459cd5c1'), alt: 'Coconut Forest Traditional Basket Boat Ride' },
      { image: img('photo-1569154941061-e231b4725ef1'), alt: 'Ho Chi Minh City Saigon Nguyen Hue Avenue' }
    ],
    highlights: [
      "Explore the vibrant streets of Ho Chi Minh City & Nguyen Hue Avenue.",
      "Experience the historic Cu Chi Tunnels network and wartime tea/cassava tasting.",
      "Enjoy a traditional Basket Boat Ride in the Coconut Forest.",
      "Explore the lantern-lit streets and UNESCO heritage of Hoi An Ancient Town.",
      "Visit the iconic Golden Bridge (Hands of the Gods) at Ba Na Hills.",
      "Explore Le Jardin D’Amour themed gardens & Linh Ung Pagoda.",
      "Experience Fantasy Park rides, games & King Peak panoramic vistas.",
      "Discover Hanoi Old Quarter on a walking tour.",
      "Visit the famous Hanoi Train Street and try traditional Vietnamese egg coffee.",
      "Cruise through the spectacular emerald waters of Halong Bay with lunch onboard.",
      "Explore Surprising Cave (Sung Sot) & hike Ti Top Island viewpoint.",
      "Kayak or bamboo boat through Luon Cave in Halong Bay.",
      "Travel to the misty mountain highland town of Sapa by luxury bus.",
      "Ride the world-class Fansipan Cable Car to the 'Roof of Indochina' (3,143m).",
      "Visit the spiritual Fansipan Peak Pagoda Complex amidst the clouds."
    ],
    itinerary: [
      {
        id: 'vietnam-sapa-day-1',
        day: 1,
        title: 'Day 1: Ho Chi Minh City Arrival | Saigon Walking Tour 🏛️🌆',
        activities: [
          "Arrive at Ho Chi Minh City Airport and meet your guide and driver.",
          "Transfer to the city centre and check in to the hotel after 2 PM.",
          "In the evening, explore Saigon on a guided walking tour.",
          "Discover local markets and experience the vibrant mix of modern and traditional Vietnamese life.",
          "Visit Nguyen Hue Avenue and explore the bustling city after sunset.",
          "Optional: Enjoy a panoramic sunset view from Bitexco Tower (ticket not included).",
          "Overnight stay in Ho Chi Minh City.",
          "Meals: Not included."
        ]
      },
      {
        id: 'vietnam-sapa-day-2',
        day: 2,
        title: 'Day 2: Cu Chi Tunnels | Fly to Da Nang 🕳️✈️🏖️',
        activities: [
          "After breakfast, check out and depart for the historic Cu Chi Tunnels.",
          "Explore the historic tunnel network, including living areas, kitchens, weapons factories, field hospitals and command centres.",
          "Enjoy traditional wartime tea and boiled cassava root.",
          "Free time for relaxation or optional real shooting experience (AK-47 / M4).",
          "Return to the hotel, collect luggage and transfer to the airport.",
          "Fly to Da Nang in the evening.",
          "Check in and overnight stay in Da Nang.",
          "Meals: Breakfast."
        ]
      },
      {
        id: 'vietnam-sapa-day-3',
        day: 3,
        title: 'Day 3: Leisure Day | Basket Boat | Hoi An Ancient Town 🛶🏮✨',
        activities: [
          "Enjoy a relaxed morning at leisure along the Da Nang beaches.",
          "In the evening, experience a traditional Basket Boat Ride at the Coconut Forest.",
          "Explore Hoi An Ancient Town on your own.",
          "Visit the Japanese Pagoda Bridge, Chinese assembly halls, old Phung Hung houses, Hoi An Market and the ancient trading port.",
          "Enjoy free time to explore the lantern-lit streets, boutique cafés and riverside night markets of Hoi An.",
          "Return to Da Nang by around 10 PM.",
          "Overnight stay in Da Nang.",
          "Meals: Breakfast."
        ]
      },
      {
        id: 'vietnam-sapa-day-4',
        day: 4,
        title: 'Day 4: Ba Na Hills | Golden Bridge | French Village 🚡🌉🏰',
        activities: [
          "Depart from Da Nang around 7:45–8:00 AM for Ba Na Hills.",
          "Take the scenic cable car from Suoi Mo Station to Marseille Station.",
          "Visit the iconic Golden Bridge held by the giant Hands of the Gods.",
          "Explore Le Jardin D’Amour, featuring nine romantic themed gardens.",
          "Visit the serene Linh Ung Pagoda.",
          "Spend the afternoon enjoying rides, arcade games and entertainment at Fantasy Park and explore King Peak.",
          "Return to Da Nang for an overnight stay.",
          "Meals: Breakfast."
        ]
      },
      {
        id: 'vietnam-sapa-day-5',
        day: 5,
        title: 'Day 5: Da Nang to Hanoi | Hanoi Old Quarter | Train Street ✈️☕🚂',
        activities: [
          "After breakfast, transfer to Da Nang Airport for your flight to Hanoi (scheduled between ~6:30–8:30 AM).",
          "Meet your guide and driver at Noi Bai Airport.",
          "Check in to the hotel after 2 PM.",
          "Explore Hanoi Old Quarter on a guided walking tour.",
          "Visit Ngoc Son Temple at Hoan Kiem Lake (ticket not included).",
          "Visit famous Train Street and savor authentic Vietnamese egg coffee.",
          "Overnight stay in Hanoi.",
          "Meals: Breakfast."
        ]
      },
      {
        id: 'vietnam-sapa-day-6',
        day: 6,
        title: 'Day 6: Hanoi | Halong Bay Cruise | Hanoi 🚢⛰️🛶',
        activities: [
          "Depart Hanoi around 8:15–8:30 AM for Halong Bay.",
          "Arrive at Tuan Chau Harbour and board the cruise.",
          "Enjoy a scenic 5–6 hour Halong Bay cruise with a delicious Vietnamese lunch onboard.",
          "Visit the massive and magnificent Surprising Cave (Sung Sot Cave).",
          "Explore Ti Top Island and hike up to the 360-degree viewpoint over the bay.",
          "Experience kayaking or bamboo boating through Luon Cave.",
          "Enjoy sunset, tea, cakes and music on the sundeck of the cruise.",
          "Return to Hanoi via the expressway.",
          "Overnight stay in Hanoi.",
          "Meals: Breakfast & Lunch."
        ]
      },
      {
        id: 'vietnam-sapa-day-7',
        day: 7,
        title: 'Day 7: Hanoi to Sapa | Mountain Valley Exploration 🚌⛰️🌿',
        activities: [
          "Transfer from Hanoi to the mountain town of Sapa by luxury bus (approx. 6 hours).",
          "Arrive in Sapa, check in and enjoy free time in the cool mountain breeze.",
          "Explore Sapa town centre, stone church, local ethnic tribal markets and cafés.",
          "Overnight stay in Sapa.",
          "Meals: Breakfast."
        ]
      },
      {
        id: 'vietnam-sapa-day-8',
        day: 8,
        title: 'Day 8: Fansipan Mountain | Roof of Indochina 🚡🏔️🛕',
        activities: [
          "After breakfast, take the world-record Fansipan Cable Car to the “Roof of Indochina” (3,143 meters).",
          "Enjoy breathtaking panoramic mountain views and sea of clouds across the Hoang Lien Son range.",
          "Visit the spiritual Fansipan Peak Pagoda Complex and giant Buddha statues.",
          "Return to Sapa town, relax and explore local night market delicacies.",
          "Overnight stay in Sapa.",
          "Meals: Breakfast."
        ]
      },
      {
        id: 'vietnam-sapa-day-9',
        day: 9,
        title: 'Day 9: Sapa to Hanoi | Departure 🚌🛫✨',
        activities: [
          "After breakfast, check out and transfer back to Hanoi / Noi Bai International Airport by bus.",
          "Transfer to the airport according to your onward flight schedule (departure flights recommended after 2:00 PM / evening).",
          "Conclude your epic 9-day Vietnam and Sapa adventure with unforgettable memories and lifelong tribe friendships!",
          "Meals: Breakfast."
        ]
      }
    ],
    inclusions: [
      "Hotel accommodation at all destinations on double-sharing basis.",
      "8 breakfasts + 1 Vietnamese lunch onboard Halong Bay Cruise.",
      "Internal domestic flights with 20 kg luggage allowance (HCMC → Da Nang & Da Nang → Hanoi).",
      "Shared expressway transfer between Hanoi – Halong – Hanoi.",
      "Luxury bus transfer between Hanoi – Sapa – Hanoi.",
      "Entry fees for all mentioned sightseeing locations.",
      "Halong Bay 5–6 hour cruise with lunch, kayaking / bamboo boating.",
      "Ba Na Hills two-way cable car and sightseeing.",
      "Fansipan Cable Car ticket to the Roof of Indochina.",
      "Traditional Coconut Forest Basket Boat Ride.",
      "Cu Chi Tunnels experience and entry tickets.",
      "Qualified local tour guides throughout the trip (except during specified leisure periods)."
    ],
    exclusions: [
      "International flights between India and Vietnam & airport taxes.",
      "Vietnam E-Visa service.",
      "5% GST + 5% TCS extra on the package price.",
      "Meals not mentioned in the itinerary (lunches and dinners).",
      "Single-room supplement.",
      "Early check-in and late check-out.",
      "Hotel / room upgrades.",
      "Drinks, packaged water and personal expenses.",
      "Services not specifically mentioned in the itinerary.",
      "Travel insurance.",
      "Wax Museum, Cotton Animal Game and Carnival Skills at Fantasy Park.",
      "Optional machine gun shooting at Cu Chi Tunnels."
    ],
    policies: [
      "Regular Price: ₹69,999/- per person + 5% GST & 5% TCS (Includes Land Package + 2 Internal Domestic Flights + Sapa Express Transfers).",
      "Booking Amount: ₹20,000/- per person advance to confirm your seat. Remaining payment is payable 30 days before departure.",
      "Recommended luggage: One medium bag up to approx. 65 cm + one handbag per person.",
      "Standard hotel check-in is 2:00 PM; check-out is 11:00 AM.",
      "Airport transfers operate at fixed group timings based on the majority schedule. Individual transfers outside group timings may incur additional charges.",
      "Return flights from Hanoi on Day 9 should be booked for 2:00 PM or later.",
      "Valid government ID / Passport (min 6 months validity) is required for travel.",
      "Booking transfers are not permitted. Only the registered traveller can travel.",
      "No refund is provided for unused inclusions or cancelled tours due to weather/force majeure.",
      "Travellers are responsible for their own luggage and personal belongings.",
      "Travellers should report at pickup points 30 minutes before scheduled departure.",
      "Drinking and smoking are prohibited during group journeys.",
      "Misconduct or indiscipline may result in removal from the trip without refund.",
      "Cancellation Policy: Initial booking amount is non-refundable. Cancellation 30+ days before departure: 50% trip cost charged as cancellation fee | 15–30 days before departure: 75% cancellation fee | 0–15 days before departure: 100% cancellation fee."
    ],
    pricingOptions: [
      { label: 'Land Package + 2 Domestic Flights + Sapa (Double Sharing)', price: '₹69,999 / person' },
      { label: 'Booking Advance', price: '₹20,000 / person' },
      { label: 'Christmas & New Year Special Batch', price: 'On Request', note: 'Dates available on request' },
      { label: 'Taxes (5% GST + 5% TCS)', price: 'As Applicable', note: '5% GST + 5% TCS extra' }
    ],
    bookingAmount: '₹20,000 / person',
    reviews: [
      {
        name: 'Tanvi Kulkarni',
        role: 'Verified Traveller',
        detail: 'Vietnam with Sapa 8N/9D',
        rating: 5,
        quote: 'Fansipan peak in Sapa was literally above the clouds! The cable car ride was mind-blowing, and Halong Bay plus Ba Na Hills made this the most complete Vietnam trip ever. Excellent hotels and internal flight coordination!'
      },
      {
        name: 'Varun Singhania',
        role: 'Verified Traveller',
        detail: 'Vietnam & Sapa Backpacking',
        rating: 5,
        quote: 'From the bustling night streets of Saigon to the peaceful mountains of Sapa, every day had something extraordinary. Egg coffee in Hanoi and the basket boat in Hoi An were unforgettable. Tribe vibes all the way!'
      },
      {
        name: 'Kavita Menon',
        role: 'Local Guide',
        reviewCount: '22 reviews',
        photoCount: '63 photos',
        detail: 'Vietnam Indochina Expedition',
        rating: 5,
        quote: 'The luxury bus to Sapa was super comfortable and the Fansipan pagoda complex was breathtaking. Perfect mix of culture, nature, and adventure with great group energy. Highly recommended!'
      }
    ]
  },
  {
    id: 'konkan-coastal-roadtrip',
    slug: 'konkan-coastal-roadtrip',
    title: 'Coastal Maharashtra Road Trip',
    location: 'Mumbai · Ratnagiri · Ganpatipule · Kasheli · Maharashtra',
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
    duration: '4N/5D',
    price: '₹8,499',
    image: '/Card Image/kokan.png',
    alt: 'Coastal Maharashtra Road Trip — Ganpatipule Beach, Aare Ware Coastal Road and Ratnadurg Fort',
    tag: 'Coastal Roadtrip',
    description: 'Hit the open road along Maharashtra’s most scenic Arabian Sea coastline with Travel Tribes on a 4N/5D Coastal Maharashtra Road Trip from Mumbai & Pune! From the 400-year-old seaside Ganpatipule Ganesha Temple and pristine golden sands to driving along the famous cliffside Aare-Ware coastal road with India’s first sea-facing zipline. Explore the historic Ratnadurg sea fort, seek blessings at Bhagwati Temple, catch panoramic sunset vistas at Table Point and Ratnagiri Lighthouse, and discover the hidden paradise of Devghali (Kasheli) Beach. Curated for 18–40 year old wanderers with AC bus travel, stays, meals, and unforgettable tribe bonding.',
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
      "Visit the 400-year-old Ganpatipule Temple overlooking the Arabian Sea.",
      "Relax at the beautiful Ganpatipule Beach.",
      "Drive along the scenic Aare-Ware Coastal Road, one of Maharashtra's picturesque coastal routes.",
      "Experience India's first sea-facing zipline at Aare-Ware.",
      "Explore the historic Ratnadurg Fort and Bhagwati Temple.",
      "Capture panoramic coastal views from Ratnagiri Lighthouse.",
      "Discover the offbeat Devghali (Kasheli) Beach.",
      "Enjoy the beautiful Dhareshwar Waterfall during the monsoon season.",
      "Watch a beautiful sunset at Table Point.",
      "Travel with a group of like-minded people and enjoy community games and new friendships."
    ],
    itinerary: [
      {
        id: 'konkan-day-1',
        day: 1,
        title: 'Day 1: Thursday Night — Mumbai/Pune → Ratnagiri 🚌💨',
        activities: [
          "Begin your journey from Mumbai with pickups from Borivali, Andheri, Bandra, Sion, Chembur, Vashi and Panvel.",
          "Pune pickups are available from BMCC College, FC Road at 10:00 PM and Xion Mall, Hinjewadi at 10:30 PM.",
          "Meet your fellow travellers and begin the overnight journey towards Ratnagiri.",
          "Meals: Not included."
        ]
      },
      {
        id: 'konkan-day-2',
        day: 2,
        title: 'Day 2: Ganpatipule & Coastal Thrills 🌊🛕✨',
        activities: [
          "Arrive in Ratnagiri, check in to your stay and take some time to freshen up and relax.",
          "Visit the historic Ganpatipule Temple, a serene seaside shrine dedicated to Lord Ganesha.",
          "Spend some time relaxing at Ganpatipule Beach and enjoy the coastal surroundings.",
          "Drive along the scenic Aare-Ware Coastal Road & Beach.",
          "Optional: Experience the thrilling Aare-Ware Sea-Facing Zipline at an additional cost.",
          "Return to the stay for dinner and an overnight stay.",
          "Enjoy community games, meet fellow travellers and get to know your tribe.",
          "Meals: Breakfast & Dinner."
        ]
      },
      {
        id: 'konkan-day-3',
        day: 3,
        title: 'Day 3: Ratnagiri Exploration 🏰🌅',
        activities: [
          "Enjoy breakfast at the stay before heading out for a day of exploration.",
          "Visit the historic Ratnadurg Fort and seek blessings at the Bhagwati Temple.",
          "After lunch, visit Basra Ship Point and enjoy the coastal views.",
          "Witness a beautiful sunset at Table Point.",
          "Return to the stay, relax and spend the evening enjoying community games with fellow travellers.",
          "Meals: Breakfast & Dinner."
        ]
      },
      {
        id: 'konkan-day-4',
        day: 4,
        title: 'Day 4: Devghali Beach → Mumbai 🏖️🚙',
        activities: [
          "Enjoy breakfast and check out from the stay.",
          "Visit the beautiful Devghali Beach in Kasheli and spend some time exploring the beach and enjoying the coastal views.",
          "After lunch, begin your return journey towards Mumbai and Pune.",
          "Meals: Breakfast."
        ]
      },
      {
        id: 'konkan-day-5',
        day: 5,
        title: 'Day 5: Arrival in Mumbai & Pune 🏠✨',
        activities: [
          "Arrive back in Mumbai and Pune in the early morning.",
          "End the journey with memories of beaches, forts, adventure, scenic coastal roads and a fun community experience.",
          "Meals: Not included."
        ]
      }
    ],
    inclusions: [
      "Mumbai to Mumbai & Pune to Pune travel by comfortable AC bus.",
      "2-night accommodation on triple sharing basis (Double sharing upgrade available).",
      "5 meals: 3 breakfasts and 2 dinners.",
      "All internal transfers and sightseeing as per the itinerary.",
      "Trip Captain/local guide assistance throughout the trip.",
      "All applicable permits, parking charges, driver allowances and entry fees."
    ],
    exclusions: [
      "5% GST.",
      "Food and beverages not included in the package, including alcoholic drinks, mineral water, refreshments and highway meals.",
      "Lunches throughout the trip.",
      "Aare-Ware Zipline charges (Optional).",
      "Any additional cost arising due to natural calamities, landslides or roadblocks, payable directly by the customer.",
      "Anything not specifically mentioned in the itinerary or inclusions."
    ],
    policies: [
      "Pickup points are available across Mumbai and Pune as mentioned in the itinerary.",
      "The trip is operated as a Mumbai-to-Mumbai road trip by AC bus.",
      "The package includes triple-sharing accommodation; double sharing is available at an additional ₹1,000 per person.",
      "The Aare-Ware Zipline is optional and its cost is not included.",
      "Lunches are not included during the trip.",
      "Booking Amount: ₹4,000 per person to confirm your seat (Advance is non-refundable; transferable or convertible to 3-month Travel Tribes credit).",
      "Booking confirmation is sent after the advance payment, and travellers are added to the WhatsApp group 5 days before departure.",
      "Pending balance payments must be cleared before the trip.",
      "The trip leader may modify, skip or alter sightseeing in case of an emergency, force majeure or inappropriate participant behaviour.",
      "In triple-sharing rooms, an extra mattress is provided and should not be considered an extra bed.",
      "Delays caused by participants at sightseeing locations may result in the cancellation or skipping of subsequent sightseeing.",
      "Participants are expected to coordinate, maintain discipline and cooperate as a team.",
      "No refund will be provided in case of a no-show on the day of the trip.",
      "Alcohol consumption in hotels/rooms is subject to the respective hotel's rules.",
      "A valid photo ID is mandatory for hotel stays.",
      "The itinerary may change slightly during public holidays or festivals.",
      "Vehicles are provided strictly on a point-to-point basis as per the itinerary and are not available for personal use.",
      "Travellers are responsible for their own luggage and belongings.",
      "Travel Tribes is not liable if any sightseeing location is closed due to a special occasion, public holiday, long weekend or festival.",
      "Travel insurance is not provided for illness, accidents, theft or loss.",
      "Water and electricity availability may be limited in certain areas, and hotels may have fixed hot/cold water timings.",
      "Luxury facilities should not be expected on this community road trip.",
      "Transportation and logistics may vary depending on the final group size.",
      "Travel Tribes strictly stands against any form of harassment, and physical contact should always respect another person's comfort.",
      "Participants undertake the risks associated with road travel, vehicles and nature-based activities.",
      "AC may not be available in certain vehicles when operating in hilly regions.",
      "Third-party buses may experience breakdowns, and arranging a replacement vehicle may take some time.",
      "Meal halts are predefined by the transport vendor and cannot be changed for individual convenience.",
      "Refunds will be provided only when the trip is cancelled or postponed by the company/organisers, subject to the applicable policy.",
      "Cancellation 10–30 days prior: 25% deduction on remaining balance.",
      "Cancellation 8–10 days prior: 50% deduction on remaining balance.",
      "Cancellation 6–8 days prior: 70% deduction on remaining balance.",
      "Cancellation < 2 days / No-Show: 100% deduction (No refund for unused services)."
    ],
    pricingOptions: [
      { label: 'Ex-Mumbai & Pune (Triple Sharing AC Bus)', price: '₹8,499 / person' },
      { label: 'Ex-Mumbai & Pune (Double Sharing Room)', price: '₹9,499 / person' },
      { label: 'Double Sharing Upgrade', price: '+₹1,000 / person' },
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
    id: 'gokarna-backpacking',
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
    image: '/Card Image/Gokarna.jpg',
    alt: 'Gokarna Beach and scenic coastline',
    tag: 'Backpacking Trip',
    description: 'Looking for the perfect Gokarna trip from Mumbai? Join Travel Tribes on a 4N/5D Gokarna backpacking trip covering the beautiful beaches of Gokarna, the spiritual town of Murdeshwar, the mangrove backwaters of Honnavar and the spectacular Yana Caves. This Gokarna group trip combines beach trekking, backwater boating, sunsets, cafés, local markets, adventure, music, games and plenty of opportunities to meet fellow travellers. From the Gokarna beach trek covering Belekan, Paradise, Half Moon and Om Beach to the iconic Murdeshwar Shiva Statue, Honnavar backwaters and Yana Caves — this is a backpacking trip from Mumbai designed around experiences, exploration and the Travel Tribes community. Come solo. Meet strangers. Explore Gokarna. Find your tribe.',
    spots: '8 spots left',
    gallery: [
      { image: "/image/Gokarna/gokarna_img.jpeg", alt: "Gokarna" },
      { image: "/image/Gokarna/1000002342.jpeg", alt: "Gokarna" },
      { image: "/image/Gokarna/1000003396.jpg", alt: "Gokarna" },
      { image: "/image/Gokarna/1000004087.jpg", alt: "Gokarna" },
      { image: "/image/Gokarna/1000005461.jpeg", alt: "Gokarna" },
      { image: "/image/Gokarna/1000052570.jpg", alt: "Gokarna" },
      { image: "/image/Gokarna/20251231_100322_Original.JPEG", alt: "Gokarna" },
      { image: "/image/Gokarna/IMG_4170.JPG", alt: "Gokarna" },
      { image: "/image/Gokarna/IMG_7330.JPEG", alt: "Gokarna" },
      { image: "/image/Gokarna/IMG_8908_Original.JPEG", alt: "Gokarna" }
    ],
    highlights: [
      "Visit Murdeshwar Temple & Asia’s second-largest Shiva statue, a spiritual marvel.",
      "Experience Honnavar backwater boating through mesmerizing mangroves.",
      "Enjoy a Gokarna beach trek from Belekan to Om Beach with cliffside views and bonding moments.",
      "Explore Belekan Beach, Paradise Beach, Half Moon Beach and Om Beach.",
      "Experience water sports at Om Beach, from surfing to parasailing.",
      "Explore the vibrant Hippie Market/Flea Market and shop for local crafts and souvenirs.",
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
        id: 'gokarna-day-1',
        day: 1,
        title: 'DAY 1 — Mumbai to Gokarna | The Train Journey 🚂',
        activities: [
          "Hello! fellow Gokarna backpackers! We're all meeting on the train.",
          "Let's have a fantastic journey with ice-breaking games and lots of fun! Let the Journey Begin!!!",
          "Train Details: 12619 Matsyagandha Exp / 22629 LTT Ten Exp / 12133 Mangaluru Exp (Depends on the Availability). Check the train timing with us before booking.",
          "Meals: Not included."
        ]
      },
      {
        id: 'gokarna-day-2',
        day: 2,
        title: 'DAY 2 — Murdeshwar, Honnavar & Gokarna 🛕🌴',
        activities: [
          "Reach Murudeshwar station at morning. Take your time to freshen up. Temporary rooms will be provided for freshen up.",
          "Visit Murudeshwar Temple, Asia's second tallest Shiva statue, followed by breakfast.",
          "Experience the most amazing mangrove forest backwaters boating in Honnavar.",
          "After boating in Honnavar have lunch enroute to Leave for Gokarna immediately and check in to your resort.",
          "Take a rest, freshen up and Experience the most Amazing Sunset at Kudle hilltop.",
          "Later let’s explore some beach side cafe and shacks for Beachside dinner.",
          "Back to our Stay for the Tribe Vibe session and get to know each other, listen to lots of stories, dance and music have a great sleep.",
          "Those who are joining from other cities can directly reach Murdeshwar by 7 AM and meet our crew.",
          "Meals: Breakfast & Lunch."
        ]
      },
      {
        id: 'gokarna-day-3',
        day: 3,
        title: 'DAY 3 — Gokarna Beach Trek | Cafe Hopping & Hippie Market 🏖️',
        activities: [
          "Wake up and have breakfast.",
          "Walk to the combination of treks and beaches.",
          "Visit Belecan Beach, Paradise Beach, Half Moon Beach, and Om Beach & Kudle Beach.",
          "Enjoy water sports at Om Beach/Kudle Beach.",
          "Sit back & relax till you experience yet another Sunset which Gokarna’s Beautiful Beach has to offer.",
          "Explore the flea market of Gokarna.",
          "Visit Mahabaleshwar Temple at your own.",
          "Return to your stay and rest. Enjoy free time with games, dancing, stories, and more.",
          "Meals: Breakfast & Dinner."
        ]
      },
      {
        id: 'gokarna-day-4',
        day: 4,
        title: 'DAY 4 — Yana Caves, Vibhooti Falls & Board the Train 🌿',
        activities: [
          "After breakfast, check out and prepare for an excursion to Yana Caves.",
          "Visit the cave temple dedicated to Lord Shiva.",
          "Visit Vibhooti Falls (only if time permits).",
          "Freshen up and have lunch en route.",
          "Head to Railway Station to board the Train.",
          "Board the train at 5:00 PM / 8:00 PM and proceed towards Mumbai.",
          "Meals: Breakfast."
        ]
      },
      {
        id: 'gokarna-day-5',
        day: 5,
        title: 'DAY 5 — Back to Mumbai 🏠',
        activities: [
          "Returning home with cherished memories.",
          "Countless pictures to look back at.",
          "Joy from all the fun experiences on this incredible trip.",
          "Promise to stay in touch and plan more adventures together.",
          "Return timings: 08:27 AM — Panvel | 10:00 AM — Thane / 10:30 AM — CSMT OR 12:30 PM — Panvel | 01:30 PM — Kalyan."
        ]
      }
    ],
    inclusions: [
      "Train travel from Mumbai and back Sleeper Non-AC / 3AC (Confirm or RAC)",
      "2N AC stay on Hotel triple/quad sharing basis",
      "5 meals: 3 Breakfast, 1 Lunch on Day 2, 1 Dinner on Day 3",
      "Honnavar Backwaters Boating",
      "Transfers for Honnavar, Yana Caves & Murdeshwar by private bus/vehicle",
      "Entry fee and parking charges",
      "Guided Gokarna Beach Trek",
      "Travel Tribes Trip Captain cum friend to assist you with the best service throughout the trip."
    ],
    exclusions: [
      "Train meals are not included.",
      "Personal expenses.",
      "Any extra railway cost and train food.",
      "Tatkal ticket charges, if applicable.",
      "Any personal expense like a tip to the driver, entry to monuments, camera/video camera charges, laundry, telephone bills, etc.",
      "Any cost arising due to natural calamities like landslides, roadblocks, etc. to be borne directly by the customer on the spot.",
      "GST 5%."
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
      "Book your trip before 30 days prior to the departure date to get the confirmed train tickets.",
      "The trip leader has all the rights to discard, skip or alter sightseeing/itinerary if an emergency occurs, act of God or due to unfavorable behavior of participants.",
      "In triple-sharing rooms, an extra mattress is provided, but it should not be confused with an extra bed.",
      "Any delay in time at particular sightseeing by participants will result in cancellation of further sightseeing.",
      "Participants should coordinate, be disciplined and align together as a team during the trip.",
      "No refund will be provided if the participant doesn’t show up on the day of the event.",
      "Alcohol consumption and serving in hotels/rooms are subject to the rules and regulations of the respective hotels.",
      "Though safety is a top priority, event organizers are not responsible for severe injuries or fatal events.",
      "A valid photo ID for all members staying at the hotel is mandatory.",
      "Itineraries might change slightly on public holidays/festivals.",
      "The vehicle provided will be used exclusively as per the itinerary on a point-to-point basis and will not be available for personal use.",
      "Travellers must take care of their luggage and belongings. Management shall not be accountable for missing items.",
      "If sightseeing is closed due to special occasions, public holidays, long weekends or festivals, Travel Tribes is not liable.",
      "Travel Tribes does not provide an insurance policy covering sickness, accidents, theft or other losses.",
      "Water and electricity scarcity may occur in hilly areas; some hotels have fixed schedules for hot and cold water.",
      "Please do not expect luxury facilities and appreciate being cooperative with fellow participants.",
      "Transportation and logistics may vary depending on group size.",
      "Travel Tribes strictly stands against any form of harassment.",
      "Individuals enrolling in the plan must accept road, vehicle and nature-related risks.",
      "AC may not be available in vehicles such as Tempo Traveller/Innova/Xylo/Scorpio or similar categories in hilly regions.",
      "Third-party buses may experience breakdowns, and replacement arrangements may take some time.",
      "Bus halts for lunch/dinner are predefined by the vendor and cannot be changed for convenience.",
      "Refund will be done only in case of cancellation of the plan by the company/organizers or if the plan is postponed.",
      "By joining the trip, you give consent and authority to Travel Tribes to use clicked pictures/videos for social media, marketing or other media purposes.",
      "Cancellation & Refund Policy: The booking amount is non-refundable if the traveller cancels the trip. If the traveller cancels, the booking amount can be transferred to another person or used as Travel Tribes credit within 3 months.",
      "Any additional amount paid beyond the booking amount will be refunded as per the applicable cancellation timeline: 10–30 days before departure: 25% deduction | 8–10 days before departure: 50% deduction | 6–8 days before departure: 70% deduction | 3–6 days before departure: 90% deduction | Less than 2 days before departure: 100% deduction | No-show / partial attendance: No refund for unused services.",
      "Cancellation by Travel Tribes: If the trip is cancelled by the operator, the booking/advance amount will be fully refundable. Rescheduling or travel credit may also be offered. Eligible refunds will be processed within 4–7 business days.",
      "Booking Transfer: Bookings can be transferred to another person, subject to applicable terms and eligibility."
    ],
    pricingOptions: [
      { label: 'Ex-Gokarna (Gokarna to Gokarna)', price: '₹8,499 / person' },
      { label: 'Ex-Mumbai — Non-AC Train', price: '₹9,499 / person' },
      { label: 'Ex-Mumbai — AC Train', price: '₹11,499 / person' },
      { label: 'Add-On — Double Sharing', price: '+₹1,500 / person' },
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
    id: 'gokarna-xmas-new-year',
    slug: 'gokarna-xmas-new-year',
    title: 'Gokarna — X-Mas & New Year Special',
    location: 'Murdeshwar · Honnavar · Gokarna · Karnataka',
    region: 'Domestic',
    date: 'Dec 24–28, 2026 (XMAS Special)',
    dates: [
      'Dec 24–28, 2026 (XMAS Special)',
      'Dec 29, 2026–Jan 02, 2027 (New Year Special)'
    ],
    duration: '4N/5D',
    price: '₹11,999',
    image: '/Card Image/gokarna_newyear.png',
    alt: 'Gokarna Christmas and New Year Special Beach Party and Fireworks',
    tag: 'Xmas & New Year Special',
    description: 'Looking for the perfect Gokarna New Year Trip from Mumbai? Join Travel Tribes on a 4N/5D Gokarna backpacking trip covering the beautiful beaches of Gokarna, the spiritual town of Murdeshwar, the mangrove backwaters of Honnavar and the spectacular Yana Caves. This New Year Special combines beach trekking, backwater boating, sunsets, cafés, local markets, adventure, music, games and an unforgettable New Year celebration by the beach with fireworks and a beach party. Come solo. Meet strangers. Explore Gokarna. Celebrate the New Year. Find your tribe.',
    spots: '6 spots left',
    gallery: [
      { image: "/image/Gokarna/gokarna_img.jpeg", alt: "Gokarna Coastal Sunset" },
      { image: "/image/Gokarna/1000002342.jpeg", alt: "Murdeshwar Shiva Statue & Temple" },
      { image: "/image/Gokarna/1000003396.jpg", alt: "Honnavar Mangrove Backwaters Boating" },
      { image: "/image/Gokarna/1000004087.jpg", alt: "Kudle Beach & Sunset Vibe" },
      { image: "/image/Gokarna/1000005461.jpeg", alt: "Belekan to Om Beach Trekking Trail" },
      { image: "/image/Gokarna/1000052570.jpg", alt: "Paradise Beach Hidden Shoreline" },
      { image: "/image/Gokarna/20251231_100322_Original.JPEG", alt: "New Year Beach Celebration & Fireworks" },
      { image: "/image/Gokarna/IMG_4170.JPG", alt: "Yana Caves Majestic Natural Limestone Peaks" },
      { image: "/image/Gokarna/IMG_7330.JPEG", alt: "Vibhooti Falls Natural Cascades" },
      { image: "/image/Gokarna/IMG_8908_Original.JPEG", alt: "Travel Tribes Community Bonding & Music" }
    ],
    highlights: [
      "Visit Murdeshwar Temple and see its iconic Shiva Statue.",
      "Experience scenic Honnavar Backwaters boating through mangrove forests.",
      "Trek along the beautiful coastline from Belekan Beach to Om Beach.",
      "Explore Paradise Beach and Half Moon Beach during the coastal trek.",
      "Enjoy water sports at Kudle Beach.",
      "Watch a beautiful sunset from Kudle Hilltop and Kudle Beach.",
      "Explore Gokarna's famous hippie and flea market.",
      "Enjoy local café hopping and experience Gokarna's laid-back beach culture.",
      "Explore the dramatic rock formations of Yana Caves.",
      "Visit Vibhooti Falls if time permits.",
      "Celebrate New Year with your Travel Tribes community through music, dance and stories."
    ],
    itinerary: [
      {
        id: 'gokarna-ny-day-1',
        day: 1,
        title: 'Day 1: Mumbai → Murdeshwar | Train Journey & Ice-Breaking 🚂',
        activities: [
          "Meet your fellow Gokarna travellers at the designated railway stations and board the Matsyagandha Express (12619) towards Murdeshwar.",
          "Connect with your fellow travellers during the journey and participate in fun ice-breaking games and group activities.",
          "Get to know your tribe, make new friends and enjoy the journey together.",
          "Meals: Not included."
        ]
      },
      {
        id: 'gokarna-ny-day-2',
        day: 2,
        title: 'Day 2: Murdeshwar → Honnavar → Gokarna 🛕🌴',
        activities: [
          "Reach Murdeshwar Railway Station around 5:30 AM and freshen up in the temporary rooms provided by the team.",
          "Visit the famous Murdeshwar Temple and admire its iconic Shiva statue, Asia's second-tallest Shiva statue.",
          "Enjoy breakfast before heading towards Honnavar.",
          "Experience a scenic backwater boat ride through the mangrove forests of Honnavar.",
          "Have lunch en route and continue towards Gokarna.",
          "Check in to your resort, relax and freshen up.",
          "In the evening, enjoy the beautiful sunset from Kudle Hilltop and capture some memorable photographs.",
          "Later, return to the resort for dinner, music and a relaxed evening.",
          "Meals: Breakfast."
        ]
      },
      {
        id: 'gokarna-ny-day-3',
        day: 3,
        title: 'Day 3: Gokarna Beach Trek → Water Sports → Hippie Market → New Year Celebration 🏖️🎆',
        activities: [
          "Enjoy breakfast and get ready for an exciting day combining beach trekking and coastal exploration.",
          "Begin the trek from Belekan Beach and continue towards Paradise Beach, Half Moon Beach and Om Beach.",
          "Enjoy water sports at Kudle Beach and spend some time by the sea.",
          "Witness the sunset at Kudle Beach before exploring Gokarna's famous flea and hippie market.",
          "Visit Mahabaleshwar Temple at your own cost.",
          "Return to your stay, relax and get ready for the New Year celebration.",
          "Spend the evening dancing, sharing stories and celebrating with your Travel Tribes community.",
          "Meals: Breakfast."
        ]
      },
      {
        id: 'gokarna-ny-day-4',
        day: 4,
        title: 'Day 4: Yana Caves → Vibhooti Falls → Return Train 🌿🚂',
        activities: [
          "Enjoy breakfast and check out from your stay.",
          "Head towards the spectacular Yana Caves, known for their dramatic rock formations, including Bhairaveshwara and Jaganmohini Shikhara.",
          "Explore the cave temple dedicated to Lord Shiva and enjoy the surrounding natural landscape.",
          "If time permits, visit Vibhooti Falls and spend some time exploring the area.",
          "Freshen up and have lunch en route before proceeding towards Kumta Railway Station.",
          "Board the CSMT Express (12134) for your return journey to Mumbai.",
          "Meals: Breakfast."
        ]
      },
      {
        id: 'gokarna-ny-day-5',
        day: 5,
        title: 'Day 5: Back to Mumbai 🏠✨',
        activities: [
          "Arrive back in Mumbai after your overnight train journey.",
          "End the trip with photographs, new friendships and memories from your Gokarna adventure.",
          "Meals: Not included."
        ]
      }
    ],
    inclusions: [
      "2 nights accommodation on triple/quad sharing basis.",
      "Train travel from Mumbai to Murdeshwar and back (Sleeper Non-AC / 3AC options on Confirmed or RAC basis).",
      "Internal transfers between Gokarna, Honnavar, Yana Caves and Murdeshwar by private bus/vehicle.",
      "Honnavar Backwaters boating.",
      "Belekan to Om Beach trek.",
      "Hippie Market exploration.",
      "Yana Caves trek.",
      "Café hopping.",
      "3 breakfasts.",
      "Trip Captain throughout the trip.",
      "Trip Leader and support.",
      "Entry fees and parking charges."
    ],
    exclusions: [
      "Train meals are not included.",
      "Lunch throughout the trip is not included.",
      "Water bottles are not included.",
      "Driver tips, monument entry fees, camera/video charges, laundry, telephone bills and other personal expenses.",
      "Any additional railway costs and train food.",
      "Tatkal ticket charges, if applicable.",
      "5% GST.",
      "Any costs arising due to natural calamities such as landslides or roadblocks will be borne directly by the customer.",
      "Anything not specifically mentioned under the inclusions."
    ],
    thingsToCarry: [
      "Valid Government Photo ID (Aadhaar / Driving License / Passport) — Same as used during booking (Mandatory)",
      "Comfortable trekking shoes / sneakers with good grip and casual flip-flops",
      "Light and breathable cotton clothes, swimwear / beachwear, and quick-dry towel",
      "Small backpack / daypack (20–30L) for day tours and beach trek",
      "Sun protection: Sunscreen (SPF 50+), sunglasses, and wide cap/hat",
      "Personal medications, basic first-aid, ORS / Glucose",
      "Power bank, charging cables, and waterproof phone pouch",
      "Reusable water bottle"
    ],
    policies: [
      "The trip involves overnight train journeys, so travellers should carry comfortable travel essentials.",
      "Train tickets are booked in advance by the Travel Tribes team, subject to availability.",
      "Travellers must carry the same government-issued ID submitted during booking.",
      "Berth preferences such as lower berth or window seat cannot be guaranteed.",
      "Group members may not always be seated together as final allocation is handled by Indian Railways.",
      "If tickets are on the waiting list, Tatkal booking may be used, and additional charges will be added to the trip cost.",
      "If a confirmed Tatkal ticket cannot be secured, an alternate train or transport may be arranged based on availability, and any fare difference will apply.",
      "Travellers should check their ticket details, PNR status and validity on official railway platforms.",
      "Train delays, cancellations or rescheduling by Indian Railways are outside Travel Tribes' control.",
      "Bookings made 30 days before departure are recommended for better chances of confirmed train tickets.",
      "The Belekan–Om Beach trek involves walking along the coastal terrain, so comfortable footwear is recommended.",
      "Vibhooti Falls is subject to time availability as mentioned in the itinerary.",
      "The Trip Leader may modify, skip or alter sightseeing or the itinerary in case of an emergency, force majeure or inappropriate participant behaviour.",
      "In triple-sharing rooms, an extra mattress is provided and should not be considered an extra bed.",
      "Delays caused by participants at sightseeing locations may result in the cancellation or skipping of subsequent sightseeing.",
      "Participants are expected to coordinate, maintain discipline and cooperate as a team throughout the trip.",
      "No refund will be provided in case of a no-show on the day of the trip.",
      "Alcohol consumption and serving in hotels/rooms are subject to the respective hotel's rules.",
      "A valid photo ID is mandatory for all members staying at the hotel.",
      "The itinerary may change slightly during public holidays or festivals.",
      "Vehicles are provided strictly as per the itinerary on a point-to-point basis and are not available for personal use.",
      "Travellers are responsible for their own luggage and belongings.",
      "If any sightseeing location is closed due to a special occasion, public holiday, long weekend or festival, Travel Tribes will not be liable.",
      "Travel Tribes does not provide insurance covering sickness, accidents, theft or other losses.",
      "Water and electricity availability may be limited in some areas, and hotels may have fixed schedules for hot and cold water.",
      "Participants should not expect luxury facilities and are expected to cooperate with fellow travellers.",
      "Transportation and logistics may vary depending on the final group size.",
      "Travel Tribes strictly stands against any form of harassment, and physical contact should always respect another person's comfort.",
      "Participants undertake the risks associated with road travel, vehicles and nature-related activities.",
      "AC may not be available in vehicles such as Tempo Travellers, Innovas, Xylos, Scorpios or similar vehicles in hilly regions.",
      "Third-party buses may experience breakdowns, and arranging a replacement vehicle may take some time.",
      "Bus halts for meals are predefined by the transport vendor and cannot be changed for individual convenience.",
      "Refunds will be provided only in case the trip is cancelled or postponed by the company/organisers, subject to the applicable policy.",
      "Participants consent to Travel Tribes using photos and videos taken during the trip for social media, marketing and promotional purposes.",
      "Booking Amount: ₹5,000 per person to confirm your seat.",
      "Cancellation 30+ days prior: Advance amount retained / converted to Travel Tribes credit.",
      "Cancellation 15–29 days prior: 50% deduction of total trip cost.",
      "Cancellation < 14 days / No-Show: 100% deduction (No refund for unused services).",
      "Cancellation by Travel Tribes: 100% full refund within 4–7 business days if the trip is cancelled by the operator."
    ],
    pricingOptions: [
      { label: 'Ex-Gokarna (Triple / Quad Sharing)', price: '₹10,999 / person + 5% GST' },
      { label: 'Mumbai to Mumbai (Non-AC Sleeper Train)', price: '₹11,999 / person + 5% GST' },
      { label: 'Mumbai to Mumbai (3-Tier AC Train)', price: '₹13,999 / person + 5% GST' }
    ],
    bookingAmount: '₹5,000 / person',
    reviews: [
      {
        name: 'Deepak Dhiver',
        role: 'Local Guide',
        reviewCount: '16 reviews',
        photoCount: '51 photos',
        rating: 5,
        quote: 'Went on Gokarna New Year trip with Travel Tribes, and this was my 1st Solo trip ever. Met great people, visited Honnavar backwaters and had the best beach NY celebration. Everything was organized perfectly!'
      },
      {
        name: 'Abhishek Dutta',
        reviewCount: '10 reviews',
        photoCount: '9 photos',
        rating: 5,
        quote: 'Had one of the best trips ever with Travel Tribes. Really nice people and awesome management team. Had gone to Gokarna for new year party and had the best beach front resort & party.'
      },
      {
        name: 'Nakusa Indalkar',
        role: 'Local Guide',
        reviewCount: '12 reviews',
        photoCount: '11 photos',
        rating: 5,
        quote: 'All the arrangements done starting from train journey, local travel at Gokarna, accommodation, meals everything was hassle-free. TRIBE HAI TO VIBE HAI !'
      }
    ]
  },
  {
    id: 'coorg-backpacking',
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
    image: '/Card Image/coorg.jpg',
    alt: 'Misty hills and lush coffee plantations of Coorg',
    tag: 'Scotland of India',
    description: 'Looking for a Coorg trip from Mumbai, a Coorg backpacking trip, or a fun Coorg group trip with strangers? Join Travel Tribes for an unforgettable journey to Coorg, the Scotland of India, and explore misty hills, lush coffee plantations, waterfalls, viewpoints, monasteries and scenic landscapes. This Coorg backpacking trip from Mumbai takes you through some of the best experiences in Coorg, including Abbey Falls, Mandalpatti Peak, Raja’s Seat, Chiklihole Dam, Namdroling Monastery (Golden Temple), Elephant Camp, Nisargadhama, Coffee Plantations, Madikeri Fort and Omkareshwar Temple. Travel by train from Mumbai to Mangalore, continue towards Coorg with your tribe, explore the beautiful Western Ghats and return with a camera full of memories and a bunch of new travel buddies. Come solo. Meet strangers. Explore Coorg. Find your tribe.',
    spots: '6 spots left',
    gallery: [
      { image: "/image/Coorg/coorg_img.JPEG", alt: "Coorg" },
      { image: "/image/Coorg/IMG_0105.JPEG", alt: "Coorg" },
      { image: "/image/Coorg/IMG_5327.JPEG", alt: "Coorg" },
      { image: "/image/Coorg/IMG_5499.JPEG", alt: "Coorg" },
      { image: "/image/Coorg/IMG_5769.JPEG", alt: "Coorg" },
      { image: "/image/Coorg/IMG_5844.JPEG", alt: "Coorg" },
      { image: "/image/Coorg/IMG_6888.JPEG", alt: "Coorg" },
      { image: "/image/Coorg/IMG_7410.JPEG", alt: "Coorg" },
      { image: "/image/Coorg/IMG_7804.JPEG", alt: "Coorg" },
      { image: "/image/Coorg/IMG_8960.JPEG", alt: "Coorg" }
    ],
    highlights: [
      "Explore the lush green landscapes of Coorg",
      "Walk through scenic Coorg coffee plantations",
      "Visit the picturesque Abbey Falls",
      "Experience an exciting off-roading Jeep ride to Mandalpatti Peak",
      "Enjoy panoramic Western Ghats views from Mandalpatti Peak",
      "Experience the mesmerising views from Raja’s Seat",
      "Visit the Elephant Camp",
      "Explore Namdroling Monastery (Golden Temple)",
      "Visit the peaceful Chiklihole Dam",
      "Explore Nisargadhama and bird sanctuary",
      "Visit Madikeri Fort",
      "Visit Omkareshwar Temple",
      "Explore the local market and shop for Coorg coffee and spices",
      "Enjoy ice-breakers, games and group activities",
      "Enjoy bonfire, dinner and quality time with your tribe",
      "Meet fellow travellers through the Travel Tribes community experience"
    ],
    itinerary: [
      {
        id: 'coorg-day-1',
        day: 1,
        title: 'DAY 1 — Mumbai to Mangalore | The Train Journey 🚂',
        activities: [
          "Hello! fellow Coorg Traveller!! We're all meeting on the train.",
          "Netravati Exp (16345) arriving at different times: 11:40 AM — LTT | 12:05 PM — Thane | 12:50 PM — Panvel.",
          "Let's have a fantastic journey with ice-breaking games and lots of fun! Let the Journey Begins!!!",
          "Meals: Not Included on the train."
        ]
      },
      {
        id: 'coorg-day-2',
        day: 2,
        title: 'DAY 2 — Coorg Plantation & Tasting Experience ☕🍷',
        activities: [
          "Reach Mangalore Station by 5:00 AM.",
          "Start your journey towards Coorg immediately (3–4 hrs). En route, have breakfast.",
          "Check-in to our stay & freshen up. Get ready for the next adventure!",
          "Start the day with an immersive Coffee Plantation Tour through the lush green plantations of Coorg.",
          "Explore the beautiful coffee estates and learn about the coffee-growing process and Coorg’s rich coffee culture.",
          "Next, explore a Spice Garden and discover the variety of spices grown in the region.",
          "Experience the aroma and flavours of locally grown spices while walking through the plantation.",
          "Enjoy a Wine Tasting Experience and sample different varieties while learning about the flavours and making process.",
          "Later, head towards Raja’s Seat. Enjoy the stunning panoramic views of Coorg’s hills and valleys. Relax at the viewpoint and capture some beautiful Insta-worthy pictures.",
          "Experience the mesmerising sunset at Raja’s Seat.",
          "Later, return to the stay. Enjoy dinner, relax and spend time with your fellow travellers.",
          "Meals: Breakfast & Dinner."
        ]
      },
      {
        id: 'coorg-day-3',
        day: 3,
        title: 'DAY 3 — Chiklihole Dam, Golden Temple & Elephant Camp 🐘🛕',
        activities: [
          "After breakfast, we’ll first visit Chiklihole Dam, a peaceful spot where nature meets a stunning man-made reservoir.",
          "Next up is the Namdroling Monastery (Golden Temple) — a calm, spiritual escape and one of the largest Tibetan settlements in India.",
          "Then we’ll head to the Elephant Camp to spend some time with the gentle giants.",
          "If time permits, we’ll also explore Nisargadhama.",
          "Later, enjoy some time at the local market to experience Coorg’s famous coffee and spices.",
          "Dinner and rest back at the stay!",
          "Meals: Breakfast & Dinner."
        ]
      },
      {
        id: 'coorg-day-4',
        day: 4,
        title: 'DAY 4 — Mandalpatti Sunrise, Abbey Falls & Omkareshwar Temple 🚙🌄',
        activities: [
          "Wake up early in the morning and get ready for an exciting adventure.",
          "Leave for Mandalpatti Peak in a 4×4 Jeep. Experience an exciting off-roading Jeep ride through the scenic trails of Coorg.",
          "Reach Mandalpatti Peak early morning and witness the breathtaking sunrise over the Western Ghats.",
          "Return from Mandalpatti and head towards Abbey Falls. Witness the majestic beauty of the famous Abbey Falls, surrounded by lush greenery.",
          "Later, visit Omkareshwar Temple, a historic temple located in Madikeri.",
          "Freshen up and proceed towards Mangalore Railway Station.",
          "Reach Mangalore Station and board your train for the return journey.",
          "Meals: Breakfast."
        ]
      },
      {
        id: 'coorg-day-5',
        day: 5,
        title: 'DAY 5 — Back to Mumbai 🏠',
        activities: [
          "Returning home with cherished memories, countless pictures to look back at, and the joy of all the fun experiences we had on this incredible trip.",
          "We promise to stay in touch and plan more adventures together.",
          "Train: Netravati Exp 16349.",
          "Meals: Not Included."
        ]
      }
    ],
    inclusions: [
      "Train Travel From Mumbai and Back — Sleeper / AC (Confirm or RAC)",
      "2 Night Stay on Triple / Quad Sharing Basis",
      "5 Meals: 3 Breakfast, 2 Dinner",
      "Jeep ride at Mandalpatti Peak",
      "Internal Transport with Private Vehicle (6 Seater / TT / Bus)",
      "Entry fee and parking charges",
      "Coffee Plantation Tour entry charges",
      "Experience a Travel Tribes Trip Captain cum friend to assist you with the best service throughout the trip."
    ],
    exclusions: [
      "Train meals are not included.",
      "Lunch throughout the trip.",
      "Personal expenses.",
      "Any extra railway cost and train food.",
      "Tatkal ticket charges, if applicable.",
      "Any personal expense like a tip to the driver, entry to monuments, camera/video camera charges, laundry, telephone bills, etc.",
      "Any cost arising due to natural calamities like landslides, roadblocks, etc. to be borne directly by the customer on the spot.",
      "Animal feeding charges at Elephant Camp and Nisargdhama.",
      "GST 5%."
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
      "Book your trip before 30 days prior to the departure date to get the confirmed train tickets.",
      "The trip leader has all the rights to discard, skip or alter sightseeing/itinerary if an emergency occurs, act of God or due to unfavorable behavior of participants.",
      "In triple-sharing rooms, an extra mattress is provided, but it should not be confused with an extra bed.",
      "Any delay in time at particular sightseeing by participants will result in cancellation of further sightseeing.",
      "Participants should coordinate, be disciplined and align together as a team during the trip.",
      "No refund will be provided if the participant doesn’t show up on the day of the event.",
      "Alcohol consumption and serving in hotels/rooms are subject to the rules and regulations of the respective hotels.",
      "Though safety is a top priority, event organizers are not responsible for severe injuries or fatal events.",
      "A valid photo ID for all members staying at the hotel is mandatory.",
      "Itineraries might change slightly on public holidays/festivals.",
      "The vehicle provided will be used exclusively as per the itinerary on a point-to-point basis and will not be available for personal use.",
      "Travellers must take care of their luggage and belongings. Management shall not be accountable for missing items.",
      "If sightseeing is closed due to special occasions, public holidays, long weekends or festivals, Travel Tribes is not liable.",
      "Travel Tribes does not provide an insurance policy covering sickness, accidents, theft or other losses.",
      "Water and electricity scarcity may occur in hilly areas; some hotels have fixed schedules for hot and cold water.",
      "Please do not expect luxury facilities and appreciate being cooperative with fellow participants.",
      "Transportation and logistics may vary depending on group size.",
      "Travel Tribes strictly stands against any form of harassment.",
      "Individuals enrolling in the plan must accept road, vehicle and nature-related risks.",
      "AC may not be available in vehicles such as Tempo Traveller/Innova/Xylo/Scorpio or similar categories in hilly regions.",
      "Third-party buses may experience breakdowns, and replacement arrangements may take some time.",
      "Bus halts for lunch/dinner are predefined by the vendor and cannot be changed for convenience.",
      "Refund will be done only in case of cancellation of the plan by the company/organizers or if the plan is postponed.",
      "By joining the trip, you give consent and authority to Travel Tribes to use clicked pictures/videos for social media, marketing or other media purposes.",
      "Cancellation & Refund Policy: The booking amount is non-refundable if the traveller cancels the trip. If the traveller cancels, the booking amount can be transferred to another person or used as Travel Tribes credit within 3 months.",
      "Any additional amount paid beyond the booking amount will be refunded as per the applicable cancellation timeline: 10–30 days before departure: 25% deduction | 8–10 days before departure: 50% deduction | 6–8 days before departure: 70% deduction | 3–6 days before departure: 90% deduction | Less than 2 days before departure: 100% deduction | No-show / partial attendance: No refund for unused services.",
      "Cancellation by Travel Tribes: If the trip is cancelled by the operator, the booking/advance amount will be fully refundable. Rescheduling or travel credit may also be offered. Eligible refunds will be processed within 4–7 business days.",
      "Booking Transfer: Bookings can be transferred to another person, subject to applicable terms and eligibility."
    ],
    pricingOptions: [
      { label: 'Ex-Mangalore (Mangalore to Mangalore)', price: '₹8,499 / person' },
      { label: 'Ex-Mumbai (Non-AC Sleeper Train)', price: '₹9,499 / person' },
      { label: 'Ex-Mumbai — 3AC (3AC Train Ticket)', price: '₹11,999 / person' },
      { label: 'Add-On (Double Sharing Room)', price: '+₹1,500 / person' },
      { label: 'Special Dates / Long Weekend Pricing', price: '+₹1,000 / person', note: 'Applicable on Long Weekends & Festive batches' }
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
    id: 'udaipur-backpacking',
    slug: 'udaipur-backpacking',
    title: 'Udaipur Backpacking Trip from Mumbai',
    location: 'Udaipur · Rajasthan · Lake Pichola · City Palace · Sajjangarh · Bahubali Hills',
    region: 'Domestic',
    date: 'Nov 20–24, 2026',
    dates: [
      'Nov 20–24, 2026',
      'Dec 23–27, 2026 (Christmas Weekend)',
      'Dec 29–Jan 02, 2027 (New Year Special)'
    ],
    duration: '4N/5D',
    price: '₹9,999',
    image: '/Card Image/udaipur.jpg',
    alt: 'Majestic City Palace overlooking Lake Pichola in Udaipur',
    tag: 'City of Lakes',
    description: 'Looking for a Udaipur trip from Mumbai, a Udaipur backpacking trip, or a fun Udaipur group trip with strangers? Join Travel Tribes for a 5-day backpacking adventure to the City of Lakes — Udaipur. Explore magnificent palaces, beautiful lakes, historic ghats, vibrant markets, cultural performances and some of the best viewpoints in the city. From the iconic City Palace and Lake Pichola to the sunset at Sajjangarh Monsoon Palace, the Bahubali Hills sunrise, Karni Mata cable car ride, Bagore Ki Haveli cultural show and local street-food trails — this Udaipur group trip is designed to experience the city beyond the usual tourist checklist. Travel from Mumbai to Udaipur by train, explore the city with your tribe and return home with new memories, countless photographs and new travel buddies. Come solo. Meet strangers. Explore Udaipur. Find your tribe.',
    spots: '7 spots left',
    gallery: [
      { image: "/image/Udaipur/udaipur_img.JPEG", alt: "Udaipur" },
      { image: "/image/Udaipur/IMG_0424.JPG", alt: "Udaipur" },
      { image: "/image/Udaipur/IMG_1067.JPEG", alt: "Udaipur" },
      { image: "/image/Udaipur/IMG_1132.JPEG", alt: "Udaipur" },
      { image: "/image/Udaipur/IMG_1310.JPEG", alt: "Udaipur" },
      { image: "/image/Udaipur/IMG_1667.JPG", alt: "Udaipur" },
      { image: "/image/Udaipur/IMG_3857.JPG", alt: "Udaipur" },
      { image: "/image/Udaipur/IMG_4003.JPG", alt: "Udaipur" },
      { image: "/image/Udaipur/IMG_6276.JPEG", alt: "Udaipur" },
      { image: "/image/Udaipur/IMG_8911.JPEG", alt: "Udaipur" }
    ],
    highlights: [
      "🏰 City Palace with stunning Lake Pichola views",
      "🚤 Boat ride to Jag Mandir Palace",
      "🌊 Explore Fateh Sagar Lake",
      "🌅 Sunset at Sajjangarh Monsoon Palace",
      "💃 Experience the Bagore Ki Haveli cultural show",
      "🌃 Explore Gangore Ghat & Ambrai Ghat",
      "🛕 Visit Jagdish Temple",
      "🌸 Explore the beautiful Saheliyon-ki-Bari gardens",
      "🚡 Experience the Karni Mata cable car / ropeway ride",
      "🌄 Catch the sunrise at Bahubali Hills",
      "🛍️ Explore Hathipole & Bada Bazaar",
      "🍴 Experience a local Rajasthani street-food trail",
      "🥟 Try local favourites like Pyaz Kachori, Poha, Rabdi & more",
      "☕ Explore lakeside cafés",
      "👥 Meet fellow travellers through the Travel Tribes community experience"
    ],
    itinerary: [
      {
        id: 'udaipur-day-1',
        day: 1,
        title: 'DAY 1 — Mumbai to Udaipur | The Journey Begins 🚂',
        activities: [
          "Mumbai to Udaipur Train Journey • Ice-Breaking Games",
          "Hello, fellow backpackers! Begin your journey from Mumbai to Udaipur by train.",
          "Train: 22901 – Bdts Udz Sf Exp",
          "Bandra Terminus: 11:25 PM | Borivali: 11:52 PM",
          "Let's have a fantastic journey with ice-breaking games and lots of fun! Let the journey begin!!!",
          "Meals: Not Included"
        ]
      },
      {
        id: 'udaipur-day-2',
        day: 2,
        title: 'DAY 2 — Fateh Sagar Lake, Bagore Ki Haveli, Gangore Ghat & Ambrai Ghat 🌊💃',
        activities: [
          "Udaipur Lakes • Cultural Show • Ghats • Sunset",
          "Upon reaching Udaipur in the afternoon, check in to the stay.",
          "Have a delicious lunch and freshen up.",
          "By evening, immerse yourself in the serene ambiance of Fateh Sagar Lake.",
          "Witness the enchanting sunset at Fateh Sagar Lake.",
          "Later, watch a captivating cultural dance show at Bagore Ki Haveli.",
          "Explore Gangore Ghat.",
          "Enjoy the ambiance at Ambrai Ghat.",
          "Explore some lakeside cafés for dinner and rest.",
          "Meals: Lunch"
        ]
      },
      {
        id: 'udaipur-day-3',
        day: 3,
        title: 'DAY 3 — City Palace, Jag Mandir & Sajjangarh Monsoon Palace 🏰🌅',
        activities: [
          "Begin your day with a visit to the City Palace.",
          "Explore this captivating blend of Mughal and Rajasthani architecture.",
          "Get to know the history of the magnificent City Palace.",
          "Next, immerse yourself in the serene ambiance of Jag Mandir Palace via boating.",
          "Jag Mandir is an island palace in the midst of Lake Pichola.",
          "As the day winds down, head to Sajjangarh Fort, also known as Monsoon Palace. Perched on a hill, it offers a panoramic view of Udaipur. Experience a breathtaking sunset from Monsoon Palace.",
          "Later have dinner at some lakeside café.",
          "Get back to the stay and relax and spend time with your fellow travellers.",
          "Meals: Breakfast"
        ]
      },
      {
        id: 'udaipur-day-4',
        day: 4,
        title: 'DAY 4 — Bahubali Hills Sunrise, Karni Mata Temple & Udaipur Market 🌄🚡🛍️',
        activities: [
          "Bahubali Hill Sunrise • Karni Mata Ropeway • Hathipole • Bada Bazaar",
          "Get up early to catch a beautiful sunrise at Bahubali Hills.",
          "Get back to the stay. Freshen up and check out.",
          "Have breakfast.",
          "Visit Karni Mata Temple via Ropeway for panoramic city views.",
          "Explore Saheliyon-ki-Bari — a beautiful garden for queens and their friends to chill out.",
          "In the afternoon, explore Hathipole and Bada Bazaar markets.",
          "Indulge in street food and shop for souvenirs.",
          "In the evening, board your train back to Mumbai (Train: 22902 – Udz Bdts Sf Exp).",
          "Meals: Breakfast"
        ]
      },
      {
        id: 'udaipur-day-5',
        day: 5,
        title: 'DAY 5 — Back to Mumbai 🚂',
        activities: [
          "Udaipur to Mumbai Return Journey",
          "Returning home with cherished memories and countless pictures to look back at.",
          "Enjoy the joy of all the fun experiences we had on this incredible trip.",
          "We promise to stay in touch and plan more adventures together.",
          "Meals: Not Included"
        ]
      }
    ],
    inclusions: [
      "2-night hotel stay Triple / Quad sharing basis",
      "Train from Mumbai and back 3AC or Non-AC Sleeper (Confirmed or RAC)",
      "Internal transfers as per the itinerary",
      "Meals: 1 Lunch & 2 Breakfasts",
      "Bahubali Hill trek",
      "Entry Fees & Local Charges at: City Palace, Bagore Ki Haveli, Saheliyon Ki Bari",
      "Experience a Travel Tribes Trip Captain cum friend to assist you with the best service throughout the trip."
    ],
    exclusions: [
      "Train meals are not included.",
      "Lunch throughout the trip.",
      "Personal expenses.",
      "Any extra railway cost and train food.",
      "Tatkal ticket charges, if applicable.",
      "Any personal expense like a tip to the driver, entry to monuments, camera/video camera charges, laundry, telephone bills, etc.",
      "Any cost arising due to natural calamities like landslides, roadblocks, etc. to be borne directly by the customer on the spot",
      "Any additional activities such as boating at: Fateh Sagar Lake & Lake Pichola",
      "GST 5%."
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
      "Book your trip before 30 days prior to the departure date to get the confirmed train tickets.",
      "The trip leader has all the rights to discard, skip or alter sightseeing/itinerary if an emergency occurs, act of God or due to unfavorable behavior of participants.",
      "In triple-sharing rooms, an extra mattress is provided, but it should not be confused with an extra bed.",
      "Any delay in time at particular sightseeing by participants will result in cancellation of further sightseeing.",
      "Participants should coordinate, be disciplined and align together as a team during the trip.",
      "No refund will be provided if the participant doesn’t show up on the day of the event.",
      "Alcohol consumption and serving in hotels/rooms are subject to the rules and regulations of the respective hotels.",
      "Though safety is a top priority, event organizers are not responsible for severe injuries or fatal events.",
      "A valid photo ID for all members staying at the hotel is mandatory.",
      "Itineraries might change slightly on public holidays/festivals.",
      "The vehicle provided will be used exclusively as per the itinerary on a point-to-point basis and will not be available for personal use.",
      "Travellers must take care of their luggage and belongings. Management shall not be accountable for missing items.",
      "If sightseeing is closed due to special occasions, public holidays, long weekends or festivals, Travel Tribes is not liable.",
      "Travel Tribes does not provide an insurance policy covering sickness, accidents, theft or other losses.",
      "Water and electricity scarcity may occur in hilly areas; some hotels have fixed schedules for hot and cold water.",
      "Please do not expect luxury facilities and appreciate being cooperative with fellow participants.",
      "Transportation and logistics may vary depending on group size.",
      "Travel Tribes strictly stands against any form of harassment.",
      "Individuals enrolling in the plan must accept road, vehicle and nature-related risks.",
      "AC may not be available in vehicles such as Tempo Traveller/Innova/Xylo/Scorpio or similar categories in hilly regions.",
      "Third-party buses may experience breakdowns, and replacement arrangements may take some time.",
      "Bus halts for lunch/dinner are predefined by the vendor and cannot be changed for convenience.",
      "Refund will be done only in case of cancellation of the plan by the company/organizers or if the plan is postponed.",
      "By joining the trip, you give consent and authority to Travel Tribes to use clicked pictures/videos for social media, marketing or other media purposes.",
      "Booking/Advance Amount: The booking amount is non-refundable if the traveller cancels the trip. If the traveller cancels, the booking amount can be transferred to another person or used as Travel Tribes credit within 3 months.",
      "Cancellation 10–30 days before departure: 25% deduction on remaining balance.",
      "Cancellation 8–10 days before departure: 50% deduction on remaining balance.",
      "Cancellation 6–8 days before departure: 70% deduction on remaining balance.",
      "Cancellation 3–6 days before departure: 90% deduction on remaining balance.",
      "Cancellation less than 2 days before departure / No-show: 100% deduction (No refund for unused services).",
      "Cancellation by Travel Tribes: If the trip is cancelled by the operator, the booking/advance amount will be fully refundable within 4–7 business days. Rescheduling or travel credit may also be offered."
    ],
    pricingOptions: [
      { label: 'Mumbai to Mumbai (Non-AC Train)', price: '₹9,999 + 5% GST' },
      { label: 'Mumbai to Mumbai (3AC Train)', price: '₹11,999 + 5% GST' },
      { label: 'Double Sharing Add-On', price: '+₹1,000 + 5% GST' }
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
    id: 'udaipur-xmas-new-year',
    slug: 'udaipur-xmas-new-year',
    title: 'Udaipur Christmas & New Year Special',
    location: 'Udaipur · Rajasthan · Lake Pichola · City Palace · Sajjangarh · Bahubali Hills',
    region: 'Domestic',
    date: 'Dec 24–28, 2026 (XMAS Special)',
    dates: [
      'Dec 24–28, 2026 (XMAS Special)',
      'Dec 29, 2026–Jan 02, 2027 (New Year Special)'
    ],
    duration: '4N/5D',
    price: '₹11,999',
    image: '/Card Image/udaipur.jpg',
    alt: 'Udaipur Christmas and New Year Special Celebration at Lake Pichola and City Palace',
    tag: 'Xmas & New Year Special',
    description: 'Celebrate Christmas & New Year in Udaipur with Travel Tribes, and experience the magic of Rajasthan’s City of Lakes with a fun-filled 5-day backpacking trip from Mumbai. Explore City Palace, Jag Mandir, Fateh Sagar Lake, Bagore Ki Haveli, Monsoon Palace and Udaipur’s vibrant local markets. Enjoy stunning sunsets, cultural experiences, Rajasthani street food and a special 31st Night New Year celebration near the ghats. Come solo, meet new people and make your festive season unforgettable with your travel tribe.',
    spots: '6 spots left',
    gallery: [
      { image: "/image/Udaipur/udaipur_img.JPEG", alt: "City Palace & Lake Pichola Panorama" },
      { image: "/image/Udaipur/IMG_0424.JPG", alt: "Jag Mandir Island Palace" },
      { image: "/image/Udaipur/IMG_1067.JPEG", alt: "Fateh Sagar Lake Sunset" },
      { image: "/image/Udaipur/IMG_1132.JPEG", alt: "Bagore Ki Haveli Traditional Folk Dance" },
      { image: "/image/Udaipur/IMG_1310.JPEG", alt: "Sajjangarh Monsoon Palace Hilltop View" },
      { image: "/image/Udaipur/IMG_1667.JPG", alt: "Bahubali Hills Sunrise" },
      { image: "/image/Udaipur/IMG_3857.JPG", alt: "Gangore & Ambrai Ghat Evening Vibe" },
      { image: "/image/Udaipur/IMG_4003.JPG", alt: "Karni Mata Ropeway View" },
      { image: "/image/Udaipur/IMG_6276.JPEG", alt: "Hathipole Street Food & Bazaar" },
      { image: "/image/Udaipur/IMG_8911.JPEG", alt: "New Year Celebration with Travel Tribes" }
    ],
    highlights: [
      "Explore the magnificent City Palace with Lake Pichola views.",
      "Take a scenic boat ride to Jag Mandir Palace.",
      "Experience the sunset at Sajjangarh Monsoon Palace.",
      "Watch a traditional Bagore Ki Haveli cultural show.",
      "Visit Fateh Sagar Lake, Gangore Ghat and Ambrai Ghat.",
      "Catch the sunrise at Bahubali Hills.",
      "Ride the Karni Mata Temple ropeway.",
      "Explore Hathipole & Bada Bazaar.",
      "Try authentic Rajasthani street food like Pyaz Kachori, Poha and Rabdi.",
      "Celebrate New Year’s Eve near the ghats with your Travel Tribes community."
    ],
    itinerary: [
      {
        id: 'udaipur-ny-day-1',
        day: 1,
        title: 'Day 1: Mumbai to Udaipur | Journey Begins 🚂',
        activities: [
          "Begin your journey from Mumbai to Udaipur by train 22901 – BDTS Udz SF Exp.",
          "Boarding points include Bandra Terminus (11:25 PM) and Borivali (11:52 PM).",
          "Meet your fellow travellers and enjoy ice-breaking games as the journey begins.",
          "Overnight journey to Udaipur.",
          "Meals: Not included."
        ]
      },
      {
        id: 'udaipur-ny-day-2',
        day: 2,
        title: 'Day 2: Fateh Sagar Lake | Bagore Ki Haveli | Gangore Ghat | Ambrai Ghat 🌊💃',
        activities: [
          "Arrive in Udaipur and check in to your stay.",
          "Freshen up and enjoy lunch.",
          "Visit Fateh Sagar Lake and witness the beautiful sunset.",
          "Experience a traditional cultural dance show at Bagore Ki Haveli.",
          "Explore Gangore Ghat and soak in the evening atmosphere at Ambrai Ghat.",
          "Later, explore lakeside cafés, enjoy dinner and relax.",
          "Meals: Lunch."
        ]
      },
      {
        id: 'udaipur-ny-day-3',
        day: 3,
        title: 'Day 3: City Palace | Jag Mandir | Sajjangarh Monsoon Palace | NY Celebration 🏰🌅🎆',
        activities: [
          "Start your day with a visit to the magnificent City Palace overlooking Lake Pichola.",
          "Take a boat ride to Jag Mandir Palace, the beautiful island palace in Lake Pichola.",
          "Visit Sajjangarh Monsoon Palace and enjoy panoramic views of Udaipur.",
          "Witness a spectacular sunset from the hilltop.",
          "New Year Batch: Celebrate 31st Night near the ghats with your travel tribe.",
          "Meals: Breakfast."
        ]
      },
      {
        id: 'udaipur-ny-day-4',
        day: 4,
        title: 'Day 4: Bahubali Hills Sunrise | Karni Mata Temple | Udaipur Markets 🌄🚡🛍️',
        activities: [
          "Wake up early for a beautiful sunrise at Bahubali Hills.",
          "Return to the stay, freshen up and check out.",
          "Visit Karni Mata Temple and enjoy panoramic city views via the ropeway.",
          "Explore Hathipole and Bada Bazaar for shopping and local street food.",
          "In the evening, board your train back to Mumbai (Train: 22902 – Udz Bdts Sf Exp).",
          "Meals: Breakfast."
        ]
      },
      {
        id: 'udaipur-ny-day-5',
        day: 5,
        title: 'Day 5: Back to Mumbai 🏠✨',
        activities: [
          "Arrive back in Mumbai with new memories, countless photographs and a new travel tribe.",
          "Meals: Not included."
        ]
      }
    ],
    inclusions: [
      "2 nights hotel stay on triple/quad sharing basis.",
      "Mumbai–Udaipur–Mumbai train journey by 3AC or Non-AC Sleeper, subject to confirmation/RAC.",
      "Internal transfers as per the itinerary.",
      "1 lunch + 2 breakfasts.",
      "Hathipole and Bada Bazaar market exploration.",
      "Karni Mata Temple cable car/ropeway.",
      "Bahubali Hill experience.",
      "Sajjangarh Monsoon Palace.",
      "Entry fees for City Palace, Bagore Ki Haveli, Saheliyon Ki Bari, Monsoon Palace and Karni Mata Temple ropeway charges.",
      "Trip Captain throughout the trip."
    ],
    exclusions: [
      "Train meals, lunch and dinner except the meals specifically mentioned in inclusions.",
      "Water bottles.",
      "Driver tips and personal expenses.",
      "Monument/entry charges not mentioned under inclusions.",
      "Camera/video charges, laundry and telephone expenses.",
      "Additional railway/train food costs.",
      "Tatkal charges, if applicable.",
      "5% GST.",
      "Additional activities such as boating at Fateh Sagar Lake or Lake Pichola.",
      "Costs arising from roadblocks, landslides, climate changes or other unavoidable circumstances.",
      "Anything not specifically mentioned under inclusions."
    ],
    thingsToCarry: [
      "Valid Government Photo ID for all members (Aadhaar / Driving License / Passport) — Mandatory",
      "Comfortable walking / trekking shoes and casual footwear",
      "Comfortable cotton clothing and smart casuals for photography",
      "Light sweater or jacket for cooler evenings / early mornings",
      "Sun protection: Sunscreen (SPF 50+), sunglasses, and wide cap/hat",
      "Personal medications, basic first-aid, ORS / Glucose",
      "Power bank, camera, and charging cables",
      "Reusable water bottle"
    ],
    policies: [
      "The itinerary is planned as a Mumbai-to-Mumbai group trip with approximately 20 travellers.",
      "Boating at Fateh Sagar Lake or Lake Pichola is an additional activity and is not included.",
      "Carry a valid government-issued photo ID matching the details submitted during booking.",
      "Train berth/seat preferences and group seating are subject to Indian Railways allocation.",
      "Book at least 30 days before departure for better chances of confirmed train tickets.",
      "The Trip Leader may modify or skip sightseeing in case of emergencies, unforeseen situations or inappropriate participant behaviour.",
      "Triple-sharing rooms include an extra mattress, not an additional bed.",
      "Delays caused by participants may result in cancellation of subsequent sightseeing.",
      "Participants are expected to cooperate and follow the group schedule.",
      "No refund is provided for no-shows or unused portions of the trip.",
      "Hotel rules apply to alcohol consumption.",
      "Valid government photo ID is mandatory.",
      "Vehicles are provided strictly as per the itinerary and are not available for personal use.",
      "Travellers are responsible for their own luggage and belongings.",
      "Sightseeing may be affected by public holidays, festivals or closures.",
      "Travel Tribes does not provide travel insurance.",
      "Water and electricity availability may vary.",
      "Do not expect luxury facilities on a backpacking/group trip.",
      "Transportation may vary depending on the final group size.",
      "Participants must accept normal road, vehicle and nature-related travel risks.",
      "AC may not be available in vehicles operating in hilly regions.",
      "Third-party vehicle breakdowns may cause operational delays.",
      "Bus/train halts and transportation schedules may be predefined.",
      "Photos/videos taken during the trip may be used by Travel Tribes for marketing purposes.",
      "Booking starts with ₹4,000/-.",
      "Cancellation 10–30 days before departure: 25% deduction on remaining balance.",
      "Cancellation 8–10 days before departure: 50% deduction on remaining balance.",
      "Cancellation 6–8 days before departure: 70% deduction on remaining balance.",
      "Cancellation 3–6 days before departure: 90% deduction on remaining balance.",
      "Cancellation less than 2 days before departure / No-show: 100% deduction (No refund for unused services).",
      "Cancellation by Travel Tribes: If the trip is cancelled by the operator, the booking/advance amount will be fully refundable within 4–7 business days."
    ],
    pricingOptions: [
      { label: 'Mumbai to Mumbai (Non-AC Sleeper Train)', price: '₹11,999 / person + 5% GST' },
      { label: 'Mumbai to Mumbai (3-Tier AC Train)', price: '₹13,999 / person + 5% GST' },
      { label: 'Double Sharing Add-On', price: '+₹1,500 / person + 5% GST' }
    ],
    bookingAmount: '₹4,000 / person',
    reviews: [
      {
        name: 'Anushree',
        detail: 'Girls Trip',
        rating: 5,
        quote: 'Superb experience!!! We went to Udaipur for the New Year celebration with Travel Tribes. The hosts made us feel so much at home. Lakeside party and fireworks were unforgettable!'
      },
      {
        name: 'Mansi Sinha',
        rating: 5,
        quote: 'One of the best travel experiences I’ve had! What I loved most was how flexible and thoughtfully planned the itinerary was. Sunrise at Bahubali Hills and sunset at Monsoon Palace were magical.'
      },
      {
        name: 'Kajal Rambhia',
        detail: 'Solo Traveller',
        rating: 5,
        quote: 'Travelled solo for the Udaipur festive batch. Safe, comfortable, and made friends for life. Tribe hai to vibe hai!'
      }
    ]
  },
  {
    id: 'spiti-valley-chandrataal',
    slug: 'spiti-valley-chandrataal',
    title: 'Spiti Valley with Chandrataal — Trip from Delhi',
    location: 'Spiti Valley · Chandrataal · Manali · Chitkul · Tabo · Kaza',
    region: 'Domestic',
    date: 'Jun 12–20, 2027',
    duration: '8N/9D',
    price: '₹18,999',
    image: '/Card Image/Spiti_with_chandrataal.png',
    alt: 'High-altitude Himalayan desert and snow peaks of Spiti Valley',
    tag: 'Himalayan Expedition',
    description: 'Looking for a Spiti Valley trip from Delhi, a Spiti backpacking trip, or an unforgettable Spiti Valley group trip? Travel Tribes takes you on an epic Himalayan road trip through Shimla, Chitkul, Tabo, Dhankar, Kaza, Langza, Hikkim, Komic, Kibber, Chicham Bridge, Chandrataal and Manali. From the remote landscapes of Chitkul to the ancient Tabo Monastery, dramatic Dhankar Monastery, high-altitude villages of Langza, Hikkim and Komic, and the breathtaking Chandrataal Lake, this is a journey through some of the most incredible landscapes of Himachal Pradesh. Come solo. Meet strangers. Explore Spiti. Leave with a tribe.',
    spots: '5 spots left',
    gallery: [
      { image: "/image/Spiti/spiti_img.JPEG", alt: "Spiti Valley" },
      { image: "/image/Spiti/20241021_181120_D69BC4.jpeg", alt: "Spiti Valley" },
      { image: "/image/Spiti/20250110_154507_844C81.jpeg", alt: "Spiti Valley" },
      { image: "/image/Spiti/20250110_161941_8E27C2.jpeg", alt: "Spiti Valley" },
      { image: "/image/Spiti/666e3045-652e-4876-8084-cd2111d6c349_Original.JPEG", alt: "Spiti Valley" },
      { image: "/image/Spiti/IMG_4993.JPEG", alt: "Spiti Valley" },
      { image: "/image/Spiti/IMG_5129.JPEG", alt: "Spiti Valley" },
      { image: "/image/Spiti/IMG_5453_Original.JPEG", alt: "Spiti Valley" },
      { image: "/image/Spiti/IMG_5483.jpg", alt: "Spiti Valley" },
      { image: "/image/Spiti/IMG_7185.JPEG", alt: "Spiti Valley" }
    ],
    highlights: [
      "🏔️ Explore the spectacular Spiti Valley",
      "🏡 Visit Chitkul — the last inhabited village before the Indo-China border",
      "🍜 Enjoy Pahadon Wali Maggi by the Baspa River",
      "🛕 Explore the ancient Tabo Monastery",
      "⛰️ Discover the mysterious ancient caves of Tabo",
      "🏰 Visit the cliffside Dhankar Monastery",
      "🏯 Explore the iconic Key Monastery",
      "🌉 Cross Chicham Bridge — Asia's Highest Bridge",
      "📮 Send postcards from Hikkim — the world's highest post office",
      "🏔️ Visit Komic — one of the world's highest villages",
      "🗿 Explore Langza — India's fossil village",
      "🐆 Spot snow leopards around Kibber Village (sighting subject to luck and season)",
      "🌊 Experience the breathtaking Chandrataal Lake",
      "⛺ Camp at Chandrataal under the Himalayan night sky",
      "☕ Explore the cafés and vibe of Old Manali",
      "👥 Meet fellow travellers through the Travel Tribes community"
    ],
    itinerary: [
      {
        id: 'spiti-chandrataal-day-1',
        day: 1,
        title: 'DAY 1 — Delhi to Shimla | The Journey Begins 🚍',
        activities: [
          "The Journey Begins",
          "Meet your fellow travellers in Delhi.",
          "We will take our bus for Shimla at Kashmiri Gate / R K Ashram.",
          "Our exciting journey to Shimla begins at 8 PM.",
          "Get ready to board our Semi Sleeper AC Volvo bus for an overnight ride to the journey.",
          "Get comfortable, meet your fellow travellers and get ready for an epic Himalayan adventure.",
          "Meals: Not Included"
        ]
      },
      {
        id: 'spiti-chandrataal-day-2',
        day: 2,
        title: 'DAY 2 — Shimla to Chitkul | The Last Inhabited Village 🏡',
        activities: [
          "As the first light of day breaks, we'll arrive in Shimla, and the real adventure begins!",
          "Hit the road as we journey from Shimla to the mystical Chitkul.",
          "Follow the Sutlej River, taking a thrilling right turn towards Chitkul along the mesmerizing Baspa River.",
          "Chitkul, the last inhabited village before the Indo-China border, awaits us.",
          "Explore the beautiful surroundings of this remote Himalayan village.",
          "Enjoy the peaceful mountain atmosphere and breathtaking landscapes.",
          "Overnight stay and dinner in the quaint village of Chitkul.",
          "Meals: Dinner"
        ]
      },
      {
        id: 'spiti-chandrataal-day-3',
        day: 3,
        title: 'DAY 3 — Chitkul to Tabo | Entering Spiti 🏔️',
        activities: [
          "Wake up in Chitkul and savor the flavors of 'pahadon wali maggi' by the serene Baspa River.",
          "If time allows, we'll venture into a nearby Sangla village in the captivating Kinnaur Valley.",
          "Continue our journey towards Tabo in Spiti.",
          "Enjoy the changing landscapes as we enter the dramatic terrain of Spiti Valley.",
          "Prepare for an overnight stay in Tabo, where history and mystique await your exploration.",
          "Meals: Breakfast & Dinner"
        ]
      },
      {
        id: 'spiti-chandrataal-day-4',
        day: 4,
        title: 'DAY 4 — Tabo to Kaza via Dhankar 🛕',
        activities: [
          "Have a homely cooked breakfast and start your day.",
          "Today, we dive into the village's soul, exploring its ancient caves.",
          "Visit the awe-inspiring Tabo Monastery.",
          "Explore the ancient surroundings and experience the history and spiritual atmosphere of Tabo.",
          "Our journey then takes us to the ancient Dhankar Monastery.",
          "Admire the dramatic cliffside setting and breathtaking Himalayan views.",
          "Continue towards Kaza, the heart of Spiti Valley.",
          "Reach Kaza and settle into your stay.",
          "Spend the night in Kaza.",
          "Meals: Breakfast & Dinner"
        ]
      },
      {
        id: 'spiti-chandrataal-day-5',
        day: 5,
        title: 'DAY 5 — Kaza, Langza, Hikkim & Komic 📮🏔️',
        activities: [
          "After breakfast, explore the highlights of Spiti Valley.",
          "Visit the iconic Key Monastery.",
          "Cross Chicham Bridge, known as Asia's Highest Bridge.",
          "Head towards Hikkim, home to the world's highest post office.",
          "Send postcards from Hikkim and create a unique travel memory.",
          "Continue towards Komic, one of the world's highest villages.",
          "Explore Langza, known for its iconic Buddha Statue and breathtaking mountain views.",
          "Langza is also famous as India's fossil village.",
          "Take in the dramatic Himalayan landscapes surrounding these high-altitude villages.",
          "Return to Kaza by evening.",
          "Have dinner and enjoy an overnight stay in Kaza.",
          "Meals: Breakfast & Dinner"
        ]
      },
      {
        id: 'spiti-chandrataal-day-6',
        day: 6,
        title: 'DAY 6 — Kaza to Chandrataal | Starlit Camping ⛺🌌',
        activities: [
          "After breakfast and check-out, drive towards the mesmerizing Chandrataal Lake.",
          "En route, take a short halt at Losar, the last village of Spiti Valley.",
          "Continue your scenic drive through the incredible Himalayan landscape.",
          "Reach the Chandrataal campsite by evening.",
          "Check in to your shared tents.",
          "Soak in the serene beauty of the Himalayas.",
          "Spend time experiencing the peaceful surroundings of Chandrataal.",
          "Enjoy dinner under a starlit sky.",
          "End the day with an unforgettable overnight camping experience at Chandrataal.",
          "Meals: Breakfast & Dinner"
        ]
      },
      {
        id: 'spiti-chandrataal-day-7',
        day: 7,
        title: 'DAY 7 — Chandrataal to Manali 🌲🚗',
        activities: [
          "Enjoy an early breakfast.",
          "Depart for Manali on a scenic drive through the majestic Himalayas.",
          "Experience the changing landscapes as you leave the high-altitude desert of Spiti behind.",
          "Upon arrival in Manali, check in to your hotel and relax.",
          "In the evening, explore the charming cafés and vibrant atmosphere of Old Manali at your own pace.",
          "Enjoy some free time to explore the cafés, streets and local vibe.",
          "Return to the hotel for dinner and an overnight stay.",
          "Meals: Breakfast & Dinner"
        ]
      },
      {
        id: 'spiti-chandrataal-day-8',
        day: 8,
        title: 'DAY 8 — Manali Exploration & Departure to Delhi 🛍️🚍',
        activities: [
          "Hadimba Temple • Mall Road • Old Manali • Overnight Journey",
          "Wake up to beautiful sunrise views.",
          "Enjoy a relaxed morning in Manali.",
          "Visit the famous Hadimba Devi Temple.",
          "Stroll through the bustling Mall Road.",
          "Explore the charming lanes and cafés of Old Manali.",
          "Spend the day at leisure before departing for Delhi in the evening.",
          "Enjoy an overnight journey with unforgettable memories of the Himalayas.",
          "Meals: Breakfast"
        ]
      },
      {
        id: 'spiti-chandrataal-day-9',
        day: 9,
        title: 'DAY 9 — Back to Delhi 🏠',
        activities: [
          "Reach Delhi after your overnight journey.",
          "Return home with cherished memories of the Spiti Valley and Chandrataal adventure.",
          "Carry back countless pictures, stories and memories from the Himalayas.",
          "Say goodbye to your fellow travellers and your new tribe.",
          "Meals: Not Included"
        ]
      }
    ],
    inclusions: [
      "Delhi to Shimla: Semi Sleeper Volvo",
      "Shimla to Kaza to Manali: Tempo Traveller",
      "Manali to Delhi: Volvo",
      "Accommodation 6 Nights Stay: 01 Night Hotel at Chitkul / Sangla, 01 Night Homestay at Tabo, 02 Nights Homestay at Kaza, 01 Night Camp at Chandrataal, 01 Night Hotel at Manali",
      "Meals: 6 Breakfasts, 6 Dinners",
      "Trip Captain throughout the trip"
    ],
    exclusions: [
      "Any food or beverage not included in the package, including alcoholic drinks, mineral water, meals / refreshments / lunches on the highway",
      "Tip to the driver",
      "Entry to monuments",
      "Laundry, Telephone bills, room heater",
      "Any cost arising due to natural calamities such as landslides, roadblocks, other unforeseen circumstances",
      "Any expenses in Delhi such as fresh-up, food, stay",
      "Anything not specifically mentioned under inclusions",
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
      "The trip leader has the right to discard, skip or alter sightseeing/itinerary in case of an emergency, act of God or unfavorable participant behavior.",
      "In triple-sharing rooms, an extra mattress is provided and should not be confused with an extra bed.",
      "Delays by participants at particular sightseeing locations may result in cancellation of further sightseeing.",
      "Participants should coordinate, remain disciplined and align together as a team.",
      "No refund is provided if a participant doesn't show up on the day of the event.",
      "Alcohol consumption and serving in hotels/rooms are subject to the respective hotel's rules.",
      "A valid photo ID is mandatory for all members staying at the hotel.",
      "Itineraries might change slightly on public holidays/festivals.",
      "Vehicles are provided exclusively as per the itinerary on a point-to-point basis and are not available for personal use.",
      "Travellers are responsible for their luggage and belongings.",
      "Travel Tribes is not liable if sightseeing is closed due to special occasions, public holidays, long weekends or festivals.",
      "Travel insurance is not provided for sickness, accidents, theft or other losses.",
      "Water and electricity scarcity can occur in hilly areas. Some hotels may have fixed schedules for hot and cold water.",
      "Please do not expect luxury facilities and cooperate with fellow participants.",
      "Transportation and logistics may vary depending on group size — 7-seater Sumo, 11-seater Tempo Traveller or 20-seater Bus.",
      "Travel Tribes strictly stands against any form of harassment.",
      "Participants accept road, vehicle and nature-related risks associated with the trip.",
      "AC may not be available in Tempo Traveller, Innova, Xylo, Scorpio or similar vehicles in hilly regions.",
      "Third-party buses may experience breakdowns and replacement arrangements may take some time.",
      "Bus halts for lunch/dinner are predefined by the vendor.",
      "Refund will be done only in case of cancellation of the plan by the company/organizers or if the plan is postponed.",
      "By joining the trip, you give consent and authority to Travel Tribes to use clicked pictures/videos for social media, marketing or other media purposes.",
      "Booking/Advance Amount: The booking amount is non-refundable if the traveller cancels the trip. If the traveller cancels, the booking amount can be transferred to another person or used as Travel Tribes credit within 3 months.",
      "Cancellation 10–30 days before departure: 25% deduction on remaining balance.",
      "Cancellation 8–10 days before departure: 50% deduction on remaining balance.",
      "Cancellation 6–8 days before departure: 70% deduction on remaining balance.",
      "Cancellation 3–6 days before departure: 90% deduction on remaining balance.",
      "Cancellation less than 2 days before departure / No-show: 100% deduction (No refund for unused services).",
      "Cancellation by Travel Tribes: If the trip is cancelled by the operator, the booking/advance amount will be fully refundable within 4–7 business days. Rescheduling or travel credit may also be offered."
    ],
    pricingOptions: [
      { label: 'Triple Sharing (Delhi to Delhi)', price: '₹18,999 + 5% GST' },
      { label: 'Double Sharing (Delhi to Delhi)', price: '₹21,999 + 5% GST' }
    ],
    bookingAmount: '₹5,000 / person'
  },
  {
    id: 'spiti-winter-expedition',
    slug: 'spiti-winter-expedition',
    title: 'Spiti Valley Winter Expedition from Delhi',
    location: 'Chitkul · Tabo · Kaza · Langza · Hikkim · Komic · Key Monastery · Chicham · Kibber · Kalpa',
    region: 'Domestic',
    date: 'Jan 16–24, 2027',
    duration: '8N/9D',
    price: '₹18,999',
    image: '/Card Image/winter_spiti.png',
    alt: 'Snow-covered winter wonderland of Spiti Valley and Key Monastery in white',
    tag: 'Winter Expedition',
    description: "Snow-covered mountains, frozen landscapes, remote Himalayan villages, ancient monasteries and some of the most dramatic roads in Himachal Pradesh — welcome to the Spiti Valley Winter Expedition. Travel from Delhi to Spiti Valley with Travel Tribes and explore the cold desert landscape of the Himalayas with a group of fellow travellers. From Chitkul, the last inhabited village before the Indo-China border, to the ancient Tabo Monastery, high-altitude villages of Hikkim, Komic and Langza, the iconic Key Monastery, Chicham Bridge, Kibber Village and the stunning landscapes of Kalpa, this is a true winter Himalayan adventure. This is more than a Spiti Valley trip from Delhi — it's an expedition through some of the most remote and beautiful corners of Himachal. Come solo. Meet strangers. Explore Spiti. Leave with a tribe.",
    spots: '4 spots left',
    gallery: [
      { image: "/image/Spiti/spiti_img.JPEG", alt: "Spiti Winter Expedition" },
      { image: "/image/Spiti/20250110_154329_88A2CE.jpeg", alt: "Spiti Winter Expedition" },
      { image: "/image/Spiti/20250110_154841_8079AD.jpeg", alt: "Spiti Winter Expedition" },
      { image: "/image/Spiti/20250110_161203_82E076.jpeg", alt: "Spiti Winter Expedition" },
      { image: "/image/Spiti/20250110_162802_88500D.jpeg", alt: "Spiti Winter Expedition" },
      { image: "/image/Spiti/41f1d386-870b-46d5-8436-ade3caac5c64.jpg", alt: "Spiti Winter Expedition" },
      { image: "/image/Spiti/IMG_5120.JPEG", alt: "Spiti Winter Expedition" },
      { image: "/image/Spiti/IMG_5385.JPEG", alt: "Spiti Winter Expedition" },
      { image: "/image/Spiti/IMG_5565.jpg", alt: "Spiti Winter Expedition" },
      { image: "/image/Spiti/IMG_7218.JPEG", alt: "Spiti Winter Expedition" }
    ],
    highlights: [
      "🏔️ Explore Chitkul — the last inhabited village before the Indo-China border",
      "🍜 Enjoy Maggi by the Baspa River",
      "🛕 Explore 1,025-year-old Tabo Monastery",
      "⛰️ Explore the ancient caves of Tabo",
      "🏰 Visit the cliffside Dhankar Monastery",
      "📮 Send postcards from Hikkim — the world's highest post office",
      "🏔️ Visit Komic — the world's highest village",
      "🗿 Explore Langza — India's fossil village",
      "🏯 Visit Key Monastery, dating back to the 11th century",
      "🌉 Cross Chicham Bridge — Asia's Highest Bridge",
      "🐆 Explore Kibber Village, famous for snow leopard sightings",
      "🌄 Experience Kalpa and its stunning views",
      "📸 Capture memories at Suicide Point in Kalpa"
    ],
    itinerary: [
      {
        id: 'spiti-winter-day-1',
        day: 1,
        title: 'DAY 1 — DELHI TO SHIMLA | The Journey Begins 🚍',
        activities: [
          "We will take our bus for Shimla at Kashmiri Gate / R K Ashram.",
          "Our exciting journey to Shimla begins at 8 PM.",
          "Get ready to board our semi-sleeper AC Volvo bus for an overnight ride to the enchanting journey.",
          "Get comfortable, meet your fellow travellers and get ready for an exciting Himalayan adventure.",
          "Meetup & Ice Breaking games session",
          "Meals: Not Included."
        ]
      },
      {
        id: 'spiti-winter-day-2',
        day: 2,
        title: 'DAY 2 — SHIMLA TO CHITKUL 🏡',
        activities: [
          "As the first light of day breaks, we'll arrive in Shimla, and the real adventure begins!",
          "Hit the road as we journey from Shimla to the mystical Chitkul.",
          "Follow the Sutlej River, taking a thrilling right turn towards Chitkul along the mesmerizing Baspa River.",
          "Chitkul, the last inhabited village before the Indo-China border, awaits us for an unforgettable overnight stay.",
          "Enjoy dinner in the quaint village of Chitkul.",
          "Meals: Breakfast & Dinner."
        ]
      },
      {
        id: 'spiti-winter-day-3',
        day: 3,
        title: 'DAY 3 — CHITKUL TO TABO 🏔️',
        activities: [
          "After breakfast we will go to explore the Chitkul village.",
          "You can also trek down to the riverside or enjoy some Maggi at the last dhaba of India.",
          "We will then move towards Tabo.",
          "On the way, halt at the Khab Sangam, the confluence of Sutlej and Spiti River.",
          "We will be staying in a homestay in Tabo where you can enjoy a home-cooked meal.",
          "Meals: Breakfast & Dinner."
        ]
      },
      {
        id: 'spiti-winter-day-4',
        day: 4,
        title: 'DAY 4 — TABO TO KAZA VIA DHANKAR 🛕',
        activities: [
          "Tabo Monastery • Ancient Caves • Dhankar Monastery • Kaza",
          "Tabo, with its 1,025-year-old history, holds secrets waiting to be uncovered.",
          "Today, we dive into the village's soul, exploring its caves and the awe-inspiring Tabo Monastery.",
          "Our journey then takes us to the ancient Dhankar Monastery.",
          "Continue towards Kaza, the heart of Spiti.",
          "We will spend the following days exploring the spectacular landscapes and villages around Kaza.",
          "Meals: Breakfast & Dinner."
        ]
      },
      {
        id: 'spiti-winter-day-5',
        day: 5,
        title: 'DAY 5 — KAZA, LANGZA, HIKKIM & KOMIC 📮❄️',
        activities: [
          "After enjoying the delicious local breakfast at the homestay, get ready to explore the highest post office of the world in Hikkim.",
          "After posting a few letters to our loved ones, we'll then visit Komic Village, the world's highest village.",
          "Continue to Langza, the fossil village of India.",
          "Come back to Kaza by evening.",
          "Explore the Kaza market.",
          "Enjoy dinner at the stay.",
          "Meals: Breakfast & Dinner."
        ]
      },
      {
        id: 'spiti-winter-day-6',
        day: 6,
        title: 'DAY 6 — KEY MONASTERY TO CHICHAM 🏯🌉',
        activities: [
          "Prepare for awe-inspiring sights today as we visit the famous Key Monastery.",
          "Key Monastery is perched high on a mountain hill, with a history dating back to the 11th century.",
          "After Key, we'll cross the incredible Chicham Bridge, Asia's highest bridge.",
          "Our journey then takes us to Kibber Village, famous for its snow leopard spotting.",
          "Come back and enjoy some local home-cooked dinner.",
          "Meals: Breakfast & Dinner."
        ]
      },
      {
        id: 'spiti-winter-day-7',
        day: 7,
        title: 'DAY 7 — KAZA TO KALPA VIA GUE & NAKO 🏛️',
        activities: [
          "Today morning marks as our last day at Kaza.",
          "After an early breakfast, we move towards Kalpa via Gue.",
          "At Gue, visit the Gue Monastery and 500-year-old mummy.",
          "We will take a quick halt at Nako for lunch.",
          "Reach Kalpa and check into your hotel rooms.",
          "Enjoy your dinner and then rewind.",
          "Meals: Breakfast & Dinner."
        ]
      },
      {
        id: 'spiti-winter-day-8',
        day: 8,
        title: 'DAY 8 — KALPA TO SHIMLA & DEPARTURE 🌄🚍',
        activities: [
          "Wake up to the view of the magnificent Kinner Kailash Peak.",
          "Post breakfast, we will explore Kalpa.",
          "Visit nearby Suicide Point.",
          "Move towards Shimla to catch an evening bus to Delhi.",
          "Leave for Delhi in an overnight bus with loads of memories.",
          "Arrive Delhi on Sunday morning, cherishing the memories of an unforgettable journey.",
          "Meals: Breakfast."
        ]
      },
      {
        id: 'spiti-winter-day-9',
        day: 9,
        title: 'DAY 9 — BACK TO DELHI 🏠',
        activities: [
          "Reach Delhi after your overnight journey.",
          "Return home with cherished memories of the Winter Spiti Valley.",
          "Carry back countless pictures, stories and memories from the Himalayas.",
          "Say goodbye to your fellow travellers and your new tribe.",
          "Meals: Not Included."
        ]
      }
    ],
    inclusions: [
      "Stay for 6 nights: 01 night in hotel at Chitkul/Sangla, 01 night in homestay at Tabo, 03 nights in homestay at Kaza, 01 night in hotel in Kalpa",
      "Transportation: Delhi to Shimla Semi Sleeper Volvo, Shimla to Kaza to Shimla Tempo Traveller, Shimla to Delhi Volvo",
      "Meals: 6 Breakfasts & 6 Dinners",
      "Trip Captain throughout the trip",
      "Driver night charges, Toll Tax, Parking Charges"
    ],
    exclusions: [
      "5% GST",
      "Any kind of food or beverage that is not included in the package (alcoholic drinks, mineral water, meals, refreshments, lunches on the highway)",
      "Tip to the driver",
      "Entry to monuments",
      "Camera/video camera charges, Room Heater",
      "Laundry, Telephone bills",
      "Any cost arising due to natural calamities like landslides, roadblocks, other unavoidable circumstances",
      "Any expenses in Delhi such as stay, fresh-up, food",
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
      "The trip leader has the right to discard, skip or alter sightseeing/itinerary in case of an emergency, act of God or unfavorable participant behavior.",
      "In triple-sharing rooms, an extra mattress is provided and should not be confused with an extra bed.",
      "Delays by participants at particular sightseeing locations may result in cancellation of further sightseeing.",
      "Participants should coordinate, remain disciplined and align together as a team.",
      "No refund is provided if a participant doesn't show up on the day of the event.",
      "Alcohol consumption and serving in hotels/rooms are subject to the respective hotel's rules.",
      "A valid photo ID is mandatory for all members staying at the hotel.",
      "Itineraries might change slightly on public holidays/festivals.",
      "Vehicles are provided exclusively as per the itinerary on a point-to-point basis and are not available for personal use.",
      "Travellers are responsible for their luggage and belongings.",
      "Travel Tribes is not liable if sightseeing is closed due to special occasions, public holidays, long weekends or festivals.",
      "Travel insurance is not provided for sickness, accidents, theft or other losses.",
      "Water and electricity scarcity can occur in hilly areas. Some hotels may have fixed schedules for hot and cold water.",
      "Please do not expect luxury facilities and cooperate with fellow participants.",
      "Transportation and logistics may vary depending on group size — 7-seater Sumo, 11-seater Tempo Traveller or 20-seater Bus.",
      "Travel Tribes strictly stands against any form of harassment.",
      "Participants accept road, vehicle and nature-related risks associated with the trip.",
      "AC may not be available in Tempo Traveller, Innova, Xylo, Scorpio or similar vehicles in hilly regions.",
      "Third-party buses may experience breakdowns and replacement arrangements may take some time.",
      "Bus halts for lunch/dinner are predefined by the vendor.",
      "Refund will be done only in case of cancellation of the plan by the company/organizers or if the plan is postponed.",
      "By joining the trip, you give consent and authority to Travel Tribes to use clicked pictures/videos for social media, marketing or other media purposes.",
      "Booking/Advance Amount: The booking amount is non-refundable if the traveller cancels the trip. If the traveller cancels, the booking amount can be transferred to another person or used as Travel Tribes credit within 3 months.",
      "Cancellation 10–30 days before departure: 25% deduction on remaining balance.",
      "Cancellation 8–10 days before departure: 50% deduction on remaining balance.",
      "Cancellation 6–8 days before departure: 70% deduction on remaining balance.",
      "Cancellation 3–6 days before departure: 90% deduction on remaining balance.",
      "Cancellation less than 2 days before departure / No-show: 100% deduction (No refund for unused services).",
      "Cancellation by Travel Tribes: If the trip is cancelled by the operator, the booking/advance amount will be fully refundable within 4–7 business days. Rescheduling or travel credit may also be offered."
    ],
    pricingOptions: [
      { label: 'Triple Sharing (Delhi to Delhi)', price: '₹18,999 + 5% GST' },
      { label: 'Double Sharing (Delhi to Delhi)', price: '₹21,999 + 5% GST' }
    ],
    bookingAmount: '₹5,000 / person'
  },
  {
    id: 'jawai-leopard-safari',
    slug: 'jawai-leopard-safari',
    title: 'Jawai — The Land of Leopards',
    location: 'Jawai · Bera · Jawai Dam · Pali · Rajasthan',
    region: 'Domestic',
    date: 'Oct 02–05, 2026',
    dates: [
      'Oct 02–05, 2026 (Long Weekend)',
      'Oct 16–19, 2026',
      'Oct 30–Nov 02, 2026',
      'Nov 06–09, 2026 (Diwali / Long Weekend)',
      'Nov 20–23, 2026',
      'Dec 04–07, 2026',
      'Dec 18–21, 2026',
      'Dec 24–27, 2026 (Christmas Weekend)',
      'Dec 30–Jan 02, 2027 (New Year Special)'
    ],
    duration: '3N/4D',
    price: '₹11,499',
    image: img('photo-1456926631375-92c8ce872def'),
    alt: 'Wild Leopard on Granite Hills in Jawai Rajasthan',
    tag: 'Wildlife & Leopard Safari',
    description: 'Experience Jawai, the Land of Leopards, with Travel Tribes on a 3N/4D experiential wildlife trip from Mumbai. Go beyond a regular weekend getaway with two Jeep safaris — a dramatic sunset leopard safari and an early-morning sunrise safari — while exploring the rugged Jawai landscape, Jawai Dam and its crocodile habitat. Add a wilderness stay, a Tribe Vibe evening with stories, music and new friends, and a scenic train journey from Mumbai to Mumbai. This Jawai leopard safari group trip is designed for travellers looking for wildlife, nature, adventure and meaningful travel experiences.',
    spots: '8 spots left',
    gallery: [
      { image: img('photo-1456926631375-92c8ce872def'), alt: 'Wild Leopard on Granite Rocks in Jawai' },
      { image: img('photo-1516426122078-c23e76319801'), alt: 'Jawai Open 4x4 Jeep Safari Experience' },
      { image: img('photo-1506744038136-46273834b3fb'), alt: 'Rugged Aravalli Granite Hills & Sunset Horizon' },
      { image: img('photo-1544644181-1484b3fdfc62'), alt: 'Scenic Jawai Dam Water Reservoir & Crocodiles' },
      { image: img('photo-1507525428034-b723cf961d3e'), alt: 'Wilderness Stay amidst Jawai Landscape' },
      { image: img('photo-1519671482749-fd09be7ccebf'), alt: 'Tribe Vibe Evening Music, Bonfire & Stories' }
    ],
    highlights: [
      "Sunset Leopard Safari through Jawai's rugged granite hills.",
      "Sunrise Leopard Safari at 4:00 AM tracking big cats in morning light.",
      "Explore the dramatic prehistoric Aravalli granite boulder landscape.",
      "Visit the scenic Jawai Dam reservoir and bird sanctuary.",
      "Experience wild crocodile spotting along Jawai Dam waters.",
      "Enjoy a lively Tribe Vibe session with stories, music, games and bonding.",
      "Stay at a curated wilderness resort amidst Jawai's nature.",
      "Compact 3N/4D experiential group trip curated for 18–40 year old travellers.",
      "Comfortable 3AC train journey from Mumbai to Mumbai."
    ],
    itinerary: [
      {
        id: 'jawai-day-1',
        day: 1,
        title: 'Day 1: Mumbai to Jawai | Overnight Train Journey 🚂✨',
        activities: [
          "Board your night train from Mumbai (Bandra Terminus / Borivali).",
          "Meet your fellow travellers, break the ice with group travel games, and get ready for the wilderness adventure ahead.",
          "Enjoy an overnight 3AC train journey towards Jawai Bandh.",
          "Meals: Not included."
        ]
      },
      {
        id: 'jawai-day-2',
        day: 2,
        title: 'Day 2: Jawai Bandh Arrival | Sunset Leopard Safari | Tribe Vibe 🐆🌅🔥',
        activities: [
          "Arrive at Jawai Bandh Railway Station around 10:00 AM.",
          "Transfer and check in to your stay amidst the wilderness. Freshen up and relax.",
          "Enjoy a delicious lunch at the stay.",
          "Head out for your first thrilling Open-Jeep Leopard Safari at 3:00 PM.",
          "Traverse Jawai’s rugged granite hills and caves while tracking wild leopards with expert local trackers.",
          "Capture breathtaking sunset vistas over the granite rocks.",
          "Return to the resort around 7:00 PM and enjoy a warm, delicious dinner.",
          "End the night with a signature Tribe Vibe session featuring stories, music, dance and getting to know fellow travellers.",
          "Overnight stay in Jawai.",
          "Meals: Breakfast, Lunch and Dinner."
        ]
      },
      {
        id: 'jawai-day-3',
        day: 3,
        title: 'Day 3: Sunrise Safari | Jawai Dam | Crocodile Spotting | Return Journey 🌄🐊🚂',
        activities: [
          "Wake up early for an exhilarating 4:00 AM Sunrise Leopard Safari.",
          "Witness the wilderness awakening in early morning golden light and track big cats returning from nocturnal hunts.",
          "Return around 8:00 AM for a hot breakfast and check out.",
          "Head out to explore the scenic Jawai Dam.",
          "Enjoy wild crocodile and migratory bird spotting along the dam backwaters.",
          "Have lunch before beginning your return journey towards Jawai Bandh Railway Station.",
          "Board the 5:00 PM train back towards Mumbai.",
          "Overnight train journey to Mumbai.",
          "Meals: Breakfast."
        ]
      },
      {
        id: 'jawai-day-4',
        day: 4,
        title: 'Day 4: Back to Mumbai 🏠✨',
        activities: [
          "Arrive back in Mumbai early morning.",
          "Conclude an action-packed wilderness getaway with thrilling leopard sightings, unforgettable memories, and lifelong friendships from your travel tribe!",
          "Meals: Not included."
        ]
      }
    ],
    inclusions: [
      "3AC-class train travel from Mumbai to Mumbai and back (Confirmed / RAC basis).",
      "All internal transfers and sightseeing as per the itinerary in private vehicles.",
      "1-Night stay amidst the wilderness in Jawai on triple sharing basis.",
      "2 Jeep safaris — one sunset safari and one sunrise safari.",
      "Jawai Dam visit and crocodile spotting.",
      "All forest permits and entry fees.",
      "4 Meals: 2 Breakfasts, 1 Lunch, 1 Dinner.",
      "Travel Tribes Trip Captain / Local Wildlife Guide assistance throughout the trip."
    ],
    exclusions: [
      "5% GST.",
      "Meals not specifically mentioned in the inclusions (train food, Day 3 lunch/dinner).",
      "Personal expenses such as beverages, bottled water, and shopping.",
      "Optional activities or additional safaris beyond the 2 included.",
      "Camera/video equipment charges, if applicable.",
      "Costs arising from natural calamities, delays or unforeseen circumstances.",
      "Anything not specifically mentioned under inclusions."
    ],
    policies: [
      "Regular Price: Ex-Mumbai 3AC ₹11,499/- per person + 5% GST.",
      "Booking Amount: ₹4,000/- per person advance to confirm your seat.",
      "Book at least 30 days before departure for better chances of confirmed 3AC train tickets.",
      "Train tickets are subject to availability and may be Confirmed/RAC.",
      "A valid government-issued photo ID is mandatory for hotel stay.",
      "The trip includes only 2 Jeep safaris; additional safaris are not included.",
      "Wildlife sightings, including leopard sightings, are subject to natural conditions and cannot be guaranteed.",
      "The 4:00 AM safari requires an early start, so travellers should be prepared for the schedule.",
      "Safari timings and sightseeing may be modified in case of emergencies or unforeseen circumstances.",
      "Accommodation is on triple sharing, with an extra mattress provided rather than an additional bed.",
      "Transportation and vehicle type may vary depending on group size.",
      "No refund will be provided in case of a no-show.",
      "Participants are expected to coordinate with the group and follow the trip schedule.",
      "Cancellation Policy: Initial booking amount is non-refundable. Cancellation 30+ days before departure: 50% trip cost charged as cancellation fee | 15–30 days before departure: 75% cancellation fee | 0–15 days before departure: 100% cancellation fee."
    ],
    pricingOptions: [
      { label: 'Ex-Mumbai (3AC Train + Safari Package)', price: '₹11,499 / person' },
      { label: 'Booking Advance', price: '₹4,000 / person' },
      { label: 'Long Weekend / Festive Batch Special', price: '₹12,499 / person', note: 'Applicable on Diwali, Xmas & New Year batches' }
    ],
    bookingAmount: '₹4,000 / person',
    reviews: [
      {
        name: 'Siddharth Mehta',
        role: 'Verified Traveller',
        detail: 'Jawai Leopard Safari Trip',
        rating: 5,
        quote: 'Spotting two leopards on the granite rocks during the sunset safari was surreal! The 4 AM morning safari was thrilling too. The wilderness resort and campfire vibe made this the ultimate Mumbai weekend trip.'
      },
      {
        name: 'Prachi Shah',
        role: 'Verified Traveller',
        detail: 'Jawai Wildlife Expedition',
        rating: 5,
        quote: 'Travelled solo from Mumbai by 3AC train and felt completely safe and welcomed. The Jawai Dam crocodile spotting was amazing and the group bonding was top tier. Tribe hai to vibe hai!'
      },
      {
        name: 'Harsh Vardhan',
        role: 'Local Guide',
        reviewCount: '15 reviews',
        photoCount: '48 photos',
        detail: 'Jawai Experiential Tour',
        rating: 5,
        quote: 'Incredible big cat tracking! Our local safari drivers knew exactly where the leopards hide in the cave crevices. Everything from train tickets to food and stay was well coordinated.'
      }
    ]
  }
]

export const primaryNavItems = [
  { label: 'Upcoming trips', href: '/upcoming-trips' },
  { label: 'Domestic', href: '/domestic-trips' },
  { label: 'International', href: '/international-trips' },
  { label: 'Why Us', href: '/why-us' },
  { label: 'About us', href: '/about' }
]

export const subNavItems = [
  { label: 'Weekend Getaways', href: '/weekend-getaways' },
  { label: 'Xmas & New Year', href: '/xmas-new-year-trips', badge: 'Festive' },
  { label: 'Corporate Trips', href: '/corporate-trips' }
]

export const navItems = primaryNavItems

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
  { image: '/image/Hampi/IMG_9698.JPEG', alt: 'Travel Tribes Hampi', title: '', location: '', widthClass: 'w-[300px] sm:w-[360px]' },
  { image: '/image/Meghalaya/IMG_0857.JPEG', alt: 'Travel Tribes Meghalaya', title: '', location: '', widthClass: 'w-[420px] sm:w-[500px]' },
  { image: '/image/Gokarna/IMG_4170.JPG', alt: 'Travel Tribes Gokarna', title: '', location: '', widthClass: 'w-[360px] sm:w-[430px]' },
  { image: '/image/Coorg/IMG_5499.JPEG', alt: 'Travel Tribes Coorg', title: '', location: '', widthClass: 'w-[280px] sm:w-[330px]' },
  { image: '/image/Udaipur/IMG_4003.JPG', alt: 'Travel Tribes Udaipur', title: '', location: '', widthClass: 'w-[380px] sm:w-[460px]' },
  { image: '/image/Spiti/IMG_5483.jpg', alt: 'Travel Tribes Spiti', title: '', location: '', widthClass: 'w-[290px] sm:w-[350px]' },
  { image: '/image/Hampi/IMG_6658.JPG', alt: 'Travel Tribes Sunset', title: '', location: '', widthClass: 'w-[350px] sm:w-[420px]' },
]

export const galleryRow2: GalleryItem[] = [
  { image: '/image/Gokarna/1000004087.jpg', alt: 'Travel Tribes Gokarna Beach', title: '', location: '', widthClass: 'w-[330px] sm:w-[390px]' },
  { image: '/image/Meghalaya/IMG_1370.JPEG', alt: 'Travel Tribes Meghalaya Falls', title: '', location: '', widthClass: 'w-[440px] sm:w-[520px]' },
  { image: '/image/Coorg/IMG_7410.JPEG', alt: 'Travel Tribes Coorg Hills', title: '', location: '', widthClass: 'w-[370px] sm:w-[450px]' },
  { image: '/image/Udaipur/IMG_1667.JPG', alt: 'Travel Tribes Udaipur Palace', title: '', location: '', widthClass: 'w-[280px] sm:w-[340px]' },
  { image: '/image/Spiti/20250110_161941_8E27C2.jpeg', alt: 'Travel Tribes Spiti Valley', title: '', location: '', widthClass: 'w-[310px] sm:w-[370px]' },
  { image: '/image/Hampi/IMG_0438.JPEG', alt: 'Travel Tribes Hampi Stone Chariot', title: '', location: '', widthClass: 'w-[380px] sm:w-[460px]' },
  { image: '/image/Gokarna/IMG_8908_Original.JPEG', alt: 'Travel Tribes Gokarna Friends', title: '', location: '', widthClass: 'w-[340px] sm:w-[410px]' },
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
        const baseMatch = trip.price.match(/(\d[\d,]*)/)
        const baseNum = baseMatch ? parseInt(baseMatch[1].replace(/,/g, ''), 10) : 0
        const addMatch = festiveOpt.price.match(/(\d[\d,]*)/)
        const addNum = addMatch ? parseInt(addMatch[1].replace(/,/g, ''), 10) : 1000
        if (baseNum > 0) {
          festivePrice = `₹${(baseNum + addNum).toLocaleString('en-IN')}`
        }
      } else if (!festiveOpt.price.toLowerCase().includes('request')) {
        const optMatch = festiveOpt.price.match(/(\d[\d,]*)/)
        const optNum = optMatch ? parseInt(optMatch[1].replace(/,/g, ''), 10) : 0
        if (optNum > 0) {
          festivePrice = `₹${optNum.toLocaleString('en-IN')}`
        }
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
    id: 'join-trip-alone',
    question: 'Can I join a trip alone?',
    category: 'Solo Travel',
    answer: 'Absolutely. Most of our travellers join solo. You don’t need to know anyone before the trip — that’s kind of the point. You’ll meet your tribe along the way.'
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
  }
]

