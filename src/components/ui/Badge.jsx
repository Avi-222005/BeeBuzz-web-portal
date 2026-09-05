const variants = {
  success: 'bg-green-50 text-success border border-green-200',
  warning: 'bg-amber-50 text-honey-700 border border-amber-200',
  danger: 'bg-red-50 text-danger border border-red-200',
  neutral: 'bg-charcoal-50 text-charcoal-500 border border-charcoal-200',
  info: 'bg-blue-50 text-blue-700 border border-blue-200',
}

export default function Badge({ children, variant = 'neutral', className = '' }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wide ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}
