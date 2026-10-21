import { NextRequest, NextResponse } from 'next/server'
import {
  getPersonalCRMBookings,
  getPersonalCRMBookingById,
  updatePersonalCRMBooking
} from '@/lib/personal-crm-store'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const paymentStatus = searchParams.get('paymentStatus') || undefined
    const bookingStatus = searchParams.get('bookingStatus') || undefined
    const search = searchParams.get('search') || undefined

    const bookings = getPersonalCRMBookings({
      paymentStatus,
      bookingStatus,
      search
    })

    return NextResponse.json({
      success: true,
      bookings,
      total: bookings.length
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to fetch bookings' },
      { status: 500 }
    )
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null)
    if (!body || !body.id) {
      return NextResponse.json({ success: false, error: 'Booking ID required' }, { status: 400 })
    }

    const updated = updatePersonalCRMBooking(body.id, body)
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Booking not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, booking: updated })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message }, { status: 500 })
  }
}
