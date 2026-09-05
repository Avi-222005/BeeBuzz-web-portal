import React from 'react'
import beebuzzLogo from '../../assets/beebuzz-logo-transparent.png'

export default function Logo({ size = 'md', light = false, showText = true }) {
  const sizes = {
    sm: 'h-8 w-auto',
    md: 'h-10 w-auto',
    lg: 'h-14 w-auto',
  }

  return (
    <div className="flex items-center gap-2.5">
      <img
        src={beebuzzLogo}
        alt="BeeBuzz Logo"
        className={`${sizes[size]} object-contain drop-shadow-sm select-none`}
      />
      {showText && (
        <span className={`font-heading font-black text-xl tracking-tight ${light ? 'text-white' : 'text-[#6b2a06]'}`}>
          Bee<span className="text-honey-400">Buzz</span>
        </span>
      )}
    </div>
  )
}
