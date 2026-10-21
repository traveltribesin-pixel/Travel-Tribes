import { NextRequest, NextResponse } from 'next/server'
import { createBookingFromLead } from '@/lib/personal-crm-store'

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const cleanId = decodeURIComponent(id || '')
    const body = await req.json().catch(() => ({}))

    const result = createBookingFromLead(cleanId, {
      advancePaid: Number(body.advancePaid) || 0,
      totalAmount: Number(body.totalAmount) || 0,
      batchDate: body.batchDate,
      guests: Number(body.guests) || 1,
      paymentMode: body.paymentMode || 'UPI',
      transactionRef: body.transactionRef,
      specialRequest: body.specialRequest,
      notes: body.notes
    })

    if (!result) {
      return NextResponse.json(
        { success: false, error: `Lead not found for ID "${id}". Please refresh the page to load the latest leads.` },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Lead converted and transferred to Bookings module successfully',
      booking: result.booking,
      lead: result.lead,
      invoice: result.invoice
    })
  } catch (error: any) {
    console.error('Create booking from lead error:', error)
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to create booking' },
      { status: 500 }
    )
  }
}
