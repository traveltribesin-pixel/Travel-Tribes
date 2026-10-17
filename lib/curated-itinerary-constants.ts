export type TripType = 'group' | 'customized'

export interface HotelDetail {
  id: string
  city: string
  hotelName: string
  nights: string
  roomType?: string
  starRating?: string
  amenities?: string[]
}

export interface CityStay {
  city: string
  nights: string
}

export interface BankAccountDetails {
  beneficiaryName: string
  bankName: string
  accountNumber: string
  ifscCode: string
  accountType: string
  upiId: string
  qrCodeUrl?: string
}

export interface TransportDetail {
  vehicleType: string
  pickupDrop: string
  includedFeatures: string[]
  note?: string
}

export interface DayItinerary {
  day: number
  title: string
  date?: string
  travelDistance?: string
  points?: string[]
  description?: string
  meals: string[]
  stayHotel?: string
  stayCity?: string
  stay: string
  image?: string
  photos?: string[]
  tags?: string[]
  note?: string
  briefRoute?: string
}

export interface LocationGlimpse {
  name: string
  image: string
}

export interface PricingQuotation {
  tripleSharingPrice?: number | string
  doubleSharingPrice?: number | string
  quadSharingPrice?: number | string
  xmasTripleSharingPrice?: number | string
  xmasDoubleSharingPrice?: number | string
  pricePerPerson?: number | string
  totalPackagePrice?: number | string
  numberOfGuests?: number | string
  advanceAmount?: number | string
  paymentTerms?: string
  validUntil?: string
}

export interface CuratedItinerary {
  id: string
  slug: string
  tripType: TripType
  title: string
  subtitle?: string
  destination: string
  duration: string
  routeText?: string
  bannerImage: string
  overview: string
  
  // Trip Summary fields (Page 2)
  cityWiseStay?: CityStay[]
  highlights: string[]
  highlightImages?: string[]
  locationGlimpses?: LocationGlimpse[]

  // Customized Trip Specific
  clientName?: string
  clientPhone?: string
  clientEmail?: string
  travelDates?: string
  groupVibe?: string

  // Group Trip Specific
  batchDates?: string[]
  departureCity?: string
  groupSizeLimit?: string
  tripCaptainIncluded?: boolean

  // Core Sections
  hotels: HotelDetail[]
  transport: TransportDetail
  days: DayItinerary[]
  inclusions: string[]
  exclusions: string[]
  quotation: PricingQuotation
  accountDetails?: BankAccountDetails

  // Guidelines & Policies
  pointsToBeNoted?: string[]
  whyTravelTribes?: { title: string; desc: string }[]
  policies?: {
    cancellation?: string[]
    thingsToCarry?: string[]
    paymentPolicy?: string[]
  }

  createdAt: string
  updatedAt: string
}

export const DEFAULT_BANK_ACCOUNT: BankAccountDetails = {
  beneficiaryName: 'TRAVEL TRIBES PRIVATE LIMITED',
  bankName: 'HDFC Bank Ltd.',
  accountNumber: '50200088912345',
  ifscCode: 'HDFC0001234',
  accountType: 'Current Account',
  upiId: 'traveltribes@icici'
}

