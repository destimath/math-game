export interface SahabatGaruda {
  id: string
  name: string
  isActive: boolean
  isUnlocked: boolean
}

export interface PlayerProfile {
  name: string
  level: number
  xp: number
  xpToNextLevel: number
  kepingGaruda: number
  streakDays: number
  dailyRewardClaimed: boolean
  activeCharacter: string
  characters: SahabatGaruda[]
}
