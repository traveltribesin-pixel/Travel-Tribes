'use client';

import { useState, useMemo } from 'react';
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
  SlidersHorizontal
} from 'lucide-react';
import { ItineraryHistorySection } from '@/components/itinerary/itinerary-history-section';

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
  // Optional extra details in row expander:
  travelDistance?: string;
  customTitle?: string;
  activitiesText?: string;
  image?: string;
}

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

const formatIsoToShort = (iso: string): string => {
  if (!iso) return '';
  try {
    const [y, m, d] = iso.split('-').map(Number);
    if (!y || !m || !d) return iso;
    const date = new Date(y, m - 1, d);
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
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
  // 1. Overview & Traveler Details (Zero dummy data, all start empty)
  const [tripTitle, setTripTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [fullName, setFullName] = useState('');
  const [inquiryId, setInquiryId] = useState('');
  const [destination, setDestination] = useState('');
  
  // Date Selection Format (Start Date & End Date)
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [duration, setDuration] = useState('');
  const [travelDates, setTravelDates] = useState('');
  
  const [groupVibe, setGroupVibe] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [pickupDrop, setPickupDrop] = useState('');
  const [mealPlan, setMealPlan] = useState('');
  const [routeText, setRouteText] = useState('');

  // 2. Hotels / Accommodations Table
  const [hotels, setHotels] = useState<HotelItem[]>([
    {
      id: 'h-1',
      city: '',
      hotelName: '',
      starRating: '',
      nights: '0',
      stayDates: '',
      roomType: ''
    }
  ]);

  // 3. Day-by-Day Schedule (Columnar Table Format - No Date Column, No Hotel Column)
  const [days, setDays] = useState<DayItem[]>([
    {
      id: 'd-1',
      dayNumber: 1,
      guidedTour: false,
      breakfast: false,
      lunch: false,
      dinner: false,
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

  // Expanded row ID for optional details (drawer)
  const [expandedDayId, setExpandedDayId] = useState<string | null>(null);

  // 4. Inclusions & Exclusions
  const [inclusions, setInclusions] = useState<string[]>(['']);
  const [exclusions, setExclusions] = useState<string[]>(['']);

  // 5. Commercials & Quotation
  const [finalQuotationAmount, setFinalQuotationAmount] = useState('');
  const [perAdultPrice, setPerAdultPrice] = useState('');
  const [perKidPrice, setPerKidPrice] = useState('');
  const [advanceAmountPaid, setAdvanceAmountPaid] = useState('');
  const [balancePendingAmount, setBalancePendingAmount] = useState('');
  const [specialRequirements, setSpecialRequirements] = useState('');

  // 6. Visual Media
  const [heroImage, setHeroImage] = useState('');
  const [galleryImages, setGalleryImages] = useState<string[]>(['', '', '', '']);

  // Publishing & UI State
  const [generating, setGenerating] = useState(false);
  const [genSuccess, setGenSuccess] = useState<any>(null);
  const [genError, setGenError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

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
      const rawN = parseInt(h.nights.replace(/\D/g, ''), 10);
      if (!isNaN(rawN) && rawN > 0) sum += rawN;
    });
    return sum;
  }, [hotels]);

  // Date Change Handler for Start Date & End Date
  const handleStartDateChange = (newStart: string) => {
    setStartDate(newStart);
    // Recompute sequential hotel stay dates immediately
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
      alert('Please select both Start Date and End Date!');
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
        guidedTour: existing?.guidedTour || false,
        breakfast: existing?.breakfast || false,
        lunch: existing?.lunch || false,
        dinner: existing?.dinner || false,
        city: existing?.city || '',
        enRoutes: existing?.enRoutes || [''],
        city2: existing?.city2 || '',
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
        city: '',
        hotelName: '',
        starRating: '',
        nights: '0',
        stayDates: '',
        roomType: ''
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
          starRating: '',
          nights: '0',
          stayDates: '',
          roomType: ''
        }
      ]);
      return;
    }
    setHotels(prev => recomputeHotelDates(startDate, prev.filter(h => h.id !== id)));
  };

  // Day Handlers (Columnar Table)
  const addDay = () => {
    setDays(prev => {
      const nextNum = prev.length + 1;
      return [
        ...prev,
        {
          id: `d-${Date.now()}`,
          dayNumber: nextNum,
          guidedTour: false,
          breakfast: false,
          lunch: false,
          dinner: false,
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
      ];
    });
  };

  const updateDay = (id: string, field: keyof DayItem, val: any) => {
    setDays(prev => prev.map(d => (d.id === id ? { ...d, [field]: val } : d)));
  };

  const removeDay = (id: string) => {
    if (days.length <= 1) {
      setDays([
        {
          id: 'd-1',
          dayNumber: 1,
          guidedTour: false,
          breakfast: false,
          lunch: false,
          dinner: false,
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
      return;
    }
    setDays(prev => {
      const filtered = prev.filter(d => d.id !== id);
      return filtered.map((d, idx) => ({ ...d, dayNumber: idx + 1 }));
    });
  };

  // En-Route Handlers (Under En-Route Spot)
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

  // Extra Experience Handlers (Under Experience 4)
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

  // Reset entire form to blank
  const handleResetForm = () => {
    if (window.confirm('Clear all fields to a fresh blank state?')) {
      setTripTitle('');
      setSubtitle('');
      setFullName('');
      setInquiryId('');
      setDestination('');
      setStartDate('');
      setEndDate('');
      setDuration('');
      setTravelDates('');
      setGroupVibe('');
      setVehicleType('');
      setPickupDrop('');
      setMealPlan('');
      setRouteText('');
      setHotels([
        {
          id: 'h-1',
          city: '',
          hotelName: '',
          starRating: '',
          nights: '0',
          stayDates: '',
          roomType: ''
        }
      ]);
      setDays([
        {
          id: 'd-1',
          dayNumber: 1,
          guidedTour: false,
          breakfast: false,
          lunch: false,
          dinner: false,
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
      setInclusions(['']);
      setExclusions(['']);
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
    }
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

    const payload = {
      tripTitle: tripTitle.trim() || undefined,
      subtitle: subtitle.trim() || undefined,
      fullName: fullName.trim() || 'Valued Guest',
      clientName: fullName.trim() || 'Valued Guest',
      inquiryId: inquiryId.trim() || undefined,
      destination: destination.trim() || tripTitle.trim() || 'Custom Tour',
      duration: duration.trim() || `${days.length} Days`,
      travelDates: travelDates.trim() || (startDate && endDate ? `${formatIsoToHuman(startDate)} to ${formatIsoToHuman(endDate)}` : startDate ? formatIsoToHuman(startDate) : undefined),
      startDate: startDate || undefined,
      endDate: endDate || undefined,
      groupVibe: groupVibe.trim() || undefined,
      vehicleType: vehicleType.trim() || undefined,
      pickupDrop: pickupDrop.trim() || undefined,
      mealPlan: mealPlan.trim() || undefined,
      routeText: routeText.trim() || (computedRouteCircuit || undefined),
      hotels: hotels
        .filter(h => (h.hotelName.trim() || h.city.trim()) && parseInt(h.nights || '0', 10) > 0)
        .map(h => ({
          city: h.city.trim(),
          hotelName: h.hotelName.trim(),
          starRating: h.starRating.trim() || undefined,
          nights: `${parseInt(h.nights, 10)} Night${parseInt(h.nights, 10) > 1 ? 's' : ''}`,
          stayDates: h.stayDates.trim() || undefined,
          roomType: h.roomType.trim() || undefined
        })),
      dayActivities: days.map(d => ({
        dayNumber: d.dayNumber,
        title: d.customTitle?.trim() || undefined,
        // Date is auto-computed sequentially from Start Date
        date: startDate ? addDaysToIso(startDate, d.dayNumber - 1) : undefined,
        city: d.city?.trim() || undefined,
        city2: d.city2?.trim() || undefined,
        enRoutes: (d.enRoutes || []).map(s => s.trim()).filter(Boolean),
        enRouteExperiences: (d.enRoutes || []).map(s => s.trim()).filter(Boolean).join(' & ') || undefined,
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

    try {
      const res = await fetch('/api/sheet/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to generate itinerary.');
      }
      setGenSuccess(data);
    } catch (err: any) {
      setGenError(err.message || 'Error occurred while publishing itinerary.');
    } finally {
      setGenerating(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#f7fbfd] text-slate-800 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-[1360px] w-full mx-auto px-3 sm:px-6 lg:px-8 py-8 pt-24">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-[#0077b6] text-xs font-bold uppercase tracking-wider mb-2.5">
              <Compass className="w-3.5 h-3.5 text-[#0077b6]" />
              Manual Itinerary Builder
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Create Custom Itinerary Proposal
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
              Dates and hotel night allocations auto-sequence from the Start Date. Day schedule is organized in a sleek, non-bloated column format.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Button
              type="button"
              onClick={handleResetForm}
              variant="outline"
              size="sm"
              className="h-10 px-4 text-xs border border-slate-300 text-slate-600 hover:text-rose-600 hover:border-rose-300 hover:bg-rose-50/50 rounded-xl font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Clear All Fields
            </Button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* SECTION 1: ITINERARY & TRAVELER OVERVIEW (PAGE 1 & 2)     */}
        {/* ======================================================== */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 mb-6">
          <div className="flex items-center gap-2.5 pb-4 mb-5 border-b border-slate-100">
            <div className="w-8 h-8 rounded-xl bg-sky-50 text-[#0077b6] flex items-center justify-center font-bold text-sm">
              1
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900 uppercase tracking-wide">
                Trip &amp; Traveler Overview
              </h2>
              <p className="text-xs text-slate-500">Details displayed on the Cover Banner (Page 1) and Summary (Page 2)</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Itinerary Title */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Itinerary / Proposal Title <span className="text-[#0077b6] font-semibold">(Cover Page Headline)</span>
              </label>
              <Input
                value={tripTitle}
                onChange={e => setTripTitle(e.target.value)}
                placeholder="e.g. Royal Heritage of Rajasthan"
                className="bg-white border-slate-300 text-sm h-10 font-bold text-slate-900 focus:border-[#0077b6]"
              />
            </div>

            {/* Client / Guest Name */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Client / Guest Name <span className="text-[#0077b6] font-semibold">(&quot;Exclusive Proposal For...&quot;)</span>
              </label>
              <Input
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                placeholder="e.g. Amit Maurya & Family"
                className="bg-white border-slate-300 text-sm h-10 font-semibold text-slate-900 focus:border-[#0077b6]"
              />
            </div>

            {/* Destination */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">Destination / State</label>
              <Input
                value={destination}
                onChange={e => setDestination(e.target.value)}
                placeholder="e.g. Rajasthan"
                className="bg-white border-slate-300 text-xs h-10 font-medium text-slate-900 focus:border-[#0077b6]"
              />
            </div>

            {/* Subtitle / Trip Style */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Subtitle / Style Tagline <span className="text-slate-400 font-normal">(e.g. PRIVATE BESPOKE EXPERIENCE / ROYAL HERITAGE GETAWAY)</span>
              </label>
              <Input
                value={subtitle}
                onChange={e => setSubtitle(e.target.value)}
                placeholder="e.g. PRIVATE BESPOKE EXPERIENCE"
                className="bg-white border-slate-300 text-xs h-10 font-medium text-slate-900 focus:border-[#0077b6]"
              />
            </div>

            {/* Start Date (Date Picker) */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#0077b6]" />
                <span>Start Date <strong className="text-[#0077b6]">(Master Sequence Date)</strong></span>
              </label>
              <Input
                type="date"
                value={startDate}
                onChange={e => handleStartDateChange(e.target.value)}
                className="bg-white border-slate-300 text-xs h-10 font-bold text-slate-900 focus:border-[#0077b6]"
              />
            </div>

            {/* End Date (Date Picker) */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#0077b6]" />
                <span>End Date</span>
              </label>
              <Input
                type="date"
                value={endDate}
                onChange={e => handleEndDateChange(e.target.value)}
                className="bg-white border-slate-300 text-xs h-10 font-bold text-slate-900 focus:border-[#0077b6]"
              />
            </div>

            {/* Duration Text */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Duration Text <span className="text-emerald-700 font-semibold">(Auto-calculated)</span>
              </label>
              <Input
                value={duration}
                onChange={e => setDuration(e.target.value)}
                placeholder="e.g. 6 Days / 5 Nights"
                className="bg-white border-slate-300 text-xs h-10 font-bold text-slate-900 focus:border-[#0077b6]"
              />
            </div>

            {/* Travel Dates Formatted */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Travel Dates Display <span className="text-emerald-700 font-semibold">(Auto-calculated)</span>
              </label>
              <Input
                value={travelDates}
                onChange={e => setTravelDates(e.target.value)}
                placeholder="e.g. 15 Nov 2024 to 20 Nov 2024"
                className="bg-white border-slate-300 text-xs h-10 font-medium text-slate-900 focus:border-[#0077b6]"
              />
            </div>

            {/* Group & Style */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">Group &amp; Sharing Style</label>
              <Input
                value={groupVibe}
                onChange={e => setGroupVibe(e.target.value)}
                placeholder="e.g. 2 Adults (Double Sharing) • Family Trip"
                className="bg-white border-slate-300 text-xs h-10 font-medium text-slate-900 focus:border-[#0077b6]"
              />
            </div>

            {/* Allotted Vehicle */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">Vehicle &amp; Transit</label>
              <Input
                value={vehicleType}
                onChange={e => setVehicleType(e.target.value)}
                placeholder="e.g. AC Ertiga (All tolls & parking included)"
                className="bg-white border-slate-300 text-xs h-10 font-medium text-slate-900 focus:border-[#0077b6]"
              />
            </div>

            {/* Meal Plan */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">Meal Plan</label>
              <Input
                value={mealPlan}
                onChange={e => setMealPlan(e.target.value)}
                placeholder="e.g. All Meals / Daily Breakfast & Dinner"
                className="bg-white border-slate-300 text-xs h-10 font-medium text-slate-900 focus:border-[#0077b6]"
              />
            </div>

            {/* Pickup & Drop */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">Pickup &amp; Drop</label>
              <Input
                value={pickupDrop}
                onChange={e => setPickupDrop(e.target.value)}
                placeholder="e.g. Mumbai Pickup & Drop Included"
                className="bg-white border-slate-300 text-xs h-10 font-medium text-slate-900 focus:border-[#0077b6]"
              />
            </div>

            {/* Trip Route Circuit */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-slate-800">Route Circuit Text</label>
                {computedRouteCircuit && (
                  <button
                    type="button"
                    onClick={handleApplyAutoRoute}
                    className="text-[10px] font-bold text-[#0077b6] hover:underline"
                  >
                    Auto-Fill Route
                  </button>
                )}
              </div>
              <Input
                value={routeText}
                onChange={e => setRouteText(e.target.value)}
                placeholder="e.g. Jaipur ➔ Jodhpur ➔ Udaipur"
                className="bg-white border-slate-300 text-xs h-10 font-medium text-slate-900 focus:border-[#0077b6]"
              />
            </div>

            {/* Inquiry Ref ID */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">Inquiry / Proposal Ref ID</label>
              <Input
                value={inquiryId}
                onChange={e => setInquiryId(e.target.value)}
                placeholder="e.g. TT-466878"
                className="bg-white border-slate-300 text-xs h-10 font-mono font-bold text-[#0077b6] focus:border-[#0077b6]"
              />
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION 2: DAY-BY-DAY SCHEDULE (COLUMN FORM SPREADSHEET)  */}
        {/* ======================================================== */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-sky-50 text-[#0077b6] flex items-center justify-center font-bold text-sm">
                2
              </div>
              <div>
                <h2 className="text-base font-black text-slate-900 uppercase tracking-wide">
                  Day-by-Day Schedule (Columnar Spreadsheet Table)
                </h2>
                <p className="text-xs text-slate-500">
                  Dates sequence automatically from Start Date. Stays link directly from the Hotels section.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {startDate && endDate && (
                <Button
                  type="button"
                  onClick={handleAutoGenerateDaysFromDates}
                  size="sm"
                  variant="outline"
                  className="bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold h-9 px-3 rounded-xl flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  Auto-fill Days from Date Range
                </Button>
              )}

              <Button
                type="button"
                onClick={addDay}
                size="sm"
                className="bg-[#0077b6] hover:bg-[#005f92] text-white font-bold text-xs h-9 px-3.5 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Day #{days.length + 1}
              </Button>
            </div>
          </div>

          {/* Column Form Table Container (No Date input column, No Hotel input column) */}
          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
            <table className="w-full border-collapse text-left text-xs min-w-[1100px]">
              <thead>
                <tr className="bg-[#0b2940] text-white font-black text-[11px] uppercase tracking-wider divide-x divide-slate-800">
                  <th className="py-2.5 px-2.5 w-[65px] text-center">Day</th>
                  <th className="py-2.5 px-2 w-[70px] text-center">Guide</th>
                  <th className="py-2.5 px-2 w-[95px] text-center">Meals</th>
                  <th className="py-2.5 px-2.5 w-[125px]">City (From)</th>
                  <th className="py-2.5 px-2.5 w-[165px]">En-Route Spot</th>
                  <th className="py-2.5 px-2.5 w-[125px]">City 2 (To/Stay)</th>
                  <th className="py-2.5 px-2.5 w-[150px]">Experience 1</th>
                  <th className="py-2.5 px-2.5 w-[150px]">Experience 2</th>
                  <th className="py-2.5 px-2.5 w-[150px]">Experience 3</th>
                  <th className="py-2.5 px-2.5 w-[180px]">Experience 4</th>
                  <th className="py-2.5 px-2 w-[70px] text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {days.map((day) => {
                  const isExpanded = expandedDayId === day.id;
                  // Auto-computed date tag for display
                  const autoDayDate = startDate ? formatIsoToShort(addDaysToIso(startDate, day.dayNumber - 1)) : '';

                  return (
                    <tr key={day.id} className="hover:bg-sky-50/40 transition-colors divide-x divide-slate-100">
                      {/* Day Number + Auto Date Display */}
                      <td className="py-2.5 px-2 text-center align-middle">
                        <div className="flex flex-col items-center">
                          <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-[#0077b6] text-white font-black text-xs shadow-2xs">
                            D{day.dayNumber}
                          </span>
                          {autoDayDate && (
                            <span className="text-[10px] font-bold text-slate-500 mt-0.5 whitespace-nowrap">
                              {autoDayDate}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Guided Tour Checkbox */}
                      <td className="py-2 px-1 text-center align-middle">
                        <button
                          type="button"
                          onClick={() => updateDay(day.id, 'guidedTour', !day.guidedTour)}
                          className={`w-full py-1 px-1 rounded text-[10px] font-black uppercase transition-all flex items-center justify-center gap-1 cursor-pointer ${
                            day.guidedTour
                              ? 'bg-[#ffde59] text-slate-950 font-black shadow-xs border border-amber-300'
                              : 'bg-slate-100 text-slate-400 hover:bg-slate-200 border border-slate-200'
                          }`}
                          title="Toggle Dedicated Guide for this day"
                        >
                          {day.guidedTour && <Check className="w-2.5 h-2.5 shrink-0" />}
                          <span>{day.guidedTour ? 'Yes' : 'No'}</span>
                        </button>
                      </td>

                      {/* Meals (B / L / D) */}
                      <td className="py-2 px-1 text-center align-middle">
                        <div className="flex items-center gap-1 justify-center">
                          <button
                            type="button"
                            title="Breakfast"
                            onClick={() => updateDay(day.id, 'breakfast', !day.breakfast)}
                            className={`w-5 h-6 rounded text-[10px] font-black transition-colors cursor-pointer ${
                              day.breakfast
                                ? 'bg-emerald-600 text-white shadow-2xs'
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
                                ? 'bg-amber-500 text-white shadow-2xs'
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

                      {/* City (From) */}
                      <td className="py-2 px-2 align-middle">
                        <input
                          type="text"
                          value={day.city}
                          onChange={e => updateDay(day.id, 'city', e.target.value)}
                          placeholder="e.g. Delhi"
                          className="w-full bg-white border border-slate-300 rounded-md px-2 py-1 text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#0077b6]"
                        />
                      </td>

                      {/* En-Route Spot (+ Add Option) */}
                      <td className="py-2.5 px-2 align-top">
                        <div className="space-y-1.5">
                          {(day.enRoutes || ['']).map((spot, sIdx) => (
                            <div key={sIdx} className="flex items-center gap-1">
                              <input
                                type="text"
                                value={spot}
                                onChange={e => updateDayEnRoute(day.id, sIdx, e.target.value)}
                                placeholder={sIdx === 0 ? "e.g. Neemrana Fort" : `En-route stop #${sIdx + 1}`}
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
                            className="text-[10px] font-bold text-[#0077b6] hover:text-[#005f92] flex items-center gap-1 hover:underline cursor-pointer pt-0.5"
                          >
                            <Plus className="w-3 h-3" />
                            <span>Add En-route</span>
                          </button>
                        </div>
                      </td>

                      {/* City 2 (To / Stay) */}
                      <td className="py-2 px-2 align-top">
                        <input
                          type="text"
                          value={day.city2}
                          onChange={e => updateDay(day.id, 'city2', e.target.value)}
                          placeholder="e.g. Jaipur"
                          className="w-full bg-white border border-slate-300 rounded-md px-2 py-1 text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#0077b6]"
                        />
                      </td>

                      {/* Experience 1 */}
                      <td className="py-2 px-2 align-top">
                        <input
                          type="text"
                          value={day.exp1}
                          onChange={e => updateDay(day.id, 'exp1', e.target.value)}
                          placeholder="e.g. City Palace Tour"
                          className="w-full bg-white border border-slate-300 rounded-md px-2 py-1 text-xs text-slate-800 focus:outline-none focus:border-[#0077b6]"
                        />
                      </td>

                      {/* Experience 2 */}
                      <td className="py-2 px-2 align-top">
                        <input
                          type="text"
                          value={day.exp2}
                          onChange={e => updateDay(day.id, 'exp2', e.target.value)}
                          placeholder="e.g. Hawa Mahal Walk"
                          className="w-full bg-white border border-slate-300 rounded-md px-2 py-1 text-xs text-slate-800 focus:outline-none focus:border-[#0077b6]"
                        />
                      </td>

                      {/* Experience 3 */}
                      <td className="py-2 px-2 align-top">
                        <input
                          type="text"
                          value={day.exp3}
                          onChange={e => updateDay(day.id, 'exp3', e.target.value)}
                          placeholder="e.g. Jantar Mantar"
                          className="w-full bg-white border border-slate-300 rounded-md px-2 py-1 text-xs text-slate-800 focus:outline-none focus:border-[#0077b6]"
                        />
                      </td>

                      {/* Experience 4 (+ Add Experience option) */}
                      <td className="py-2.5 px-2 align-top">
                        <div className="space-y-1.5">
                          <input
                            type="text"
                            value={day.exp4}
                            onChange={e => updateDay(day.id, 'exp4', e.target.value)}
                            placeholder="e.g. Chokhi Dhani Show"
                            className="w-full bg-white border border-slate-300 rounded-md px-2 py-1 text-xs text-slate-800 focus:outline-none focus:border-[#0077b6]"
                          />
                          {(day.extraExps || []).map((extra, eIdx) => (
                            <div key={eIdx} className="flex items-center gap-1">
                              <input
                                type="text"
                                value={extra}
                                onChange={e => updateDayExtraExp(day.id, eIdx, e.target.value)}
                                placeholder={`Experience #${eIdx + 5}`}
                                className="w-full bg-white border border-slate-300 rounded-md px-2 py-1 text-xs text-slate-800 focus:outline-none focus:border-[#0077b6]"
                              />
                              <button
                                type="button"
                                onClick={() => removeDayExtraExp(day.id, eIdx)}
                                className="text-slate-400 hover:text-rose-600 p-0.5 shrink-0 cursor-pointer"
                                title="Remove experience"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => addDayExtraExp(day.id)}
                            className="text-[10px] font-bold text-[#0077b6] hover:text-[#005f92] flex items-center gap-1 hover:underline cursor-pointer pt-0.5"
                          >
                            <Plus className="w-3 h-3" />
                            <span>Add Experience</span>
                          </button>
                        </div>
                      </td>

                      {/* Actions: Drawer toggle & Delete */}
                      <td className="py-2 px-1 text-center align-middle">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            type="button"
                            onClick={() => setExpandedDayId(isExpanded ? null : day.id)}
                            className={`p-1 rounded hover:bg-slate-100 transition-colors cursor-pointer ${
                              isExpanded ? 'text-[#0077b6] bg-sky-50' : 'text-slate-400'
                            }`}
                            title="Additional Day Options (Custom Title, Photo, Distance)"
                          >
                            <SlidersHorizontal className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => removeDay(day.id)}
                            className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                            title="Remove Day"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Optional Row Details Drawer for selected day */}
          {expandedDayId && (() => {
            const expDay = days.find(d => d.id === expandedDayId);
            if (!expDay) return null;

            return (
              <div className="mt-3 p-4 rounded-xl border border-sky-200 bg-sky-50/50 space-y-3 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase text-[#0077b6] flex items-center gap-1.5">
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    Extra Options for Day {expDay.dayNumber}
                  </span>
                  <button
                    type="button"
                    onClick={() => setExpandedDayId(null)}
                    className="text-xs font-bold text-slate-500 hover:text-slate-800"
                  >
                    Close Drawer ✕
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Custom Title Override <span className="text-slate-400 font-normal">(Leave empty to auto-build)</span>
                    </label>
                    <Input
                      value={expDay.customTitle || ''}
                      onChange={e => updateDay(expDay.id, 'customTitle', e.target.value)}
                      placeholder="e.g. Royal Arrival in Pink City & Heritage Walk"
                      className="bg-white text-xs h-9"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Approx. Travel Distance</label>
                    <Input
                      value={expDay.travelDistance || ''}
                      onChange={e => updateDay(expDay.id, 'travelDistance', e.target.value)}
                      placeholder="e.g. 150 km / 3.5 hrs"
                      className="bg-white text-xs h-9"
                    />
                  </div>

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
                      placeholder="Image URL"
                      className="bg-white text-xs h-9"
                    />
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Quick Route Preview Strip */}
          {computedRouteCircuit && (
            <div className="mt-3 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-1.5 text-slate-700">
                <Navigation className="w-3.5 h-3.5 text-[#0077b6]" />
                <span className="font-bold">Calculated Route:</span>
                <span className="font-semibold text-slate-900">{computedRouteCircuit}</span>
              </div>
              <button
                type="button"
                onClick={handleApplyAutoRoute}
                className="text-xs font-bold text-[#0077b6] hover:underline cursor-pointer"
              >
                Apply as Route Circuit Text ➔
              </button>
            </div>
          )}
        </section>

        {/* ======================================================== */}
        {/* SECTION 3: ACCOMMODATIONS & HOTELS TABLE (SECTION 4)      */}
        {/* ======================================================== */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-sky-50 text-[#0077b6] flex items-center justify-center font-bold text-sm">
                3
              </div>
              <div>
                <h2 className="text-base font-black text-slate-900 uppercase tracking-wide">
                  Accommodations &amp; Hotels Table
                </h2>
                <p className="text-xs text-slate-500">
                  Enter No. of Nights — dates will auto-fetch in sequence from Start Date ({startDate ? formatIsoToHuman(startDate) : 'Select Start Date above'}).
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {totalHotelNights > 0 && (
                <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-lg">
                  Total Stays: <strong className="text-[#0077b6]">{totalHotelNights} Nights</strong>
                </span>
              )}

              <Button
                type="button"
                onClick={addHotel}
                size="sm"
                className="bg-sky-50 hover:bg-sky-100 text-[#0077b6] border border-sky-200 font-bold text-xs h-9 px-3.5 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Hotel Stay
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            {hotels.map((hotel, idx) => (
              <div
                key={hotel.id}
                className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-sky-300 transition-all flex flex-col gap-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase text-[#0077b6]">
                    Stay #{idx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeHotel(hotel.id)}
                    className="text-slate-400 hover:text-rose-600 p-1 rounded-md transition-colors cursor-pointer"
                    title="Remove stay"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">City / Destination</label>
                    <Input
                      value={hotel.city}
                      onChange={e => updateHotel(hotel.id, 'city', e.target.value)}
                      placeholder="e.g. Jaipur"
                      className="bg-white text-xs h-9 font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Hotel / Stay Name</label>
                    <Input
                      value={hotel.hotelName}
                      onChange={e => updateHotel(hotel.id, 'hotelName', e.target.value)}
                      placeholder="e.g. ITC Rajputana, Luxury Collection"
                      className="bg-white text-xs h-9 font-bold text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Category / Rating</label>
                    <Input
                      value={hotel.starRating}
                      onChange={e => updateHotel(hotel.id, 'starRating', e.target.value)}
                      placeholder="e.g. 5 Star Luxury"
                      className="bg-white text-xs h-9"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      No. of Nights <span className="text-[#0077b6] font-semibold">(0 to 10)</span>
                    </label>
                    <select
                      value={hotel.nights || '0'}
                      onChange={e => updateHotel(hotel.id, 'nights', e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-md px-2.5 py-1 text-xs h-9 font-bold text-[#0077b6] focus:outline-none focus:border-[#0077b6] focus:ring-1 focus:ring-[#0077b6] cursor-pointer"
                    >
                      <option value="0">0 Nights (Default)</option>
                      <option value="1">1 Night</option>
                      <option value="2">2 Nights</option>
                      <option value="3">3 Nights</option>
                      <option value="4">4 Nights</option>
                      <option value="5">5 Nights</option>
                      <option value="6">6 Nights</option>
                      <option value="7">7 Nights</option>
                      <option value="8">8 Nights</option>
                      <option value="9">9 Nights</option>
                      <option value="10">10 Nights</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      Stay Dates <span className="text-emerald-700 font-semibold">(Auto Sequence)</span>
                    </label>
                    <Input
                      value={hotel.stayDates}
                      onChange={e => updateHotel(hotel.id, 'stayDates', e.target.value)}
                      placeholder={hotel.nights === '0' || !hotel.nights ? "Select nights to calculate" : "Auto-calculated from Start Date"}
                      className="bg-white text-xs h-9 font-medium text-slate-800"
                    />
                  </div>

                  <div className="sm:col-span-2 lg:col-span-5">
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Room Type &amp; Inclusions</label>
                    <Input
                      value={hotel.roomType}
                      onChange={e => updateHotel(hotel.id, 'roomType', e.target.value)}
                      placeholder="e.g. Deluxe Room with Breakfast"
                      className="bg-white text-xs h-9"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION 4: INCLUSIONS & EXCLUSIONS (SECTION 5)            */}
        {/* ======================================================== */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Inclusions */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <h3 className="text-sm sm:text-base font-black text-slate-900 uppercase tracking-wide">
                    Inclusions
                  </h3>
                </div>
                <Button
                  type="button"
                  onClick={addInclusion}
                  size="sm"
                  className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 font-bold text-xs h-8 px-2.5 rounded-lg flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3 h-3" /> Add
                </Button>
              </div>

              <div className="space-y-2">
                {inclusions.map((inc, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Input
                      value={inc}
                      onChange={e => updateInclusion(i, e.target.value)}
                      placeholder="e.g. Accommodation for selected nights in handpicked hotels"
                      className="bg-white text-xs h-9 flex-1"
                    />
                    <button
                      type="button"
                      onClick={() => removeInclusion(i)}
                      className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Exclusions */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-rose-500" />
                  <h3 className="text-sm sm:text-base font-black text-slate-900 uppercase tracking-wide">
                    Exclusions
                  </h3>
                </div>
                <Button
                  type="button"
                  onClick={addExclusion}
                  size="sm"
                  className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs h-8 px-2.5 rounded-lg flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3 h-3" /> Add
                </Button>
              </div>

              <div className="space-y-2">
                {exclusions.map((exc, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Input
                      value={exc}
                      onChange={e => updateExclusion(i, e.target.value)}
                      placeholder="e.g. 5% GST & Monument entry fees"
                      className="bg-white text-xs h-9 flex-1"
                    />
                    <button
                      type="button"
                      onClick={() => removeExclusion(i)}
                      className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION 5: QUOTATION & COMMERCIALS (SECTION 6)            */}
        {/* ======================================================== */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 mb-6">
          <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-slate-100">
            <div className="w-8 h-8 rounded-xl bg-sky-50 text-[#0077b6] flex items-center justify-center font-bold text-sm">
              4
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900 uppercase tracking-wide">
                Quotation &amp; Commercials
              </h2>
              <p className="text-xs text-slate-500">Official package commercials and payment terms rendered on the proposal</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 mb-4">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                Total Package Price (₹) <span className="text-[#0077b6]">*</span>
              </label>
              <Input
                value={finalQuotationAmount}
                onChange={e => setFinalQuotationAmount(e.target.value)}
                placeholder="e.g. 14112"
                className="bg-white text-sm h-10 font-black text-slate-900 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">Per Adult Cost (₹)</label>
              <Input
                value={perAdultPrice}
                onChange={e => setPerAdultPrice(e.target.value)}
                placeholder="e.g. 7056"
                className="bg-white text-xs h-10 font-bold text-slate-900 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">Per Child Cost (₹)</label>
              <Input
                value={perKidPrice}
                onChange={e => setPerKidPrice(e.target.value)}
                placeholder="e.g. 3500"
                className="bg-white text-xs h-10 font-bold text-slate-900 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">Token Advance (₹)</label>
              <Input
                value={advanceAmountPaid}
                onChange={e => setAdvanceAmountPaid(e.target.value)}
                placeholder="e.g. 5000"
                className="bg-white text-xs h-10 font-bold text-emerald-700 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">Pending Balance (₹)</label>
              <Input
                value={balancePendingAmount}
                onChange={e => setBalancePendingAmount(e.target.value)}
                placeholder="e.g. 9112"
                className="bg-white text-xs h-10 font-bold text-slate-900 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              Special Notes / Client Requirements <span className="text-slate-400 font-normal">(Rendered in the quote box)</span>
            </label>
            <textarea
              rows={2}
              value={specialRequirements}
              onChange={e => setSpecialRequirements(e.target.value)}
              placeholder="e.g. Interconnected rooms requested at Jaipur. Chauffeur contact will be shared 24 hours prior to travel."
              className="w-full bg-white border border-slate-300 rounded-lg p-2.5 text-xs text-slate-800 leading-relaxed focus:border-[#0077b6] focus:ring-1 focus:ring-[#0077b6]"
            />
          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION 5: VISUAL MEDIA (HERO & 4 SHOWCASE IMAGES)        */}
        {/* ======================================================== */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 mb-8">
          <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-slate-100">
            <div className="w-8 h-8 rounded-xl bg-sky-50 text-[#0077b6] flex items-center justify-center font-bold text-sm">
              5
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900 uppercase tracking-wide">
                Visual Media &amp; Photos
              </h2>
              <p className="text-xs text-slate-500">Cover Banner photo (Page 1) and 4 summary showcase images (Page 2)</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Hero Image */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-slate-800">
                  Cover Hero Banner Image URL <span className="text-[#0077b6] font-semibold">(Page 1 Full Banner)</span>
                </label>
                <label className="text-[11px] font-bold text-[#0077b6] hover:underline cursor-pointer flex items-center gap-1">
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
                placeholder="e.g. https://images.unsplash.com/... or /image/Meghalaya/IMG_0857.JPEG"
                className="bg-white text-xs h-9"
              />
            </div>

            {/* 4 Showcase Gallery Images */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-2">
                4 Summary Showcase Photos <span className="text-slate-400 font-normal">(Displayed below Summary on Page 2)</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {galleryImages.map((imgUrl, i) => (
                  <div key={i} className="p-2.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-600">
                      <span>Photo #{i + 1}</span>
                      <label className="text-[#0077b6] hover:underline cursor-pointer flex items-center gap-1">
                        <UploadCloud className="w-3 h-3" />
                        <span>Upload</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={e => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleUploadFile(file, url => {
                                const next = [...galleryImages];
                                next[i] = url;
                                setGalleryImages(next);
                              });
                            }
                          }}
                        />
                      </label>
                    </div>
                    <Input
                      value={imgUrl}
                      onChange={e => {
                        const next = [...galleryImages];
                        next[i] = e.target.value;
                        setGalleryImages(next);
                      }}
                      placeholder={`Image URL #${i + 1}`}
                      className="bg-white text-xs h-8"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* PUBLISH ACTION BAR (TRAVEL TRIBES THEMED)                 */}
        {/* ======================================================== */}
        <div className="bg-gradient-to-r from-[#0b2940] via-[#0077b6] to-[#0096c7] rounded-2xl p-6 sm:p-8 text-white shadow-xl mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#ffde59]">
                Live Itinerary Publishing
              </span>
              <h2 className="text-2xl sm:text-3xl font-black mt-1">
                Generate &amp; Publish Proposal
              </h2>
              <p className="text-sky-100 text-xs sm:text-sm mt-1 max-w-xl">
                Compiles all typed accommodations, spreadsheet day schedule, inclusions, and commercials directly into the live client proposal URL.
              </p>
            </div>

            <div className="shrink-0">
              <Button
                onClick={handlePublish}
                disabled={generating}
                size="lg"
                className="h-13 sm:h-14 px-8 text-sm sm:text-base bg-[#ffde59] hover:bg-amber-300 text-slate-950 font-black rounded-xl shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-95"
              >
                {generating ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Publishing Itinerary...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-slate-950" />
                    <span>Generate Proposal URL</span>
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Error Banner */}
          {genError && (
            <div className="mt-4 p-3.5 rounded-xl bg-rose-500/20 border border-rose-300/40 text-rose-100 text-xs font-semibold flex items-center gap-2">
              <XCircle className="w-4 h-4 text-rose-300 shrink-0" />
              <span>{genError}</span>
            </div>
          )}

          {/* Success Banner */}
          {genSuccess && (
            <div className="mt-5 p-4 rounded-xl bg-emerald-950/80 border border-emerald-400/50 text-white space-y-2">
              <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>Proposal Published Successfully!</span>
              </div>
              <p className="text-xs text-slate-200">
                Live URL: <span className="font-mono text-[#ffde59]">{genSuccess.url}</span>
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href={genSuccess.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#ffde59] hover:bg-amber-300 text-slate-950 text-xs font-black shadow transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Proposal Page</span>
                </a>

                <button
                  type="button"
                  onClick={() => copyToClipboard(typeof window !== 'undefined' ? `${window.location.origin}${genSuccess.url}` : genSuccess.url)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied to Clipboard!' : 'Copy Shareable Link'}</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* History of Previously Generated Itineraries */}
        <section className="mb-12">
          <ItineraryHistorySection />
        </section>
      </main>

      <Footer />
    </div>
  );
}
