import { useEffect, useRef, useState } from 'react'
import { Html5Qrcode } from 'html5-qrcode'
import { Camera, Keyboard, AlertTriangle } from 'lucide-react'
import Button from '../ui/Button'
import { useNavigate } from 'react-router-dom'

export default function ScanFrame() {
  const navigate = useNavigate()
  const [mode, setMode] = useState('camera') // camera | manual
  const [manualId, setManualId] = useState('')
  const [error, setError] = useState(null)
  const scannerRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    if (mode !== 'camera') return

    const scanner = new Html5Qrcode('qr-reader')
    scannerRef.current = scanner

    scanner.start(
      { facingMode: 'environment' },
      { fps: 10, qrbox: { width: 250, height: 250 } },
      (decodedText) => {
        const batchId = decodedText.split('/').pop()
        scanner.stop().catch(() => {})
        navigate(`/verify/${batchId}`)
      },
      () => {}
    ).catch((err) => {
      setError('Camera access denied or not available')
      setMode('manual')
    })

    return () => {
      scanner.stop().catch(() => {})
      scanner.clear().catch(() => {})
    }
  }, [mode, navigate])

  const handleManualSubmit = (e) => {
    e.preventDefault()
    if (manualId.trim()) navigate(`/verify/${manualId.trim()}`)
  }

  return (
    <div className="max-w-md mx-auto">
      {mode === 'camera' && !error && (
        <div className="relative rounded-card overflow-hidden border-2 border-honey-300">
          <div id="qr-reader" ref={containerRef} />
          {/* Hexagon overlay */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="w-56 h-56 border-2 border-honey-500/50 rounded-3xl" />
          </div>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-200 rounded-card mb-4">
          <AlertTriangle className="h-5 w-5 text-honey-600" />
          <p className="text-sm text-amber-800">{error}</p>
        </div>
      )}

      <div className="flex gap-2 mb-4">
        <Button variant={mode === 'camera' ? 'primary' : 'secondary'} size="sm" onClick={() => { setMode('camera'); setError(null) }}>
          <Camera className="h-4 w-4 mr-1" /> Camera
        </Button>
        <Button variant={mode === 'manual' ? 'primary' : 'secondary'} size="sm" onClick={() => setMode('manual')}>
          <Keyboard className="h-4 w-4 mr-1" /> Enter Manually
        </Button>
      </div>

      {mode === 'manual' && (
        <form onSubmit={handleManualSubmit} className="flex gap-2">
          <input
            type="text"
            value={manualId}
            onChange={(e) => setManualId(e.target.value)}
            placeholder="e.g. HC-2025-0042"
            className="input flex-1 font-mono"
          />
          <Button type="submit">Verify</Button>
        </form>
      )}

      <button onClick={() => navigate('/verify/HC-2025-0042')} className="mt-4 w-full text-center text-sm text-honey-600 hover:text-honey-700 font-medium">
        Try demo: HC-2025-0042
      </button>
    </div>
  )
}
