import { DifficultyLevel } from '../entities/BattleQuestion'
import { DIFFICULTY_MULTIPLIER } from './difficultyMultiplier'

const BASE_XP = 5
const XP_COMBO_STEP = 0.05

export function calculateXp(comboAfterHit: number, tier: DifficultyLevel): number {
  const dm = DIFFICULTY_MULTIPLIER[tier]
  const comboBonus = comboAfterHit * XP_COMBO_STEP
  return Math.round(BASE_XP * dm * (1 + comboBonus))
}
