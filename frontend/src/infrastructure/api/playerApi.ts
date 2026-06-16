import { apiClient } from './apiClient'

export interface ApiPlayerProfile {
  id: number
  name: string
  level: number
  xp: number
  xpToNextLevel: number
  kepingGaruda: number
  streakDays: number
  dailyRewardClaimed: boolean
  classCode: string | null
}

export interface ApiClaimRewardResult {
  kepingEarned: number
  newKepingTotal: number
  streakDay: number
}

export const playerApi = {
  async getProfile(): Promise<ApiPlayerProfile> {
    const { data } = await apiClient.get<{ data: ApiPlayerProfile }>('/api/player/profile')
    return data.data
  },

  async claimDailyReward(): Promise<ApiClaimRewardResult> {
    const { data } = await apiClient.post<{ data: ApiClaimRewardResult }>('/api/player/daily-reward/claim')
    return data.data
  },

  async changePin(currentPin: string, newPin: string): Promise<void> {
    await apiClient.put('/api/player/pin', { currentPin, newPin })
  },
}
