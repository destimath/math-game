import { useMemo } from 'react'
import { RegionNode } from '../../domain/entities/Region'
import { BATTLES_PER_REGION, useRegionStore } from '../../store/regionStore'

const REGION_META: Omit<RegionNode, 'status' | 'stars' | 'progress'>[] = [
  { id: 'sumatra',    name: 'Sumatra',    icon: '⛵' },
  { id: 'kalimantan', name: 'Kalimantan', icon: '🌳', unlockHint: 'Selesaikan Sumatra' },
  { id: 'java',       name: 'Java',       icon: '🌾', unlockHint: 'Selesaikan Kalimantan' },
  { id: 'bali',       name: 'Bali',       icon: '🛕', unlockHint: 'Selesaikan Java' },
  { id: 'sulawesi',   name: 'Sulawesi',   icon: '🌊', unlockHint: 'Selesaikan Bali' },
  { id: 'maluku',     name: 'Maluku',     icon: '🏰', unlockHint: 'Selesaikan Sulawesi' },
  { id: 'papua',      name: 'Papua',      icon: '🦜', unlockHint: 'Selesaikan Maluku' },
]

export function useRegions() {
  const storeRegions = useRegionStore((s) => s.regions)

  const regions: RegionNode[] = useMemo(
    () =>
      REGION_META.map((meta) => {
        const data = storeRegions[meta.id] ?? { battlesCompleted: 0, status: 'locked' }
        return {
          ...meta,
          status: data.status,
          stars: data.status === 'completed' ? 3 : 0,
          progress: { completed: data.battlesCompleted, total: BATTLES_PER_REGION },
        }
      }),
    [storeRegions],
  )

  return { regions, isLoading: false }
}
