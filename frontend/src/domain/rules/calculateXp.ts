const BASE_XP = 10
const COMBO_XP_BONUS = 2

export function calculateXp(comboAfterHit: number): number {
  return BASE_XP + (comboAfterHit - 1) * COMBO_XP_BONUS
}
