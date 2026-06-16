import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Mission {
  id: string
  label: string
  target: number
  progress: number
  reward: number
  claimed: boolean
}

function todayStr() {
  return new Date().toISOString().slice(0, 10)
}

const MISSION_TEMPLATES: Omit<Mission, 'progress' | 'claimed'>[] = [
  { id: 'play_3',   label: 'Mainkan 3 Tantangan Angka', target: 3,  reward: 10 },
  { id: 'win_2',    label: 'Menangkan 2 Pertarungan',   target: 2,  reward: 15 },
  { id: 'keping_15', label: 'Kumpulkan 15 Keping Garuda', target: 15, reward: 8  },
]

function freshMissions(): Mission[] {
  return MISSION_TEMPLATES.map((t) => ({ ...t, progress: 0, claimed: false }))
}

interface MissionState {
  date: string
  missions: Mission[]
  winStreak: number
  trackBattlePlayed: () => void
  trackBattleWon: (kepingEarned: number) => void
  trackBattleLost: () => void
  claimMission: (id: string) => number
}

export const useMissionStore = create<MissionState>()(
  persist(
    (set, get) => ({
      date: todayStr(),
      missions: freshMissions(),
      winStreak: 0,

      trackBattlePlayed: () => {
        const today = todayStr()
        const state = get()
        const missions = state.date !== today ? freshMissions() : [...state.missions]
        set({
          date: today,
          missions: missions.map((m) =>
            m.id === 'play_3' && m.progress < m.target
              ? { ...m, progress: m.progress + 1 }
              : m,
          ),
        })
      },

      trackBattleWon: (kepingEarned: number) => {
        const today = todayStr()
        const state = get()
        const missions = state.date !== today ? freshMissions() : [...state.missions]
        set({
          date: today,
          winStreak: state.winStreak + 1,
          missions: missions.map((m) => {
            if (m.id === 'win_2' && m.progress < m.target)
              return { ...m, progress: m.progress + 1 }
            if (m.id === 'keping_15' && m.progress < m.target)
              return { ...m, progress: Math.min(m.target, m.progress + kepingEarned) }
            return m
          }),
        })
      },

      trackBattleLost: () => set({ winStreak: 0 }),

      claimMission: (id: string) => {
        const mission = get().missions.find((m) => m.id === id)
        if (!mission || mission.progress < mission.target || mission.claimed) return 0
        set((state) => ({
          missions: state.missions.map((m) =>
            m.id === id ? { ...m, claimed: true } : m,
          ),
        }))
        return mission.reward
      },
    }),
    { name: 'legenda-garuda:missions' },
  ),
)
