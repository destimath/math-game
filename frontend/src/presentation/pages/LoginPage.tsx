import { FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLogin } from '../../application/auth/useLogin'
import { launchLevelUpConfetti } from '../../infrastructure/effects/confetti'
import { useAuthStore } from '../../store/authStore'
import { PinInput } from '../components/PinInput'

type Mode = 'login' | 'register'

export function LoginPage() {
  const navigate = useNavigate()
  const { login, register, isSubmitting, error } = useLogin()

  const [mode, setMode] = useState<Mode>('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [pin, setPin] = useState('')
  const [showPin, setShowPin] = useState(false)
  const [shakeKey, setShakeKey] = useState(0)

  useEffect(() => {
    if (error) setShakeKey((k) => k + 1)
  }, [error])

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
      launchLevelUpConfetti()
      const role = useAuthStore.getState().session?.role
      navigate(role === 'teacher' ? '/guru' : '/')
    }
  }

  return (
    <div className="relative flex h-full flex-col items-center justify-center gap-7 overflow-hidden bg-gradient-to-b from-garuda-blue via-sky-500 to-sky-300 px-6 py-10">
      {/* Dekorasi langit — awan & bintang */}
      <span className="pointer-events-none absolute left-6 top-12 animate-cloud-float text-4xl opacity-80">☁️</span>
      <span className="pointer-events-none absolute right-8 top-24 animate-cloud-float text-3xl opacity-70 [animation-delay:1.5s]">☁️</span>
      <span className="pointer-events-none absolute left-12 top-40 animate-cloud-float text-2xl opacity-60 [animation-delay:3s]">☁️</span>
      <span className="pointer-events-none absolute right-10 top-8 animate-twinkle text-2xl [animation-delay:0.4s]">✨</span>
      <span className="pointer-events-none absolute left-8 top-24 animate-twinkle text-xl [animation-delay:1s]">⭐</span>
      <span className="pointer-events-none absolute right-16 bottom-1/3 animate-twinkle text-xl [animation-delay:0.7s]">✨</span>

      {/* Maskot */}
      <div className="relative z-10 text-center text-white">
        <div className="inline-flex animate-mascot-float items-center justify-center rounded-full bg-white/15 p-4 text-6xl shadow-lg backdrop-blur-sm">
          🦅
        </div>
        <h1 className="mt-3 text-3xl font-extrabold tracking-wide drop-shadow">Legenda Garuda</h1>
        <p className="text-sm text-white/80">🌏 Petualangan Matematika Seru di Nusantara!</p>
      </div>

      {/* Card */}
      <div
        key={shakeKey}
        className={`relative z-10 w-full max-w-sm rounded-card bg-white p-6 shadow-2xl ${shakeKey > 0 ? 'animate-shake' : ''}`}
      >
        {/* Toggle masuk / daftar */}
        <div className="mb-5 flex rounded-2xl bg-garuda-blue/10 p-1">
          {(['login', 'register'] as Mode[]).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => switchMode(m)}
              className={`flex-1 rounded-xl py-2 text-sm font-bold transition-all ${
                mode === m
                  ? 'bg-garuda-blue text-white shadow'
                  : 'text-garuda-blue/50 hover:text-garuda-blue/80'
              }`}
            >
              {m === 'login' ? '🔑 Masuk' : '📝 Daftar'}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nama — hanya saat daftar */}
          {mode === 'register' && (
            <div>
              <label className="mb-1 block text-xs font-bold text-garuda-blue/70">
                Siapa nama kamu? 😊
              </label>
              <input
                type="text"
                placeholder="Nama kamu"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-2xl border-2 border-garuda-blue/20 bg-white px-4 py-3 text-sm font-semibold text-garuda-blue outline-none focus:border-garuda-gold focus:ring-2 focus:ring-garuda-gold/30"
              />
            </div>
          )}

          {/* Email */}
          <div>
            <label className="mb-1 block text-xs font-bold text-garuda-blue/70">
              Alamat Email 📧
            </label>
            <input
              type="email"
              placeholder="contoh@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className="w-full rounded-2xl border-2 border-garuda-blue/20 bg-white px-4 py-3 text-sm font-semibold text-garuda-blue outline-none focus:border-garuda-gold focus:ring-2 focus:ring-garuda-gold/30"
            />
          </div>

          {/* PIN */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="block text-xs font-bold text-garuda-blue/70">
                Kode Rahasia Kamu 🔐 (4–6 digit)
              </label>
              <button
                type="button"
                onClick={() => setShowPin((v) => !v)}
                className="text-xs font-bold text-garuda-blue/50 hover:text-garuda-blue"
              >
                {showPin ? '🙈 Sembunyikan' : '👁 Lihat'}
              </button>
            </div>
            <PinInput value={pin} onChange={setPin} masked={!showPin} error={Boolean(error)} />
          </div>

          {/* Error */}
          {error && (
            <p className="rounded-xl bg-garuda-red/10 px-3 py-2 text-center text-xs font-bold text-garuda-red">
              😅 {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-1 w-full rounded-2xl bg-garuda-green py-3 text-sm font-extrabold text-white shadow-[0_4px_0_rgba(0,0,0,0.25)] transition-transform hover:bg-green-500 active:translate-y-1 active:scale-95 active:shadow-none disabled:opacity-50"
          >
            {isSubmitting ? '⏳ Memuat...' : mode === 'login' ? '🚀 Ayo Masuk!' : '🎉 Daftar Sekarang!'}
          </button>
        </form>

        {/* Demo hint */}
        {mode === 'login' && (
          <p className="mt-4 text-center text-xs text-garuda-blue/40">
            Demo: <span className="font-mono">sari@demo.id</span> / PIN <span className="font-mono">1234</span>
          </p>
        )}
      </div>
    </div>
  )
}
