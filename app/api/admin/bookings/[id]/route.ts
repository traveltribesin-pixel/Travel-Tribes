import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticatedAdmin } from '@/lib/admin-auth'
import { updateBooking, deleteBooking, getBookingById } from '@/lib/crm-store'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const isAuth = await isAuthenticatedAdmin()
  if (!isAuth) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const booking = getBookingById(id)
  if (!booking) {
    return NextResponse.json({ success: false, error: 'Booking not found' }, { status: 404 })
  }

  return NextResponse.json({ success: true, booking })
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const isAuth = await isAuthenticatedAdmin()
  if (!isAuth) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params
    const body = await req.json().catch(() => null)
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ success: false, error: 'Invalid update body' }, { status: 400 })
    }

    const updated = updateBooking(id, body)
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Booking not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, booking: updated })
  } catch (error) {
    console.error('Error updating booking:', error)
    return NextResponse.json({ success: false, error: 'Failed to update booking' }, { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const isAuth = await isAuthenticatedAdmin()
  if (!isAuth) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const deleted = deleteBooking(id)
  if (!deleted) {
    return NextResponse.json({ success: false, error: 'Booking not found' }, { status: 404 })
  }

  return NextResponse.json({ success: true, message: 'Booking deleted successfully' })
}
