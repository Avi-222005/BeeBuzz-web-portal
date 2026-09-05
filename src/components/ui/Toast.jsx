import { useToastStore } from '../../store/toastStore'
import { CheckCircle, AlertTriangle, XCircle, Info, X } from 'lucide-react'

const icons = {
  success: CheckCircle,
  warning: AlertTriangle,
  error: XCircle,
  info: Info,
}

const colors = {
  success: 'bg-green-50 border-green-200 text-green-800',
  warning: 'bg-amber-50 border-amber-200 text-amber-800',
  error: 'bg-red-50 border-red-200 text-red-800',
  info: 'bg-blue-50 border-blue-200 text-blue-800',
}

export default function ToastContainer() {
  const { toasts, removeToast } = useToastStore()

  if (toasts.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm">
      {toasts.map((toast) => {
        const Icon = icons[toast.type] || Info
        return (
          <div key={toast.id} className={`flex items-start gap-3 p-4 rounded-card border shadow-card animate-slide-in ${colors[toast.type]}`}>
            <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
            <p className="text-sm font-medium flex-1">{toast.message}</p>
            <button onClick={() => removeToast(toast.id)} className="p-0.5 hover:opacity-70">
              <X className="h-4 w-4" />
            </button>
          </div>
        )
      })}
    </div>
  )
}
