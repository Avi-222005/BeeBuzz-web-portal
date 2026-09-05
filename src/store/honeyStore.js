import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { getHoneyRule } from '../data/honeyRules'

const SEED_BATCHES = [
  {
    id: 'HC-2025-0042',
    batchId: 'HC-2025-0042',
    floralSource: 'Mustard Blossom Raw Honey',
    floralKey: 'mustard',
    beekeeperName: 'Ramesh Patil',
    beekeeperId: 'BK-MH-042',
    apiaryPassportId: 'KVIC-BOX-2024-8891',
    cluster: 'Aligarh-Bharatpur Migratory Belt',
    region: 'Rajasthan / UP Border',
    boxCount: 20,
    quantityKg: 120,
    moistureEst: 17.8,
    harvestDate: '2025-01-14T08:30:00Z',
    status: 'VERIFIED',
    lat: 27.2145,
    lng: 77.4921,
    hiveHealth: 'Optimal (34.5°C, 56% RH)',
    labTest: {
      certId: 'CERT-FSSAI-2025-0042',
      testedAt: '2025-01-18T11:45:00Z',
      labName: 'National Bee Board Referral Laboratory, Anand',
      technician: 'Dr. Meena Iyer (Senior Food Chemist)',
      moisture: 17.4,
      hmf: 24.6,
      sucrose: 2.1,
      fgRatio: 1.12,
      c4Sugar: 'Negative (< 7% - Adulteration Free)',
      pollen: '91.4% Brassica juncea dominance',
      antibiotics: 'Not Detected (ND)',
      passed: true,
      fssaiStandard: 'FSSAI Standards for Honey (Gazette 2020) & BIS IS 494:2022',
      txId: '0x3a4f89b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9'
    },
    packaging: {
      packagedAt: '2025-01-22T14:20:00Z',
      facility: 'KVIC Gramodaya Honey Processing Facility, Mumbai',
      jarSize: '500g Amber Glass Jar',
      totalJars: 240,
      qrCode: 'HC-P-2026-00000093821',
      txId: '0x7f8a92b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1'
    }
  },
  {
    id: 'HC-2025-0045',
    batchId: 'HC-2025-0045',
    floralSource: 'Eucalyptus Raw Forest Honey',
    floralKey: 'eucalyptus',
    beekeeperName: 'Vikram Solanke',
    beekeeperId: 'BK-UP-089',
    apiaryPassportId: 'KVIC-BOX-2024-9104',
    cluster: 'Terai Forest Migratory Corridor',
    region: 'Lakhimpur Kheri, Uttar Pradesh',
    boxCount: 15,
    quantityKg: 85,
    moistureEst: 18.2,
    harvestDate: '2025-02-02T09:15:00Z',
    status: 'PENDING_QC',
    lat: 27.9472,
    lng: 80.7786,
    hiveHealth: 'Normal (35.1°C, 58% RH)',
    labTest: null,
    packaging: null
  },
  {
    id: 'HC-2025-0048',
    batchId: 'HC-2025-0048',
    floralSource: 'Muzaffarpur Golden Lychee Honey',
    floralKey: 'lychee',
    beekeeperName: 'Manoj Deshmukh',
    beekeeperId: 'BK-BR-112',
    apiaryPassportId: 'KVIC-BOX-2024-7740',
    cluster: 'Muzaffarpur Lychee Orchard Belt',
    region: 'Muzaffarpur, Bihar',
    boxCount: 25,
    quantityKg: 150,
    moistureEst: 18.5,
    harvestDate: '2025-03-10T10:00:00Z',
    status: 'PENDING_QC',
    lat: 26.1209,
    lng: 85.3647,
    hiveHealth: 'Excellent (34.8°C, 52% RH)',
    labTest: null,
    packaging: null
  },
  {
    id: 'HC-2025-0031',
    batchId: 'HC-2025-0031',
    floralSource: 'Sundarbans Wild Forest Raw Honey',
    floralKey: 'multifloral',
    beekeeperName: 'Subhash Roy',
    beekeeperId: 'BK-WB-055',
    apiaryPassportId: 'KVIC-BOX-2024-6012',
    cluster: 'Sundarbans Mangrove Reserve',
    region: 'South 24 Parganas, West Bengal',
    boxCount: 18,
    quantityKg: 95,
    moistureEst: 19.0,
    harvestDate: '2025-02-18T07:45:00Z',
    status: 'VERIFIED',
    lat: 21.9497,
    lng: 89.1833,
    hiveHealth: 'Good (34.2°C, 62% RH)',
    labTest: {
      certId: 'CERT-FSSAI-2025-0031',
      testedAt: '2025-02-22T15:10:00Z',
      labName: 'Central Food Laboratory, Kolkata',
      technician: 'Dr. A. K. Banerjee',
      moisture: 18.9,
      hmf: 28.4,
      sucrose: 1.8,
      fgRatio: 1.06,
      c4Sugar: 'Negative (< 7%)',
      pollen: 'Wild Mangrove Aegiceras Pollen (>82%)',
      antibiotics: 'Not Detected (ND)',
      passed: true,
      fssaiStandard: 'FSSAI Standards for Honey & BIS IS 494:2022',
      txId: '0x8b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c'
    },
    packaging: null
  }
];

