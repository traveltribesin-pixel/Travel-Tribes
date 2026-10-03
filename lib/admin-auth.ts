import { cookies } from 'next/headers'
import crypto from 'crypto'

const ADMIN_COOKIE_NAME = 'tt_admin_session'
const SECRET_SALT = process.env.ADMIN_SECRET || 'traveltribes-super-secure-admin-key-2027'

// Configurable admin credentials from environment or robust defaults
export const ADMIN_CREDENTIALS = {
  username: process.env.ADMIN_USERNAME || 'admin@traveltribes.in',
  password: process.env.ADMIN_PASSWORD || 'tribe@admin2027'
}

export function generateSessionToken(): string {
  const payload = `tt_admin_${Date.now()}_${Math.random()}`
  const signature = crypto.createHmac('sha256', SECRET_SALT).update(payload).digest('hex')
  return `${Buffer.from(payload).toString('base64')}.${signature}`
}

export function verifySessionToken(token?: string): boolean {
  if (!token || !token.includes('.')) return false
  try {
    const [payloadB64, signature] = token.split('.')
    const payload = Buffer.from(payloadB64, 'base64').toString('utf-8')
    const expectedSignature = crypto.createHmac('sha256', SECRET_SALT).update(payload).digest('hex')
    
    if (signature !== expectedSignature) return false

    // Check token age (7 days expiry)
    const match = payload.match(/tt_admin_(\d+)_/)
    if (!match) return false
    const tokenTime = parseInt(match[1], 10)
    const maxAge = 7 * 24 * 60 * 60 * 1000
    if (Date.now() - tokenTime > maxAge) return false

    return true
  } catch {
    return false
  }
}

export async function isAuthenticatedAdmin(): Promise<boolean> {
  const cookieStore = await cookies()
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value
  return verifySessionToken(token)
}

export async function setAdminSessionCookie(token: string) {
  const cookieStore = await cookies()
  cookieStore.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: '/'
  })
}

export async function clearAdminSessionCookie() {
  const cookieStore = await cookies()
  cookieStore.delete(ADMIN_COOKIE_NAME)
}
