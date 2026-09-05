export default function Skeleton({ className = '', lines = 1 }) {
  return (
    <div className={`animate-pulse ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="h-4 bg-charcoal-100 rounded mb-2 last:mb-0" style={{ width: `${70 + Math.random() * 30}%` }} />
      ))}
    </div>
  )
}
