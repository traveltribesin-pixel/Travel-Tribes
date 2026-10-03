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
  ExternalLink
} from 'lucide-react'

export default function SettingsPage() {
  const [saved, setSaved] = useState(false)

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

      {/* System & Storage Diagnostics */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <Shield className="w-5 h-5 text-[#00b4d8]" />
          <h2 className="font-bold text-base text-white">System & Storage Status</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="text-slate-400 font-bold flex items-center gap-1.5">
              <FileSpreadsheet size={14} className="text-emerald-400" />
              <span>CRM Local Storage Engine</span>
            </span>
            <p className="text-emerald-300 font-medium">Active (JSON Atomic File Store)</p>
            <p className="text-[10px] text-slate-500">File location: <code>./data/crm-store.json</code></p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="text-slate-400 font-bold flex items-center gap-1.5">
              <Mail size={14} className="text-[#00b4d8]" />
              <span>Email & Notification Alerts</span>
            </span>
            <p className="text-cyan-300 font-medium">Active (SMTP / Gmail Transporter)</p>
            <p className="text-[10px] text-slate-500">Alerts sent to configured admin emails</p>
          </div>
        </div>
      </div>
    </div>
  )
}
