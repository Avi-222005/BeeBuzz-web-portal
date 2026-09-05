import React from 'react'

export default function StatGrid({ stats }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <div key={i} className="bg-white rounded-2xl border border-neutral-200 p-5 hover:shadow-sm transition-all shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color || 'bg-amber-50 text-amber-700'}`}>
              <stat.icon className="h-5 w-5" />
            </div>
            {stat.trend && (
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">{stat.trend}</span>
            )}
          </div>
          <p className="text-2xl sm:text-3xl font-black font-heading text-zinc-900">{stat.value}</p>
          <p className="text-xs font-semibold text-zinc-600 mt-0.5">{stat.label}</p>
        </div>
      ))}
    </div>
  )
}
