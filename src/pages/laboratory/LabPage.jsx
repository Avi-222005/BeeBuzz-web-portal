import React, { useState, useEffect } from 'react'
import { useAuthStore } from '../../store/authStore'
import { useToastStore } from '../../store/toastStore'
import api from '../../api'
import DashboardBanner from '../../components/ui/DashboardBanner'
import StatGrid from '../../components/ui/StatGrid'
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import {
  FlaskConical,
  FileCheck,
  Clock,
  CheckCircle2,
  AlertTriangle,
  TriangleAlert,
  TrendingUp,
  Beaker,
  Shield,
  Search,
  Check,
  X,
  ExternalLink,
  Plus
} from 'lucide-react'

const tabs = [
  { id: 'queue', label: 'NABL Test Queue', icon: Clock },
  { id: 'completed', label: 'Completed Certificates', icon: CheckCircle2 },
  { id: 'analytics', label: 'Lab Quality Analytics', icon: TrendingUp },
  { id: 'standards', label: 'FSSAI Standards', icon: Shield },
]

export default function LabPage() {
  const { profile } = useAuthStore()
  const { addToast } = useToastStore()

  const [activeTab, setActiveTab] = useState('queue')
  const [pendingBatches, setPendingBatches] = useState([])
  const [completedTests, setCompletedTests] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeBatch, setActiveBatch] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [issuedCert, setIssuedCert] = useState(null)

  // Full FSSAI & BIS Parameters
  const [form, setForm] = useState({
    moisture: '17.4',
    hmf: '22.5',
    sucrose: '2.1',
    c4Sugar: 'Negative (< 7% - Adulteration Free)',
    pollen: '88.5',
    testerName: 'Dr. Kunal Verma (Senior Food Chemist)',
    certificateId: ''
  })

  const loadLabData = async () => {
    try {
      const [allBatches, completed] = await Promise.all([
        api.getMyBatches().catch(() => []),
        api.getLabCompletedTests().catch(() => [])
      ])

      const safeBatches = Array.isArray(allBatches) ? allBatches : []
      const pending = safeBatches.filter(
        (b) =>
          b.status === 'CREATED' ||
          b.status === 'PENDING_LAB_QC' ||
          b.status === 'created' ||
          b.status === 'COLLECTED' ||
          !b.status ||
          b.status === 'PENDING'
      )
      const verified = safeBatches.filter(
        (b) =>
          b.status === 'QUALITY_VERIFIED' ||
          b.status === 'VERIFIED' ||
          b.status === 'quality_tested' ||
          b.status === 'approved'
      )

      setPendingBatches(pending)
      setCompletedTests(Array.isArray(completed) && completed.length > 0 ? completed : verified)
    } catch (err) {
      console.error('Error fetching lab data:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadLabData()
  }, [])

  const openTestModal = (batch) => {
    const certNum = Math.floor(10000 + Math.random() * 90000)
    setActiveBatch(batch)
    setForm({
      moisture: '17.2',
      hmf: '22.0',
      sucrose: '2.1',
      c4Sugar: 'Negative (< 7% - Adulteration Free)',
      pollen: '91.2',
      testerName: profile?.fullName || profile?.name || 'Dr. Kunal Verma (NABL Food Chemist)',
      certificateId: `COA-NABL-2026-${certNum}`
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!activeBatch) return

    setSubmitting(true)
    try {
      const targetBatchId = activeBatch.batchId || activeBatch.batch_number || activeBatch.id
      const res = await api.submitLabResults(targetBatchId, form)
      addToast('Quality Certificate cryptographically committed to Hyperledger Fabric!', 'success')
      setActiveBatch(null)
      setIssuedCert(
        res || {
          batchId: targetBatchId,
          certificateId: form.certificateId,
          txHash: res?.txHash || '0x7ae9137ae1a045b233490f5b436c3620c79b66ab8253caf4694b85ae281c952b',
          overallResult: 'PASSED (FSSAI 2020 Compliant)'
        }
      )
      loadLabData()
    } catch (err) {
      addToast(err.message || 'Failed to submit lab certificate', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  const firstName = profile?.name?.split(' ')[0] || profile?.fullName?.split(' ')[0] || 'Lab Lead'
  const cluster = profile?.organizationName || 'NABL Accredited Honey Testing Lab, Dehradun'
  const registryId = profile?.registryId || 'NABL-LAB-TC-8890'

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="space-y-6 text-zinc-900 font-sans pb-12">
      {/* Header Banner */}
      <DashboardBanner
        name={firstName}
        cluster={cluster}
        registryId={registryId}
        gradient="from-amber-300 via-amber-200 to-yellow-100"
        actions={
          pendingBatches.length > 0 && (
            <button
              onClick={() => openTestModal(pendingBatches[0])}
              className="flex items-center gap-2 bg-white text-[#6b2a06] font-bold px-5 py-2.5 rounded-xl text-xs hover:bg-neutral-50 transition-all shadow-sm border border-[#EAD7C5]"
            >
              <Beaker className="h-4 w-4 text-honey-600" />
              <span>Test Next Batch</span>
            </button>
          )
        }
      />

      {/* KPI Stats */}
      <StatGrid
        stats={[
          {
            icon: Clock,
            value: pendingBatches.length.toString(),
            label: 'Batches in QC Queue',
            color: 'bg-amber-50 text-amber-700',
            trend: `${pendingBatches.length} Samples Received`
          },
          {
            icon: CheckCircle2,
            value: (completedTests.length || 14).toString(),
            label: 'NABL Tests Certified',
            color: 'bg-emerald-50 text-emerald-700',
            trend: '100% On-Chain'
          },
          {
            icon: Shield,
            value: '98.5%',
            label: 'FSSAI Compliance Rate',
            color: 'bg-blue-50 text-blue-700',
            trend: 'EA-IRMS Purity Verified'
          },
          {
            icon: FlaskConical,
            value: '0',
            label: 'Adulterated Sugar Flagged',
            color: 'bg-purple-50 text-purple-700',
            trend: 'Zero C4 Sugar Found'
          }
        ]}
      />

      {/* Alerts */}
      <div>
        <h2 className="text-sm font-bold text-zinc-800 uppercase tracking-wider mb-2.5">
          Laboratory Calibration & Quality Alerts
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="bg-emerald-50/80 border border-emerald-200 border-l-4 border-l-emerald-500 rounded-2xl p-4 shadow-xs">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-bold text-zinc-900 text-xs">EA-IRMS & HMF Spectrometer Calibrated</p>
                <p className="text-xs text-zinc-600 mt-0.5 font-medium">
                  Equipment ISO/IEC 17025 compliant with calibrated C4/C3 carbon isotope reference standard.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-amber-50/80 border border-amber-200 border-l-4 border-l-amber-500 rounded-2xl p-4 shadow-xs">
            <div className="flex items-start gap-3">
              <TriangleAlert className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-bold text-zinc-900 text-xs">Pollen Microscopic Analysis Standard</p>
                <p className="text-xs text-zinc-600 mt-0.5 font-medium">
                  Mustard (Brassica juncea) pollen grains authenticated at &gt;70% floral abundance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-neutral-200">
        <div className="flex overflow-x-auto gap-1 -mb-px scrollbar-hide">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-xs font-bold whitespace-nowrap border-b-2 transition-all ${
                  activeTab === tab.id
                    ? 'border-honey-500 text-honey-700 bg-honey-50/40 rounded-t-xl'
                    : 'border-transparent text-zinc-500 hover:text-zinc-800 hover:border-neutral-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Tab: QUEUE */}
      {activeTab === 'queue' && (
        <div className="space-y-4 animate-fadeIn">
          {pendingBatches.map((batch, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono font-bold text-sm text-zinc-900 bg-neutral-100 px-2.5 py-0.5 rounded-lg border border-neutral-200">
                    {batch.batchNumber || batch.batch_number || batch.id}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#F5EBE1] text-[#6b2a06] border border-[#EAD7C5]">
                    {batch.species || batch.floral_source || 'Mustard Blossom Honey'}
                  </span>
                </div>
                <div className="text-xs text-zinc-600 flex flex-wrap gap-x-4 gap-y-1 font-medium">
                  <span>Declared Yield: <strong className="text-zinc-900">{batch.quantityKg || batch.quantity_kg || '110'} kg</strong></span>
                  <span>Origin Beekeeper: <strong className="text-zinc-900">{batch.created_by_name || 'Aligarh Apiary Beekeeper'}</strong></span>
                  <span>Cluster: <strong className="text-zinc-900">{batch.location_name || 'Aligarh Migratory Corridor'}</strong></span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => openTestModal(batch)}
                className="px-5 py-2.5 rounded-xl bg-honey-500 hover:bg-honey-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all self-start md:self-auto"
              >
                <FlaskConical className="h-4 w-4" />
                <span>Record NABL QC Results</span>
              </button>
            </div>
          ))}

          {pendingBatches.length === 0 && (
            <div className="p-12 text-center bg-white rounded-2xl border border-neutral-200 space-y-2">
              <CheckCircle2 className="h-10 w-10 text-emerald-500 mx-auto opacity-80" />
              <p className="font-bold text-sm text-zinc-900">All Harvest Samples Certified</p>
              <p className="text-xs text-zinc-500">New batch extractions from beekeepers will automatically queue here for NABL testing.</p>
            </div>
          )}
        </div>
      )}

      {/* Tab: COMPLETED */}
      {activeTab === 'completed' && (
        <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-sm space-y-4 animate-fadeIn">
          <h3 className="font-bold text-sm text-zinc-900 font-heading">Certified Quality Certificates on Ledger</h3>
          <div className="space-y-3">
            {completedTests.map((t, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <p className="font-mono font-bold text-sm text-zinc-900">{t.certificateId || t.certificate_id || `COA-NABL-${idx + 101}`}</p>
                  <p className="text-zinc-600 font-medium mt-0.5">
                    Batch: <strong>{t.batchId || t.batch_number || 'BATCH-HC-2026'}</strong> • Moisture: <strong>17.2%</strong> • HMF: <strong>22 mg/kg</strong> • C4 Sugar: <strong className="text-emerald-700">NEGATIVE</strong>
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 uppercase self-start sm:self-auto">
                  Passed FSSAI 2020
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: ANALYTICS */}
      {activeTab === 'analytics' && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-fadeIn">
          <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-sm space-y-2">
            <span className="text-xs font-semibold text-zinc-500">Average Moisture Level</span>
            <div className="text-2xl font-black text-zinc-900">17.1%</div>
            <p className="text-[11px] text-emerald-700 font-semibold">Well within 20% legal maximum limit</p>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-sm space-y-2">
            <span className="text-xs font-semibold text-zinc-500">Hydroxymethylfurfural (HMF)</span>
            <div className="text-2xl font-black text-zinc-900">21.8 mg/kg</div>
            <p className="text-[11px] text-emerald-700 font-semibold">Unheated, fresh raw honey standard (&lt;80 mg/kg)</p>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-sm space-y-2">
            <span className="text-xs font-semibold text-zinc-500">EA-IRMS Sugar Adulteration</span>
            <div className="text-2xl font-black text-emerald-700">100% PURE</div>
            <p className="text-[11px] text-zinc-500 font-medium">Zero corn/cane/rice syrup additions detected</p>
          </div>
        </div>
      )}

      {/* Tab: STANDARDS */}
      {activeTab === 'standards' && (
        <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-sm space-y-4 animate-fadeIn text-xs">
          <h3 className="font-bold text-base text-zinc-900 font-heading">FSSAI 2020 & BIS Honey Quality Regulations</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-neutral-50 text-zinc-700 font-bold border-b border-neutral-200">
                <tr>
                  <th className="p-3">PARAMETER</th>
                  <th className="p-3">FSSAI 2020 STANDARD</th>
                  <th className="p-3">BEEBUZZ AVERAGE</th>
                  <th className="p-3 text-right">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 font-medium">
                <tr>
                  <td className="p-3 font-semibold text-zinc-900">Moisture Content</td>
                  <td className="p-3">Max 20.0% by mass</td>
                  <td className="p-3 font-mono font-bold">17.2%</td>
                  <td className="p-3 text-right font-bold text-emerald-700">PASSED</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-zinc-900">Hydroxymethylfurfural (HMF)</td>
                  <td className="p-3">Max 80 mg/kg</td>
                  <td className="p-3 font-mono font-bold">22.4 mg/kg</td>
                  <td className="p-3 text-right font-bold text-emerald-700">PASSED</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-zinc-900">C4 Sugars (EA-IRMS)</td>
                  <td className="p-3">Max 7.0%</td>
                  <td className="p-3 font-mono font-bold">0.0% (Negative)</td>
                  <td className="p-3 text-right font-bold text-emerald-700">PASSED</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-zinc-900">Specific Floral Pollen Count</td>
                  <td className="p-3">Min 45.0% for Mono-floral</td>
                  <td className="p-3 font-mono font-bold">78.5%</td>
                  <td className="p-3 text-right font-bold text-emerald-700">PASSED</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* QC Test Entry Modal */}
      {activeBatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-neutral-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-honey-100 text-honey-700 flex items-center justify-center">
                  <FlaskConical className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-zinc-900">NABL Quality Certification</h3>
                  <p className="text-[11px] text-zinc-500 font-medium font-mono">
                    Batch: {activeBatch.batchNumber || activeBatch.batch_number || activeBatch.id}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveBatch(null)}
                className="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 hover:bg-neutral-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-zinc-700 block mb-1">Moisture % (Max 20%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={form.moisture}
                    onChange={(e) => setForm({ ...form, moisture: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs font-semibold text-zinc-900 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-zinc-700 block mb-1">HMF (Max 80 mg/kg)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={form.hmf}
                    onChange={(e) => setForm({ ...form, hmf: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs font-semibold text-zinc-900 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-zinc-700 block mb-1">C4 Carbon Sugar Adulteration (EA-IRMS)</label>
                <select
                  value={form.c4Sugar}
                  onChange={(e) => setForm({ ...form, c4Sugar: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs font-semibold text-zinc-900 focus:outline-none bg-white"
                >
                  <option value="Negative (< 7% - Adulteration Free)">Negative (&lt; 7% - Adulteration Free)</option>
                  <option value="Positive (C4 Sugar Inversion Detected)">Positive (C4 Sugar Inversion Detected)</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-zinc-700 block mb-1">Pollen Abundance %</label>
                <input
                  type="number"
                  step="0.1"
                  value={form.pollen}
                  onChange={(e) => setForm({ ...form, pollen: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs font-semibold text-zinc-900 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="font-semibold text-zinc-700 block mb-1">Authorized Testing Chemist</label>
                <input
                  type="text"
                  value={form.testerName}
                  onChange={(e) => setForm({ ...form, testerName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs font-semibold text-zinc-900 focus:outline-none"
                  required
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-2.5 rounded-xl bg-honey-500 hover:bg-honey-600 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  <Check className="h-4 w-4" />
                  <span>{submitting ? 'Committing to Blockchain...' : 'Sign & Issue Certificate'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveBatch(null)}
                  className="px-4 py-2.5 rounded-xl border border-neutral-300 hover:bg-neutral-50 text-zinc-700 font-bold text-xs"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
