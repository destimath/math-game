import { apiClient } from './apiClient'

export interface ApiLeaderboardEntry {
  id: number
  name: string
  level: number
  xp: number
  kepingGaruda: number
  classCode: string | null
}

export const leaderboardApi = {
  async getLeaderboard(scope: 'class' | 'global'): Promise<ApiLeaderboardEntry[]> {
    const { data } = await apiClient.get<{ data: ApiLeaderboardEntry[] }>('/api/leaderboard', {
      params: { scope },
    })
    return data.data
  },
}
