import { NextRequest, NextResponse } from 'next/server'
import {
  getPersonalCRMInvoices,
  generateInvoiceForLeadOrBooking
} from '@/lib/personal-crm-store'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status') || undefined
    const search = searchParams.get('search') || undefined

    const invoices = getPersonalCRMInvoices({ status, search })
    return NextResponse.json({ success: true, invoices, total: invoices.length })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null)
    if (!body || !body.customerName || !body.phone) {
      return NextResponse.json(
        { success: false, error: 'Customer name and phone are required' },
        { status: 400 }
      )
    }

    const invoice = generateInvoiceForLeadOrBooking({
      leadId: body.leadId,
      bookingId: body.bookingId,
      customerName: body.customerName,
      phone: body.phone,
      email: body.email,
      tripTitle: body.tripTitle || 'Custom Trip',
      travelDates: body.travelDates || 'Upcoming Batch',
      guests: Number(body.guests) || 1,
      totalAmount: Number(body.totalAmount) || 18000,
      advancePaid: Number(body.advancePaid) || 5000,
      customNotes: body.customNotes || ''
    })

    return NextResponse.json({ success: true, invoice })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message }, { status: 500 })
  }
}
