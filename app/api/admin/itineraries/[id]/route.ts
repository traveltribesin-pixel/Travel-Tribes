import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticatedAdmin } from '@/lib/admin-auth'
import { getAdminTripByIdOrSlug, saveAdminTrip, deleteAdminTrip } from '@/lib/trips-store'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAuth = await isAuthenticatedAdmin()
    if (!isAuth) {
      return NextResponse.json({ success: false, error: 'Unauthorized admin access' }, { status: 401 })
    }

    const resolvedParams = await params
    const id = resolvedParams.id

    const trip = getAdminTripByIdOrSlug(id)
    if (!trip) {
      return NextResponse.json({ success: false, error: 'Itinerary not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, trip })
  } catch (error: any) {
    console.error('API Admin Itinerary GET error:', error)
    return NextResponse.json({ success: false, error: error.message || 'Server error' }, { status: 500 })
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAuth = await isAuthenticatedAdmin()
    if (!isAuth) {
      return NextResponse.json({ success: false, error: 'Unauthorized admin access' }, { status: 401 })
    }

    const resolvedParams = await params
    const id = resolvedParams.id

    const body = await req.json().catch(() => null)
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ success: false, error: 'Invalid itinerary data' }, { status: 400 })
    }

    const result = saveAdminTrip({ ...body, id })
    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error || 'Failed to update' }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      message: 'Itinerary updated successfully',
      trip: result.trip
    })
  } catch (error: any) {
    console.error('API Admin Itinerary PUT error:', error)
    return NextResponse.json({ success: false, error: error.message || 'Server error' }, { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAuth = await isAuthenticatedAdmin()
    if (!isAuth) {
      return NextResponse.json({ success: false, error: 'Unauthorized admin access' }, { status: 401 })
    }

    const resolvedParams = await params
    const id = resolvedParams.id

    const result = deleteAdminTrip(id)
    if (!result.success) {
      return NextResponse.json({ success: false, error: 'Itinerary not found or could not be deleted' }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: 'Itinerary deleted successfully',
      deletedSlug: result.deletedSlug
    })
  } catch (error: any) {
    console.error('API Admin Itinerary DELETE error:', error)
    return NextResponse.json({ success: false, error: error.message || 'Server error' }, { status: 500 })
  }
}
