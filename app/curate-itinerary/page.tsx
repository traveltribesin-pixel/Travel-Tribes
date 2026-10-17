'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Sparkles,
  Users,
  Calendar,
  Clock,
  MapPin,
  Car,
  Hotel,
  Plus,
  Trash2,
  Copy,
  Check,
  ExternalLink,
  PhoneCall,
  Compass,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  Luggage,
  CheckCircle2,
  XCircle,
  Eye,
  Send,
  Loader2,
  FileText,
  Building,
  Image as ImageIcon,
  RotateCcw
} from 'lucide-react'
import { trips } from '@/lib/travel-data'
import { slugify } from '@/lib/utils'
import {
  MEGHALAYA_CANVA_SEED,
  DEFAULT_BANK_ACCOUNT,
  DEFAULT_POINTS_TO_BE_NOTED,
  DEFAULT_WHY_TRAVEL_TRIBES
} from '@/lib/curated-itinerary-constants'
import type {
  CuratedItinerary,
  TripType,
  CityStay,
  HotelDetail,
  BankAccountDetails,
  DayItinerary,
  LocationGlimpse
} from '@/lib/curated-itinerary-constants'

const PRESET_BANNERS = [
  { label: 'Meghalaya / Cover', url: '/image/Meghalaya/IMG_0857.JPEG' },
  { label: 'Bali / Tropical', url: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1600&q=80' },
  { label: 'Spiti / Snow', url: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1600&q=80' },
  { label: 'Goa / Beaches', url: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1600&q=80' },
  { label: 'Rajasthan / Desert', url: 'https://images.unsplash.com/photo-1609137144822-0d12795ec254?auto=format&fit=crop&w=1600&q=80' },
  { label: 'Kashmir / Mountains', url: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1600&q=80' }
]

const GALLERY_PRESETS = [
  '/image/Meghalaya/IMG_1034.JPEG',
  '/image/Meghalaya/IMG_1048.JPEG',
  '/image/Meghalaya/IMG_1043.JPEG',
  '/image/Meghalaya/IMG_0857.JPEG',
  '/image/Meghalaya/IMG_1124.JPEG',
  '/image/Meghalaya/IMG_0884.JPEG',
  '/image/Meghalaya/IMG_1192.JPEG',
  '/image/Meghalaya/IMG_0974.JPEG',
  '/image/Meghalaya/IMG_1250.JPEG'
]

// Common 1-Click Fast Suggestions for Users
const SUBTITLE_PRESETS = ['BACKPACKING', 'ROAD TRIP', 'CUSTOM GETAWAY', 'WEEKEND ESCAPE', 'EXPEDITION']
const DURATION_PRESETS = ['3N/4D', '4N/5D', '5N/6D', '6N/7D', '7N/8D']
const ADVANCE_PRESETS = ['3000', '5000', '7500', '10000']

const POPULAR_DESTINATION_CHIPS = [
  { label: '⭐ Meghalaya (5N/6D)', isMeghalaya: true },
  { label: 'Hampi (4N/5D)', slug: 'hampi-backpacking' },
  { label: 'Spiti Valley (6N/7D)', slug: 'spiti-valley-backpacking' },
  { label: 'Gokarna & Dandeli (4N/5D)', slug: 'gokarna-dandeli-backpacking' },
  { label: 'Kerala (5N/6D)', slug: 'kerala-backpacking-trip' }
]

const COMMON_HIGHLIGHT_SUGGESTIONS = [
  'Double Decker Living Root Bridge & Rainbow Falls Trek',
  'Crystal-clear transparent Umngot River Boating in Dawki',
  'Scenic Riverside Camping with Bonfire & Acoustic Jam',
  'Nohkalikai Falls — India’s Tallest Plunge Waterfall (1,115 ft)',
  'Mawlynnong Village — Acclaimed as Cleanest Village in Asia',
  'Limestone formations of Mawsmai & Arwah Prehistoric Caves'
]

const COMMON_VEHICLE_PRESETS = [
  'Tempo Traveller (12-16 Seater)',
  'Force Urbania (Luxury 12S)',
  'Dedicated SUV / Innova Crysta',
  'Sedan (Swift Dzire / Etios)'
]

const COMMON_PICKUP_PRESETS = [
  'Guwahati Airport / Railway Station Included',
  'Delhi Majnu Ka Tilla (Kashmere Gate) Included',
  'Chandigarh Airport / Railway Station',
  'Srinagar Sheikh ul-Alam Airport Included',
  'Goa Dabolim / Mopa Airport Included'
]

const COMMON_HOTEL_CATEGORIES = [
  '3 Star Deluxe Hotel',
  '4 Star Luxury Resort',
  'Riverside Camps with Bonfire',
  'Boutique Heritage Homestay'
]

const COMMON_ROOM_TYPES = [
  'Deluxe Room with Breakfast',
  'Triple Sharing Deluxe Room',
  'Luxury Riverside Dome Tent',
  'Valley View Executive Room'
]

const COMMON_INCLUSIONS_PRESETS = [
  'All Transportation throughout the tour in private vehicle',
  'Accommodations in well-rated 3-star hotels / premium camps',
  'Daily Morning Breakfast as per schedule',
  'Dedicated Experience Trip Captain & Local Guide',
  'All Sightseeing, Entry Permits & Inner Line Permits',
  'Driver Allowances, Tolls, State Taxes & Parking'
]

const COMMON_EXCLUSIONS_PRESETS = [
  'Airfare / Train tickets to and from departure city',
  'Lunch, dinner or any unmentioned meals & beverages',
  'Water sports, boating charges & personal activities',
  'Personal expenses, room service, tips & laundry',
  '5% Government Goods and Service Tax (GST)',
  'Cost arising due to natural calamities or roadblocks'
]

const COMMON_TRAVEL_DISTANCES = [
  'Approx. 80-100 km | ~3 Hours Scenic Hill Drive',
  'Approx. 120-150 km | ~4.5 Hours Highway & Valley Drive',
  'Local Sightseeing & Short Nature Commute (~25 km)'
]

export default function CurateItineraryPage() {
  const meghalayaSeed = MEGHALAYA_CANVA_SEED

  const [tripType, setTripType] = useState<TripType>('group')

  // Form State: Basic / Cover
  const [title, setTitle] = useState(meghalayaSeed.title || 'MEGHALAYA')
  const [subtitle, setSubtitle] = useState(meghalayaSeed.subtitle || 'BACKPACKING')
  const [destination, setDestination] = useState(meghalayaSeed.destination || 'Meghalaya, Northeast India')
  const [duration, setDuration] = useState(meghalayaSeed.duration || '5N/6D')
  const [routeText, setRouteText] = useState(meghalayaSeed.routeText || 'Guwahati ➔ Shillong ➔ Cherrapunjee ➔ Dawki ➔ Guwahati')
  const [bannerImage, setBannerImage] = useState(meghalayaSeed.bannerImage || '/image/Meghalaya/IMG_0857.JPEG')
  const [overview, setOverview] = useState(meghalayaSeed.overview || '')
  const [customSlug, setCustomSlug] = useState('meghalaya-backpacking-trip')

  // Customized Trip specifics
  const [clientName, setClientName] = useState('Aarav & Priya Sharma')
  const [clientPhone, setClientPhone] = useState('+91 98201 12345')
  const [clientEmail, setClientEmail] = useState('aarav.sharma@example.com')
  const [travelDates, setTravelDates] = useState('15 Nov 2026 – 20 Nov 2026')
  const [groupVibe, setGroupVibe] = useState('Private Couple Getaway')

  // Group Trip specifics
  const [departureCity, setDepartureCity] = useState(meghalayaSeed.departureCity || 'Guwahati Airport / Station')
  const [groupSizeLimit, setGroupSizeLimit] = useState(meghalayaSeed.groupSizeLimit || '12 to 20 Travellers (Age 18-35)')
  const [batchDates, setBatchDates] = useState<string[]>(meghalayaSeed.batchDates || [
    'Oct 02 – Oct 07, 2026 (Long Weekend)',
    'Oct 16 – Oct 21, 2026',
    'Nov 06 – Nov 11, 2026'
  ])

  // Summary (Page 2): City Stays & Vehicle
  const [cityWiseStay, setCityWiseStay] = useState<CityStay[]>(
    meghalayaSeed.cityWiseStay || [
      { city: 'Shillong', nights: '2 Nights' },
      { city: 'Cherrapunji', nights: '2 Nights' },
      { city: 'Dawki / Shnongpdeng', nights: '1 Night' }
    ]
  )
  const [newCityName, setNewCityName] = useState('')
  const [newCityNights, setNewCityNights] = useState('1 Night')

  // 4 Trip Glimpse Photos (Displayed Below Summary on Page 2)
  const [locationGlimpses, setLocationGlimpses] = useState<LocationGlimpse[]>(
    meghalayaSeed.locationGlimpses?.slice(0, 4) || [
      { name: 'Umiam Lake', image: '/image/Meghalaya/IMG_1034.JPEG' },
      { name: 'Laitlum Canyons', image: '/image/Meghalaya/IMG_0884.JPEG' },
      { name: 'Double Decker Bridge', image: '/image/Meghalaya/IMG_0857.JPEG' },
      { name: 'Nohkalikai Falls', image: '/image/Meghalaya/IMG_1124.JPEG' }
    ]
  )

  const updateGlimpse = (index: number, field: 'name' | 'image', value: string) => {
    const updated = [...locationGlimpses]
    if (updated[index]) {
      updated[index] = { ...updated[index], [field]: value }
      setLocationGlimpses(updated)
    }
  }

  const autoFillGlimpsesFromDays = () => {
    if (!days || days.length === 0) return
    const list: LocationGlimpse[] = []
    days.slice(0, 4).forEach((d, idx) => {
      list.push({
        name: d.title ? d.title.replace(/^Day\s*\d+\s*[—–-]\s*/i, '').split('➔')[0].trim() : `Scenic Spot ${idx + 1}`,
        image: d.image || GALLERY_PRESETS[idx % GALLERY_PRESETS.length]
      })
    })
    while (list.length < 4) {
      list.push({
        name: `Scenic Spot ${list.length + 1}`,
        image: GALLERY_PRESETS[list.length % GALLERY_PRESETS.length]
      })
    }
    setLocationGlimpses(list)
  }

  // Transport
  const [vehicleType, setVehicleType] = useState(meghalayaSeed.transport?.vehicleType || 'Tempo Traveller / Force Urbania / Dedicated SUV')
  const [pickupDrop, setPickupDrop] = useState(meghalayaSeed.transport?.pickupDrop || 'Guwahati Airport / Railway Station Pickup & Drop Included')
  const [transportNote, setTransportNote] = useState(meghalayaSeed.transport?.note || 'Pick up and drop as per fixed timings.')

  // Highlights
  const [highlights, setHighlights] = useState<string[]>(meghalayaSeed.highlights || [])
  const [newHighlight, setNewHighlight] = useState('')

  // Day-Wise Schedule (Page 3 Onwards)
  const [days, setDays] = useState<DayItinerary[]>(meghalayaSeed.days || [])

  // Hotels Table (Page 4)
  const [hotels, setHotels] = useState<HotelDetail[]>(meghalayaSeed.hotels || [])
  const [newHotelCity, setNewHotelCity] = useState('')
  const [newHotelName, setNewHotelName] = useState('')
  const [newHotelCategory, setNewHotelCategory] = useState('3 Star Deluxe Hotel')
  const [newHotelNights, setNewHotelNights] = useState('2 Nights')
  const [newHotelRoom, setNewHotelRoom] = useState('Deluxe Room with Breakfast')

  // Inclusions & Exclusions
  const [inclusions, setInclusions] = useState<string[]>(meghalayaSeed.inclusions || [])
  const [newInclusion, setNewInclusion] = useState('')

  const [exclusions, setExclusions] = useState<string[]>(meghalayaSeed.exclusions || [])
  const [newExclusion, setNewExclusion] = useState('')

  // Costing & Pricing
  const [pricePerPerson, setPricePerPerson] = useState('20999')
  const [totalPackagePrice, setTotalPackagePrice] = useState('41998')
  const [numberOfGuests, setNumberOfGuests] = useState('2 Adults')
  const [tripleSharingPrice, setTripleSharingPrice] = useState(String(meghalayaSeed.quotation.tripleSharingPrice || 20999))
  const [doubleSharingPrice, setDoubleSharingPrice] = useState(String(meghalayaSeed.quotation.doubleSharingPrice || 22999))
  const [xmasTripleSharingPrice, setXmasTripleSharingPrice] = useState(String(meghalayaSeed.quotation.xmasTripleSharingPrice || 22999))
  const [xmasDoubleSharingPrice, setXmasDoubleSharingPrice] = useState(String(meghalayaSeed.quotation.xmasDoubleSharingPrice || 24499))
  const [advanceAmount, setAdvanceAmount] = useState(String(meghalayaSeed.quotation.advanceAmount || 5000))
  const [paymentTerms, setPaymentTerms] = useState(meghalayaSeed.quotation.paymentTerms || 'Confirm your booking with just ₹5,000/- token per seat and pay the rest later.')
  const [validUntil, setValidUntil] = useState(meghalayaSeed.quotation.validUntil || 'Book Before 30 days of the departure and get Early Bird Discounts')

  // Bank Account Details
  const [accountDetails, setAccountDetails] = useState<BankAccountDetails>(meghalayaSeed.accountDetails || DEFAULT_BANK_ACCOUNT)

  // Generator Action State
  const [isGenerating, setIsGenerating] = useState(false)
  const [publishedUrl, setPublishedUrl] = useState<string | null>(null)
  const [publishedSlug, setPublishedSlug] = useState<string | null>(null)
  const [copiedLink, setCopiedLink] = useState(false)

  // 1-Click Load Official Canva Meghalaya Template
  const loadMeghalayaTemplate = () => {
    const s = meghalayaSeed
    setTripType('group')
    setTitle(s.title)
    setSubtitle(s.subtitle || 'BACKPACKING')
    setDestination(s.destination)
    setDuration(s.duration)
    setRouteText(s.routeText || 'Guwahati ➔ Shillong ➔ Cherrapunjee ➔ Dawki ➔ Guwahati')
    setBannerImage(s.bannerImage)
    setOverview(s.overview)
    setCustomSlug('meghalaya-backpacking-trip')
    setDepartureCity(s.departureCity || 'Guwahati Airport / Station')
    setGroupSizeLimit(s.groupSizeLimit || '12 to 20 Travellers (Age 18-35)')
    setBatchDates(s.batchDates || [])
    setCityWiseStay(s.cityWiseStay || [])
    setLocationGlimpses(s.locationGlimpses?.slice(0, 4) || [])
    setHighlights(s.highlights || [])
    setHotels(s.hotels || [])
    setVehicleType(s.transport.vehicleType)
    setPickupDrop(s.transport.pickupDrop)
    setTransportNote(s.transport.note || '')
    setDays(s.days || [])
    setInclusions(s.inclusions || [])
    setExclusions(s.exclusions || [])
    setTripleSharingPrice(String(s.quotation.tripleSharingPrice || 20999))
    setDoubleSharingPrice(String(s.quotation.doubleSharingPrice || 22999))
    setXmasTripleSharingPrice(String(s.quotation.xmasTripleSharingPrice || 22999))
    setXmasDoubleSharingPrice(String(s.quotation.xmasDoubleSharingPrice || 24499))
    setAdvanceAmount(String(s.quotation.advanceAmount || 5000))
    setAccountDetails(s.accountDetails || DEFAULT_BANK_ACCOUNT)
  }

  const loadMeghalayaHotels = () => {
    setHotels(meghalayaSeed.hotels || [])
  }

  // Preload from another catalog trip
  const handlePreloadTrip = (tripSlug: string) => {
    const found = trips.find(t => t.slug === tripSlug)
    if (!found) return

    setTitle(found.title.toUpperCase())
    setSubtitle(tripType === 'customized' ? 'CUSTOM GETAWAY' : 'BACKPACKING')
    setDestination(found.location)
    setDuration(found.duration)
    setRouteText(`${found.location.split(',')[0]} Circuit`)
    if (found.image) setBannerImage(found.image)
    if (found.description) setOverview(found.description)

    if (found.highlights && found.highlights.length > 0) {
      setHighlights(found.highlights)
    }

    if (found.itinerary && found.itinerary.length > 0) {
      const generatedDays = found.itinerary.map((item, itemIdx) => {
        const rawActivities = (item as any).activities
        const rawDesc = (item as any).description
        let points: string[] = []
        if (Array.isArray(rawActivities) && rawActivities.length > 0) {
          points = rawActivities
        } else if (typeof rawDesc === 'string' && rawDesc) {
          points = rawDesc.split('. ').filter(Boolean)
        } else {
          points = [`Explore ${item.title}`]
        }

        return {
          day: item.day,
          title: item.title,
          date: `Day ${item.day}`,
          travelDistance: 'Approx. 80-120 km | ~3-4 Hours Scenic Drive',
          points,
          meals: (item as any).meals ? (item as any).meals.split(',').map((m: string) => m.trim()) : ['Breakfast'],
          stayHotel: (item as any).stay || 'Standard Hotel Stay',
          stayCity: found.location.split('·')[0].split(',')[0].trim(),
          stay: (item as any).stay || `Overnight Stay`,
          image: found.gallery?.[itemIdx % (found.gallery?.length || 1)]?.image || found.image || GALLERY_PRESETS[itemIdx % GALLERY_PRESETS.length]
        }
      })
      setDays(generatedDays)

      // Auto-populate 4 glimpse photos from the first 4 days
      setLocationGlimpses(
        generatedDays.slice(0, 4).map((d, i) => ({
          name: d.title ? d.title.replace(/^Day\s*\d+\s*[—–-]\s*/i, '').split('➔')[0].trim() : `Scenic Spot ${i + 1}`,
          image: d.image || GALLERY_PRESETS[i % GALLERY_PRESETS.length]
        }))
      )
    }

    if (found.inclusions && found.inclusions.length > 0) setInclusions(found.inclusions)
    if (found.exclusions && found.exclusions.length > 0) setExclusions(found.exclusions)

    if (found.price) {
      const numPrice = found.price.replace(/[^\d]/g, '')
      if (numPrice) {
        setTripleSharingPrice(numPrice)
        setDoubleSharingPrice(String(Number(numPrice) + 2000))
        setPricePerPerson(numPrice)
      }
    }

    setCustomSlug(slugify(tripType === 'customized' ? `${clientName}-${found.location.split(',')[0]}` : found.title))
  }

  // City-Wise Stay Management
  const addCityStay = () => {
    if (!newCityName.trim()) return
    setCityWiseStay([...cityWiseStay, { city: newCityName.trim(), nights: newCityNights.trim() }])
    setNewCityName('')
  }

  const removeCityStay = (idx: number) => {
    setCityWiseStay(cityWiseStay.filter((_, i) => i !== idx))
  }

  // Day Management
  const addDay = () => {
    const nextDayNum = days.length + 1
    setDays([
      ...days,
      {
        day: nextDayNum,
        title: `Day ${nextDayNum} — Sightseeing & Adventure`,
        date: `Day ${nextDayNum}`,
        travelDistance: 'Approx. 80 km | ~3 Hours Scenic Drive',
        points: ['Enjoy delicious morning breakfast.', 'Proceed for local exploration and photography.', 'Return to the stay by evening.'],
        meals: ['Breakfast'],
        stayHotel: 'Hotel Stay',
        stayCity: destination.split(',')[0] || 'City',
        stay: 'Overnight Stay',
        image: GALLERY_PRESETS[(nextDayNum - 1) % GALLERY_PRESETS.length]
      }
    ])
  }

  const removeDay = (index: number) => {
    if (days.length <= 1) return
    const updated = days.filter((_, i) => i !== index).map((d, i) => ({ ...d, day: i + 1 }))
    setDays(updated)
  }

  const updateDayField = (index: number, field: keyof DayItinerary, value: any) => {
    const updated = [...days]
    updated[index] = { ...updated[index], [field]: value }
    setDays(updated)
  }

  // Hotel Table Management
  const addHotel = () => {
    if (!newHotelName.trim() || !newHotelCity.trim()) return
    setHotels([
      ...hotels,
      {
        id: `h-${Date.now().toString().slice(-4)}`,
        city: newHotelCity.trim(),
        hotelName: newHotelName.trim(),
        starRating: newHotelCategory.trim(),
        nights: newHotelNights.trim(),
        roomType: newHotelRoom.trim()
      }
    ])
    setNewHotelCity('')
    setNewHotelName('')
  }

  const removeHotel = (id: string) => {
    setHotels(hotels.filter(h => h.id !== id))
  }

  // Submit & Publish
  const handleGenerate = async () => {
    try {
      setIsGenerating(true)
      const payload: Partial<CuratedItinerary> = {
        slug: customSlug || slugify(title),
        tripType,
        title,
        subtitle,
        destination,
        duration,
        routeText,
        bannerImage,
        overview,
        cityWiseStay,
        highlights,
        locationGlimpses: locationGlimpses,
        hotels,
        transport: {
          vehicleType,
          pickupDrop,
          includedFeatures: meghalayaSeed.transport?.includedFeatures || [
            'Entire transportation as per itinerary on private basis',
            'Experienced local hill chauffeur with fuel, tolls & parking included'
          ],
          note: transportNote
        },
        days,
        inclusions,
        exclusions,
        quotation: {
          pricePerPerson: pricePerPerson ? Number(pricePerPerson) : undefined,
          totalPackagePrice: totalPackagePrice ? Number(totalPackagePrice) : undefined,
          numberOfGuests: numberOfGuests || undefined,
          tripleSharingPrice: tripleSharingPrice ? Number(tripleSharingPrice) : undefined,
          doubleSharingPrice: doubleSharingPrice ? Number(doubleSharingPrice) : undefined,
          xmasTripleSharingPrice: xmasTripleSharingPrice ? Number(xmasTripleSharingPrice) : undefined,
          xmasDoubleSharingPrice: xmasDoubleSharingPrice ? Number(xmasDoubleSharingPrice) : undefined,
          advanceAmount: advanceAmount ? Number(advanceAmount) : undefined,
          paymentTerms,
          validUntil
        },
        accountDetails,
        pointsToBeNoted: DEFAULT_POINTS_TO_BE_NOTED,
        whyTravelTribes: DEFAULT_WHY_TRAVEL_TRIBES
      }

      if (tripType === 'customized') {
        payload.clientName = clientName
        payload.clientPhone = clientPhone
        payload.clientEmail = clientEmail
        payload.travelDates = travelDates
        payload.groupVibe = groupVibe
      } else {
        payload.departureCity = departureCity
        payload.groupSizeLimit = groupSizeLimit
        payload.batchDates = batchDates
        payload.tripCaptainIncluded = true
      }

      const res = await fetch('/api/curated-itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const data = await res.json()
      if (data.success) {
        setPublishedSlug(data.slug)
        setPublishedUrl(data.url)
      } else {
        alert(data.error || 'Failed to curate itinerary')
      }
    } catch (err) {
      console.error('Error generating itinerary:', err)
      alert('Network error while saving itinerary.')
    } finally {
      setIsGenerating(false)
    }
  }

  const copyPublishedLink = () => {
    if (!publishedUrl) return
    const full = `${window.location.origin}${publishedUrl}`
    navigator.clipboard.writeText(full)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2500)
  }

  const waShareUrl = publishedUrl
    ? `https://wa.me/${(clientPhone || '919975822023').replace(/[^\d]/g, '')}?text=${encodeURIComponent(
        `Hi! 👋 Here is your official Travel Tribes itinerary for *${title}* (${duration}):\n\n🔗 ${window.location.origin}${publishedUrl}\n\nPlease check the day-wise itinerary, hotels, and commercials. You can also print or download as PDF directly from this link!`
      )}`
    : ''

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-28">
      {/* Top Sticky Header */}
      <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 py-3.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors text-xs font-semibold">
              ← CRM Dashboard
            </Link>
            <div>
              <h1 className="font-extrabold text-base tracking-tight text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#ffde59]" />
                Canva Itinerary Studio
              </h1>
              <p className="text-[11px] text-slate-400">Fast dynamic itinerary curation matching the exact client layout</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#ffde59] to-amber-400 hover:brightness-110 text-slate-950 font-black text-xs shadow-lg shadow-amber-400/20 transition-all hover:scale-105 disabled:opacity-50"
            >
              {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              <span>Generate Itinerary Link</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-2.5 sm:px-6 pt-4 sm:pt-8 space-y-5 sm:space-y-8">
        {/* Quick Preload Action Bar */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-sky-950/40 border border-slate-800 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-black text-[#ffde59] uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                1-Click Quick Destination Starters
              </span>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Kisi bhi popular trip ko 1 click me load karke easily edit ya customize karein
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-400 font-semibold shrink-0">Or clone catalog trip:</span>
              <select
                onChange={(e) => {
                  if (e.target.value) handlePreloadTrip(e.target.value)
                }}
                defaultValue=""
                className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-[#00b4d8]"
              >
                <option value="" disabled>Select catalog trip...</option>
                {trips.map((t) => (
                  <option key={t.slug} value={t.slug}>
                    {t.title} ({t.duration})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800/80">
            {POPULAR_DESTINATION_CHIPS.map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  if (chip.isMeghalaya) {
                    loadMeghalayaTemplate()
                  } else if (chip.slug) {
                    handlePreloadTrip(chip.slug)
                  }
                }}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-[#00b4d8] text-slate-200 hover:text-slate-950 text-xs font-bold border border-slate-700 transition-all hover:scale-102 flex items-center gap-1.5 shadow-sm"
              >
                <Sparkles className="w-3 h-3 text-[#ffde59]" />
                <span>{chip.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 1. Trip Type Switcher */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            1. Select Trip Format
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => {
                setTripType('group')
                setSubtitle('BACKPACKING')
                setCustomSlug(slugify(title))
              }}
              className={`p-5 rounded-2xl border text-left transition-all ${
                tripType === 'group'
                  ? 'bg-gradient-to-br from-slate-900 to-amber-950/20 border-[#ffde59] shadow-lg shadow-amber-400/10'
                  : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-white flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#ffde59]" />
                  Group Trip (Fixed Departures & Sharing Rates)
                </span>
                {tripType === 'group' && <span className="w-2.5 h-2.5 rounded-full bg-[#ffde59]" />}
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Matches the Canva PDF: Triple & Double Sharing, Xmas/NY pricing, fixed batch dates, book now button.
              </p>
            </button>

            <button
              type="button"
              onClick={() => {
                setTripType('customized')
                setSubtitle('CUSTOM GETAWAY')
                setCustomSlug(slugify(`${clientName}-${destination.split(',')[0]}-trip`))
              }}
              className={`p-5 rounded-2xl border text-left transition-all ${
                tripType === 'customized'
                  ? 'bg-gradient-to-br from-slate-900 to-sky-950/40 border-[#00b4d8] shadow-lg shadow-[#00b4d8]/10'
                  : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#00b4d8]" />
                  Customized / Private Trip (Tailored for Client)
                </span>
                {tripType === 'customized' && <span className="w-2.5 h-2.5 rounded-full bg-[#00b4d8]" />}
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                For a private family, couple or corporate group. Shows personalized client name banner, custom quote & dates.
              </p>
            </button>
          </div>
        </div>

        {/* 2. Client Proposal Info (If Customized) */}
        {tripType === 'customized' && (
          <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-[#00b4d8] uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              Client Proposal Info
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">Client / Lead Name *</label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => {
                    setClientName(e.target.value)
                    setCustomSlug(slugify(`${e.target.value}-${destination.split(',')[0]}`))
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">Client WhatsApp Phone</label>
                <input
                  type="text"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">Travel Dates</label>
                <input
                  type="text"
                  value={travelDates}
                  onChange={(e) => setTravelDates(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white"
                />
              </div>
            </div>
          </div>
        )}

        {/* 3. Cover & Intro Page (Page 1) */}
        <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#ffde59] uppercase tracking-wider">
              <Compass className="w-4 h-4" />
              Cover Page & Basic Details (Page 1)
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Ye details Canva PDF template ke main cover page par bold typography me show hoti hain.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="sm:col-span-2">
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                Main Destination Title (Yellow text) *
                <span className="text-[10px] text-slate-500 font-normal ml-1.5">(e.g. MEGHALAYA)</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value)
                  if (tripType === 'group') setCustomSlug(slugify(e.target.value))
                }}
                placeholder="e.g. MEGHALAYA"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white font-black"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Subtitle (White text)
              </label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="e.g. BACKPACKING"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white font-bold"
              />
              <div className="flex flex-wrap gap-1 mt-1.5">
                {SUBTITLE_PRESETS.map((sub, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSubtitle(sub)}
                    className={`text-[9px] px-1.5 py-0.5 rounded font-bold transition-colors ${
                      subtitle === sub
                        ? 'bg-[#00b4d8] text-slate-950'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Duration (Yellow badge) *
              </label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g. 5N/6D"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white font-bold"
              />
              <div className="flex flex-wrap gap-1 mt-1.5">
                {DURATION_PRESETS.map((dur, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setDuration(dur)}
                    className={`text-[9px] px-1.5 py-0.5 rounded font-bold transition-colors ${
                      duration === dur
                        ? 'bg-[#ffde59] text-slate-950'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {dur}
                  </button>
                ))}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                Cover Circuit Route (Bottom white text)
                <span className="text-[10px] text-slate-500 font-normal ml-1.5">(Arrow format me route circuit)</span>
              </label>
              <input
                type="text"
                value={routeText}
                onChange={(e) => setRouteText(e.target.value)}
                placeholder="e.g. Guwahati ➔ Shillong ➔ Cherrapunjee ➔ Dawki ➔ Guwahati"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                Shareable Link Slug (/itinerary/<strong className="text-[#00b4d8]">{customSlug}</strong>)
              </label>
              <input
                type="text"
                value={customSlug}
                onChange={(e) => setCustomSlug(slugify(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-[#00b4d8] font-mono"
              />
            </div>

            <div className="md:col-span-4">
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">Cover Banner Image URL</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {PRESET_BANNERS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setBannerImage(preset.url)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium border ${
                      bannerImage === preset.url
                        ? 'bg-[#00b4d8]/20 border-[#00b4d8] text-[#00b4d8]'
                        : 'bg-slate-800 border-slate-700 text-slate-300'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
              <input
                type="text"
                value={bannerImage}
                onChange={(e) => setBannerImage(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300"
              />
            </div>
          </div>
        </div>

        {/* 4. Trip Summary, Vehicle & 4 Trip Photos (Page 2) */}
        <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#00b4d8] uppercase tracking-wider">
              <Clock className="w-4 h-4" />
              Trip Summary: Vehicle, Stays, Route & 4 Photos (Page 2)
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Ye details Page 2 ke structured summary panel aur uske neeche 4 images me show hoti hain.
            </p>
          </div>

          {/* Vehicle and Pickup details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Allotted Vehicle & Transit *</label>
              <input
                type="text"
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                placeholder="e.g. Tempo Traveller / Force Urbania / Dedicated SUV"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
              />
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {COMMON_VEHICLE_PRESETS.map((v, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setVehicleType(v)}
                    className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
                  >
                    + {v.split(' ')[0]} {v.split(' ')[1]}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Pickup & Drop Location *</label>
              <input
                type="text"
                value={pickupDrop}
                onChange={(e) => setPickupDrop(e.target.value)}
                placeholder="e.g. Guwahati Airport / Railway Station Pickup & Drop Included"
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
              />
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {COMMON_PICKUP_PRESETS.map((p, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setPickupDrop(p)}
                    className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
                  >
                    + {p.split(' ')[0]} {p.split(' ')[1]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* City-Wise Stay Breakdown */}
          <div className="pt-2 border-t border-slate-800/80 space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#ffde59] uppercase tracking-wider block">
                City-Wise Stay Breakdown (Nights in each city)
              </label>
              <span className="text-[10px] text-slate-400">Total Cities: {cityWiseStay.length}</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {cityWiseStay.map((stay, idx) => (
                <div key={idx} className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                  <span className="font-bold text-white">{stay.city}:</span>
                  <span className="text-[#00b4d8] font-bold">{stay.nights}</span>
                  <button type="button" onClick={() => removeCityStay(idx)} className="text-slate-500 hover:text-rose-400 ml-1">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 pt-1 max-w-lg">
              <input
                type="text"
                value={newCityName}
                onChange={(e) => setNewCityName(e.target.value)}
                placeholder="City Name (e.g. Shillong)"
                className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
              />
              <input
                type="text"
                value={newCityNights}
                onChange={(e) => setNewCityNights(e.target.value)}
                placeholder="Nights (e.g. 2 Nights)"
                className="w-32 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
              />
              <button
                type="button"
                onClick={addCityStay}
                className="px-3.5 py-2 rounded-xl bg-[#00b4d8] text-slate-950 font-bold text-xs shrink-0"
              >
                Add City
              </button>
            </div>
          </div>

          {/* 4 Trip Glimpse Photos (Showcase below Summary on Page 2) */}
          <div className="pt-3 border-t border-slate-800/80 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <label className="text-xs font-bold text-[#ffde59] uppercase tracking-wider block">
                  4 Trip Showcase Photos (Displayed Below Summary on Page 2)
                </label>
                <p className="text-[11px] text-slate-400">
                  Mobile view me trip summary ke turant neeche 2x2 grid me 4 photos dikhengi (Click karne par zoom preview khulega)
                </p>
              </div>
              <button
                type="button"
                onClick={autoFillGlimpsesFromDays}
                className="self-start sm:self-auto px-3 py-1.5 rounded-xl bg-amber-400/20 border border-amber-400/40 text-[#ffde59] text-xs font-bold hover:bg-amber-400/30 flex items-center gap-1.5 transition-colors"
                title="Automatically use photos from Day 1 to 4"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>⚡ Auto-Fill From Days</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {locationGlimpses.map((glimpse, gIdx) => (
                <div key={gIdx} className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-[#00b4d8]">Photo {gIdx + 1}</span>
                    {glimpse.image && (
                      <span className="text-[10px] text-emerald-400 flex items-center gap-0.5">
                        <Check className="w-3 h-3" /> Ready
                      </span>
                    )}
                  </div>

                  {/* Thumbnail Preview */}
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
                    {glimpse.image ? (
                      <Image
                        src={glimpse.image}
                        alt={glimpse.name || `Photo ${gIdx + 1}`}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-slate-600 text-xs">
                        No image
                      </div>
                    )}
                    <div className="absolute inset-x-0 bottom-0 bg-black/75 p-1 text-[10px] text-white text-center font-bold truncate">
                      {glimpse.name || `Photo ${gIdx + 1}`}
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 font-semibold block mb-0.5">Place Name</label>
                    <input
                      type="text"
                      value={glimpse.name}
                      onChange={(e) => updateGlimpse(gIdx, 'name', e.target.value)}
                      placeholder="e.g. Umiam Lake"
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 font-semibold block mb-0.5">Image URL</label>
                    <input
                      type="text"
                      value={glimpse.image}
                      onChange={(e) => updateGlimpse(gIdx, 'image', e.target.value)}
                      placeholder="/image/Meghalaya/... or https://"
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300 font-mono"
                    />
                  </div>

                  {/* Quick Preset Buttons */}
                  <div className="flex flex-wrap gap-1 pt-0.5">
                    {GALLERY_PRESETS.slice(0, 4).map((pImg, pIdx) => (
                      <button
                        key={pIdx}
                        type="button"
                        onClick={() => updateGlimpse(gIdx, 'image', pImg)}
                        className={`text-[9px] px-1.5 py-0.5 rounded border ${
                          glimpse.image === pImg
                            ? 'bg-[#00b4d8]/20 border-[#00b4d8] text-[#00b4d8]'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        P{pIdx + 1}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Structured Highlights */}
          <div className="pt-3 border-t border-slate-800/80 space-y-2">
            <label className="text-xs font-bold text-[#00b4d8] uppercase tracking-wider block">
              Structured Highlights ({highlights.length} Items)
            </label>
            <div className="space-y-1.5 max-h-56 overflow-y-auto pr-2">
              {highlights.map((h, idx) => (
                <div key={idx} className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-xs text-slate-200 leading-snug"><strong className="text-[#ffde59]">{idx + 1}.</strong> {h}</span>
                  <button type="button" onClick={() => setHighlights(highlights.filter((_, i) => i !== idx))} className="text-slate-500 hover:text-rose-400 shrink-0">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="text"
                value={newHighlight}
                onChange={(e) => setNewHighlight(e.target.value)}
                placeholder="+ Add another structured highlight..."
                className="flex-1 px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
              />
              <button
                type="button"
                onClick={() => {
                  if (newHighlight.trim()) {
                    setHighlights([...highlights, newHighlight.trim()])
                    setNewHighlight('')
                  }
                }}
                className="px-4 py-2 rounded-xl bg-[#00b4d8] text-slate-950 font-bold text-xs shrink-0"
              >
                Add Highlight
              </button>
            </div>

            {/* Quick 1-Click Suggestions */}
            <div className="space-y-1.5 pt-1.5">
              <span className="text-[10px] text-slate-400 font-semibold block">Quick 1-Click Suggestions:</span>
              <div className="flex flex-wrap gap-1.5">
                {COMMON_HIGHLIGHT_SUGGESTIONS.map((sug, sIdx) => {
                  const has = highlights.includes(sug)
                  return (
                    <button
                      key={sIdx}
                      type="button"
                      onClick={() => {
                        if (!has) setHighlights([...highlights, sug])
                      }}
                      disabled={has}
                      className={`text-[10px] px-2 py-1 rounded-lg border text-left transition-colors ${
                        has
                          ? 'bg-slate-900 border-slate-800 text-slate-500 cursor-not-allowed'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                      }`}
                    >
                      {has ? '✓ Added' : `+ ${sug.split(' ').slice(0, 4).join(' ')}...`}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* 5. Day-Wise Detailed Itinerary (Page 3 Onwards) */}
        <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-[#ffde59] uppercase tracking-wider">
              <Compass className="w-4 h-4" />
              Day-Wise Detailed Itinerary ({days.length} Days)
            </div>
            <button
              type="button"
              onClick={addDay}
              className="text-xs text-[#00b4d8] hover:underline font-bold flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Add Day {days.length + 1}
            </button>
          </div>

          <div className="space-y-4">
            {days.map((day, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-[#ffde59] text-slate-950 font-black text-xs shadow-sm">
                    Day {day.day}
                  </span>
                  {days.length > 1 && (
                    <button type="button" onClick={() => removeDay(idx)} className="text-slate-500 hover:text-rose-400 text-xs flex items-center gap-1">
                      <Trash2 className="w-3.5 h-3.5" /> Remove
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-400 block mb-1">Day Heading *</label>
                    <input
                      type="text"
                      value={day.title}
                      onChange={(e) => updateDayField(idx, 'title', e.target.value)}
                      placeholder="e.g. Arrival in Guwahati Transfer to Shillong"
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-400 block mb-1">Date / Subtitle</label>
                    <input
                      type="text"
                      value={day.date || ''}
                      onChange={(e) => updateDayField(idx, 'date', e.target.value)}
                      placeholder="e.g. Day 1 | Departure Day"
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-[#ffde59] font-bold"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                      Approx Travel Distance (km & hrs)
                      <span className="text-[10px] text-slate-500 font-normal ml-1.5">(Template me date ke neeche show hoga)</span>
                    </label>
                    <input
                      type="text"
                      value={day.travelDistance || ''}
                      onChange={(e) => updateDayField(idx, 'travelDistance', e.target.value)}
                      placeholder="e.g. Approx. 120 km | ~4.5 Hours Scenic Hill Drive"
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-cyan-300 font-bold"
                    />
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {COMMON_TRAVEL_DISTANCES.map((td, tIdx) => (
                        <button
                          key={tIdx}
                          type="button"
                          onClick={() => updateDayField(idx, 'travelDistance', td)}
                          className="text-[10px] px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
                        >
                          + {td.split('|')[0].trim()}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-semibold text-slate-400 block">
                      Schedule Bullet Points
                      <span className="text-[10px] text-slate-500 font-normal ml-1.5">(Enter press karke nayi line me agla point likhein)</span>
                    </label>
                    <span className="text-[10px] text-[#ffde59] font-bold">
                      {day.points ? day.points.length : 0} Bullets
                    </span>
                  </div>

                  {/* Quick Bullet Template Insertions */}
                  <div className="flex flex-wrap gap-1.5 mb-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        const current = day.points ? [...day.points] : []
                        updateDayField(idx, 'points', [...current, 'Enjoy a hearty morning breakfast before starting the journey.'])
                      }}
                      className="text-[10px] px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
                    >
                      + Breakfast bullet
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const current = day.points ? [...day.points] : []
                        updateDayField(idx, 'points', [...current, 'Proceed for guided sightseeing, nature photography and scenic trails.'])
                      }}
                      className="text-[10px] px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
                    >
                      + Sightseeing bullet
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const current = day.points ? [...day.points] : []
                        updateDayField(idx, 'points', [...current, 'Return to the stay by evening; relax with bonfire & delicious dinner.'])
                      }}
                      className="text-[10px] px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
                    >
                      + Evening Stay bullet
                    </button>
                  </div>
                  <textarea
                    rows={4}
                    value={day.points ? day.points.join('\n') : (day.description || '')}
                    onChange={(e) => updateDayField(idx, 'points', e.target.value.split('\n').filter(Boolean))}
                    placeholder="Arrive at Guwahati Airport before 11:00 AM...&#10;Depart for Shillong via scenic route...&#10;Visit Umiam Lake for sightseeing and photos...&#10;Evening free to explore Police Bazaar..."
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 leading-relaxed font-mono"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-400 block mb-1">Meals Provided</label>
                    <input
                      type="text"
                      value={day.meals?.join(' & ') || ''}
                      onChange={(e) =>
                        updateDayField(
                          idx,
                          'meals',
                          e.target.value.split('&').map((m) => m.trim()).filter(Boolean)
                        )
                      }
                      placeholder="e.g. Breakfast"
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
                    />
                    <div className="flex flex-wrap gap-1 mt-1">
                      {['Breakfast', 'Lunch', 'Dinner', 'Not Included'].map((mOpt) => {
                        const isSelected = day.meals?.includes(mOpt)
                        return (
                          <button
                            key={mOpt}
                            type="button"
                            onClick={() => {
                              let current = day.meals ? [...day.meals] : []
                              if (mOpt === 'Not Included') {
                                current = ['Not Included']
                              } else {
                                current = current.filter(m => m !== 'Not Included')
                                if (current.includes(mOpt)) {
                                  current = current.filter(m => m !== mOpt)
                                } else {
                                  current.push(mOpt)
                                }
                              }
                              updateDayField(idx, 'meals', current)
                            }}
                            className={`text-[9px] px-2 py-0.5 rounded font-bold transition-colors ${
                              isSelected
                                ? 'bg-[#ffde59] text-slate-950'
                                : 'bg-slate-800 text-slate-400 hover:text-white'
                            }`}
                          >
                            {mOpt}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-400 block mb-1">Stay Hotel Name</label>
                    <input
                      type="text"
                      value={day.stayHotel || ''}
                      onChange={(e) => updateDayField(idx, 'stayHotel', e.target.value)}
                      placeholder="e.g. Hotel Polo Towers"
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-400 block mb-1">Stay City</label>
                    <input
                      type="text"
                      value={day.stayCity || ''}
                      onChange={(e) => updateDayField(idx, 'stayCity', e.target.value)}
                      placeholder="e.g. Shillong"
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                    Day Scenic Photo (Desktop right side & Mobile neeche show hoti hai)
                  </label>
                  <div className="flex items-center gap-3">
                    {/* Live Thumbnail Preview */}
                    <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-slate-900 border border-slate-800 shrink-0">
                      {(day.image || day.photos?.[0]) ? (
                        <Image
                          src={day.image || day.photos?.[0] || ''}
                          alt={day.title || `Day ${day.day}`}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-[9px] text-slate-600">No img</div>
                      )}
                    </div>

                    <div className="flex-1 space-y-1.5">
                      <div className="flex flex-wrap gap-1">
                        {GALLERY_PRESETS.map((presetImg, pIdx) => (
                          <button
                            key={pIdx}
                            type="button"
                            onClick={() => updateDayField(idx, 'image', presetImg)}
                            className={`text-[9px] px-1.5 py-0.5 rounded border ${
                              (day.image || day.photos?.[0]) === presetImg
                                ? 'bg-[#00b4d8]/20 border-[#00b4d8] text-[#00b4d8]'
                                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                            }`}
                          >
                            P{pIdx + 1}
                          </button>
                        ))}
                      </div>
                      <input
                        type="text"
                        value={day.image || day.photos?.[0] || ''}
                        onChange={(e) => updateDayField(idx, 'image', e.target.value)}
                        placeholder="/image/Meghalaya/... or https://"
                        className="w-full px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 6. Hotels & Accommodations Table (Page 4) */}
        <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-[#00b4d8] uppercase tracking-wider">
              <Hotel className="w-4 h-4" />
              Hotels & Stays Table ({hotels.length} Properties)
            </div>
          </div>

          {/* Existing Hotels List */}
          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                  <th className="py-2.5 px-3">City</th>
                  <th className="py-2.5 px-3">Hotel Name</th>
                  <th className="py-2.5 px-3">Category</th>
                  <th className="py-2.5 px-3">Duration</th>
                  <th className="py-2.5 px-3">Room Type</th>
                  <th className="py-2.5 px-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 bg-slate-950/50">
                {hotels.map((h) => (
                  <tr key={h.id} className="hover:bg-slate-900/40">
                    <td className="py-2.5 px-3 font-bold text-[#00b4d8]">{h.city}</td>
                    <td className="py-2.5 px-3 font-semibold text-white">{h.hotelName}</td>
                    <td className="py-2.5 px-3 text-[#ffde59]">{h.starRating}</td>
                    <td className="py-2.5 px-3 text-slate-300">{h.nights}</td>
                    <td className="py-2.5 px-3 text-slate-400">{h.roomType}</td>
                    <td className="py-2.5 px-2 text-right">
                      <button type="button" onClick={() => removeHotel(h.id)} className="text-slate-500 hover:text-rose-400">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add Hotel Row */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-[11px] font-bold text-slate-300 uppercase block">+ Add Hotel Property</span>
              <button
                type="button"
                onClick={loadMeghalayaHotels}
                className="self-start sm:self-auto text-xs text-[#00b4d8] hover:underline font-bold flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>⚡ Pre-fill Standard Meghalaya Stays</span>
              </button>
            </div>

            {/* Quick Option Pills */}
            <div className="space-y-2 pt-1 border-t border-slate-800/80">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] text-slate-400 font-semibold shrink-0">Category Options:</span>
                {COMMON_HOTEL_CATEGORIES.map((cat, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setNewHotelCategory(cat)}
                    className={`text-[10px] px-2 py-0.5 rounded-md border transition-colors ${
                      newHotelCategory === cat
                        ? 'bg-[#ffde59]/20 border-[#ffde59] text-[#ffde59]'
                        : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] text-slate-400 font-semibold shrink-0">Stay Duration:</span>
                {['1 Night', '2 Nights', '3 Nights', '4 Nights'].map((dur, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setNewHotelNights(dur)}
                    className={`text-[10px] px-2 py-0.5 rounded-md border transition-colors ${
                      newHotelNights === dur
                        ? 'bg-[#00b4d8]/20 border-[#00b4d8] text-[#00b4d8]'
                        : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                    }`}
                  >
                    {dur}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] text-slate-400 font-semibold shrink-0">Room Type Options:</span>
                {COMMON_ROOM_TYPES.map((rt, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setNewHotelRoom(rt)}
                    className={`text-[10px] px-2 py-0.5 rounded-md border transition-colors ${
                      newHotelRoom === rt
                        ? 'bg-emerald-400/20 border-emerald-400 text-emerald-400'
                        : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                    }`}
                  >
                    {rt}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 pt-1">
              <input
                type="text"
                placeholder="City (e.g. Shillong)"
                value={newHotelCity}
                onChange={(e) => setNewHotelCity(e.target.value)}
                className="px-2.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
              />
              <input
                type="text"
                placeholder="Hotel Name"
                value={newHotelName}
                onChange={(e) => setNewHotelName(e.target.value)}
                className="px-2.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
              />
              <input
                type="text"
                placeholder="Category (e.g. 3 Star Deluxe)"
                value={newHotelCategory}
                onChange={(e) => setNewHotelCategory(e.target.value)}
                className="px-2.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
              />
              <input
                type="text"
                placeholder="Duration (e.g. 2 Nights)"
                value={newHotelNights}
                onChange={(e) => setNewHotelNights(e.target.value)}
                className="px-2.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Room Type"
                  value={newHotelRoom}
                  onChange={(e) => setNewHotelRoom(e.target.value)}
                  className="w-full px-2.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white"
                />
                <button
                  type="button"
                  onClick={addHotel}
                  className="px-4 py-2 rounded-lg bg-[#00b4d8] text-slate-950 font-bold text-xs shrink-0 hover:bg-[#0096c7] transition-colors"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 7. Inclusions & Exclusions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Inclusions */}
          <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              Inclusions ({inclusions.length})
            </div>
            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-2">
              {inclusions.map((inc, idx) => (
                <div key={idx} className="flex items-center justify-between gap-2 p-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200">
                  <span>✓ {inc}</span>
                  <button type="button" onClick={() => setInclusions(inclusions.filter((_, i) => i !== idx))} className="text-slate-500 hover:text-rose-400">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 pt-1">
              <input
                type="text"
                value={newInclusion}
                onChange={(e) => setNewInclusion(e.target.value)}
                placeholder="+ Add custom inclusion..."
                className="flex-1 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
              />
              <button
                type="button"
                onClick={() => {
                  if (newInclusion.trim()) {
                    setInclusions([...inclusions, newInclusion.trim()])
                    setNewInclusion('')
                  }
                }}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-400 text-slate-950 font-bold text-xs"
              >
                Add
              </button>
            </div>

            {/* Quick 1-Click Suggestions */}
            <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
              <span className="text-[10px] text-slate-400 font-semibold block">Quick 1-Click Inclusions:</span>
              <div className="flex flex-wrap gap-1.5">
                {COMMON_INCLUSIONS_PRESETS.map((inc, i) => {
                  const alreadyHas = inclusions.includes(inc)
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        if (!alreadyHas) setInclusions([...inclusions, inc])
                      }}
                      disabled={alreadyHas}
                      className={`text-[10px] px-2 py-1 rounded-lg border text-left transition-colors ${
                        alreadyHas
                          ? 'bg-slate-900 border-slate-800 text-slate-500 cursor-not-allowed'
                          : 'bg-emerald-500/10 hover:bg-emerald-500/20 border-emerald-500/30 text-emerald-300'
                      }`}
                    >
                      {alreadyHas ? '✓ Added' : `+ ${inc.split(' ').slice(0, 4).join(' ')}...`}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Exclusions */}
          <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-rose-400 uppercase tracking-wider">
              <XCircle className="w-4 h-4" />
              Exclusions ({exclusions.length})
            </div>
            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-2">
              {exclusions.map((exc, idx) => (
                <div key={idx} className="flex items-center justify-between gap-2 p-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200">
                  <span>✗ {exc}</span>
                  <button type="button" onClick={() => setExclusions(exclusions.filter((_, i) => i !== idx))} className="text-slate-500 hover:text-rose-400">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 pt-1">
              <input
                type="text"
                value={newExclusion}
                onChange={(e) => setNewExclusion(e.target.value)}
                placeholder="+ Add custom exclusion..."
                className="flex-1 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
              />
              <button
                type="button"
                onClick={() => {
                  if (newExclusion.trim()) {
                    setExclusions([...exclusions, newExclusion.trim()])
                    setNewExclusion('')
                  }
                }}
                className="px-3.5 py-1.5 rounded-xl bg-rose-400 text-slate-950 font-bold text-xs"
              >
                Add
              </button>
            </div>

            {/* Quick 1-Click Suggestions */}
            <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
              <span className="text-[10px] text-slate-400 font-semibold block">Quick 1-Click Exclusions:</span>
              <div className="flex flex-wrap gap-1.5">
                {COMMON_EXCLUSIONS_PRESETS.map((exc, i) => {
                  const alreadyHas = exclusions.includes(exc)
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        if (!alreadyHas) setExclusions([...exclusions, exc])
                      }}
                      disabled={alreadyHas}
                      className={`text-[10px] px-2 py-1 rounded-lg border text-left transition-colors ${
                        alreadyHas
                          ? 'bg-slate-900 border-slate-800 text-slate-500 cursor-not-allowed'
                          : 'bg-rose-500/10 hover:bg-rose-500/20 border-rose-500/30 text-rose-300'
                      }`}
                    >
                      {alreadyHas ? '✓ Added' : `+ ${exc.split(' ').slice(0, 4).join(' ')}...`}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* 8. Pricing & Costing */}
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#ffde59] uppercase tracking-wider">
              <FileText className="w-4 h-4" />
              Pricing & Commercials Section
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Ye rates Canva template me Costing section me aur mobile view me bottom sticky booking bar me show hote hain.
            </p>
          </div>

          {tripType === 'group' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Triple Sharing Price (₹) *
                  <span className="text-[10px] text-slate-500 font-normal ml-1">(Starting rate)</span>
                </label>
                <input
                  type="number"
                  value={tripleSharingPrice}
                  onChange={(e) => setTripleSharingPrice(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white font-black"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Double Sharing Price (₹) *
                  <span className="text-[10px] text-slate-500 font-normal ml-1">(Couples)</span>
                </label>
                <input
                  type="number"
                  value={doubleSharingPrice}
                  onChange={(e) => setDoubleSharingPrice(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white font-black"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Xmas/NY Triple Price (₹)</label>
                <input
                  type="number"
                  value={xmasTripleSharingPrice}
                  onChange={(e) => setXmasTripleSharingPrice(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white font-bold"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Xmas/NY Double Price (₹)</label>
                <input
                  type="number"
                  value={xmasDoubleSharingPrice}
                  onChange={(e) => setXmasDoubleSharingPrice(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white font-bold"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Token Advance to Reserve Seat (₹) *
                  <span className="text-[10px] text-slate-500 font-normal ml-1.5">(Per person booking token)</span>
                </label>
                <input
                  type="number"
                  value={advanceAmount}
                  onChange={(e) => setAdvanceAmount(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-emerald-400 font-bold"
                />
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {ADVANCE_PRESETS.map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setAdvanceAmount(amt)}
                      className={`text-[10px] px-2 py-0.5 rounded font-bold border transition-colors ${
                        advanceAmount === amt
                          ? 'bg-emerald-400/20 border-emerald-400 text-emerald-400'
                          : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                      }`}
                    >
                      ₹{Number(amt).toLocaleString('en-IN')}
                    </button>
                  ))}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-300 block mb-1">Early Bird / Discount Note</label>
                <input
                  type="text"
                  value={validUntil}
                  onChange={(e) => setValidUntil(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Total Package Price (₹) *</label>
                <input
                  type="number"
                  value={totalPackagePrice}
                  onChange={(e) => setTotalPackagePrice(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white font-black"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Price Per Person (₹)</label>
                <input
                  type="number"
                  value={pricePerPerson}
                  onChange={(e) => setPricePerPerson(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Token Advance (₹)</label>
                <input
                  type="number"
                  value={advanceAmount}
                  onChange={(e) => setAdvanceAmount(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-emerald-400 font-bold"
                />
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {ADVANCE_PRESETS.map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setAdvanceAmount(amt)}
                      className={`text-[10px] px-2 py-0.5 rounded font-bold border transition-colors ${
                        advanceAmount === amt
                          ? 'bg-emerald-400/20 border-emerald-400 text-emerald-400'
                          : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                      }`}
                    >
                      ₹{Number(amt).toLocaleString('en-IN')}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 9. Official Bank Account Details */}
        <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                <CreditCard className="w-4 h-4" />
                Official Bank Account & UPI Details
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Travellers ko payment karne ke liye yahi bank aur UPI details share hongi.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setAccountDetails(DEFAULT_BANK_ACCOUNT)}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition-colors self-start sm:self-auto"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#00b4d8]" />
              <span>↺ Reset to Official Travel Tribes Current Account</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1">Beneficiary Name</label>
              <input
                type="text"
                value={accountDetails.beneficiaryName}
                onChange={(e) => setAccountDetails({ ...accountDetails, beneficiaryName: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1">Bank Name</label>
              <input
                type="text"
                value={accountDetails.bankName}
                onChange={(e) => setAccountDetails({ ...accountDetails, bankName: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1">Account Number</label>
              <input
                type="text"
                value={accountDetails.accountNumber}
                onChange={(e) => setAccountDetails({ ...accountDetails, accountNumber: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-[#ffde59] font-mono font-bold"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1">IFSC Code</label>
              <input
                type="text"
                value={accountDetails.ifscCode}
                onChange={(e) => setAccountDetails({ ...accountDetails, ifscCode: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1">Account Type</label>
              <input
                type="text"
                value={accountDetails.accountType}
                onChange={(e) => setAccountDetails({ ...accountDetails, accountType: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1">Official UPI VPA</label>
              <input
                type="text"
                value={accountDetails.upiId}
                onChange={(e) => setAccountDetails({ ...accountDetails, upiId: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-emerald-400 font-mono"
              />
            </div>
          </div>
        </div>

        {/* Generate / Publish Action Bottom Bar */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-white text-base">Ready to Curate & Publish Itinerary?</h3>
            <p className="text-xs text-slate-400">
              Generates an instant permanent URL at <strong className="text-[#ffde59]">/itinerary/{customSlug || '...'}</strong>
            </p>
          </div>

          <button
            type="button"
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#ffde59] to-amber-400 hover:brightness-110 text-slate-950 font-black text-sm shadow-xl shadow-amber-400/20 transition-all hover:scale-105 disabled:opacity-50"
          >
            {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
            <span>🚀 Publish & Generate Canva Link</span>
          </button>
        </div>
      </main>

      {/* Success Modal */}
      {publishedUrl && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-lg w-full rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl text-center">
            <div className="w-16 h-16 rounded-full bg-[#ffde59]/20 border border-[#ffde59] text-[#ffde59] flex items-center justify-center mx-auto text-2xl">
              🎉
            </div>

            <div>
              <span className="text-xs font-bold text-[#ffde59] uppercase tracking-wider">Itinerary Successfully Published!</span>
              <h2 className="text-2xl font-black text-white mt-1">{title}</h2>
              <p className="text-xs text-slate-400 mt-1">
                Your live 1:1 Canva presentation is ready to share with the traveller!
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-2 text-left">
              <span className="text-xs text-[#00b4d8] font-mono truncate">
                {typeof window !== 'undefined' ? `${window.location.origin}${publishedUrl}` : publishedUrl}
              </span>
              <button
                type="button"
                onClick={copyPublishedLink}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-white font-medium shrink-0 flex items-center gap-1"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>

            <div className="space-y-2.5">
              <a
                href={waShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm shadow-lg shadow-emerald-500/20 transition-all hover:scale-102"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Share via WhatsApp with Client</span>
              </a>

              <Link
                href={publishedUrl}
                target="_blank"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#00b4d8] hover:bg-[#0096c7] text-slate-950 font-black text-sm transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Open 1:1 Canva Itinerary</span>
              </Link>

              <button
                type="button"
                onClick={() => setPublishedUrl(null)}
                className="w-full py-2 text-xs text-slate-400 hover:text-white"
              >
                Close & Keep Editing
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
