import { useEffect, useRef, useState } from 'react'

interface BossCharacterProps {
  bossBar: number
  hitKey: number
  isGarudaStrike: boolean
}

// Emoji berubah sesuai HP boss
function bossEmoji(hp: number) {
  if (hp > 65) return '👻'
  if (hp > 35) return '😤'
  return '😰'
}

function bossLabel(hp: number) {
  if (hp > 65) return 'Si Kabut Bilangan'
  if (hp > 35) return '😠 Kabut Marah!'
  return '💀 Kabut Sekarat...'
}

function auraColor(hp: number, isStrike: boolean) {
  if (isStrike) return 'bg-garuda-gold/50'
  if (hp > 65) return 'bg-purple-500/25'
  if (hp > 35) return 'bg-orange-500/30'
  return 'bg-garuda-red/35'
}

export function BossCharacter({ bossBar, hitKey, isGarudaStrike }: BossCharacterProps) {
  const [hitAnim, setHitAnim] = useState<'hit' | 'strike' | null>(null)
  const [showFlash, setShowFlash] = useState(false)
  const prevHitKey = useRef(hitKey)

  useEffect(() => {
    if (hitKey === 0 || hitKey === prevHitKey.current) return
    prevHitKey.current = hitKey

    const anim = isGarudaStrike ? 'strike' : 'hit'
    const dur = isGarudaStrike ? 680 : 460

    setHitAnim(anim)
    setShowFlash(true)

    const t = setTimeout(() => {
      setHitAnim(null)
      setShowFlash(false)
    }, dur)
    return () => clearTimeout(t)
  }, [hitKey, isGarudaStrike])

  const animClass = hitAnim === 'strike'
    ? 'animate-boss-strike'
    : hitAnim === 'hit'
    ? 'animate-boss-hit'
    : 'animate-boss-float'

  return (
    <div className="relative flex flex-col items-center py-2">
      {/* Aura glow di belakang boss */}
      <div
        className={`absolute top-2 h-20 w-20 rounded-full blur-2xl transition-all duration-500 ${auraColor(bossBar, isGarudaStrike)} ${isGarudaStrike ? 'scale-150' : 'scale-100'}`}
      />

      {/* Badan boss */}
      <div className={`relative ${animClass}`}>
        {/* Flash putih saat kena serangan */}
        {showFlash && (
          <div className="animate-boss-flash pointer-events-none absolute inset-0 flex items-center justify-center">
            <span
              className="text-7xl"
              style={{ filter: 'brightness(10) saturate(0)' }}
            >
              {bossEmoji(bossBar)}
            </span>
          </div>
        )}

        {/* Emoji utama */}
        <span
          className={`select-none text-7xl drop-shadow-lg ${hitAnim ? 'animate-boss-damage' : ''}`}
          style={{
            filter: bossBar < 35
              ? 'drop-shadow(0 0 10px rgba(226,88,34,0.9))'
              : bossBar < 65
              ? 'drop-shadow(0 0 8px rgba(249,115,22,0.7))'
              : 'drop-shadow(0 0 8px rgba(139,92,246,0.6))',
          }}
        >
          {bossEmoji(bossBar)}
        </span>
      </div>

      {/* Label HP */}
      <span className="mt-1 text-xs font-bold text-garuda-blue/60 transition-all duration-300">
        {bossLabel(bossBar)}
      </span>
    </div>
  )
}
