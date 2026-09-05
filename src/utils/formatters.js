/**
 * Format a date string to a readable format
 * @param {string} dateStr
 * @returns {string}
 */
export function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

/**
 * Format a date string to relative time
 * @param {string} dateStr
 * @returns {string}
 */
export function timeAgo(dateStr) {
  if (!dateStr) return ''
  const now = Date.now()
  const then = new Date(dateStr).getTime()
  const diff = Math.floor((now - then) / 1000)

  if (diff < 60) return 'just now'
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`
  return formatDate(dateStr)
}

/**
 * Format weight in kg
 * @param {number} kg
 * @returns {string}
 */
export function formatKg(kg) {
  return `${kg.toFixed(1)} kg`
}

/**
 * Format currency in INR
 * @param {number} amount
 * @returns {string}
 */
export function formatINR(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

/**
 * Truncate a blockchain tx hash for display
 * @param {string} hash
 * @param {number} chars
 * @returns {string}
 */
export function truncateHash(hash, chars = 8) {
  if (!hash) return ''
  return `${hash.slice(0, chars)}...${hash.slice(-chars)}`
}

/**
 * Simulate API delay
 * @param {number} ms
 * @returns {Promise<void>}
 */
export function delay(ms = 400) {
  return new Promise((resolve) => setTimeout(resolve, ms + Math.random() * 400))
}
