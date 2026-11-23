import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticatedAdmin } from '@/lib/admin-auth'
import { checkMongoStatus } from '@/lib/db'
import { getAllAdminTrips, syncAllTripsToDatabase } from '@/lib/trips-store'

export async function GET(req: NextRequest) {
  try {
    const isAuth = await isAuthenticatedAdmin()
    if (!isAuth) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const mongoStatus = await checkMongoStatus()
    const allTrips = getAllAdminTrips()

    return NextResponse.json({
      success: true,
      database: {
        mongo: mongoStatus,
        localStore: {
          available: true,
          totalItineraries: allTrips.length,
          published: allTrips.filter((t) => t.status === 'published').length,
          draft: allTrips.filter((t) => t.status === 'draft').length
        }
      }
    })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const isAuth = await isAuthenticatedAdmin()
    if (!isAuth) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const result = await syncAllTripsToDatabase()
    return NextResponse.json(result)
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
