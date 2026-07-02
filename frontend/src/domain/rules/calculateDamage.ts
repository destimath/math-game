import { DifficultyLevel } from '../entities/BattleQuestion'
import { DIFFICULTY_MULTIPLIER } from './difficultyMultiplier'

const BASE_DAMAGE = 10
const COMBO_STEP = 0.1
const COMBO_CAP = 1.0
const SPEED_BONUS_MAX = 0.2
const GARUDA_STRIKE_INTERVAL = 3
const GARUDA_STRIKE_BONUS_DAMAGE = 15

export interface DamageResult {
  damage: number
  isGarudaStrike: boolean
}

/**
 * comboAfterHit = jumlah combo SETELAH jawaban benar ini (mulai dari 1).
 * Setiap kelipatan GARUDA_STRIKE_INTERVAL memicu "Serangan Garuda!".
 */
export function calculateDamage(
  comboAfterHit: number,
  tier: DifficultyLevel,
  timeRemainingSeconds: number,
  timeLimitSeconds: number,
): DamageResult {
  const isGarudaStrike = comboAfterHit > 0 && comboAfterHit % GARUDA_STRIKE_INTERVAL === 0

  const comboMultiplier = Math.min(comboAfterHit * COMBO_STEP, COMBO_CAP)
  const speedRatio = Math.min(Math.max(timeRemainingSeconds / timeLimitSeconds, 0), 1)
  const speedBonus = speedRatio * SPEED_BONUS_MAX
  const dm = DIFFICULTY_MULTIPLIER[tier]

  let damage = BASE_DAMAGE * (1 + comboMultiplier + speedBonus) * dm
  if (isGarudaStrike) damage += GARUDA_STRIKE_BONUS_DAMAGE

  return { damage: Math.round(damage), isGarudaStrike }
}
