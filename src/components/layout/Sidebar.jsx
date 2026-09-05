import { NavLink, useLocation, useSearchParams } from 'react-router-dom'
import {
  Home,
  List,
  Plus,
  FlaskConical,
  Users,
  FileText,
  LayoutDashboard,
  Factory,
  BarChart3,
  UserCheck,
  Database,
  MessageSquare,
  Layers,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Menu
} from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { useUIStore } from '../../store/uiStore'
import Logo from './Logo'

const adminNavItems = [
  { tab: 'overview', icon: BarChart3, label: 'Overview & Telemetry' },
  { tab: 'onboarding', icon: UserCheck, label: 'Stakeholder Onboarding' },
  { tab: 'traceability', icon: Database, label: 'Master Batches & Ledger' },
  { tab: 'stakeholders', icon: Users, label: 'Stakeholder Directory' },
  { tab: 'grievances', icon: MessageSquare, label: 'Grievances & Voice' },
  { tab: 'blockchain', icon: Layers, label: 'Hyperledger Fabric Nodes' },
  { tab: 'reports', icon: FileText, label: 'Report' }
]

const navByRole = {
  beekeeper: [
    { to: '/beekeeper', icon: Home, label: 'Apiary Overview' },
    { to: '/beekeeper/batches', icon: List, label: 'Harvested Batches' },
    { to: '/beekeeper/harvest/new', icon: Plus, label: 'New Harvest' }
  ],
  lab: [
    { to: '/lab', icon: FlaskConical, label: 'QC Lab Queue' }
  ],
  manufacturer: [
    { to: '/manufacturer', icon: Factory, label: 'Bottling & QR Ledger' }
  ]
}

export default function Sidebar() {
  const { role } = useAuthStore()
  const { isSidebarCollapsed, toggleSidebar } = useUIStore()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const currentTab = searchParams.get('tab') || 'overview'

  const isAdmin = role === 'admin' || role === 'Admin'
  const nonAdminItems = navByRole[role?.toLowerCase()] || navByRole.beekeeper

  return (
    <>
      <aside
        className={`hidden lg:flex flex-col bg-[#3d1702] text-honey-100 min-h-screen border-r border-[#6b2a06] transition-all duration-300 print:hidden relative ${
          isSidebarCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Brand Header & Collapse Toggle */}
        <div className={`p-4 border-b border-[#6b2a06]/80 flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-between'}`}>
          {!isSidebarCollapsed && (
            <div className="flex items-center gap-2 overflow-hidden">
              <Logo size="sm" light={true} />
            </div>
          )}
          <button
            type="button"
            onClick={toggleSidebar}
            title={isSidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            className="p-2 rounded-xl bg-[#552104] hover:bg-honey-500 hover:text-white text-honey-300 transition-colors flex items-center justify-center shadow-sm"
          >
            {isSidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1.5 overflow-y-auto">
          {isAdmin ? (
            adminNavItems.map((item) => {
              const isActive = location.pathname === '/admin' && currentTab === item.tab
              const Icon = item.icon
              return (
                <NavLink
                  key={item.tab}
                  to={`/admin?tab=${item.tab}`}
                  title={isSidebarCollapsed ? item.label : undefined}
                  className={`flex items-center ${isSidebarCollapsed ? 'justify-center px-2' : 'px-3.5'} py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-honey-500 text-white shadow-md'
                      : 'text-honey-200/80 hover:bg-[#552104] hover:text-white'
                  }`}
                >
                  <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-white' : 'text-honey-400'}`} />
                  {!isSidebarCollapsed && <span className="truncate ml-3">{item.label}</span>}
                </NavLink>
              )
            })
          ) : (
            nonAdminItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/beekeeper' || item.to === '/lab' || item.to === '/manufacturer'}
                title={isSidebarCollapsed ? item.label : undefined}
                className={({ isActive }) =>
                  `flex items-center ${isSidebarCollapsed ? 'justify-center px-2' : 'px-3.5'} py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive ? 'bg-honey-500 text-white shadow-sm' : 'text-honey-200/80 hover:bg-[#552104] hover:text-white'
                  }`
                }
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {!isSidebarCollapsed && <span className="truncate ml-3">{item.label}</span>}
              </NavLink>
            ))
          )}
        </nav>

        {/* Blockchain Status Footer */}
        <div className="p-3 border-t border-[#6b2a06] bg-[#331301]">
          {!isSidebarCollapsed ? (
            <>
              <div className="flex items-center justify-between text-[11px] font-bold text-honey-300 mb-1">
                <span>Fabric Ledger</span>
                <span className="font-mono text-honey-400">#172</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Raft Consensus Online</span>
              </div>
            </>
          ) : (
            <div className="flex justify-center" title="Raft Consensus Online (#172)">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
          )}
        </div>
      </aside>
    </>
  )
}
