export default function LoadingSpinner({ size = 'md', className = '' }) {
  const sizes = { sm: 'h-5 w-5', md: 'h-8 w-8', lg: 'h-12 w-12' }
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className={`${sizes[size]} border-2 border-honey-200 border-t-honey-500 rounded-full animate-spin`} />
    </div>
  )
}
