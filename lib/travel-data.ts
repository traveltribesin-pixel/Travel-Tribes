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

export const gallery = [
  { image: img('photo-1476514525535-07fb3b4ae5f1'), alt: 'Kayak on a turquoise lake', title: 'Emerald Lake Serenity', location: 'Honnavar Backwaters' },
  { image: img('photo-1500534623283-312aade485b7'), alt: 'Mountain landscape at golden hour', title: 'Golden Hour Trails', location: 'Spiti Valley Peaks' },
  { image: img('photo-1500530855697-b586d89ba3ee'), alt: 'Traveller walking through a valley', title: 'Wanderer in Paradise', location: 'Meghalaya Living Roots' },
  { image: img('photo-1528127269322-539801943592'), alt: 'Tropical beach and palm trees', title: 'Sunset at Kudle Beach', location: 'Gokarna Coastline' },
  { image: img('photo-1516483638261-f4dbaf036963'), alt: 'Colourful coastal town', title: 'Heritage & Old Town Vibes', location: 'Vietnam & Bali' },
  { image: img('photo-1533105079780-92b9be482077'), alt: 'Starlit Mountain Camping', title: 'Stargazing with Tribe', location: 'Chandrataal Lake' }
]

export const blogs = [
  { title: 'How to choose your first group trip', category: 'Travel notes', image: img('photo-1527631746610-bca00a040d60') },
  { title: 'The art of leaving room for wonder', category: 'Journal', image: img('photo-1464822759023-fed622ff2c3b') },
  { title: 'A slower way to see the world', category: 'Field guide', image: img('photo-1500534623283-312aade485b7') }
]

export const honeymoonTrips = trips.filter(t => t.region === 'Honeymoon')
export const xmasNewYearTrips = trips.filter(t => t.region === 'Xmas & New Year' || t.tag?.toLowerCase().includes('new year') || t.date?.toLowerCase().includes('dec 2') || t.date?.toLowerCase().includes('dec 3'))

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

