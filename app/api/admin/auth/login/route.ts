import { NextRequest, NextResponse } from 'next/server'
import { ADMIN_CREDENTIALS, generateSessionToken, setAdminSessionCookie } from '@/lib/admin-auth'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null)
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 })
    }

    const { username, password } = body

    const validUsername = Boolean(ADMIN_CREDENTIALS.username) && (
      String(username || '').trim().toLowerCase() === ADMIN_CREDENTIALS.username.toLowerCase() ||
      String(username || '').trim().toLowerCase() === 'admin'
    )
    const validPassword = Boolean(ADMIN_CREDENTIALS.password) && String(password || '') === ADMIN_CREDENTIALS.password

    if (!validUsername || !validPassword) {
      return NextResponse.json(
        { success: false, error: 'Invalid admin username or password.' },
        { status: 401 }
      )
    }

    const token = generateSessionToken()
    await setAdminSessionCookie(token)

    return NextResponse.json({
      success: true,
      message: 'Logged in successfully',
      user: {
        username: ADMIN_CREDENTIALS.username,
        role: 'SUPER_ADMIN'
      }
    })
  } catch (error) {
    console.error('Admin Login Error:', error)
    return NextResponse.json({ success: false, error: 'Server error during login' }, { status: 500 })
  }
}
