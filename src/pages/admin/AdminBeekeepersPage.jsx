import React from 'react'
import { useHoneyStore } from '../../store/honeyStore'
import { useToastStore } from '../../store/toastStore'
import Badge from '../../components/ui/Badge'
import { Users, CheckCircle2, XCircle, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function AdminBeekeepersPage() {
  const { beekeepers, approveBeekeeper, rejectBeekeeper } = useHoneyStore()
  const { addToast } = useToastStore()

  const handleApprove = (id, name) => {
    approveBeekeeper(id)
    addToast(`${name} has been approved as certified KVIC beekeeper!`, 'success')
  }

  const handleReject = (id, name) => {
    rejectBeekeeper(id)
    addToast(`${name} verification status marked as rejected.`, 'error')
  }

  return (
    <div className="space-y-6 text-[#6b2a06]">
      <div className="flex items-center justify-between border-b border-[#EAD7C5] pb-4">
        <div>
          <Link to="/admin" className="inline-flex items-center gap-1.5 text-xs text-honey-600 hover:text-honey-700 font-bold mb-1">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Dashboard
          </Link>
          <h1 className="text-2xl font-black font-heading text-[#6b2a06]">Beekeepers Verification Roster</h1>
        </div>
        <span className="text-xs text-[#8c5e3c]">Total Registered: {beekeepers.length}</span>
      </div>

      <div className="card overflow-x-auto bg-white border border-[#EAD7C5] shadow-card">
        <table className="w-full text-xs text-left">
          <thead className="bg-[#FFF8EC] text-[#6b2a06] uppercase font-bold border-b border-[#EAD7C5] text-[10px]">
            <tr>
              <th className="p-3">Beekeeper Name & ID</th>
              <th className="p-3">Cluster Region</th>
              <th className="p-3">State</th>
              <th className="p-3">Phone</th>
              <th className="p-3 text-right">Subsidized Boxes</th>
              <th className="p-3 text-right">Total Yield</th>
              <th className="p-3 text-center">Status</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EAD7C5]/60">
            {beekeepers.map((bk) => (
              <tr key={bk.id} className="hover:bg-[#FFF8EC]/50 transition-colors">
                <td className="p-3">
                  <div className="font-bold text-[#6b2a06]">{bk.name}</div>
                  <div className="text-[10px] font-mono text-[#8c5e3c]">{bk.id}</div>
                </td>
                <td className="p-3 font-semibold text-[#6b2a06]">{bk.cluster}</td>
                <td className="p-3 text-[#8c5e3c]">{bk.state}</td>
                <td className="p-3 font-mono text-[#8c5e3c]">{bk.phone}</td>
                <td className="p-3 text-right font-bold">{bk.boxes || 10}</td>
                <td className="p-3 text-right font-bold text-honey-600">{bk.totalYieldKg || 120} kg</td>
                <td className="p-3 text-center">
                  <span className={`badge text-[10px] ${
                    bk.status === 'APPROVED' ? 'badge-success' : bk.status === 'REJECTED' ? 'badge-danger' : 'badge-warning'
                  }`}>
                    {bk.status}
                  </span>
                </td>
                <td className="p-3 text-center">
                  {bk.status !== 'APPROVED' ? (
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => handleApprove(bk.id, bk.name)}
                        className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-green-600 hover:bg-green-700 text-white shadow-sm"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(bk.id, bk.name)}
                        className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-red-100 hover:bg-red-200 text-red-700"
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <span className="text-[11px] text-green-700 font-bold flex items-center justify-center gap-1">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Certified
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
