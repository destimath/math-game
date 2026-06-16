import { PlayerProfile } from '../../domain/entities/Player'
import { ProgressBar } from './ProgressBar'

interface StatusBarProps {
  profile: PlayerProfile
}

export function StatusBar({ profile }: StatusBarProps) {
  return (
    <div className="flex items-center gap-3 rounded-card bg-white/80 px-4 py-3 shadow-md">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-garuda-gold text-2xl ring-4 ring-garuda-gold/50">
        🧒
      </div>
      <div className="flex-1">
        <div className="mb-1 text-sm font-bold text-garuda-blue">Lv.{profile.level}</div>
        <ProgressBar value={profile.xp} max={profile.xpToNextLevel} />
      </div>
      <div className="shrink-0 font-bold text-garuda-gold">
        🪶 {profile.kepingGaruda.toLocaleString('id-ID')}
      </div>
    </div>
  )
}
