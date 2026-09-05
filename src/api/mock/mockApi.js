import { hives, alerts, batches, beekeepers, clusters, activity, labPendingBatches, labCompletedTests } from './seed.js'
import { delay } from '../../utils/formatters.js'

/** Mutable in-memory store — minted batches appear across all views */
let _batches = [...batches]
let _beekeepers = [...beekeepers]
let _labPending = [...labPendingBatches]
let _labCompleted = [...labCompletedTests]

function generateBatchId() {
  const n = Math.floor(Math.random() * 9000) + 1000
  return `HC-2025-${n}`
}

function generateTxHash() {
  const chars = '0123456789abcdef'
  let hash = '0x'
  for (let i = 0; i < 64; i++) hash += chars[Math.floor(Math.random() * 16)]
  return hash
}

/** @type {import('../../types').VerifyResponse} */
const tamperedResponse = {
  status: 'tampered',
  product: { honeyType: 'Coriander Honey', weightKg: 10.0, season: 'Monsoon 2025' },
  timeline: [],
  beekeeper: { name: 'Unknown', village: 'N/A', since: 'N/A', cluster: 'N/A' },
  proof: { txHash: '0x0000000000000000000000000000000000000000000000000000000000000000', blockNumber: 0, network: 'Polygon Amoy Testnet', timestamp: '2025-06-15T07:00:00Z' },
  scanCount: 0,
  lastVerifiedAt: null,
}

