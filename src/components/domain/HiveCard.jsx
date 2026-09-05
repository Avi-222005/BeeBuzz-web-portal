import { Link } from 'react-router-dom'
import { Thermometer, Droplets, Weight, ArrowRight } from 'lucide-react'
import Badge from '../ui/Badge'

const statusMap = {
  healthy: { color: 'bg-success', label: 'Healthy', badge: 'success' },
  warning: { color: 'bg-honey-500', label: 'Warning', badge: 'warning' },
  critical: { color: 'bg-danger', label: 'Critical', badge: 'danger' },
}

export default function HiveCard({ hive }) {
  const s = statusMap[hive.status] || statusMap.healthy

  return (
    <div className="bg-white rounded-card shadow-card border border-charcoal-200 p-5 hover:shadow-card-hover transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-bold text-charcoal-800 font-heading">{hive.name}</h3>
          <p className="text-xs text-charcoal-400">{hive.id} · {hive.location}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-2.5 h-2.5 rounded-full ${s.color}`} />
          <Badge variant={s.badge}>{s.label}</Badge>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-3">
        <div className="flex items-center gap-1.5 text-sm">
          <Thermometer className="h-4 w-4 text-honey-500" />
          <span className="text-charcoal-600">{hive.tempC}°C</span>
        </div>
        <div className="flex items-center gap-1.5 text-sm">
          <Droplets className="h-4 w-4 text-blue-400" />
          <span className="text-charcoal-600">{hive.humidity}%</span>
        </div>
        <div className="flex items-center gap-1.5 text-sm">
          <Weight className="h-4 w-4 text-charcoal-400" />
          <span className="text-charcoal-600">{hive.weightKg} kg</span>
        </div>
      </div>

      {/* Sparkline */}
      <div className="flex items-end gap-0.5 h-8 mb-3">
        {hive.sparkline.map((v, i) => (
          <div key={i} className="flex-1 bg-honey-300 rounded-t" style={{ height: `${((v - 30) / 10) * 100}%`, minHeight: '2px' }} />
        ))}
      </div>

      <Link to={`/beekeeper/hive/${hive.id}`} className="flex items-center gap-1 text-xs font-semibold text-honey-600 hover:text-honey-700 transition-colors">
        View Details <ArrowRight className="h-3 w-3" />
      </Link>
    </div>
  )
}
