import { MapPin, Droplets, FlaskConical, Package, Link } from 'lucide-react'
import { formatDate } from '../../utils/formatters'

const iconMap = { MapPin, Droplets, FlaskConical, Package, Link }

export default function TimelineStepper({ steps = [] }) {
  return (
    <div className="relative">
      {steps.map((step, i) => {
        const Icon = iconMap[step.icon] || MapPin
        const isLast = i === steps.length - 1
        return (
          <div key={i} className="flex gap-4 pb-6 last:pb-0 relative">
            {/* Connector line */}
            {!isLast && (
              <div className="absolute left-5 top-10 w-0.5 h-[calc(100%-28px)] bg-honey-300" />
            )}
            {/* Icon circle */}
            <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full bg-honey-500 flex items-center justify-center">
              <Icon className="h-5 w-5 text-white" />
            </div>
            {/* Content */}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-charcoal-800">{step.title}</h4>
              <p className="text-xs text-charcoal-500 mt-0.5">{step.detail}</p>
              <p className="text-[10px] text-charcoal-400 mt-0.5">{formatDate(step.timestamp)}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
