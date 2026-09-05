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
  CheckCircle2,
  Sparkles,
  ArrowRight
} from 'lucide-react'

const roleOptions = [
  { id: 'beekeeper', label: 'Beekeeper (Farmer)', icon: User, desc: 'Digital Apiary Passport, hive telemetry & harvest logging' },
  { id: 'lab', label: 'Testing Laboratory', icon: FlaskConical, desc: 'FSSAI & BIS parameters testing, EA-IRMS & certification' },
  { id: 'manufacturer', label: 'Honey Manufacturer', icon: Factory, desc: 'Batch intake, cleanroom bottling & serialized QR minting' },
  { id: 'admin', label: 'KVIC Admin (Regulator)', icon: Shield, desc: 'Honey Mission cluster oversight & fraud detection' },
  { id: 'consumer', label: 'Consumer', icon: ShoppingBag, desc: 'Scan honey jars and verify complete blockchain provenance' },
]

const indianStates = [
  'Punjab', 'Haryana', 'Uttar Pradesh', 'Rajasthan', 'Bihar',
  'West Bengal', 'Jammu & Kashmir', 'Himachal Pradesh', 'Maharashtra',
  'Madhya Pradesh', 'Gujarat', 'Uttarakhand', 'Karnataka', 'Tamil Nadu'
]

export default function SignupPage() {
  const navigate = useNavigate()
  const { login } = useAuthStore()
  const { addToast } = useToastStore()

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'beekeeper',
    state: 'Uttar Pradesh',
    organization: '',
    aadhaar: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSignup = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.password) return

    setLoading(true)
    try {
      const res = await api.signup({
        name: form.name,
        email: form.email,
        phone: form.phone || '9876543210',
        role: form.role,
        organizationName: form.organization || `${form.role.toUpperCase()} Unit`,
        state: form.state,
        district: 'Aligarh',
        aadharNumber: form.aadhaar || '5421-9980-1234'
      })

      addToast(res?.message || 'Registration submitted! Awaiting Admin verification.', 'success')
      navigate('/login')
    } catch (err) {
      console.error(err)
      addToast('Failed to submit registration request', 'error')
    } finally {
      setLoading(false)
    }
  }

  const prefillDemo = (selectedRole) => {
    const demos = {
      beekeeper: { name: 'Ramesh Patil', email: 'ramesh.patil@beebuzz.in', phone: '9823144521', role: 'beekeeper', state: 'Maharashtra', organization: 'KVIC Honey Mission Apiary #042' },
      lab: { name: 'Dr. Meena Iyer', email: 'meena.iyer@anandlab.in', phone: '9712055182', role: 'lab', state: 'Gujarat', organization: 'National Bee Board Certified Lab, Anand' },
      manufacturer: { name: 'Sunil Mehta', email: 'sunil.mehta@purehoney.in', phone: '9845012345', role: 'manufacturer', state: 'Maharashtra', organization: 'KVIC Honey Processing Facility #07, Mumbai' },
      admin: { name: 'Vikramjit Singh', email: 'director.kvic@gov.in', phone: '9906022345', role: 'admin', state: 'Punjab', organization: 'Khadi & Village Industries Commission, Central HQ' },
      consumer: { name: 'Ananya Sharma', email: 'ananya@consumer.in', phone: '9876543210', role: 'consumer', state: 'Delhi', organization: 'Consumer' }
    }
    setForm({ ...form, ...demos[selectedRole], password: 'password123' })
  }

  return (
    <div className="min-h-screen bg-honey-50 flex items-center justify-center p-4 py-12 text-[#6b2a06]">
      <div className="w-full max-w-xl">
        {/* Logo and Brand */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-3">
            <Logo size="lg" />
          </Link>
          <h2 className="text-2xl font-black font-heading text-[#6b2a06]">Create Your BeeBuzz Account</h2>
          <p className="text-xs text-[#8c5e3c] mt-1">Join India's National Blockchain Honey Traceability Network</p>
        </div>

        {/* Demo Prefills */}
        <div className="card p-3 mb-6 bg-white border border-[#EAD7C5] shadow-sm">
          <span className="text-[10px] font-bold text-[#8c5e3c] uppercase block mb-1.5 text-center">Quick Demo Prefill by Stakeholder Role:</span>
          <div className="flex flex-wrap gap-1.5 justify-center">
            {roleOptions.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => prefillDemo(r.id)}
                className={`px-2.5 py-1 text-[11px] font-bold rounded-lg border transition-all ${
                  form.role === r.id ? 'bg-[#6b2a06] text-white border-[#6b2a06]' : 'border-[#EAD7C5] text-[#6b2a06] hover:bg-honey-100'
                }`}
              >
                {r.label.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className="card p-6 sm:p-8 bg-white border border-[#EAD7C5] shadow-card">
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="section-label mb-2 block">Choose Your Stakeholder Role *</label>
              <div className="grid sm:grid-cols-2 gap-2">
                {roleOptions.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setForm({ ...form, role: r.id })}
                    className={`flex items-start gap-2.5 p-2.5 rounded-xl border-2 text-left transition-all ${
                      form.role === r.id ? 'border-honey-500 bg-[#FFF8EC] text-[#6b2a06]' : 'border-[#EAD7C5] hover:border-honey-400'
                    }`}
                  >
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      form.role === r.id ? 'bg-honey-500 text-white' : 'bg-honey-100 text-[#6b2a06]'
                    }`}>
                      <r.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold">{r.label}</p>
                      <p className="text-[10px] text-[#8c5e3c] leading-tight mt-0.5">{r.desc.slice(0, 45)}...</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="section-label mb-1 block">Full Name *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Ramesh Patil"
                  className="input text-sm"
                />
              </div>
              <div>
                <label className="section-label mb-1 block">Email Address *</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="e.g. ramesh@apiary.in"
                  className="input text-sm"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="section-label mb-1 block">Mobile Number (10 digits) *</label>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="9823144521"
                  className="input text-sm font-mono"
                />
              </div>
              <div>
                <label className="section-label mb-1 block">Operating State *</label>
                <select
                  value={form.state}
                  onChange={(e) => setForm({ ...form, state: e.target.value })}
                  className="input text-sm"
                >
                  {indianStates.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="section-label mb-1 block">Organization / Apiary Name</label>
                <input
                  type="text"
                  value={form.organization}
                  onChange={(e) => setForm({ ...form, organization: e.target.value })}
                  placeholder="e.g. KVIC Apiary Unit"
                  className="input text-sm"
                />
              </div>
              <div>
                <label className="section-label mb-1 block">Password *</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    placeholder="Min 6 characters"
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
            </div>

            <button
              type="submit"
              disabled={loading || !form.name || !form.email}
              className="btn-primary w-full py-3.5 text-sm font-bold shadow-md flex items-center justify-center gap-2 mt-4"
            >
              <span>{loading ? 'Registering...' : 'Complete Registration'}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-[#8c5e3c] mt-6">
          Already registered?{' '}
          <Link to="/login" className="text-honey-600 hover:text-honey-700 font-bold underline">
            Sign In to Your Portal
          </Link>
        </p>
      </div>
    </div>
  )
}
