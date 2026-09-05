import { Link } from 'lucide-react'
import { truncateHash } from '../../utils/formatters'
import { useState } from 'react'
import { useToastStore } from '../../store/toastStore'

export default function ProofBox({ txHash, blockNumber, network, timestamp }) {
  const { addToast } = useToastStore()
  const [copied, setCopied] = useState(false)

  const copyHash = async () => {
    await navigator.clipboard.writeText(txHash)
    setCopied(true)
    addToast('Tx hash copied!')
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-charcoal-800 text-charcoal-200 rounded-card p-4">
      <div className="flex items-center gap-2 mb-3">
        <Link className="h-4 w-4 text-honey-400" />
        <span className="section-label text-charcoal-400">On-Chain Proof</span>
      </div>
      <div className="space-y-2 font-mono text-sm">
        <div className="flex justify-between items-center">
          <span className="text-charcoal-400">Tx Hash</span>
          <button onClick={copyHash} className="flex items-center gap-1.5 text-honey-400 hover:text-honey-300 transition-colors">
            <span>{truncateHash(txHash)}</span>
            <span className="text-[10px]">{copied ? '✓' : '⧉'}</span>
          </button>
        </div>
        <div className="flex justify-between">
          <span className="text-charcoal-400">Block</span>
          <span>#{blockNumber?.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-charcoal-400">Network</span>
          <span className="text-honey-400">{network}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-charcoal-400">Timestamp</span>
          <span>{new Date(timestamp).toLocaleString('en-IN')}</span>
        </div>
      </div>
      <a href={`https://amoy.polygonscan.com/tx/${txHash}`} target="_blank" rel="noopener noreferrer" className="mt-3 block text-center text-xs text-honey-400 hover:text-honey-300 transition-colors">
        View on Explorer →
      </a>
    </div>
  )
}
