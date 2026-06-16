const BASE_DAMAGE = 12
const COMBO_BONUS_PER_HIT = 0.15
const GARUDA_STRIKE_INTERVAL = 3
const GARUDA_STRIKE_MULTIPLIER = 1.5

export interface DamageResult {
  damage: number
  isGarudaStrike: boolean
}

/**
 * comboAfterHit = jumlah combo SETELAH jawaban benar ini (mulai dari 1).
 * Setiap kelipatan GARUDA_STRIKE_INTERVAL memicu "Serangan Garuda!".
 */
export function calculateDamage(comboAfterHit: number): DamageResult {
  const isGarudaStrike = comboAfterHit > 0 && comboAfterHit % GARUDA_STRIKE_INTERVAL === 0

  let damage = BASE_DAMAGE * (1 + (comboAfterHit - 1) * COMBO_BONUS_PER_HIT)
  if (isGarudaStrike) damage *= GARUDA_STRIKE_MULTIPLIER

  return { damage: Math.round(damage), isGarudaStrike }
}
