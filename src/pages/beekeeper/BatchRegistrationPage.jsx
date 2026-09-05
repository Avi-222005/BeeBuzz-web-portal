import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api'
import { useToastStore } from '../../store/toastStore'
import { useHoneyStore } from '../../store/honeyStore'
import { useAuthStore } from '../../store/authStore'
import StepWizard from '../../components/ui/StepWizard'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import ProofBox from '../../components/ui/ProofBox'
import { Check, Copy, Printer, Download, Sparkles, MapPin, QrCode } from 'lucide-react'

const floralTypes = [
  'Mustard Blossom Raw Honey',
  'Eucalyptus Raw Forest Honey',
  'Muzaffarpur Golden Lychee Honey',
  'Sundarbans Wild Forest Raw Honey',
  'Kashmir White Acacia Honey'
]

export default function BatchRegistrationPage() {
  const navigate = useNavigate()
  const { addToast } = useToastStore()
  const { addHarvestBatch } = useHoneyStore()
  const { profile } = useAuthStore()

  const [step, setStep] = useState(0)
  const [hives, setHives] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [gpsLocation, setGpsLocation] = useState({
    latitude: 27.8974,
    longitude: 78.0880,
    status: 'detecting'
  })

  const [form, setForm] = useState({
    hiveIds: [],
    harvestDate: new Date().toISOString().split('T')[0],
    floralSource: 'Mustard Blossom Raw Honey',
    quantityKg: '110',
    moistureEst: '17.5',
    cluster: 'Aligarh-Bharatpur Migratory Belt',
    notes: 'Winter mustard harvest from 10 Langstroth frames. High nectar flow.'
  })
  const [result, setResult] = useState(null)

  useEffect(() => {
    api.getHives().then((h) => {
      setHives(h)
      setLoading(false)
    })

    // Automatic Browser GPS Geolocation
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setGpsLocation({
            latitude: parseFloat(pos.coords.latitude.toFixed(6)),
            longitude: parseFloat(pos.coords.longitude.toFixed(6)),
            status: 'locked'
          })
        },
        (err) => {
          console.warn('GPS detection fallback to registered apiary:', err.message)
          setGpsLocation({
            latitude: 27.8974,
            longitude: 78.0880,
            status: 'fallback'
          })
        },
        { timeout: 8000, enableHighAccuracy: true }
      )
    } else {
      setGpsLocation({
        latitude: 27.8974,
        longitude: 78.0880,
        status: 'fallback'
      })
    }
  }, [])

  const toggleHive = (id) => {
    setForm((prev) => ({
      ...prev,
      hiveIds: prev.hiveIds.includes(id) ? prev.hiveIds.filter((h) => h !== id) : [...prev.hiveIds, id],
    }))
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    try {
      const selectedHives = form.hiveIds.length > 0 ? form.hiveIds : (hives.length > 0 ? [hives[0].id || hives[0].hive_id] : ['HC-HV-001'])
      const response = await api.createBatch({
        hiveIds: selectedHives,
        quantityKg: form.quantityKg,
        floralSource: form.floralSource,
        honeyType: form.floralSource,
        locationName: form.cluster,
        latitude: gpsLocation.latitude,
        longitude: gpsLocation.longitude,
        evidenceFile: { name: 'harvest_field_inspection.pdf' },
        notes: form.notes
      })

      setResult({
        batchId: response.batchId,
        txHash: response.txHash,
        blockNumber: response.blockNumber,
        network: response.network || 'Hyperledger Fabric (honeytrace-channel)',
        timestamp: response.timestamp,
        qrCodeUrl: response.qrCodeUrl,
        verifyUrl: response.verifyUrl
      })

      setStep(2)
      addToast('Raw honey harvest registered & verified on blockchain ledger!')
    } catch (err) {
      console.error(err)
      addToast('Failed to register batch on blockchain', 'error')
    }
    setSubmitting(false)
  }

  if (loading) return <div className="page-container"><LoadingSpinner className="py-20" /></div>

  return (
    <div className="max-w-2xl mx-auto space-y-6 text-[#6b2a06]">
      <div className="border-b border-[#EAD7C5] pb-4">
        <h1 className="text-2xl font-bold font-heading text-[#6b2a06]">Register Raw Honey Harvest</h1>
        <p className="text-xs text-[#8c5e3c]">Create an immutable cryptographic provenance record for your apiary extraction.</p>
      </div>

      <StepWizard steps={['Extraction Details', 'Review & Commit', 'Success']} currentStep={step} />

      {/* Step 0: Harvest Details */}
      {step === 0 && (
        <Card>
          <h3 className="font-bold text-[#6b2a06] font-heading mb-4">Step 1: Harvest & Apiary Information</h3>

          <div className="mb-4">
            <label className="section-label mb-2 block text-[#8c5e3c]">Select Extracted Langstroth Hives</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {hives.map((h) => (
                <button
                  key={h.id}
                  type="button"
                  onClick={() => toggleHive(h.id)}
                  className={`p-3 rounded-card border-2 text-sm text-left transition-all ${
                    form.hiveIds.includes(h.id) ? 'border-honey-500 bg-honey-100 text-[#6b2a06]' : 'border-[#EAD7C5] hover:border-honey-400 bg-white'
                  }`}
                >
                  <span className="font-semibold block">{h.name}</span>
                  <span className="block text-xs text-[#8c5e3c]">{h.id}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="section-label mb-1 block text-[#8c5e3c]">Harvest Date</label>
              <input type="date" value={form.harvestDate} onChange={(e) => setForm({ ...form, harvestDate: e.target.value })} className="input text-sm" />
            </div>
            <div>
              <label className="section-label mb-1 block text-[#8c5e3c]">Floral Source</label>
              <select value={form.floralSource} onChange={(e) => setForm({ ...form, floralSource: e.target.value })} className="input text-sm">
                {floralTypes.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="section-label mb-1 block text-[#8c5e3c]">Total Yield (kg)</label>
              <input type="number" step="0.5" value={form.quantityKg} onChange={(e) => setForm({ ...form, quantityKg: e.target.value })} className="input text-sm" placeholder="110" />
            </div>
            <div>
              <label className="section-label mb-1 block text-[#8c5e3c]">Refractometer Moisture %</label>
              <input type="number" step="0.1" value={form.moistureEst} onChange={(e) => setForm({ ...form, moistureEst: e.target.value })} className="input text-sm" placeholder="17.5" />
            </div>
          </div>

          <div className="mb-4 p-3 rounded-xl bg-[#FFF8EC] border border-[#EAD7C5] flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs">
              <MapPin className="h-4 w-4 text-honey-600 flex-shrink-0" />
              <div>
                <span className="font-bold text-[#6b2a06] block">GPS Apiary Geofence (Auto-Captured)</span>
                <span className="font-mono text-[#8c5e3c] text-[11px]">
                  {gpsLocation.latitude}° N, {gpsLocation.longitude}° E
                </span>
              </div>
            </div>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
              gpsLocation.status === 'locked' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
            }`}>
              {gpsLocation.status === 'locked' ? '🛰️ GPS LOCKED' : '📍 REGISTERED APIARY'}
            </span>
          </div>

          <div className="mb-4">
            <label className="section-label mb-1 block text-[#8c5e3c]">Field Notes & Observation</label>
            <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="input text-sm" rows={2} />
          </div>

          <button
            onClick={() => setStep(1)}
            disabled={!form.quantityKg}
            className="btn-primary w-full py-3.5 text-sm font-bold shadow-md disabled:opacity-50"
          >
            Continue to Review
          </button>
        </Card>
      )}

      {/* Step 1: Review */}
      {step === 1 && (
        <Card>
          <h3 className="font-bold text-[#6b2a06] font-heading mb-4">Step 2: Review Extraction Payload</h3>
          <div className="space-y-3 mb-6 bg-[#FFF8EC] p-4 rounded-xl border border-[#EAD7C5] text-sm">
            <div className="flex justify-between py-1.5 border-b border-[#EAD7C5]">
              <span className="text-[#8c5e3c]">Extracted Hives:</span>
              <span className="font-semibold">{form.hiveIds.length > 0 ? form.hiveIds.join(', ') : 'All Active Apiary Boxes'}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-[#EAD7C5]">
              <span className="text-[#8c5e3c]">Extraction Date:</span>
              <span className="font-semibold">{form.harvestDate}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-[#EAD7C5]">
              <span className="text-[#8c5e3c]">Botanical Flora:</span>
              <span className="font-semibold text-honey-700">{form.floralSource}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-[#EAD7C5]">
              <span className="text-[#8c5e3c]">Declared Net Weight:</span>
              <span className="font-semibold text-honey-700">{form.quantityKg} kg</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-[#8c5e3c]">Estimated Moisture:</span>
              <span className="font-semibold">{form.moistureEst || '17.5'}%</span>
            </div>
          </div>

          {submitting ? (
            <div className="text-center py-8">
              <LoadingSpinner className="mb-4" />
              <p className="text-sm text-[#8c5e3c]">Signing digital signature & committing harvest batch...</p>
            </div>
          ) : (
            <div className="flex gap-3">
              <button onClick={() => setStep(0)} className="btn-secondary flex-1 py-3 text-sm">
                Back
              </button>
              <button onClick={handleSubmit} className="btn-primary flex-1 py-3 text-sm shadow-md">
                Register & Commit to Ledger
              </button>
            </div>
          )}
        </Card>
      )}

      {/* Step 2: Success */}
      {step === 2 && result && (
        <Card>
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4 text-green-600">
              <Check className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-black text-[#6b2a06] font-heading">Harvest Batch Registered!</h3>
            <p className="text-xs text-[#8c5e3c] mt-1">Batch is queued for accredited food laboratory QC testing.</p>
          </div>

          <div className="text-center mb-6">
            <p className="section-label mb-1">Assigned Batch Serial</p>
            <p className="text-2xl font-mono font-black text-honey-600">{result.batchId}</p>
          </div>

          <div className="flex justify-center mb-6">
            <div className="bg-[#FFF8EC] p-4 rounded-2xl border border-[#EAD7C5] shadow-sm text-center">
              <img src={result.qrCodeUrl} alt="Batch QR Code" className="w-48 h-48 mx-auto rounded-lg border border-white" />
              <span className="text-[10px] font-mono text-[#8c5e3c] block mt-2">Scan to track raw batch</span>
            </div>
          </div>

          <div className="flex gap-3 mb-6">
            <a href={result.qrCodeUrl} download={`Batch-${result.batchId}.png`} className="btn-secondary flex-1 flex items-center justify-center gap-2 text-xs">
              <Download className="h-4 w-4" /> Download QR
            </a>
            <button onClick={() => window.print()} className="btn-secondary flex-1 flex items-center justify-center gap-2 text-xs">
              <Printer className="h-4 w-4" /> Print Apiary Tag
            </button>
          </div>

          <ProofBox txHash={result.txHash} blockNumber={result.blockNumber} network={result.network} timestamp={result.timestamp} />

          <div className="flex gap-3 mt-6">
            <button
              onClick={() => {
                setStep(0)
                setResult(null)
              }}
              className="btn-secondary flex-1 py-3 text-sm"
            >
              Register Another Batch
            </button>
            <button onClick={() => navigate('/beekeeper')} className="btn-primary flex-1 py-3 text-sm shadow-md">
              Go to Dashboard
            </button>
          </div>
        </Card>
      )}
    </div>
  )
}
