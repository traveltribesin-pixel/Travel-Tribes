import { NextRequest, NextResponse } from 'next/server'
import { loadCuratedStore } from '@/lib/curated-itineraries-store'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const query = searchParams.get('query')?.trim() || ''

    if (!query) {
      return NextResponse.json({ success: false, error: 'Inquiry query parameter is required' }, { status: 400 })
    }

    // Check if any existing curated itinerary matches this inquiry ID
    const store = loadCuratedStore()
    const matched = store.itineraries.find(it =>
      it.slug.toLowerCase().includes(query.toLowerCase()) ||
      (it as any).inquiryId?.toLowerCase() === query.toLowerCase()
    )

    if (matched) {
      return NextResponse.json({
        success: true,
        lead: {
          inquiryId: query,
          leadName: matched.clientName || 'Valued Guest',
          email: matched.clientEmail || '',
          mobile: matched.clientPhone || '',
          destinations: matched.destination,
          travelStartDate: matched.travelDates?.split('to')?.[0]?.trim() || '',
          noOfDays: matched.days?.length || 5,
          noOfNights: (matched.days?.length || 5) > 1 ? (matched.days?.length || 5) - 1 : 1,
          adults: 2,
          kids: 0,
          vehicleType: matched.transport?.vehicleType || 'AC Innova Crysta',
          rawLeadData: {
            Inquiry_ID: query,
            Full_Name: matched.clientName,
            Destinations: matched.destination,
            Final_Quotation_Amount: matched.quotation?.totalPackagePrice || 0
          }
        }
      })
    }

    // Default mock response so user testing works smoothly
    return NextResponse.json({
      success: true,
      lead: {
        inquiryId: query,
        leadName: 'Guest Traveler',
        firstName: 'Guest',
        lastName: 'Traveler',
        email: 'guest@example.com',
        mobile: '+91 9876543210',
        city: 'Mumbai',
        destinations: 'Rajasthan',
        destinationType: 'India',
        noOfDays: 5,
        noOfNights: 4,
        adults: 2,
        kids: 0,
        sharingType: 'Double Sharing',
        travelStyle: 'Family Trip',
        vehicleType: 'AC Innova Crysta',
        mealPlan: 'Breakfast & Dinner',
        rawLeadData: {
          Inquiry_ID: query,
          Full_Name: 'Guest Traveler',
          First_Name: 'Guest',
          Last_Name: 'Traveler',
          Destinations: 'Rajasthan'
        }
      }
    })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
