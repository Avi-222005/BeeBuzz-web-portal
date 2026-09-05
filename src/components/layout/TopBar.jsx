import React, { useState, useRef, useEffect } from 'react'
import { Bell, User, Settings, LogOut, ChevronDown, CheckCircle2, ShieldCheck, Database, MessageSquare, AlertCircle, Menu, PanelLeft } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { useUIStore } from '../../store/uiStore'
import { useNavigate, Link } from 'react-router-dom'
import Logo from './Logo'
import ProfileModal from './ProfileModal'

export default function TopBar() {
  const { profile, role, logout } = useAuthStore()
  const { toggleSidebar } = useUIStore()
  const navigate = useNavigate()

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [activeModalTab, setActiveModalTab] = useState(null) // 'profile' or 'password' or null

  const [notifications, setNotifications] = useState([
    { id: '1', text: 'Hyperledger Fabric consensus channel honeytrace-channel active', time: 'Just now', read: false, icon: ShieldCheck },
    { id: '2', text: 'FSSAI EA-IRMS purity verification pipeline operational', time: '5m ago', read: false, icon: Database }
  ])

  const dropdownRef = useRef(null)
  const notifRef = useRef(null)

  // Fetch live notifications
  useEffect(() => {
    const fetchLiveNotifications = async () => {
      try {
        const token = localStorage.getItem('beebuzz_token') || localStorage.getItem('herbaltrace_token') || localStorage.getItem('auth_token')
        const headers = token ? { Authorization: `Bearer ${token}` } : {}
        const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'

        const notifs = []

        // Check recent batches
        const batchesRes = await fetch(`${backendUrl}/api/v1/batches`, { headers }).catch(() => null)
        if (batchesRes && batchesRes.ok) {
          const bData = await batchesRes.json()
          const list = bData.data || bData.batches || (Array.isArray(bData) ? bData : [])
          list.slice(0, 3).forEach((b, i) => {
            notifs.push({
              id: `b-${b.id || i}`,
              text: `Harvest Batch ${b.batch_number || b.id} registered (${b.species || 'Pure Honey'})`,
              time: b.created_at ? new Date(b.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Recent',
              read: false,
              icon: Database
            })
          })
        }

        // Check onboarding requests if admin
        const reqsRes = await fetch(`${backendUrl}/api/v1/auth/registration-requests`, { headers }).catch(() => null)
        if (reqsRes && reqsRes.ok) {
          const rData = await reqsRes.json()
          const rList = rData.data || (Array.isArray(rData) ? rData : [])
          rList.filter(r => r.status === 'pending').slice(0, 2).forEach((r) => {
            notifs.push({
              id: `req-${r.id}`,
              text: `Onboarding request: ${r.full_name || r.email} (${r.role})`,
              time: 'Pending review',
              read: false,
              icon: User
            })
          })
        }

        // Check complaints
        const compRes = await fetch(`${backendUrl}/api/v1/complaints`, { headers }).catch(() => null)
        if (compRes && compRes.ok) {
          const cData = await compRes.json()
          const cList = cData.data || (Array.isArray(cData) ? cData : [])
          cList.slice(0, 2).forEach((c) => {
            notifs.push({
              id: `cmp-${c.id || c.complaint_id}`,
              text: `Complaint ticket ${c.complaint_id || c.id}: ${c.category || 'Support'} (${c.status})`,
              time: c.created_at ? new Date(c.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Recent',
              read: c.status === 'resolved',
              icon: CheckCircle2
            })
          })
        }

        if (notifs.length > 0) {
          setNotifications(notifs)
        }
      } catch (err) {
        console.warn('Notifications fetch error:', err)
      }
    }

    fetchLiveNotifications()
    const interval = setInterval(fetchLiveNotifications, 15000)
    return () => clearInterval(interval)
  }, [])

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setIsNotificationsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    logout()
    setIsDropdownOpen(false)
    navigate('/')
  }

  const unreadCount = notifications.filter(n => !n.read).length

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  return (
    <header className="bg-white border-b border-neutral-200 sticky top-0 z-40 shadow-sm text-zinc-900 print:hidden">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Empty left anchor to maintain clean alignment */}
        <div className="flex items-center">
        </div>

        <div className="flex items-center gap-3 sm:gap-4 relative">
          {/* Notification Bell Dropdown as in Image 4 */}
          <div className="relative" ref={notifRef}>
            <button
              type="button"
              onClick={() => {
                setIsNotificationsOpen(!isNotificationsOpen)
                setIsDropdownOpen(false)
              }}
              className="p-2 text-zinc-600 hover:text-zinc-900 hover:bg-neutral-100 rounded-full transition-colors relative"
              title="Notifications"
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-honey-500 rounded-full border-2 border-white animate-pulse" />
              )}
            </button>

            {/* Notification Pop-down */}
            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-neutral-200 py-3 z-50 animate-fadeIn text-zinc-900">
                <div className="flex items-center justify-between px-4 pb-2 border-b border-neutral-100">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm">Notifications</span>
                    {unreadCount > 0 && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#F5EBE1] text-[#6b2a06] border border-[#EAD7C5]">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-xs text-honey-600 hover:underline font-semibold"
                    >
                      Mark all read
                    </button>
                  )}
                </div>

                <div className="max-h-72 overflow-y-auto divide-y divide-neutral-100">
                  {notifications.map((n) => {
                    const Icon = n.icon
                    return (
                      <div
                        key={n.id}
                        className={`p-3 flex items-start gap-3 hover:bg-neutral-50 transition-colors ${
                          !n.read ? 'bg-amber-50/40' : ''
                        }`}
                      >
                        <div className="p-2 rounded-xl bg-[#F5EBE1] text-[#6b2a06] flex-shrink-0 mt-0.5">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-zinc-800 leading-relaxed font-medium">{n.text}</p>
                          <span className="text-[10px] text-zinc-400 mt-1 block">{n.time}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Profile Pop-down Button (As in Image 4) */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => {
                setIsDropdownOpen(!isDropdownOpen)
                setIsNotificationsOpen(false)
              }}
              className="flex items-center gap-2.5 p-1 sm:px-2 sm:py-1 rounded-full sm:rounded-2xl hover:bg-neutral-100 transition-all text-left"
            >
              {/* Profile Avatar with online status (Warm theme brown) */}
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-[#6b2a06] flex items-center justify-center text-white font-bold text-sm shadow-sm">
                  {profile?.name?.charAt(0) || 'A'}
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-honey-500 border-2 border-white" />
              </div>

              <div className="hidden sm:block">
                <p className="text-xs font-bold text-zinc-900 leading-tight">
                  {profile?.name || 'Priya Desai'}
                </p>
                <p className="text-[10px] text-zinc-500 capitalize font-medium">
                  {role || 'Admin'}
                </p>
              </div>

              <ChevronDown className={`h-4 w-4 text-zinc-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Profile Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-neutral-200 py-3 z-50 animate-fadeIn text-zinc-900">
                {/* Header Profile Info inside Dropdown */}
                <div className="flex items-center gap-3 px-4 pb-3 border-b border-neutral-100">
                  <div className="w-11 h-11 rounded-full bg-[#6b2a06] flex items-center justify-center text-white font-bold text-base shadow-sm">
                    {profile?.name?.charAt(0) || 'P'}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-zinc-900 truncate">
                      {profile?.name || 'Priya Desai'}
                    </p>
                    <p className="text-xs text-zinc-500 capitalize font-medium">
                      {role || 'Admin'}
                    </p>
                  </div>
                </div>

                {/* Dropdown Options */}
                <div className="py-2 space-y-0.5">
                  <button
                    type="button"
                    onClick={() => {
                      setIsDropdownOpen(false)
                      setActiveModalTab('profile')
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-zinc-700 hover:bg-neutral-50 hover:text-zinc-900 transition-colors text-left"
                  >
                    <User className="h-4 w-4 text-zinc-500" />
                    <span>View Profile</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsDropdownOpen(false)
                      setActiveModalTab('password')
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-zinc-700 hover:bg-neutral-50 hover:text-zinc-900 transition-colors text-left"
                  >
                    <Settings className="h-4 w-4 text-zinc-500" />
                    <span>Settings & Password</span>
                  </button>
                </div>

                <div className="pt-2 border-t border-neutral-100">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors text-left"
                  >
                    <LogOut className="h-4 w-4 text-rose-600" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Profile & Password Modal (Opened when clicking View Profile or Settings) */}
      <ProfileModal
        isOpen={Boolean(activeModalTab)}
        initialTab={activeModalTab || 'profile'}
        onClose={() => setActiveModalTab(null)}
      />
    </header>
  )
}
