import { NextRequest, NextResponse } from 'next/server'

const FIXED_TEMPLATES = [
  {
    id: 'rajasthan-royal-heritage-5n6d',
    name: 'Royal Rajasthan Heritage Explorer (Jaipur, Jodhpur, Udaipur)',
    destination: 'Rajasthan',
    destinationType: 'India',
    noOfDays: 6,
    noOfNights: 5,
    mealPlan: 'Breakfast & Dinner',
    dayRows: [
      {
        dayNumber: 1,
        dayText: 'Day 1',
        city: 'Jaipur',
        city2: 'Jaipur',
        guidedTour: false,
        enRouteExperiences: ['Patrika Gate'],
        experiences: ['City Palace', 'Hawa Mahal', 'Jantar Mantar', 'Pink City Heritage Bazaar Walk'],
        descriptions: [
          'Explore the magnificent City Palace and discover Jaipur royal heritage.',
          'Marvel at the iconic Palace of Winds with 953 honeycomb windows.',
          'Discover the UNESCO World Heritage astronomical observatory.',
          'Walk through historic bazaars famous for block prints, gems, and spices.'
        ],
        optionalExperiences: ['Chokhi Dhani Cultural Village', ''],
        optionalDescriptions: ['Authentic Rajasthani village culture and traditional dining.', ''],
        breakfast: false,
        lunch: false,
        dinner: true
      },
      {
        dayNumber: 2,
        dayText: 'Day 2',
        city: 'Jaipur',
        city2: 'Jaipur',
        guidedTour: true,
        enRouteExperiences: ['Jal Mahal Photo Stop'],
        experiences: ['Amber Fort', 'Nahargarh Sunset Point', 'Johari Bazaar', ''],
        descriptions: [
          'Explore the majestic hilltop Amber Fort featuring the dazzling Sheesh Mahal.',
          'Enjoy panoramic sunset views overlooking the Pink City.',
          'Explore Jaipur vibrant Johari Bazaar for traditional jewellery and textiles.',
          ''
        ],
        optionalExperiences: ['', ''],
        optionalDescriptions: ['', ''],
        breakfast: true,
        lunch: false,
        dinner: true
      },
      {
        dayNumber: 3,
        dayText: 'Day 3',
        city: 'Jaipur',
        city2: 'Jodhpur',
        guidedTour: false,
        enRouteExperiences: ['Pushkar Brahma Temple'],
        experiences: ['Clock Tower & Sardar Market', 'Panchatiya Hills', '', ''],
        descriptions: [
          'Stroll around the historic Ghanta Ghar clock tower and bustling bazaar.',
          'Enjoy peaceful sunset views overlooking the Blue City.',
          '',
          ''
        ],
        optionalExperiences: ['', ''],
        optionalDescriptions: ['', ''],
        breakfast: true,
        lunch: false,
        dinner: true
      },
      {
        dayNumber: 4,
        dayText: 'Day 4',
        city: 'Jodhpur',
        city2: 'Jodhpur',
        guidedTour: true,
        enRouteExperiences: [''],
        experiences: ['Mehrangarh Fort', 'Jaswant Thada', 'Umaid Bhawan Palace & Museum', ''],
        descriptions: [
          'Visit one of India largest forts rising 400 feet above the Blue City.',
          'Peaceful white-marble royal cenotaph with carved gazebos and gardens.',
          'Explore the grand art-deco royal palace and museum exhibits.',
          ''
        ],
        optionalExperiences: ['Mandore Garden Light Show', ''],
        optionalDescriptions: ['Witness captivating light and sound spectacle of Mandore.', ''],
        breakfast: true,
        lunch: false,
        dinner: true
      },
      {
        dayNumber: 5,
        dayText: 'Day 5',
        city: 'Jodhpur',
        city2: 'Udaipur',
        guidedTour: false,
        enRouteExperiences: ['Ranakpur Jain Temples', 'Kumbhalgarh Fort'],
        experiences: ['Lake Pichola Scenic Boat Ride', 'Jag Mandir Island', '', ''],
        descriptions: [
          'Delightful boat cruise on Lake Pichola past historic ghats and palaces.',
          'Picturesque island palace with marble pavilions and scenic lakeside gardens.',
          '',
          ''
        ],
        optionalExperiences: ['', ''],
        optionalDescriptions: ['', ''],
        breakfast: true,
        lunch: false,
        dinner: true
      },
      {
        dayNumber: 6,
        dayText: 'Day 6',
        city: 'Udaipur',
        city2: 'Udaipur',
        guidedTour: false,
        enRouteExperiences: [''],
        experiences: ['City Palace Udaipur', 'Saheliyon Ki Bari', 'Vintage Car Collection', ''],
        descriptions: [
          'Explore Rajasthan largest palace complex overlooking Lake Pichola.',
          'Stroll through the historic Garden of the Maidens with marble fountains.',
          'View the private classic and vintage car collection of the royal family.',
          ''
        ],
        optionalExperiences: ['', ''],
        optionalDescriptions: ['', ''],
        breakfast: true,
        lunch: false,
        dinner: false
      }
    ]
  },
  {
    id: 'meghalaya-living-roots-5n6d',
    name: 'Meghalaya Living Roots & Waterfalls Expedition',
    destination: 'Meghalaya',
    destinationType: 'India',
    noOfDays: 6,
    noOfNights: 5,
    mealPlan: 'Breakfast & Dinner',
    dayRows: [
      {
        dayNumber: 1,
        dayText: 'Day 1',
        city: 'Guwahati',
        city2: 'Shillong',
        guidedTour: false,
        enRouteExperiences: ['Umiam Lake'],
        experiences: ['Police Bazaar Walk', 'Ward Lake', '', ''],
        descriptions: ['Enjoy evening street food and local pine-scented market.', 'Peaceful lakeside stroll.', '', ''],
        optionalExperiences: ['', ''],
        optionalDescriptions: ['', ''],
        breakfast: false,
        lunch: false,
        dinner: true
      },
      {
        dayNumber: 2,
        dayText: 'Day 2',
        city: 'Shillong',
        city2: 'Cherrapunji',
        guidedTour: false,
        enRouteExperiences: ['Elephant Falls'],
        experiences: ['Laitlum Canyons', 'Mawkdok Dympep Valley View', '', ''],
        descriptions: ['Spectacular endless rolling green gorges.', 'Iconic zip line and scenic bridge valley view.', '', ''],
        optionalExperiences: ['', ''],
        optionalDescriptions: ['', ''],
        breakfast: true,
        lunch: false,
        dinner: true
      },
      {
        dayNumber: 3,
        dayText: 'Day 3',
        city: 'Cherrapunji',
        city2: 'Cherrapunji',
        guidedTour: true,
        enRouteExperiences: [''],
        experiences: ['Nongriat Double Decker Living Root Bridge', 'Rainbow Falls Trek', '', ''],
        descriptions: ['Trek to the ancient bio-engineered 150-year-old living root bridge.', 'Crystal turquoise pool beneath the gushing waterfall.', '', ''],
        optionalExperiences: ['', ''],
        optionalDescriptions: ['', ''],
        breakfast: true,
        lunch: false,
        dinner: true
      },
      {
        dayNumber: 4,
        dayText: 'Day 4',
        city: 'Cherrapunji',
        city2: 'Dawki',
        guidedTour: false,
        enRouteExperiences: ['Nohkalikai Falls'],
        experiences: ['Mawsmai Cave', 'Mawlynnong Village', 'Dawki Umngot River Boating', ''],
        descriptions: ['Limestone prehistoric caves.', 'Acclaimed as the cleanest village in Asia.', 'Boating on glassy crystal-clear river.', ''],
        optionalExperiences: ['', ''],
        optionalDescriptions: ['', ''],
        breakfast: true,
        lunch: false,
        dinner: true
      },
      {
        dayNumber: 5,
        dayText: 'Day 5',
        city: 'Dawki',
        city2: 'Shillong',
        guidedTour: false,
        enRouteExperiences: ['Krang Suri Waterfalls'],
        experiences: ['Jowai Monoliths', 'Laitlum Sunset', '', ''],
        descriptions: ['Azure natural swimming lagoon with crystal blue waters.', 'Historical Khasi monolith stone relics.', '', ''],
        optionalExperiences: ['', ''],
        optionalDescriptions: ['', ''],
        breakfast: true,
        lunch: false,
        dinner: true
      },
      {
        dayNumber: 6,
        dayText: 'Day 6',
        city: 'Shillong',
        city2: 'Guwahati',
        guidedTour: false,
        enRouteExperiences: ['Kamakhya Temple'],
        experiences: ['Guwahati Airport Drop-off', '', '', ''],
        descriptions: ['Drop-off with unforgettable Himalayan memories.', '', '', ''],
        optionalExperiences: ['', ''],
        optionalDescriptions: ['', ''],
        breakfast: true,
        lunch: false,
        dinner: false
      }
    ]
  },
  {
    id: 'kashmir-paradise-5n6d',
    name: 'Kashmir Autumn & Winter Paradise (Srinagar, Gulmarg, Pahalgam)',
    destination: 'Kashmir',
    destinationType: 'India',
    noOfDays: 6,
    noOfNights: 5,
    mealPlan: 'Breakfast & Dinner',
    dayRows: [
      {
        dayNumber: 1,
        dayText: 'Day 1',
        city: 'Srinagar',
        city2: 'Srinagar',
        guidedTour: false,
        enRouteExperiences: ['Dal Lake'],
        experiences: ['Shikara Sunset Ride', 'Mughal Gardens (Nishat & Shalimar)', '', ''],
        descriptions: ['Relaxing shikara glide across Dal Lake floating gardens.', 'Historic terraced Persian royal gardens.', '', ''],
        optionalExperiences: ['', ''],
        optionalDescriptions: ['', ''],
        breakfast: false,
        lunch: false,
        dinner: true
      },
      {
        dayNumber: 2,
        dayText: 'Day 2',
        city: 'Srinagar',
        city2: 'Gulmarg',
        guidedTour: true,
        enRouteExperiences: ['Tangmarg Pine Valley'],
        experiences: ['Gulmarg Gondola Ride (Phase 1 & 2)', 'Apharwat Peak Snow Exploration', '', ''],
        descriptions: ['World second highest cable car to snow peaks.', 'Panoramic Himalayan snow landscape.', '', ''],
        optionalExperiences: ['', ''],
        optionalDescriptions: ['', ''],
        breakfast: true,
        lunch: false,
        dinner: true
      },
      {
        dayNumber: 3,
        dayText: 'Day 3',
        city: 'Gulmarg',
        city2: 'Pahalgam',
        guidedTour: false,
        enRouteExperiences: ['Pampore Saffron Fields'],
        experiences: ['Aru Valley', 'Betaab Valley', 'Chandanwari', ''],
        descriptions: ['Untouched alpine meadows surrounded by snow peaks.', 'Lush valley framed by Lidder river.', 'Starting point of sacred Amarnath Yatra.', ''],
        optionalExperiences: ['', ''],
        optionalDescriptions: ['', ''],
        breakfast: true,
        lunch: false,
        dinner: true
      },
      {
        dayNumber: 4,
        dayText: 'Day 4',
        city: 'Pahalgam',
        city2: 'Pahalgam',
        guidedTour: false,
        enRouteExperiences: [''],
        experiences: ['Baisaran Valley (Mini Switzerland)', 'Lidder River Walk', '', ''],
        descriptions: ['Scenic pine meadow with pony ride experience.', 'Peaceful riverside walk along turquoise mountain streams.', '', ''],
        optionalExperiences: ['', ''],
        optionalDescriptions: ['', ''],
        breakfast: true,
        lunch: false,
        dinner: true
      },
      {
        dayNumber: 5,
        dayText: 'Day 5',
        city: 'Pahalgam',
        city2: 'Srinagar',
        guidedTour: false,
        enRouteExperiences: ['Avantipur Ruins'],
        experiences: ['Houseboat Stay Experience', 'Old Srinagar Heritage Walk', '', ''],
        descriptions: ['Stay in classic carved cedarwood houseboat on Nigeen / Dal Lake.', 'Historic copper craft and spice markets of Srinagar.', '', ''],
        optionalExperiences: ['', ''],
        optionalDescriptions: ['', ''],
        breakfast: true,
        lunch: false,
        dinner: true
      },
      {
        dayNumber: 6,
        dayText: 'Day 6',
        city: 'Srinagar',
        city2: 'Srinagar',
        guidedTour: false,
        enRouteExperiences: [''],
        experiences: ['Srinagar Airport Drop-off', '', '', ''],
        descriptions: ['Departure transfer with warm Kashmiri memories.', '', '', ''],
        optionalExperiences: ['', ''],
        optionalDescriptions: ['', ''],
        breakfast: true,
        lunch: false,
        dinner: false
      }
    ]
  }
]

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (id) {
      const found = FIXED_TEMPLATES.find(t => t.id === id)
      if (found) {
        return NextResponse.json({ success: true, itinerary: found })
      }
      return NextResponse.json({ success: false, error: 'Template not found' }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      itineraries: FIXED_TEMPLATES.map(t => ({
        id: t.id,
        name: t.name,
        destination: t.destination,
        category: t.destination,
        noOfDays: t.noOfDays,
        noOfNights: t.noOfNights
      }))
    })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
