import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, User, KeyRound, ShieldCheck, Check, Eye, EyeOff, Loader2, Edit3, Save } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { useToastStore } from '../../store/toastStore'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'

export default function ProfileModal({ isOpen, initialTab = 'profile', onClose }) {
  const { profile, role, updateProfile } = useAuthStore()
  const { addToast } = useToastStore()
  const [activeSubTab, setActiveSubTab] = useState(initialTab)

  // Name Edit State
  const [isEditingName, setIsEditingName] = useState(false)
  const [nameInput, setNameInput] = useState(profile?.name || 'Priya Desai')

  useEffect(() => {
    setActiveSubTab(initialTab)
    setNameInput(profile?.name || 'Priya Desai')
  }, [initialTab, profile?.name, isOpen])

  // Password Change State
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [passwordError, setPasswordError] = useState('')
  const [passwordSuccess, setPasswordSuccess] = useState('')

  const handleSaveName = (e) => {
    e.preventDefault()
    if (!nameInput.trim()) return
    updateProfile({ name: nameInput.trim() })
    setIsEditingName(false)
    addToast('Admin name updated successfully', 'success')
  }

  const handlePasswordChange = async (e) => {
    e.preventDefault()
    setPasswordError('')
    setPasswordSuccess('')

    if (newPassword.length < 8) {
      setPasswordError('New password must be at least 8 characters long.')
      return
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match.')
      return
    }

    setIsSubmitting(true)
    try {
      const token = localStorage.getItem('herbaltrace_token') || localStorage.getItem('auth_token')
      const response = await fetch(`${BACKEND_URL}/api/v1/auth/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          oldPassword,
          newPassword
        })
      })

      const data = await response.json()
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to change password')
      }

      setPasswordSuccess('Password updated successfully!')
      setOldPassword('')
      setNewPassword('')
      setConfirmPassword('')
      addToast('Password changed successfully', 'success')
      setTimeout(() => {
        setPasswordSuccess('')
      }, 4000)
    } catch (err) {
      setPasswordError(err.message || 'Error updating password')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    onClose()
    setPasswordError('')
    setPasswordSuccess('')
    setOldPassword('')
    setNewPassword('')
    setConfirmPassword('')
    setIsEditingName(false)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[150] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden text-zinc-900"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 220, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-100 bg-[#FFF8EC]">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-base shadow-sm">
                  {profile?.name?.charAt(0) || 'P'}
                </div>
                <div>
                  <h2 className="text-xl font-black font-heading text-[#6b2a06]">
                    {profile?.name || 'Priya Desai'}
                  </h2>
                  <p className="text-xs text-[#8c5e3c] font-semibold uppercase tracking-wider">
                    {profile?.organization || 'KVIC Central Regulatory Unit'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="p-2 rounded-full text-zinc-500 hover:bg-neutral-100 hover:text-zinc-900 transition-colors"
                aria-label="Close profile modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Tabs Navigation */}
            <div className="flex border-b border-neutral-100 bg-white px-6 gap-6 text-xs font-bold">
              <button
                type="button"
                onClick={() => setActiveSubTab('profile')}
                className={`py-3.5 border-b-2 flex items-center gap-2 transition-colors ${
                  activeSubTab === 'profile'
                    ? 'border-honey-500 text-honey-700 font-black'
                    : 'border-transparent text-zinc-500 hover:text-zinc-900'
                }`}
              >
                <User className="h-4 w-4" />
                <span>Profile Overview</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveSubTab('password')}
                className={`py-3.5 border-b-2 flex items-center gap-2 transition-colors ${
                  activeSubTab === 'password'
                    ? 'border-honey-500 text-honey-700 font-black'
                    : 'border-transparent text-zinc-500 hover:text-zinc-900'
                }`}
              >
                <KeyRound className="h-4 w-4" />
                <span>Change Password</span>
              </button>
            </div>

            {/* Tab 1: Profile Details & Name Edit */}
            {activeSubTab === 'profile' && (
              <div className="p-6 bg-white space-y-4 max-h-[65vh] overflow-y-auto">
                {/* Name Edit Section */}
                <div className="p-4 rounded-2xl bg-[#FFF8EC] border border-[#EAD7C5] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#8c5e3c]">Admin Name</span>
                    {!isEditingName && (
                      <button
                        type="button"
                        onClick={() => setIsEditingName(true)}
                        className="text-xs font-bold text-honey-600 hover:text-honey-700 flex items-center gap-1"
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                        <span>Edit Name</span>
                      </button>
                    )}
                  </div>

                  {isEditingName ? (
                    <form onSubmit={handleSaveName} className="flex gap-2 pt-1">
                      <input
                        type="text"
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)}
                        required
                        className="flex-1 px-3 py-1.5 rounded-xl border border-[#EAD7C5] bg-white text-xs font-bold text-[#6b2a06] focus:outline-none focus:ring-2 focus:ring-honey-500"
                        placeholder="Enter full name"
                      />
                      <button
                        type="submit"
                        className="px-3 py-1.5 rounded-xl bg-honey-500 hover:bg-honey-600 text-white font-bold text-xs shadow-sm flex items-center gap-1"
                      >
                        <Save className="h-3.5 w-3.5" />
                        <span>Save</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditingName(false)}
                        className="px-2.5 py-1.5 rounded-xl border border-neutral-300 text-zinc-600 hover:bg-neutral-100 text-xs font-bold"
                      >
                        Cancel
                      </button>
                    </form>
                  ) : (
                    <p className="text-base font-bold text-[#6b2a06]">{profile?.name || 'Priya Desai'}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Official Role</span>
                    <p className="text-xs font-bold text-zinc-900 mt-0.5">KVIC Central Administrator</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">User ID</span>
                    <p className="text-xs font-mono font-bold text-zinc-900 mt-0.5">admin-root-ca-01</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Official Email</span>
                  <p className="text-xs font-bold text-zinc-900">{profile?.email || 'admin@kvic.gov.in'}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Blockchain Channel</span>
                    <p className="text-xs font-mono font-bold text-zinc-900 mt-0.5">honeytrace-channel</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">MSP Identity</span>
                    <p className="text-xs font-mono font-bold text-zinc-900 mt-0.5">KVICCentralMSP</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold">
                    <ShieldCheck className="h-5 w-5 text-emerald-600" />
                    <span>Root CA Digital Certificate Verified</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900 font-black text-[10px]">
                    ACTIVE
                  </span>
                </div>
              </div>
            )}

            {/* Tab 2: Change Password */}
            {activeSubTab === 'password' && (
              <form onSubmit={handlePasswordChange} className="p-6 bg-white space-y-4">
                {passwordSuccess && (
                  <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-xs font-bold text-emerald-800 flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-600" />
                    <span>{passwordSuccess}</span>
                  </div>
                )}

                {passwordError && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs font-bold text-red-600">
                    {passwordError}
                  </div>
                )}

                {/* Old Password */}
                <label className="flex flex-col space-y-1.5 text-xs font-bold text-zinc-800">
                  <span>Current Password *</span>
                  <div className="relative">
                    <input
                      type={showOldPassword ? 'text' : 'password'}
                      required
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      placeholder="Enter current password"
                      className="w-full rounded-xl border border-neutral-300 bg-neutral-50 px-3.5 py-2.5 pr-10 text-zinc-900 placeholder-gray-400 focus:border-honey-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-honey-200 text-xs font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setShowOldPassword(!showOldPassword)}
                      className="absolute inset-y-0 right-3 flex items-center text-zinc-400 hover:text-zinc-600"
                    >
                      {showOldPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </label>

                {/* New Password */}
                <label className="flex flex-col space-y-1.5 text-xs font-bold text-zinc-800">
                  <span>New Password (min 8 characters) *</span>
                  <div className="relative">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      className="w-full rounded-xl border border-neutral-300 bg-neutral-50 px-3.5 py-2.5 pr-10 text-zinc-900 placeholder-gray-400 focus:border-honey-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-honey-200 text-xs font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute inset-y-0 right-3 flex items-center text-zinc-400 hover:text-zinc-600"
                    >
                      {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </label>

                {/* Confirm Password */}
                <label className="flex flex-col space-y-1.5 text-xs font-bold text-zinc-800">
                  <span>Confirm New Password *</span>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter new password"
                    className="w-full rounded-xl border border-neutral-300 bg-neutral-50 px-3.5 py-2.5 text-zinc-900 placeholder-gray-400 focus:border-honey-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-honey-200 text-xs font-medium"
                  />
                </label>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-honey-500 hover:bg-honey-600 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center disabled:opacity-70 mt-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Updating Password...
                    </>
                  ) : (
                    'Update Password'
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
