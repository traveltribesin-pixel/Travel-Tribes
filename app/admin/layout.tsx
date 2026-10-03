'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Building2,
  TrendingUp,
  Settings,
  LogOut,
  ExternalLink,
  MessageSquare,
  FileSpreadsheet,
  Menu,
  X,
  Compass,
  Bell
} from 'lucide-react'

const NAV_ITEMS = [
  { href: '/admin', label: 'Overview', icon: LayoutDashboard, exact: true },
  { href: '/admin/leads', label: 'Leads Pipeline', icon: Users },
  { href: '/admin/bookings', label: 'Bookings & Payments', icon: CreditCard },
  { href: '/admin/custom-trips', label: 'Corporate & Custom', icon: Building2 },
  { href: '/admin/analytics', label: 'Analytics', icon: TrendingUp },
  { href: '/admin/settings', label: 'WhatsApp & Settings', icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isLoginPage = pathname === '/admin/login'

  useEffect(() => {
    if (isLoginPage) {
      setCheckingAuth(false)
      return
    }

    async function checkAuth() {
      try {
        const res = await fetch('/api/admin/auth/check')
        const data = await res.json()
        if (!data.authenticated) {
          router.replace('/admin/login')
        } else {
          setCheckingAuth(false)
        }
      } catch {
        router.replace('/admin/login')
      }
    }

    checkAuth()
  }, [pathname, isLoginPage, router])

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' })
      router.replace('/admin/login')
    } catch {
      router.replace('/admin/login')
    }
  }

  if (isLoginPage) {
    return <>{children}</>
  }

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#071c2c] flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-[#00b4d8] border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-slate-400 font-medium">Verifying Admin Session...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col lg:flex-row antialiased">
      {/* Mobile Top Bar */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-[#0b2940] border-b border-slate-800 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#00b4d8] flex items-center justify-center font-black text-slate-950 text-xs">
            TT
          </div>
          <span className="font-bold text-sm tracking-tight text-white">Travel Tribes CRM</span>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#0b2940] border-r border-slate-800 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:static'
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#00b4d8] to-[#0b2940] p-0.5 shadow-md shadow-[#00b4d8]/20">
                <div className="w-full h-full bg-[#0b2940] rounded-xl flex items-center justify-center">
                  <Compass className="w-5 h-5 text-[#00b4d8]" />
                </div>
              </div>
              <div>
                <h2 className="font-black text-sm tracking-tight text-white">TRAVEL TRIBES</h2>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#00b4d8]">CRM Live Portal</span>
                </div>
              </div>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="p-3 space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href)
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-[#00b4d8] to-[#0096c7] text-white shadow-md shadow-[#00b4d8]/20 font-bold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon size={17} className={isActive ? 'text-white' : 'text-slate-400'} />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* Quick Actions in Sidebar */}
          <div className="px-3 pt-3">
            <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80 text-xs">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Quick Exports</span>
              <div className="mt-2 space-y-1.5">
                <a
                  href="/api/admin/export?type=leads"
                  download
                  className="flex items-center justify-between p-2 rounded-lg bg-slate-800 hover:bg-slate-700/80 text-slate-300 hover:text-white transition-all text-[11px]"
                >
                  <span className="flex items-center gap-1.5">
                    <FileSpreadsheet size={13} className="text-emerald-400" />
                    <span>Download Leads CSV</span>
                  </span>
                </a>
                <a
                  href="/api/admin/export?type=bookings"
                  download
                  className="flex items-center justify-between p-2 rounded-lg bg-slate-800 hover:bg-slate-700/80 text-slate-300 hover:text-white transition-all text-[11px]"
                >
                  <span className="flex items-center gap-1.5">
                    <FileSpreadsheet size={13} className="text-[#00b4d8]" />
                    <span>Download Bookings CSV</span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-slate-800/80">
          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900/50">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white text-[11px] font-bold">
                TT
              </div>
              <div className="overflow-hidden">
                <p className="text-[11px] font-bold text-white truncate">Admin Team</p>
                <p className="text-[9px] text-slate-400 truncate">admin@traveltribes.in</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              title="Sign Out"
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all cursor-pointer"
            >
              <LogOut size={15} />
            </button>
          </div>

          <div className="mt-2 flex items-center justify-between px-2 text-[10px] text-slate-400">
            <Link href="/" target="_blank" className="hover:text-cyan-400 inline-flex items-center gap-1">
              <span>Visit Website</span>
              <ExternalLink size={10} />
            </Link>
            <span>v2.4 CRM</span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-950 overflow-y-auto">
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1600px] w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
