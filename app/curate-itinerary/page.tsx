'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Compass,
  Sparkles,
  Calendar,
  Hotel,
  Plus,
  Trash2,
  Check,
  Copy,
  ExternalLink,
  RefreshCw,
  CheckCircle2,
  XCircle,
  UploadCloud,
  RotateCcw,
  Navigation,
  SlidersHorizontal,
  Eye,
  X,
  Phone,
  Mail,
  MapPin,
  Users,
  Car,
  Utensils,
  IndianRupee,
  ShieldCheck,
  Tag,
  Info,
  AlertTriangle,
  ArrowUpDown,
  BookOpen
} from 'lucide-react';
import { ItineraryHistorySection } from '@/components/itinerary/itinerary-history-section';
import { CuratedItineraryView } from '@/components/curated-itinerary-view';
import type { CuratedItinerary } from '@/lib/curated-itinerary-constants';
import { trips, type Trip } from '@/lib/travel-data';

interface HotelItem {
  id: string;
  city: string;
  hotelName: string;
  starRating: string;
  nights: string;
  stayDates: string;
  roomType: string;
}

interface DayItem {
  id: string;
  dayNumber: number;
  guidedTour: boolean;
  breakfast: boolean;
  lunch: boolean;
  dinner: boolean;
  city: string;
  enRoutes: string[];
  city2: string;
  exp1: string;
  exp2: string;
  exp3: string;
  exp4: string;
  extraExps: string[];
  travelDistance?: string;
  customTitle?: string;
  activitiesText?: string;
  image?: string;
}

// Standard Travel Tribes Inclusions & Exclusions
const DEFAULT_INCLUSIONS = [
  'Accommodation in verified, handpicked hotels / boutique stays on selected occupancy',
  'Dedicated private AC vehicle with experienced chauffeur for all transfers & sightseeing as per itinerary',
  'Daily hearty breakfast & dinner included (MAP Meal Plan)',
  'Driver night allowance, fuel charges, interstate taxes, toll taxes and parking fees included',
  'Sightseeing & inter-city transfers strictly as per the curated day-by-day itinerary',
  '24/7 dedicated on-ground concierge support and trip coordination by Travel Tribes'
];

const DEFAULT_EXCLUSIONS = [
  '5% GST as applicable on government travel and holiday services',
  'Airfare or train tickets to/from the arrival and departure city (unless specified)',
  'Monument entrance fees, camera tickets, boating & optional adventure activity charges',
  'Lunch, highway refreshments, alcoholic beverages and personal mineral water',
  'Personal expenses such as laundry, room heater charges, phone calls and tips',
  'Any cost arising due to unforeseen natural calamities, landslides, roadblocks or flight/train delays'
];

const VEHICLE_OPTIONS = [
  'Private Dedicated AC Vehicle (Innova Crysta / Ertiga / Similar)',
  'Innova Crysta AC (6+1 Seater Luxury MPV)',
  'Maruti Ertiga AC (4+1 Seater MPV)',
  'Tempo Traveller AC (12-Seater Luxury)',
  'Tempo Traveller AC (17-Seater Luxury)',
  'Toyota Fortuner 4x4 Luxury SUV',
  'Sedan AC (Dzire / Etios)',
  'Dedicated Mountain Tempo Traveller & 3AC Train'
];

const MEAL_PLAN_OPTIONS = [
  'Breakfast & Dinner Included (MAP Plan)',
  'Daily Breakfast Included (CP Plan)',
  'All Meals Included — Breakfast, Lunch & Dinner (AP Plan)',
  'Room Only — No Meals Included (EP Plan)'
];

const PICKUP_DROP_OPTIONS = [
  'Airport & Railway Station Pickup & Drop Included',
  'Ex-Guwahati Airport / Railway Station',
  'Ex-Delhi Airport / Railway Station',
  'Ex-Mumbai Airport / Railway Station',
  'Ex-Jaipur Airport / Railway Station',
  'Ex-Kochi Airport / Ernakulam Railway Station',
  'Ex-Srinagar Airport',
  'Ex-Denpasar Airport (Bali)'
];

const SHARING_OPTIONS = [
  'Double Sharing',
  'Triple Sharing',
  'Quad Sharing',
  'Single Occupancy',
  'Family Suites'
];

const TRAVEL_STYLE_OPTIONS = [
  'Couple / Honeymoon Getaway',
  'Family Vacation with Kids',
  'Group of Friends / Adventure',
  'Corporate Offsite / Incentive',
  'Solo Custom Expedition'
];

const STAR_RATING_OPTIONS = [
  '5 Star Luxury',
  '4 Star Deluxe',
  '3 Star Comfort',
  'Heritage Palace / Haveli',
  'Boutique Resort',
  'Luxury Homestay / Alpine Camps'
];

const ROOM_TYPE_OPTIONS = [
  'Deluxe Room',
  'Super Deluxe Room',
  'Executive Lake View / Mountain View Room',
  'Superior Luxury Suite',
  'Cottage / Wooden Chalet',
  'Luxury Swiss Alpine Tent'
];

