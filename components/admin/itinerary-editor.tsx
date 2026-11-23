'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowLeft,
  Save,
  Eye,
  Sparkles,
  Calendar,
  DollarSign,
  Image as ImageIcon,
  MapPin,
  CheckCircle2,
  XCircle,
  FileText,
  Layers,
  Upload,
  Plus,
  Trash2,
  AlertCircle,
  Search,
  Copy,
  Tag,
  Shield,
  Star,
  ExternalLink,
  ChevronRight,
  Globe,
  Sliders,
  Check
} from 'lucide-react'
import type { AdminTrip, TripPlacements } from '@/lib/trips-store'

interface ItineraryEditorProps {
  initialData?: AdminTrip | null
  isNew?: boolean
}

const TABS = [
  { id: 'basic', label: 'Basic Details', icon: FileText },
  { id: 'placements', label: 'Page & Section Placements', icon: Sliders },
  { id: 'dates', label: 'Batches & Dates', icon: Calendar },
  { id: 'packages', label: 'Pricing & Packages', icon: DollarSign },
  { id: 'media', label: 'Media & Brochure', icon: ImageIcon },
  { id: 'itinerary', label: 'Day-by-Day Plan', icon: MapPin },
  { id: 'inclusions', label: 'Highlights & Inclusions', icon: CheckCircle2 },
  { id: 'policies', label: 'Policies & Packing', icon: Shield },
  { id: 'seo', label: 'SEO & Testimonials', icon: Globe },
]

