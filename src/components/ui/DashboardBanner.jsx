import React from 'react'
import { MapPin, Wifi } from 'lucide-react'

export default function DashboardBanner({ name, cluster, registryId, actions, gradient = 'from-honey-400 via-honey-300 to-amber-200' }) {
  const getGreeting = () => {
    const h = new Date().getHours()
    if (h < 12) return 'Good Morning'
    if (h < 17) return 'Good Afternoon'
    return 'Good Evening'
  }

  return (
    <div className={`bg-gradient-to-r ${gradient} rounded-2xl p-6 sm:p-8 text-charcoal-800 relative overflow-hidden shadow-sm`}>
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/30 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 right-32 w-40 h-40 bg-white/20 rounded-full translate-y-1/2 pointer-events-none" />

      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-[#6b2a06]/80 text-xs font-bold uppercase tracking-wider mb-1">Welcome back</p>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#4a1c04]">
            {getGreeting()}, {name}
          </h1>
          <div className="flex flex-wrap items-center gap-3 mt-2 text-[#6b2a06] text-xs font-semibold">
            <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5 text-honey-700" /> {cluster}</span>
            <span className="text-[#6b2a06]/40">•</span>
            <span>Registry ID: <strong className="font-mono">{registryId}</strong></span>
            <span className="flex items-center gap-1 text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full border border-emerald-200">
              <Wifi className="h-3 w-3 animate-pulse" /> Live Telemetry Online
            </span>
          </div>
        </div>
        {actions && <div className="flex items-center gap-3 flex-shrink-0">{actions}</div>}
      </div>
    </div>
  )
}
