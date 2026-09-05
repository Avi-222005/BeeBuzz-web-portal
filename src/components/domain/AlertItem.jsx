import { AlertTriangle, AlertCircle, Info } from 'lucide-react'
import { timeAgo } from '../../utils/formatters'

const config = {
  danger: { icon: AlertCircle, bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-800', iconColor: 'text-danger' },
  warning: { icon: AlertTriangle, bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-800', iconColor: 'text-honey-600' },
  info: { icon: Info, bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800', iconColor: 'text-blue-500' },
}

export default function AlertItem({ alert }) {
  const c = config[alert.severity] || config.info
  const Icon = c.icon

  return (
    <div className={`flex items-start gap-3 p-4 rounded-card border ${c.bg} ${c.border}`}>
      <Icon className={`h-5 w-5 mt-0.5 flex-shrink-0 ${c.iconColor}`} />
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium ${c.text}`}>{alert.message}</p>
        <p className="text-xs text-charcoal-400 mt-1">{alert.hiveId} · {timeAgo(alert.createdAt)}</p>
      </div>
    </div>
  )
}
