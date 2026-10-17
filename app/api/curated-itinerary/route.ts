import { NextRequest, NextResponse } from 'next/server'
import {
  getAllCuratedItineraries,
  getCuratedItineraryBySlug,
  saveCuratedItinerary,
  deleteCuratedItinerary,
  slugify
} from '@/lib/curated-itineraries-store'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const slug = searchParams.get('slug')

    if (slug) {
      const itinerary = getCuratedItineraryBySlug(slug)
      if (!itinerary) {
        return NextResponse.json({ success: false, error: 'Itinerary not found' }, { status: 404 })
      }
      return NextResponse.json({ success: true, itinerary })
    }

    const itineraries = getAllCuratedItineraries()
    return NextResponse.json({ success: true, itineraries, total: itineraries.length })
  } catch (error: any) {
    console.error('Error fetching curated itineraries:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch itineraries' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null)
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ success: false, error: 'Invalid payload' }, { status: 400 })
    }

    const {
      title,
      destination,
      tripType,
      duration,
      clientName,
      days,
      hotels,
      transport,
      quotation
    } = body

    if (!title || !destination) {
      return NextResponse.json(
        { success: false, error: 'Title and Destination are required' },
        { status: 400 }
      )
    }

    // Auto-generate slug if not provided
    let rawSlug = body.slug
    if (!rawSlug) {
      if (tripType === 'customized' && clientName) {
        rawSlug = `${clientName}-${destination}-trip`
      } else {
        rawSlug = `${title}`
      }
    }

    const saved = saveCuratedItinerary({
      ...body,
      slug: slugify(rawSlug),
      tripType: tripType === 'group' ? 'group' : 'customized',
      title: String(title).trim(),
      destination: String(destination).trim(),
      duration: String(duration || 'Custom Duration').trim(),
      bannerImage: body.bannerImage || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
      overview: body.overview || '',
      highlights: Array.isArray(body.highlights) ? body.highlights : [],
      hotels: Array.isArray(hotels) ? hotels : [],
      transport: transport || {
        vehicleType: 'Private AC Vehicle',
        pickupDrop: 'Airport / Station Pickup & Drop',
        includedFeatures: ['All transfers included', 'Dedicated driver']
      },
      days: Array.isArray(days) ? days : [],
      inclusions: Array.isArray(body.inclusions) ? body.inclusions : [],
      exclusions: Array.isArray(body.exclusions) ? body.exclusions : [],
      quotation: quotation || {}
    })

    const shareUrl = `/itinerary/${saved.slug}`

    return NextResponse.json({
      success: true,
      itinerary: saved,
      slug: saved.slug,
      url: shareUrl,
      message: 'Itinerary curated & published successfully!'
    })
  } catch (error: any) {
    console.error('Error saving curated itinerary:', error)
    return NextResponse.json({ success: false, error: error?.message || 'Failed to save itinerary' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 })
    }

    const deleted = deleteCuratedItinerary(id)
    return NextResponse.json({ success: deleted })
  } catch (error: any) {
    console.error('Error deleting curated itinerary:', error)
    return NextResponse.json({ success: false, error: 'Failed to delete' }, { status: 500 })
  }
}
