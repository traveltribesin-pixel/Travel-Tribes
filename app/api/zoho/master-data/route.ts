import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const destinations = [
      'Rajasthan',
      'Meghalaya',
      'Spiti Valley',
      'Leh Ladakh',
      'Kashmir',
      'Himachal Pradesh',
      'Uttarakhand',
      'Kerala',
      'Goa',
      'Bali',
      'Dubai',
      'Vietnam',
      'Thailand',
      'Tadoba',
      'Andaman'
    ]

    const vehicles = [
      { name: 'AC Sedan / Dzire', cost: 2800, maxCapacity: 4 },
      { name: 'AC Ertiga', cost: 3500, maxCapacity: 6 },
      { name: 'AC Innova Crysta', cost: 4500, maxCapacity: 7 },
      { name: 'Tempo Traveller 12 Seater', cost: 6500, maxCapacity: 12 },
      { name: 'Tempo Traveller 17 Seater', cost: 7500, maxCapacity: 17 },
      { name: 'Luxury Urbania', cost: 9500, maxCapacity: 12 },
      { name: 'Toyota Fortuner', cost: 9000, maxCapacity: 6 }
    ]

    const hotelsByCity: Record<string, any[]> = {
      jaipur: [
        {
          hotelName: 'ITC Rajputana, A Luxury Collection Hotel',
          category: 'Luxury',
          rooms: [
            { roomCategory: 'Rajputana Deluxe Room', basePrice: 11500, extraBedPrice: 2500, childWithoutBed: 1000 },
            { roomCategory: 'Royal Club Executive Room', basePrice: 15500, extraBedPrice: 3000, childWithoutBed: 1200 }
          ]
        },
        {
          hotelName: 'Radisson Blu Hotel Jaipur',
          category: 'Premium',
          rooms: [
            { roomCategory: 'Superior Room', basePrice: 6500, extraBedPrice: 1800, childWithoutBed: 800 },
            { roomCategory: 'Deluxe Suite', basePrice: 9500, extraBedPrice: 2200, childWithoutBed: 1000 }
          ]
        },
        {
          hotelName: 'Holiday Inn Jaipur City Centre',
          category: 'Deluxe',
          rooms: [
            { roomCategory: 'Standard Deluxe Room', basePrice: 4200, extraBedPrice: 1500, childWithoutBed: 600 },
            { roomCategory: 'Executive Room', basePrice: 5400, extraBedPrice: 1800, childWithoutBed: 800 }
          ]
        },
        {
          hotelName: 'Golden Tulip Jaipur',
          category: 'Standard',
          rooms: [
            { roomCategory: 'Superior King Room', basePrice: 3200, extraBedPrice: 1200, childWithoutBed: 500 }
          ]
        }
      ],
      jodhpur: [
        {
          hotelName: 'Taj Hari Mahal Jodhpur',
          category: 'Luxury',
          rooms: [
            { roomCategory: 'Deluxe Garden View Room', basePrice: 12500, extraBedPrice: 2800, childWithoutBed: 1200 },
            { roomCategory: 'Luxury Pool View Room', basePrice: 16500, extraBedPrice: 3200, childWithoutBed: 1500 }
          ]
        },
        {
          hotelName: 'Indana Palace Jodhpur',
          category: 'Premium',
          rooms: [
            { roomCategory: 'Heritage Executive Room', basePrice: 6800, extraBedPrice: 1800, childWithoutBed: 800 }
          ]
        },
        {
          hotelName: 'Zone by The Park Jodhpur',
          category: 'Deluxe',
          rooms: [
            { roomCategory: 'Zone Deluxe Room', basePrice: 3800, extraBedPrice: 1400, childWithoutBed: 600 }
          ]
        }
      ],
      udaipur: [
        {
          hotelName: 'Trident Udaipur',
          category: 'Luxury',
          rooms: [
            { roomCategory: 'Deluxe Garden View Room', basePrice: 13500, extraBedPrice: 3000, childWithoutBed: 1500 }
          ]
        },
        {
          hotelName: 'The Ananta Udaipur',
          category: 'Premium',
          rooms: [
            { roomCategory: 'Luxury Cottage', basePrice: 7200, extraBedPrice: 2000, childWithoutBed: 900 }
          ]
        },
        {
          hotelName: 'Amantra Comfort Hotel',
          category: 'Deluxe',
          rooms: [
            { roomCategory: 'Deluxe Room with Breakfast', basePrice: 3900, extraBedPrice: 1400, childWithoutBed: 600 }
          ]
        }
      ],
      jaisalmer: [
        {
          hotelName: 'Suryagarh Jaisalmer',
          category: 'Luxury',
          rooms: [
            { roomCategory: 'Fort Room', basePrice: 15000, extraBedPrice: 3500, childWithoutBed: 1500 }
          ]
        },
        {
          hotelName: 'Desert Luxury Camp Sam Dunes',
          category: 'Deluxe',
          rooms: [
            { roomCategory: 'Luxury Swiss AC Tent with Folk Show', basePrice: 4800, extraBedPrice: 1600, childWithoutBed: 700 }
          ]
        }
      ],
      shillong: [
        {
          hotelName: 'Vivanta Meghalaya, Shillong',
          category: 'Luxury',
          rooms: [
            { roomCategory: 'Deluxe Pine View Room', basePrice: 11000, extraBedPrice: 2500, childWithoutBed: 1000 }
          ]
        },
        {
          hotelName: 'Hotel Polo Towers Shillong',
          category: 'Deluxe',
          rooms: [
            { roomCategory: 'Premier Room', basePrice: 5200, extraBedPrice: 1600, childWithoutBed: 700 }
          ]
        }
      ],
      cherrapunji: [
        {
          hotelName: 'Polo Orchid Resort Cherrapunjee',
          category: 'Premium',
          rooms: [
            { roomCategory: 'Valley View Cottage', basePrice: 7800, extraBedPrice: 2000, childWithoutBed: 900 }
          ]
        },
        {
          hotelName: 'Jiva Resort Cherrapunji',
          category: 'Luxury',
          rooms: [
            { roomCategory: 'Luxury Suite', basePrice: 9500, extraBedPrice: 2400, childWithoutBed: 1000 }
          ]
        }
      ]
    }

    const experiencesByCity: Record<string, any[]> = {
      jaipur: [
        { name: 'City Palace', sicAdult: 700, sicChild: 350, privateCost: 0, category: 'Heritage', description: 'Explore the grand courtyards and royal museum exhibits.' },
        { name: 'Hawa Mahal', sicAdult: 200, sicChild: 100, privateCost: 0, category: 'Monument', description: 'Iconic 953 honeycombed windows of the Palace of Winds.' },
        { name: 'Amber Fort', sicAdult: 550, sicChild: 250, privateCost: 0, category: 'Fort', description: 'Hilltop fort with dazzling Sheesh Mahal mirror work.' },
        { name: 'Nahargarh Sunset Point', sicAdult: 0, sicChild: 0, privateCost: 0, category: 'Viewpoint', description: 'Panoramic sunset views overlooking the Pink City.' },
        { name: 'Chokhi Dhani Cultural Village', sicAdult: 1200, sicChild: 800, privateCost: 0, category: 'Cultural', description: 'Traditional Rajasthani dinner, folk music, and puppet shows.' },
        { name: 'Jantar Mantar', sicAdult: 250, sicChild: 150, privateCost: 0, category: 'Heritage', description: 'UNESCO astronomical observatory with stone instruments.' }
      ],
      jodhpur: [
        { name: 'Mehrangarh Fort', sicAdult: 600, sicChild: 300, privateCost: 0, category: 'Fort', description: 'Majestic 400-foot hilltop fortress over the Blue City.' },
        { name: 'Jaswant Thada', sicAdult: 150, sicChild: 80, privateCost: 0, category: 'Monument', description: 'Serene white marble royal cenotaph.' },
        { name: 'Umaid Bhawan Palace & Museum', sicAdult: 300, sicChild: 150, privateCost: 0, category: 'Palace', description: 'Art deco palace and museum exhibits.' },
        { name: 'Mandore Garden Light Show', sicAdult: 200, sicChild: 100, privateCost: 0, category: 'Show', description: 'Night light and sound performance at Mandore.' }
      ],
      udaipur: [
        { name: 'City Palace Udaipur', sicAdult: 650, sicChild: 300, privateCost: 0, category: 'Palace', description: 'Ornate courtyards and balconies overlooking Lake Pichola.' },
        { name: 'Lake Pichola Scenic Boat Ride', sicAdult: 850, sicChild: 450, privateCost: 0, category: 'Activity', description: 'Picturesque boat cruise past Taj Lake Palace and Jag Mandir.' },
        { name: 'Saheliyon Ki Bari', sicAdult: 100, sicChild: 50, privateCost: 0, category: 'Garden', description: 'Historic fountains and lotus pools of the royal ladies.' }
      ],
      jaisalmer: [
        { name: 'Sam Sand Dunes Camel Safari', sicAdult: 800, sicChild: 500, privateCost: 0, category: 'Adventure', description: 'Camel ride over golden undulating Thar desert dunes.' },
        { name: 'Desert Sunset & Folk Dance Night', sicAdult: 1500, sicChild: 1000, privateCost: 0, category: 'Cultural', description: 'Kalbelia dance, bonfire, and Rajasthani buffet dinner.' },
        { name: 'Jaisalmer Golden Fort', sicAdult: 300, sicChild: 150, privateCost: 0, category: 'Fort', description: 'Living golden sandstone fort with Jain temples.' }
      ]
    }

    return NextResponse.json({
      success: true,
      destinations,
      vehicles,
      hotelsByCity,
      experiencesByCity,
      stats: {
        activitiesCount: Object.values(experiencesByCity).reduce((a, b) => a + b.length, 0),
        hotelsCount: Object.values(hotelsByCity).reduce((a, b) => a + b.length, 0),
        vehiclesCount: vehicles.length
      }
    })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
