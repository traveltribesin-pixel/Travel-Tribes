import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticatedAdmin } from '@/lib/admin-auth'
import { duplicateAdminTrip } from '@/lib/trips-store'

export async function POST(
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

    const result = duplicateAdminTrip(id)
    if (!result.success || !result.trip) {
      return NextResponse.json({ success: false, error: 'Could not duplicate itinerary' }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      message: 'Itinerary cloned successfully as Draft',
      trip: result.trip
    })
  } catch (error: any) {
    console.error('API Admin Itinerary Duplicate error:', error)
    return NextResponse.json({ success: false, error: error.message || 'Server error' }, { status: 500 })
  }
}
