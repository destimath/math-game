import { useCallback, useState } from 'react'
import { ApiStudentProgress, classroomApi } from '../../infrastructure/api/classroomApi'

const API_ENABLED = import.meta.env.VITE_API_ENABLED === 'true'

const MOCK_ROSTER: ApiStudentProgress[] = [
  { id: 1, name: 'Sari',  level: 3, xp: 250, kepingGaruda: 80,  streakDays: 5, totalBattles: 8,  victories: 6, totalAnswered: 64, totalCorrect: 52 },
  { id: 2, name: 'Budi',  level: 2, xp: 180, kepingGaruda: 50,  streakDays: 3, totalBattles: 5,  victories: 4, totalAnswered: 40, totalCorrect: 30 },
  { id: 3, name: 'Ayu',   level: 4, xp: 420, kepingGaruda: 120, streakDays: 7, totalBattles: 12, victories: 10, totalAnswered: 96, totalCorrect: 84 },
]

export function useClassRoster() {
  const [students, setStudents] = useState<ApiStudentProgress[]>([])
  const [classCode, setClassCode] = useState('SUMTR-4A')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searched, setSearched] = useState(false)

  const search = useCallback(async (code: string) => {
    setClassCode(code)
    setError(null)
    setIsLoading(true)
    setSearched(true)
    try {
      if (API_ENABLED) {
        const data = await classroomApi.getRoster(code.trim().toUpperCase())
        setStudents(data)
      } else {
        await new Promise((r) => setTimeout(r, 600))
        setStudents(MOCK_ROSTER)
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Gagal memuat data kelas')
      setStudents([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { students, classCode, isLoading, error, searched, search }
}
