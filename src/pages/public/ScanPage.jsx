import ScanFrame from '../../components/domain/ScanFrame'

export default function ScanPage() {
  return (
    <div className="page-container">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold font-heading text-charcoal-800">Scan QR Code</h1>
        <p className="text-sm text-charcoal-500 mt-1">Point your camera at the QR code on the honey jar</p>
      </div>
      <ScanFrame />
    </div>
  )
}
