import { Link } from 'react-router-dom'
import Badge from '../ui/Badge'
import { formatDate } from '../../utils/formatters'

const statusBadge = {
  'On-chain ✓': 'success',
  'Quality Verified': 'success',
  'Pending test': 'warning',
  'Transferred': 'info',
  'Tampered': 'danger',
}

export default function BatchRow({ batch, showLink = true }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-charcoal-100 last:border-0">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm font-semibold text-charcoal-800">{batch.batchId}</span>
          <Badge variant={statusBadge[batch.status] || 'neutral'}>{batch.status}</Badge>
        </div>
        <p className="text-xs text-charcoal-400 mt-0.5">
          {batch.honeyType} · {batch.quantityKg} kg · {formatDate(batch.date)}
        </p>
      </div>
      {showLink && (
        <Link to={`/verify/${batch.batchId}`} className="text-xs font-semibold text-honey-600 hover:text-honey-700 ml-4 whitespace-nowrap">
          View →
        </Link>
      )}
    </div>
  )
}
