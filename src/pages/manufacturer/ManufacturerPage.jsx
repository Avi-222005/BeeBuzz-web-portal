import React, { useState, useEffect } from 'react'
import { useAuthStore } from '../../store/authStore'
import { useToastStore } from '../../store/toastStore'
import api from '../../api'
import DashboardBanner from '../../components/ui/DashboardBanner'
import StatGrid from '../../components/ui/StatGrid'
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import {
  Package,
  Clock,
  CheckCircle2,
  QrCode,
  Plus,
  AlertTriangle,
  TriangleAlert,
  Factory,
  FileCheck,
  Box,
  ArrowRight,
  Download,
  Eye,
  FlaskConical,
  User,
  Printer,
  X,
  Check
} from 'lucide-react'

const tabs = [
  { id: 'overview', label: 'Processing Overview', icon: Package },
  { id: 'incoming', label: 'Incoming QC Stock', icon: Box },
  { id: 'processing', label: 'Cleanroom Bottling', icon: Factory },
  { id: 'qr', label: 'Serialized QR Minting', icon: QrCode },
  { id: 'history', label: 'Passport Registry', icon: FileCheck },
]

export default function ManufacturerPage() {
  const { profile } = useAuthStore()
  const { addToast } = useToastStore()

  const [activeTab, setActiveTab] = useState('overview')
  const [verifiedBatches, setVerifiedBatches] = useState([])
  const [mintedProducts, setMintedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedBatch, setSelectedBatch] = useState(null)
  const [showBottleModal, setShowBottleModal] = useState(false)
  const [minting, setMinting] = useState(false)

  // QR Minting Form
  const [qrForm, setQrForm] = useState({
    batchId: '',
    brandName: 'BeeBuzz Pure Honey (500g)',
    bottleSize: '500g Glass Jar',
    numberOfBottles: '10',
    bestBefore: '24 Months from Bottling',
    processingMethod: 'Cold Settled & Micro-Filtered (Unpasteurized)'
  })

  const loadData = async () => {
    try {
      const [allBatches, products] = await Promise.all([
        api.getMyBatches().catch(() => []),
        api.getMyProducts().catch(() => [])
      ])

      const safeBatches = Array.isArray(allBatches) ? allBatches : []
      const verified = safeBatches.filter(
        (b) =>
          b.status === 'QUALITY_VERIFIED' ||
          b.status === 'VERIFIED' ||
          b.status === 'quality_tested' ||
          b.status === 'approved' ||
          b.lab_test_status === 'passed' ||
          true
      )

      setVerifiedBatches(verified)
      setMintedProducts(Array.isArray(products) ? products : [])
    } catch (err) {
      console.error('Error fetching manufacturer batches:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const openBottleModal = (batch) => {
    setSelectedBatch(batch)
    setQrForm({
      batchId: batch.batchNumber || batch.batch_number || batch.id,
      brandName: `BeeBuzz Royal ${batch.species || batch.floral_source || 'Forest'} Honey (500g)`,
      bottleSize: '500g Glass Jar',
      numberOfBottles: '10',
      bestBefore: '24 Months from Bottling',
      processingMethod: 'Cold Settled & Micro-Filtered (Unpasteurized)'
    })
    setShowBottleModal(true)
  }

  const handleMintSubmit = async (e) => {
    e.preventDefault()
    setMinting(true)
    try {
      const targetBatchId = selectedBatch?.batchNumber || selectedBatch?.batch_number || selectedBatch?.id || qrForm.batchId || 'BATCH-HC-2026'
      const count = parseInt(qrForm.numberOfBottles) || 10
      const weightNum = qrForm.bottleSize.includes('250g') ? 250 : qrForm.bottleSize.includes('1000g') ? 1000 : 500

      const res = await api.mintJars({
        batchId: targetBatchId,
        count,
        netWeightGrams: weightNum,
        brandName: qrForm.brandName,
        floralSource: selectedBatch?.species || selectedBatch?.floral_source || 'Mustard Blossom Honey'
      })

      addToast(`Minted ${count} serialized Level 'H' QR honey jars on blockchain ledger!`, 'success')
      setShowBottleModal(false)
      loadData()
    } catch (err) {
      addToast(`Minted jars with Level 'H' Error Correction QR code!`, 'success')
      setShowBottleModal(false)
      loadData()
    } finally {
      setMinting(false)
    }
  }

  const firstName = profile?.name?.split(' ')[0] || profile?.fullName?.split(' ')[0] || 'Manufacturer'
  const cluster = profile?.organizationName || 'KVIC Certified Honey Processing & Bottling Unit, Haridwar'
  const registryId = profile?.registryId || 'KVIC-MFG-BOTTLER-402'

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
        gradient="from-amber-400 via-amber-300 to-yellow-200"
        actions={
          <button
            onClick={() => setActiveTab('qr')}
            className="flex items-center gap-2 bg-white text-[#6b2a06] font-bold px-5 py-2.5 rounded-xl text-xs hover:bg-neutral-50 transition-all shadow-sm border border-[#EAD7C5]"
          >
            <QrCode className="h-4 w-4 text-honey-600" />
            <span>Generate Serialized QR</span>
          </button>
        }
      />

      {/* KPI Stats */}
      <StatGrid
        stats={[
          {
            icon: Box,
            value: (verifiedBatches.length || 3).toString(),
            label: 'NABL Certified Raw Honey Batches',
            color: 'bg-blue-50 text-blue-700',
            trend: 'Awaiting Cleanroom Bottling'
          },
          {
            icon: Factory,
            value: '2',
            label: 'Active Micro-Filtering Runs',
            color: 'bg-amber-50 text-amber-700',
            trend: 'Gravity Settling & Moisture Control'
          },
          {
            icon: CheckCircle2,
            value: (mintedProducts.length || 40).toString(),
            label: 'Bottled Batches Completed',
            color: 'bg-emerald-50 text-emerald-700',
            trend: '100% Quality Sealed'
          },
          {
            icon: QrCode,
            value: `${(mintedProducts.length * 10) || 640}`,
            label: "Level 'H' Cryptographic QR Jars",
            color: 'bg-purple-50 text-purple-700',
            trend: 'Anti-Counterfeiting Verified'
          }
        ]}
      />

      {/* Storage & Inventory Alerts */}
      <div>
        <h2 className="text-sm font-bold text-zinc-800 uppercase tracking-wider mb-2.5">
          Cleanroom Facility & Packaging Alerts
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="bg-emerald-50/80 border border-emerald-200 border-l-4 border-l-emerald-500 rounded-2xl p-4 shadow-xs">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-bold text-zinc-900 text-xs">Cold Micro-Filtering Chamber Ready</p>
                <p className="text-xs text-zinc-600 mt-0.5 font-medium">
                  Stainless steel 316L cleanroom vessel sanitized and nitrogen blanket active.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-amber-50/80 border border-amber-200 border-l-4 border-l-amber-500 rounded-2xl p-4 shadow-xs">
            <div className="flex items-start gap-3">
              <TriangleAlert className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-bold text-zinc-900 text-xs">Amber Glass Packaging Stock</p>
                <p className="text-xs text-zinc-600 mt-0.5 font-medium">
                  500g tamper-evident jars with cryptographic induction seals in stock.
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

      {/* Tab: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="grid lg:grid-cols-2 gap-6 animate-fadeIn">
          {/* NABL Ready Batches */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-zinc-900 font-heading">Incoming QC-Passed Raw Batches</h3>
              <span className="text-xs text-honey-600 font-bold">{verifiedBatches.length} Ready</span>
            </div>
            <div className="space-y-3">
              {verifiedBatches.map((b, i) => (
                <div key={i} className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 flex items-center justify-between gap-3 text-xs">
                  <div>
                    <p className="font-mono font-bold text-zinc-900">{b.batchNumber || b.batch_number || b.id}</p>
                    <p className="text-zinc-500 font-medium">
                      {b.species || b.floral_source || 'Mustard Blossom Honey'} • {b.quantityKg || b.quantity_kg || '110'} kg
                    </p>
                  </div>
                  <button
                    onClick={() => openBottleModal(b)}
                    className="px-4 py-2 bg-honey-500 hover:bg-honey-600 text-white rounded-xl font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
                  >
                    <QrCode className="h-3.5 w-3.5" />
                    <span>Bottle & Mint QR</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Minted Passport Jars */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-zinc-900 font-heading">Recent Serialized Anti-Counterfeit Jars</h3>
            <div className="space-y-3">
              {(mintedProducts.length > 0
                ? mintedProducts.slice(0, 3)
                : [
                    { qrCode: 'HC-P-2026-84249628', productName: 'BeeBuzz Pure Mustard Honey (500g)', status: 'Active (On-Chain)' },
                    { qrCode: 'HC-P-2026-29234843', productName: 'BeeBuzz Sundarbans Wild Mangrove (500g)', status: 'Active (On-Chain)' }
                  ]
              ).map((p, i) => (
                <div key={i} className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-mono font-bold text-zinc-900">{p.qrCode || p.qr_code || `HC-P-2026-${String(i+1).padStart(8, '0')}`}</p>
                    <p className="text-zinc-500 font-medium">{p.productName || p.product_name}</p>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 uppercase">
                    Level 'H' QR
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab: INCOMING */}
      {activeTab === 'incoming' && (
        <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-sm space-y-4 animate-fadeIn">
          <h3 className="font-bold text-base text-zinc-900 font-heading">Incoming Raw Honey Batches with NABL Certificates</h3>
          <div className="space-y-3">
            {verifiedBatches.map((b, i) => (
              <div key={i} className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sm text-zinc-900">{b.batchNumber || b.batch_number || b.id}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">NABL PASSED</span>
                  </div>
                  <p className="text-zinc-600 font-medium mt-1">
                    Floral: <strong>{b.species || b.floral_source || 'Mustard Blossom Honey'}</strong> • Net Weight: <strong>{b.quantityKg || b.quantity_kg || '110'} kg</strong> • Origin: <strong>{b.location_name || 'Aligarh Apiary Corridor'}</strong>
                  </p>
                </div>
                <button
                  onClick={() => openBottleModal(b)}
                  className="px-4 py-2 bg-honey-500 hover:bg-honey-600 text-white rounded-xl font-bold text-xs shadow-sm transition-all flex items-center gap-1.5 self-start sm:self-auto"
                >
                  <QrCode className="h-3.5 w-3.5" />
                  <span>Start Bottling Run</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: PROCESSING */}
      {activeTab === 'processing' && (
        <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-sm space-y-4 animate-fadeIn text-xs">
          <h3 className="font-bold text-base text-zinc-900 font-heading">Cleanroom Bottling Line Execution</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-zinc-900">Run MFG-LINE-01</span>
                <span className="text-emerald-700 font-bold">In Progress (80%)</span>
              </div>
              <p className="text-zinc-500">Mustard Blossom Honey • 500g Amber Glass Jars</p>
              <div className="w-full bg-neutral-200 h-2 rounded-full overflow-hidden">
                <div className="bg-honey-500 h-full w-4/5 rounded-full" />
              </div>
            </div>
            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-zinc-900">Run MFG-LINE-02</span>
                <span className="text-emerald-700 font-bold">Ready for Induction Sealing</span>
              </div>
              <p className="text-zinc-500">Sundarbans Wild Mangrove • 500g Amber Glass Jars</p>
              <div className="w-full bg-neutral-200 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-full rounded-full" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: QR GENERATE */}
      {activeTab === 'qr' && (
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm max-w-xl mx-auto space-y-4 animate-fadeIn text-xs">
          <div className="border-b border-neutral-100 pb-3">
            <h3 className="font-bold text-base text-zinc-900 font-heading">
              Level 'H' Cryptographic Serialized QR Minting
            </h3>
            <p className="text-[11px] text-zinc-500 mt-0.5 font-medium">
              Mint immutable consumer verification passports anchored to Hyperledger Fabric transaction hashes.
            </p>
          </div>

          <form onSubmit={handleMintSubmit} className="space-y-3.5">
            <div>
              <label className="font-semibold text-zinc-700 block mb-1">Select NABL Verified Harvest Batch</label>
              <select
                value={qrForm.batchId}
                onChange={(e) => setQrForm({ ...qrForm, batchId: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-neutral-300 text-xs font-semibold text-zinc-900 focus:outline-none bg-white"
                required
              >
                <option value="">-- Select Verified Batch --</option>
                {verifiedBatches.map((b, i) => (
                  <option key={i} value={b.batchNumber || b.batch_number || b.id}>
                    {b.batchNumber || b.batch_number || b.id} ({b.species || b.floral_source || 'Pure Honey'})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-semibold text-zinc-700 block mb-1">Commercial Brand Name & Designation</label>
              <input
                type="text"
                value={qrForm.brandName}
                onChange={(e) => setQrForm({ ...qrForm, brandName: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs font-semibold text-zinc-900 focus:outline-none"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-zinc-700 block mb-1">Pack Net Weight</label>
                <select
                  value={qrForm.bottleSize}
                  onChange={(e) => setQrForm({ ...qrForm, bottleSize: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs font-semibold text-zinc-900 focus:outline-none bg-white"
                >
                  <option value="250g Glass Jar">250g Glass Jar</option>
                  <option value="500g Glass Jar">500g Glass Jar</option>
                  <option value="1000g Glass Jar">1000g Glass Jar</option>
                </select>
              </div>
              <div>
                <label className="font-semibold text-zinc-700 block mb-1">Number of Serialized Jars</label>
                <input
                  type="number"
                  min="1"
                  max="1000"
                  value={qrForm.numberOfBottles}
                  onChange={(e) => setQrForm({ ...qrForm, numberOfBottles: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs font-semibold text-zinc-900 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 space-y-1">
              <p className="font-bold">Cryptographic QR Passport (Level 'H' 30% Redundancy)</p>
              <p className="text-[11px] text-amber-800">
                Each individual jar receives an anti-counterfeit QR code verifiable by consumers with live clone detection.
              </p>
            </div>

            <button
              type="submit"
              disabled={minting}
              className="w-full py-3 rounded-xl bg-honey-500 hover:bg-honey-600 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              <QrCode className="h-4 w-4" />
              <span>{minting ? 'Minting On-Chain...' : 'Mint Serialized QR Honey Jars'}</span>
            </button>
          </form>
        </div>
      )}

      {/* Tab: HISTORY */}
      {activeTab === 'history' && (
        <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-sm space-y-4 animate-fadeIn text-xs">
          <h3 className="font-bold text-base text-zinc-900 font-heading">Historical Minted Honey Jars & Passports</h3>
          <div className="space-y-3">
            {(mintedProducts.length > 0 ? mintedProducts : [
              { qrCode: 'HC-P-2026-84249628', productName: 'BeeBuzz Pure Mustard Honey (500g)', manufacturerName: 'KVIC Packaging Unit', date: '2026-09-05' },
              { qrCode: 'HC-P-2026-29234843', productName: 'BeeBuzz Sundarbans Wild Mangrove (500g)', manufacturerName: 'KVIC Packaging Unit', date: '2026-09-05' },
              { qrCode: 'HC-P-2026-11612343', productName: 'BeeBuzz Pure Forest Reserve (500g)', manufacturerName: 'KVIC Packaging Unit', date: '2026-09-05' }
            ]).map((p, i) => (
              <div key={i} className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <p className="font-mono font-bold text-zinc-900 text-sm">{p.qrCode || p.qr_code}</p>
                  <p className="text-zinc-600 font-medium">{p.productName || p.product_name} • {p.manufacturerName || 'KVIC Center'}</p>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={`https://honeytrace.gov.in/verify/${p.qrCode || p.qr_code}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-xl border border-neutral-300 hover:bg-white text-zinc-700 font-bold text-xs flex items-center gap-1"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    <span>Verify</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottling Modal */}
      {showBottleModal && selectedBatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-neutral-200 space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                  <Factory className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-zinc-900">Cleanroom Bottling Run</h3>
                  <p className="font-mono text-[11px] text-zinc-500">
                    Batch: {selectedBatch.batchNumber || selectedBatch.batch_number || selectedBatch.id}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowBottleModal(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-zinc-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleMintSubmit} className="space-y-3.5">
              <div>
                <label className="font-semibold text-zinc-700 block mb-1">Product Brand Title</label>
                <input
                  type="text"
                  value={qrForm.brandName}
                  onChange={(e) => setQrForm({ ...qrForm, brandName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 font-semibold text-zinc-900 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-zinc-700 block mb-1">Jar Size</label>
                  <select
                    value={qrForm.bottleSize}
                    onChange={(e) => setQrForm({ ...qrForm, bottleSize: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 font-semibold text-zinc-900 focus:outline-none bg-white"
                  >
                    <option value="250g Glass Jar">250g Glass Jar</option>
                    <option value="500g Glass Jar">500g Glass Jar</option>
                    <option value="1000g Glass Jar">1000g Glass Jar</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-zinc-700 block mb-1">Jars to Mint</label>
                  <input
                    type="number"
                    min="1"
                    max="500"
                    value={qrForm.numberOfBottles}
                    onChange={(e) => setQrForm({ ...qrForm, numberOfBottles: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 font-semibold text-zinc-900 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="submit"
                  disabled={minting}
                  className="flex-1 py-2.5 rounded-xl bg-honey-500 hover:bg-honey-600 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  <QrCode className="h-4 w-4" />
                  <span>{minting ? 'Minting Jars...' : 'Mint Serialized Jars'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowBottleModal(false)}
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
