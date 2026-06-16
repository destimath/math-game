import { apiClient } from './apiClient'

export interface ApiBattleResultPayload {
  xpEarned: number
  kepingEarned: number
  questionsAnswered: number
  questionsCorrect: number
  victory: boolean
}

export interface ApiBattleResult {
  newLevel: number
  newXp: number
  newXpToNextLevel: number
  newKepingGaruda: number
  leveledUp: boolean
}

export const battleApi = {
  async complete(payload: ApiBattleResultPayload): Promise<ApiBattleResult> {
    const { data } = await apiClient.post<{ data: ApiBattleResult }>('/api/battle/complete', payload)
    return data.data
  },
}
