import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

export default function RoleGuard({ allowedRoles, children }) {
  const { role } = useAuthStore()

  // Determine active role from store or localStorage
  let activeRole = role
  if (!activeRole) {
    try {
      const stored = localStorage.getItem('herbaltrace_user')
      if (stored) {
        const parsed = JSON.parse(stored)
        const rawRole = (parsed?.role || parsed?.stakeholderType || '').toLowerCase()
        activeRole = rawRole === 'farmer' ? 'beekeeper' : rawRole
      }
    } catch (e) {}
  }

  const normalizedActiveRole = (activeRole || '').toLowerCase()
  const normalizedAllowedRoles = (allowedRoles || []).map(r => r.toLowerCase())

  if (!normalizedActiveRole || (normalizedAllowedRoles.length > 0 && !normalizedAllowedRoles.includes(normalizedActiveRole))) {
    return <Navigate to="/" replace />
  }

  return children
}