export const mockApi = {
  // ─── Auth ───
  async requestOtp(phone) {
    await delay()
    return { requestId: `req-${Date.now()}` }
  },

  async verifyOtp(requestId, otp, role) {
    await delay()
    const profiles = {
      beekeeper: { id: 'BK-001', name: 'Ramesh Patil', phone: '9876543210', role: 'beekeeper', village: 'Jawhar', cluster: 'Jawhar Cluster' },
      admin:     { id: 'ADM-001', name: 'Priya Sharma', phone: '9876543220', role: 'admin', village: '', cluster: '' },
      lab:       { id: 'LAB-001', name: 'Dr. Meena Iyer', phone: '9876543230', role: 'lab', village: '', cluster: '' },
    }
    return { token: 'mock-token-' + Date.now(), profile: profiles[role] || profiles.beekeeper }
  },

  async signup({ name, email, phone, password, role }) {
    await delay()
    const profiles = {
      beekeeper: { id: 'BK-' + Date.now(), name, email, phone, role: 'beekeeper', village: 'Jawhar', cluster: 'Jawhar Cluster' },
      admin:     { id: 'ADM-' + Date.now(), name, email, phone, role: 'admin', village: '', cluster: '' },
      lab:       { id: 'LAB-' + Date.now(), name, email, phone, role: 'lab', village: '', cluster: '' },
    }
    return { token: 'mock-token-' + Date.now(), profile: profiles[role] || profiles.beekeeper }
  },

  async login(email, password, role) {
    await delay()
    const profiles = {
      beekeeper: { id: 'BK-001', name: 'Ramesh Patil', email, phone: '9876543210', role: 'beekeeper', village: 'Jawhar', cluster: 'Jawhar Cluster' },
      admin:     { id: 'ADM-001', name: 'Priya Sharma', email, phone: '9876543220', role: 'admin', village: '', cluster: '' },
      lab:       { id: 'LAB-001', name: 'Dr. Meena Iyer', email, phone: '9876543230', role: 'lab', village: '', cluster: '' },
    }
    return { token: 'mock-token-' + Date.now(), profile: profiles[role] || profiles.beekeeper }
  },

  // ─── Hives ───
  async getHives() {
    await delay()
    return hives
  },

  async getHiveReadings(hiveId, days = 7) {
    await delay()
    const now = Date.now()
    const dayMs = 86400000
    const gen = (base, variance) =>
      Array.from({ length: days }, (_, i) => ({
        t: new Date(now - (days - 1 - i) * dayMs).toISOString(),
        v: +(base + (Math.random() - 0.5) * variance).toFixed(1),
      }))
    return { temperature: gen(34, 3), humidity: gen(62, 10), weight: gen(36, 4) }
  },

  async getHiveHealth(hiveId) {
    await delay()
    return {
      score: hiveId === 'Hive-06' ? 32 : 85,
      label: hiveId === 'Hive-06' ? 'At Risk' : hiveId === 'Hive-03' ? 'Monitor' : 'Strong Colony',
      diseases: hiveId === 'Hive-06'
        ? [{ name: 'Varroa Mite Infestation', probability: 78 }, { name: 'American Foulbrood', probability: 12 }]
        : hiveId === 'Hive-03'
          ? [{ name: 'Nosema', probability: 25 }]
          : [],
      forecast: { kg: hiveId === 'Hive-06' ? 3 : 12, weeks: hiveId === 'Hive-06' ? 6 : 3, confidence: hiveId === 'Hive-06' ? 45 : 84 },
      pastYields: [
        { label: 'Jan', kg: 8 + Math.random() * 4 },
        { label: 'Feb', kg: 9 + Math.random() * 4 },
        { label: 'Mar', kg: 10 + Math.random() * 4 },
        { label: 'Apr', kg: 7 + Math.random() * 4 },
        { label: 'May', kg: 11 + Math.random() * 4 },
        { label: 'Jun', kg: 13 + Math.random() * 4 },
        { label: 'Jul', kg: 12 + Math.random() * 4 },
        { label: 'Aug', kg: 14 + Math.random() * 4 },
      ],
    }
  },

  // ─── Alerts ───
  async getAlerts() {
    await delay()
    return alerts
  },

  // ─── Batches ───
  async getMyBatches() {
    await delay()
    return _batches.filter((b) => b.batchId !== 'HC-BAD-9999')
  },

  async createBatch(data) {
    await delay(800)
    const batchId = generateBatchId()
    const txHash = generateTxHash()
    const blockNumber = 1000000 + Math.floor(Math.random() * 50000)
    const now = new Date().toISOString()

    const newBatch = {
      batchId,
      honeyType: data.honeyType,
      quantityKg: data.quantityKg,
      date: now,
      status: 'On-chain ✓',
      scanCount: 0,
    }
    _batches.unshift(newBatch)

    // Add to lab pending
    _labPending.unshift({
      batchId,
      honeyType: data.honeyType,
      harvestDate: data.harvestDate || now.split('T')[0],
      beekeeperName: 'Ramesh Patil',
      village: 'Jawhar',
      status: 'Pending Test',
    })

    return {
      batchId,
      txHash,
      blockNumber,
      network: 'Polygon Amoy Testnet',
      timestamp: now,
      qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(`https://beebuzz.in/verify/${batchId}`)}`,
      verifyUrl: `https://beebuzz.in/verify/${batchId}`,
    }
  },

  // ─── Verify ───
  async verifyBatch(batchId) {
    await delay()
    if (batchId === 'HC-BAD-9999') return tamperedResponse
    const batch = _batches.find((b) => b.batchId === batchId)
    if (!batch) return { ...tamperedResponse, status: 'not_found' }

    return {
      status: 'verified',
      product: { honeyType: batch.honeyType, weightKg: batch.quantityKg, season: 'Monsoon 2025' },
      timeline: [
        { step: '1', title: 'Apiary Registered', timestamp: '2025-06-01T08:00:00Z', detail: 'Jawhar, Palghar district — 19.44°N, 73.13°E', icon: 'MapPin' },
        { step: '2', title: 'Harvested', timestamp: batch.date, detail: `Hive-01, Hive-02 — ${batch.quantityKg} kg`, icon: 'Droplets' },
        { step: '3', title: 'Quality Tested', timestamp: '2025-08-16T10:00:00Z', detail: 'Moisture 17.2%, Purity 98.5% — HoneyTest Labs, Mumbai', icon: 'FlaskConical' },
        { step: '4', title: 'Processed & Packaged', timestamp: '2025-08-18T09:00:00Z', detail: 'BeeBuzz Processing Unit, Palghar', icon: 'Package' },
        { step: '5', title: 'Minted on Blockchain', timestamp: batch.date, detail: `Tx: ${batch.batchId}`, icon: 'Link' },
      ],
      beekeeper: { name: 'Ramesh Patil', village: 'Jawhar, Palghar', since: '2021', cluster: 'Jawhar Cluster' },
      proof: { txHash: generateTxHash(), blockNumber: 1000000 + Math.floor(Math.random() * 50000), network: 'Polygon Amoy Testnet', timestamp: batch.date },
      scanCount: batch.scanCount + Math.floor(Math.random() * 5),
      lastVerifiedAt: new Date(Date.now() - Math.random() * 604800000).toISOString(),
    }
  },

  // ─── Lab ───
  async getLabPendingBatches() {
    await delay()
    return _labPending
  },

  async submitLabResults(batchId, results) {
    await delay(600)
    _labPending = _labPending.filter((b) => b.batchId !== batchId)
    const batch = _batches.find((b) => b.batchId === batchId)
    if (batch) batch.status = 'Quality Verified'
    _labCompleted.unshift({ batchId, ...results, testedAt: new Date().toISOString() })
    return { batchId, status: 'Quality Verified' }
  },

  async getLabCompletedTests() {
    await delay()
    return _labCompleted
  },

  // ─── Admin ───
  async getAdminStats() {
    await delay()
    return {
      beekeepers: _beekeepers.length,
      activeHives: hives.length,
      batchesMinted: _batches.length,
      consumerScans: _batches.reduce((sum, b) => sum + b.scanCount, 0),
      fraudAlerts: 1,
    }
  },

  async getAdminClusters() {
    await delay()
    return clusters
  },

  async getAdminActivity() {
    await delay()
    return activity
  },

  async getAdminBeekeepers() {
    await delay()
    return _beekeepers
  },

  async approveBeekeeper(id) {
    await delay()
    const bk = _beekeepers.find((b) => b.id === id)
    if (bk) bk.status = 'Verified'
    return { id, status: 'Verified' }
  },

  async getAdminBatches(q = '', status = '') {
    await delay()
    let result = [..._batches]
    if (q) result = result.filter((b) => b.batchId.toLowerCase().includes(q.toLowerCase()) || b.honeyType.toLowerCase().includes(q.toLowerCase()))
    if (status) result = result.filter((b) => b.status === status)
    return result
  },
}
