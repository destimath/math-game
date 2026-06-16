import { create } from 'zustand'
import { PlayerProfile } from '../domain/entities/Player'

const INITIAL_PROFILE: PlayerProfile = {
  name: 'Sari',
  level: 1,
  xp: 20,
  xpToNextLevel: 100,
  kepingGaruda: 0,
  streakDays: 1,
  dailyRewardClaimed: false,
  activeCharacter: 'sari',
  characters: [
    { id: 'sari',  name: 'Sari',  isActive: true,  isUnlocked: true  },
    { id: 'bayu',  name: 'Bayu',  isActive: false, isUnlocked: false },
    { id: 'made',  name: 'Made',  isActive: false, isUnlocked: false },
    { id: 'tiwi',  name: 'Tiwi',  isActive: false, isUnlocked: false },
    { id: 'rian',  name: 'Rian',  isActive: false, isUnlocked: false },
  ],
}

interface BattleResultPatch {
  level: number
  xp: number
  xpToNextLevel: number
  kepingGaruda: number
  leveledUp: boolean
}

interface PlayerState {
  profile: PlayerProfile
  leveledUp: boolean
  claimDailyReward: (kepingGaruda: number) => void
  addKeping: (amount: number) => void
  applyBattleResult: (patch: BattleResultPatch) => void
  clearLevelUp: () => void
  unlockCharacter: (id: string) => boolean
  setActiveCharacter: (id: string) => void
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  profile: INITIAL_PROFILE,
  leveledUp: false,

  claimDailyReward: (kepingGaruda) =>
    set((state) => ({
      profile: {
        ...state.profile,
        kepingGaruda: state.profile.kepingGaruda + kepingGaruda,
        dailyRewardClaimed: true,
      },
    })),

  addKeping: (amount) =>
    set((state) => ({
      profile: { ...state.profile, kepingGaruda: state.profile.kepingGaruda + amount },
    })),

  applyBattleResult: (patch) =>
    set((state) => ({
      leveledUp: patch.leveledUp,
      profile: {
        ...state.profile,
        level: patch.level,
        xp: patch.xp,
        xpToNextLevel: patch.xpToNextLevel,
        kepingGaruda: patch.kepingGaruda,
      },
    })),

  clearLevelUp: () => set({ leveledUp: false }),

  unlockCharacter: (id) => {
    const already = get().profile.characters.find((c) => c.id === id)?.isUnlocked
    if (already) return false
    set((state) => ({
      profile: {
        ...state.profile,
        characters: state.profile.characters.map((c) =>
          c.id === id ? { ...c, isUnlocked: true } : c,
        ),
      },
    }))
    return true
  },

  setActiveCharacter: (id) =>
    set((state) => ({
      profile: {
        ...state.profile,
        activeCharacter: id,
        characters: state.profile.characters.map((c) => ({
          ...c,
          isActive: c.id === id,
        })),
      },
    })),
}))
