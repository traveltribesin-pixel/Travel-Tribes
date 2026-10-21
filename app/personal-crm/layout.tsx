import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Travel Tribes — Personal CRM & Sales Operations',
  description: 'Enterprise personal CRM for Travel Tribes leads, bookings, tasks and automated invoices.',
}

export default function PersonalCRMLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#0b1329] text-slate-100 flex flex-col font-sans selection:bg-sky-500 selection:text-white">
      {children}
    </div>
  )
}
