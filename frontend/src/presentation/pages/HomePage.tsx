import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePlayerProfile } from '../../application/player/usePlayerProfile'
import { useMissionStore } from '../../store/missionStore'
import { usePlayerStore } from '../../store/playerStore'
import { useRegionStore, BATTLES_PER_REGION } from '../../store/regionStore'
import { Button } from '../components/Button'
import { DailyRewardModal } from '../components/DailyRewardModal'
import { MissionCard } from '../components/MissionCard'
import { ProgressBar } from '../components/ProgressBar'
import { StatusBar } from '../components/StatusBar'

export function HomePage() {
  const { profile, claimDailyReward } = usePlayerProfile()
  const navigate = useNavigate()
  const [isRewardModalOpen, setIsRewardModalOpen] = useState(false)

  const missions = useMissionStore((s) => s.missions)
  const claimMission = useMissionStore((s) => s.claimMission)
  const addKeping = usePlayerStore((s) => s.addKeping)

  const regions = useRegionStore((s) => s.regions)
  const activeRegion = Object.entries(regions).find(([, r]) => r.status === 'active')
  const activeProgress = activeRegion ? activeRegion[1].battlesCompleted : 0

  const pendingMissions = missions.filter((m) => m.progress >= m.target && !m.claimed).length

  function handleClaimMission(id: string) {
    const reward = claimMission(id)
    if (reward > 0) addKeping(reward)
  }

  return (
    <div className="p-4 md:p-6">
      <div className="mb-4 md:mb-6">
        <StatusBar profile={profile} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 md:gap-6">
        {/* Kolom kiri */}
        <div className="space-y-4">
          <div className="space-y-3 rounded-card border-4 border-garuda-gold/40 bg-white p-4 shadow-md">
            <h2 className="text-lg font-bold text-garuda-blue">⛵ Petualangan Sumatra</h2>
            <ProgressBar value={activeProgress} max={BATTLES_PER_REGION} />
            <p className="text-sm text-garuda-blue/70">
              Progres: {activeProgress}/{BATTLES_PER_REGION} Tantangan Angka
            </p>
            <Button className="w-full" onClick={() => navigate('/map')}>
              ▶ AYO LANJUT!
            </Button>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-garuda-blue">SAHABAT GARUDA</h3>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {profile.characters.map((character) => (
                <div key={character.id} className="flex shrink-0 flex-col items-center gap-1">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl border-2 text-2xl ${
                      character.isActive
                        ? 'border-garuda-gold bg-amber-100'
                        : character.isUnlocked
                          ? 'border-garuda-blue/30 bg-white'
                          : 'border-dashed border-garuda-blue/20 bg-garuda-blue/5 opacity-50'
                    }`}
                  >
                    {character.isUnlocked ? '🧒' : '🔒'}
                  </div>
                  <span className="text-xs font-bold text-garuda-blue">
                    {character.name} {character.isActive && '⭐'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Kolom kanan */}
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-card bg-garuda-red/90 px-4 py-3 text-white shadow-md">
            <span className="font-bold">🔥 Streak {profile.streakDays} hari</span>
            {!profile.dailyRewardClaimed && (
              <Button
                variant="secondary"
                className="animate-pulse px-4 py-2 text-sm"
                onClick={() => setIsRewardModalOpen(true)}
              >
                🎁 Klaim Hadiah!
              </Button>
            )}
          </div>

          <div className="space-y-2 rounded-card bg-white/80 p-4 shadow-md">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-bold text-garuda-blue">MISI HARIAN</h3>
              {pendingMissions > 0 && (
                <span className="rounded-full bg-garuda-gold px-2 py-0.5 text-xs font-extrabold text-white">
                  {pendingMissions} bisa diklaim!
                </span>
              )}
            </div>
            <div className="space-y-2">
              {missions.map((mission) => (
                <MissionCard key={mission.id} mission={mission} onClaim={handleClaimMission} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {isRewardModalOpen && (
        <DailyRewardModal
          currentDay={profile.streakDays}
          onClaim={(reward) => {
            claimDailyReward(reward.kepingGaruda)
            setIsRewardModalOpen(false)
          }}
          onClose={() => setIsRewardModalOpen(false)}
        />
      )}
    </div>
  )
}
