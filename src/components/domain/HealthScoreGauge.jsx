export default function HealthScoreGauge({ score, label }) {
  const getColor = (s) => {
    if (s >= 70) return { stroke: '#16A34A', bg: 'bg-green-50', text: 'text-success' }
    if (s >= 40) return { stroke: '#F59E0B', bg: 'bg-amber-50', text: 'text-honey-600' }
    return { stroke: '#DC2626', bg: 'bg-red-50', text: 'text-danger' }
  }

  const c = getColor(score)
  const circumference = 2 * Math.PI * 45
  const offset = circumference - (score / 100) * circumference

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#E7E5E4" strokeWidth="8" />
          <circle cx="50" cy="50" r="45" fill="none" stroke={c.stroke} strokeWidth="8" strokeLinecap="round"
            strokeDasharray={circumference} strokeDashoffset={offset}
            className="transition-all duration-1000 ease-out" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-3xl font-bold font-heading ${c.text}`}>{score}</span>
          <span className="text-[10px] text-charcoal-400 uppercase tracking-wide">out of 100</span>
        </div>
      </div>
      <span className={`mt-2 text-sm font-semibold ${c.text}`}>{label}</span>
    </div>
  )
}