// Date helpers
const formatIsoToHuman = (iso: string): string => {
  if (!iso) return '';
  try {
    const [y, m, d] = iso.split('-').map(Number);
    if (!y || !m || !d) return iso;
    const date = new Date(y, m - 1, d);
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch {
    return iso;
  }
};

const addDaysToIso = (iso: string, daysToAdd: number): string => {
  if (!iso) return '';
  try {
    const [y, m, d] = iso.split('-').map(Number);
    if (!y || !m || !d) return '';
    const date = new Date(y, m - 1, d);
    date.setDate(date.getDate() + daysToAdd);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  } catch {
    return '';
  }
};

// Recompute hotel dates sequentially from start date
const recomputeHotelDates = (startIso: string, list: HotelItem[]): HotelItem[] => {
  let currentOffset = 0;
  return list.map(h => {
    const rawN = parseInt(String(h.nights || '0').replace(/\D/g, ''), 10);
    const numNights = isNaN(rawN) || rawN <= 0 ? 0 : rawN;

    if (numNights === 0) {
      return {
        ...h,
        nights: '0',
        stayDates: ''
      };
    }

    const nightsLabel = `${numNights} Night${numNights > 1 ? 's' : ''}`;

    if (!startIso) {
      return {
        ...h,
        nights: String(numNights),
        stayDates: nightsLabel
      };
    }

    const checkInIso = addDaysToIso(startIso, currentOffset);
    const checkOutIso = addDaysToIso(startIso, currentOffset + numNights);
    currentOffset += numNights;

    const checkInStr = formatIsoToHuman(checkInIso);
    const checkOutStr = formatIsoToHuman(checkOutIso);
    const autoStayDates = `${checkInStr} - ${checkOutStr} (${numNights} Nt${numNights > 1 ? 's' : ''})`;

    return {
      ...h,
      nights: String(numNights),
      stayDates: autoStayDates
    };
  });
};

export default function CurateItineraryPage() {
  // Template Selector state
  const [selectedTemplateSlug, setSelectedTemplateSlug] = useState('');

  // 1. Client & Guest Details
  const [fullName, setFullName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [inquiryId, setInquiryId] = useState('');
  const [departureCity, setDepartureCity] = useState('');
  const [adults, setAdults] = useState('2');
  const [kids, setKids] = useState('0');
  const [sharingType, setSharingType] = useState('Double Sharing');
  const [travelStyle, setTravelStyle] = useState('Couple / Honeymoon Getaway');

  // 2. Trip Overview & Logistics
  const [tripTitle, setTripTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [duration, setDuration] = useState('');
  const [travelDates, setTravelDates] = useState('');
  const [groupVibe, setGroupVibe] = useState('');
  const [vehicleType, setVehicleType] = useState('Private Dedicated AC Vehicle (Innova Crysta / Ertiga / Similar)');
  const [pickupDrop, setPickupDrop] = useState('Airport & Railway Station Pickup & Drop Included');
  const [mealPlan, setMealPlan] = useState('Breakfast & Dinner Included (MAP Plan)');
  const [routeText, setRouteText] = useState('');

  // 3. Hotels Table
  const [hotels, setHotels] = useState<HotelItem[]>([
    {
      id: 'h-1',
      city: '',
      hotelName: '',
      starRating: '4 Star Deluxe',
      nights: '2',
      stayDates: '',
      roomType: 'Deluxe Room'
    }
  ]);

  // 4. Day-by-Day Schedule
  const [days, setDays] = useState<DayItem[]>([
    {
      id: 'd-1',
      dayNumber: 1,
      guidedTour: true,
      breakfast: false,
      lunch: false,
      dinner: true,
      city: '',
      enRoutes: [''],
      city2: '',
      exp1: '',
      exp2: '',
      exp3: '',
      exp4: '',
      extraExps: [],
      travelDistance: '',
      customTitle: '',
      activitiesText: '',
      image: ''
    }
  ]);

  // Expanded row ID for optional details drawer
  const [expandedDayId, setExpandedDayId] = useState<string | null>(null);

  // 5. Inclusions & Exclusions
  const [inclusions, setInclusions] = useState<string[]>(DEFAULT_INCLUSIONS);
  const [exclusions, setExclusions] = useState<string[]>(DEFAULT_EXCLUSIONS);

  // 6. Quotation & Commercials
  const [finalQuotationAmount, setFinalQuotationAmount] = useState('');
  const [perAdultPrice, setPerAdultPrice] = useState('');
  const [perKidPrice, setPerKidPrice] = useState('');
  const [advanceAmountPaid, setAdvanceAmountPaid] = useState('');
  const [balancePendingAmount, setBalancePendingAmount] = useState('');
  const [specialRequirements, setSpecialRequirements] = useState('');

  // 7. Visual Media
  const [heroImage, setHeroImage] = useState('');
  const [galleryImages, setGalleryImages] = useState<string[]>(['', '', '', '']);

  // UI, Publishing & Preview State
  const [generating, setGenerating] = useState(false);
  const [genSuccess, setGenSuccess] = useState<any>(null);
  const [genError, setGenError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [draftRestoredToast, setDraftRestoredToast] = useState(false);

  // LocalStorage Draft Autosave & Restore
  useEffect(() => {
    try {
      const saved = localStorage.getItem('travel_tribes_curate_draft');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          if (parsed.fullName) setFullName(parsed.fullName);
          if (parsed.clientPhone) setClientPhone(parsed.clientPhone);
          if (parsed.clientEmail) setClientEmail(parsed.clientEmail);
          if (parsed.inquiryId) setInquiryId(parsed.inquiryId);
          if (parsed.departureCity) setDepartureCity(parsed.departureCity);
          if (parsed.adults) setAdults(parsed.adults);
          if (parsed.kids) setKids(parsed.kids);
          if (parsed.sharingType) setSharingType(parsed.sharingType);
          if (parsed.travelStyle) setTravelStyle(parsed.travelStyle);
          if (parsed.tripTitle) setTripTitle(parsed.tripTitle);
          if (parsed.subtitle) setSubtitle(parsed.subtitle);
          if (parsed.destination) setDestination(parsed.destination);
          if (parsed.startDate) setStartDate(parsed.startDate);
          if (parsed.endDate) setEndDate(parsed.endDate);
          if (parsed.duration) setDuration(parsed.duration);
          if (parsed.travelDates) setTravelDates(parsed.travelDates);
          if (parsed.vehicleType) setVehicleType(parsed.vehicleType);
          if (parsed.pickupDrop) setPickupDrop(parsed.pickupDrop);
          if (parsed.mealPlan) setMealPlan(parsed.mealPlan);
          if (parsed.routeText) setRouteText(parsed.routeText);
          if (Array.isArray(parsed.hotels) && parsed.hotels.length > 0) setHotels(parsed.hotels);
          if (Array.isArray(parsed.days) && parsed.days.length > 0) setDays(parsed.days);
          if (Array.isArray(parsed.inclusions) && parsed.inclusions.length > 0) setInclusions(parsed.inclusions);
          if (Array.isArray(parsed.exclusions) && parsed.exclusions.length > 0) setExclusions(parsed.exclusions);
          if (parsed.finalQuotationAmount) setFinalQuotationAmount(parsed.finalQuotationAmount);
          if (parsed.perAdultPrice) setPerAdultPrice(parsed.perAdultPrice);
          if (parsed.perKidPrice) setPerKidPrice(parsed.perKidPrice);
          if (parsed.advanceAmountPaid) setAdvanceAmountPaid(parsed.advanceAmountPaid);
          if (parsed.balancePendingAmount) setBalancePendingAmount(parsed.balancePendingAmount);
          if (parsed.specialRequirements) setSpecialRequirements(parsed.specialRequirements);
          if (parsed.heroImage) setHeroImage(parsed.heroImage);
          if (Array.isArray(parsed.galleryImages)) setGalleryImages(parsed.galleryImages);
          setDraftRestoredToast(true);
          setTimeout(() => setDraftRestoredToast(false), 5000);
        }
      }
    } catch {
      // ignore storage error
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const draft = {
          fullName,
          clientPhone,
          clientEmail,
          inquiryId,
          departureCity,
          adults,
          kids,
          sharingType,
          travelStyle,
          tripTitle,
          subtitle,
          destination,
          startDate,
          endDate,
          duration,
          travelDates,
          vehicleType,
          pickupDrop,
          mealPlan,
          routeText,
          hotels,
          days,
          inclusions,
          exclusions,
          finalQuotationAmount,
          perAdultPrice,
          perKidPrice,
          advanceAmountPaid,
          balancePendingAmount,
          specialRequirements,
          heroImage,
          galleryImages
        };
        localStorage.setItem('travel_tribes_curate_draft', JSON.stringify(draft));
      } catch {
        // ignore storage error
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [
    fullName,
    clientPhone,
    clientEmail,
    inquiryId,
    departureCity,
    adults,
    kids,
    sharingType,
    travelStyle,
    tripTitle,
    subtitle,
    destination,
    startDate,
    endDate,
    duration,
    travelDates,
    vehicleType,
    pickupDrop,
    mealPlan,
    routeText,
    hotels,
    days,
    inclusions,
    exclusions,
    finalQuotationAmount,
    perAdultPrice,
    perKidPrice,
    advanceAmountPaid,
    balancePendingAmount,
    specialRequirements,
    heroImage,
    galleryImages
  ]);

  // Auto-calculated Route Circuit from Day table
  const computedRouteCircuit = useMemo(() => {
    const list: string[] = [];
    days.forEach(d => {
      const c1 = d.city?.trim();
      const c2 = d.city2?.trim();
      if (c1 && !list.includes(c1)) list.push(c1);
      if (c2 && !list.includes(c2)) list.push(c2);
    });
    return list.join(' ➔ ');
  }, [days]);

  // Total allocated hotel nights
  const totalHotelNights = useMemo(() => {
    let sum = 0;
    hotels.forEach(h => {
      const rawN = parseInt(String(h.nights || '0').replace(/\D/g, ''), 10);
      if (!isNaN(rawN) && rawN > 0) sum += rawN;
    });
    return sum;
  }, [hotels]);

  // Expected trip nights from days
  const expectedTripNights = useMemo(() => {
    return Math.max(0, days.length - 1);
  }, [days.length]);

  // Handle template selection
  const handleTemplateSelect = (slug: string) => {
    setSelectedTemplateSlug(slug);
    if (!slug) return;

    const t = trips.find(item => item.slug === slug || item.id === slug);
    if (!t) return;

    if (
      (tripTitle || destination || days.length > 2) &&
      !window.confirm(`Load "${t.title}" template? This will replace the current days, hotels, and inclusions with template data.`)
    ) {
      return;
    }

    setTripTitle(t.title);
    setSubtitle('PRIVATE BESPOKE EXPERIENCE');

    // Destination from location
    const destName = t.location ? t.location.split(/[·,\-]/)[0].trim() : t.title.split('—')[0].trim();
    setDestination(destName);
    setDuration(t.duration);

    // Images
    if (t.image) setHeroImage(t.image);
    if (t.gallery && t.gallery.length > 0) {
      const imgs = t.gallery.map(g => g.image).filter(Boolean).slice(0, 4);
      while (imgs.length < 4) imgs.push('');
      setGalleryImages(imgs);
    }

    // Inclusions & Exclusions
    if (t.inclusions && t.inclusions.length > 0) setInclusions(t.inclusions);
    if (t.exclusions && t.exclusions.length > 0) setExclusions(t.exclusions);

    // Days mapping
    if (t.itinerary && t.itinerary.length > 0) {
      const newDays: DayItem[] = t.itinerary.map(d => {
        const actLines = d.activities || [];
        const exp1 = actLines[0] || '';
        const exp2 = actLines[1] || '';
        const exp3 = actLines[2] || '';
        const exp4 = actLines[3] || '';
        const extraExps = actLines.slice(4);

        // Try to parse from & to city from title
        let c1 = destName;
        let c2 = destName;
        if (d.title.includes('TO')) {
          const parts = d.title.replace(/^DAY\s*\d+\s*[—–\-:]\s*/i, '').split(/TO/i);
          if (parts.length >= 2) {
            c1 = parts[0].replace(/[^a-zA-Z\s]/g, '').trim();
            c2 = parts[1].replace(/[^a-zA-Z\s]/g, '').trim();
          }
        }

        return {
          id: `d-${Date.now()}-${d.day}`,
          dayNumber: d.day,
          guidedTour: true,
          breakfast: d.day > 1,
          lunch: false,
          dinner: true,
          city: c1,
          enRoutes: [''],
          city2: c2,
          exp1,
          exp2,
          exp3,
          exp4,
          extraExps,
          customTitle: d.title.replace(/^DAY\s*\d+\s*[—–\-:]\s*/i, '').trim(),
          activitiesText: actLines.join('\n'),
          travelDistance: '',
          image: ''
        };
      });
      setDays(newDays);

      // Route text
      const routeParts: string[] = [];
      newDays.forEach(d => {
        if (d.city && !routeParts.includes(d.city)) routeParts.push(d.city);
        if (d.city2 && !routeParts.includes(d.city2)) routeParts.push(d.city2);
      });
      setRouteText(routeParts.join(' ➔ '));

      // Build initial hotels based on days
      const totalN = Math.max(1, newDays.length - 1);
      const uniqueCities = Array.from(new Set(newDays.slice(0, totalN).map(d => d.city2 || d.city || destName)));
      const nightsPerCity = Math.max(1, Math.floor(totalN / uniqueCities.length));
      let remainingNights = totalN;

      const newHotels: HotelItem[] = uniqueCities.map((city, cIdx) => {
        const isLast = cIdx === uniqueCities.length - 1;
        const n = isLast ? remainingNights : Math.min(nightsPerCity, remainingNights);
        remainingNights = Math.max(0, remainingNights - n);

        return {
          id: `h-${Date.now()}-${cIdx}`,
          city,
          hotelName: `Handpicked 4-Star Boutique Stay (${city})`,
          starRating: '4 Star Deluxe',
          nights: String(n),
          stayDates: '',
          roomType: 'Deluxe Room'
        };
      });

      setHotels(recomputeHotelDates(startDate, newHotels));
    }

    // Default quotation suggestion from trip price
    if (t.price) {
      const match = t.price.match(/(\d[\d,]*)/);
      if (match) {
        const numeric = parseInt(match[1].replace(/,/g, ''), 10);
        if (!isNaN(numeric) && numeric > 0) {
          const numAdults = Number(adults) || 2;
          const totalVal = numeric * numAdults;
          setFinalQuotationAmount(String(totalVal));
          setPerAdultPrice(String(numeric));
          setAdvanceAmountPaid(String(numAdults * 5000));
          setBalancePendingAmount(String(totalVal - (numAdults * 5000)));
        }
      }
    }
  };

  // Date Change Handler for Start Date & End Date
  const handleStartDateChange = (newStart: string) => {
    setStartDate(newStart);
    setHotels(prev => recomputeHotelDates(newStart, prev));

    if (newStart && endDate) {
      calculateRange(newStart, endDate);
    } else if (newStart) {
      setTravelDates(formatIsoToHuman(newStart));
    }
  };

  const handleEndDateChange = (newEnd: string) => {
    setEndDate(newEnd);
    if (startDate && newEnd) {
      calculateRange(startDate, newEnd);
    }
  };

  const calculateRange = (start: string, end: string) => {
    try {
      const d1 = new Date(start);
      const d2 = new Date(end);
      const diff = d2.getTime() - d1.getTime();
      const numDays = Math.max(1, Math.round(diff / (1000 * 60 * 60 * 24)) + 1);
      const numNights = Math.max(0, numDays - 1);
      setDuration(`${numDays} Days / ${numNights} Nights`);
      setTravelDates(`${formatIsoToHuman(start)} to ${formatIsoToHuman(end)}`);
    } catch {
      // keep existing
    }
  };

  // Auto-generate / adjust Day rows to match date range
  const handleAutoGenerateDaysFromDates = () => {
    if (!startDate || !endDate) {
      alert('Please select both Start Date and End Date first!');
      return;
    }
    const d1 = new Date(startDate);
    const d2 = new Date(endDate);
    const diff = d2.getTime() - d1.getTime();
    const count = Math.max(1, Math.round(diff / (1000 * 60 * 60 * 24)) + 1);

    const newDays: DayItem[] = [];
    for (let i = 0; i < count; i++) {
      const existing = days[i];
      newDays.push({
        id: existing?.id || `d-${Date.now()}-${i}`,
        dayNumber: i + 1,
        guidedTour: existing?.guidedTour ?? true,
        breakfast: existing?.breakfast ?? (i > 0),
        lunch: existing?.lunch ?? false,
        dinner: existing?.dinner ?? true,
        city: existing?.city || (i === 0 ? destination : ''),
        enRoutes: existing?.enRoutes || [''],
        city2: existing?.city2 || destination,
        exp1: existing?.exp1 || '',
        exp2: existing?.exp2 || '',
        exp3: existing?.exp3 || '',
        exp4: existing?.exp4 || '',
        extraExps: existing?.extraExps || [],
        travelDistance: existing?.travelDistance || '',
        customTitle: existing?.customTitle || '',
        activitiesText: existing?.activitiesText || '',
        image: existing?.image || ''
      });
    }
    setDays(newDays);
  };

  // Apply auto-computed route circuit to route text field
  const handleApplyAutoRoute = () => {
    if (computedRouteCircuit) {
      setRouteText(computedRouteCircuit);
    }
  };

  // Hotel Handlers
  const addHotel = () => {
    setHotels(prev => {
      const newItem: HotelItem = {
        id: `h-${Date.now()}`,
        city: destination || '',
        hotelName: '',
        starRating: '4 Star Deluxe',
        nights: '1',
        stayDates: '',
        roomType: 'Deluxe Room'
      };
      return recomputeHotelDates(startDate, [...prev, newItem]);
    });
  };

  const updateHotel = (id: string, field: keyof HotelItem, val: string) => {
    setHotels(prev => {
      const updated = prev.map(h => (h.id === id ? { ...h, [field]: val } : h));
      if (field === 'nights') {
        return recomputeHotelDates(startDate, updated);
      }
      return updated;
    });
  };

  const removeHotel = (id: string) => {
    if (hotels.length <= 1) {
      setHotels([
        {
          id: 'h-1',
          city: '',
          hotelName: '',
          starRating: '4 Star Deluxe',
          nights: '0',
          stayDates: '',
          roomType: 'Deluxe Room'
        }
      ]);
      return;
    }
    setHotels(prev => recomputeHotelDates(startDate, prev.filter(h => h.id !== id)));
  };

  // Day Handlers
  const addDay = () => {
    setDays(prev => {
      const nextNum = prev.length + 1;
      const lastDay = prev[prev.length - 1];
      return [
        ...prev,
        {
          id: `d-${Date.now()}`,
          dayNumber: nextNum,
          guidedTour: true,
          breakfast: true,
          lunch: false,
          dinner: true,
          city: lastDay?.city2 || destination,
          enRoutes: [''],
          city2: destination,
          exp1: '',
          exp2: '',
          exp3: '',
          exp4: '',
          extraExps: [],
          travelDistance: '',
          customTitle: '',
          activitiesText: '',
          image: ''
        }
      ];
    });
  };

  const updateDay = (id: string, field: keyof DayItem, val: any) => {
    setDays(prev => prev.map(d => (d.id === id ? { ...d, [field]: val } : d)));
  };

  const removeDay = (id: string) => {
    if (days.length <= 1) return;
    setDays(prev => {
      const filtered = prev.filter(d => d.id !== id);
      return filtered.map((d, idx) => ({ ...d, dayNumber: idx + 1 }));
    });
  };

  const addDayEnRoute = (dayId: string) => {
    setDays(prev =>
      prev.map(d => (d.id === dayId ? { ...d, enRoutes: [...(d.enRoutes || ['']), ''] } : d))
    );
  };

  const updateDayEnRoute = (dayId: string, idx: number, val: string) => {
    setDays(prev =>
      prev.map(d => {
        if (d.id !== dayId) return d;
        const next = [...(d.enRoutes || [''])];
        next[idx] = val;
        return { ...d, enRoutes: next };
      })
    );
  };

  const removeDayEnRoute = (dayId: string, idx: number) => {
    setDays(prev =>
      prev.map(d => {
        if (d.id !== dayId) return d;
        const current = d.enRoutes || [''];
        if (current.length <= 1) return { ...d, enRoutes: [''] };
        return { ...d, enRoutes: current.filter((_, i) => i !== idx) };
      })
    );
  };

  const addDayExtraExp = (dayId: string) => {
    setDays(prev =>
      prev.map(d => (d.id === dayId ? { ...d, extraExps: [...(d.extraExps || []), ''] } : d))
    );
  };

  const updateDayExtraExp = (dayId: string, idx: number, val: string) => {
    setDays(prev =>
      prev.map(d => {
        if (d.id !== dayId) return d;
        const next = [...(d.extraExps || [])];
        next[idx] = val;
        return { ...d, extraExps: next };
      })
    );
  };

  const removeDayExtraExp = (dayId: string, idx: number) => {
    setDays(prev =>
      prev.map(d => {
        if (d.id !== dayId) return d;
        return { ...d, extraExps: (d.extraExps || []).filter((_, i) => i !== idx) };
      })
    );
  };

  // Inclusions / Exclusions Handlers
  const addInclusion = () => setInclusions(prev => [...prev, '']);
  const updateInclusion = (idx: number, val: string) => {
    setInclusions(prev => {
      const next = [...prev];
      next[idx] = val;
      return next;
    });
  };
  const removeInclusion = (idx: number) => {
    setInclusions(prev => (prev.length > 1 ? prev.filter((_, i) => i !== idx) : ['']));
  };

  const addExclusion = () => setExclusions(prev => [...prev, '']);
  const updateExclusion = (idx: number, val: string) => {
    setExclusions(prev => {
      const next = [...prev];
      next[idx] = val;
      return next;
    });
  };
  const removeExclusion = (idx: number) => {
    setExclusions(prev => (prev.length > 1 ? prev.filter((_, i) => i !== idx) : ['']));
  };

  // Load defaults
  const handleLoadDefaultInclusions = () => {
    setInclusions(DEFAULT_INCLUSIONS);
  };
  const handleLoadDefaultExclusions = () => {
    setExclusions(DEFAULT_EXCLUSIONS);
  };

  const handleAddInclusionTag = (tag: string) => {
    if (!inclusions.includes(tag)) {
      setInclusions(prev => [...prev.filter(Boolean), tag]);
    }
  };

  // Commercials auto calculation helpers
  const handleQuotationChange = (val: string) => {
    setFinalQuotationAmount(val);
    const num = Number(val.replace(/[^\d.]/g, ''));
    if (!isNaN(num) && num > 0) {
      const numAdults = Number(adults) || 2;
      if (!perAdultPrice || perAdultPrice === '0') {
        setPerAdultPrice(String(Math.round(num / numAdults)));
      }
      if (!advanceAmountPaid) {
        const adv = Math.min(num, numAdults * 5000);
        setAdvanceAmountPaid(String(adv));
        setBalancePendingAmount(String(num - adv));
      } else {
        const adv = Number(advanceAmountPaid.replace(/[^\d.]/g, '')) || 0;
        setBalancePendingAmount(String(Math.max(0, num - adv)));
      }
    }
  };

  const handleAdvanceChange = (val: string) => {
    setAdvanceAmountPaid(val);
    const total = Number(finalQuotationAmount.replace(/[^\d.]/g, '')) || 0;
    const adv = Number(val.replace(/[^\d.]/g, '')) || 0;
    if (total > 0) {
      setBalancePendingAmount(String(Math.max(0, total - adv)));
    }
  };

  // Image Upload Helper
  const handleUploadFile = async (file: File, callback: (url: string) => void) => {
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (data.url) callback(data.url);
    } catch (e) {
      console.error('File upload error:', e);
    }
  };

  // Reset entire form
  const handleResetForm = () => {
    if (window.confirm('Clear all fields to a fresh blank canvas?')) {
      localStorage.removeItem('travel_tribes_curate_draft');
      setTripTitle('');
      setSubtitle('');
      setFullName('');
      setClientPhone('');
      setClientEmail('');
      setInquiryId('');
      setDepartureCity('');
      setAdults('2');
      setKids('0');
      setSharingType('Double Sharing');
      setTravelStyle('Couple / Honeymoon Getaway');
      setDestination('');
      setStartDate('');
      setEndDate('');
      setDuration('');
      setTravelDates('');
      setGroupVibe('');
      setVehicleType('Private Dedicated AC Vehicle (Innova Crysta / Ertiga / Similar)');
      setPickupDrop('Airport & Railway Station Pickup & Drop Included');
      setMealPlan('Breakfast & Dinner Included (MAP Plan)');
      setRouteText('');
      setHotels([
        {
          id: 'h-1',
          city: '',
          hotelName: '',
          starRating: '4 Star Deluxe',
          nights: '2',
          stayDates: '',
          roomType: 'Deluxe Room'
        }
      ]);
      setDays([
        {
          id: 'd-1',
          dayNumber: 1,
          guidedTour: true,
          breakfast: false,
          lunch: false,
          dinner: true,
          city: '',
          enRoutes: [''],
          city2: '',
          exp1: '',
          exp2: '',
          exp3: '',
          exp4: '',
          extraExps: [],
          travelDistance: '',
          customTitle: '',
          activitiesText: '',
          image: ''
        }
      ]);
      setInclusions(DEFAULT_INCLUSIONS);
      setExclusions(DEFAULT_EXCLUSIONS);
      setFinalQuotationAmount('');
      setPerAdultPrice('');
      setPerKidPrice('');
      setAdvanceAmountPaid('');
      setBalancePendingAmount('');
      setSpecialRequirements('');
      setHeroImage('');
      setGalleryImages(['', '', '', '']);
      setGenError(null);
      setGenSuccess(null);
      setSelectedTemplateSlug('');
    }
  };

  // Construct complete payload for Publishing or Live Preview
  const buildPayload = () => {
    const formattedHotels = hotels
      .filter(h => (h.hotelName.trim() || h.city.trim()) && parseInt(h.nights || '0', 10) > 0)
      .map((h, idx) => ({
        id: `hotel-${idx + 1}`,
        city: h.city.trim() || destination.trim() || 'Destination',
        hotelName: h.hotelName.trim() || `${h.city || destination} Stay`,
        starRating: h.starRating.trim() || '4 Star Deluxe',
        nights: `${parseInt(h.nights, 10)} Night${parseInt(h.nights, 10) > 1 ? 's' : ''}`,
        stayDates: h.stayDates.trim() || undefined,
        roomType: h.roomType.trim() || 'Deluxe Room'
      }));

    const finalDatesStr =
      travelDates.trim() ||
      (startDate && endDate
        ? `${formatIsoToHuman(startDate)} to ${formatIsoToHuman(endDate)}`
        : startDate
          ? formatIsoToHuman(startDate)
          : undefined);

    const guestVibeStr =
      groupVibe.trim() ||
      `${adults || 2} Adults${Number(kids) > 0 ? `, ${kids} Kids` : ''} (${sharingType || 'Double Sharing'})${travelStyle ? ` • ${travelStyle}` : ''}`;

    return {
      tripTitle: tripTitle.trim() || undefined,
      subtitle: subtitle.trim() || undefined,
      fullName: fullName.trim() || 'Valued Guest',
      clientName: fullName.trim() || 'Valued Guest',
      clientPhone: clientPhone.trim() || undefined,
      clientEmail: clientEmail.trim() || undefined,
      inquiryId: inquiryId.trim() || undefined,
      departureCity: departureCity.trim() || undefined,
      destination: destination.trim() || tripTitle.trim() || 'Custom Tour',
      adults: Number(adults) || 2,
      kids: Number(kids) || 0,
      sharingType: sharingType || 'Double Sharing',
      travelStyle: travelStyle || undefined,
      duration: duration.trim() || `${days.length} Days`,
      travelDates: finalDatesStr,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
      groupVibe: guestVibeStr,
      vehicleType: vehicleType.trim() || undefined,
      pickupDrop: pickupDrop.trim() || undefined,
      mealPlan: mealPlan.trim() || undefined,
      routeText: routeText.trim() || (computedRouteCircuit || undefined),
      hotels: formattedHotels,
      dayActivities: days.map(d => ({
        dayNumber: d.dayNumber,
        title: d.customTitle?.trim() || undefined,
        date: startDate ? addDaysToIso(startDate, d.dayNumber - 1) : undefined,
        city: d.city?.trim() || undefined,
        city2: d.city2?.trim() || undefined,
        enRoutes: (d.enRoutes || []).map(s => s.trim()).filter(Boolean),
        guidedTour: d.guidedTour,
        exp1: d.exp1?.trim() || undefined,
        exp2: d.exp2?.trim() || undefined,
        exp3: d.exp3?.trim() || undefined,
        exp4: d.exp4?.trim() || undefined,
        extraExperiences: (d.extraExps || []).map(s => s.trim()).filter(Boolean),
        activitiesText: d.activitiesText?.trim() || undefined,
        breakfast: d.breakfast,
        lunch: d.lunch,
        dinner: d.dinner,
        travelDistance: d.travelDistance?.trim() || undefined,
        image: d.image?.trim() || undefined
      })),
      inclusions: inclusions.map(s => s.trim()).filter(Boolean),
      exclusions: exclusions.map(s => s.trim()).filter(Boolean),
      finalQuotationAmount: finalQuotationAmount.trim() ? Number(finalQuotationAmount.replace(/[^\d.]/g, '')) : undefined,
      perAdultPrice: perAdultPrice.trim() ? Number(perAdultPrice.replace(/[^\d.]/g, '')) : undefined,
      perKidPrice: perKidPrice.trim() ? Number(perKidPrice.replace(/[^\d.]/g, '')) : undefined,
      advanceAmountPaid: advanceAmountPaid.trim() ? Number(advanceAmountPaid.replace(/[^\d.]/g, '')) : undefined,
      balancePendingAmount: balancePendingAmount.trim() ? Number(balancePendingAmount.replace(/[^\d.]/g, '')) : undefined,
      specialRequirements: specialRequirements.trim() || undefined,
      heroImage: heroImage.trim() || undefined,
      galleryImages: galleryImages.map(s => s.trim()).filter(Boolean)
    };
  };

  // Submit / Publish Itinerary
  const handlePublish = async () => {
    if (!destination.trim() && !tripTitle.trim()) {
      setGenError('Please provide at least an Itinerary Title or Destination.');
      return;
    }

    setGenerating(true);
    setGenError(null);
    setGenSuccess(null);

    const payload = buildPayload();

    try {
      const res = await fetch('/api/sheet/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to generate itinerary proposal.');
      }
      setGenSuccess(data);
      setIsPreviewOpen(false);
    } catch (err: any) {
      setGenError(err.message || 'Error occurred while publishing itinerary.');
    } finally {
      setGenerating(false);
    }
  };

  // Construct mock CuratedItinerary object for Live Preview modal
  const previewItinerary: CuratedItinerary = useMemo(() => {
    const payload = buildPayload();
    const guestName = payload.clientName || 'Valued Guest';
    const dest = payload.destination || 'Custom Tour';
    const cleanRoute = payload.routeText || computedRouteCircuit || dest;

    const formattedDays = days.map((d, idx) => {
      const expPoints: string[] = [];
      if (d.guidedTour) expPoints.push("Dedicated local guide assistance included for today's sightseeing");
      if (d.exp1?.trim()) expPoints.push(d.exp1.trim());
      if (d.exp2?.trim()) expPoints.push(d.exp2.trim());
      if (d.exp3?.trim()) expPoints.push(d.exp3.trim());
      if (d.exp4?.trim()) expPoints.push(d.exp4.trim());
      (d.extraExps || []).forEach(e => { if (e?.trim()) expPoints.push(e.trim()); });
      if (d.activitiesText?.trim()) {
        d.activitiesText.split('\n').map(s => s.trim().replace(/^[•\-\*]\s*/, '')).filter(Boolean).forEach(s => expPoints.push(s));
      }

      const isFinalDay = idx === days.length - 1 && days.length > 1;
      const stayText = isFinalDay
        ? 'Departure / Tour Concludes (No Overnight Hotel)'
        : (d.city2 ? `${d.city2} Stay` : `${dest} Boutique Stay`);

      const mealsArr: string[] = [];
      if (d.breakfast) mealsArr.push('Breakfast');
      if (d.lunch) mealsArr.push('Lunch');
      if (d.dinner) mealsArr.push('Dinner');

      return {
        day: d.dayNumber,
        title: d.customTitle?.trim() || `Day ${d.dayNumber}: ${d.city ? `${d.city} to ${d.city2 || d.city}` : dest} Exploration`,
        date: startDate ? formatIsoToHuman(addDaysToIso(startDate, d.dayNumber - 1)) : undefined,
        travelDistance: d.travelDistance?.trim() || undefined,
        guidedTour: d.guidedTour,
        enRouteStop: (d.enRoutes || []).filter(Boolean).join(' & ') || undefined,
        points: expPoints.length > 0 ? expPoints : [`Sightseeing & leisure exploration in ${d.city2 || dest}`],
        description: expPoints.join(' • '),
        meals: mealsArr.length > 0 ? mealsArr : ['Breakfast', 'Dinner'],
        stayCity: d.city2 || dest,
        stayHotel: stayText,
        stay: stayText,
        image: d.image || galleryImages[idx % galleryImages.length] || heroImage || '/image/Meghalaya/IMG_0857.JPEG'
      };
    });

    return {
      id: 'preview-curated-mock',
      slug: 'preview-proposal',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tripType: 'customized',
      title: tripTitle.trim() || `${dest} Bespoke Proposal`,
      subtitle: subtitle.trim() || 'PRIVATE BESPOKE EXPERIENCE',
      destination: dest,
      duration: duration || `${days.length} Days`,
      routeText: cleanRoute,
      bannerImage: heroImage || '/image/Meghalaya/IMG_0857.JPEG',
      overview: `A private bespoke ${duration || `${days.length} Days`} journey handcrafted exclusively for ${guestName}. Featuring handpicked accommodations, private dedicated transfers with ${vehicleType || 'Dedicated AC Vehicle'}, and curated local experiences across ${dest}.`,
      highlights: [
        `Private transfers in dedicated ${vehicleType || 'AC Vehicle'} with professional chauffeur for all transfers & sightseeing`,
        `Accommodations across ${hotels.map(h => h.city).filter(Boolean).join(', ') || dest}`,
        `Curated daily dining arrangement on ${mealPlan || 'Breakfast & Dinner'} plan`,
        `Private custom itinerary crafted for ${payload.groupVibe}`
      ],
      locationGlimpses: galleryImages.filter(Boolean).slice(0, 4).map((img, i) => ({
        name: `Scenic Highlight ${i + 1}`,
        image: img
      })),
      clientName: guestName,
      clientPhone: clientPhone || undefined,
      clientEmail: clientEmail || undefined,
      inquiryId: inquiryId || undefined,
      departureCity: departureCity || undefined,
      travelDates: payload.travelDates || undefined,
      groupVibe: payload.groupVibe,
      mealPlan: mealPlan || 'Breakfast & Dinner Included',
      specialRequirements: specialRequirements || undefined,
      hotels: payload.hotels.map((h, i) => ({
        id: `h-prev-${i}`,
        city: h.city,
        hotelName: h.hotelName,
        nights: h.nights,
        stayDates: h.stayDates,
        roomType: h.roomType,
        starRating: h.starRating,
        amenities: ['Free WiFi', 'Breakfast', 'Air Conditioned', 'Room Service']
      })),
      transport: {
        vehicleType: vehicleType || 'Private Dedicated AC Vehicle',
        pickupDrop: pickupDrop || 'Airport / Station Pickup & Drop Included',
        includedFeatures: [
          'All toll taxes, parking fees, state border permits and fuel included',
          'Dedicated experienced driver for entire tour duration',
          'Point-to-point sightseeing & inter-city transit as per itinerary'
        ]
      },
      days: formattedDays,
      inclusions: inclusions.filter(Boolean),
      exclusions: exclusions.filter(Boolean),
      quotation: {
        totalPackagePrice: finalQuotationAmount ? Number(finalQuotationAmount.replace(/[^\d.]/g, '')) : undefined,
        pricePerPerson: perAdultPrice ? Number(perAdultPrice.replace(/[^\d.]/g, '')) : undefined,
        pricePerChild: perKidPrice ? Number(perKidPrice.replace(/[^\d.]/g, '')) : undefined,
        advanceAmount: advanceAmountPaid ? Number(advanceAmountPaid.replace(/[^\d.]/g, '')) : undefined,
        balancePendingAmount: balancePendingAmount ? Number(balancePendingAmount.replace(/[^\d.]/g, '')) : undefined,
        numberOfGuests: payload.groupVibe
      }
    };
  }, [
    fullName,
    clientPhone,
    clientEmail,
    inquiryId,
    departureCity,
    adults,
    kids,
    sharingType,
    travelStyle,
    tripTitle,
    subtitle,
    destination,
    startDate,
    endDate,
    duration,
    travelDates,
    vehicleType,
    pickupDrop,
    mealPlan,
    routeText,
    hotels,
    days,
    inclusions,
    exclusions,
    finalQuotationAmount,
    perAdultPrice,
    perKidPrice,
    advanceAmountPaid,
    balancePendingAmount,
    specialRequirements,
    heroImage,
    galleryImages,
    computedRouteCircuit
  ]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#f7fbfd] text-slate-800 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-[1380px] w-full mx-auto px-3 sm:px-6 lg:px-8 py-8 pt-24">
        {/* Autosave Toast Banner */}
        {draftRestoredToast && (
          <div className="mb-4 px-4 py-2.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs sm:text-sm font-semibold flex items-center justify-between shadow-xs animate-in fade-in">
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              Restored your previous unsaved draft from local storage!
            </span>
            <button
              onClick={() => setDraftRestoredToast(false)}
              className="text-amber-800 hover:text-amber-950 font-bold ml-3"
            >
              ✕
            </button>
          </div>
        )}

        {/* Top Header & Toolbar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-[#0077b6] text-xs font-bold uppercase tracking-wider mb-2.5">
              <Compass className="w-3.5 h-3.5 text-[#0077b6]" />
              Manual Itinerary Proposal Builder
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Create Bespoke Itinerary Proposal
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
              Build personalized proposals with auto-sequenced hotel dates, columnar day schedule, verified templates, and real-time live preview.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {/* Live Preview Button */}
            <Button
              type="button"
              onClick={() => setIsPreviewOpen(true)}
              className="bg-white border-2 border-sky-600 text-sky-700 hover:bg-sky-50 font-bold text-xs sm:text-sm shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <Eye className="w-4 h-4" />
              <span>Preview Live Proposal</span>
            </Button>

            {/* Clear Button */}
            <Button
              type="button"
              variant="outline"
              onClick={handleResetForm}
              className="text-slate-600 hover:text-rose-600 hover:border-rose-300 text-xs sm:text-sm font-bold cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
              <span>Clear Form</span>
            </Button>
          </div>
        </div>

        {/* ⚡ Quick-Fill Template Selector Bar */}
        <div className="bg-gradient-to-r from-sky-900 via-slate-900 to-sky-950 text-white rounded-2xl p-4 sm:p-5 mb-8 shadow-md border border-sky-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#ffde59] text-slate-950 flex items-center justify-center shrink-0 shadow-sm font-black">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
                  <span>Load From Website Flagship Itinerary</span>
                  <span className="px-2 py-0.5 rounded-full bg-[#ffde59] text-slate-950 text-[10px] font-black uppercase">
                    1-Click Auto Fill
                  </span>
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Pick any verified group trip to pre-populate days, hotels, highlights & photos. You can fully customize everything afterwards.
                </p>
              </div>
            </div>

            <div className="w-full md:w-auto md:min-w-[340px]">
              <select
                value={selectedTemplateSlug}
                onChange={e => handleTemplateSelect(e.target.value)}
                className="w-full bg-white text-slate-900 font-bold text-xs sm:text-sm rounded-xl px-3.5 py-2.5 border-2 border-amber-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ffde59]"
              >
                <option value="">⚡ Select an Itinerary Template...</option>
                {trips
                  .filter(t => !t.slug.startsWith('hampi') && !t.date?.includes('No Upcoming'))
                  .map(t => (
                    <option key={t.slug} value={t.slug}>
                      {t.title} ({t.duration})
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* SECTION 1: CLIENT & GUEST SPECIFICATIONS                 */}
        {/* ======================================================== */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 mb-6">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-sky-50 text-[#0077b6] flex items-center justify-center font-bold text-xs">
                1
              </div>
              <h2 className="text-base font-black text-slate-900 uppercase tracking-wide">
                Client &amp; Guest Specifications
              </h2>
            </div>
            <span className="text-xs text-slate-400 font-semibold">Step 1 of 6</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Client Full Name <span className="text-rose-500">*</span>
              </label>
              <Input
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                placeholder="e.g. Rahul & Sneha Sharma"
                className="bg-slate-50 font-semibold"
              />
            </div>

            {/* Mobile / WhatsApp */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp / Mobile Number</span>
              </label>
              <Input
                value={clientPhone}
                onChange={e => setClientPhone(e.target.value)}
                placeholder="e.g. +91 98765 43210"
                className="bg-slate-50"
              />
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-sky-600" />
                <span>Client Email Address</span>
              </label>
              <Input
                value={clientEmail}
                onChange={e => setClientEmail(e.target.value)}
                placeholder="e.g. rahul@example.com"
                className="bg-slate-50"
              />
            </div>

            {/* Zoho CRM Ref ID */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Zoho CRM Inquiry / Ref #
              </label>
              <Input
                value={inquiryId}
                onChange={e => setInquiryId(e.target.value)}
                placeholder="e.g. TT-8492"
                className="bg-slate-50"
              />
            </div>

            {/* Departure City */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                <span>Departure / Boarding City</span>
              </label>
              <Input
                value={departureCity}
                onChange={e => setDepartureCity(e.target.value)}
                placeholder="e.g. Mumbai / Delhi / Bangalore"
                className="bg-slate-50"
              />
            </div>

            {/* Adults & Kids */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Adults</label>
                <Input
                  type="number"
                  min="1"
                  value={adults}
                  onChange={e => setAdults(e.target.value)}
                  className="bg-slate-50 font-bold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Kids (Below 10)</label>
                <Input
                  type="number"
                  min="0"
                  value={kids}
                  onChange={e => setKids(e.target.value)}
                  className="bg-slate-50 font-bold"
                />
              </div>
            </div>

            {/* Room Sharing Type */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Room Occupancy / Sharing</label>
              <select
                value={sharingType}
                onChange={e => setSharingType(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-md px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#0077b6]"
              >
                {SHARING_OPTIONS.map(opt => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Travel Style */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Travel Style / Group Vibe</label>
              <select
                value={travelStyle}
                onChange={e => setTravelStyle(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-md px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#0077b6]"
              >
                {TRAVEL_STYLE_OPTIONS.map(opt => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION 2: TRIP LOGISTICS & DATES                         */}
        {/* ======================================================== */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 mb-6">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-sky-50 text-[#0077b6] flex items-center justify-center font-bold text-xs">
                2
              </div>
              <h2 className="text-base font-black text-slate-900 uppercase tracking-wide">
                Trip Logistics &amp; Smart Date Engine
              </h2>
            </div>
            <span className="text-xs text-slate-400 font-semibold">Step 2 of 6</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {/* Trip Title */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Itinerary Heading / Title <span className="text-rose-500">*</span>
              </label>
              <Input
                value={tripTitle}
                onChange={e => setTripTitle(e.target.value)}
                placeholder="e.g. Royal Rajasthan Luxury Heritage Escape"
                className="bg-slate-50 font-bold text-slate-900"
              />
            </div>

            {/* Destination */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Primary Destination <span className="text-rose-500">*</span>
              </label>
              <Input
                value={destination}
                onChange={e => setDestination(e.target.value)}
                placeholder="e.g. Rajasthan (Jaipur, Jodhpur, Udaipur)"
                className="bg-slate-50 font-semibold"
              />
            </div>

            {/* Subtitle */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Cover Subtitle / Badge
              </label>
              <Input
                value={subtitle}
                onChange={e => setSubtitle(e.target.value)}
                placeholder="e.g. PRIVATE BESPOKE EXPERIENCE"
                className="bg-slate-50"
              />
            </div>
          </div>

          {/* Date Picker Grid */}
          <div className="p-4 rounded-xl bg-sky-50/60 border border-sky-100 mb-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 flex-1">
                {/* Start Date */}
                <div>
                  <label className="block text-[11px] font-black uppercase tracking-wider text-sky-900 mb-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#0077b6]" />
                    <span>Start Date</span>
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={e => handleStartDateChange(e.target.value)}
                    className="w-full bg-white border border-sky-300 rounded-lg px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                {/* End Date */}
                <div>
                  <label className="block text-[11px] font-black uppercase tracking-wider text-sky-900 mb-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-sky-600" />
                    <span>End Date</span>
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={e => handleEndDateChange(e.target.value)}
                    className="w-full bg-white border border-sky-300 rounded-lg px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-[11px] font-black uppercase tracking-wider text-sky-900 mb-1">
                    Trip Duration
                  </label>
                  <Input
                    value={duration}
                    onChange={e => setDuration(e.target.value)}
                    placeholder="e.g. 7 Days / 6 Nights"
                    className="bg-white text-xs font-bold text-slate-900 h-9"
                  />
                </div>

                {/* Travel Dates Display */}
                <div>
                  <label className="block text-[11px] font-black uppercase tracking-wider text-sky-900 mb-1">
                    Formatted Dates
                  </label>
                  <Input
                    value={travelDates}
                    onChange={e => setTravelDates(e.target.value)}
                    placeholder="e.g. 15 Dec 2026 to 21 Dec 2026"
                    className="bg-white text-xs font-semibold text-slate-800 h-9"
                  />
                </div>
              </div>

              {/* Sync Days Button */}
              <Button
                type="button"
                onClick={handleAutoGenerateDaysFromDates}
                className="bg-[#0077b6] hover:bg-[#006093] text-white text-xs font-bold h-9 shrink-0 shadow-xs cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                <span>Sync Day Rows with Dates</span>
              </Button>
            </div>
          </div>

          {/* Vehicle, Meals & Pickup */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Vehicle Type */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <Car className="w-3.5 h-3.5 text-emerald-600" />
                <span>Allotted Vehicle Type</span>
              </label>
              <select
                value={vehicleType}
                onChange={e => setVehicleType(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-md px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#0077b6] mb-1.5"
              >
                {VEHICLE_OPTIONS.map(opt => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <Input
                value={vehicleType}
                onChange={e => setVehicleType(e.target.value)}
                placeholder="Or custom vehicle details"
                className="bg-slate-50 text-xs h-8"
              />
            </div>

            {/* Meal Plan */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <Utensils className="w-3.5 h-3.5 text-amber-600" />
                <span>Included Meal Plan</span>
              </label>
              <select
                value={mealPlan}
                onChange={e => setMealPlan(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-md px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#0077b6] mb-1.5"
              >
                {MEAL_PLAN_OPTIONS.map(opt => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <Input
                value={mealPlan}
                onChange={e => setMealPlan(e.target.value)}
                placeholder="Or custom meal plan details"
                className="bg-slate-50 text-xs h-8"
              />
            </div>

            {/* Pickup & Drop */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-rose-600" />
                <span>Pickup &amp; Drop Transit</span>
              </label>
              <select
                value={pickupDrop}
                onChange={e => setPickupDrop(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-md px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#0077b6] mb-1.5"
              >
                {PICKUP_DROP_OPTIONS.map(opt => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <Input
                value={pickupDrop}
                onChange={e => setPickupDrop(e.target.value)}
                placeholder="Or custom pickup/drop location"
                className="bg-slate-50 text-xs h-8"
              />
            </div>
          </div>

          {/* Route Circuit Text */}
          <div className="mt-4 pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5 text-[#0077b6]" />
                <span>Trip Route Circuit (Shown on Cover Banner &amp; Summary)</span>
              </label>
              {computedRouteCircuit && (
                <button
                  type="button"
                  onClick={handleApplyAutoRoute}
                  className="text-xs font-bold text-[#0077b6] hover:underline cursor-pointer flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3 text-[#ffde59]" />
                  <span>Auto-Sync Route: &quot;{computedRouteCircuit}&quot;</span>
                </button>
              )}
            </div>
            <Input
              value={routeText}
              onChange={e => setRouteText(e.target.value)}
              placeholder="e.g. Guwahati ➔ Shillong ➔ Cherrapunjee ➔ Dawki ➔ Guwahati"
              className="bg-slate-50 font-semibold"
            />
          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION 3: DAY-BY-DAY SPREADSHEET TABLE                   */}
        {/* ======================================================== */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 mb-4 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-sky-50 text-[#0077b6] flex items-center justify-center font-bold text-xs">
                3
              </div>
              <div>
                <h2 className="text-base font-black text-slate-900 uppercase tracking-wide">
                  Day-by-Day Schedule (Smart Spreadsheet Table)
                </h2>
                <p className="text-xs text-slate-500">
                  Each day includes custom heading, meals, route points, and highlights.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
                {days.length} Days Planned
              </span>
              <Button
                type="button"
                onClick={addDay}
                className="bg-[#0077b6] hover:bg-[#006093] text-white text-xs font-bold h-8 cursor-pointer shadow-xs"
              >
                <Plus className="w-3.5 h-3.5 mr-1" />
                <span>Add Day</span>
              </Button>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left text-xs border-collapse min-w-[1080px]">
              <thead>
                <tr className="bg-slate-100/90 text-slate-700 font-bold border-b border-slate-200 text-[11px] uppercase tracking-wider">
                  <th className="py-2.5 px-2 text-center w-12">Day</th>
                  <th className="py-2.5 px-3 min-w-[240px]">Day Narrative Title / Heading</th>
                  <th className="py-2.5 px-2 text-center w-20">Meals</th>
                  <th className="py-2.5 px-2 text-center w-16">Guide</th>
                  <th className="py-2.5 px-2 min-w-[120px]">From City</th>
                  <th className="py-2.5 px-2 min-w-[150px]">En-Route Stops</th>
                  <th className="py-2.5 px-2 min-w-[120px]">To / Stay City</th>
                  <th className="py-2.5 px-2 min-w-[140px]">Sightseeing #1</th>
                  <th className="py-2.5 px-2 min-w-[140px]">Sightseeing #2</th>
                  <th className="py-2.5 px-2 min-w-[140px]">Sightseeing #3</th>
                  <th className="py-2.5 px-2 text-center w-16">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {days.map((day, idx) => {
                  const isExpanded = expandedDayId === day.id;
                  const dayDateHuman = startDate ? formatIsoToHuman(addDaysToIso(startDate, idx)) : '';

                  return (
                    <tr key={day.id} className="hover:bg-sky-50/30 transition-colors">
                      {/* Day Number */}
                      <td className="py-2 px-2 text-center align-middle font-black text-slate-900 bg-slate-50/50">
                        <div className="flex flex-col items-center">
                          <span className="w-6 h-6 rounded-full bg-[#0077b6] text-white flex items-center justify-center font-bold text-xs">
                            {day.dayNumber}
                          </span>
                          {dayDateHuman && (
                            <span className="text-[9.5px] text-slate-400 font-bold mt-1 whitespace-nowrap">
                              {dayDateHuman.split(' ')[0]} {dayDateHuman.split(' ')[1]}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Day Narrative Title */}
                      <td className="py-2 px-2 align-middle">
                        <input
                          type="text"
                          value={day.customTitle || ''}
                          onChange={e => updateDay(day.id, 'customTitle', e.target.value)}
                          placeholder={`Day ${day.dayNumber}: ${day.city || 'Start'} to ${day.city2 || 'Destination'}`}
                          className="w-full bg-white border border-slate-300 rounded-md px-2.5 py-1.5 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#0077b6]"
                        />
                      </td>

                      {/* Meals Pills (B, L, D) */}
                      <td className="py-2 px-1 text-center align-middle">
                        <div className="flex items-center justify-center gap-0.5">
                          <button
                            type="button"
                            title="Breakfast"
                            onClick={() => updateDay(day.id, 'breakfast', !day.breakfast)}
                            className={`w-5 h-6 rounded text-[10px] font-black transition-colors cursor-pointer ${
                              day.breakfast
                                ? 'bg-amber-500 text-white shadow-2xs'
                                : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                            }`}
                          >
                            B
                          </button>
                          <button
                            type="button"
                            title="Lunch"
                            onClick={() => updateDay(day.id, 'lunch', !day.lunch)}
                            className={`w-5 h-6 rounded text-[10px] font-black transition-colors cursor-pointer ${
                              day.lunch
                                ? 'bg-emerald-600 text-white shadow-2xs'
                                : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                            }`}
                          >
                            L
                          </button>
                          <button
                            type="button"
                            title="Dinner"
                            onClick={() => updateDay(day.id, 'dinner', !day.dinner)}
                            className={`w-5 h-6 rounded text-[10px] font-black transition-colors cursor-pointer ${
                              day.dinner
                                ? 'bg-[#0077b6] text-white shadow-2xs'
                                : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                            }`}
                          >
                            D
                          </button>
                        </div>
                      </td>

                      {/* Guided Tour */}
                      <td className="py-2 px-1 text-center align-middle">
                        <button
                          type="button"
                          onClick={() => updateDay(day.id, 'guidedTour', !day.guidedTour)}
                          className={`px-2 py-0.5 rounded text-[10px] font-black transition-colors cursor-pointer ${
                            day.guidedTour
                              ? 'bg-amber-100 text-amber-900 border border-amber-300'
                              : 'bg-slate-100 text-slate-400'
                          }`}
                        >
                          {day.guidedTour ? 'Yes' : 'No'}
                        </button>
                      </td>

                      {/* City (From) */}
                      <td className="py-2 px-2 align-middle">
                        <input
                          type="text"
                          value={day.city}
                          onChange={e => updateDay(day.id, 'city', e.target.value)}
                          placeholder="e.g. Guwahati"
                          className="w-full bg-white border border-slate-300 rounded-md px-2 py-1 text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#0077b6]"
                        />
                      </td>

                      {/* En-Route Spot */}
                      <td className="py-2 px-2 align-top">
                        <div className="space-y-1">
                          {(day.enRoutes || ['']).map((spot, sIdx) => (
                            <div key={sIdx} className="flex items-center gap-1">
                              <input
                                type="text"
                                value={spot}
                                onChange={e => updateDayEnRoute(day.id, sIdx, e.target.value)}
                                placeholder={sIdx === 0 ? "e.g. Umiam Lake" : `Stop #${sIdx + 1}`}
                                className="w-full bg-white border border-slate-300 rounded-md px-2 py-1 text-xs text-slate-800 focus:outline-none focus:border-[#0077b6]"
                              />
                              {(day.enRoutes || []).length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => removeDayEnRoute(day.id, sIdx)}
                                  className="text-slate-400 hover:text-rose-600 p-0.5 shrink-0 cursor-pointer"
                                  title="Remove stop"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              )}
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => addDayEnRoute(day.id)}
                            className="text-[10px] font-bold text-[#0077b6] hover:underline cursor-pointer flex items-center gap-0.5"
                          >
                            <Plus className="w-3 h-3" />
                            <span>Add stop</span>
                          </button>
                        </div>
                      </td>

                      {/* City 2 (To / Stay) */}
                      <td className="py-2 px-2 align-middle">
                        <input
                          type="text"
                          value={day.city2}
                          onChange={e => updateDay(day.id, 'city2', e.target.value)}
                          placeholder="e.g. Shillong"
                          className="w-full bg-white border border-slate-300 rounded-md px-2 py-1 text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#0077b6]"
                        />
                      </td>

                      {/* Experience 1 */}
                      <td className="py-2 px-2 align-middle">
                        <input
                          type="text"
                          value={day.exp1}
                          onChange={e => updateDay(day.id, 'exp1', e.target.value)}
                          placeholder="e.g. Police Bazar Walk"
                          className="w-full bg-white border border-slate-300 rounded-md px-2 py-1 text-xs text-slate-800 focus:outline-none focus:border-[#0077b6]"
                        />
                      </td>

                      {/* Experience 2 */}
                      <td className="py-2 px-2 align-middle">
                        <input
                          type="text"
                          value={day.exp2}
                          onChange={e => updateDay(day.id, 'exp2', e.target.value)}
                          placeholder="e.g. Cafe Hopping"
                          className="w-full bg-white border border-slate-300 rounded-md px-2 py-1 text-xs text-slate-800 focus:outline-none focus:border-[#0077b6]"
                        />
                      </td>

                      {/* Experience 3 */}
                      <td className="py-2 px-2 align-middle">
                        <input
                          type="text"
                          value={day.exp3}
                          onChange={e => updateDay(day.id, 'exp3', e.target.value)}
                          placeholder="e.g. Sunset Viewpoint"
                          className="w-full bg-white border border-slate-300 rounded-md px-2 py-1 text-xs text-slate-800 focus:outline-none focus:border-[#0077b6]"
                        />
                      </td>

                      {/* Actions: Drawer toggle & Delete */}
                      <td className="py-2 px-1 text-center align-middle">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            type="button"
                            onClick={() => setExpandedDayId(isExpanded ? null : day.id)}
                            className={`p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer ${
                              isExpanded ? 'text-[#0077b6] bg-sky-50 ring-1 ring-sky-300' : 'text-slate-400'
                            }`}
                            title="Extra Day Options (Distance, Photo, Extra Highlights)"
                          >
                            <SlidersHorizontal className="w-3.5 h-3.5" />
                          </button>

                          {days.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeDay(day.id)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                              title="Remove Day"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Expanded Drawer for Additional Options */}
          {expandedDayId && (() => {
            const expDay = days.find(d => d.id === expandedDayId);
            if (!expDay) return null;

            return (
              <div className="mt-4 p-4 rounded-xl border border-sky-300 bg-sky-50/60 space-y-3 animate-in fade-in duration-200">
                <div className="flex items-center justify-between border-b border-sky-200 pb-2">
                  <span className="text-xs font-black uppercase text-[#0077b6] flex items-center gap-1.5">
                    <SlidersHorizontal className="w-4 h-4" />
                    Additional Options for Day {expDay.dayNumber}: &quot;{expDay.customTitle || expDay.city || 'Tour Day'}&quot;
                  </span>
                  <button
                    type="button"
                    onClick={() => setExpandedDayId(null)}
                    className="text-xs font-bold text-slate-500 hover:text-slate-800 cursor-pointer"
                  >
                    Close Drawer ✕
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Distance */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Approx. Travel Distance &amp; Drive Time
                    </label>
                    <Input
                      value={expDay.travelDistance || ''}
                      onChange={e => updateDay(expDay.id, 'travelDistance', e.target.value)}
                      placeholder="e.g. 120 km / 3.5 hrs"
                      className="bg-white text-xs h-9"
                    />
                  </div>

                  {/* Day Photo URL */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-[11px] font-bold text-slate-700">Day Photo URL</label>
                      <label className="text-[10px] font-bold text-[#0077b6] hover:underline cursor-pointer flex items-center gap-1">
                        <UploadCloud className="w-3 h-3" />
                        <span>Upload</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={e => {
                            const file = e.target.files?.[0];
                            if (file) handleUploadFile(file, url => updateDay(expDay.id, 'image', url));
                          }}
                        />
                      </label>
                    </div>
                    <Input
                      value={expDay.image || ''}
                      onChange={e => updateDay(expDay.id, 'image', e.target.value)}
                      placeholder="e.g. /image/Meghalaya/IMG_0857.JPEG"
                      className="bg-white text-xs h-9"
                    />
                  </div>

                  {/* Sightseeing 4 */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Additional Sightseeing Point #4
                    </label>
                    <Input
                      value={expDay.exp4 || ''}
                      onChange={e => updateDay(expDay.id, 'exp4', e.target.value)}
                      placeholder="e.g. Local Handicraft Emporium"
                      className="bg-white text-xs h-9"
                    />
                  </div>
                </div>

                {/* Multiline Narrative */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Detailed Narrative / Schedule Activities Paragraph (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={expDay.activitiesText || ''}
                    onChange={e => updateDay(expDay.id, 'activitiesText', e.target.value)}
                    placeholder="Enter detailed paragraph or line-by-line bullet points of today's activities..."
                    className="w-full bg-white border border-slate-300 rounded-md p-2 text-xs text-slate-800 focus:outline-none focus:border-[#0077b6]"
                  />
                </div>
              </div>
            );
          })()}
        </section>

        {/* ======================================================== */}
        {/* SECTION 4: ACCOMMODATIONS & HOTELS TABLE                  */}
        {/* ======================================================== */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 mb-4 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-sky-50 text-[#0077b6] flex items-center justify-center font-bold text-xs">
                4
              </div>
              <div>
                <h2 className="text-base font-black text-slate-900 uppercase tracking-wide">
                  Accommodations &amp; Hotels Table
                </h2>
                <p className="text-xs text-slate-500">
                  Stay dates auto-sequence from the Start Date and night allocations.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              {/* Live Night Counter Badge */}
              <div
                className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 ${
                  totalHotelNights === expectedTripNights
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                    : 'bg-amber-50 text-amber-800 border-amber-300'
                }`}
              >
                {totalHotelNights === expectedTripNights ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                )}
                <span>
                  Allocated: {totalHotelNights} / {expectedTripNights} Nights
                </span>
              </div>

              <Button
                type="button"
                onClick={addHotel}
                className="bg-[#0077b6] hover:bg-[#006093] text-white text-xs font-bold h-8 cursor-pointer shadow-xs"
              >
                <Plus className="w-3.5 h-3.5 mr-1" />
                <span>Add Hotel</span>
              </Button>
            </div>
          </div>

          {/* Hotels Table */}
          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left text-xs border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-slate-100/90 text-slate-700 font-bold border-b border-slate-200 text-[11px] uppercase tracking-wider">
                  <th className="py-2.5 px-3 w-10 text-center">#</th>
                  <th className="py-2.5 px-3 min-w-[130px]">Stay City</th>
                  <th className="py-2.5 px-3 min-w-[220px]">Hotel / Resort Name</th>
                  <th className="py-2.5 px-3 min-w-[140px]">Hotel Category / Rating</th>
                  <th className="py-2.5 px-3 w-20 text-center">Nights</th>
                  <th className="py-2.5 px-3 min-w-[170px]">Auto Stay Dates</th>
                  <th className="py-2.5 px-3 min-w-[140px]">Room Type</th>
                  <th className="py-2.5 px-2 text-center w-12">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {hotels.map((hotel, idx) => (
                  <tr key={hotel.id} className="hover:bg-sky-50/30 transition-colors">
                    <td className="py-2 px-3 text-center align-middle font-bold text-slate-400">
                      {idx + 1}
                    </td>

                    {/* City */}
                    <td className="py-2 px-3 align-middle">
                      <input
                        type="text"
                        value={hotel.city}
                        onChange={e => updateHotel(hotel.id, 'city', e.target.value)}
                        placeholder="e.g. Shillong"
                        className="w-full bg-white border border-slate-300 rounded-md px-2.5 py-1.5 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#0077b6]"
                      />
                    </td>

                    {/* Hotel Name */}
                    <td className="py-2 px-3 align-middle">
                      <input
                        type="text"
                        value={hotel.hotelName}
                        onChange={e => updateHotel(hotel.id, 'hotelName', e.target.value)}
                        placeholder="e.g. Ri Kynjai Resort / Polo Towers"
                        className="w-full bg-white border border-slate-300 rounded-md px-2.5 py-1.5 text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#0077b6]"
                      />
                    </td>

                    {/* Star Rating Select */}
                    <td className="py-2 px-3 align-middle">
                      <select
                        value={hotel.starRating}
                        onChange={e => updateHotel(hotel.id, 'starRating', e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-md px-2.5 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#0077b6]"
                      >
                        {STAR_RATING_OPTIONS.map(opt => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </td>

                    {/* Nights */}
                    <td className="py-2 px-3 align-middle text-center">
                      <input
                        type="number"
                        min="1"
                        max="30"
                        value={hotel.nights}
                        onChange={e => updateHotel(hotel.id, 'nights', e.target.value)}
                        className="w-16 bg-white border border-slate-300 rounded-md px-2 py-1.5 text-xs font-black text-center text-slate-900 focus:outline-none focus:border-[#0077b6]"
                      />
                    </td>

                    {/* Stay Dates (Readonly auto-computed) */}
                    <td className="py-2 px-3 align-middle">
                      <div className="text-[11px] font-bold text-sky-900 bg-sky-50 px-2.5 py-1 rounded-md border border-sky-200 truncate">
                        {hotel.stayDates || `${hotel.nights} Nights`}
                      </div>
                    </td>

                    {/* Room Type */}
                    <td className="py-2 px-3 align-middle">
                      <select
                        value={hotel.roomType}
                        onChange={e => updateHotel(hotel.id, 'roomType', e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-md px-2 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#0077b6]"
                      >
                        {ROOM_TYPE_OPTIONS.map(opt => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </td>

                    {/* Action */}
                    <td className="py-2 px-2 text-center align-middle">
                      <button
                        type="button"
                        onClick={() => removeHotel(hotel.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Remove Hotel"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION 5: INCLUSIONS & EXCLUSIONS                        */}
        {/* ======================================================== */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Inclusions */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                <h3 className="text-sm sm:text-base font-black text-slate-900 uppercase tracking-wide flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Package Inclusions</span>
                </h3>
                <button
                  type="button"
                  onClick={handleLoadDefaultInclusions}
                  className="text-xs font-bold text-[#0077b6] hover:underline cursor-pointer flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3 text-[#ffde59]" />
                  <span>Reset Defaults</span>
                </button>
              </div>

              {/* Quick Add Chips */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {['Airport Transfers', 'Dedicated Chauffeur', 'Daily Breakfast & Dinner', 'Local Guide', 'Bonfire Night', '5% GST Included'].map(tag => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleAddInclusionTag(tag)}
                    className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-[10.5px] font-bold border border-emerald-200 hover:bg-emerald-100 cursor-pointer"
                  >
                    + {tag}
                  </button>
                ))}
              </div>

              <div className="space-y-2">
                {inclusions.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 mt-2.5 shrink-0" />
                    <Input
                      value={item}
                      onChange={e => updateInclusion(idx, e.target.value)}
                      placeholder={`Inclusion point #${idx + 1}`}
                      className="bg-slate-50 text-xs font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => removeInclusion(idx)}
                      className="text-slate-400 hover:text-rose-600 p-2 shrink-0 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={addInclusion}
              className="mt-4 border-dashed border-slate-300 text-slate-700 text-xs font-bold w-full cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 mr-1" /> Add Inclusion Item
            </Button>
          </div>

          {/* Exclusions */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                <h3 className="text-sm sm:text-base font-black text-slate-900 uppercase tracking-wide flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-rose-500" />
                  <span>Package Exclusions</span>
                </h3>
                <button
                  type="button"
                  onClick={handleLoadDefaultExclusions}
                  className="text-xs font-bold text-[#0077b6] hover:underline cursor-pointer flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3 text-[#ffde59]" />
                  <span>Reset Defaults</span>
                </button>
              </div>

              <div className="space-y-2">
                {exclusions.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <X className="w-3.5 h-3.5 text-rose-500 mt-2.5 shrink-0" />
                    <Input
                      value={item}
                      onChange={e => updateExclusion(idx, e.target.value)}
                      placeholder={`Exclusion point #${idx + 1}`}
                      className="bg-slate-50 text-xs font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => removeExclusion(idx)}
                      className="text-slate-400 hover:text-rose-600 p-2 shrink-0 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={addExclusion}
              className="mt-4 border-dashed border-slate-300 text-slate-700 text-xs font-bold w-full cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 mr-1" /> Add Exclusion Item
            </Button>
          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION 6: QUOTATION & COMMERCIALS                        */}
        {/* ======================================================== */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 mb-6">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-sky-50 text-[#0077b6] flex items-center justify-center font-bold text-xs">
                5
              </div>
              <h2 className="text-base font-black text-slate-900 uppercase tracking-wide">
                Quotation, Pricing &amp; Advance Token
              </h2>
            </div>
            <span className="text-xs text-slate-400 font-semibold">Step 5 of 6</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
            {/* Total Quotation Amount */}
            <div>
              <label className="block text-xs font-black text-slate-900 mb-1 flex items-center gap-1">
                <IndianRupee className="w-3.5 h-3.5 text-emerald-600" />
                <span>Total Package Price (₹)</span>
              </label>
              <Input
                value={finalQuotationAmount}
                onChange={e => handleQuotationChange(e.target.value)}
                placeholder="e.g. 54999"
                className="bg-slate-50 font-black text-sm text-emerald-700"
              />
            </div>

            {/* Per Adult Price */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Per Adult Rate (₹)
              </label>
              <Input
                value={perAdultPrice}
                onChange={e => setPerAdultPrice(e.target.value)}
                placeholder="e.g. 27499"
                className="bg-slate-50 font-semibold"
              />
            </div>

            {/* Per Child Price */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Per Child Rate (₹)
              </label>
              <Input
                value={perKidPrice}
                onChange={e => setPerKidPrice(e.target.value)}
                placeholder="e.g. 14999"
                className="bg-slate-50"
              />
            </div>

            {/* Advance Token Amount */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Advance Token (₹)</span>
              </label>
              <Input
                value={advanceAmountPaid}
                onChange={e => handleAdvanceChange(e.target.value)}
                placeholder="e.g. 10000"
                className="bg-slate-50 font-bold text-amber-700"
              />
            </div>

            {/* Balance Pending Amount */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Balance Pending (₹)
              </label>
              <Input
                value={balancePendingAmount}
                onChange={e => setBalancePendingAmount(e.target.value)}
                placeholder="Auto-calculated"
                className="bg-slate-50 font-semibold text-slate-700"
              />
            </div>
          </div>

          {/* Special Requirements */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Special Requirements &amp; Notes for Guest
            </label>
            <Input
              value={specialRequirements}
              onChange={e => setSpecialRequirements(e.target.value)}
              placeholder="e.g. Candlelight dinner setup on Day 3, pure veg Jain meals, high floor rooms requested"
              className="bg-slate-50"
            />
          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION 7: VISUAL MEDIA & HERO PHOTO                     */}
        {/* ======================================================== */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 mb-8">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-sky-50 text-[#0077b6] flex items-center justify-center font-bold text-xs">
                6
              </div>
              <h2 className="text-base font-black text-slate-900 uppercase tracking-wide">
                Visual Media &amp; High-Resolution Photos
              </h2>
            </div>
            <span className="text-xs text-slate-400 font-semibold">Step 6 of 6</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Hero Cover Banner */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-800">Cover Banner Image URL</label>
                <label className="text-xs font-bold text-[#0077b6] hover:underline cursor-pointer flex items-center gap-1">
                  <UploadCloud className="w-3.5 h-3.5" />
                  <span>Upload Cover Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={e => {
                      const file = e.target.files?.[0];
                      if (file) handleUploadFile(file, url => setHeroImage(url));
                    }}
                  />
                </label>
              </div>
              <Input
                value={heroImage}
                onChange={e => setHeroImage(e.target.value)}
                placeholder="e.g. /image/Meghalaya/IMG_0857.JPEG or Unsplash URL"
                className="bg-slate-50"
              />
              {heroImage && (
                <div className="mt-2 relative w-full h-32 rounded-xl overflow-hidden border border-slate-200">
                  <img src={heroImage} alt="Cover Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            {/* 4 Gallery Highlights */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                4 Showcase Photos (Displayed below Overview)
              </label>
              <div className="grid grid-cols-2 gap-2">
                {galleryImages.map((imgUrl, gIdx) => (
                  <div key={gIdx} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-500">Photo #{gIdx + 1}</span>
                      <label className="text-[10px] font-bold text-[#0077b6] hover:underline cursor-pointer flex items-center gap-0.5">
                        <UploadCloud className="w-2.5 h-2.5" />
                        <span>Upload</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={e => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleUploadFile(file, url => {
                                setGalleryImages(prev => {
                                  const next = [...prev];
                                  next[gIdx] = url;
                                  return next;
                                });
                              });
                            }
                          }}
                        />
                      </label>
                    </div>
                    <Input
                      value={imgUrl}
                      onChange={e => {
                        const val = e.target.value;
                        setGalleryImages(prev => {
                          const next = [...prev];
                          next[gIdx] = val;
                          return next;
                        });
                      }}
                      placeholder={`Image URL #${gIdx + 1}`}
                      className="bg-slate-50 text-xs h-8"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* PUBLISH CTA BAR & ERROR/SUCCESS DISPLAY                   */}
        {/* ======================================================== */}
        <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-12 flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#ffde59] text-xs font-black uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              Ready to Send to Guest
            </div>
            <h2 className="text-2xl sm:text-3xl font-black mt-1">
              Generate &amp; Publish Official Proposal
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-xl leading-relaxed">
              Creates a permanent live web itinerary link (`/itinerary/[slug]`) and high-resolution downloadable PDF proposal.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {/* Live Preview Button */}
            <Button
              type="button"
              onClick={() => setIsPreviewOpen(true)}
              className="bg-white/10 hover:bg-white/20 border border-white/25 text-white font-bold text-sm px-5 py-3 h-12 rounded-xl cursor-pointer"
            >
              <Eye className="w-4 h-4 mr-2 text-[#ffde59]" />
              <span>Preview First</span>
            </Button>

            {/* Publish Button */}
            <Button
              onClick={handlePublish}
              disabled={generating}
              className="bg-[#ffde59] hover:bg-amber-300 text-slate-950 font-black text-sm sm:text-base px-8 sm:px-10 py-3.5 h-12 rounded-xl shadow-lg hover:shadow-xl transition-transform hover:scale-105 active:scale-95 cursor-pointer uppercase tracking-wider"
            >
              {generating ? (
                <>
                  <RefreshCw className="w-5 h-5 mr-2 animate-spin text-slate-950" />
                  Generating Proposal...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2 text-slate-950 fill-current" />
                  Generate Proposal Live ➔
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Error Notification */}
        {genError && (
          <div className="mb-8 p-4 rounded-2xl bg-rose-50 border border-rose-300 text-rose-900 text-sm font-bold flex items-center gap-3 shadow-xs">
            <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
            <span>{genError}</span>
          </div>
        )}

        {/* Success Banner */}
        {genSuccess && (
          <div className="mb-12 p-6 rounded-3xl bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white shadow-2xl border border-emerald-500/40 animate-in fade-in duration-300">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black uppercase tracking-wider border border-emerald-400/30">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Published Successfully
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                  Itinerary Proposal is Ready!
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Live URL:{' '}
                  <span className="font-mono text-[#ffde59] font-bold">{genSuccess.url}</span>
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <a
                  href={genSuccess.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-white text-slate-900 font-extrabold text-xs sm:text-sm hover:bg-slate-100 flex items-center gap-2 shadow-md transition-transform hover:scale-105"
                >
                  <ExternalLink className="w-4 h-4 text-[#0077b6]" />
                  <span>Open Live Proposal</span>
                </a>

                <Button
                  onClick={() =>
                    copyToClipboard(
                      typeof window !== 'undefined'
                        ? `${window.location.origin}${genSuccess.url}`
                        : genSuccess.url
                    )
                  }
                  className="bg-[#0077b6] hover:bg-[#006093] text-white font-black text-xs sm:text-sm px-5 py-2.5 h-10 rounded-xl shadow-md cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 mr-1 text-emerald-300" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-1 text-white" />
                      <span>Copy Client Link</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Recently Generated History */}
        <section className="mb-12">
          <ItineraryHistorySection />
        </section>
      </main>

      {/* ======================================================== */}
      {/* LIVE PROPOSAL PREVIEW MODAL                               */}
      {/* ======================================================== */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex flex-col items-center justify-start overflow-y-auto p-2 sm:p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden my-4 sm:my-6 border border-slate-300 flex flex-col max-h-[92vh]">
            {/* Modal Header Bar */}
            <div className="sticky top-0 z-50 bg-slate-950 text-white px-4 sm:px-6 py-3.5 flex items-center justify-between border-b border-slate-800 shadow-md shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#ffde59] text-slate-950 flex items-center justify-center font-bold">
                  <Eye className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
                    <span>Live Client Proposal Preview</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase border border-emerald-500/30">
                      Real-Time Rendering
                    </span>
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    This is the exact view your client will see on web and in downloaded PDF.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Button
                  onClick={handlePublish}
                  disabled={generating}
                  className="bg-[#ffde59] hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm px-4 sm:px-5 py-2 h-9 rounded-xl shadow-md cursor-pointer uppercase tracking-wider"
                >
                  {generating ? 'Publishing...' : 'Publish This Proposal ➔'}
                </Button>

                <button
                  type="button"
                  onClick={() => setIsPreviewOpen(false)}
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer text-lg font-bold ml-1"
                  title="Close Preview"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Scrollable Body */}
            <div className="flex-1 overflow-y-auto bg-slate-100 p-2 sm:p-5">
              <CuratedItineraryView itinerary={previewItinerary} />
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
