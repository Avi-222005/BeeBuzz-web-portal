import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useHoneyStore } from '../../store/honeyStore'
import { useToastStore } from '../../store/toastStore'
import { ArrowLeft, Search, ShieldAlert, CheckCircle2, Eye, QrCode } from 'lucide-react'

export default function AdminBatchesPage() {
  const { batches, flagBatchFraud } = useHoneyStore()
  const { addToast } = useToastStore()

  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('')

  const handleFlag = (batchId) => {
    flagBatchFraud(batchId, 'Flagged by Regulatory Audit: Suspected C4 Sugar / Adulteration Anomaly')
    addToast(`Batch ${batchId} has been flagged for regulatory audit!`, 'warning')
  }

  const filteredBatches = batches.filter((b) => {
    const matchesSearch =
      b.batchId.toLowerCase().includes(search.toLowerCase()) ||
      b.floralSource.toLowerCase().includes(search.toLowerCase()) ||
      b.beekeeperName?.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = !filter || b.status === filter
    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-6 text-[#6b2a06]">
      <div className="flex items-center justify-between border-b border-[#EAD7C5] pb-4">
        <div>
          <Link to="/admin" className="inline-flex items-center gap-1.5 text-xs text-honey-600 hover:text-honey-700 font-bold mb-1">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Dashboard
          </Link>
          <h1 className="text-2xl font-black font-heading text-[#6b2a06]">Master Batches Ledger</h1>
        </div>
        <span className="text-xs text-[#8c5e3c]">Total Batches: {batches.length}</span>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8c5e3c]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search batch ID, floral source, or beekeeper..."
            className="input pl-10 text-sm"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="input sm:w-56 text-sm"
        >
          <option value="">All Statuses</option>
          <option value="VERIFIED">Verified (FSSAI Passed)</option>
          <option value="PENDING_QC">Pending QC Test</option>
          <option value="BOTTLED_VERIFIED">Bottled & QR Minted</option>
          <option value="FRAUD_FLAGGED">Fraud Flagged</option>
        </select>
      </div>

      {/* Batches Table */}
      <div className="card overflow-x-auto bg-white border border-[#EAD7C5] shadow-card">
        <table className="w-full text-xs text-left">
          <thead className="bg-[#FFF8EC] text-[#6b2a06] uppercase font-bold border-b border-[#EAD7C5] text-[10px]">
            <tr>
              <th className="p-3">Batch ID</th>
              <th className="p-3">Botanical Flora</th>
              <th className="p-3">Beekeeper & Region</th>
              <th className="p-3 text-right">Yield</th>
              <th className="p-3 text-center">FSSAI Status</th>
              <th className="p-3">Lab Cert / TxID</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EAD7C5]/60">
            {filteredBatches.map((b) => (
              <tr key={b.id} className="hover:bg-[#FFF8EC]/50 transition-colors">
                <td className="p-3 font-mono font-bold text-[#6b2a06]">{b.batchId}</td>
                <td className="p-3 font-semibold text-[#6b2a06]">{b.floralSource}</td>
                <td className="p-3">
                  <div className="font-bold text-[#6b2a06]">{b.beekeeperName}</div>
                  <div className="text-[10px] text-[#8c5e3c]">{b.cluster}</div>
                </td>
                <td className="p-3 text-right font-bold text-honey-600">{b.quantityKg} kg</td>
                <td className="p-3 text-center">
                  <span className={`badge text-[10px] ${
                    b.status === 'VERIFIED' || b.status === 'BOTTLED_VERIFIED'
                      ? 'badge-success'
                      : b.status === 'FRAUD_FLAGGED'
                      ? 'badge-danger'
                      : 'badge-warning'
                  }`}>
                    {b.status}
                  </span>
                </td>
                <td className="p-3 font-mono text-[10px] text-[#8c5e3c]">
                  {b.packaging?.qrCode ? (
                    <span className="text-honey-600 font-bold block">QR: {b.packaging.qrCode}</span>
                  ) : b.labTest?.certId ? (
                    <span className="text-green-700 block">{b.labTest.certId}</span>
                  ) : (
                    <span>Awaiting Test</span>
                  )}
                </td>
                <td className="p-3 text-center">
                  <div className="flex items-center justify-center gap-1.5">
                    <Link
                      to={`/verify/${b.packaging?.qrCode || b.batchId}`}
                      className="px-2 py-1 text-[11px] font-bold rounded-lg bg-honey-100 hover:bg-honey-200 text-[#6b2a06] flex items-center gap-1"
                    >
                      <Eye className="h-3 w-3" />
                      <span>Inspect</span>
                    </Link>
                    {b.status !== 'FRAUD_FLAGGED' && (
                      <button
                        onClick={() => handleFlag(b.batchId)}
                        className="px-2 py-1 text-[11px] font-bold rounded-lg bg-red-50 hover:bg-red-100 text-red-700 flex items-center gap-1"
                        title="Flag for Regulatory Audit"
                      >
                        <ShieldAlert className="h-3 w-3" />
                        <span>Flag</span>
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