const SEED_BEEKEEPERS = [
  { id: 'BK-MH-042', name: 'Ramesh Patil', phone: '+91 98231 44521', cluster: 'Aligarh-Bharatpur', state: 'Maharashtra', hives: 20, boxes: 20, totalYieldKg: 1240, status: 'APPROVED', joinedDate: '2023-04-10' },
  { id: 'BK-UP-089', name: 'Vikram Solanke', phone: '+91 97120 55182', cluster: 'Terai Forest Corridor', state: 'Uttar Pradesh', hives: 15, boxes: 15, totalYieldKg: 890, status: 'APPROVED', joinedDate: '2023-08-15' },
  { id: 'BK-BR-112', name: 'Manoj Deshmukh', phone: '+91 94310 88291', cluster: 'Muzaffarpur Belt', state: 'Bihar', hives: 25, boxes: 25, totalYieldKg: 1650, status: 'APPROVED', joinedDate: '2024-01-20' },
  { id: 'BK-WB-055', name: 'Subhash Roy', phone: '+91 93320 11984', cluster: 'Sundarbans Reserve', state: 'West Bengal', hives: 18, boxes: 18, totalYieldKg: 1100, status: 'APPROVED', joinedDate: '2024-02-12' },
  { id: 'BK-RJ-104', name: 'Pooja Sharma', phone: '+91 94140 77312', cluster: 'Bharatpur Mustard Belt', state: 'Rajasthan', hives: 12, boxes: 12, totalYieldKg: 640, status: 'PENDING_VERIFICATION', joinedDate: '2025-01-05' },
  { id: 'BK-JK-023', name: 'Ghulam Rasool', phone: '+91 99060 22345', cluster: 'Kashmir Valley Acacia', state: 'Jammu & Kashmir', hives: 30, boxes: 30, totalYieldKg: 2100, status: 'APPROVED', joinedDate: '2022-11-01' }
];

const SEED_PRODUCTS = [
  {
    id: 'PROD-2026-001',
    productId: 'HC-P-2026-00000093821',
    qrCode: 'HC-P-2026-00000093821',
    batchId: 'HC-2025-0042',
    productName: '100% Pure Raw Mustard Blossom Honey',
    floralSource: 'Mustard Blossom Raw Honey',
    jarSize: '500g Amber Glass Jar',
    mrp: 450,
    packagedDate: '2025-01-22T14:20:00Z',
    expiryDate: '2027-01-22T14:20:00Z',
    manufacturer: 'KVIC Certified Honey Processing Unit #07, Mumbai',
    blockchainTxId: '0x7f8a92b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1',
    blockNumber: 1894210,
    status: 'IN_CIRCULATION'
  }
];

