import { Outlet, Link, useLocation } from 'react-router-dom'
import { Menu, X, ArrowRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Logo from './Logo'
import Toast from '../ui/Toast'
import SignInModal from '../SignInModal'
import SignUpModal from '../SignUpModal'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/offering', label: 'Offering' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact' },
]

export default function PublicLayout() {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hoveredPath, setHoveredPath] = useState(null)
  const [isSignInOpen, setIsSignInOpen] = useState(false)
  const [isSignUpOpen, setIsSignUpOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Listen for custom trigger events from any child page
  useEffect(() => {
    const handleOpenSignIn = () => {
      setIsSignUpOpen(false)
      setIsSignInOpen(true)
    }
    const handleOpenSignUp = () => {
      setIsSignInOpen(false)
      setIsSignUpOpen(true)
    }

    window.addEventListener('open_signin_modal', handleOpenSignIn)
    window.addEventListener('open_signup_modal', handleOpenSignUp)
    return () => {
      window.removeEventListener('open_signin_modal', handleOpenSignIn)
      window.removeEventListener('open_signup_modal', handleOpenSignUp)
    }
  }, [])

  return (
    <div className="min-h-screen bg-honey-50 flex flex-col text-[#6b2a06]">
      {/* Navbar */}
      <header className={`sticky top-0 z-40 transition-all duration-200 border-b ${
        scrolled ? 'bg-[#FFF8EC]/95 backdrop-blur-md shadow-sm border-[#EAD7C5]' : 'bg-honey-50/80 backdrop-blur-sm border-transparent'
      }`}>
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between py-2">
          {/* Logo on top-left */}
          <Link to="/" className="flex items-center gap-2">
            <Logo size="md" />
          </Link>

          {/* Desktop Nav with Moving Honey Hover & Dripping Effect */}
          <nav
            onMouseLeave={() => setHoveredPath(null)}
            className="relative hidden md:flex items-center gap-1 p-1.5 rounded-full border border-[#EAD7C5] bg-white/80 shadow-sm"
          >
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to
              const isHovered = hoveredPath === link.to

              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onMouseEnter={() => setHoveredPath(link.to)}
                  className={`relative px-4 py-1.5 rounded-full text-sm font-bold transition-colors duration-200 z-10 ${
                    isActive && !hoveredPath
                      ? 'text-white'
                      : isHovered
                      ? 'text-white'
                      : 'text-[#6b2a06] hover:text-[#421702]'
                  }`}
                >
                  {/* Active background pill when not hovering */}
                  {isActive && !hoveredPath && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 rounded-full bg-[#6b2a06] shadow-sm -z-10"
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                    />
                  )}

                  {/* Active subtle indicator while hovering another link */}
                  {isActive && hoveredPath && (
                    <div className="absolute inset-0 rounded-full bg-[#6b2a06]/10 -z-10" />
                  )}

                  {/* Moving dynamic honey pill with dripping honey droplets */}
                  {isHovered && (
                    <motion.div
                      layoutId="hoverHoneyPill"
                      className="absolute inset-0 rounded-full bg-honey-500 shadow-md shadow-honey-500/25 -z-10"
                      transition={{ type: 'spring', stiffness: 500, damping: 32 }}
                    >
                      {/* Single organic honey drip hanging cleanly from the bottom center */}
                      <motion.svg
                        initial={{ scaleY: 0.2, opacity: 0 }}
                        animate={{ scaleY: 1, opacity: 1 }}
                        exit={{ scaleY: 0, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 450, damping: 20 }}
                        viewBox="0 0 24 16"
                        className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-3.5 text-honey-500 pointer-events-none fill-current origin-top drop-shadow-sm"
                      >
                        <path d="M4,0 C5.5,0 7,2 8,4.5 C9,7 9.5,9.5 9.5,11 C9.5,13.5 10.5,15.5 12,15.5 C13.5,15.5 14.5,13.5 14.5,11 C14.5,9.5 15,7 16,4.5 C17,2 18.5,0 20,0 Z" />
                        <circle cx="12" cy="11.5" r="1.3" fill="white" opacity="0.8" />
                      </motion.svg>
                    </motion.div>
                  )}

                  <span className="relative z-10">{link.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* Action buttons: Sign In & Sign Up in-place glass modals */}
          <div className="hidden md:flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsSignInOpen(true)}
              className="px-5 py-2.5 rounded-btn text-sm font-bold border border-[#6b2a06] text-[#6b2a06] hover:bg-[#6b2a06] hover:text-white transition-all shadow-sm"
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setIsSignUpOpen(true)}
              className="px-5 py-2.5 rounded-btn text-sm font-bold bg-honey-500 hover:bg-honey-600 text-white shadow-md shadow-honey-500/20 transition-all flex items-center gap-1.5"
            >
              <span>Sign Up</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-[#6b2a06] hover:bg-honey-100 rounded-lg"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden border-t border-[#EAD7C5] bg-[#FFF8EC] px-4 py-4 space-y-2 shadow-lg">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-2.5 rounded-lg text-sm font-bold transition-colors ${
                  location.pathname === link.to
                    ? 'text-white bg-[#6b2a06]'
                    : 'text-[#6b2a06] hover:bg-honey-100'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-3 pt-3 border-t border-[#EAD7C5]">
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false)
                  setIsSignInOpen(true)
                }}
                className="px-4 py-2 text-center rounded-btn text-sm font-bold border border-[#6b2a06] text-[#6b2a06] hover:bg-[#6b2a06] hover:text-white flex-1"
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false)
                  setIsSignUpOpen(true)
                }}
                className="px-4 py-2 text-center rounded-btn text-sm font-bold bg-honey-500 text-white hover:bg-honey-600 flex-1"
              >
                Sign Up
              </button>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        <Outlet context={{ openSignIn: () => setIsSignInOpen(true), openSignUp: () => setIsSignUpOpen(true) }} />
      </main>

      {/* In-Place Frosted Glass Authentication Modals */}
      <SignInModal
        isOpen={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
        onSwitchToSignUp={() => {
          setIsSignInOpen(false)
          setIsSignUpOpen(true)
        }}
      />

      <SignUpModal
        isOpen={isSignUpOpen}
        onClose={() => setIsSignUpOpen(false)}
        onSwitchToSignIn={() => {
          setIsSignUpOpen(false)
          setIsSignInOpen(true)
        }}
      />

      {/* Footer */}
      <footer className="bg-[#3d1702] text-honey-100 border-t border-[#6b2a06]">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="font-heading font-black text-2xl text-honey-300">
                  Bee<span className="text-honey-500">Buzz</span>
                </span>
              </div>
              <p className="text-sm text-honey-200/80 leading-relaxed">
                National Honey Mission — Traceability from Migratory Apiaries to Serialized Consumer Jars.
              </p>
            </div>
            {/* Quick Links */}
            <div>
              <h4 className="text-xs font-bold text-honey-400 uppercase tracking-wider mb-3">Navigation</h4>
              <div className="space-y-2">
                <Link to="/" className="block text-sm text-honey-200/80 hover:text-honey-400 transition-colors">Home</Link>
                <Link to="/offering" className="block text-sm text-honey-200/80 hover:text-honey-400 transition-colors">Offering</Link>
                <Link to="/about" className="block text-sm text-honey-200/80 hover:text-honey-400 transition-colors">About Us</Link>
                <Link to="/contact" className="block text-sm text-honey-200/80 hover:text-honey-400 transition-colors">Contact</Link>
              </div>
            </div>
            {/* Portals */}
            <div>
              <h4 className="text-xs font-bold text-honey-400 uppercase tracking-wider mb-3">Portals</h4>
              <div className="space-y-2">
                <Link to="/beekeeper" className="block text-sm text-honey-200/80 hover:text-honey-400 transition-colors">Beekeeper Dashboard</Link>
                <Link to="/lab" className="block text-sm text-honey-200/80 hover:text-honey-400 transition-colors">Laboratory QC Portal</Link>
                <Link to="/manufacturer" className="block text-sm text-honey-200/80 hover:text-honey-400 transition-colors">Manufacturer Bottling & QR</Link>
                <Link to="/admin" className="block text-sm text-honey-200/80 hover:text-honey-400 transition-colors">KVIC Regulatory Admin</Link>
              </div>
            </div>
            {/* Contact */}
            <div>
              <h4 className="text-xs font-bold text-honey-400 uppercase tracking-wider mb-3">KVIC Mission Office</h4>
              <div className="space-y-2 text-sm text-honey-200/80">
                <p>Khadi & Village Industries Commission</p>
                <p>Gramodaya, 3 Irla Road, Vile Parle (W), Mumbai</p>
                <p>support@beebuzz.gov.in</p>
                <p>Toll-Free: 1800 123 5899</p>
              </div>
            </div>
          </div>
          <div className="border-t border-[#6b2a06]/60 mt-8 pt-6 text-center">
            <p className="text-xs text-honey-300/60">
              © {new Date().getFullYear()} BeeBuzz HoneyTrace Platform. Ministry of Micro, Small and Medium Enterprises (MSME), Government of India.
            </p>
          </div>
        </div>
      </footer>
      <Toast />
    </div>
  )
}
