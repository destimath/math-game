import { useEffect, useState } from 'react'
import { PlayerProfile } from '../../domain/entities/Player'
import { playerApi } from '../../infrastructure/api/playerApi'
import { usePlayerStore } from '../../store/playerStore'

const API_ENABLED = import.meta.env.VITE_API_ENABLED === 'true'

type ApiStats = Pick<PlayerProfile, 'name' | 'level' | 'xp' | 'xpToNextLevel' | 'kepingGaruda' | 'streakDays' | 'dailyRewardClaimed'>

export function usePlayerProfile() {
  const storeProfile = usePlayerStore((s) => s.profile)
  const localClaimDailyReward = usePlayerStore((s) => s.claimDailyReward)

  const [apiStats, setApiStats] = useState<ApiStats | null>(null)
  const [isLoading, setIsLoading] = useState(API_ENABLED)

  useEffect(() => {
    if (!API_ENABLED) return
    playerApi.getProfile()
      .then((data) => setApiStats({
        name: data.name,
        level: data.level,
        xp: data.xp,
        xpToNextLevel: data.xpToNextLevel,
        kepingGaruda: data.kepingGaruda,
        streakDays: data.streakDays,
        dailyRewardClaimed: data.dailyRewardClaimed,
      }))
      .catch(console.error)
      .finally(() => setIsLoading(false))
  }, [])

  const profile: PlayerProfile = apiStats ? { ...storeProfile, ...apiStats } : storeProfile

  async function claimDailyReward(kepingGaruda: number) {
    if (API_ENABLED) {
      const result = await playerApi.claimDailyReward()
      setApiStats((prev) =>
        prev ? { ...prev, kepingGaruda: result.newKepingTotal, dailyRewardClaimed: true } : prev,
      )
    } else {
      localClaimDailyReward(kepingGaruda)
    }
  }

  return { profile, isLoading, claimDailyReward }
}
