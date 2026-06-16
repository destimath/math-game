import { useEffect, useRef, useState } from 'react'

interface ComboMeterProps {
  combo: number
  feedback: 'correct' | 'wrong' | null
}

interface TierConfig {
  label: string
  numBg: string
  numText: string
  wrapBg: string
  border: string
  pulseAnim: string
  flames: number
  glow: string
}

const TIERS: TierConfig[] = [
  // tier 0 — tidak ada combo
  {
    label: 'COMBO',
    numBg: 'bg-garuda-blue/10',
    numText: 'text-garuda-blue/40',
    wrapBg: 'bg-white/60',
    border: 'border-garuda-blue/10',
    pulseAnim: '',
    flames: 0,
    glow: '',
  },
  // tier 1 — combo 1–2
  {
    label: 'COMBO',
    numBg: 'bg-amber-100',
    numText: 'text-amber-600',
    wrapBg: 'bg-amber-50',
    border: 'border-amber-300',
    pulseAnim: 'animate-combo-pulse-1',
    flames: 1,
    glow: 'shadow-[0_0_12px_rgba(245,158,11,0.35)]',
  },
  // tier 2 — combo 3–5
  {
    label: 'PANAS!',
    numBg: 'bg-orange-100',
    numText: 'text-orange-600',
    wrapBg: 'bg-orange-50',
    border: 'border-orange-400',
    pulseAnim: 'animate-combo-pulse-2',
    flames: 2,
    glow: 'shadow-[0_0_16px_rgba(234,88,12,0.5)]',
  },
  // tier 3 — combo 6+
  {
    label: '🔥 TERBAKAR!',
    numBg: 'bg-red-100',
    numText: 'text-garuda-red',
    wrapBg: 'bg-red-50',
    border: 'border-garuda-red',
    pulseAnim: 'animate-combo-pulse-3',
    flames: 3,
    glow: 'shadow-[0_0_22px_rgba(226,88,34,0.65)]',
  },
]

function getTier(combo: number): TierConfig {
  if (combo === 0) return TIERS[0]
  if (combo <= 2) return TIERS[1]
  if (combo <= 5) return TIERS[2]
  return TIERS[3]
}

const FLAME_ALTS = ['', 'animate-flame-flicker', 'animate-flame-flicker-alt']

export function ComboMeter({ combo, feedback }: ComboMeterProps) {
  const tier = getTier(combo)
  const prevCombo = useRef(combo)

  // Key berubah tiap kali combo naik → restart animasi enter
  const [enterKey, setEnterKey] = useState(0)
  // Saat combo break
  const [breaking, setBreaking] = useState(false)

  useEffect(() => {
    if (combo > prevCombo.current) {
      // Combo naik
      setEnterKey((k) => k + 1)
    } else if (combo === 0 && prevCombo.current > 0) {
      // Combo break
      setBreaking(true)
      const t = setTimeout(() => setBreaking(false), 460)
      return () => clearTimeout(t)
    }
    prevCombo.current = combo
  }, [combo])

  const wrapAnim = breaking
    ? 'animate-combo-break'
    : combo > 0
    ? tier.pulseAnim
    : ''

  return (
    <div
      className={`flex items-center justify-between rounded-2xl border-2 px-4 py-2 transition-all duration-300 ${tier.wrapBg} ${tier.border} ${tier.glow} ${wrapAnim}`}
    >
      {/* Kiri: label */}
      <div className="flex flex-col items-start">
        <span className={`text-[10px] font-extrabold uppercase tracking-widest ${combo > 0 ? tier.numText : 'text-garuda-blue/30'}`}>
          {breaking ? '💔 PUTUS!' : tier.label}
        </span>

        {/* Baris api */}
        <div className="flex gap-0.5">
          {Array.from({ length: Math.max(tier.flames, 1) }).map((_, i) => (
            <span
              key={i}
              className={`text-base ${i < tier.flames ? FLAME_ALTS[i % FLAME_ALTS.length] : 'opacity-15'}`}
            >
              {i < tier.flames ? '🔥' : '○'}
            </span>
          ))}
          {/* Slot kosong agar lebar stabil */}
          {Array.from({ length: Math.max(0, 3 - tier.flames) }).map((_, i) => (
            <span key={`empty-${i}`} className="text-base opacity-10">○</span>
          ))}
        </div>
      </div>

      {/* Kanan: angka combo besar */}
      <div
        key={enterKey}
        className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl font-extrabold ${tier.numBg} ${tier.numText} ${enterKey > 0 ? 'animate-combo-enter' : ''}`}
      >
        x{combo}
      </div>
    </div>
  )
}
