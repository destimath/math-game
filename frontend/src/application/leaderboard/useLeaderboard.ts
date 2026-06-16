import { useEffect, useState } from 'react'
import { LeaderboardEntry } from '../../domain/entities/LeaderboardEntry'
import { leaderboardApi } from '../../infrastructure/api/leaderboardApi'
import { useAuthStore } from '../../store/authStore'

const MOCK_CLASS: LeaderboardEntry[] = [
  { rank: 1, name: 'Budi', level: 5, xp: 480, kepingGaruda: 320, isCurrentPlayer: false },
  { rank: 2, name: 'Dewi', level: 4, xp: 350, kepingGaruda: 210, isCurrentPlayer: false },
  { rank: 3, name: 'Eko', level: 3, xp: 270, kepingGaruda: 175, isCurrentPlayer: false },
  { rank: 4, name: 'Farida', level: 3, xp: 240, kepingGaruda: 150, isCurrentPlayer: false },
  { rank: 5, name: 'Gilang', level: 2, xp: 180, kepingGaruda: 110, isCurrentPlayer: false },
  { rank: 6, name: 'Hana', level: 2, xp: 140, kepingGaruda: 85, isCurrentPlayer: false },
  { rank: 7, name: 'Sari', level: 1, xp: 20, kepingGaruda: 0, isCurrentPlayer: true },
  { rank: 8, name: 'Irfan', level: 1, xp: 15, kepingGaruda: 0, isCurrentPlayer: false },
]

const MOCK_GLOBAL: LeaderboardEntry[] = [
  { rank: 1, name: 'Wahyu', level: 12, xp: 1200, kepingGaruda: 870, isCurrentPlayer: false },
  { rank: 2, name: 'Ratna', level: 10, xp: 980, kepingGaruda: 720, isCurrentPlayer: false },
  { rank: 3, name: 'Candra', level: 9, xp: 870, kepingGaruda: 650, isCurrentPlayer: false },
  { rank: 4, name: 'Yusuf', level: 8, xp: 760, kepingGaruda: 510, isCurrentPlayer: false },
  { rank: 5, name: 'Mega', level: 7, xp: 680, kepingGaruda: 430, isCurrentPlayer: false },
  { rank: 6, name: 'Budi', level: 5, xp: 480, kepingGaruda: 320, isCurrentPlayer: false },
  { rank: 7, name: 'Dewi', level: 4, xp: 350, kepingGaruda: 210, isCurrentPlayer: false },
  { rank: 8, name: 'Eko', level: 3, xp: 270, kepingGaruda: 175, isCurrentPlayer: false },
]

const API_ENABLED = import.meta.env.VITE_API_ENABLED === 'true'

export function useLeaderboard() {
  const session = useAuthStore((s) => s.session)
  const [classEntries, setClassEntries] = useState<LeaderboardEntry[]>(MOCK_CLASS)
  const [globalEntries, setGlobalEntries] = useState<LeaderboardEntry[]>(MOCK_GLOBAL)
  const [playerGlobalRank, setPlayerGlobalRank] = useState(42)

  useEffect(() => {
    if (!API_ENABLED) return

    const displayName = session?.displayName

    leaderboardApi.getLeaderboard('class')
      .then((data) => setClassEntries(
        data.map((e, i) => ({
          rank: i + 1,
          name: e.name,
          level: e.level,
          xp: e.xp,
          kepingGaruda: e.kepingGaruda,
          isCurrentPlayer: e.name === displayName,
        })),
      ))
      .catch(console.error)

    leaderboardApi.getLeaderboard('global')
      .then((data) => {
        setGlobalEntries(
          data.map((e, i) => ({
            rank: i + 1,
            name: e.name,
            level: e.level,
            xp: e.xp,
            kepingGaruda: e.kepingGaruda,
            isCurrentPlayer: e.name === displayName,
          })),
        )
        const idx = data.findIndex((e) => e.name === displayName)
        if (idx >= 0) setPlayerGlobalRank(idx + 1)
      })
      .catch(console.error)
  }, [session?.displayName])

  return { classEntries, globalEntries, playerGlobalRank }
}
