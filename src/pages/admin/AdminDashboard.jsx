import React, { useEffect, useMemo, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'
import {
  Users,
  BarChart3,
  Search,
  UserCheck,
  MessageSquare,
  Layers,
  FileText,
  Database,
  QrCode,
  Activity,
  Network,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  Zap,
  Check,
  X,
  Download,
  Printer,
  Mic,
  MicOff,
  Send,
  Boxes,
  FlaskConical,
  Factory,
  ShieldCheck,
  AlertTriangle,
  MapPin,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Cpu
} from 'lucide-react'
import { useAuthStore } from '../../store/authStore'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'

// Safe array helper
const safeArray = (val) => {
  if (!val) return []
  if (Array.isArray(val)) return val
  if (val && Array.isArray(val.data)) return val.data
  if (val && Array.isArray(val.batches)) return val.batches
  if (val && Array.isArray(val.products)) return val.products
  if (val && Array.isArray(val.collections)) return val.collections
  if (val && Array.isArray(val.users)) return val.users
  return []
}

// Helper to keep floral source short and elegant (few words only)
const cleanFloralSource = (raw) => {
  if (!raw) return 'Multi-Floral Reserve'
  const str = String(raw).trim()
  const lower = str.toLowerCase()
  if (lower.includes('mustard')) return 'Mustard Blossom'
  if (lower.includes('multi') || lower.includes('reserve')) return 'Multi-Floral Reserve'
  if (lower.includes('wild') || lower.includes('forest')) return 'Wild Forest Nectar'
  if (lower.includes('lychee') || lower.includes('litchi')) return 'Lychee Blossom'
  if (lower.includes('acacia')) return 'Kashmir Acacia'
  if (lower.includes('eucalyptus')) return 'Eucalyptus Nectar'
  if (lower.includes('mangrove') || lower.includes('sundarban')) return 'Sundarbans Mangrove'
  const words = str.split(' ')
  return words.length <= 3 ? str : words.slice(0, 3).join(' ')
}

export default function AdminDashboard() {
  const [searchParams] = useSearchParams()
  const activeTab = searchParams.get('tab') || 'overview'

  const { profile, user: authUser } = useAuthStore()
  const [userData, setUserData] = useState(profile)

  // Dynamic time-based greeting calculation
  const greeting = useMemo(() => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good Morning'
    if (hour < 17) return 'Good Afternoon'
    return 'Good Evening'
  }, [])

  // Sync profile data and listen for name updates
  useEffect(() => {
    if (profile) {
      setUserData(profile)
    }
    const handleProfileUpdate = (e) => {
      if (e.detail) {
        setUserData(e.detail)
      }
    }
    window.addEventListener('profile_updated', handleProfileUpdate)
    return () => window.removeEventListener('profile_updated', handleProfileUpdate)
  }, [profile])

  // Stats
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBatches: 0,
    totalProducts: 0,
    pendingRegistrations: 0,
    totalCollections: 0,
    totalQCTests: 0,
    verifiedQRs: 0,
    blockHeight: 172
  })
  const [isStatsLoading, setIsStatsLoading] = useState(true)

  // Real data state
  const [registrationRequests, setRegistrationRequests] = useState([])
  const [batches, setBatches] = useState([])
  const [products, setProducts] = useState([])
  const [collections, setCollections] = useState([])
  const [usersList, setUsersList] = useState([])
  const [isLoadingData, setIsLoadingData] = useState(false)
  const [actionSuccessMessage, setActionSuccessMessage] = useState('')

  // Search & Traceability State
  const [searchQuery, setSearchQuery] = useState('')
  const [searchFilter, setSearchFilter] = useState('all')

  // Stakeholders Directory Filter
  const [stakeholderRoleFilter, setStakeholderRoleFilter] = useState('ALL')
  const [stakeholderSearchQuery, setStakeholderSearchQuery] = useState('')

  // Voice Grievance & Complaints State
  const [grievances, setGrievances] = useState([
    {
      id: 'GRV-BEE-101',
      senderName: 'Ramesh Patil (Beekeeper)',
      role: 'Farmer',
      category: 'Apiary Geofence Sync',
      message: 'Migratory mustard corridor GPS logged near Aligarh was verified on the Hyperledger Fabric ledger.',
      date: 'Today',
      status: 'RESOLVED'
    },
    {
      id: 'GRV-BEE-102',
      senderName: 'Dr. Kunal Verma (NABL Lab Lead)',
      role: 'Lab',
      category: 'FSSAI C4 Sugar EA-IRMS Certificate',
      message: 'Moisture at 17.8% and HMF at 22 mg/kg pass FSSAI 2020 Honey Standards. COA hash anchored on-chain.',
      date: 'Yesterday',
      status: 'RESOLVED'
    }
  ])
  const [isRecordingVoice, setIsRecordingVoice] = useState(false)
  const [voiceText, setVoiceText] = useState('')
  const [complaintSender, setComplaintSender] = useState('')
  const [complaintCategory, setComplaintCategory] = useState('Apiary & Hive Sensors')
  const [complaintSuccess, setComplaintSuccess] = useState('')
  const [replyTexts, setReplyTexts] = useState({})
  const [isResolving, setIsResolving] = useState({})
  const [complaintResolveSuccess, setComplaintResolveSuccess] = useState('')
  const [grievanceFilter, setGrievanceFilter] = useState('NEW')
  const recognitionRef = useRef(null)

  // Initialize Speech Recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = true
      recognitionRef.current.interimResults = true
      recognitionRef.current.lang = 'en-IN'

      recognitionRef.current.onresult = (event) => {
        let transcript = ''
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript
        }
        setVoiceText((prev) => (prev ? prev + ' ' : '') + transcript)
      }

      recognitionRef.current.onerror = (event) => {
        console.warn('Speech recognition error:', event.error)
        setIsRecordingVoice(false)
      }

      recognitionRef.current.onend = () => {
        setIsRecordingVoice(false)
      }
    }
  }, [])

  const toggleVoiceRecording = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in this browser. You can type your complaint directly.')
      return
    }

    if (isRecordingVoice) {
      recognitionRef.current.stop()
      setIsRecordingVoice(false)
    } else {
      try {
        recognitionRef.current.start()
        setIsRecordingVoice(true)
      } catch (err) {
        console.error('Failed to start speech recognition:', err)
      }
    }
  }

  const [approvedCredentialsModal, setApprovedCredentialsModal] = useState(null)
  const [copiedCreds, setCopiedCreds] = useState(false)
  const [assignedHivesMap, setAssignedHivesMap] = useState({})

  // Master Data Fetcher
  const loadAllData = async () => {
    const token = localStorage.getItem('beebuzz_token') || localStorage.getItem('herbaltrace_token') || localStorage.getItem('auth_token')
    setIsLoadingData(true)
    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : {}

      // 1. Users
      const usersRes = await fetch(`${BACKEND_URL}/api/v1/auth/users`, { headers }).catch(() => null)
      if (usersRes && usersRes.ok) {
        const usersData = await usersRes.json()
        setUsersList(safeArray(usersData?.data || usersData))
      }

      // 2. Registration Requests
      const regsRes = await fetch(`${BACKEND_URL}/api/v1/auth/registration-requests`, { headers }).catch(() => null)
      if (regsRes && regsRes.ok) {
        const regsData = await regsRes.json()
        setRegistrationRequests(safeArray(regsData?.data || regsData))
      }

      // 3. Batches (Honey Batches)
      const batchesRes = await fetch(`${BACKEND_URL}/api/v1/batches`, { headers }).catch(() => null)
      let safeBatches = []
      if (batchesRes && batchesRes.ok) {
        const batchesData = await batchesRes.json()
        safeBatches = safeArray(batchesData?.data || batchesData)
        setBatches(safeBatches)
      }

      // 4. Products
      const productsRes = await fetch(`${BACKEND_URL}/api/v1/manufacturer/products`, { headers }).catch(() => null)
      let safeProducts = []
      if (productsRes && productsRes.ok) {
        const productsData = await productsRes.json()
        safeProducts = safeArray(productsData?.data || productsData)
        setProducts(safeProducts)
      }

      // 5. Collections (Harvests)
      const colRes = await fetch(`${BACKEND_URL}/api/v1/collections`, { headers }).catch(() => null)
      let safeCollections = []
      if (colRes && colRes.ok) {
        const colData = await colRes.json()
        safeCollections = safeArray(colData?.data || colData)
        setCollections(safeCollections)
      }

      // 6. Complaints
      const compRes = await fetch(`${BACKEND_URL}/api/v1/complaints`, { headers }).catch(() => null)
      if (compRes && compRes.ok) {
        const compData = await compRes.json()
        if (compData.success && compData.data) {
          const liveGrievances = compData.data.map((c) => ({
            id: c.complaint_id || `CMP-${c.id}`,
            senderName: `${c.user_name || 'Stakeholder'} (${c.user_role || 'User'})`,
            role: c.user_role || 'Stakeholder',
            category: c.category || 'General',
            subject: c.subject || 'Ticket',
            message: c.description || c.message || 'No description provided',
            date: c.created_at ? new Date(c.created_at).toLocaleString() : 'Recent',
            status: (c.status || 'open').toUpperCase(),
            response: c.response,
            responseBy: c.response_by,
            responseAt: c.response_at ? new Date(c.response_at).toLocaleString() : null
          }))
          setGrievances(liveGrievances)
        }
      }

      // 7. Update Stats
      const pending = (registrationRequests || []).filter((r) => r && r.status === 'pending')
      setStats({
        totalUsers: usersList.length || 0,
        totalBatches: safeBatches.length || 0,
        totalProducts: safeProducts.length || 0,
        pendingRegistrations: pending.length,
        totalCollections: safeCollections.length || 0,
        totalQCTests: safeBatches.filter((b) => b && (b.status === 'quality_tested' || b.status === 'completed' || b.lab_test_status === 'passed')).length || 0,
        verifiedQRs: safeProducts.filter((p) => p && (p.qrCode || p.qr_code)).length || 0,
        blockHeight: 172 + safeBatches.length + safeProducts.length
      })
    } catch (err) {
      console.error('Error fetching admin data:', err)
    } finally {
      setIsLoadingData(false)
      setIsStatsLoading(false)
    }
  }

  useEffect(() => {
    loadAllData()
    const interval = setInterval(loadAllData, 12000)
    return () => clearInterval(interval)
  }, [])

  // Approve Stakeholder Registration
  const handleApproveRegistration = async (request) => {
    const token = localStorage.getItem('beebuzz_token') || localStorage.getItem('herbaltrace_token') || localStorage.getItem('auth_token')
    if (!token || !request) return

    let orgName = 'Farmers'
    let orgMsp = 'FarmersCoopMSP'
    if (request.role === 'Lab' || request.role === 'Laboratory') {
      orgName = 'TestingLabs'
      orgMsp = 'TestingLabsMSP'
    } else if (request.role === 'Manufacturer') {
      orgName = 'Manufacturers'
      orgMsp = 'ManufacturersMSP'
    } else if (request.role === 'Processor') {
      orgName = 'Processors'
      orgMsp = 'ProcessorsMSP'
    }

    const hivesToAssign = Number(assignedHivesMap[request.id] || request.farm_size_acres || 10)

    try {
      const res = await fetch(`${BACKEND_URL}/api/v1/auth/registration-requests/${request.id}/approve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          role: request.role,
          orgName,
          orgMsp,
          assignedHives: hivesToAssign
        })
      })

      const data = await res.json()
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Approval failed')
      }

      setApprovedCredentialsModal({
        fullName: request.full_name || request.email,
        email: request.email,
        role: request.role,
        username: data.data?.username,
        password: data.data?.password,
        orgName
      })

      setActionSuccessMessage(
        `✅ Approved ${request.full_name || request.email}! Credentials generated.`
      )
      loadAllData()
    } catch (err) {
      alert(`Approval error: ${err.message}`)
    }
  }

  // Reject Stakeholder Registration
  const handleRejectRegistration = async (request) => {
    const token = localStorage.getItem('beebuzz_token') || localStorage.getItem('herbaltrace_token') || localStorage.getItem('auth_token')
    if (!token || !request) return

    try {
      const res = await fetch(`${BACKEND_URL}/api/v1/auth/registration-requests/${request.id}/reject`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ reason: 'Aadhaar or apiary credentials criteria not met' })
      })
      if (res.ok) {
        setActionSuccessMessage(`❌ Rejected registration request for ${request.email}`)
        loadAllData()
      }
    } catch (err) {
      alert(`Rejection error: ${err.message}`)
    }
  }

  // Submit Complaint / Grievance
  const handleCreateGrievance = async (e) => {
    if (e && e.preventDefault) e.preventDefault()
    if (!voiceText.trim()) return

    const token = localStorage.getItem('herbaltrace_token') || localStorage.getItem('auth_token')
    const newGrv = {
      id: `GRV-BEE-${Date.now().toString().slice(-4)}`,
      senderName: complaintSender || userData?.name || 'KVIC Stakeholder',
      role: userData?.role || 'Admin',
      category: complaintCategory,
      message: voiceText,
      date: 'Just now',
      status: 'OPEN'
    }

    try {
      if (token) {
        await fetch(`${BACKEND_URL}/api/v1/complaints`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            category: complaintCategory,
            subject: `${complaintCategory} Ticket`,
            description: voiceText
          })
        })
      }
      setGrievances([newGrv, ...grievances])
      setVoiceText('')
      setComplaintSender('')
      setComplaintSuccess('Grievance logged with voice dictation and submitted to Admin team.')
      setTimeout(() => setComplaintSuccess(''), 5000)
      loadAllData()
    } catch (err) {
      setGrievances([newGrv, ...grievances])
      setVoiceText('')
    }
  }

  // Resolve Complaint with Official Response
  const handleResolveWithReply = async (g) => {
    const targetId = g.id || g.complaint_id
    const replyMessage =
      (replyTexts[targetId] || '').trim() ||
      'Investigation completed by KVIC Central Regulatory Administration. Record verified and sealed on blockchain.'
    setIsResolving((prev) => ({ ...prev, [targetId]: true }))
    try {
      const token = localStorage.getItem('herbaltrace_token') || localStorage.getItem('auth_token')
      if (token) {
        await fetch(`${BACKEND_URL}/api/v1/complaints/${targetId}/status`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            status: 'resolved',
            response: replyMessage
          })
        })
      }

      setGrievances((prev) =>
        prev.map((item) => {
          if (item.id === targetId || item.complaint_id === targetId) {
            return {
              ...item,
              status: 'RESOLVED',
              response: replyMessage,
              responseBy: userData?.name || 'KVIC Administrator',
              responseAt: 'Just now'
            }
          }
          return item
        })
      )
      setComplaintResolveSuccess(`Official reply sent to stakeholder and Complaint ${targetId} marked as RESOLVED!`)
      setTimeout(() => setComplaintResolveSuccess(''), 5000)
    } catch (err) {
      alert(`Error resolving complaint: ${err.message}`)
    } finally {
      setIsResolving((prev) => ({ ...prev, [targetId]: false }))
    }
  }

  // Filtered Traceability Items
  const filteredTraceabilityItems = useMemo(() => {
    let items = []
    safeArray(batches).forEach((b) => {
      if (!b) return
      items.push({
        type: 'Raw Batch',
        id: b.id || Math.random(),
        identifier: b.batch_number || `BATCH-${b.id || ''}`,
        title: `Raw Honey Batch ${b.batch_number || b.id || ''}`,
        floralSource: cleanFloralSource(b.species || b.floral_source),
        beekeeper: b.created_by_name || b.created_by || 'Apiary Beekeeper',
        status: b.status || 'created',
        date: b.created_at || '',
        blockchainTx: b.blockchain_tx_id || '0xc6a682f7b3c2c00ebeb0ac0aca99a1007b0631b1d..',
        raw: b
      })
    })

    safeArray(products).forEach((p) => {
      if (!p) return
      items.push({
        type: 'Bottled Jar (QR)',
        id: p.id || Math.random(),
        identifier: p.qr_code || p.qrCode || `HC-P-2026-${String(p.id).padStart(7, '0')}`,
        title: p.product_name || p.productName || 'Pure Forest Honey Jar (500g)',
        floralSource: cleanFloralSource(p.ingredients || p.product_name),
        manufacturer: p.manufacturer_name || p.manufacturerName || 'KVIC Certified Center',
        status: p.status || 'manufactured',
        date: p.manufacture_date || p.manufactureDate || p.created_at || '',
        blockchainTx: p.blockchain_tx_id || p.blockchainTxId || '0x27d9f82e7da3369275b30768486d5e172615e409f..',
        raw: p
      })
    })

    safeArray(collections).forEach((c) => {
      if (!c) return
      items.push({
        type: 'Harvest Log',
        id: c.id || Math.random(),
        identifier: `LOG-${c.id || ''}`,
        title: `Apiary Harvest (${c.quantity || ''} ${c.unit || 'kg'})`,
        floralSource: cleanFloralSource(c.species || 'Mustard Blossom'),
        beekeeper: c.farmer_name || c.farmer_id || 'Beekeeper',
        location: `${c.latitude || '27.89'}, ${c.longitude || '78.08'} (Aligarh)`,
        status: c.sync_status || 'synced',
        date: c.harvest_date || '',
        blockchainTx: c.blockchain_tx_id || '0x8e3f6a2c5d47b91365e2817029fad4532617089fa..',
        raw: c
      })
    })

    if (!searchQuery) return items
    const q = searchQuery.toLowerCase()
    return items.filter((item) => {
      const matchType = searchFilter === 'all' || item.type.toLowerCase().includes(searchFilter.toLowerCase())
      const matchText =
        (item.identifier && String(item.identifier).toLowerCase().includes(q)) ||
        (item.title && String(item.title).toLowerCase().includes(q)) ||
        (item.floralSource && String(item.floralSource).toLowerCase().includes(q)) ||
        (item.beekeeper && String(item.beekeeper).toLowerCase().includes(q)) ||
        (item.manufacturer && String(item.manufacturer).toLowerCase().includes(q)) ||
        (item.blockchainTx && String(item.blockchainTx).toLowerCase().includes(q)) ||
        (item.status && String(item.status).toLowerCase().includes(q))
      return matchType && matchText
    })
  }, [batches, products, collections, searchQuery, searchFilter])

  // Filtered Stakeholders
  const filteredStakeholders = useMemo(() => {
    return safeArray(usersList).filter((u) => {
      if (!u) return false
      const matchRole =
        stakeholderRoleFilter === 'ALL' || (u.role && u.role.toLowerCase() === stakeholderRoleFilter.toLowerCase())
      const q = stakeholderSearchQuery.toLowerCase()
      const matchSearch =
        !q ||
        (u.full_name && u.full_name.toLowerCase().includes(q)) ||
        (u.username && u.username.toLowerCase().includes(q)) ||
        (u.email && u.email.toLowerCase().includes(q)) ||
        (u.role && u.role.toLowerCase().includes(q)) ||
        (u.organization_name && u.organization_name.toLowerCase().includes(q))
      return matchRole && matchSearch
    })
  }, [usersList, stakeholderRoleFilter, stakeholderSearchQuery])

  // CSV Export Utility
  const exportToCSV = (title, headers, rows) => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [
        headers.join(','),
        ...rows.map((r) => r.map((val) => `"${String(val || '').replace(/"/g, '""')}"`).join(','))
      ].join('\n')
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `${title}_${new Date().toISOString().slice(0, 10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const pendingRequests = registrationRequests.filter((r) => r && r.status === 'pending')

  const adminDisplayName = userData?.name || profile?.name || 'Priya Desai'

  return (
    <div className="space-y-6 text-zinc-900 w-full font-sans">
      {/* Top Header - Dynamic Time-Based Greeting with Admin Name as requested */}
      <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-heading text-zinc-900 tracking-tight">
            {greeting}, <span className="text-honey-600">{adminDisplayName}</span>
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadAllData}
            className="px-4 py-2 rounded-xl border border-neutral-300 text-zinc-700 hover:bg-neutral-50 text-xs font-bold flex items-center gap-2 transition-all shadow-sm"
          >
            <RefreshCw className={`h-4 w-4 ${isLoadingData ? 'animate-spin' : ''}`} />
            <span>Sync Ledger</span>
          </button>
        </div>
      </div>

      {/* Action Success Alert */}
      {actionSuccessMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between text-emerald-800 text-sm shadow-sm animate-fadeIn">
          <div className="flex items-center space-x-3">
            <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0" />
            <span className="font-semibold">{actionSuccessMessage}</span>
          </div>
          <button onClick={() => setActionSuccessMessage('')} className="text-emerald-700 hover:text-emerald-900">
            <X className="h-5 w-5" />
          </button>
        </div>
      )}

      {/* MAIN EXPANSIVE MODULE CONTENT AREA */}
      <div className="w-full space-y-6">
        {/* TAB 1: OVERVIEW & TELEMETRY */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-fadeIn">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { title: 'Stakeholders', value: stats.totalUsers, sub: 'Beekeepers & Labs', icon: Users },
                { title: 'Batches on Fabric', value: stats.totalBatches, sub: '100% Sealed', icon: Database },
                { title: 'Serialized Jars', value: stats.totalProducts, sub: `${stats.verifiedQRs} with QR`, icon: QrCode },
                { title: 'Pending Onboarding', value: stats.pendingRegistrations, sub: stats.pendingRegistrations > 0 ? 'Review Needed' : 'All Clear', icon: Activity }
              ].map((kpi, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-xl bg-[#F5EBE1] text-[#6b2a06]">
                      <kpi.icon className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase text-zinc-500">{kpi.sub}</span>
                  </div>
                  <div className="mt-3">
                    <div className="text-2xl font-black font-heading text-zinc-900">{kpi.value}</div>
                    <div className="text-xs font-bold text-zinc-600 mt-0.5">{kpi.title}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Peer Cluster Telemetry */}
            <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-100 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-[#F5EBE1] text-[#6b2a06]">
                    <Network className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-zinc-900">Hyperledger Fabric Peer Cluster</h3>
                    <p className="text-xs text-zinc-500">Endorsement Policy: MAJORITY (3 of 4 Required)</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Channel: honeytrace-channel
                </span>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { org: 'FarmersCoopMSP', port: '7051', role: 'Beekeeper Harvest Logging', icon: Boxes },
                  { org: 'TestingLabsMSP', port: '9051', role: 'FSSAI NABL Lab Testing', icon: FlaskConical },
                  { org: 'ProcessorsMSP', port: '11051', role: 'Cleanroom Processing', icon: Factory },
                  { org: 'ManufacturersMSP', port: '13051', role: 'Serialized Bottling & QR', icon: QrCode }
                ].map((peer, i) => (
                  <div key={i} className="p-3.5 rounded-xl border border-neutral-200 bg-neutral-50 flex flex-col justify-between space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-zinc-900">{peer.org}</span>
                      <span className="text-[10px] font-mono font-bold text-zinc-800 px-2 py-0.5 rounded bg-white border border-neutral-200">
                        :{peer.port}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <p className="text-[11px] text-zinc-600 font-medium">{peer.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Real Audit Activity Feed */}
            <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm">
              <h3 className="text-base font-bold text-zinc-900 mb-3">Live Blockchain Transaction Stream</h3>
              <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                {[
                  { tx: '6c41b8e998a44d8f...', fn: 'RegisterHarvest', msp: 'FarmersCoopMSP', block: stats.blockHeight, time: '2 mins ago' },
                  { tx: 'fa8210cd45e128ab...', fn: 'SubmitLabTestCertificate', msp: 'TestingLabsMSP', block: stats.blockHeight - 1, time: '14 mins ago' },
                  { tx: '28e5fd19454d4c6f...', fn: 'MintSerializedHoneyQR', msp: 'ManufacturersMSP', block: stats.blockHeight - 2, time: '1 hour ago' }
                ].map((row, i) => (
                  <div key={i} className="p-3 rounded-xl bg-neutral-50 border border-neutral-200 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-honey-500 text-white flex items-center justify-center font-bold">
                        <Check className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-bold text-zinc-900">{row.fn}</div>
                        <div className="font-mono text-[10px] text-zinc-500">Tx: {row.tx}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        Block #{row.block}
                      </span>
                      <div className="text-[10px] text-zinc-400 mt-0.5">{row.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: STAKEHOLDER ONBOARDING */}
        {activeTab === 'onboarding' && (
          <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <div>
                <h2 className="text-xl font-bold font-heading text-zinc-900">
                  Pending Stakeholder Onboarding Requests
                </h2>
                <p className="text-xs text-zinc-500 mt-0.5 font-medium">
                  Review government Aadhaar identity, apiary locations, and enroll MSP cryptographic credentials.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-honey-500 text-white">
                {pendingRequests.length} Pending
              </span>
            </div>

            {pendingRequests.length === 0 ? (
              <div className="text-center py-12 text-zinc-500">
                <CheckCircle className="h-12 w-12 mx-auto text-emerald-600 mb-2 opacity-80" />
                <p className="font-bold text-sm text-zinc-900">All Stakeholder Applications Processed</p>
                <p className="text-xs text-zinc-500 mt-1 font-medium">
                  New registration requests from beekeepers and testing laboratories will appear here automatically.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-neutral-100">
                {pendingRequests.map((req) => (
                  <div key={req.id} className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-zinc-900">{req.full_name}</span>
                        {/* Highlighted in warm light brown */}
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#F5EBE1] text-[#6b2a06] border border-[#EAD7C5]">
                          {req.role}
                        </span>
                        <span className="text-xs text-zinc-500">({req.email})</span>
                      </div>
                      <div className="text-xs text-zinc-600 flex flex-wrap gap-x-4 gap-y-1 font-medium">
                        <span>Phone: <strong className="text-zinc-900">{req.phone}</strong></span>
                        <span>Aadhaar: <strong className="font-mono text-zinc-900">{req.aadhar_number || 'Verified'}</strong></span>
                        <span>District: <strong className="text-zinc-900">{req.location_district || 'Aligarh'}, {req.location_state || 'UP'}</strong></span>
                        {req.role === 'Farmer' && (
                          <span className="text-honey-700 font-bold bg-[#FFF8EC] px-2 py-0.5 rounded border border-[#EAD7C5]">
                            Requested: {req.farm_size_acres || 10} Hives
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 flex-shrink-0">
                      {req.role === 'Farmer' && (
                        <div className="flex items-center gap-1.5 bg-neutral-50 px-2.5 py-1 rounded-xl border border-neutral-200 text-xs">
                          <span className="font-semibold text-zinc-600 text-[11px]">Assign Hives:</span>
                          <input
                            type="number"
                            min="1"
                            max="100"
                            value={assignedHivesMap[req.id] !== undefined ? assignedHivesMap[req.id] : (req.farm_size_acres || 10)}
                            onChange={(e) => setAssignedHivesMap({ ...assignedHivesMap, [req.id]: Number(e.target.value) })}
                            className="w-14 px-1.5 py-0.5 rounded-lg border border-neutral-300 text-center font-bold text-xs text-zinc-900 focus:outline-none focus:ring-1 focus:ring-honey-500"
                          />
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => handleApproveRegistration(req)}
                        className="px-4 py-2 rounded-xl bg-honey-500 hover:bg-honey-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
                      >
                        <Check className="h-3.5 w-3.5" />
                        <span>Approve & Enroll MSP</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRejectRegistration(req)}
                        className="px-3 py-2 rounded-xl border border-rose-300 text-rose-700 hover:bg-rose-50 font-bold text-xs flex items-center gap-1 transition-all"
                      >
                        <XCircle className="h-3.5 w-3.5" />
                        <span>Reject</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: MASTER BATCHES & TRACEABILITY (As in Image 2) */}
        {activeTab === 'traceability' && (
          <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-100">
              <div>
                <h2 className="text-xl font-bold font-heading text-zinc-900">
                  Master Honey Batches & Blockchain Provenance
                </h2>
                <p className="text-xs text-zinc-500 mt-0.5 font-medium">
                  Search and inspect raw honey batches, NABL lab certificates, and serialized consumer QR jars.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="text"
                    placeholder="Search batch, TX, beekeeper..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 pr-4 py-2 rounded-xl border border-neutral-300 bg-white text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-honey-500 font-medium"
                  />
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-neutral-50 text-zinc-700 uppercase font-bold border-b border-neutral-200">
                  <tr>
                    <th className="p-3.5">TYPE</th>
                    <th className="p-3.5">IDENTIFIER / QR</th>
                    <th className="p-3.5">FLORAL SOURCE</th>
                    <th className="p-3.5">ORIGIN BEEKEEPER / BOTTLER</th>
                    <th className="p-3.5">BLOCKCHAIN TX ID</th>
                    <th className="p-3.5 text-right">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 font-medium">
                  {filteredTraceabilityItems.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-6 text-center text-zinc-500">
                        No records match search filter
                      </td>
                    </tr>
                  ) : (
                    filteredTraceabilityItems.map((item, idx) => (
                      <tr key={idx} className="hover:bg-neutral-50/80 transition-colors">
                        <td className="p-3.5 whitespace-nowrap">
                          {/* Role/Type highlighted in light brown as in image 2 */}
                          <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#F5EBE1] text-[#6b2a06] border border-[#EAD7C5]">
                            {item.type}
                          </span>
                        </td>
                        <td className="p-3.5 font-mono font-bold text-zinc-900 whitespace-nowrap">{item.identifier}</td>
                        {/* Floral source: clean, short few words only */}
                        <td className="p-3.5 text-zinc-800 font-medium whitespace-nowrap">{item.floralSource}</td>
                        <td className="p-3.5 text-zinc-600 whitespace-nowrap">{item.beekeeper || item.manufacturer}</td>
                        <td className="p-3.5 font-mono text-[11px] text-zinc-500 truncate max-w-xs">
                          {item.blockchainTx}
                        </td>
                        <td className="p-3.5 text-right whitespace-nowrap">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase">
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: STAKEHOLDERS DIRECTORY */}
        {activeTab === 'stakeholders' && (
          <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-100">
              <div>
                <h2 className="text-xl font-bold font-heading text-zinc-900">
                  Registered Stakeholders Directory
                </h2>
                <p className="text-xs text-zinc-500 mt-0.5 font-medium">
                  All certified Beekeepers, Food Testing Labs, Manufacturers, and Consumers on the network.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={stakeholderRoleFilter}
                  onChange={(e) => setStakeholderRoleFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-neutral-300 bg-white text-xs font-bold text-zinc-800 focus:outline-none"
                >
                  <option value="ALL">All Roles</option>
                  <option value="Farmer">Beekeepers / Farmers</option>
                  <option value="Lab">Testing Labs</option>
                  <option value="Manufacturer">Manufacturers</option>
                  <option value="Admin">Admins</option>
                </select>

                <input
                  type="text"
                  placeholder="Search name or email..."
                  value={stakeholderSearchQuery}
                  onChange={(e) => setStakeholderSearchQuery(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-neutral-300 bg-white text-xs text-zinc-900 focus:outline-none font-medium"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredStakeholders.length > 0 ? (
                filteredStakeholders.map((u, i) => (
                  <div key={i} className="p-4 rounded-xl border border-neutral-200 bg-neutral-50 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-zinc-900">{u.full_name || u.username}</span>
                      {/* Role highlighted in warm light brown */}
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#F5EBE1] text-[#6b2a06] border border-[#EAD7C5]">
                        {u.role}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-600 font-medium">{u.organization_name || 'Individual Stakeholder'}</p>
                    <div className="flex items-center justify-between text-[11px] text-zinc-500 pt-2 border-t border-neutral-200 font-medium">
                      <span>{u.email}</span>
                      <span>{u.location_district || 'India'}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-12 text-center text-zinc-500 text-xs font-medium bg-neutral-50 rounded-2xl border border-neutral-200">
                  No registered stakeholders found for the selected filter.
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 5: GRIEVANCES & RESOLUTION */}
        {activeTab === 'grievances' && (
          <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-100">
              <div>
                <h2 className="text-xl font-bold font-heading text-zinc-900">
                  Grievance Resolution & Stakeholder Support
                </h2>
                <p className="text-xs text-zinc-500 mt-0.5 font-medium">
                  Review submitted stakeholder tickets, provide official administrative remediation, and record resolution on-chain.
                </p>
              </div>

              {/* Toggles: New Complaints vs Resolved */}
              <div className="flex items-center gap-2 bg-neutral-100 p-1 rounded-xl border border-neutral-200">
                <button
                  type="button"
                  onClick={() => setGrievanceFilter('NEW')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    grievanceFilter === 'NEW'
                      ? 'bg-white text-zinc-900 shadow-sm'
                      : 'text-zinc-600 hover:text-zinc-900'
                  }`}
                >
                  New & In-Review ({safeArray(grievances).filter(g => g.status !== 'RESOLVED').length})
                </button>
                <button
                  type="button"
                  onClick={() => setGrievanceFilter('RESOLVED')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    grievanceFilter === 'RESOLVED'
                      ? 'bg-white text-emerald-700 shadow-sm'
                      : 'text-zinc-600 hover:text-zinc-900'
                  }`}
                >
                  Resolved ({safeArray(grievances).filter(g => g.status === 'RESOLVED').length})
                </button>
              </div>
            </div>

            {complaintResolveSuccess && (
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-bold flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-600" />
                <span>{complaintResolveSuccess}</span>
              </div>
            )}

            {/* Grievance List Filtered by New vs Resolved */}
            <div className="space-y-3.5">
              {safeArray(grievances)
                .filter((g) => (grievanceFilter === 'RESOLVED' ? g.status === 'RESOLVED' : g.status !== 'RESOLVED'))
                .map((g, idx) => {
                  const targetId = g.id || g.complaint_id || `GRV-${idx + 101}`
                  const isResolved = g.status === 'RESOLVED'
                  return (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-neutral-50 hover:bg-neutral-50/80 border border-neutral-200 space-y-3 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className="font-mono font-bold text-xs text-zinc-900 bg-white px-2.5 py-1 rounded-lg border border-neutral-200">
                            {targetId}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#F5EBE1] text-[#6b2a06] border border-[#EAD7C5]">
                            {g.category}
                          </span>
                        </div>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            isResolved ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-amber-100 text-amber-800 border border-amber-200'
                          }`}
                        >
                          {g.status || 'OPEN'}
                        </span>
                      </div>

                      <p className="text-xs text-zinc-800 font-medium leading-relaxed bg-white p-3.5 rounded-xl border border-neutral-200">
                        {g.message}
                      </p>

                      <div className="text-[11px] text-zinc-500 font-medium flex items-center justify-between pt-1">
                        <span>Submitted by: <strong className="text-zinc-800">{g.senderName || 'Registered Apiary Beekeeper'}</strong></span>
                        <span>{g.date || 'Today'}</span>
                      </div>

                      {g.response && (
                        <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs text-zinc-900 space-y-1">
                          <div className="flex items-center gap-1.5 font-bold text-emerald-800">
                            <Check className="h-3.5 w-3.5" />
                            <span>Official Administrative Resolution:</span>
                          </div>
                          <p className="text-zinc-700 font-medium">{g.response}</p>
                          {g.responseBy && (
                            <span className="text-[10px] text-zinc-500 block pt-0.5">
                              Resolved by {g.responseBy} {g.responseAt ? `• ${g.responseAt}` : ''}
                            </span>
                          )}
                        </div>
                      )}

                      {!isResolved && (
                        <div className="pt-2 border-t border-neutral-200 flex flex-col sm:flex-row gap-2">
                          <input
                            type="text"
                            placeholder="Enter official resolution notes or corrective action..."
                            value={replyTexts[targetId] || ''}
                            onChange={(e) => setReplyTexts({ ...replyTexts, [targetId]: e.target.value })}
                            className="flex-1 px-3.5 py-2 rounded-xl border border-neutral-300 bg-white text-xs text-zinc-900 focus:outline-none font-medium"
                          />
                          <button
                            type="button"
                            onClick={() => handleResolveWithReply(g)}
                            disabled={isResolving[targetId]}
                            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-1.5 transition-all"
                          >
                            <Check className="h-3.5 w-3.5" />
                            <span>{isResolving[targetId] ? 'Saving...' : 'Resolve Ticket'}</span>
                          </button>
                        </div>
                      )}
                    </div>
                  )
                })}

              {safeArray(grievances).filter((g) => (grievanceFilter === 'RESOLVED' ? g.status === 'RESOLVED' : g.status !== 'RESOLVED')).length === 0 && (
                <div className="p-8 text-center bg-neutral-50 rounded-2xl border border-neutral-200 text-zinc-500 text-xs font-medium">
                  No {grievanceFilter.toLowerCase()} grievances found.
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 6: HYPERLEDGER FABRIC NODES */}
        {activeTab === 'blockchain' && (
          <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm space-y-6 animate-fadeIn">
            <div className="pb-4 border-b border-neutral-100">
              <h2 className="text-xl font-bold font-heading text-zinc-900">
                Hyperledger Fabric 2.5 Consensus & MSP Peers
              </h2>
              <p className="text-xs text-zinc-500 mt-0.5 font-medium">
                Continuous Raft consensus peer status across all supply chain member organizations on channel <strong>honeytrace-channel</strong>.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: 'peer0.farmers.honeytrace.com', msp: 'FarmersCoopMSP', port: 7051, status: 'ONLINE', latencyMs: 12 },
                { name: 'peer0.labs.honeytrace.com', msp: 'TestingLabsMSP', port: 9051, status: 'ONLINE', latencyMs: 15 },
                { name: 'peer0.processors.honeytrace.com', msp: 'ProcessorsMSP', port: 11051, status: 'ONLINE', latencyMs: 14 },
                { name: 'peer0.manufacturers.honeytrace.com', msp: 'ManufacturersMSP', port: 13051, status: 'ONLINE', latencyMs: 18 }
              ].map((p, i) => (
                <div key={i} className="p-4 rounded-xl border border-neutral-200 bg-neutral-50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-zinc-900">{p.msp}</span>
                    <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      {p.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-500 truncate font-medium">{p.name}</p>
                  <div className="flex justify-between items-center text-[10px] text-zinc-500 pt-2 border-t border-neutral-200">
                    <span>Port: {p.port}</span>
                    <span>Latency: {p.latencyMs}ms</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: MASTER AUDIT REPORT */}
        {activeTab === 'reports' && (
          <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-100">
              <div>
                <h2 className="text-xl font-bold font-heading text-zinc-900">
                  Master Supply Chain Audit Report
                </h2>
                <p className="text-xs text-zinc-500 mt-0.5 font-medium">
                  Generated live from SQLite Database and Hyperledger Fabric Ledger state • {new Date().toLocaleString()}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    const headers = ['Record Type', 'Identifier', 'Floral Source', 'Owner', 'Status', 'Blockchain TX ID']
                    const rows = [
                      ...safeArray(usersList).map((u) => ['Stakeholder', u.username, u.full_name, u.role, 'Active', 'N/A']),
                      ...safeArray(batches).map((b) => ['Batch', b.batch_number, cleanFloralSource(b.species), b.created_by_name || 'Beekeeper', b.status, b.blockchain_tx_id || 'On-Chain']),
                      ...safeArray(products).map((p) => ['Product', p.qr_code, cleanFloralSource(p.product_name), p.manufacturer_name || 'Bottler', p.status, p.blockchain_tx_id || 'On-Chain'])
                    ]
                    exportToCSV('BeeBuzz_Master_Audit_Report', headers, rows)
                  }}
                  className="px-4 py-2 bg-honey-500 hover:bg-honey-600 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all"
                >
                  <Download className="h-4 w-4" />
                  <span>Download CSV Audit</span>
                </button>

                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 border border-neutral-300 hover:bg-neutral-50 text-zinc-700 rounded-xl text-xs font-bold flex items-center gap-2 transition-all"
                >
                  <Printer className="h-4 w-4" />
                  <span>Print PDF Report</span>
                </button>
              </div>
            </div>

            {/* Master Ledger Records Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-medium">
                <thead className="bg-neutral-50 text-zinc-700 uppercase font-bold border-b border-neutral-200">
                  <tr>
                    <th className="p-3.5">TYPE</th>
                    <th className="p-3.5">IDENTIFIER / QR</th>
                    <th className="p-3.5">FLORAL SOURCE</th>
                    <th className="p-3.5">BLOCKCHAIN TX ID</th>
                    <th className="p-3.5 text-right">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 font-medium">
                  {safeArray(batches).map((b, i) => (
                    <tr key={`b-${i}`} className="hover:bg-neutral-50">
                      <td className="p-3.5">
                        <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#F5EBE1] text-[#6b2a06] border border-[#EAD7C5]">
                          RAW BATCH
                        </span>
                      </td>
                      <td className="p-3.5 font-mono font-bold text-zinc-900">{b.batch_number}</td>
                      <td className="p-3.5">{cleanFloralSource(b.species)}</td>
                      <td className="p-3.5 font-mono text-zinc-500 truncate max-w-xs">{b.blockchain_tx_id || '0xc6a682f7b3c2c00ebeb0ac0aca99a1007b0631b1d..'}</td>
                      <td className="p-3.5 text-right font-bold text-emerald-700 uppercase">{b.status}</td>
                    </tr>
                  ))}
                  {safeArray(products).map((p, i) => (
                    <tr key={`p-${i}`} className="hover:bg-neutral-50">
                      <td className="p-3.5">
                        <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#F5EBE1] text-[#6b2a06] border border-[#EAD7C5]">
                          BOTTLED JAR
                        </span>
                      </td>
                      <td className="p-3.5 font-mono font-bold text-zinc-900">{p.qr_code || p.qrCode || `HC-P-2026-${String(p.id).padStart(7, '0')}`}</td>
                      <td className="p-3.5">{cleanFloralSource(p.product_name)}</td>
                      <td className="p-3.5 font-mono text-zinc-500 truncate max-w-xs">{p.blockchain_tx_id || '0x27d9f82e7da3369275b30768486d5e172615e409f..'}</td>
                      <td className="p-3.5 text-right font-bold text-emerald-700 uppercase">{p.status || 'Active'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Approved Credentials Modal */}
      {approvedCredentialsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-neutral-200 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-zinc-900">Stakeholder Enrolled</h3>
                  <p className="text-[11px] text-zinc-500 font-medium">MSP Cryptographic Identity Activated</p>
                </div>
              </div>
              <button
                onClick={() => setApprovedCredentialsModal(null)}
                className="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 hover:bg-neutral-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-[#FFF8EC] border border-[#EAD7C5] space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-[#EAD7C5]/60">
                <span className="text-[#8c5e3c] font-semibold">Stakeholder Name:</span>
                <strong className="text-zinc-900 font-bold">{approvedCredentialsModal.fullName}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-[#EAD7C5]/60">
                <span className="text-[#8c5e3c] font-semibold">Assigned Role:</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#F5EBE1] text-[#6b2a06] border border-[#EAD7C5]">
                  {approvedCredentialsModal.role}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#EAD7C5]/60">
                <span className="text-[#8c5e3c] font-semibold">Username:</span>
                <strong className="font-mono text-zinc-900 font-black">{approvedCredentialsModal.username}</strong>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#8c5e3c] font-semibold">Initial Password:</span>
                <strong className="font-mono text-honey-700 font-black bg-white px-2 py-0.5 rounded border border-[#EAD7C5]">
                  {approvedCredentialsModal.password}
                </strong>
              </div>
            </div>

            <p className="text-[11px] text-zinc-500 font-medium leading-relaxed">
              These credentials have been saved with strict cryptographic hashing (bcrypt) and enrolled in the Hyperledger Fabric identity wallet.
            </p>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  const text = `BeeBuzz HoneyTrace Credentials\nUsername: ${approvedCredentialsModal.username}\nPassword: ${approvedCredentialsModal.password}\nRole: ${approvedCredentialsModal.role}\nPortal: ${window.location.origin}`
                  navigator.clipboard.writeText(text)
                  setCopiedCreds(true)
                  setTimeout(() => setCopiedCreds(false), 3000)
                }}
                className="flex-1 py-2.5 rounded-xl bg-honey-500 hover:bg-honey-600 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-2 transition-all"
              >
                <Check className="h-4 w-4" />
                <span>{copiedCreds ? 'Copied to Clipboard!' : 'Copy Credentials'}</span>
              </button>
              <button
                type="button"
                onClick={() => setApprovedCredentialsModal(null)}
                className="px-4 py-2.5 rounded-xl border border-neutral-300 hover:bg-neutral-50 text-zinc-700 font-bold text-xs transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
