/**
 * @typedef {'beekeeper' | 'admin' | 'lab' | 'consumer'} Role
 *
 * @typedef {Object} Profile
 * @property {string} id
 * @property {string} name
 * @property {string} phone
 * @property {Role} role
 * @property {string} [village]
 * @property {string} [cluster]
 *
 * @typedef {Object} Hive
 * @property {string} id
 * @property {string} name
 * @property {'healthy' | 'warning' | 'critical'} status
 * @property {number} tempC
 * @property {number} humidity
 * @property {number} weightKg
 * @property {number[]} sparkline
 * @property {string} location
 *
 * @typedef {Object} HiveReading
 * @property {{ t: string, v: number }[]} temperature
 * @property {{ t: string, v: number }[]} humidity
 * @property {{ t: string, v: number }[]} weight
 *
 * @typedef {Object} DiseaseDetection
 * @property {string} name
 * @property {number} probability
 *
 * @typedef {Object} HiveHealth
 * @property {number} score
 * @property {string} label
 * @property {DiseaseDetection[]} diseases
 * @property {{ kg: number, weeks: number, confidence: number }} forecast
 * @property {{ label: string, kg: number }[]} pastYields
 *
 * @typedef {Object} Alert
 * @property {string} id
 * @property {string} hiveId
 * @property {'danger' | 'warning' | 'info'} severity
 * @property {string} message
 * @property {string} createdAt
 *
 * @typedef {Object} Batch
 * @property {string} batchId
 * @property {string} honeyType
 * @property {number} quantityKg
 * @property {string} date
 * @property {string} status
 * @property {number} scanCount
 *
 * @typedef {Object} MintResponse
 * @property {string} batchId
 * @property {string} txHash
 * @property {number} blockNumber
 * @property {string} network
 * @property {string} timestamp
 * @property {string} qrCodeUrl
 * @property {string} verifyUrl
 *
 * @typedef {Object} TimelineStep
 * @property {string} step
 * @property {string} title
 * @property {string} timestamp
 * @property {string} detail
 * @property {string} icon
 *
 * @typedef {Object} VerifyResponse
 * @property {'verified' | 'tampered' | 'not_found'} status
 * @property {{ honeyType: string, weightKg: number, season: string }} product
 * @property {TimelineStep[]} timeline
 * @property {{ name: string, village: string, since: string, cluster: string }} beekeeper
 * @property {{ txHash: string, blockNumber: number, network: string, timestamp: string }} proof
 * @property {number} scanCount
 * @property {string} lastVerifiedAt
 *
 * @typedef {Object} LabPendingBatch
 * @property {string} batchId
 * @property {string} honeyType
 * @property {string} harvestDate
 * @property {string} beekeeperName
 * @property {string} village
 * @property {string} status
 *
 * @typedef {Object} AdminStats
 * @property {number} beekeepers
 * @property {number} activeHives
 * @property {number} batchesMinted
 * @property {number} consumerScans
 * @property {number} fraudAlerts
 *
 * @typedef {Object} Cluster
 * @property {string} name
 * @property {number} beekeepers
 * @property {number} hives
 * @property {number} batches
 *
 * @typedef {Object} Activity
 * @property {'minted' | 'verified' | 'tested'} type
 * @property {string} detail
 * @property {string} timestamp
 *
 * @typedef {Object} BeekeeperAdmin
 * @property {string} id
 * @property {string} name
 * @property {string} village
 * @property {string} phone
 * @property {number} hives
 * @property {number} batches
 * @property {'Verified' | 'Pending'} status
 */
