import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { RegionStatus } from '../domain/entities/Region'

const REGION_ORDER = ['sumatra', 'kalimantan', 'java', 'bali', 'sulawesi', 'maluku', 'papua']
export const BATTLES_PER_REGION =
  Number(import.meta.env.VITE_BATTLES_PER_REGION) || 10

export interface RegionData {
  battlesCompleted: number
  status: RegionStatus
}

type RegionMap = Record<string, RegionData>

const INITIAL: RegionMap = {
  sumatra:    { battlesCompleted: 0, status: 'active' },
  kalimantan: { battlesCompleted: 0, status: 'locked' },
  java:       { battlesCompleted: 0, status: 'locked' },
  bali:       { battlesCompleted: 0, status: 'locked' },
  sulawesi:   { battlesCompleted: 0, status: 'locked' },
  maluku:     { battlesCompleted: 0, status: 'locked' },
  papua:      { battlesCompleted: 0, status: 'locked' },
}

interface RegionStore {
  regions: RegionMap
  // Returns the ID of the newly unlocked region, or null if none
  completeBattle: (regionId: string) => string | null
  resetProgress: () => void
}

export const useRegionStore = create<RegionStore>()(
  persist(
    (set, get) => ({
      regions: INITIAL,

      completeBattle: (regionId) => {
        const { regions } = get()
        const current = regions[regionId]
        if (!current || current.status !== 'active') return null

        const newCompleted = current.battlesCompleted + 1
        const regionComplete = newCompleted >= BATTLES_PER_REGION

        const updated: RegionMap = {
          ...regions,
          [regionId]: {
            battlesCompleted: newCompleted,
            status: regionComplete ? 'completed' : 'active',
          },
        }

        let unlockedId: string | null = null
        if (regionComplete) {
          const idx = REGION_ORDER.indexOf(regionId)
          const nextId = REGION_ORDER[idx + 1]
          if (nextId && updated[nextId]) {
            updated[nextId] = { ...updated[nextId], status: 'active' }
            unlockedId = nextId
          }
        }

        set({ regions: updated })
        return unlockedId
      },

      resetProgress: () => set({ regions: INITIAL }),
    }),
    { name: 'legenda-garuda:regions' },
  ),
)