export const DEFAULT_POINTS_TO_BE_NOTED: string[] = [
  'Book your trip before 30 days prior of the departure date to get confirm train/flight tickets.',
  'The trip leader has all the rights to discard, skip or alter the sightseeing/itinerary if an emergency occurs, act of God or over unfavorable behavior of participants.',
  'Triple Sharing Room: In triple-sharing rooms, an extra mattress is provided, but it should not be confused with an extra bed.',
  'Any delay in time at particular sightseeing by participants will result in cancellations of further sightseeing.',
  'Participants should coordinate, disciplined and align together as a team during the Trip.',
  'No refund will be provided if the participant doesn’t show up on the day of the event.',
  'Alcohol Consumption: The consumption and serving of alcohol in hotels/rooms are subject to the rules and regulations of the respective hotels.',
  'Though we assure safety as a top priority, Event Organizers are not responsible for any severe injuries or fatal events.',
  'Mandatory ID Requirement: As mandated by the Government, a valid photo ID for all members staying at the hotel is mandatory.',
  'Itineraries might change a bit on public holidays/festivals.',
  'Exclusive Vehicle Usage: The vehicle provided will be used exclusively as per the itinerary on a point-to-point basis and will not be available for personal use.',
  'Travelers must take care of their luggage & belongings. The management shall not be accountable for missing items along the tour.',
  'Due to any Special occasion/Public Holiday/long Weekend or Festivals, if any sightseeing will be close, Travel Tribes are not liable for that.',
  'We do not provide any insurance policy to cover the expenditure on sickness or accidents or losses incurred due to theft or other reasons.',
  'Water and Electricity Scarcity: In hilly areas, scarcity of water and electricity is a natural phenomenon. Some hotels have fixed schedules for supplying hot and cold water. Cooperation is appreciated despite the inconvenience caused.',
  'Please do not expect luxury facilities in remote hamlets and appreciate being cooperative with fellow Participants.',
  'Transportation and Logistics may vary depending on group size (Sumo, Tempo Traveller, Mini Bus) to ensure smooth travel operations.',
  'We understand and appreciate physical intimacies (handshakes, hugs, etc.) but not at the cost of someone else\'s discomfort. TRAVEL TRIBES strictly stands against any form of harassment.',
  'Individual who wishes to enroll in this plan must consume all Road, vehicle and nature related risks. The operating company/Trip leaders are not responsible for any harm/damage/loss of life.',
  'AC Availability: AC will not be available in vehicles in hilly regions due to steep gradients.',
  'Bus Breakdowns: In rare cases of vehicle breakdowns, on-ground replacements take standard operational time. Cooperation is required.',
  'Predefined Bus Halts: The halts for lunch/dinner are predefined by the vendor and cannot be changed arbitrarily for personal convenience.',
  'Refund will be done only in case of cancellation of plan from the company or organizers or if the plan is postponed.',
  'You give consent and authority to TRAVEL TRIBES to use clicked pictures / videos from the trip for social media and marketing. All trip media remains the property of TRAVEL TRIBES.'
]

export const DEFAULT_WHY_TRAVEL_TRIBES: { title: string; desc: string }[] = [
  {
    title: 'Community Travel',
    desc: 'Travel with like-minded people. Travelling with a new group of people will change your definition of travel, from strangers to what feels like family.'
  },
  {
    title: 'Budget Friendly',
    desc: 'Travel with us without hurting your pocket. No hidden costs, No extra surprise charges.'
  },
  {
    title: 'Trusted and Safest',
    desc: 'Safe for solo female travellers & trusted by 2000+ female Travellers across India.'
  },
  {
    title: 'Trip Captain / Trip Buddies',
    desc: 'We are a team of experienced individuals who prioritize loyalty, safety & customer satisfaction on every departure.'
  },
  {
    title: 'Group Size — 12 to 20',
    desc: 'Carefully curated group sizes ensuring personalized care, great team bonding, and zero overcrowding.'
  },
  {
    title: 'Age Group — 18 to 35',
    desc: 'Travel with a group of young, energetic travellers just like you, who are fun, adventurous, and easy to connect with.'
  },
  {
    title: 'Primarily for Solo Travelers & Friends',
    desc: 'With us, you can join solo without hesitating even if your friends back out. You may leave with strangers, but you return with a family.'
  }
]

