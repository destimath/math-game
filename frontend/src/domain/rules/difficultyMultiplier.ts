import { DifficultyLevel } from '../entities/BattleQuestion'

export const DIFFICULTY_MULTIPLIER: Record<DifficultyLevel, number> = {
  easy: 1.0,
  medium: 1.2,
  hard: 1.5,
}
