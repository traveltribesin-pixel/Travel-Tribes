export type TripPricingOption = {
  label: string
  price: string
  note?: string
}

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
  pricingOptions?: TripPricingOption[]
  bookingAmount?: string
}

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=88`

export const trips: Trip[] = [
  {
    slug: 'gokarna-backpacking',
    title: 'Gokarna Backpacking Trip',
    location: 'Gokarna · Murdeshwar · Honnavar · Yana Caves',
    region: 'Domestic',
    date: 'Oct 18–22, 2026',
    duration: '4N/5D',
    price: '₹8,499',
    image: img('photo-1593693397690-362cb9666fc2'),
    alt: 'Gokarna Beach and scenic coastline',
    tag: 'Backpacking Trip',
    description: 'Looking for the perfect Gokarna trip from Mumbai? Join Travel Tribes on a 4N/5D Gokarna backpacking trip covering the beautiful beaches of Gokarna, the spiritual town of Murdeshwar, the mangrove backwaters of Honnavar and the spectacular Yana Caves. This Gokarna group trip combines beach trekking, backwater boating, sunsets, cafés, local markets, adventure, music, games and plenty of opportunities to meet fellow travellers. Come solo. Meet strangers. Explore Gokarna. Find your tribe.',
    spots: '8 spots left',
    gallery: [
      { image: img('photo-1593693397690-362cb9666fc2'), alt: 'Gokarna Beach' },
      { image: img('photo-1528127269322-539801943592'), alt: 'Palm trees and coast' },
      { image: img('photo-1500534623283-312aade485b7'), alt: 'Sunset at Kudle Beach' }
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
      { label: 'Add-On (Double Sharing Room)', price: '+₹1,500 / person' }
    ],
    bookingAmount: '₹4,000 / person'
  },
  {
    slug: 'coorg-backpacking',
    title: 'Coorg Backpacking Trip',
    location: 'Coorg · Madikeri · Mandalpatti · Mangalore',
    region: 'Domestic',
    date: 'Nov 14–18, 2026',
    duration: '4N/5D',
    price: '₹8,499',
    image: img('photo-1513836279014-a89f7a76ae86'),
    alt: 'Misty hills and lush coffee plantations of Coorg',
    tag: 'Scotland of India',
    description: 'Looking for a Coorg trip from Mumbai, a Coorg backpacking trip, or a fun Coorg group trip with strangers? Join Travel Tribes for an unforgettable journey to Coorg, the Scotland of India, and explore misty hills, lush coffee plantations, waterfalls, viewpoints, monasteries and scenic landscapes. From Abbey Falls and Mandalpatti Peak 4x4 Jeep ride to Raja’s Seat, Namdroling Monastery (Golden Temple), Elephant Camp, and coffee tasting. Come solo. Meet strangers. Explore Coorg. Find your tribe.',
    spots: '6 spots left',
    gallery: [
      { image: img('photo-1513836279014-a89f7a76ae86'), alt: 'Misty hills of Coorg' },
      { image: img('photo-1500530855697-b586d89ba3ee'), alt: 'Coffee estate & valley' },
      { image: img('photo-1506744038136-46273834b3fb'), alt: 'Abbey Falls waterfalls' }
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
      { label: 'Add-On (Double Sharing Room)', price: '+₹1,500 / person' }
    ],
    bookingAmount: '₹4,000 / person'
  },
  {
    slug: 'udaipur-backpacking',
    title: 'Udaipur Backpacking Trip',
    location: 'Udaipur · Lake Pichola · Fateh Sagar · Bahubali Hills',
    region: 'Domestic',
    date: 'Nov 20–24, 2026',
    duration: '4N/5D',
    price: '₹9,999',
    image: img('photo-1599661046289-e31897846e41'),
    alt: 'Majestic City Palace overlooking Lake Pichola in Udaipur',
    tag: 'City of Lakes',
    description: 'Looking for a Udaipur trip from Mumbai, a Udaipur backpacking trip, or a fun Udaipur group trip with strangers? Join Travel Tribes for a 5-day backpacking adventure to the City of Lakes — Udaipur. Explore magnificent palaces, beautiful lakes, historic ghats, vibrant markets, cultural performances and some of the best viewpoints in the city. From City Palace and Lake Pichola to Sajjangarh Monsoon Palace sunset, Bahubali Hills sunrise, Karni Mata ropeway, Bagore Ki Haveli show and street-food trails. Come solo. Meet strangers. Explore Udaipur. Find your tribe.',
    spots: '7 spots left',
    gallery: [
      { image: img('photo-1599661046289-e31897846e41'), alt: 'City Palace Udaipur' },
      { image: img('photo-1585123334904-845d60e97b29'), alt: 'Lake Pichola Ghats' },
      { image: img('photo-1506744038136-46273834b3fb'), alt: 'Sunset over Udaipur lake' }
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
      { label: 'Add-On (Double Sharing Room)', price: '+₹1,000 / person' }
    ],
    bookingAmount: '₹4,000 / person'
  },
  {
    slug: 'spiti-valley-chandrataal',
    title: 'Spiti Valley with Chandrataal',
    location: 'Chitkul · Tabo · Kaza · Chandrataal · Manali',
    region: 'Domestic',
    date: 'Jun 12–20, 2027',
    duration: '8N/9D',
    price: '₹18,999',
    image: img('photo-1464822759023-fed622ff2c3b'),
    alt: 'High-altitude Himalayan desert and snow peaks of Spiti Valley',
    tag: 'Himalayan Expedition',
    description: 'Looking for a Spiti Valley trip from Delhi, a Spiti backpacking trip, or an unforgettable Spiti Valley group trip? Travel Tribes takes you on an epic Himalayan road trip through Shimla, Chitkul, Tabo, Dhankar, Kaza, Langza, Hikkim, Komic, Kibber, Chicham Bridge, Chandrataal and Manali. From remote villages and ancient monasteries to stargazing by Chandrataal Lake and Old Manali cafés. Come solo. Meet strangers. Explore Spiti. Leave with a tribe.',
    spots: '5 spots left',
    gallery: [
      { image: img('photo-1464822759023-fed622ff2c3b'), alt: 'Himalayan mountains' },
      { image: img('photo-1500534623283-312aade485b7'), alt: 'Spiti Valley landscape' },
      { image: img('photo-1476514525535-07fb3b4ae5f1'), alt: 'Chandrataal Lake turquoise waters' }
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
    image: img('photo-1517824806704-9040b037703b'),
    alt: 'Snow-covered winter wonderland of Spiti Valley and Key Monastery in white',
    tag: 'Winter Expedition',
    description: 'Snow-covered mountains, frozen landscapes, remote Himalayan villages, ancient monasteries and dramatic mountain roads — welcome to the Spiti Valley Winter Expedition. Travel from Delhi to Spiti Valley with Travel Tribes through Chitkul, Tabo, Kaza, Langza, Hikkim, Komic, Key Monastery, Chicham Bridge, Kibber Village, 500-year-old Gue Mummy, and the stunning snow views of Kalpa with Kinner Kailash peak. Come solo. Meet strangers. Explore Spiti in winter. Leave with a tribe.',
    spots: '4 spots left',
    gallery: [
      { image: img('photo-1517824806704-9040b037703b'), alt: 'Snow mountain peaks' },
      { image: img('photo-1548013146-72479768bada'), alt: 'Frozen Spiti winter landscape' },
      { image: img('photo-1464822759023-fed622ff2c3b'), alt: 'High altitude snow ranges' }
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
  { label: 'About us', href: '/about' }
]

export const testimonials = [
  { quote: 'The rare group trip that feels genuinely personal. Every detail was considered.', name: 'Aditi S.', detail: 'Gokarna Backpacking, 2025' },
  { quote: 'I came for the itinerary and stayed for the people. Travelled solo, came home with a new circle.', name: 'Rohan M.', detail: 'Coorg Backpacking, 2025' },
  { quote: 'Camping under the stars at Chandrataal with the tribe was pure magic. Unforgettable!', name: 'Nisha K.', detail: 'Spiti Valley Expedition, 2026' }
]

export const gallery = [
  { image: img('photo-1476514525535-07fb3b4ae5f1'), alt: 'Kayak on a turquoise lake' },
  { image: img('photo-1500534623283-312aade485b7'), alt: 'Mountain landscape at golden hour' },
  { image: img('photo-1500530855697-b586d89ba3ee'), alt: 'Traveller walking through a valley' },
  { image: img('photo-1528127269322-539801943592'), alt: 'Tropical beach and palm trees' },
  { image: img('photo-1516483638261-f4dbaf036963'), alt: 'Colourful European coastal town' }
]

export const blogs = [
  { title: 'How to choose your first group trip', category: 'Travel notes', image: img('photo-1527631746610-bca00a040d60') },
  { title: 'The art of leaving room for wonder', category: 'Journal', image: img('photo-1464822759023-fed622ff2c3b') },
  { title: 'A slower way to see the world', category: 'Field guide', image: img('photo-1500534623283-312aade485b7') }
]

export const honeymoonTrips = trips.filter(t => t.region === 'Honeymoon')

export const categories = [
  { title: 'Domestic', desc: 'Closer than you think.', href: '/domestic-trips', image: img('photo-1506461883276-594a12b11cf3') },
  { title: 'International', desc: 'Go further, together.', href: '/international-trips', image: img('photo-1516483638261-f4dbaf036963') },
  { title: 'Honeymoons', desc: 'For your next chapter.', href: '/contact', image: img('photo-1533105079780-92b9be482077') }
]
