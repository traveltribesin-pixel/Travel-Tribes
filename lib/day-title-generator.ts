/**
 * Intelligent Professional Day Title & Heading Generator for Travel Tribes Itineraries
 * Transforms basic city-to-city notes into evocative, luxury-tier narrative sentences.
 */

export interface DayTitleContext {
  dayNumber: number;
  totalDays: number;
  city1?: string;
  city2?: string;
  destination?: string;
  enRoutes?: string[];
  experiences?: string[];
  guidedTour?: boolean;
  customTitle?: string;
}

// Capitalize words nicely
function toTitleCase(str: string): string {
  if (!str) return '';
  return str
    .trim()
    .split(/\s+/)
    .map(word => {
      const lower = word.toLowerCase();
      // keep small connector words lowercase unless at start
      if (['to', 'via', 'and', 'the', 'of', 'in', 'at', 'with', 'on', 'for', 'from'].includes(lower)) {
        return lower;
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ')
    .replace(/^./, c => c.toUpperCase());
}

// Detect if a string is a meaningful travel spot or just random keyboard mash/test input
function isMeaningfulName(str?: string): boolean {
  if (!str) return false;
  const s = str.trim();
  if (s.length < 3 || s.length > 55) return false;
  
  // Test if it has at least one vowel (a, e, i, o, u, y)
  if (!/[aeiouy]/i.test(s)) return false;

  // Test if it has 5 or more consecutive consonants (typical keyboard mash like "chbshmdjhcxjs")
  if (/[bcdfghjklmnpqrstvwxz]{5,}/i.test(s)) return false;

  // Ignore default placeholders
  if (/^day\s*\d+$/i.test(s) || /^spot\s*#?\d*$/i.test(s) || /^experience\s*#?\d*$/i.test(s)) return false;

  return true;
}

export function generateProfessionalDayTitle(ctx: DayTitleContext): string {
  // If user explicitly gave a custom title override (and it's not a generic default), respect it
  if (ctx.customTitle && ctx.customTitle.trim().length > 3 && !/^day\s*\d+$/i.test(ctx.customTitle.trim())) {
    return ctx.customTitle.trim();
  }

  const dayNum = ctx.dayNumber || 1;
  const totalDays = Math.max(1, ctx.totalDays || 1);
  const isFirstDay = dayNum === 1;
  const isLastDay = dayNum === totalDays && totalDays > 1;

  const rawCity1 = (ctx.city1 || ctx.destination || '').trim();
  const rawCity2 = (ctx.city2 || rawCity1 || ctx.destination || '').trim();
  const fromCity = toTitleCase(rawCity1);
  const toCity = toTitleCase(rawCity2);
  const isTransit = fromCity && toCity && fromCity.toLowerCase() !== toCity.toLowerCase();

  // Filter out any keyboard mash or invalid text from experiences
  const validExps = (ctx.experiences || [])
    .map(e => (typeof e === 'string' ? e.trim() : ''))
    .filter(isMeaningfulName)
    .map(toTitleCase);

  // Filter valid en-route spots
  const validEnRoutes = (ctx.enRoutes || [])
    .map(r => (typeof r === 'string' ? r.trim() : ''))
    .filter(isMeaningfulName)
    .map(toTitleCase);
  const enRouteText = validEnRoutes.length > 0 ? validEnRoutes.join(' & ') : '';

  // Classify destination archetype
  const contextCorpus = `${ctx.destination || ''} ${fromCity} ${toCity} ${enRouteText}`.toLowerCase();

  const isMountain = /himachal|manali|shimla|kashmir|srinagar|gulmarg|pahalgam|ladakh|leh|spiti|kaza|uttarakhand|rishikesh|mussoorie|nainital|dharamshala|kasol|jibhi|rohtang|solang|tirthan|parvati|sikkim|gangtok|munnar|ooty|coorg/i.test(contextCorpus);
  const isHeritage = /rajasthan|jaipur|udaipur|jodhpur|jaisalmer|pushkar|bikaner|agra|delhi|varanasi|hampi|mysore|khajuraho|amritsar|madurai|aurangabad/i.test(contextCorpus);
  const isTropical = /bali|goa|gokarna|kerala|alleppey|sri lanka|andaman|phuket|krabi|vietnam|dubai|beach|island|penida/i.test(contextCorpus);
  const isNortheast = /meghalaya|shillong|cherrapunji|dawki|guwahati|kaziranga|assam|arunachal/i.test(contextCorpus);

  // =========================================================================
  // CASE A: INTERCITY TRANSIT DAYS (fromCity !== toCity)
  // =========================================================================
  if (isTransit) {
    // 1. First Day Arrival Transit (e.g. Delhi to Manali / Delhi to Jaipur)
    if (isFirstDay) {
      if (isMountain) {
        return enRouteText
          ? `Scenic Himalayan Journey from ${fromCity} to ${toCity} via ${enRouteText}`
          : `Scenic Mountain Drive from ${fromCity} to ${toCity} • Welcome to the Valley`;
      }
      if (isHeritage) {
        return enRouteText
          ? `Royal Overland Journey from ${fromCity} to ${toCity} via ${enRouteText}`
          : `Scenic Highway Journey from ${fromCity} to ${toCity} • Welcome to ${toCity}`;
      }
      if (isNortheast) {
        return enRouteText
          ? `Picturesque Uphill Drive from ${fromCity} to ${toCity} via ${enRouteText}`
          : `Scenic Highland Drive from ${fromCity} to ${toCity} • Welcome to the Hills`;
      }
      if (isTropical) {
        return enRouteText
          ? `Coastal Overland Transfer from ${fromCity} to ${toCity} via ${enRouteText}`
          : `Picturesque Highway Transfer from ${fromCity} to ${toCity} • Welcome to ${toCity}`;
      }
      return enRouteText
        ? `Scenic Journey from ${fromCity} to ${toCity} via ${enRouteText}`
        : `Arrival & Scenic Transfer from ${fromCity} to ${toCity} • Journey Commencement`;
    }

    // 2. Last Day Departure Transit (e.g. Amritsar to Delhi / Manali to Delhi)
    if (isLastDay) {
      if (isMountain) {
        return `Farewell to ${fromCity} & Scenic Return Drive to ${toCity} with Mountain Memories`;
      }
      if (isHeritage) {
        return `Farewell to ${fromCity} & Return Highway Journey to ${toCity} with Royal Memories`;
      }
      if (isTropical) {
        return `Farewell to ${fromCity} & Transfer to ${toCity} with Cherished Island Moments`;
      }
      return `Farewell to ${fromCity} & Scenic Return Transfer to ${toCity} • Journey Culmination`;
    }

    // 3. Middle Days Transit (e.g. Jaipur to Jodhpur / Manali to Kasol)
    if (enRouteText) {
      return `Picturesque Transfer from ${fromCity} to ${toCity} with En-Route Exploration of ${enRouteText}`;
    }
    if (validExps.length > 0) {
      return `Scenic Drive from ${fromCity} to ${toCity} followed by Exploration of ${validExps[0]}`;
    }
    if (isMountain) {
      return `Picturesque Valley Drive from ${fromCity} to ${toCity} along Mountain Landscapes`;
    }
    if (isHeritage) {
      return `Heritage Highway Journey from ${fromCity} to the Timeless City of ${toCity}`;
    }
    if (isTropical) {
      return `Scenic Coastal Transfer from ${fromCity} to ${toCity} with Ocean Vistas`;
    }
    return `Scenic Intercity Drive from ${fromCity} to ${toCity} amidst Picturesque Landscapes`;
  }

  // =========================================================================
  // CASE B: LOCAL STAY & SIGHTSEEING DAYS (Same city or exploration in toCity)
  // =========================================================================

  // If user provided concrete, valid landmark experiences (e.g. Solang Valley, Hadimba, etc.)
  if (validExps.length >= 2) {
    if (isMountain) {
      return `Excursion to ${validExps[0]} & Scenic Adventure to ${validExps[1]}`;
    }
    if (isHeritage) {
      return `Grand Heritage Tour: Exploring ${validExps[0]} & Splendor of ${validExps[1]}`;
    }
    if (isTropical) {
      return `Tropical Island Highlights: Exploring ${validExps[0]} & Charms of ${validExps[1]}`;
    }
    if (isNortheast) {
      return `Natural Wonders of ${toCity}: Visiting ${validExps[0]} & ${validExps[1]}`;
    }
    return `Discovering ${toCity}: Immersive Exploration of ${validExps[0]} & ${validExps[1]}`;
  }

  if (validExps.length === 1) {
    if (isMountain) {
      return `Mountain Excursion to ${validExps[0]} with Panoramic Alpine Vistas`;
    }
    if (isHeritage) {
      return `Royal Heritage Discovery & Architectural Tour of ${validExps[0]}`;
    }
    if (isTropical) {
      return `Scenic Coastal Excursion & Leisure Discovery of ${validExps[0]}`;
    }
    return `Signature Highlights & Guided Visit to ${validExps[0]} in ${toCity}`;
  }

  // If user entered an en-route spot on a same-city day
  if (enRouteText) {
    return `Full Day Exploration in ${toCity} with Scenic Visit to ${enRouteText}`;
  }

  // Last Day Departure (if same city)
  if (isLastDay) {
    return `Morning Leisure in ${toCity} & Chauffeur Transfer for Onward Departure with Sweet Memories`;
  }

  // Day 1 Arrival in Same City
  if (isFirstDay) {
    if (isMountain) {
      return `Arrival in ${toCity} • Alpine Welcome, Hotel Check-in & Evening Leisure by the River`;
    }
    if (isHeritage) {
      return `Royal Welcome to ${toCity} • Check-in & Evening Leisure Stroll through Historic Quarters`;
    }
    if (isTropical) {
      return `Tropical Welcome to ${toCity} • Beachside Check-in & Relaxing Sunset Moments`;
    }
    return `Arrival & Welcome to ${toCity} • Check-in, Orientation & Evening at Leisure`;
  }

  // Distinct day-by-day themes for multi-day local stays so no two days ever share the same title
  if (isMountain) {
    const mountainThemes = [
      `Alpine Landscapes, Pine Forest Trails & Iconic Valley Highlights of ${toCity}`,
      `High-Altitude Excursion, Snow Points & Panoramic Himalayan Passes`,
      `Hidden Mountain Waterfalls, Riverside Cafes & Vibrant Local Culture in ${toCity}`,
      `Offbeat Valley Trails, Serene Monasteries & Scenic Mountain Serenade`,
      `Pristine Himalayan Exploration, Panoramic Viewpoints & Leisure Discovery`,
      `Scenic River Confluences, Nature Walks & Mountain Heritage in ${toCity}`
    ];
    return mountainThemes[(dayNum - 2) % mountainThemes.length] || `Alpine Landscapes & Sightseeing Highlights of ${toCity}`;
  }

  if (isHeritage) {
    const heritageThemes = [
      `Architectural Splendor of ${toCity}: Grand Forts, Royal Palaces & Timeless Heritage`,
      `Cultural Immersion, Traditional Bazaars & Mesmerizing Sunset Viewpoints in ${toCity}`,
      `Historic Courtyards, Ancient Stepwells & Iconic Monuments across ${toCity}`,
      `Lakeside Serenade, Historic Royal Gardens & Local Artisan Highlights in ${toCity}`,
      `Royal Heritage Trail, Museum Discoveries & Cultural Treasures of ${toCity}`,
      `Spiritual Ghats, Sacred Temples & Architectural Gems of ${toCity}`
    ];
    return heritageThemes[(dayNum - 2) % heritageThemes.length] || `Architectural Splendor & Heritage Exploration in ${toCity}`;
  }

  if (isTropical) {
    const tropicalThemes = [
      `Coastal Highlights: Golden Sandy Shores, Ocean Vistas & Cliffside Temples`,
      `Island Speedboat Adventures, Turquoise Lagoons & Scenic Coral Exploration`,
      `Lush Palm Terraces, Hidden Cascades & Bohemian Cafe Exploration in ${toCity}`,
      `Serene Ocean Breezes, Coastal Viewpoints & Leisure Beachside Moments`,
      `Tropical Island Escapades, Hidden Coves & Sunset Cocktails in ${toCity}`,
      `Marine Exploration, Pristine Bays & Coastal Heritage in ${toCity}`
    ];
    return tropicalThemes[(dayNum - 2) % tropicalThemes.length] || `Coastal Highlights & Tropical Discoveries in ${toCity}`;
  }

  if (isNortheast) {
    const northeastThemes = [
      `Cascading Waterfalls, Dramatic Canyons & Pristine Nature in ${toCity}`,
      `Living Root Bridges, Sacred Groves & Crystal River Expeditions`,
      `Misty Caves, High Viewpoints & Indigenous Khasi Cultural Walks`,
      `Offbeat Village Exploration, Riverfront Relaxation & Scenic Trails`,
      `Scenic Lakeside Vistas, Tea Gardens & Cultural Highlights of ${toCity}`
    ];
    return northeastThemes[(dayNum - 2) % northeastThemes.length] || `Cascading Waterfalls & Natural Wonders of ${toCity}`;
  }

  // Universal fallback themes
  const universalThemes = [
    `Comprehensive City Sightseeing & Iconic Cultural Landmarks of ${toCity}`,
    `Scenic Wonders, Panoramic Viewpoints & Local Life Exploration in ${toCity}`,
    `Hidden Gems, Traditional Artisan Markets & Leisure Discovery in ${toCity}`,
    `Architectural Heritage, Scenic Parks & Memorable Moments in ${toCity}`,
    `Offbeat Local Experiences, Cultural Immersion & Leisure Time in ${toCity}`
  ];
  return universalThemes[(dayNum - 2) % universalThemes.length] || `Iconic Highlights & Cultural Discoveries in ${toCity}`;
}

