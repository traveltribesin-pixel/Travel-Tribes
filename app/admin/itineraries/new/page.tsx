'use client'

import { ItineraryEditor } from '@/components/admin/itinerary-editor'

export default function NewItineraryPage() {
  return (
    <div className="space-y-6">
      <ItineraryEditor isNew={true} />
    </div>
  )
}
