'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Lock, Mail, ArrowRight, ShieldCheck, Sparkles, KeyRound } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('admin@traveltribes.in')
  const [password, setPassword] = useState('tribe@admin2027')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })

      const data = await res.json()
      if (data.success) {
        router.push('/admin')
        router.refresh()
      } else {
        setError(data.error || 'Invalid credentials. Please try again.')
      }
    } catch {
      setError('Unable to connect to server. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#071c2c] via-[#0b2940] to-[#04121d] flex items-center justify-center p-4 sm:p-6 text-white relative overflow-hidden">
      {/* Decorative Glow Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00b4d8]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#10b981]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#00b4d8] to-[#0b2940] p-0.5 shadow-[0_0_30px_rgba(0,180,216,0.3)] mb-4">
            <div className="w-full h-full bg-[#0b2940] rounded-2xl flex items-center justify-center">
              <ShieldCheck className="w-8 h-8 text-[#00b4d8]" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Travel Tribes <span className="text-[#00b4d8]">CRM</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Admin Lead Pipeline & Booking Control Center
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/60 rounded-3xl p-6 sm:p-8 shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-medium flex items-center gap-2">
                <span>⚠️</span>
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Admin Username / Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin@traveltribes.in"
                  className="w-full pl-10 pr-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:border-[#00b4d8] focus:ring-1 focus:ring-[#00b4d8] transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Admin Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:border-[#00b4d8] focus:ring-1 focus:ring-[#00b4d8] transition-all"
                />
              </div>
            </div>

            {/* Quick Demo Credentials Info */}
            <div className="p-3 bg-[#00b4d8]/10 border border-[#00b4d8]/20 rounded-xl text-xs text-slate-300 flex items-start gap-2.5">
              <KeyRound className="w-4 h-4 text-[#00b4d8] shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">Default Admin Credentials:</p>
                <p className="text-slate-300 mt-0.5">User: <code className="text-[#00b4d8]">admin@traveltribes.in</code></p>
                <p className="text-slate-300">Pass: <code className="text-[#00b4d8]">tribe@admin2027</code></p>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-[#00b4d8] to-[#0096c7] hover:from-[#0096c7] hover:to-[#0077b6] text-white font-bold text-sm rounded-xl shadow-lg shadow-[#00b4d8]/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <span>Signing in...</span>
              ) : (
                <>
                  <span>Access CRM Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        <div className="text-center mt-6 text-xs text-slate-400">
          Travel Tribes © {new Date().getFullYear()} · Internal Management System
        </div>
      </div>
    </div>
  )
}
