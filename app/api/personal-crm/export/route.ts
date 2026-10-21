import { NextRequest, NextResponse } from 'next/server'
import { loadPersonalCRMStore } from '@/lib/personal-crm-store'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const type = searchParams.get('type') || 'leads'
    const store = loadPersonalCRMStore()

    if (type === 'bookings') {
      const headers = [
        'Booking ID',
        'Customer Name',
        'Phone',
        'Email',
        'Trip Title',
        'Travel Batch Date',
        'Guests',
        'Total Amount (INR)',
        'Advance Paid (INR)',
        'Balance Due (INR)',
        'Payment Status',
        'Payment Mode',
        'Transaction Ref',
        'Booking Status',
        'Booking Date'
      ]

      const rows = store.bookings.map((b) => [
        `"${b.id}"`,
        `"${(b.fullName || '').replace(/"/g, '""')}"`,
        `"${(b.phone || '').replace(/"/g, '""')}"`,
        `"${(b.email || '').replace(/"/g, '""')}"`,
        `"${(b.tripTitle || '').replace(/"/g, '""')}"`,
        `"${(b.date || '').replace(/"/g, '""')}"`,
        `"${b.guests || 1}"`,
        `"${b.totalAmount || 0}"`,
        `"${b.paidAmount || 0}"`,
        `"${b.balanceDue || 0}"`,
        `"${b.paymentStatus || 'PENDING'}"`,
        `"${(b.paymentMode || 'UPI').replace(/"/g, '""')}"`,
        `"${(b.transactionRef || '').replace(/"/g, '""')}"`,
        `"${b.bookingStatus || 'CONFIRMED'}"`,
        `"${new Date(b.createdAt).toLocaleDateString('en-IN')}"`
      ])

      const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n')

      return new NextResponse(csvContent, {
        status: 200,
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': `attachment; filename="Travel_Tribes_Bookings_${new Date().toISOString().split('T')[0]}.csv"`
        }
      })
    }

    // Default: Export Leads
    const headers = [
      'Lead ID',
      'Full Name',
      'Phone',
      'Email',
      'Trip Destination',
      'Travel Dates',
      'Group Size',
      'Budget',
      'Source',
      'Status',
      'Priority',
      'Next Follow-up Date',
      'Customer Message',
      'Date Captured (IST)'
    ]

    const rows = store.leads.map((l) => [
      `"${l.id}"`,
      `"${(l.fullName || '').replace(/"/g, '""')}"`,
      `"${(l.phone || '').replace(/"/g, '""')}"`,
      `"${(l.email || '').replace(/"/g, '""')}"`,
      `"${(l.tripTitle || '').replace(/"/g, '""')}"`,
      `"${(l.travelDates || '').replace(/"/g, '""')}"`,
      `"${(l.groupSize || '').replace(/"/g, '""')}"`,
      `"${(l.budget || '').replace(/"/g, '""')}"`,
      `"${(l.source || '').replace(/"/g, '""')}"`,
      `"${l.status}"`,
      `"${l.priority}"`,
      `"${l.nextFollowUpDate || ''}"`,
      `"${(l.message || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`,
      `"${new Date(l.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}"`
    ])

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n')

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="Travel_Tribes_Leads_${new Date().toISOString().split('T')[0]}.csv"`
      }
    })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message }, { status: 500 })
  }
}