export function ItineraryEditor({ initialData, isNew = false }: ItineraryEditorProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('basic')
  const [saving, setSaving] = useState(false)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  // Core Form State
  const [formData, setFormData] = useState<Partial<AdminTrip>>(() => {
    if (initialData) return { ...initialData }
    return {
      title: '',
      slug: '',
      location: '',
      region: 'Domestic',
      duration: '4N/5D',
      price: '₹9,999',
      originalPrice: '₹12,999',
      tag: 'Backpacking Trip',
      spots: 'Available',
      bookingAmount: '₹4,000 / person',
      description: '',
      image: '/image/travel-tribes-og-group.jpg',
      alt: '',
      pdfUrl: '',
      thriviaEventId: '',
      status: 'published',
      dates: [],
      regularPackages: [
        { label: 'Ex-Station', price: '₹9,999 / person', note: 'Triple sharing' },
        { label: 'Non-AC Train', price: '₹10,999 / person', note: 'Triple sharing' },
        { label: '3AC Train', price: '₹12,999 / person', note: 'Triple sharing' },
      ],
      festivePackages: [],
      longWeekendPackages: [],
      doubleSharingRate: 1500,
      highlights: [],
      inclusions: [
        'Accommodation on triple/quad sharing basis',
        'Internal transportation as per itinerary',
        'Daily breakfasts included',
        'Certified Travel Tribes Captain throughout',
        'All permits, entry fees & parking charges'
      ],
      exclusions: [
        'Meals not mentioned under inclusions',
        'Personal expenses & shopping',
        '5% GST',
        'Any adventure activity not mentioned'
      ],
      thingsToCarry: [
        'Government Photo ID (Original & Photocopy)',
        'Comfortable footwear / trekking shoes',
        'Light cotton clothes and a warm layer for evenings',
        'Personal medicines and first aid',
        'Power bank & charging cables'
      ],
      policies: [
        'Booking advance is non-refundable upon cancellation.',
        'Rooms provided on triple sharing standard; double room upgrades available.',
        'Trip captain reserves the right to alter route in case of road blocks or force majeure.'
      ],
      itinerary: [
        {
          day: 1,
          title: 'Day 1: Arrival & Ice Breaking Games',
          activities: [
            'Arrive at destination and meet your fellow tribe members',
            'Check-in, freshen up and gather for ice-breaking session',
            'Evening stroll and welcome group dinner'
          ]
        }
      ],
      gallery: [],
      reviews: [],
      placements: {
        showOnHome: true,
        homeSection: 'upcoming',
        homeOrder: 10,
        showOnUpcoming: true,
        showOnDomestic: true,
        showOnInternational: false,
        showOnWeekend: false,
        showOnFestive: false,
        showOnCorporate: false,
        isFeatured: false
      },
      seoKeywords: []
    }
  })

  // Batch date input helper
  const [newDateText, setNewDateText] = useState('')
  const [newDateTag, setNewDateTag] = useState<'Regular' | 'Long Weekend' | 'Christmas Special' | 'New Year Special'>('Regular')
  const [newDateSoldOut, setNewDateSoldOut] = useState(false)

  // Highlights / Inclusions / Exclusions / Things to carry text helpers
  const [highlightsText, setHighlightsText] = useState(() => (formData.highlights || []).join('\n'))
  const [inclusionsText, setInclusionsText] = useState(() => (formData.inclusions || []).join('\n'))
  const [exclusionsText, setExclusionsText] = useState(() => (formData.exclusions || []).join('\n'))
  const [thingsToCarryText, setThingsToCarryText] = useState(() => (formData.thingsToCarry || []).join('\n'))
  const [policiesText, setPoliciesText] = useState(() => (formData.policies || []).join('\n'))
  const [seoKeywordsText, setSeoKeywordsText] = useState(() => (formData.seoKeywords || []).join(', '))

  // Helper for auto-generating slug
  const handleGenerateSlug = () => {
    if (!formData.title) return
    const autoSlug = formData.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '')
    setFormData((prev) => ({ ...prev, slug: autoSlug }))
  }

  // Handle Image Upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingImage(true)
    setMessage(null)

    try {
      const uploadFormData = new FormData()
      uploadFormData.append('file', file)

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData
      })

      const data = await res.json()
      if (data.success && data.url) {
        setFormData((prev) => ({ ...prev, image: data.url }))
        setMessage({ type: 'success', text: 'Image uploaded successfully!' })
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to upload image' })
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Image upload error' })
    } finally {
      setUploadingImage(false)
    }
  }

  // Add a Departure Batch
  const handleAddBatch = () => {
    if (!newDateText.trim()) return

    let batchString = newDateText.trim()
    let tagString = ''

    if (newDateSoldOut) {
      tagString = newDateTag === 'Christmas Special'
        ? 'Christmas Special - Sold Out'
        : newDateTag === 'New Year Special'
        ? 'New Year Special - Sold Out'
        : newDateTag === 'Long Weekend'
        ? 'Long Weekend - Sold Out'
        : 'Sold Out'
    } else if (newDateTag !== 'Regular') {
      tagString = newDateTag
    }

    if (tagString) {
      batchString = `${batchString} (${tagString})`
    }

    const currentDates = [...(formData.dates || [])]
    currentDates.push(batchString)

    setFormData((prev) => ({
      ...prev,
      dates: currentDates,
      date: prev.date || batchString
    }))

    setNewDateText('')
    setNewDateSoldOut(false)
    setNewDateTag('Regular')
  }

  const handleRemoveBatch = (index: number) => {
    const updated = (formData.dates || []).filter((_, i) => i !== index)
    setFormData((prev) => ({
      ...prev,
      dates: updated,
      date: updated[0] || 'Upcoming'
    }))
  }

  // Add / Remove Day in Itinerary
  const handleAddDay = () => {
    const currentItinerary = [...(formData.itinerary || [])]
    const nextDayNum = currentItinerary.length + 1
    currentItinerary.push({
      day: nextDayNum,
      title: `Day ${nextDayNum}: Sightseeing & Exploration`,
      activities: ['Breakfast at stay', 'Visit key attraction and exploration', 'Evening leisure & overnight stay']
    })
    setFormData((prev) => ({ ...prev, itinerary: currentItinerary }))
  }

  const handleRemoveDay = (dayIndex: number) => {
    const currentItinerary = (formData.itinerary || []).filter((_, i) => i !== dayIndex)
    // Re-index days
    const reindexed = currentItinerary.map((d, idx) => ({ ...d, day: idx + 1 }))
    setFormData((prev) => ({ ...prev, itinerary: reindexed }))
  }

  const handleDayTitleChange = (dayIndex: number, title: string) => {
    const currentItinerary = [...(formData.itinerary || [])]
    if (currentItinerary[dayIndex]) {
      currentItinerary[dayIndex].title = title
      setFormData((prev) => ({ ...prev, itinerary: currentItinerary }))
    }
  }

  const handleDayActivitiesChange = (dayIndex: number, text: string) => {
    const currentItinerary = [...(formData.itinerary || [])]
    if (currentItinerary[dayIndex]) {
      currentItinerary[dayIndex].activities = text
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean)
      setFormData((prev) => ({ ...prev, itinerary: currentItinerary }))
    }
  }

  // Packages management
  const handleAddPackage = (type: 'regular' | 'festive' | 'longWeekend') => {
    const key = type === 'regular' ? 'regularPackages' : type === 'festive' ? 'festivePackages' : 'longWeekendPackages'
    const list = [...(formData[key] || [])]
    list.push({ label: 'New Package', price: formData.price || '₹9,999 / person', note: 'Standard sharing' })
    setFormData((prev) => ({ ...prev, [key]: list }))
  }

  const handleRemovePackage = (type: 'regular' | 'festive' | 'longWeekend', index: number) => {
    const key = type === 'regular' ? 'regularPackages' : type === 'festive' ? 'festivePackages' : 'longWeekendPackages'
    const list = (formData[key] || []).filter((_, i) => i !== index)
    setFormData((prev) => ({ ...prev, [key]: list }))
  }

  const handlePackageChange = (
    type: 'regular' | 'festive' | 'longWeekend',
    index: number,
    field: 'label' | 'price' | 'note',
    value: string
  ) => {
    const key = type === 'regular' ? 'regularPackages' : type === 'festive' ? 'festivePackages' : 'longWeekendPackages'
    const list = [...(formData[key] || [])]
    if (list[index]) {
      list[index][field] = value
      setFormData((prev) => ({ ...prev, [key]: list }))
    }
  }

  // Gallery items management
  const [newGalleryImg, setNewGalleryImg] = useState('')
  const [newGalleryAlt, setNewGalleryAlt] = useState('')

  const handleAddGalleryItem = () => {
    if (!newGalleryImg.trim()) return
    const current = [...(formData.gallery || [])]
    current.push({ image: newGalleryImg.trim(), alt: newGalleryAlt.trim() || formData.title || 'Trip Photo' })
    setFormData((prev) => ({ ...prev, gallery: current }))
    setNewGalleryImg('')
    setNewGalleryAlt('')
  }

  const handleRemoveGalleryItem = (index: number) => {
    const current = (formData.gallery || []).filter((_, i) => i !== index)
    setFormData((prev) => ({ ...prev, gallery: current }))
  }

  // Placements toggle helper
  const handlePlacementToggle = (key: keyof TripPlacements) => {
    setFormData((prev) => ({
      ...prev,
      placements: {
        ...(prev.placements as TripPlacements),
        [key]: !prev.placements?.[key]
      }
    }))
  }

  // Save full itinerary
  const handleSave = async () => {
    setSaving(true)
    setMessage(null)

    try {
      // Parse multi-line texts into arrays
      const preparedData: Partial<AdminTrip> = {
        ...formData,
        highlights: highlightsText
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean),
        inclusions: inclusionsText
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean),
        exclusions: exclusionsText
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean),
        thingsToCarry: thingsToCarryText
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean),
        policies: policiesText
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean),
        seoKeywords: seoKeywordsText
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean)
      }

      if (!preparedData.title?.trim() || !preparedData.price?.trim()) {
        setMessage({ type: 'error', text: 'Please fill in both Trip Title and Starting Price.' })
        setSaving(false)
        return
      }

      const endpoint = isNew ? '/api/admin/itineraries' : `/api/admin/itineraries/${formData.id || formData.slug}`
      const method = isNew ? 'POST' : 'PUT'

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(preparedData)
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to save itinerary')
      }

      setMessage({ type: 'success', text: `Itinerary saved successfully!` })

      if (isNew && data.trip?.id) {
        setTimeout(() => {
          router.push(`/admin/itineraries/${data.trip.id}`)
        }, 1200)
      }
    } catch (err: any) {
      console.error(err)
      setMessage({ type: 'error', text: err.message || 'Error saving itinerary.' })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Sticky Top Action Bar */}
      <div className="sticky top-0 z-30 bg-[#0b2940]/90 backdrop-blur-md border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/itineraries"
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            title="Back to Itineraries"
          >
            <ArrowLeft size={18} />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-black text-white truncate max-w-[260px] sm:max-w-[420px]">
                {formData.title || (isNew ? 'Create New Itinerary' : 'Edit Itinerary')}
              </h1>
              <span
                className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                  formData.status === 'published'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                }`}
              >
                {formData.status}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              /itinerary/{formData.slug || 'slug-preview'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {!isNew && formData.slug && (
            <a
              href={`/itinerary/${formData.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 hover:text-white border border-slate-700 transition-colors"
            >
              <Eye size={14} className="text-[#00b4d8]" />
              <span className="hidden sm:inline">Preview on Site</span>
            </a>
          )}

          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#00b4d8] to-[#0096c7] hover:from-[#0096c7] hover:to-[#0077b6] text-white text-xs font-bold shadow-md shadow-[#00b4d8]/20 transition-all cursor-pointer disabled:opacity-50"
          >
            <Save size={15} />
            <span>{saving ? 'Saving...' : 'Save Itinerary'}</span>
          </button>
        </div>
      </div>

      {/* Alert Notification */}
      {message && (
        <div
          className={`p-4 rounded-xl border flex items-center justify-between gap-3 text-xs font-medium ${
            message.type === 'success'
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
              : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
          }`}
        >
          <div className="flex items-center gap-2">
            {message.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
            <span>{message.text}</span>
          </div>
          <button onClick={() => setMessage(null)} className="text-slate-400 hover:text-white">
            &times;
          </button>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 review-scroll">
        {TABS.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#00b4d8] text-slate-950 shadow-md shadow-[#00b4d8]/20 font-extrabold'
                  : 'bg-[#0b2940] text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <Icon size={14} className={isActive ? 'text-slate-950' : 'text-[#00b4d8]'} />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Tab 1: Basic Details */}
      {activeTab === 'basic' && (
        <div className="bg-[#0b2940] border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5">
          <h2 className="text-sm font-extrabold text-white flex items-center gap-2 uppercase tracking-wider text-[#00b4d8]">
            <FileText size={16} /> Core Trip Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Title */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Trip Title <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Vietnam Backpacking — 7N/8D"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00b4d8]"
              />
            </div>

            {/* Slug */}
            <div className="sm:col-span-2 flex flex-col sm:flex-row gap-2">
              <div className="flex-1">
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  URL Slug <span className="text-rose-400">*</span>
                </label>
                <div className="flex items-center bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white">
                  <span className="text-slate-500 select-none mr-1 font-mono">/itinerary/</span>
                  <input
                    type="text"
                    placeholder="vietnam-backpacking-7n8d"
                    value={formData.slug || ''}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="flex-1 bg-transparent border-none outline-none text-white font-mono placeholder:text-slate-500"
                  />
                </div>
              </div>
              <div className="sm:self-end">
                <button
                  type="button"
                  onClick={handleGenerateSlug}
                  className="w-full sm:w-auto px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
                >
                  Auto-Gen Slug
                </button>
              </div>
            </div>

            {/* Region */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Region / Type</label>
              <select
                value={formData.region || 'Domestic'}
                onChange={(e) => setFormData({ ...formData, region: e.target.value as any })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#00b4d8]"
              >
                <option value="Domestic">Domestic</option>
                <option value="International">International</option>
                <option value="Weekend">Weekend Getaway</option>
                <option value="Xmas & New Year">Xmas & New Year</option>
                <option value="Honeymoon">Honeymoon / Couple</option>
              </select>
            </div>

            {/* Duration */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Duration</label>
              <input
                type="text"
                placeholder="e.g. 7N/8D, 4N/5D, 2N/3D"
                value={formData.duration || ''}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00b4d8]"
              />
            </div>

            {/* Starting Price */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Starting Price <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. ₹59,999"
                value={formData.price || ''}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-emerald-400 font-bold placeholder:text-slate-500 focus:outline-none focus:border-[#00b4d8]"
              />
            </div>

            {/* Original / Strikethrough Price */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Original (Crossed) Price</label>
              <input
                type="text"
                placeholder="e.g. ₹64,999"
                value={formData.originalPrice || ''}
                onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-400 line-through placeholder:text-slate-500 focus:outline-none focus:border-[#00b4d8]"
              />
            </div>

            {/* Tag / Badge */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Card Tag / Pill</label>
              <input
                type="text"
                placeholder="e.g. Scotland of India, Best Seller, New Year Special"
                value={formData.tag || ''}
                onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00b4d8]"
              />
            </div>

            {/* Booking Advance Amount */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Booking Advance Amount</label>
              <input
                type="text"
                placeholder="e.g. ₹4,000 / person or ₹5,000 / person"
                value={formData.bookingAmount || ''}
                onChange={(e) => setFormData({ ...formData, bookingAmount: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00b4d8]"
              />
            </div>

            {/* Location / Route */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Location / Route Line</label>
              <input
                type="text"
                placeholder="e.g. Ho Chi Minh · Da Nang · Hoi An · Hanoi · Halong Bay"
                value={formData.location || ''}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00b4d8]"
              />
            </div>

            {/* Description */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Trip Description & Story</label>
              <textarea
                rows={4}
                placeholder="Detailed intro to the itinerary, highlights, vibe and why travellers should join this trip..."
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3.5 text-xs text-white leading-relaxed placeholder:text-slate-500 focus:outline-none focus:border-[#00b4d8]"
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Page & Section Placements */}
      {activeTab === 'placements' && (
        <div className="bg-[#0b2940] border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-extrabold text-white flex items-center gap-2 uppercase tracking-wider text-[#00b4d8]">
              <Sliders size={16} /> Page & Section Routing
            </h2>
            <span className="text-[11px] text-slate-400">
              Configure where this trip appears on the website
            </span>
          </div>

          {/* Visibility Status */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-white">Publishing Status</div>
              <div className="text-[11px] text-slate-400">
                Draft trips are only visible in admin panel; Published trips are live to travellers.
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, status: 'published' })}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                  formData.status === 'published'
                    ? 'bg-emerald-500 text-slate-950 font-black shadow-md shadow-emerald-500/20'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                Published
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, status: 'draft' })}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                  formData.status === 'draft'
                    ? 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/20'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                Draft
              </button>
            </div>
          </div>

          {/* Target Pages Switches */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 1. Home Page */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>🏠</span> Home Page (/)
                  </div>
                  <div className="text-[10px] text-slate-400">Display on homepage sections</div>
                </div>
                <input
                  type="checkbox"
                  checked={Boolean(formData.placements?.showOnHome)}
                  onChange={() => handlePlacementToggle('showOnHome')}
                  className="w-4 h-4 rounded text-[#00b4d8] focus:ring-0 cursor-pointer"
                />
              </div>

              {formData.placements?.showOnHome && (
                <div className="pt-2 border-t border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-semibold">Home Section:</span>
                    <select
                      value={formData.placements?.homeSection || 'upcoming'}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          placements: {
                            ...(formData.placements as TripPlacements),
                            homeSection: e.target.value as any
                          }
                        })
                      }
                      className="bg-slate-800 border border-slate-700 rounded-lg px-2 py-1 text-xs text-white"
                    >
                      <option value="upcoming">Upcoming Trips (Rail)</option>
                      <option value="international">International Trips (Rail)</option>
                      <option value="festive">Festive Specials</option>
                      <option value="trending">Trending Picks</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-semibold">Sort Weight:</span>
                    <input
                      type="number"
                      value={formData.placements?.homeOrder ?? 10}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          placements: {
                            ...(formData.placements as TripPlacements),
                            homeOrder: parseInt(e.target.value, 10) || 10
                          }
                        })
                      }
                      className="w-16 bg-slate-800 border border-slate-700 rounded-lg px-2 py-1 text-xs text-white text-right"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* 2. Upcoming Trips Page */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>📅</span> Upcoming Trips (/upcoming-trips)
                </div>
                <div className="text-[10px] text-slate-400">All scheduled group departures</div>
              </div>
              <input
                type="checkbox"
                checked={Boolean(formData.placements?.showOnUpcoming)}
                onChange={() => handlePlacementToggle('showOnUpcoming')}
                className="w-4 h-4 rounded text-[#00b4d8] focus:ring-0 cursor-pointer"
              />
            </div>

            {/* 3. Domestic Trips Page */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>🏔️</span> Domestic Trips (/domestic-trips)
                </div>
                <div className="text-[10px] text-slate-400">India backpacking & tours</div>
              </div>
              <input
                type="checkbox"
                checked={Boolean(formData.placements?.showOnDomestic)}
                onChange={() => handlePlacementToggle('showOnDomestic')}
                className="w-4 h-4 rounded text-[#00b4d8] focus:ring-0 cursor-pointer"
              />
            </div>

            {/* 4. International Trips Page */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>✈️</span> International Trips (/international-trips)
                </div>
                <div className="text-[10px] text-slate-400">Vietnam, Bali, Thailand, Sri Lanka</div>
              </div>
              <input
                type="checkbox"
                checked={Boolean(formData.placements?.showOnInternational)}
                onChange={() => handlePlacementToggle('showOnInternational')}
                className="w-4 h-4 rounded text-[#00b4d8] focus:ring-0 cursor-pointer"
              />
            </div>

            {/* 5. Weekend Getaways Page */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>🏕️</span> Weekend Getaways (/weekend-getaways)
                </div>
                <div className="text-[10px] text-slate-400">2-3 day escapes from Mumbai & Pune</div>
              </div>
              <input
                type="checkbox"
                checked={Boolean(formData.placements?.showOnWeekend)}
                onChange={() => handlePlacementToggle('showOnWeekend')}
                className="w-4 h-4 rounded text-[#00b4d8] focus:ring-0 cursor-pointer"
              />
            </div>

            {/* 6. Xmas & New Year Page */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>🎆</span> Xmas & New Year (/xmas-new-year)
                </div>
                <div className="text-[10px] text-slate-400">Festive countdown & holiday specials</div>
              </div>
              <input
                type="checkbox"
                checked={Boolean(formData.placements?.showOnFestive)}
                onChange={() => handlePlacementToggle('showOnFestive')}
                className="w-4 h-4 rounded text-[#00b4d8] focus:ring-0 cursor-pointer"
              />
            </div>

            {/* 7. Corporate & Custom Trips */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>🏢</span> Corporate & Custom Trips (/corporate-trips)
                </div>
                <div className="text-[10px] text-slate-400">Available as corporate retreat template</div>
              </div>
              <input
                type="checkbox"
                checked={Boolean(formData.placements?.showOnCorporate)}
                onChange={() => handlePlacementToggle('showOnCorporate')}
                className="w-4 h-4 rounded text-[#00b4d8] focus:ring-0 cursor-pointer"
              />
            </div>

            {/* 8. Featured Badge */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>⭐</span> Featured Trip
                </div>
                <div className="text-[10px] text-slate-400">Prioritize at top of categories</div>
              </div>
              <input
                type="checkbox"
                checked={Boolean(formData.placements?.isFeatured)}
                onChange={() => handlePlacementToggle('isFeatured')}
                className="w-4 h-4 rounded text-[#00b4d8] focus:ring-0 cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Batches & Dates */}
      {activeTab === 'dates' && (
        <div className="bg-[#0b2940] border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-extrabold text-white flex items-center gap-2 uppercase tracking-wider text-[#00b4d8]">
              <Calendar size={16} /> Departure Batches & Dates
            </h2>
            <span className="text-[11px] text-slate-400">
              {(formData.dates || []).length} active batches
            </span>
          </div>

          {/* Add New Batch Box */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-700/80 space-y-3">
            <div className="text-xs font-bold text-slate-300">Add New Departure Batch</div>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div className="sm:col-span-2">
                <input
                  type="text"
                  placeholder="e.g. 12 Dec – 17 Dec 2026 or Dec 24–28, 2026"
                  value={newDateText}
                  onChange={(e) => setNewDateText(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00b4d8]"
                />
              </div>
              <div>
                <select
                  value={newDateTag}
                  onChange={(e) => setNewDateTag(e.target.value as any)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00b4d8]"
                >
                  <option value="Regular">Regular Batch</option>
                  <option value="Long Weekend">Long Weekend (LW)</option>
                  <option value="Christmas Special">Christmas Special</option>
                  <option value="New Year Special">New Year Special</option>
                </select>
              </div>
              <div className="flex items-center justify-between gap-2">
                <label className="flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={newDateSoldOut}
                    onChange={(e) => setNewDateSoldOut(e.target.checked)}
                    className="w-4 h-4 rounded text-rose-500"
                  />
                  <span className="font-semibold text-rose-300">Sold Out</span>
                </label>
                <button
                  type="button"
                  onClick={handleAddBatch}
                  className="px-3 py-2 rounded-xl bg-[#00b4d8] hover:bg-[#0096c7] text-slate-950 font-bold text-xs flex items-center gap-1 transition-all cursor-pointer"
                >
                  <Plus size={14} /> Add
                </button>
              </div>
            </div>
          </div>

          {/* List of Existing Batches */}
          <div className="space-y-2">
            {(formData.dates || []).length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-xs bg-slate-900/50 rounded-xl border border-dashed border-slate-800">
                No departure batches added yet. Add one above!
              </div>
            ) : (
              (formData.dates || []).map((dateStr, idx) => {
                const isSoldOut = dateStr.toLowerCase().includes('sold out')
                const isFestive = dateStr.toLowerCase().includes('xmas') || dateStr.toLowerCase().includes('christmas') || dateStr.toLowerCase().includes('new year')
                const isLW = dateStr.toLowerCase().includes('long weekend') || dateStr.toLowerCase().includes('(lw)')

                return (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center font-bold text-slate-400 text-[10px]">
                        {idx + 1}
                      </div>
                      <span className="font-semibold text-white truncate">{dateStr}</span>
                      {isSoldOut && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-500/20 text-rose-400 border border-rose-500/30">
                          Sold Out
                        </span>
                      )}
                      {!isSoldOut && isFestive && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                          Festive Special
                        </span>
                      )}
                      {!isSoldOut && isLW && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-500/20 text-sky-400 border border-sky-500/30">
                          Long Weekend
                        </span>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveBatch(idx)}
                      className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                      title="Remove Date"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                )
              })
            )}
          </div>
        </div>
      )}

      {/* Tab 4: Pricing & Packages */}
      {activeTab === 'packages' && (
        <div className="space-y-6">
          {/* Regular Packages */}
          <div className="bg-[#0b2940] border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-extrabold text-white flex items-center gap-2 uppercase tracking-wider text-[#00b4d8]">
                  <DollarSign size={16} /> Regular Packages
                </h3>
                <p className="text-[11px] text-slate-400">Default transport or room sharing options</p>
              </div>
              <button
                type="button"
                onClick={() => handleAddPackage('regular')}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white border border-slate-700 flex items-center gap-1 cursor-pointer"
              >
                <Plus size={13} /> Add Package
              </button>
            </div>

            <div className="space-y-2.5">
              {(formData.regularPackages || []).map((pkg, idx) => (
                <div key={idx} className="grid grid-cols-1 sm:grid-cols-12 gap-2 bg-slate-900 p-3 rounded-xl border border-slate-800 items-center">
                  <div className="sm:col-span-4">
                    <input
                      type="text"
                      placeholder="Label (e.g. Non-AC Train)"
                      value={pkg.label}
                      onChange={(e) => handlePackageChange('regular', idx, 'label', e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <input
                      type="text"
                      placeholder="Price (e.g. ₹11,999 / person)"
                      value={pkg.price}
                      onChange={(e) => handlePackageChange('regular', idx, 'price', e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-emerald-400 font-bold"
                    />
                  </div>
                  <div className="sm:col-span-4">
                    <input
                      type="text"
                      placeholder="Note (e.g. Triple sharing)"
                      value={pkg.note || ''}
                      onChange={(e) => handlePackageChange('regular', idx, 'note', e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-300"
                    />
                  </div>
                  <div className="sm:col-span-1 flex justify-end">
                    <button
                      type="button"
                      onClick={() => handleRemovePackage('regular', idx)}
                      className="p-1.5 text-slate-400 hover:text-rose-400"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Festive Packages (Christmas & New Year) */}
          <div className="bg-[#0b2940] border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-extrabold text-white flex items-center gap-2 uppercase tracking-wider text-amber-400">
                  <Sparkles size={16} /> Festive Packages (Xmas & New Year)
                </h3>
                <p className="text-[11px] text-slate-400">Overrides regular prices on festive batches</p>
              </div>
              <button
                type="button"
                onClick={() => handleAddPackage('festive')}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white border border-slate-700 flex items-center gap-1 cursor-pointer"
              >
                <Plus size={13} /> Add Festive Tier
              </button>
            </div>

            <div className="space-y-2.5">
              {(formData.festivePackages || []).length === 0 ? (
                <div className="text-center p-4 text-xs text-slate-500 bg-slate-900/50 rounded-xl">
                  No festive override packages. Falls back to regular packages.
                </div>
              ) : (
                (formData.festivePackages || []).map((pkg, idx) => (
                  <div key={idx} className="grid grid-cols-1 sm:grid-cols-12 gap-2 bg-slate-900 p-3 rounded-xl border border-slate-800 items-center">
                    <div className="sm:col-span-4">
                      <input
                        type="text"
                        placeholder="Label (e.g. 3AC Train)"
                        value={pkg.label}
                        onChange={(e) => handlePackageChange('festive', idx, 'label', e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                      />
                    </div>
                    <div className="sm:col-span-3">
                      <input
                        type="text"
                        placeholder="Price (e.g. ₹13,499 / person)"
                        value={pkg.price}
                        onChange={(e) => handlePackageChange('festive', idx, 'price', e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-amber-400 font-bold"
                      />
                    </div>
                    <div className="sm:col-span-4">
                      <input
                        type="text"
                        placeholder="Note"
                        value={pkg.note || ''}
                        onChange={(e) => handlePackageChange('festive', idx, 'note', e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-300"
                      />
                    </div>
                    <div className="sm:col-span-1 flex justify-end">
                      <button
                        type="button"
                        onClick={() => handleRemovePackage('festive', idx)}
                        className="p-1.5 text-slate-400 hover:text-rose-400"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Double Sharing Supplement */}
          <div className="bg-[#0b2940] border border-slate-800 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-white">Double Sharing Room Supplement</div>
              <div className="text-[11px] text-slate-400">Additional amount per person for double occupancy private room</div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-semibold">+₹</span>
              <input
                type="number"
                value={formData.doubleSharingRate ?? 1500}
                onChange={(e) => setFormData({ ...formData, doubleSharingRate: parseInt(e.target.value, 10) || 0 })}
                className="w-24 bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white text-right font-bold"
              />
              <span className="text-xs text-slate-400">/ person</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Media & Brochure */}
      {activeTab === 'media' && (
        <div className="bg-[#0b2940] border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-6">
          <h2 className="text-sm font-extrabold text-white flex items-center gap-2 uppercase tracking-wider text-[#00b4d8]">
            <ImageIcon size={16} /> Hero Media, Brochure & Checkout
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Hero Image */}
            <div className="space-y-3 sm:col-span-2">
              <label className="block text-xs font-bold text-slate-300">
                Hero / Card Cover Image <span className="text-rose-400">*</span>
              </label>

              <div className="flex flex-col sm:flex-row items-start gap-4">
                {formData.image && (
                  <div className="relative w-36 h-24 rounded-xl overflow-hidden border border-slate-700 bg-slate-900 shrink-0">
                    <img
                      src={formData.image}
                      alt={formData.alt || 'Cover'}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="flex-1 space-y-2 w-full">
                  <input
                    type="text"
                    placeholder="Image URL (e.g. /image/Coorg/coorg_img.JPEG or https://...)"
                    value={formData.image || ''}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00b4d8]"
                  />

                  <div className="flex items-center gap-3">
                    <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 cursor-pointer">
                      <Upload size={13} className="text-[#00b4d8]" />
                      <span>{uploadingImage ? 'Uploading...' : 'Upload New Image'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                    <span className="text-[11px] text-slate-400">or enter direct path / CDN URL</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Alt Text */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Image Alt Text (SEO)</label>
              <input
                type="text"
                placeholder="Descriptive alt text for Google Image search..."
                value={formData.alt || ''}
                onChange={(e) => setFormData({ ...formData, alt: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00b4d8]"
              />
            </div>

            {/* Google Drive PDF Brochure Link */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Google Drive PDF Brochure Link
              </label>
              <input
                type="text"
                placeholder="https://drive.google.com/file/d/.../view"
                value={formData.pdfUrl || ''}
                onChange={(e) => setFormData({ ...formData, pdfUrl: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00b4d8]"
              />
            </div>

            {/* Thrivia Event ID */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Thrivia Checkout Event ID
              </label>
              <input
                type="text"
                placeholder="e.g. 6af32e5a9b85caba6f0cd0f5"
                value={formData.thriviaEventId || ''}
                onChange={(e) => setFormData({ ...formData, thriviaEventId: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white font-mono placeholder:text-slate-500 focus:outline-none focus:border-[#00b4d8]"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">
                Powers instant modal checkout via Thrivia checkout button
              </span>
            </div>
          </div>

          {/* Curated 3D Pictures Perfect Gallery */}
          <div className="pt-4 border-t border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-white">Pictures Perfect Photo Gallery</div>
                <div className="text-[10px] text-slate-400">Curated photo slider on the itinerary page</div>
              </div>
            </div>

            {/* Add Gallery Item Input */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-slate-900 p-3 rounded-xl border border-slate-700">
              <input
                type="text"
                placeholder="Photo URL (e.g. /image/Coorg/IMG_7410.JPEG)"
                value={newGalleryImg}
                onChange={(e) => setNewGalleryImg(e.target.value)}
                className="sm:col-span-2 bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder:text-slate-500"
              />
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Caption / Alt"
                  value={newGalleryAlt}
                  onChange={(e) => setNewGalleryAlt(e.target.value)}
                  className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder:text-slate-500"
                />
                <button
                  type="button"
                  onClick={handleAddGalleryItem}
                  className="px-3 py-1.5 rounded-lg bg-[#00b4d8] text-slate-950 font-bold text-xs"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Gallery Items Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {(formData.gallery || []).map((item, idx) => (
                <div key={idx} className="relative group rounded-xl overflow-hidden border border-slate-700 bg-slate-900 h-28">
                  <img src={item.image} alt={item.alt} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity p-2 flex flex-col justify-between text-[10px] text-white">
                    <p className="truncate">{item.alt}</p>
                    <button
                      type="button"
                      onClick={() => handleRemoveGalleryItem(idx)}
                      className="self-end p-1 text-rose-400 hover:text-rose-300"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 6: Day-by-Day Plan */}
      {activeTab === 'itinerary' && (
        <div className="bg-[#0b2940] border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-extrabold text-white flex items-center gap-2 uppercase tracking-wider text-[#00b4d8]">
                <MapPin size={16} /> Day-by-Day Itinerary Schedule
              </h2>
              <p className="text-[11px] text-slate-400">Add detailed activities for each day of the journey</p>
            </div>
            <button
              type="button"
              onClick={handleAddDay}
              className="px-3.5 py-2 rounded-xl bg-[#00b4d8] hover:bg-[#0096c7] text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md shadow-[#00b4d8]/20"
            >
              <Plus size={14} /> Add Next Day
            </button>
          </div>

          <div className="space-y-4">
            {(formData.itinerary || []).map((dayPlan, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="w-7 h-7 rounded-lg bg-[#00b4d8]/20 text-[#00b4d8] flex items-center justify-center font-black text-xs shrink-0">
                    D{dayPlan.day}
                  </span>
                  <input
                    type="text"
                    value={dayPlan.title}
                    onChange={(e) => handleDayTitleChange(idx, e.target.value)}
                    placeholder={`Day ${dayPlan.day} Title...`}
                    className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white font-bold"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveDay(idx)}
                    className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg"
                    title="Remove Day"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 font-semibold mb-1">
                    Day Activities (One per line):
                  </label>
                  <textarea
                    rows={3}
                    value={(dayPlan.activities || []).join('\n')}
                    onChange={(e) => handleDayActivitiesChange(idx, e.target.value)}
                    placeholder="Arrive at hotel and check-in&#10;Sunset viewpoint trek&#10;Group dinner and bonfire"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-xs text-white leading-relaxed placeholder:text-slate-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 7: Highlights & Inclusions */}
      {activeTab === 'inclusions' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Highlights */}
          <div className="bg-[#0b2940] border border-slate-800 rounded-2xl p-5 space-y-3 md:col-span-2">
            <h3 className="text-xs font-extrabold text-[#00b4d8] uppercase tracking-wider flex items-center gap-2">
              <Sparkles size={15} /> Trip Highlights (One per line)
            </h3>
            <textarea
              rows={4}
              value={highlightsText}
              onChange={(e) => setHighlightsText(e.target.value)}
              placeholder="Live coffee tasting session&#10;Sunrise trek at Mandalpatti Peak&#10;Beachside countdown celebration"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white leading-relaxed placeholder:text-slate-500"
            />
          </div>

          {/* Inclusions */}
          <div className="bg-[#0b2940] border border-slate-800 rounded-2xl p-5 space-y-3">
            <h3 className="text-xs font-extrabold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 size={15} /> Inclusions (One per line)
            </h3>
            <textarea
              rows={6}
              value={inclusionsText}
              onChange={(e) => setInclusionsText(e.target.value)}
              placeholder="Accommodation in certified stays&#10;Internal transportation&#10;Breakfasts included"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-emerald-200 leading-relaxed placeholder:text-slate-500"
            />
          </div>

          {/* Exclusions */}
          <div className="bg-[#0b2940] border border-slate-800 rounded-2xl p-5 space-y-3">
            <h3 className="text-xs font-extrabold text-rose-400 uppercase tracking-wider flex items-center gap-2">
              <XCircle size={15} /> Exclusions (One per line)
            </h3>
            <textarea
              rows={6}
              value={exclusionsText}
              onChange={(e) => setExclusionsText(e.target.value)}
              placeholder="Meals not specified&#10;Personal expenses & laundry&#10;5% GST"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-rose-200 leading-relaxed placeholder:text-slate-500"
            />
          </div>
        </div>
      )}

      {/* Tab 8: Policies & Packing */}
      {activeTab === 'policies' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Things to Carry */}
          <div className="bg-[#0b2940] border border-slate-800 rounded-2xl p-5 space-y-3">
            <h3 className="text-xs font-extrabold text-[#00b4d8] uppercase tracking-wider flex items-center gap-2">
              <Shield size={15} /> Things to Carry / Packing Checklist
            </h3>
            <textarea
              rows={8}
              value={thingsToCarryText}
              onChange={(e) => setThingsToCarryText(e.target.value)}
              placeholder="Valid Government Photo ID&#10;Comfortable shoes&#10;Warm jacket&#10;Power bank"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white leading-relaxed placeholder:text-slate-500"
            />
          </div>

          {/* Policies & Cancellation */}
          <div className="bg-[#0b2940] border border-slate-800 rounded-2xl p-5 space-y-3">
            <h3 className="text-xs font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-2">
              <AlertCircle size={15} /> Policies & Cancellation Terms
            </h3>
            <textarea
              rows={8}
              value={policiesText}
              onChange={(e) => setPoliciesText(e.target.value)}
              placeholder="Booking amount retained upon cancellation&#10;Confirmed ID required at check-in"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-amber-200 leading-relaxed placeholder:text-slate-500"
            />
          </div>
        </div>
      )}

      {/* Tab 9: SEO & Testimonials */}
      {activeTab === 'seo' && (
        <div className="bg-[#0b2940] border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5">
          <h2 className="text-sm font-extrabold text-white flex items-center gap-2 uppercase tracking-wider text-[#00b4d8]">
            <Globe size={16} /> SEO & Search Optimization
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">SEO Meta Description</label>
              <textarea
                rows={2}
                value={formData.seoDescription || ''}
                onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                placeholder="150-160 character description optimized for Google search results..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder:text-slate-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Target Keywords (Comma separated)
              </label>
              <input
                type="text"
                value={seoKeywordsText}
                onChange={(e) => setSeoKeywordsText(e.target.value)}
                placeholder="Vietnam tour, Vietnam backpacking, group trips India, Travel Tribes"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-slate-500"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
