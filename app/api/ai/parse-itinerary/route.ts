import { NextRequest, NextResponse } from 'next/server';
import { parseItineraryWithGroq } from '@/lib/groq-itinerary-parser';
import { getLuxuryImagesForDestination } from '@/lib/itinerary-images';

const MIN_TEXT_LENGTH = 20;
const MAX_TEXT_LENGTH = 40000;

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GROQ_API_KEY?.trim();
    if (!apiKey) {
      return NextResponse.json(
        {
          success: false,
          error:
            'GROQ_API_KEY is not configured on the server. Please add GROQ_API_KEY to your .env file (and Vercel Environment Variables).'
        },
        { status: 503 }
      );
    }

    const body = await req.json().catch(() => null);
    const rawText = typeof body?.rawText === 'string' ? body.rawText.trim() : '';

    if (rawText.length < MIN_TEXT_LENGTH) {
      return NextResponse.json(
        {
          success: false,
          error: 'Please paste a longer itinerary description (at least a few lines or day schedule).'
        },
        { status: 400 }
      );
    }

    if (rawText.length > MAX_TEXT_LENGTH) {
      return NextResponse.json(
        {
          success: false,
          error: `Itinerary text is too long (${rawText.length.toLocaleString()} chars). Maximum allowed is ${MAX_TEXT_LENGTH.toLocaleString()} characters.`
        },
        { status: 400 }
      );
    }

    const { parsed, model, durationMs } = await parseItineraryWithGroq(rawText, apiKey);
    const destMedia = getLuxuryImagesForDestination(`${parsed.destination} ${parsed.tripTitle}`);

    const totalSightseeings = parsed.days.reduce(
      (sum, d) => sum + (d.sightseeings?.length || 0),
      0
    );

    return NextResponse.json({
      success: true,
      data: parsed,
      suggestedMedia: {
        heroImage: destMedia.hero,
        galleryImages: destMedia.gallery.slice(0, 4)
      },
      meta: {
        model,
        durationMs,
        daysCount: parsed.days.length,
        hotelsCount: parsed.hotels.length,
        sightseeingsCount: totalSightseeings
      }
    });
  } catch (error: any) {
    console.error('[Groq Itinerary Parser] Error:', error);

    const status = typeof error?.status === 'number' ? error.status : 500;
    let message = error?.message || 'Failed to parse itinerary with Groq AI.';
    if (status === 401) {
      message = 'Invalid GROQ_API_KEY. Please check your Groq API key in .env / Vercel settings.';
    } else if (status === 429) {
      message = 'Groq API rate limit reached. Please wait a few seconds and try again.';
    }

    return NextResponse.json({ success: false, error: message }, { status: status >= 400 && status < 600 ? status : 500 });
  }
}

