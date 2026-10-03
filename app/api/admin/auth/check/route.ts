import { NextResponse } from 'next/server'
import { isAuthenticatedAdmin, ADMIN_CREDENTIALS } from '@/lib/admin-auth'

export async function GET() {
  const isAuth = await isAuthenticatedAdmin()
  if (!isAuth) {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }
  return NextResponse.json({
    authenticated: true,
    user: {
      username: ADMIN_CREDENTIALS.username,
      role: 'SUPER_ADMIN'
    }
  })
}
