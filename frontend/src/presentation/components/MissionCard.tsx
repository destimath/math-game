import { Mission } from '../../store/missionStore'

interface MissionCardProps {
  mission: Mission
  onClaim: (id: string) => void
}

export function MissionCard({ mission, onClaim }: MissionCardProps) {
  const pct = Math.min(100, Math.round((mission.progress / mission.target) * 100))
  const done = mission.progress >= mission.target
  const canClaim = done && !mission.claimed

  return (
    <div className={`flex items-center gap-3 rounded-2xl p-3 transition-all ${
      mission.claimed ? 'bg-garuda-green/10' : done ? 'bg-garuda-gold/10' : 'bg-white/60'
    }`}>
      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-lg ${
        mission.claimed ? 'bg-garuda-green text-white' : done ? 'bg-garuda-gold text-white' : 'bg-garuda-blue/10'
      }`}>
        {mission.claimed ? '✅' : done ? '🎁' : '📋'}
      </div>

      <div className="flex-1 min-w-0">
        <p className={`text-sm font-bold leading-tight ${
          mission.claimed ? 'text-garuda-blue/50 line-through' : 'text-garuda-blue'
        }`}>
          {mission.label}
        </p>
        <div className="mt-1 flex items-center gap-2">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-garuda-blue/10">
            <div
              className={`h-full rounded-full transition-all ${done ? 'bg-garuda-gold' : 'bg-garuda-blue/40'}`}
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="shrink-0 text-xs font-bold text-garuda-blue/50">
            {mission.progress}/{mission.target}
          </span>
        </div>
      </div>

      {canClaim ? (
        <button
          onClick={() => onClaim(mission.id)}
          className="shrink-0 animate-pulse rounded-xl bg-garuda-gold px-3 py-1.5 text-xs font-extrabold text-white shadow hover:animate-none"
        >
          +{mission.reward}🪶
        </button>
      ) : mission.claimed ? (
        <span className="shrink-0 text-xs font-bold text-garuda-green">Diklaim!</span>
      ) : null}
    </div>
  )
}
