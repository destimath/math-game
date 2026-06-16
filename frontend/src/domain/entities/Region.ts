export type RegionStatus = 'completed' | 'active' | 'locked'

export interface RegionProgress {
  completed: number
  total: number
}

export interface RegionNode {
  id: string
  name: string
  icon: string
  status: RegionStatus
  stars: number
  progress: RegionProgress
  unlockHint?: string
}
