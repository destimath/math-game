import { DifficultyLevel } from '../entities/BattleQuestion'
import { DIFFICULTY_MULTIPLIER } from './difficultyMultiplier'

const BASE_KABUT = 8

export function calculateKabutEffect(tier: DifficultyLevel): number {
  return Math.round(BASE_KABUT * DIFFICULTY_MULTIPLIER[tier])
}
