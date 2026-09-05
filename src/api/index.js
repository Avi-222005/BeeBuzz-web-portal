import { mockApi } from './mock/mockApi.js'
import { realApi } from './realApi.js'

const useMock = import.meta.env.VITE_USE_MOCK === 'true'

/**
 * The single API entry point for all screens.
 * When VITE_USE_MOCK=false, all calls originate from Hyperledger Fabric / SQLite event sync.
 */
const api = useMock ? mockApi : realApi

export default api
