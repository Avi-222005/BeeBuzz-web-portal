export default function Card({ children, className = '', hover = false, onClick, ...props }) {
  const base = 'bg-white rounded-card shadow-card border border-charcoal-200 p-6'
  const hoverClass = hover ? 'hover:shadow-card-hover transition-shadow cursor-pointer' : ''

  return (
    <div className={`${base} ${hoverClass} ${className}`} onClick={onClick} {...props}>
      {children}
    </div>
  )
}
