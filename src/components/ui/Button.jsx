export default function Button({ children, variant = 'primary', size = 'md', className = '', disabled, ...props }) {
  const base = 'inline-flex items-center justify-center font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
  const variants = {
    primary: 'bg-honey-500 text-white hover:bg-honey-600 active:bg-honey-700 focus:ring-honey-500',
    secondary: 'bg-white text-charcoal-800 border border-charcoal-200 hover:bg-charcoal-50 active:bg-charcoal-100 focus:ring-charcoal-300',
    danger: 'bg-danger text-white hover:bg-red-600 active:bg-red-700 focus:ring-danger',
    ghost: 'text-charcoal-600 hover:bg-charcoal-50 active:bg-charcoal-100 focus:ring-charcoal-300',
    success: 'bg-success text-white hover:bg-green-600 active:bg-green-700 focus:ring-success',
  }
  const sizes = {
    sm: 'px-3 py-1.5 text-xs rounded-lg',
    md: 'px-5 py-2.5 text-sm rounded-btn',
    lg: 'px-6 py-3 text-sm rounded-btn',
    icon: 'p-2 rounded-full',
  }

  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} disabled={disabled} {...props}>
      {children}
    </button>
  )
}
