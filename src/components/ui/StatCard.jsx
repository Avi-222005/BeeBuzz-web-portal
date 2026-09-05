export default function StatCard({ label, value, icon: Icon, trend, className = '' }) {
  return (
    <div className={`bg-white rounded-card shadow-card border border-charcoal-200 p-5 flex flex-col gap-1 ${className}`}>
      <div className="flex items-center justify-between">
        <span className="section-label">{label}</span>
        {Icon && <Icon className="h-5 w-5 text-honey-500" />}
      </div>
      <div className="text-2xl font-bold text-charcoal-800 font-heading">{value}</div>
      {trend && <span className="text-xs text-charcoal-400">{trend}</span>}
    </div>
  )
}
