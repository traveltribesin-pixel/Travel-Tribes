import { MongoClient, Db, Collection } from 'mongodb'
import type { AdminTrip } from './trips-store'

let cachedClient: MongoClient | null = null
let cachedDb: Db | null = null

const MONGODB_URI = process.env.MONGODB_URI || ''

export async function getMongoDb(): Promise<Db | null> {
  if (!MONGODB_URI) {
    return null
  }

  if (cachedDb) {
    return cachedDb
  }

  try {
    if (!cachedClient) {
      cachedClient = new MongoClient(MONGODB_URI, {
        serverSelectionTimeoutMS: 4000,
        connectTimeoutMS: 4000,
        maxPoolSize: 10
      })
      await cachedClient.connect()
    }

    cachedDb = cachedClient.db()
    return cachedDb
  } catch (error: any) {
    console.warn('[Database] MongoDB connection not available, operating in resilient local mode:', error?.message || error)
    cachedClient = null
    cachedDb = null
    return null
  }
}

export async function getItinerariesCollection(): Promise<Collection<AdminTrip> | null> {
  const db = await getMongoDb()
  if (!db) return null
  return db.collection<AdminTrip>('itineraries')
}

/**
 * Checks connection health to MongoDB
 */
export async function checkMongoStatus(): Promise<{
  connected: boolean
  uriConfigured: boolean
  databaseName?: string
  error?: string
}> {
  if (!MONGODB_URI) {
    return { connected: false, uriConfigured: false, error: 'MONGODB_URI not configured in .env' }
  }

  try {
    const db = await getMongoDb()
    if (!db) {
      return { connected: false, uriConfigured: true, error: 'Failed to establish connection' }
    }
    await db.command({ ping: 1 })
    return {
      connected: true,
      uriConfigured: true,
      databaseName: db.databaseName
    }
  } catch (err: any) {
    return {
      connected: false,
      uriConfigured: true,
      error: err.message || 'Connection ping failed'
    }
  }
}

/**
 * Syncs a single trip to MongoDB (upsert by id)
 */
export async function syncTripToMongo(trip: AdminTrip): Promise<boolean> {
  try {
    const col = await getItinerariesCollection()
    if (!col) return false

    await col.updateOne(
      { id: trip.id },
      { $set: trip },
      { upsert: true }
    )
    return true
  } catch (err: any) {
    console.warn(`[Database] Could not sync trip ${trip.slug} to MongoDB:`, err.message)
    return false
  }
}

/**
 * Deletes a trip from MongoDB
 */
export async function deleteTripFromMongo(idOrSlug: string): Promise<boolean> {
  try {
    const col = await getItinerariesCollection()
    if (!col) return false

    await col.deleteOne({
      $or: [{ id: idOrSlug }, { slug: idOrSlug }]
    })
    return true
  } catch (err: any) {
    console.warn(`[Database] Could not delete trip ${idOrSlug} from MongoDB:`, err.message)
    return false
  }
}

/**
 * Batch seeds / syncs all itineraries into MongoDB
 */
export async function syncAllItinerariesToMongo(trips: AdminTrip[]): Promise<{
  success: boolean
  syncedCount: number
  total: number
  error?: string
}> {
  try {
    const col = await getItinerariesCollection()
    if (!col) {
      return {
        success: false,
        syncedCount: 0,
        total: trips.length,
        error: 'MongoDB connection is currently unreachable'
      }
    }

    let synced = 0
    for (const trip of trips) {
      await col.updateOne(
        { id: trip.id },
        { $set: trip },
        { upsert: true }
      )
      synced++
    }

    return {
      success: true,
      syncedCount: synced,
      total: trips.length
    }
  } catch (err: any) {
    return {
      success: false,
      syncedCount: 0,
      total: trips.length,
      error: err.message || 'Batch sync failed'
    }
  }
}
