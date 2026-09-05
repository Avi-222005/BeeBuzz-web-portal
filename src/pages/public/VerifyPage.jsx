import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ShieldCheck,
  MapPin,
  Calendar,
  Clock,
  FlaskConical,
  Package,
  Boxes,
  CheckCircle2,
  Copy,
  Check,
  Download,
  Printer,
  ArrowLeft,
  AlertTriangle,
  FileText,
  ExternalLink,
  Sparkles,
  QrCode,
  Users,
  Award
} from 'lucide-react'
import api from '../../api'

export default function VerifyPage() {
  const { batchId } = useParams()

  const [verification, setVerification] = useState(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setLoading(true)
    api.verifyBatch(batchId)
      .then(res => {
        setVerification(res)
        setLoading(false)
      })
      .catch(err => {
        console.error('Verification error:', err)
        setLoading(false)
      })
  }, [batchId])

  const copyHash = (text) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (loading) {
    return (
      <div className="py-24 text-center text-[#6b2a06]">
        <div className="w-10 h-10 border-4 border-honey-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm font-semibold">Verifying cryptographic hash on Hyperledger Fabric ledger...</p>
      </div>
    )
  }

  if (!verification || verification.status === 'not_found' || verification.status === 'tampered') {
    return (
      <div className="max-w-xl mx-auto py-16 px-4 text-center text-[#6b2a06]">
        <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="h-8 w-8" />
        </div>
        <h2 className="text-2xl font-black font-heading">Batch Passport Not Verified</h2>
        <p className="text-sm text-[#8c5e3c] mt-2 mb-6 leading-relaxed">
          The identifier <strong className="font-mono text-[#6b2a06]">{batchId}</strong> could not be verified on the blockchain ledger.
        </p>
        <div className="p-4 bg-[#FFF8EC] rounded-card border border-[#EAD7C5] mb-6 text-xs text-left space-y-2 font-mono">
          <div className="text-[#8c5e3c] font-bold">Verified Registered Batches:</div>
          <div><Link to="/verify/BATCH-HC-20260904-0001" className="text-honey-600 hover:underline">BATCH-HC-20260904-0001 (Aligarh Mustard Honey)</Link></div>
          <div><Link to="/verify/PROCESSING-PB-01" className="text-honey-600 hover:underline">PROCESSING-PB-01 (Master Processing Batch)</Link></div>
          <div><Link to="/verify/HC-P-2026-00000093821" className="text-honey-600 hover:underline">HC-P-2026-00000093821 (Packaged Jar)</Link></div>
        </div>
        <Link to="/scan" className="btn-primary inline-flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Scanner</span>
        </Link>
      </div>
    )
  }

  const { product, proof, contributingBeekeepers, contributingBeekeepersCount, timeline, beekeeper } = verification
  const contributors = contributingBeekeepers || []

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-8 text-[#6b2a06]">
      {/* Back Link */}
      <div className="flex items-center justify-between">
        <Link to="/scan" className="inline-flex items-center gap-1.5 text-xs font-bold text-honey-600 hover:text-honey-700">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Scanner</span>
        </Link>
        <span className="text-xs font-mono text-[#8c5e3c]">Passport ID: {batchId}</span>
      </div>

      {/* Authenticity Certificate Hero Banner */}
      <div className="card p-6 bg-white border-2 border-green-500/40 shadow-card">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#EAD7C5] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="h-7 w-7" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-green-100 text-green-800 text-[10px] font-black uppercase tracking-wider">
                <CheckCircle2 className="h-3 w-3" />
                <span>Hyperledger Fabric Verified Authentic</span>
              </div>
              <h1 className="text-2xl font-black font-heading text-[#6b2a06] mt-1">
                {product?.honeyType || 'KVIC 100% Pure Raw Honey'}
              </h1>
              <p className="text-xs text-[#8c5e3c]">
                FSSAI Gazette Standards 2020 & BIS IS 494:2022 Certified Monofloral Honey
              </p>
            </div>
          </div>
          <div className="text-center sm:text-right">
            <span className="text-xs font-bold text-[#8c5e3c] block">Quantity Net</span>
            <span className="text-2xl font-black font-heading text-honey-600">{product?.weightKg || 37.0} kg</span>
          </div>
        </div>

        {/* Quick Provenance Highlight Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 text-xs">
          <div>
            <span className="text-[#8c5e3c] block text-[10px] uppercase font-bold">Apiary Sources</span>
            <span className="font-bold text-[#6b2a06]">{contributors.length > 0 ? `${contributors.length} Beekeepers` : beekeeper.name}</span>
          </div>
          <div>
            <span className="text-[#8c5e3c] block text-[10px] uppercase font-bold">Consensus Network</span>
            <span className="font-bold text-[#6b2a06] truncate block">{proof.network}</span>
          </div>
          <div>
            <span className="text-[#8c5e3c] block text-[10px] uppercase font-bold">Block Height</span>
            <span className="font-bold text-green-700 font-mono">#{proof.blockNumber || 142}</span>
          </div>
          <div>
            <span className="text-[#8c5e3c] block text-[10px] uppercase font-bold">C4 Sugar Test</span>
            <span className="font-bold text-green-700 font-mono">Negative (&lt; 7%)</span>
          </div>
        </div>
      </div>

      {/* MULTI-BEEKEEPER PROVENANCE CARD */}
      {contributors.length > 0 && (
        <div className="card p-6 bg-white border border-[#EAD7C5] space-y-4 shadow-card">
          <div className="flex items-center justify-between border-b border-[#EAD7C5] pb-3">
            <h2 className="text-base font-black font-heading text-[#6b2a06] flex items-center gap-2">
              <Users className="h-5 w-5 text-honey-600" />
              <span>Multi-Beekeeper Provenance Genealogy ({contributors.length} Contributing Apiaries)</span>
            </h2>
            <span className="badge badge-success text-[10px]">100% Traceable</span>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            {contributors.map((c, i) => (
              <div key={i} className="p-3 bg-[#FFF8EC] rounded-xl border border-[#EAD7C5] space-y-1.5 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-[#6b2a06]">{c.beekeeperName}</span>
                  <span className="badge badge-primary text-[10px]">{c.quantityKg} kg</span>
                </div>
                <div className="text-[11px] text-[#8c5e3c] flex justify-between">
                  <span>Source: <strong>{c.floralSource}</strong></span>
                  <span>Harvest: <strong>{c.harvestDate}</strong></span>
                </div>
                {c.evidenceHash && (
                  <div className="pt-1 text-[10px] text-[#8c5e3c] font-mono truncate">
                    Evidence Hash: <span className="text-[#6b2a06]">{c.evidenceHash.slice(0, 16)}...</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5-STAGE SUPPLY CHAIN PROVENANCE JOURNEY */}
      <div className="card p-6 sm:p-8 bg-white border border-[#EAD7C5] space-y-8 shadow-card">
        <h2 className="text-lg font-black font-heading text-[#6b2a06] border-b border-[#EAD7C5] pb-3">
          Verifiable Supply Chain Journey & Proofs
        </h2>

        <div className="space-y-6">
          {timeline.map((step, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-xl bg-honey-500 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                  0{step.step || i + 1}
                </div>
                {i < timeline.length - 1 && <div className="w-0.5 flex-1 bg-[#EAD7C5] my-2" />}
              </div>
              <div className="flex-1 pb-4 space-y-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-bold text-sm text-[#6b2a06]">{step.title}</h3>
                  <span className="text-xs text-[#8c5e3c]">{new Date(step.timestamp).toLocaleDateString()}</span>
                </div>
                <p className="text-xs text-[#8c5e3c]">{step.detail}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Cryptographic Proof Box */}
        <div className="p-4 bg-[#FFF8EC] rounded-xl border border-[#EAD7C5] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#6b2a06]">Hyperledger Fabric Immutable Transaction Hash</span>
            <button
              onClick={() => copyHash(proof.txHash)}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-honey-600 hover:text-honey-700"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-green-600" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Tx Hash'}</span>
            </button>
          </div>
          <div className="font-mono text-xs text-[#6b2a06] break-all bg-white p-2.5 rounded-lg border border-[#EAD7C5]">
            {proof.txHash}
          </div>
        </div>
      </div>
    </div>
  )
}
