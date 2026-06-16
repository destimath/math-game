import { create } from 'zustand'
import { AuthSession } from '../domain/entities/Auth'
import { clearSession, loadSession, saveSession } from '../infrastructure/auth/tokenStorage'

interface AuthState {
  session: AuthSession | null
  setSession: (session: AuthSession) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  session: loadSession(),
  setSession: (session) => {
    saveSession(session)
    set({ session })
  },
  logout: () => {
    clearSession()
    set({ session: null })
  },
}))
