import { useEffect } from 'react'
import { X } from 'lucide-react'

export default function Modal({ isOpen, onClose, title, children, className = '' }) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-charcoal-900/50 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative bg-white rounded-card shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto ${className}`}>
        <div className="flex items-center justify-between p-6 border-b border-charcoal-100">
          <h3 className="text-lg font-bold text-charcoal-800">{title}</h3>
          <button onClick={onClose} className="p-1 hover:bg-charcoal-50 rounded-full transition-colors">
            <X className="h-5 w-5 text-charcoal-400" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}
