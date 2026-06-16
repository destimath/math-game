import { apiClient } from './apiClient'

export interface ApiStudentProgress {
  id: number
  name: string
  level: number
  xp: number
  kepingGaruda: number
  streakDays: number
  totalBattles: number
  victories: number
  totalAnswered: number
  totalCorrect: number
}

export const classroomApi = {
  async getRoster(classCode: string): Promise<ApiStudentProgress[]> {
    const { data } = await apiClient.get<{ data: ApiStudentProgress[] }>('/api/teacher/roster', {
      params: { classCode },
    })
    return data.data
  },
}
