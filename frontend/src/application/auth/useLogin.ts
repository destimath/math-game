import { useState } from 'react'
import { authApi } from '../../infrastructure/api/authApi'
import { useAuthStore } from '../../store/authStore'

const API_ENABLED = import.meta.env.VITE_API_ENABLED === 'true'

export function useLogin() {
  const setSession = useAuthStore((s) => s.setSession)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function login(email: string, pin: string): Promise<boolean> {
    setError(null)
    if (!email.trim()) { setError('Email wajib diisi'); return false }
    if (!/^\S+@\S+\.\S+$/.test(email)) { setError('Format email tidak valid'); return false }
    if (!/^\d{4,6}$/.test(pin)) { setError('PIN harus 4–6 digit angka'); return false }

    setIsSubmitting(true)
    try {
      if (API_ENABLED) {
        const session = await authApi.login(email.trim().toLowerCase(), pin)
        setSession(session)
      } else {
        await new Promise((r) => setTimeout(r, 500))
        const role = email.includes('guru') ? 'teacher' : 'student'
        setSession({ role, displayName: email.split('@')[0] })
      }
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login gagal, coba lagi')
      return false
    } finally {
      setIsSubmitting(false)
    }
  }

  async function register(name: string, email: string, pin: string): Promise<boolean> {
    setError(null)
    if (!name.trim()) { setError('Nama wajib diisi'); return false }
    if (!/^\S+@\S+\.\S+$/.test(email)) { setError('Format email tidak valid'); return false }
    if (!/^\d{4,6}$/.test(pin)) { setError('PIN harus 4–6 digit angka'); return false }

    setIsSubmitting(true)
    try {
      if (API_ENABLED) {
        const session = await authApi.register(name.trim(), email.trim().toLowerCase(), pin)
        setSession(session)
      } else {
        await new Promise((r) => setTimeout(r, 500))
        setSession({ role: 'student', displayName: name.trim() })
      }
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Pendaftaran gagal, coba lagi')
      return false
    } finally {
      setIsSubmitting(false)
    }
  }

  return { login, register, isSubmitting, error }
}
