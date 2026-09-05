import { CheckCircle, XCircle, ShieldCheck } from 'lucide-react'

export default function VerifyBanner({ status, scanCount, lastVerifiedAt }) {
  const isVerified = status === 'verified'

  return (
    <div className={`rounded-card p-8 text-center ${isVerified ? 'bg-gradient-to-br from-green-500 to-green-600' : 'bg-gradient-to-br from-red-500 to-red-600'} text-white`}>
      <div className="flex justify-center mb-4">
        {isVerified ? (
          <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
            <CheckCircle className="h-12 w-12" />
          </div>
        ) : (
          <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
            <XCircle className="h-12 w-12" />
          </div>
        )}
      </div>
      <h2 className="text-2xl font-bold font-heading">
        {isVerified ? 'Verified Authentic' : 'Verification Failed'}
      </h2>
      <p className="text-sm mt-2 opacity-90">
        {isVerified
          ? 'This honey batch is registered on the BeeBuzz ledger'
          : 'This batch ID does not exist on the ledger or has been reported tampered'}
      </p>
      {isVerified && scanCount > 0 && (
        <div className="flex items-center justify-center gap-2 mt-4 text-sm opacity-80">
          <ShieldCheck className="h-4 w-4" />
          <span>Verified {scanCount} times · Last verified {lastVerifiedAt ? 'recently' : 'never'}</span>
        </div>
      )}
    </div>
  )
}
