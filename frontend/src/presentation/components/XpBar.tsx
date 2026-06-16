import { useEffect, useRef, useState } from 'react'
import { launchLevelUpConfetti } from '../../infrastructure/effects/confetti'

interface XpBarProps {
  fromXp: number
  xpEarned: number
  maxXp: number
  level: number
  active: boolean
}

// Estimasi maxXp untuk level berikutnya (cocok dengan formula backend)
function nextLevelMax(currentMax: number) {
  return currentMax + 50
}

type Phase = 'idle' | 'filling' | 'full-flash' | 'resetting' | 'filling-remainder' | 'done'

export function XpBar({ fromXp, xpEarned, maxXp, level, active }: XpBarProps) {
  const newXp = fromXp + xpEarned
  const leveledUp = newXp >= maxXp
  const remainder = leveledUp ? newXp - maxXp : 0

  const [displayXp, setDisplayXp] = useState(fromXp)
  const [displayMax, setDisplayMax] = useState(maxXp)
  const [displayLevel, setDisplayLevel] = useState(level)
  const [phase, setPhase] = useState<Phase>('idle')
  const [shineKey, setShineKey] = useState(0)
  const [showFloat, setShowFloat] = useState(false)
  const animStarted = useRef(false)

  useEffect(() => {
    if (!active || animStarted.current) return
    animStarted.current = true

    const timers: ReturnType<typeof setTimeout>[] = []
    const t = (fn: () => void, ms: number) => {
      const id = setTimeout(fn, ms)
      timers.push(id)
    }

    // 350ms delay agar RevealRow selesai muncul dulu
    t(() => {
      setPhase('filling')
      setDisplayXp(leveledUp ? maxXp : newXp)
      setShineKey((k) => k + 1)
      setShowFloat(true)
      t(() => setShowFloat(false), 900)
    }, 350)

    if (leveledUp) {
      // Setelah bar penuh (transisi 1.1s) → flash + konfeti
      t(() => {
        setPhase('full-flash')
        launchLevelUpConfetti()
      }, 350 + 1150)

      // Reset bar ke 0 (tanpa transisi)
      t(() => {
        setPhase('resetting')
        setDisplayXp(0)
        setDisplayLevel((l) => l + 1)
        setDisplayMax(nextLevelMax(maxXp))
      }, 350 + 1150 + 420)

      // Isi sisa XP ke level baru
      t(() => {
        setPhase('filling-remainder')
        setDisplayXp(remainder)
        setShineKey((k) => k + 1)
      }, 350 + 1150 + 420 + 120)

      t(() => setPhase('done'), 350 + 1150 + 420 + 120 + 800)
    } else {
      t(() => setPhase('done'), 350 + 1150)
    }

    return () => timers.forEach(clearTimeout)
  }, [active]) // eslint-disable-line react-hooks/exhaustive-deps

  const pct = displayMax > 0 ? Math.min(100, (displayXp / displayMax) * 100) : 0

  // Durasi transisi CSS bergantung fase
  const transitionDuration =
    phase === 'resetting' ? '0ms' :
    phase === 'filling' ? '1100ms' :
    phase === 'filling-remainder' ? '700ms' : '500ms'

  const barColor =
    phase === 'full-flash'
      ? 'bg-gradient-to-r from-garuda-gold via-white to-garuda-gold'
      : 'bg-gradient-to-r from-garuda-gold to-garuda-green'

  return (
    <div className="relative w-full">
      {/* Label baris atas */}
      <div className="mb-1 flex items-center justify-between text-sm font-bold text-garuda-blue">
        <span
          className={`flex items-center gap-1 ${phase === 'full-flash' || (leveledUp && phase !== 'idle') ? 'animate-xp-levelup' : ''}`}
        >
          ⭐ XP +{xpEarned}
        </span>
        <span className={leveledUp && phase !== 'idle' && phase !== 'filling' ? 'text-garuda-green' : ''}>
          Lv.{displayLevel}
          {leveledUp && phase !== 'idle' && phase !== 'filling' && ' 🎊'}
        </span>
      </div>

      {/* Container bar */}
      <div className="relative h-5 w-full overflow-hidden rounded-full border border-black/10 bg-white/40">
        {/* Bar utama */}
        <div
          className={`h-full rounded-full ${barColor}`}
          style={{ width: `${pct}%`, transition: `width ${transitionDuration} ease-out` }}
        />

        {/* Shine sweep — muncul saat bar mulai mengisi */}
        {(phase === 'filling' || phase === 'filling-remainder') && (
          <div
            key={shineKey}
            className="animate-xp-shine pointer-events-none absolute inset-y-0 w-12 bg-white/60"
          />
        )}

        {/* Flash putih saat level up */}
        {phase === 'full-flash' && (
          <div className="animate-xp-reset-flash pointer-events-none absolute inset-0 bg-white" />
        )}
      </div>

      {/* Floating "+XP" */}
      {showFloat && (
        <div className="pointer-events-none absolute right-0 top-0 -translate-y-1">
          <span className="animate-xp-float text-sm font-extrabold text-garuda-gold drop-shadow">
            +{xpEarned} XP
          </span>
        </div>
      )}

      {/* Teks naik level */}
      {leveledUp && phase !== 'idle' && phase !== 'filling' && (
        <p className="mt-1 text-xs font-bold text-garuda-green">🎊 Selamat Naik Level!</p>
      )}
    </div>
  )
}
