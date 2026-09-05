import { NavLink } from 'react-router-dom'
import { Home, Box, List, Plus } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'

const navByRole = {
  beekeeper: [
    { to: '/beekeeper', icon: Home, label: 'Home' },
    { to: '/beekeeper/batches', icon: List, label: 'Batches' },
    { to: '/beekeeper/harvest/new', icon: Plus, label: 'New' },
  ],
  admin: [
    { to: '/admin', icon: Home, label: 'Home' },
    { to: '/admin/beekeepers', icon: Box, label: 'Beekeepers' },
    { to: '/admin/batches', icon: List, label: 'Batches' },
  ],
  lab: [
    { to: '/lab', icon: Box, label: 'Lab' },
  ],
}

export default function BottomBar() {
  const { role } = useAuthStore()
  const items = navByRole[role] || []
  if (items.length <= 1) return null

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-charcoal-200 z-40 safe-area-pb print:hidden">
      <div className="flex items-center justify-around h-16">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/beekeeper' || item.to === '/admin' || item.to === '/lab'}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-3 py-1 text-[10px] font-medium transition-colors ${
                isActive ? 'text-honey-600' : 'text-charcoal-400'
              }`
            }
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
