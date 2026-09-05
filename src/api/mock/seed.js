/** @type {import('../types').Hive[]} */
export const hives = [
  { id: 'Hive-01', name: 'Lakshmi', status: 'healthy', tempC: 34.2, humidity: 62, weightKg: 38.5, sparkline: [34, 35, 34, 36, 35, 34, 34], location: 'Jawhar, Palghar' },
  { id: 'Hive-02', name: 'Saraswati', status: 'healthy', tempC: 33.8, humidity: 65, weightKg: 35.2, sparkline: [33, 34, 33, 34, 35, 34, 34], location: 'Jawhar, Palghar' },
  { id: 'Hive-03', name: 'Gauri', status: 'warning', tempC: 36.1, humidity: 58, weightKg: 30.1, sparkline: [35, 36, 37, 36, 36, 36, 36], location: 'Jawhar, Palghar' },
  { id: 'Hive-04', name: 'Parvati', status: 'healthy', tempC: 33.5, humidity: 68, weightKg: 41.8, sparkline: [33, 34, 33, 34, 33, 33, 34], location: 'Jawhar, Palghar' },
  { id: 'Hive-05', name: 'Durga', status: 'healthy', tempC: 34.0, humidity: 60, weightKg: 36.7, sparkline: [34, 33, 34, 35, 34, 34, 34], location: 'Mokhada, Palghar' },
  { id: 'Hive-06', name: 'Kali', status: 'critical', tempC: 37.8, humidity: 55, weightKg: 22.3, sparkline: [36, 37, 38, 38, 37, 38, 38], location: 'Mokhada, Palghar' },
]

/** @type {import('../types').Alert[]} */
export const alerts = [
  { id: 'ALT-001', hiveId: 'Hive-06', severity: 'danger', message: 'Hive-06: Sound frequency + temp pattern suggests Varroa mite risk. Inspect within 48 hours.', createdAt: '2025-09-10T08:30:00Z' },
  { id: 'ALT-002', hiveId: 'Hive-03', severity: 'warning', message: 'Hive-03: Weight dropped 1.2 kg overnight — check for robbing or rain damage.', createdAt: '2025-09-09T14:15:00Z' },
  { id: 'ALT-003', hiveId: 'Hive-05', severity: 'info', message: 'Hive-05: Honey flow strong. Consider harvest within 5 days for peak moisture.', createdAt: '2025-09-08T09:00:00Z' },
]

/** @type {import('../types').Batch[]} */
export const batches = [
  { batchId: 'HC-P-2026-00000093821', honeyType: 'Mustard Raw Blossom Honey', quantityKg: 500.0, date: '2026-09-04T10:00:00Z', status: 'Quality Verified', scanCount: 1 },
  { batchId: 'HC-2025-0042', honeyType: 'Wildflower Honey', quantityKg: 12.5, date: '2025-08-15T10:00:00Z', status: 'Quality Verified', scanCount: 142 },
  { batchId: 'HC-2025-0038', honeyType: 'Litchi Honey', quantityKg: 8.3, date: '2025-07-22T09:30:00Z', status: 'On-chain ✓', scanCount: 87 },
  { batchId: 'HC-2025-0035', honeyType: 'Jamun Honey', quantityKg: 15.0, date: '2025-07-10T11:00:00Z', status: 'Quality Verified', scanCount: 203 },
  { batchId: 'HC-2025-0031', honeyType: 'Karanj Honey', quantityKg: 6.7, date: '2025-06-28T08:00:00Z', status: 'Pending test', scanCount: 12 },
  { batchId: 'HC-BAD-9999', honeyType: 'Coriander Honey', quantityKg: 10.0, date: '2025-06-15T07:00:00Z', status: 'Tampered', scanCount: 0 },
]

/** @type {import('../types').BeekeeperAdmin[]} */
export const beekeepers = [
  { id: 'BK-001', name: 'Ramesh Patil', village: 'Jawhar', phone: '9876543210', hives: 4, batches: 3, status: 'Verified' },
  { id: 'BK-002', name: 'Suresh Gowda', village: 'Mokhada', phone: '9876543211', hives: 2, batches: 2, status: 'Verified' },
  { id: 'BK-003', name: 'Anil Jadhav', village: 'Dahanu', phone: '9876543212', hives: 3, batches: 1, status: 'Verified' },
  { id: 'BK-004', name: 'Prakash More', village: 'Vikramgad', phone: '9876543213', hives: 5, batches: 4, status: 'Verified' },
  { id: 'BK-005', name: 'Sanjay Koli', village: 'Jawhar', phone: '9876543214', hives: 2, batches: 0, status: 'Pending' },
  { id: 'BK-006', name: 'Deepak Shirke', village: 'Mokhada', phone: '9876543215', hives: 1, batches: 0, status: 'Pending' },
  { id: 'BK-007', name: 'Manoj Deshmukh', village: 'Dahanu', phone: '9876543216', hives: 3, batches: 2, status: 'Verified' },
  { id: 'BK-008', name: 'Vikram Solanke', village: 'Vikramgad', phone: '9876543217', hives: 4, batches: 3, status: 'Verified' },
]

/** @type {import('../types').Cluster[]} */
export const clusters = [
  { name: 'Jawhar', beekeepers: 3, hives: 8, batches: 5 },
  { name: 'Mokhada', beekeepers: 2, hives: 5, batches: 3 },
  { name: 'Dahanu', beekeepers: 2, hives: 6, batches: 3 },
  { name: 'Vikramgad', beekeepers: 2, hives: 9, batches: 7 },
]

/** @type {import('../types').Activity[]} */
export const activity = [
  { type: 'minted', detail: 'Ramesh Patil minted HC-2025-0042 — Wildflower Honey 12.5 kg', timestamp: '2025-08-15T10:00:00Z' },
  { type: 'verified', detail: 'Consumer verified HC-2025-0042 — scan #142', timestamp: '2025-09-08T14:30:00Z' },
  { type: 'tested', detail: 'Lab verified HC-2025-0035 — Jamun Honey passed NMR', timestamp: '2025-07-12T11:00:00Z' },
  { type: 'minted', detail: 'Prakash More minted HC-2025-0038 — Litchi Honey 8.3 kg', timestamp: '2025-07-22T09:30:00Z' },
  { type: 'verified', detail: 'Consumer verified HC-2025-0035 — scan #203', timestamp: '2025-09-07T16:00:00Z' },
]

/** @type {import('../types').LabPendingBatch[]} */
export const labPendingBatches = [
  { batchId: 'HC-2025-0031', honeyType: 'Karanj Honey', harvestDate: '2025-06-28', beekeeperName: 'Anil Jadhav', village: 'Dahanu', status: 'Pending Test' },
  { batchId: 'HC-2025-0045', honeyType: 'Coriander Honey', harvestDate: '2025-09-01', beekeeperName: 'Vikram Solanke', village: 'Vikramgad', status: 'Pending Test' },
  { batchId: 'HC-2025-0048', honeyType: 'Wildflower Honey', harvestDate: '2025-09-05', beekeeperName: 'Manoj Deshmukh', village: 'Dahanu', status: 'Pending Test' },
]

export const labCompletedTests = [
  { batchId: 'HC-2025-0042', honeyType: 'Wildflower Honey', moisturePct: 17.2, purityPct: 98.5, hmf: 8.3, nmrResult: 'Pass', testedAt: '2025-08-16T10:00:00Z' },
  { batchId: 'HC-2025-0035', honeyType: 'Jamun Honey', moisturePct: 18.1, purityPct: 97.8, hmf: 12.1, nmrResult: 'Pass', testedAt: '2025-07-11T11:00:00Z' },
]