export const useHoneyStore = create(
  persist(
    (set, get) => ({
      batches: SEED_BATCHES,
      beekeepers: SEED_BEEKEEPERS,
      products: SEED_PRODUCTS,
      fraudAlerts: [
        { id: 'ALERT-01', batchId: 'HC-BAD-9999', reason: 'High C4 Sugar Adulteration Detected (24.2% > 7% limit)', detectedAt: '2025-02-10T11:00:00Z', status: 'BLOCKED' }
      ],
      auditLogs: [
        { id: 'LOG-01', action: 'BATCH_MINTED', entityId: 'HC-2025-0042', by: 'Ramesh Patil', timestamp: '2025-01-14T08:30:00Z' },
        { id: 'LOG-02', action: 'QC_CERTIFIED', entityId: 'HC-2025-0042', by: 'Dr. Meena Iyer', timestamp: '2025-01-18T11:45:00Z' },
        { id: 'LOG-03', action: 'BOTTLED_QR_MINTED', entityId: 'HC-P-2026-00000093821', by: 'KVIC Facility Mumbai', timestamp: '2025-01-22T14:20:00Z' }
      ],

      // Actions
      addHarvestBatch: (batchData) => {
        const timestamp = new Date().toISOString()
        const idNum = Math.floor(1000 + Math.random() * 9000)
        const batchId = `HC-2026-${idNum}`
        const newBatch = {
          id: batchId,
          batchId,
          status: 'PENDING_QC',
          harvestDate: timestamp,
          labTest: null,
          packaging: null,
          ...batchData
        }

        const newLog = {
          id: `LOG-${Date.now()}`,
          action: 'HARVEST_REGISTERED',
          entityId: batchId,
          by: batchData.beekeeperName || 'Beekeeper',
          timestamp
        }

        set((state) => ({
          batches: [newBatch, ...state.batches],
          auditLogs: [newLog, ...state.auditLogs]
        }))

        return newBatch
      },

      submitLabTest: (batchId, testData) => {
        const timestamp = new Date().toISOString()
        const rule = getHoneyRule(testData.floralSource || '')
        const moistureNum = parseFloat(testData.moisture || '17.5')
        const hmfNum = parseFloat(testData.hmf || '20')
        const sucroseNum = parseFloat(testData.sucrose || '2.0')
        const fgRatioNum = parseFloat(testData.fgRatio || '1.1')
        const c4Match = String(testData.c4Sugar || 'Negative').toLowerCase().includes('negative')

        const passed = moistureNum <= 20.0 && hmfNum <= 80.0 && sucroseNum <= 5.0 && fgRatioNum >= 0.95 && c4Match

        const txHash = '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')
        const certId = `CERT-FSSAI-${Date.now().toString().slice(-6)}`

        const labTestRecord = {
          certId,
          testedAt: timestamp,
          labName: testData.labName || 'National Bee Board Certified Quality Control Lab',
          technician: testData.technician || 'Quality Assurance Officer',
          moisture: moistureNum,
          hmf: hmfNum,
          sucrose: sucroseNum,
          fgRatio: fgRatioNum,
          c4Sugar: testData.c4Sugar || 'Negative (< 7% Adulteration Free)',
          pollen: testData.pollen || `${rule.botanicalName} Melissopalynology Verified`,
          antibiotics: testData.antibiotics || 'Not Detected (ND)',
          passed,
          fssaiStandard: 'FSSAI Honey Standards 2020 & BIS IS 494:2022',
          txId: txHash
        }

        set((state) => ({
          batches: state.batches.map((b) =>
            b.id === batchId || b.batchId === batchId
              ? {
                  ...b,
                  status: passed ? 'VERIFIED' : 'REJECTED',
                  labTest: labTestRecord
                }
              : b
          ),
          auditLogs: [
            {
              id: `LOG-${Date.now()}`,
              action: passed ? 'QC_PASSED_CERTIFIED' : 'QC_FAILED_REJECTED',
              entityId: batchId,
              by: testData.technician || 'Quality Lab',
              timestamp
            },
            ...state.auditLogs
          ]
        }))

        return labTestRecord
      },

      bottleProduct: (batchId, packagingData) => {
        const timestamp = new Date().toISOString()
        const randCode = '000000' + Math.floor(10000 + Math.random() * 90000)
        const qrCode = `HC-P-2026-${randCode.slice(-7)}`
        const txId = '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')
        const blockNumber = Math.floor(1890000 + Math.random() * 10000)

        const batch = get().batches.find((b) => b.id === batchId || b.batchId === batchId)

        const newProduct = {
          id: `PROD-${Date.now()}`,
          productId: qrCode,
          qrCode,
          batchId: batch?.batchId || batchId,
          productName: packagingData.productName || `Pure Raw ${batch?.floralSource || 'Indian'} Honey`,
          floralSource: batch?.floralSource || 'Raw Honey',
          jarSize: packagingData.jarSize || '500g Amber Glass Jar',
          mrp: packagingData.mrp || 480,
          packagedDate: timestamp,
          expiryDate: new Date(Date.now() + 730 * 24 * 60 * 60 * 1000).toISOString(),
          manufacturer: packagingData.facility || 'KVIC Honey Processing Unit #07, Mumbai',
          blockchainTxId: txId,
          blockNumber,
          status: 'IN_CIRCULATION'
        }

        set((state) => ({
          products: [newProduct, ...state.products],
          batches: state.batches.map((b) =>
            b.id === batchId || b.batchId === batchId
              ? {
                  ...b,
                  status: 'BOTTLED_VERIFIED',
                  packaging: {
                    packagedAt: timestamp,
                    facility: newProduct.manufacturer,
                    jarSize: newProduct.jarSize,
                    qrCode,
                    txId
                  }
                }
              : b
          ),
          auditLogs: [
            {
              id: `LOG-${Date.now()}`,
              action: 'BOTTLED_QR_MINTED',
              entityId: qrCode,
              by: newProduct.manufacturer,
              timestamp
            },
            ...state.auditLogs
          ]
        }))

        return newProduct
      },

      approveBeekeeper: (beekeeperId) => {
        set((state) => ({
          beekeepers: state.beekeepers.map((bk) =>
            bk.id === beekeeperId ? { ...bk, status: 'APPROVED' } : bk
          ),
          auditLogs: [
            {
              id: `LOG-${Date.now()}`,
              action: 'BEEKEEPER_APPROVED',
              entityId: beekeeperId,
              by: 'KVIC Admin',
              timestamp: new Date().toISOString()
            },
            ...state.auditLogs
          ]
        }))
      },

      rejectBeekeeper: (beekeeperId) => {
        set((state) => ({
          beekeepers: state.beekeepers.map((bk) =>
            bk.id === beekeeperId ? { ...bk, status: 'REJECTED' } : bk
          )
        }))
      },

      flagBatchFraud: (batchId, reason) => {
        const timestamp = new Date().toISOString()
        const alert = {
          id: `ALERT-${Date.now().toString().slice(-4)}`,
          batchId,
          reason,
          detectedAt: timestamp,
          status: 'FLAGGED'
        }
        set((state) => ({
          fraudAlerts: [alert, ...state.fraudAlerts],
          batches: state.batches.map((b) =>
            b.id === batchId || b.batchId === batchId
              ? { ...b, status: 'FRAUD_FLAGGED' }
              : b
          ),
          auditLogs: [
            {
              id: `LOG-${Date.now()}`,
              action: 'FRAUD_FLAGGED',
              entityId: batchId,
              by: 'KVIC Regulatory Audit',
              timestamp
            },
            ...state.auditLogs
          ]
        }))
      },

      getBatchByIdOrQr: (identifier) => {
        if (!identifier) return null
        const clean = String(identifier).trim()
        const state = get()

        // Match in products first
        const product = state.products.find(
          (p) => p.qrCode?.toLowerCase() === clean.toLowerCase() || p.productId?.toLowerCase() === clean.toLowerCase()
        )

        // Match in batches
        const batch = state.batches.find(
          (b) =>
            b.id?.toLowerCase() === clean.toLowerCase() ||
            b.batchId?.toLowerCase() === clean.toLowerCase() ||
            b.packaging?.qrCode?.toLowerCase() === clean.toLowerCase() ||
            (product && (b.id === product.batchId || b.batchId === product.batchId))
        )

        if (!batch && !product) return null

        return {
          batch: batch || {
            id: product.batchId,
            batchId: product.batchId,
            floralSource: product.floralSource,
            beekeeperName: 'Ramesh Patil',
            cluster: 'Aligarh-Bharatpur Migratory Belt',
            harvestDate: product.packagedDate,
            status: 'VERIFIED',
            lat: 27.2145,
            lng: 77.4921
          },
          product: product || batch?.packaging || null
        }
      }
    }),
    {
      name: 'beebuzz_honeytrace_storage'
    }
  )
)
