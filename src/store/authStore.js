import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set) => ({
      token: 'demo-token-active',
      profile: {
        name: 'KVIC Central Admin',
        role: 'admin',
        email: 'admin@kvic.gov.in',
        organization: 'KVIC Central Regulatory Unit'
      },
      role: 'admin',

      login: (...args) => {
        if (typeof args[0] === 'string') {
          const [token, profile, role] = args
          const rawRole = role || profile?.role || 'admin'
          const normalizedRole = rawRole.toLowerCase() === 'farmer' ? 'beekeeper' : rawRole.toLowerCase()
          set({ token, profile, role: normalizedRole })
        } else {
          const [user, token] = args
          const rawRole = user?.role || user?.stakeholderType || 'admin'
          const normalizedRole = rawRole.toLowerCase() === 'farmer' ? 'beekeeper' : rawRole.toLowerCase()
          set({ token, profile: user, role: normalizedRole })
        }
      },
      logout: () => {
        localStorage.removeItem('herbaltrace_token')
        localStorage.removeItem('auth_token')
        localStorage.removeItem('herbaltrace_user')
        set({ token: null, profile: null, role: null })
      },
      setRole: (role) => {
        const normalizedRole = (role || '').toLowerCase() === 'farmer' ? 'beekeeper' : (role || '').toLowerCase()
        set({ role: normalizedRole })
      },
      updateProfile: (updatedFields) => {
        set((state) => {
          const newProfile = { ...state.profile, ...updatedFields }
          try {
            const stored = localStorage.getItem('herbaltrace_user')
            if (stored) {
              const parsed = JSON.parse(stored)
              localStorage.setItem('herbaltrace_user', JSON.stringify({ ...parsed, ...updatedFields, fullName: newProfile.name || newProfile.fullName }))
            }
          } catch (e) {}
          window.dispatchEvent(new CustomEvent('profile_updated', { detail: newProfile }))
          return { profile: newProfile }
        })
      }
    }),
    {
      name: 'beebuzz_auth_storage'
    }
  )
)

