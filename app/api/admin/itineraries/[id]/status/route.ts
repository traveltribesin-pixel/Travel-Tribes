import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticatedAdmin } from '@/lib/admin-auth'
import { toggleAdminTripStatus } from '@/lib/trips-store'

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

    const result = toggleAdminTripStatus(id)
    if (!result.success) {
      return NextResponse.json({ success: false, error: 'Could not toggle itinerary status' }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      status: result.status,
      message: `Itinerary status updated to ${result.status}`
    })
  } catch (error: any) {
    console.error('API Admin Itinerary Status error:', error)
    return NextResponse.json({ success: false, error: error.message || 'Server error' }, { status: 500 })
  }
}
