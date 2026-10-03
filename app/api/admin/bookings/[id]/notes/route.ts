import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticatedAdmin } from '@/lib/admin-auth'
import { updateBooking, getBookingById } from '@/lib/crm-store'

export async function POST(
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
    if (!body || !body.text) {
      return NextResponse.json({ success: false, error: 'Note text is required' }, { status: 400 })
    }

    const booking = getBookingById(id)
    if (!booking) {
      return NextResponse.json({ success: false, error: 'Booking not found' }, { status: 404 })
    }

    const updated = updateBooking(id, { note: body.text, author: body.author || 'Admin' })

    return NextResponse.json({ success: true, booking: updated })
  } catch (error) {
    console.error('Error adding booking note:', error)
    return NextResponse.json({ success: false, error: 'Failed to add note' }, { status: 500 })
  }
}