export const MEGHALAYA_CANVA_SEED: CuratedItinerary = {
  id: 'canva-meghalaya-01',
  slug: 'meghalaya-backpacking-trip',
  tripType: 'group',
  title: 'MEGHALAYA',
  subtitle: 'BACKPACKING',
  destination: 'Meghalaya, Northeast India',
  duration: '5N/6D',
  routeText: 'Guwahati ➔ Shillong ➔ Cherrapunjee ➔ Dawki ➔ Guwahati',
  departureCity: 'Guwahati Airport / Station',
  groupSizeLimit: '12 to 20 Travellers (Age 18-35)',
  tripCaptainIncluded: true,
  bannerImage: '/image/Meghalaya/IMG_0857.JPEG',
  overview: 'Explore the Abode of Clouds with Travel Tribes. From crystal clear waters of Dawki and the majestic Nohkalikai Falls to the living root bridges of Nongriat and peaceful canyon sunsets.',
  
  // Page 2: Summary Breakdown
  cityWiseStay: [
    { city: 'Shillong', nights: '2 Nights' },
    { city: 'Cherrapunji', nights: '2 Nights' },
    { city: 'Dawki / Shnongpdeng', nights: '1 Night' }
  ],

  batchDates: [
    'Oct 02 – Oct 07, 2026 (Long Weekend)',
    'Oct 16 – Oct 21, 2026',
    'Nov 06 – Nov 11, 2026',
    'Dec 24 – Dec 29, 2026 (Christmas Special)',
    'Dec 29, 2026 – Jan 03, 2027 (New Year Special)'
  ],

  highlightImages: [
    '/image/Meghalaya/IMG_1033.JPEG',
    '/image/Meghalaya/IMG_1124.JPEG',
    '/image/Meghalaya/IMG_1192.JPEG'
  ],

  highlights: [
    'Witness the stunning Laitlum Canyons, known as the "end of the world".',
    'Trek to the 150-year-old Nongriat Double Decker Living Root Bridge & Rainbow Falls.',
    'Swim in the natural crystal-clear turquoise waters of Krang Suri & Phe Phe Falls.',
    'Experience the surreal glass-like transparent waters of Umngot River at Dawki.',
    'Stay in scenic riverside camps at Shnongpdeng with bonfire & acoustic vibes.',
    'Marvel at Nohkalikai Falls — India’s tallest plunge waterfall & Seven Sisters Falls.',
    'Explore the mysterious limestone formations of Mawsmai & Arwah Caves.',
    'Visit Mawlynnong Village, acclaimed as the cleanest village in Asia.',
    'Walk through Lady Hydari Park, Ward’s Lake & Police Bazaar in Shillong.',
    'Touch the India-Bangladesh International Border viewpoint at Tamabil.',
    'Scenic boat ride on the serene Umiam Lake (Barapani).',
    'Conclude the adventure with divine blessings at Maa Kamakhya Temple in Guwahati.'
  ],

  locationGlimpses: [
    { name: 'Umiam Lake', image: '/image/Meghalaya/IMG_1034.JPEG' },
    { name: 'Laitlum Canyons', image: '/image/Meghalaya/IMG_0884.JPEG' },
    { name: 'Double Decker Bridge', image: '/image/Meghalaya/IMG_0857.JPEG' },
    { name: 'Nohkalikai Falls', image: '/image/Meghalaya/IMG_1124.JPEG' },
    { name: 'Mawsmai Caves', image: '/image/Meghalaya/IMG_1250.JPEG' },
    { name: 'Rainbow Fall', image: '/image/Meghalaya/IMG_1156.JPEG' },
    { name: 'Umngot River', image: '/image/Meghalaya/IMG_1043.JPEG' },
    { name: 'Phe Phe Waterfall', image: '/image/Meghalaya/IMG_1192.JPEG' },
    { name: 'Wei Sawdong Falls', image: '/image/Meghalaya/IMG_0865.JPEG' },
    { name: 'Krang Suri Falls', image: '/image/Meghalaya/IMG_1048.JPEG' },
    { name: 'Mawlynnong Village', image: '/image/Meghalaya/IMG_1266.JPEG' },
    { name: 'Elephant Fall', image: '/image/Meghalaya/IMG_0974.JPEG' }
  ],

  // Section 4: Hotels Table
  hotels: [
    {
      id: 'h1',
      city: 'Shillong',
      hotelName: 'Hotel Polo Towers / Center Point',
      nights: '2 Nights (Night 1 & Night 5)',
      roomType: 'Deluxe Category Room with Breakfast',
      starRating: '3 Star Deluxe Hotel',
      amenities: ['Hot Water Geyser', 'Breakfast Buffet', 'Police Bazaar Proximity', 'Free WiFi', 'Room Service']
    },
    {
      id: 'h2',
      city: 'Cherrapunji (Sohra)',
      hotelName: 'Sohra Valley Eco Resort / Kutmadan Stay',
      nights: '2 Nights (Night 3 & Night 4)',
      roomType: 'Valley View Premium Room',
      starRating: 'Eco Boutique Resort',
      amenities: ['Private Balcony', 'Hot Water', 'Scenic Valley Views', 'In-house Restaurant', 'Bonfire Space']
    },
    {
      id: 'h3',
      city: 'Dawki / Shnongpdeng',
      hotelName: 'Riverside Swiss Camps & Cottages',
      nights: '1 Night (Night 2)',
      roomType: 'Riverside Tent with Bedding & Blankets',
      starRating: 'Riverside Campsite',
      amenities: ['Riverfront View', 'Hot Dinner Included', 'Bonfire & Music', 'Boating on Umngot River']
    }
  ],

  transport: {
    vehicleType: 'Tempo Traveller / Force Urbania / SUV (Dedicated Group Vehicle)',
    pickupDrop: 'Guwahati Airport / Railway Station Pickup & Drop Included',
    includedFeatures: [
      'Entire transportation as per itinerary on private basis',
      'Experienced local Meghalaya hill chauffeur',
      'All toll charges, parking fees, fuel & state permits',
      '30 minutes complimentary boating in Dawki River'
    ],
    note: 'Pick up and drop as per fixed timings (Airport arrival before 11:00 AM on Day 1).'
  },

  // Section 3: Day-Wise Detailed Itinerary
  days: [
    {
      day: 1,
      title: 'Arrival in Guwahati Transfer to Shillong',
      date: 'Day 1 | Departure Day',
      travelDistance: 'Approx. 120 km | ~4.5 Hours Scenic Hill Drive',
      points: [
        'Arrive at Guwahati Airport before 11:00 AM where our Trip Captain meets and greets you.',
        'The group departs for the Scotland of the East (Shillong) at 12:00 PM.',
        'Enjoy a scenic 4-hour drive climbing into the lush Khasi hills.',
        'Stop at the breathtaking Umiam Lake (Barapani) for waterside photography and tea.',
        'Arrive in Shillong by late afternoon and check in to the hotel.',
        'In the evening, stroll through vibrant Police Bazaar for local street food & souvenirs.',
        'Return to the hotel for an overnight stay in Shillong.'
      ],
      meals: ['Not Included'],
      stayHotel: 'Hotel Polo Towers / Center Point',
      stayCity: 'Shillong',
      stay: 'Hotel Polo Towers, Shillong',
      image: '/image/Meghalaya/IMG_1034.JPEG'
    },
    {
      day: 2,
      title: 'Shillong – Laitlum Canyons – Krang Suri – Phe Phe Falls – Dawki',
      date: 'Day 2',
      travelDistance: 'Approx. 95 km | ~3.5 Hours Scenic Drive',
      points: [
        'Enjoy a wholesome breakfast at the hotel and check out early.',
        'Head towards the dramatic Laitlum Canyons, often called the “End of the World”.',
        'Marvel at the breathtaking gorge views and sweeping mist-covered ridges.',
        'Drive towards Jowai to discover the paradise of Krang Suri Waterfall.',
        'Take a dip in the natural turquoise blue pool of Krang Suri (life jackets provided).',
        'Visit the fairytale two-tier Phe Phe Waterfall tucked inside pine forests.',
        'Continue down towards the Indo-Bangladesh border to Shnongpdeng (Dawki).',
        'Check in to your riverside swiss camps, enjoy a bonfire by the crystal river under the stars.'
      ],
      meals: ['Breakfast & Dinner'],
      stayHotel: 'Riverside Swiss Camps',
      stayCity: 'Dawki / Shnongpdeng',
      stay: 'Riverside Swiss Camps, Dawki',
      image: '/image/Meghalaya/IMG_1048.JPEG'
    },
    {
      day: 3,
      title: 'Dawki / Shnongpdeng – Mawlynnong – Cherrapunjee',
      date: 'Day 3',
      travelDistance: 'Approx. 85 km | ~3 Hours Scenic Drive',
      points: [
        'Wake up to the gentle sounds of the river and enjoy breakfast by the water.',
        'Experience the iconic boat ride on the crystal-clear waters of Umngot River where boats appear to float on air.',
        'Proceed towards Mawlynnong Village, acclaimed as the Cleanest Village in Asia.',
        'Walk through the manicured floral pathways and visit the ancient Single Decker Living Root Bridge.',
        'Stop by the Tamabil India-Bangladesh International Border viewpoint.',
        'Drive along the mist-laden ridges towards Cherrapunji (Sohra).',
        'Check in to your resort, relax, and soak in the evening mountain breeze.'
      ],
      meals: ['Breakfast'],
      stayHotel: 'Sohra Valley Eco Resort',
      stayCity: 'Cherrapunjee',
      stay: 'Sohra Valley Eco Resort, Cherrapunjee',
      image: '/image/Meghalaya/IMG_1043.JPEG'
    },
    {
      day: 4,
      title: 'Cherrapunjee – Double Decker Living Root Bridge – Blue Lagoon',
      date: 'Day 4',
      travelDistance: 'Approx. 35 km | ~6,600 Trekking Steps & Natural Trail',
      points: [
        'Energize with early breakfast and depart for Tyrna village base.',
        'Descend the Khasi steps through lush subtropical forests down to Nongriat valley.',
        'Witness the world-famous UNESCO bio-engineering marvel: Double Decker Living Root Bridge.',
        'Trek further to the natural wonder of Rainbow Falls and Blue Lagoon natural pool.',
        'Dip your feet in the crystal mineral waters and enjoy natural fish therapy.',
        'Begin the rewarding climb back to Tyrna with your local Khasi guide and Trip Captain.',
        'Return to Cherrapunjee for a well-deserved hot dinner and deep rest.'
      ],
      meals: ['Breakfast'],
      stayHotel: 'Sohra Valley Eco Resort',
      stayCity: 'Cherrapunjee',
      stay: 'Sohra Valley Eco Resort, Cherrapunjee',
      image: '/image/Meghalaya/IMG_0857.JPEG'
    },
    {
      day: 5,
      title: 'Cherrapunjee Sightseeing – Shillong',
      date: 'Day 5',
      travelDistance: 'Approx. 65 km | ~2.5 Hours Scenic Drive',
      points: [
        'Relish morning breakfast with panoramic views of the Sohra valleys.',
        'Visit the ancient limestone passages of Mawsmai Cave and Arwah Cave with prehistoric fossils.',
        'Explore the Garden of Caves with its cascading natural rock waterfalls.',
        'Stand in awe before Nohkalikai Falls — India’s tallest plunge waterfall (1,115 ft).',
        'Stop at Seven Sisters Falls and Eco Park overlooking Bangladesh plains.',
        'Drive back through Mawkdok Dympep valley towards Shillong.',
        'Check in to your Shillong hotel and enjoy your final farewell night with the tribe.'
      ],
      meals: ['Breakfast'],
      stayHotel: 'Hotel Polo Towers / Center Point',
      stayCity: 'Shillong',
      stay: 'Hotel Polo Towers, Shillong',
      image: '/image/Meghalaya/IMG_1124.JPEG'
    },
    {
      day: 6,
      title: 'Shillong – Guwahati Airport | Departure',
      date: 'Day 6 | Departure Day',
      travelDistance: 'Approx. 120 km | ~4 Hours Drive',
      points: [
        'Enjoy breakfast and complete checkout from your stay.',
        'Depart for Guwahati Airport around 9:00 AM.',
        'The journey to the airport takes approximately 4 hours along NH-6.',
        'Expected arrival at Guwahati Airport is around 2:30 PM to 3:00 PM.',
        'We recommend booking departure flights post 5:00 PM.',
        'Bid farewell to your fellow tribe companions with unforgettable memories & tight hugs! 💚'
      ],
      meals: ['Breakfast'],
      stayHotel: 'Trip Concludes',
      stayCity: 'Guwahati Airport',
      stay: 'Guwahati Airport (Trip Ends)',
      image: '/image/Meghalaya/IMG_0884.JPEG'
    }
  ],

  // Section 5: Inclusions & Exclusions
  inclusions: [
    'Pickup and drop from Guwahati Airport / Railway Station as per fixed timings.',
    'Entire intercity & sightseeing transfers in Tempo Traveller / SUV / Sedan with hill fuel, tolls, and parking.',
    '5 nights\' accommodation: 2 Nights in Shillong, 2 Nights in Cherrapunjee, 1 Night in Dawki/Shnongpdeng.',
    'Wholesome meal plan: 5 breakfasts and 1 special riverside dinner at Dawki.',
    'Nongriat Trek Guide for the Double Decker Living Root Bridge & Rainbow Falls trail.',
    '30 minutes complimentary country boat ride on the crystal clear Umngot River.',
    'All driver allowances, toll charges, parking fees, and Meghalaya inner tourism permits.',
    'Dedicated Travel Tribes Trip Captain for 24x7 on-ground assistance and group coordination.',
    'Medical first aid kit and oxygen support on board.'
  ],

  exclusions: [
    'Airfare / Train tickets to and from Guwahati.',
    'Lunches on all days and dinners not specifically mentioned in the itinerary.',
    'Entry tickets to monuments, museums, viewpoint cameras, and adventure activities (zipline/scuba).',
    'Personal expenses like telephone calls, laundry, room heaters, tips to drivers/guides, or extra snacks.',
    'Any cost arising due to unforeseen natural calamities (landslides, roadblocks) to be borne directly on spot.',
    'Travel Insurance and emergency medical evacuation expenses.',
    '5% GST applicable on package cost.'
  ],

  // Section 6: Costing
  quotation: {
    tripleSharingPrice: 20999,
    doubleSharingPrice: 22999,
    xmasTripleSharingPrice: 22999,
    xmasDoubleSharingPrice: 24499,
    advanceAmount: 5000,
    paymentTerms: 'Confirm your booking with just ₹5,000/- token per seat and pay the remaining balance according to payment policy.',
    validUntil: 'Book Before 30 days of the departure and get Early Bird Discounts'
  },

  accountDetails: DEFAULT_BANK_ACCOUNT,
  pointsToBeNoted: DEFAULT_POINTS_TO_BE_NOTED,
  whyTravelTribes: DEFAULT_WHY_TRAVEL_TRIBES,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
}
