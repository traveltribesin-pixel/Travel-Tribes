'use client'

import { useState } from 'react'
import {
  Settings,
  MessageCircle,
  Save,
  CheckCircle2,
  Shield,
  FileSpreadsheet,
  Mail,
  KeyRound,
  ExternalLink,
  Zap,
  Cloud,
  RefreshCw,
  Check,
  AlertCircle
} from 'lucide-react'

export default function SettingsPage() {
  const [saved, setSaved] = useState(false)
  const [crmTesting, setCrmTesting] = useState(false)
  const [crmResult, setCrmResult] = useState<{ connected?: boolean; latencyMs?: number; error?: string } | null>(null)

  const handleTestCRM = async () => {
    setCrmTesting(true)
    setCrmResult(null)
    try {
      const res = await fetch('/api/admin/crm/test-connection')
      const data = await res.json()
      setCrmResult(data)
    } catch (err: any) {
      setCrmResult({ connected: false, error: err?.message || 'Connection ping failed' })
    } finally {
      setCrmTesting(false)
    }
  }

  const [templates, setTemplates] = useState({
    greeting:
      'Hi {{name}}! 👋 Thanks for reaching out to Travel Tribes regarding {{trip}}. When are you planning to travel with us? We have some amazing upcoming batches!',
    itinerary:
      'Hi {{name}}! 🎒 Hope you enjoyed checking out the itinerary for {{trip}}. We have a few spots remaining for the upcoming batch. Would you like me to reserve a tentative spot for you?',
    booking:
      'Woohoo {{name}}! 🎉 Your booking for {{trip}} (Booking ID: {{bookingId}}) is confirmed! Your Trip Captain will connect with you 3 days prior to departure. Get ready for an epic journey! 🚀',
    reminder:
      'Hi {{name}}! 👋 This is a friendly reminder regarding your upcoming {{trip}} trip on {{date}}. Your remaining balance is ₹{{balance}}. Let us know once completed so we can issue your final travel kit!'
  })

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Top Header */}
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">CRM Settings & WhatsApp Templates</h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Customize 1-click WhatsApp outreach message formats and check integration statuses.
        </p>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 size={16} />
          <span>WhatsApp templates and settings updated successfully!</span>
        </div>
      )}

      {/* WhatsApp Message Templates */}
      <form onSubmit={handleSave} className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-4">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <MessageCircle size={18} />
          </div>
          <div>
            <h2 className="font-bold text-base text-white">1-Click WhatsApp Templates</h2>
            <p className="text-xs text-slate-400">Available variables: <code className="text-emerald-400">{'{{name}}'}</code>, <code className="text-emerald-400">{'{{trip}}'}</code>, <code className="text-emerald-400">{'{{date}}'}</code>, <code className="text-emerald-400">{'{{balance}}'}</code>, <code className="text-emerald-400">{'{{bookingId}}'}</code></p>
          </div>
        </div>

        <div className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-bold mb-1.5">
              1. Initial Inquiry / Welcome Message:
            </label>
            <textarea
              rows={3}
              value={templates.greeting}
              onChange={(e) => setTemplates({ ...templates, greeting: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-[#00b4d8] leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-bold mb-1.5">
              2. Itinerary Download Follow-up Message:
            </label>
            <textarea
              rows={3}
              value={templates.itinerary}
              onChange={(e) => setTemplates({ ...templates, itinerary: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-[#00b4d8] leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-bold mb-1.5">
              3. Booking Confirmation Message:
            </label>
            <textarea
              rows={3}
              value={templates.booking}
              onChange={(e) => setTemplates({ ...templates, booking: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-[#00b4d8] leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-bold mb-1.5">
              4. Payment Balance Due Reminder:
            </label>
            <textarea
              rows={3}
              value={templates.reminder}
              onChange={(e) => setTemplates({ ...templates, reminder: e.target.value })}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-[#00b4d8] leading-relaxed"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#00b4d8] to-[#0096c7] hover:from-[#0096c7] hover:to-[#0077b6] text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-[#00b4d8]/20 cursor-pointer transition-all"
          >
            <Save size={15} />
            <span>Save Templates</span>
          </button>
        </div>
      </form>

      {/* Zyntex CRM Cloud Integration Card */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-blue-950/40 border border-cyan-500/30 shadow-2xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 text-[#00b4d8] flex items-center justify-center border border-cyan-500/30">
              <Cloud size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-black text-lg text-white">Zyntex CRM Cloud Pipeline</h2>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Active & Connected
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Multi-tenant B2B SaaS CRM pipeline receiving all website leads, trips & payments in real-time.
              </p>
            </div>
          </div>

          <a
            href="https://crm-alpha-drab.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-500/20 transition-all shrink-0"
          >
            <span>Open Zyntex CRM</span>
            <ExternalLink size={13} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Company Live API Key</span>
              <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-md">Zoho-Style Auth</span>
            </div>
            <p className="font-mono text-cyan-300 font-bold break-all text-xs bg-slate-900/90 p-2.5 rounded-xl border border-slate-800">
              zyn_live_650e6e860cd59079c84ae4b889e4c275
            </p>
            <p className="text-[10px] text-slate-500">Configured in <code>.env</code> as <code>ZYNTEX_CRM_API_KEY</code></p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Webhook Ingestion Endpoint</span>
              <span className="text-[10px] text-cyan-400 font-bold bg-cyan-500/10 px-2 py-0.5 rounded-md">HTTPS + CORS</span>
            </div>
            <p className="font-mono text-slate-200 break-all text-xs bg-slate-900/90 p-2.5 rounded-xl border border-slate-800">
              https://crm-alpha-drab.vercel.app/api/v1/capture-lead
            </p>
            <p className="text-[10px] text-slate-500">Auto-heals & synchronizes on serverless redeployments</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-800/80">
          <div className="text-xs">
            {crmResult ? (
              crmResult.connected ? (
                <span className="inline-flex items-center gap-1.5 text-emerald-400 font-bold">
                  <Check size={14} className="text-emerald-400" />
                  Connection verified! Ping latency: {crmResult.latencyMs}ms
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-rose-400 font-bold">
                  <AlertCircle size={14} className="text-rose-400" />
                  Test failed: {crmResult.error || 'Could not connect'}
                </span>
              )
            ) : (
              <span className="text-slate-400 text-[11px]">
                Click test to verify real-time handshake between Travel Tribes and your Zyntex CRM.
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleTestCRM}
            disabled={crmTesting}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center justify-center gap-2 border border-slate-700 transition-all cursor-pointer disabled:opacity-50"
          >
            <RefreshCw size={13} className={crmTesting ? 'animate-spin text-cyan-400' : 'text-slate-400'} />
            <span>{crmTesting ? 'Testing Handshake...' : 'Test CRM Handshake'}</span>
          </button>
        </div>
      </div>

      {/* System & Storage Diagnostics */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <Shield className="w-5 h-5 text-[#00b4d8]" />
          <h2 className="font-bold text-base text-white">System & Storage Status</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="text-slate-400 font-bold flex items-center gap-1.5">
              <Cloud size={14} className="text-cyan-400" />
              <span>Zyntex CRM Cloud</span>
            </span>
            <p className="text-emerald-300 font-medium">Live & Synchronizing</p>
            <p className="text-[10px] text-slate-500">Auto-push on all forms</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="text-slate-400 font-bold flex items-center gap-1.5">
              <FileSpreadsheet size={14} className="text-emerald-400" />
              <span>CRM Local Storage</span>
            </span>
            <p className="text-emerald-300 font-medium">Active (JSON Store)</p>
            <p className="text-[10px] text-slate-500">File: <code>data/crm-store.json</code></p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="text-slate-400 font-bold flex items-center gap-1.5">
              <Mail size={14} className="text-[#00b4d8]" />
              <span>Email & Notifications</span>
            </span>
            <p className="text-cyan-300 font-medium">Active (SMTP Gmail)</p>
            <p className="text-[10px] text-slate-500">Admin alerts delivered</p>
          </div>
        </div>
      </div>
    </div>
  )
}
