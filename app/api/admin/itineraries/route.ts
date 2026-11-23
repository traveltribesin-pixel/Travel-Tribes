import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticatedAdmin } from '@/lib/admin-auth'
import { getAllAdminTrips, saveAdminTrip } from '@/lib/trips-store'

export async function GET(req: NextRequest) {
  try {
    const isAuth = await isAuthenticatedAdmin()
    if (!isAuth) {
      return NextResponse.json({ success: false, error: 'Unauthorized admin access' }, { status: 401 })
    }

    const trips = getAllAdminTrips()
    const { searchParams } = new URL(req.url)
    const search = searchParams.get('q')?.toLowerCase()
    const region = searchParams.get('region')
    const status = searchParams.get('status')
    const placement = searchParams.get('placement')

    let filtered = [...trips]

    if (search) {
      filtered = filtered.filter(
        (t) =>
          t.title.toLowerCase().includes(search) ||
          t.slug.toLowerCase().includes(search) ||
          t.location.toLowerCase().includes(search) ||
          t.tag.toLowerCase().includes(search)
      )
    }

    if (region && region !== 'All') {
      filtered = filtered.filter((t) => t.region === region)
    }

    if (status && status !== 'All') {
      filtered = filtered.filter((t) => t.status === status)
    }

    if (placement && placement !== 'All') {
      switch (placement) {
        case 'home':
          filtered = filtered.filter((t) => t.placements?.showOnHome)
          break
        case 'upcoming':
          filtered = filtered.filter((t) => t.placements?.showOnUpcoming)
          break
        case 'weekend':
          filtered = filtered.filter((t) => t.placements?.showOnWeekend)
          break
        case 'domestic':
          filtered = filtered.filter((t) => t.placements?.showOnDomestic)
          break
        case 'international':
          filtered = filtered.filter((t) => t.placements?.showOnInternational)
          break
        case 'festive':
          filtered = filtered.filter((t) => t.placements?.showOnFestive)
          break
      }
    }

    const stats = {
      total: trips.length,
      published: trips.filter((t) => t.status === 'published').length,
      draft: trips.filter((t) => t.status === 'draft').length,
      domestic: trips.filter((t) => t.region === 'Domestic').length,
      international: trips.filter((t) => t.region === 'International').length,
      weekend: trips.filter((t) => t.placements?.showOnWeekend).length,
      festive: trips.filter((t) => t.placements?.showOnFestive).length
    }

    return NextResponse.json({
      success: true,
      trips: filtered,
      stats
    })
  } catch (error: any) {
    console.error('API Admin Itineraries GET error:', error)
    return NextResponse.json({ success: false, error: error.message || 'Server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const isAuth = await isAuthenticatedAdmin()
    if (!isAuth) {
      return NextResponse.json({ success: false, error: 'Unauthorized admin access' }, { status: 401 })
    }

    const body = await req.json().catch(() => null)
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ success: false, error: 'Invalid itinerary data' }, { status: 400 })
    }

    if (!body.title || !body.price) {
      return NextResponse.json({ success: false, error: 'Trip Title and Starting Price are required' }, { status: 400 })
    }

    const result = saveAdminTrip(body)
    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error || 'Failed to save' }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      message: result.isNew ? 'Itinerary created successfully' : 'Itinerary updated successfully',
      trip: result.trip,
      isNew: result.isNew
    })
  } catch (error: any) {
    console.error('API Admin Itineraries POST error:', error)
    return NextResponse.json({ success: false, error: error.message || 'Server error' }, { status: 500 })
  }
}
