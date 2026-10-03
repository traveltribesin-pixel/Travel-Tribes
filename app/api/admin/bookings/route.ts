import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticatedAdmin } from '@/lib/admin-auth'
import { getBookings, addBooking } from '@/lib/crm-store'

export async function GET(req: NextRequest) {
  const isAuth = await isAuthenticatedAdmin()
  if (!isAuth) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const paymentStatus = searchParams.get('paymentStatus') || undefined
  const bookingStatus = searchParams.get('bookingStatus') || undefined
  const search = searchParams.get('search') || undefined

  const bookings = getBookings({ paymentStatus, bookingStatus, search })
  return NextResponse.json({ success: true, bookings, total: bookings.length })
}

export async function POST(req: NextRequest) {
  const isAuth = await isAuthenticatedAdmin()
  if (!isAuth) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json().catch(() => null)
    if (!body || !body.fullName || !body.tripTitle || !body.date) {
      return NextResponse.json(
        { success: false, error: 'Full name, trip destination, and date are required' },
        { status: 400 }
      )
    }

    const year = new Date().getFullYear()
    const randomSuffix = Math.floor(1000 + Math.random() * 9000)
    const bookingId = body.id || `TT-${year}-${randomSuffix}`

    const totalAmount = Number(body.totalAmount) || 0
    const paidAmount = Number(body.paidAmount) || 0
    const balanceDue = Math.max(0, totalAmount - paidAmount)

    const booking = addBooking({
      id: bookingId,
      source: body.source || 'Manual Admin Booking',
      tripTitle: String(body.tripTitle).trim(),
      tripSlug: body.tripSlug,
      date: String(body.date).trim(),
      fullName: String(body.fullName).trim(),
      email: String(body.email || '').trim().toLowerCase(),
      phone: String(body.phone).trim(),
      age: body.age ? Number(body.age) : null,
      city: body.city,
      guests: Number(body.guests) || 1,
      sharingType: body.sharingType || 'Triple Sharing',
      paymentType: body.paymentType || (balanceDue === 0 ? 'full' : 'advance'),
      paymentStatus: body.paymentStatus || (balanceDue === 0 ? 'PAID' : paidAmount > 0 ? 'PARTIAL' : 'PENDING'),
      bookingStatus: body.bookingStatus || 'CONFIRMED',
      totalAmount,
      paidAmount,
      balanceDue,
      specialRequest: body.specialRequest,
      couponCode: body.couponCode,
      note: body.note
    })

    return NextResponse.json({ success: true, booking })
  } catch (error) {
    console.error('Error adding booking:', error)
    return NextResponse.json({ success: false, error: 'Failed to add booking' }, { status: 500 })
  }
}
