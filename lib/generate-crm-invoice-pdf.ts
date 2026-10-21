import { jsPDF } from 'jspdf'

export interface CRMInvoicePDFData {
  invoiceNumber: string
  bookingId?: string
  date?: string
  customerName: string
  customerPhone: string
  customerEmail?: string
  tripTitle: string
  travelDates?: string
  guests?: number
  totalAmount: number
  advancePaid: number
  balanceDue: number
  paymentStatus: string
  paymentMode?: string
  upiId?: string
  bankDetails?: string
  specialNotes?: string
}

export function generateCRMInvoicePDF(data: CRMInvoicePDFData): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  })

  const pageWidth = doc.internal.pageSize.getWidth() // 210mm
  const margin = 16
  const contentWidth = pageWidth - margin * 2

  // Brand Palette
  const navy = [11, 41, 64] // #0b2940
  const emerald = [16, 185, 129] // #10b981
  const slateDark = [30, 41, 59] // #1e293b
  const slateMuted = [100, 116, 139] // #64748b
  const bgLight = [248, 250, 252] // #f8fafc

  let y = 16

  // 1. Header Banner
  doc.setFillColor(navy[0], navy[1], navy[2])
  doc.roundedRect(margin, y, contentWidth, 32, 3, 3, 'F')

  doc.setTextColor(255, 255, 255)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(20)
  doc.text('TRAVEL TRIBES', margin + 8, y + 14)

  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(186, 230, 253)
  doc.text('Boutique Small Group Adventures & Curated Expeditions', margin + 8, y + 22)
  doc.text('Website: traveltribes.in | Helpline: +91 99758 22023', margin + 8, y + 27)

  // Invoice Title on Right
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(255, 255, 255)
  doc.text('TRIP INVOICE', margin + contentWidth - 8, y + 14, { align: 'right' })

  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(226, 232, 240)
  doc.text(`No: ${data.invoiceNumber}`, margin + contentWidth - 8, y + 21, { align: 'right' })
  doc.text(
    `Date: ${data.date || new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}`,
    margin + contentWidth - 8,
    y + 27,
    { align: 'right' }
  )

  y += 38

  // 2. Bill To & Trip Summary Grid
  const colWidth = (contentWidth - 6) / 2
  const cardHeight = 36

  // Left Card: Customer Details
  doc.setFillColor(bgLight[0], bgLight[1], bgLight[2])
  doc.setDrawColor(226, 232, 240)
  doc.roundedRect(margin, y, colWidth, cardHeight, 2, 2, 'FD')

  doc.setFontSize(8)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(slateMuted[0], slateMuted[1], slateMuted[2])
  doc.text('INVOICED TO (CUSTOMER):', margin + 6, y + 7)

  doc.setFontSize(11)
  doc.setTextColor(slateDark[0], slateDark[1], slateDark[2])
  doc.text(data.customerName || 'Customer', margin + 6, y + 14)

  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.text(`Phone: ${data.customerPhone || 'N/A'}`, margin + 6, y + 21)
  doc.text(`Email: ${data.customerEmail || 'N/A'}`, margin + 6, y + 27)
  if (data.bookingId) {
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(emerald[0], emerald[1], emerald[2])
    doc.text(`Booking Ref: ${data.bookingId}`, margin + 6, y + 33)
  }

  // Right Card: Trip Details
  doc.setFillColor(bgLight[0], bgLight[1], bgLight[2])
  doc.setDrawColor(226, 232, 240)
  doc.roundedRect(margin + colWidth + 6, y, colWidth, cardHeight, 2, 2, 'FD')

  doc.setFontSize(8)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(slateMuted[0], slateMuted[1], slateMuted[2])
  doc.text('EXPEDITION DETAILS:', margin + colWidth + 12, y + 7)

  doc.setFontSize(10)
  doc.setTextColor(slateDark[0], slateDark[1], slateDark[2])
  const tripTitleLines = doc.splitTextToSize(data.tripTitle || 'Trip Package', colWidth - 14)
  doc.text(tripTitleLines, margin + colWidth + 12, y + 14)

  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.text(`Travel Dates: ${data.travelDates || 'Flexible / Upcoming'}`, margin + colWidth + 12, y + 24)
  doc.text(`Total Travellers: ${data.guests || 1} Person(s)`, margin + colWidth + 12, y + 30)

  y += cardHeight + 8

  // 3. Payment Breakdown Table
  doc.setFillColor(navy[0], navy[1], navy[2])
  doc.rect(margin, y, contentWidth, 8, 'F')

  doc.setFontSize(9)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(255, 255, 255)
  doc.text('ITEM / DESCRIPTION', margin + 6, y + 5.5)
  doc.text('AMOUNT (INR)', margin + contentWidth - 6, y + 5.5, { align: 'right' })

  y += 8

  // Row 1: Total Package Value
  doc.setFillColor(255, 255, 255)
  doc.rect(margin, y, contentWidth, 10, 'F')
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(slateDark[0], slateDark[1], slateDark[2])
  doc.text(`${data.tripTitle || 'Trip Package'} — ${data.guests || 1} Traveller(s)`, margin + 6, y + 6.5)
  doc.setFont('helvetica', 'bold')
  doc.text(`Rs. ${data.totalAmount.toLocaleString('en-IN')}`, margin + contentWidth - 6, y + 6.5, { align: 'right' })

  y += 10
  doc.setDrawColor(226, 232, 240)
  doc.line(margin, y, margin + contentWidth, y)

  // Row 2: Advance Paid
  doc.setFillColor(bgLight[0], bgLight[1], bgLight[2])
  doc.rect(margin, y, contentWidth, 10, 'F')
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(emerald[0], emerald[1], emerald[2])
  doc.text(`Amount Paid / Advance Received (${data.paymentMode || 'UPI / Bank'})`, margin + 6, y + 6.5)
  doc.text(`(-) Rs. ${data.advancePaid.toLocaleString('en-IN')}`, margin + contentWidth - 6, y + 6.5, { align: 'right' })

  y += 10
  doc.line(margin, y, margin + contentWidth, y)

  // Row 3: Total Balance Due
  const balanceBg = data.balanceDue > 0 ? [254, 242, 242] : [240, 253, 244]
  const balanceColor = data.balanceDue > 0 ? [185, 28, 28] : [21, 128, 61]
  doc.setFillColor(balanceBg[0], balanceBg[1], balanceBg[2])
  doc.rect(margin, y, contentWidth, 12, 'F')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.setTextColor(balanceColor[0], balanceColor[1], balanceColor[2])
  doc.text('TOTAL REMAINING BALANCE DUE:', margin + 6, y + 7.5)
  doc.text(`Rs. ${data.balanceDue.toLocaleString('en-IN')}`, margin + contentWidth - 6, y + 7.5, { align: 'right' })

  y += 18

  // 4. Bank / Payment Details Card
  if (data.balanceDue > 0) {
    doc.setFillColor(bgLight[0], bgLight[1], bgLight[2])
    doc.setDrawColor(186, 230, 253)
    doc.roundedRect(margin, y, contentWidth, 26, 2, 2, 'FD')

    doc.setFontSize(8)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(navy[0], navy[1], navy[2])
    doc.text('PAYMENT OPTIONS FOR REMAINING BALANCE:', margin + 6, y + 6)

    doc.setFontSize(9)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(slateDark[0], slateDark[1], slateDark[2])
    doc.text(`• UPI ID: ${data.upiId || 'traveltribes@upi'}`, margin + 6, y + 12)
    doc.text(
      `• Bank Transfer: ${data.bankDetails || 'HDFC Bank (A/C: 50200088992211, IFSC: HDFC0001234)'}`,
      margin + 6,
      y + 18
    )
    doc.setFontSize(8)
    doc.setTextColor(slateMuted[0], slateMuted[1], slateMuted[2])
    doc.text('(Please share transaction screenshot on WhatsApp once completed)', margin + 6, y + 23)

    y += 32
  } else {
    doc.setFillColor(240, 253, 244)
    doc.setDrawColor(187, 247, 208)
    doc.roundedRect(margin, y, contentWidth, 14, 2, 2, 'FD')
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(9)
    doc.setTextColor(21, 128, 61)
    doc.text('STATUS: FULL PAYMENT COMPLETED. TRIP SEATS ARE CONFIRMED!', margin + 6, y + 9)
    y += 20
  }

  // 5. Package Inclusions & Guidelines Box
  doc.setFillColor(bgLight[0], bgLight[1], bgLight[2])
  doc.setDrawColor(226, 232, 240)
  doc.roundedRect(margin, y, contentWidth, 24, 2, 2, 'FD')

  doc.setFontSize(8)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(navy[0], navy[1], navy[2])
  doc.text('STANDARD INCLUSIONS & ADVENTURE POLICIES:', margin + 6, y + 6)

  doc.setFontSize(8)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(slateDark[0], slateDark[1], slateDark[2])
  doc.text('• Curated boutique homestays / camps on sharing basis as per selected package.', margin + 6, y + 11)
  doc.text('• Experienced Trip Captain for 24/7 on-ground assistance and group activities.', margin + 6, y + 16)
  doc.text('• All internal transfers, sightseeing permits, and meals as mentioned in itinerary.', margin + 6, y + 21)

  y += 30

  // 6. Authorized Signoff & Footer
  doc.setFontSize(9)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(navy[0], navy[1], navy[2])
  doc.text('Travel Tribes Experiential Pvt Ltd', margin, y)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.setTextColor(slateMuted[0], slateMuted[1], slateMuted[2])
  doc.text('Registered Office: Mumbai, Maharashtra, India', margin, y + 5)
  doc.text('Helpline: +91 99758 22023 | Email: hello@traveltribes.in | traveltribes.in', margin, y + 10)

  doc.setFont('helvetica', 'italic')
  doc.setTextColor(navy[0], navy[1], navy[2])
  doc.text('Tribe hai to vibe hai! Small Groups. Big Adventures. 🚀', margin + contentWidth, y + 10, {
    align: 'right'
  })

  // Save the PDF
  const cleanName = (data.customerName || 'Customer').replace(/[^\w\s]/gi, '').replace(/\s+/g, '_')
  const fileName = `Travel_Tribes_Invoice_${data.invoiceNumber}_${cleanName}.pdf`
  doc.save(fileName)
}
