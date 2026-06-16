import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLogin } from '../../application/auth/useLogin'
import { useAuthStore } from '../../store/authStore'

type Mode = 'login' | 'register'

export function LoginPage() {
  const navigate = useNavigate()
  const { login, register, isSubmitting, error } = useLogin()

  const [mode, setMode] = useState<Mode>('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [pin, setPin] = useState('')
  const [showPin, setShowPin] = useState(false)

  function switchMode(m: Mode) {
    setMode(m)
    setName('')
    setEmail('')
    setPin('')
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const success = mode === 'login'
      ? await login(email, pin)
      : await register(name, email, pin)

    if (success) {
      const role = useAuthStore.getState().session?.role
      navigate(role === 'teacher' ? '/guru' : '/')
    }
  }

  return (
    <div className="flex h-full flex-col items-center justify-center gap-8 bg-gradient-to-b from-garuda-blue to-sky-400 px-6 py-10">
      {/* Logo */}
      <div className="text-center text-white">
        <div className="text-6xl drop-shadow-lg">🦅</div>
        <h1 className="mt-3 text-2xl font-extrabold tracking-wide">Legenda Garuda</h1>
        <p className="text-sm text-white/70">Petualangan Matematika Nusantara</p>
      </div>

      {/* Card */}
      <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl">
        {/* Toggle masuk / daftar */}
        <div className="mb-5 flex rounded-2xl bg-slate-100 p-1">
          {(['login', 'register'] as Mode[]).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => switchMode(m)}
              className={`flex-1 rounded-xl py-2 text-sm font-bold transition-all ${
                mode === m
                  ? 'bg-garuda-blue text-white shadow'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {m === 'login' ? 'Masuk' : 'Daftar'}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Nama — hanya saat daftar */}
          {mode === 'register' && (
            <div>
              <label className="mb-1 block text-xs font-bold text-slate-500">Nama Lengkap</label>
              <input
                type="text"
                placeholder="Nama kamu"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none focus:border-garuda-blue focus:ring-2 focus:ring-garuda-blue/20"
              />
            </div>
          )}

          {/* Email */}
          <div>
            <label className="mb-1 block text-xs font-bold text-slate-500">Email</label>
            <input
              type="email"
              placeholder="contoh@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none focus:border-garuda-blue focus:ring-2 focus:ring-garuda-blue/20"
            />
          </div>

          {/* PIN */}
          <div>
            <label className="mb-1 block text-xs font-bold text-slate-500">PIN (4–6 digit)</label>
            <div className="relative">
              <input
                type={showPin ? 'text' : 'password'}
                inputMode="numeric"
                placeholder="••••"
                maxLength={6}
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 6))}
                autoComplete="current-password"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 pr-10 text-center text-xl tracking-[0.4em] text-slate-700 outline-none focus:border-garuda-blue focus:ring-2 focus:ring-garuda-blue/20"
              />
              <button
                type="button"
                onClick={() => setShowPin((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPin ? '🙈' : '👁'}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <p className="rounded-xl bg-red-50 px-3 py-2 text-center text-xs font-bold text-red-500">
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-1 w-full rounded-xl bg-garuda-blue py-3 text-sm font-extrabold text-white shadow-md transition-all hover:bg-garuda-blue/90 active:scale-95 disabled:opacity-50"
          >
            {isSubmitting ? '⏳ Memuat...' : mode === 'login' ? '→ MASUK' : '✓ DAFTAR'}
          </button>
        </form>

        {/* Demo hint */}
        {mode === 'login' && (
          <p className="mt-4 text-center text-xs text-slate-400">
            Demo: <span className="font-mono">sari@demo.id</span> / PIN <span className="font-mono">1234</span>
          </p>
        )}
      </div>
    </div>
  )
}
