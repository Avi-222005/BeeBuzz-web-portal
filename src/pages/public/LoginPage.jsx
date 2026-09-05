import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { useToastStore } from '../../store/toastStore'
import Logo from '../../components/layout/Logo'
import {
  User,
  Shield,
  FlaskConical,
  Factory,
  ShoppingBag,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react'

const roles = [
  {
    id: 'beekeeper',
    label: 'Beekeeper (Farmer)',
    icon: User,
    desc: 'Register harvest batches, view IoT hive telemetry & passports',
    demoUser: { name: 'Ramesh Patil', email: 'ramesh.patil@beebuzz.in', role: 'beekeeper', cluster: 'Aligarh-Bharatpur Migratory Belt' }
  },
  {
    id: 'lab',
    label: 'Testing Laboratory',
    icon: FlaskConical,
    desc: 'Inspect raw honey batches, verify FSSAI parameters & issue certificates',
    demoUser: { name: 'Dr. Meena Iyer', email: 'meena.iyer@anandlab.in', role: 'lab', cluster: 'National Bee Board Laboratory, Anand' }
  },
  {
    id: 'manufacturer',
    label: 'Honey Manufacturer',
    icon: Factory,
    desc: 'Intake certified batches, package jars & mint serialized QR codes',
    demoUser: { name: 'Sunil Mehta', email: 'sunil.mehta@purehoney.in', role: 'manufacturer', cluster: 'KVIC Processing Facility #07, Mumbai' }
  },
  {
    id: 'admin',
    label: 'KVIC Admin (Regulator)',
    icon: Shield,
    desc: 'National Honey Mission cluster oversight, fraud alerts & user approvals',
    demoUser: { name: 'Vikramjit Singh', email: 'director.kvic@gov.in', role: 'admin', cluster: 'Khadi & Village Industries Commission HQ' }
  },
  {
    id: 'consumer',
    label: 'Consumer Verification',
    icon: ShoppingBag,
    desc: 'Scan QR codes & verify immutable blockchain authenticity',
    demoUser: { name: 'Ananya Sharma', email: 'ananya@consumer.in', role: 'consumer', cluster: 'Consumer' }
  }
]

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuthStore()
  const { addToast } = useToastStore()

  const [selectedRole, setSelectedRole] = useState('beekeeper')
  const [email, setEmail] = useState('ramesh.patil@beebuzz.in')
  const [password, setPassword] = useState('password123')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId)
    const roleObj = roles.find((r) => r.id === roleId)
    if (roleObj) {
      setEmail(roleObj.demoUser.email)
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const usernameInput = email.includes('@') ? email.split('@')[0] : email
      const result = await api.login(usernameInput || selectedRole, password || 'admin123', selectedRole)

      login(
        result.token,
        result.profile,
        result.profile.role
      )

      addToast(`Signed in as ${result.profile.name} (${result.profile.role})`, 'success')

      const role = result.profile.role
      if (role === 'beekeeper' || role === 'farmer') navigate('/beekeeper')
      else if (role === 'lab') navigate('/lab')
      else if (role === 'manufacturer') navigate('/manufacturer')
      else if (role === 'admin') navigate('/admin')
      else navigate('/scan')
    } catch (err) {
      console.error(err)
      addToast(err.message || 'Login failed. Please check credentials.', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-honey-50 flex items-center justify-center p-4 py-12 text-[#6b2a06]">
      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-3">
            <Logo size="lg" />
          </Link>
          <h2 className="text-2xl font-black font-heading text-[#6b2a06]">Welcome Back to BeeBuzz</h2>
          <p className="text-xs text-[#8c5e3c] mt-1">Select your stakeholder portal to sign in</p>
        </div>

        {/* Login Card */}
        <div className="card p-6 sm:p-8 bg-white border border-[#EAD7C5] shadow-card space-y-6">
          {/* Role Selector Tabs */}
          <div>
            <label className="section-label mb-2 block">Choose Portal Role</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
              {roles.slice(0, 4).map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => handleRoleSelect(r.id)}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition-all flex flex-col items-center gap-1 ${
                    selectedRole === r.id
                      ? 'border-honey-500 bg-[#FFF8EC] text-[#6b2a06] shadow-sm'
                      : 'border-[#EAD7C5] text-[#8c5e3c] hover:bg-honey-50'
                  }`}
                >
                  <r.icon className="h-4 w-4" />
                  <span className="text-[11px] leading-tight text-center">{r.label.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="section-label mb-1 block">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input text-sm"
              />
            </div>

            <div>
              <label className="section-label mb-1 block">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input text-sm pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8c5e3c]"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="p-3 bg-[#FFF8EC] rounded-xl border border-[#EAD7C5] text-xs text-[#8c5e3c] flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-honey-600 flex-shrink-0" />
              <span>Demo credentials loaded. Click Sign In to enter directly.</span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3.5 text-sm font-bold shadow-md flex items-center justify-center gap-2"
            >
              <span>{loading ? 'Authenticating...' : `Enter ${roles.find(r => r.id === selectedRole)?.label.split(' ')[0]} Portal`}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-[#8c5e3c] mt-6">
          New stakeholder?{' '}
          <Link to="/signup" className="text-honey-600 hover:text-honey-700 font-bold underline">
            Register New Account
          </Link>
        </p>
      </div>
    </div>
  )
}
