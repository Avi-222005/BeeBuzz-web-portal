export default function StepWizard({ steps, currentStep }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {steps.map((label, i) => {
        const active = i === currentStep
        const done = i < currentStep
        return (
          <div key={i} className="flex items-center gap-2 flex-1">
            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
              done ? 'bg-success text-white' : active ? 'bg-honey-500 text-white' : 'bg-charcoal-100 text-charcoal-400'
            }`}>
              {done ? '✓' : i + 1}
            </div>
            <span className={`text-xs font-medium hidden sm:inline ${active ? 'text-charcoal-800' : 'text-charcoal-400'}`}>{label}</span>
            {i < steps.length - 1 && <div className={`flex-1 h-0.5 ${done ? 'bg-success' : 'bg-charcoal-100'}`} />}
          </div>
        )
      })}
    </div>
  )
}
