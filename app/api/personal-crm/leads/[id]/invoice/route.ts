import { NextRequest, NextResponse } from 'next/server'
import {
  getPersonalCRMLeadById,
  generateInvoiceForLeadOrBooking
} from '@/lib/personal-crm-store'

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const lead = getPersonalCRMLeadById(id)
    if (!lead) {
      return NextResponse.json({ success: false, error: 'Lead not found' }, { status: 404 })
    }

    const body = await req.json().catch(() => ({}))

    const invoice = generateInvoiceForLeadOrBooking({
      leadId: lead.id,
      bookingId: lead.convertedBookingId,
      customerName: body.customerName || lead.fullName,
      phone: body.phone || lead.phone,
      email: body.email || lead.email,
      tripTitle: body.tripTitle || lead.tripTitle || 'Travel Tribes Trip',
      travelDates: body.travelDates || lead.travelDates || 'Flexible / Upcoming Batch',
      guests: Number(body.guests) || 1,
      totalAmount: Number(body.totalAmount) || 18000,
      advancePaid: Number(body.advancePaid) || 5000,
      customNotes: body.customNotes || lead.message || ''
    })

    return NextResponse.json({
      success: true,
      invoice,
      whatsappUrl: invoice.whatsappUrl,
      whatsappMessageText: invoice.whatsappMessageText
    })
  } catch (error: any) {
    console.error('Invoice generation error:', error)
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to generate invoice' },
      { status: 500 }
    )
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const lead = getPersonalCRMLeadById(id)
    if (!lead) {
      return NextResponse.json({ success: false, error: 'Lead not found' }, { status: 404 })
    }

    // Generate tentative / pre-filled invoice for this lead
    const invoice = generateInvoiceForLeadOrBooking({
      leadId: lead.id,
      bookingId: lead.convertedBookingId,
      customerName: lead.fullName,
      phone: lead.phone,
      email: lead.email,
      tripTitle: lead.tripTitle || 'Travel Tribes Trip',
      travelDates: lead.travelDates || 'Upcoming Batch',
      guests: 1,
      totalAmount: 18000,
      advancePaid: 5000,
      customNotes: lead.message || ''
    })

    return NextResponse.json({
      success: true,
      invoice,
      whatsappUrl: invoice.whatsappUrl,
      whatsappMessageText: invoice.whatsappMessageText
    })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message }, { status: 500 })
  }
}
