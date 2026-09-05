import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Eye, EyeOff, Loader2 } from 'lucide-react'
import { useAuthStore } from '../store/authStore'

import beebuzzLogo from '../assets/beebuzz-logo-transparent.png'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'

// Role to path mapping - auto-detected from backend response
const rolePathMap = {
  Admin: '/admin',
  admin: '/admin',
  Farmer: '/beekeeper',
  farmer: '/beekeeper',
  Beekeeper: '/beekeeper',
  beekeeper: '/beekeeper',
  Lab: '/lab',
  lab: '/lab',
  Laboratory: '/lab',
  laboratory: '/lab',
  Manufacturer: '/manufacturer',
  manufacturer: '/manufacturer',
  Processor: '/manufacturer',
  processor: '/manufacturer',
  Consumer: '/',
  consumer: '/'
}

const SignInModal = ({ isOpen, onClose, onSwitchToSignUp }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { login: setAuthLogin } = useAuthStore()

  const handleChange = (event) => {
    const { name, value } = event.target
    setCredentials((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: credentials.username,
          password: credentials.password
        })
      })

      const result = await response.json()
      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Login failed')
      }

      const loggedInRole = result?.data?.user?.role
      if (!loggedInRole) {
        throw new Error('Unable to determine user role')
      }

      const normalizedRole = loggedInRole.toLowerCase() === 'farmer' ? 'beekeeper' : loggedInRole.toLowerCase()
      const targetPath = rolePathMap[loggedInRole] || rolePathMap[normalizedRole] || '/'

      // Store in localStorage for all token conventions
      localStorage.setItem('beebuzz_token', result.data.token)
      localStorage.setItem('herbaltrace_token', result.data.token)
      localStorage.setItem('auth_token', result.data.token)
      localStorage.setItem('herbaltrace_user', JSON.stringify({
        stakeholderType: loggedInRole,
        userId: result?.data?.user?.userId || result?.data?.user?.id,
        username: result?.data?.user?.username,
        fullName: result?.data?.user?.fullName,
        email: result?.data?.user?.email,
        role: loggedInRole,
        isLoggedIn: true
      }))

      // Update Zustand Auth Store
      if (setAuthLogin) {
        setAuthLogin(result.data.user, result.data.token)
      }

      handleClose()
      navigate(targetPath)
    } catch (err) {
      setError(err.message || 'Unable to sign in')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    onClose()
    setCredentials({ username: '', password: '' })
    setShowPassword(false)
    setError('')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/50 backdrop-blur-md px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            className="relative w-full max-w-md"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 220, damping: 25 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="bg-[#FFF8EC] rounded-3xl border border-[#EAD7C5] shadow-2xl overflow-hidden text-[#6b2a06]">
              {/* Header */}
              <div className="relative flex items-center justify-between px-6 py-5 bg-[#FFF8EC]">
                <h2 className="text-2xl font-black font-heading text-[#6b2a06]">Sign In</h2>
                <button
                  type="button"
                  onClick={handleClose}
                  className="p-2 rounded-full text-[#8c5e3c] hover:bg-honey-100 hover:text-[#6b2a06] transition-colors relative z-10"
                  aria-label="Close sign in form"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Divider line with organic transparent bee honeycomb sitting on the right */}
              <div className="relative w-full border-b border-[#EAD7C5]">
                <div className="absolute right-4 -top-5 pointer-events-none select-none z-10">
                  <img
                    src={beebuzzLogo}
                    alt="Bee illustration"
                    className="w-12 h-auto object-contain drop-shadow-sm"
                  />
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="px-6 py-6 space-y-5 bg-white">
                {/* Username / User ID */}
                <label className="flex flex-col space-y-2 text-sm font-bold text-[#6b2a06]">
                  <span>
                    Username / User ID<span className="text-red-500"> *</span>
                  </span>
                  <input
                    type="text"
                    name="username"
                    value={credentials.username}
                    onChange={handleChange}
                    placeholder="Enter your username or user ID"
                    required
                    className="w-full rounded-xl border border-[#EAD7C5] bg-[#FFF8EC]/60 px-4 py-3 text-[#6b2a06] placeholder-gray-400 focus:border-honey-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-honey-200 text-sm font-medium"
                  />
                </label>

                {/* Password */}
                <label className="flex flex-col space-y-2 text-sm font-bold text-[#6b2a06]">
                  <span>
                    Password<span className="text-red-500"> *</span>
                  </span>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={credentials.password}
                      onChange={handleChange}
                      placeholder="Enter Password"
                      required
                      className="w-full rounded-xl border border-[#EAD7C5] bg-[#FFF8EC]/60 px-4 py-3 pr-12 text-[#6b2a06] placeholder-gray-400 focus:border-honey-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-honey-200 text-sm font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute inset-y-0 right-3 flex items-center text-[#8c5e3c] hover:text-[#6b2a06]"
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </label>

                {error && (
                  <p className="text-xs font-semibold text-red-600 bg-red-50 border border-red-200 rounded-xl px-3.5 py-2.5">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-honey-500 hover:bg-honey-600 text-white font-bold text-sm shadow-md shadow-honey-500/25 transition-all flex items-center justify-center disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    'Sign in'
                  )}
                </button>

                <p className="text-xs text-center text-[#8c5e3c] font-medium pt-1">
                  New to BeeBuzz?{' '}
                  <button
                    type="button"
                    className="text-honey-600 font-bold hover:underline"
                    onClick={() => {
                      handleClose()
                      onSwitchToSignUp()
                    }}
                  >
                    Create an account
                  </button>
                </p>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default SignInModal
