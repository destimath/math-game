import { useState } from 'react'
import { useLeaderboard } from '../../application/leaderboard/useLeaderboard'
import { usePlayerProfile } from '../../application/player/usePlayerProfile'
import { LeaderboardEntry } from '../../domain/entities/LeaderboardEntry'

type LeaderboardTab = 'kelas' | 'semua'

type PodiumRank = 1 | 2 | 3

const PODIUM_CFG: Record<PodiumRank, { medal: string; height: string; bar: string; ring: string }> = {
  1: { medal: '🥇', height: 'h-20', bar: 'bg-garuda-gold', ring: 'ring-garuda-gold' },
  2: { medal: '🥈', height: 'h-14', bar: 'bg-slate-300', ring: 'ring-slate-300' },
  3: { medal: '🥉', height: 'h-10', bar: 'bg-amber-700/80', ring: 'ring-amber-700' },
}

function PodiumSlot({ entry }: { entry: LeaderboardEntry }) {
  const cfg = PODIUM_CFG[entry.rank as PodiumRank]
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="max-w-[64px] truncate text-xs font-bold text-white">{entry.name}</span>
      <span className="text-xs text-white/70">Lv.{entry.level}</span>
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-full bg-white/90 ring-4 text-2xl ${cfg.ring}`}
      >
        🧒
      </div>
      <div className={`flex w-16 items-end justify-center rounded-t-xl ${cfg.bar} ${cfg.height}`}>
        <span className="mb-1 text-lg">{cfg.medal}</span>
      </div>
    </div>
  )
}

function RankRow({ entry, showStar = false }: { entry: LeaderboardEntry; showStar?: boolean }) {
  return (
    <div
      className={`flex items-center gap-3 rounded-card px-4 py-3 shadow-sm ${
        entry.isCurrentPlayer || showStar
          ? 'border-2 border-garuda-gold bg-amber-50'
          : 'bg-white/80'
      }`}
    >
      <span className="w-6 text-center text-sm font-extrabold text-garuda-blue/50">{entry.rank}</span>
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-garuda-blue/10 text-xl">
        🧒
      </div>
      <div className="flex-1">
        <div className="font-bold text-garuda-blue">
          {entry.name} {(entry.isCurrentPlayer || showStar) && '⭐'}
        </div>
        <div className="text-xs text-garuda-blue/60">Lv.{entry.level}</div>
      </div>
      <div className="text-sm font-bold text-garuda-gold">🪶 {entry.kepingGaruda}</div>
    </div>
  )
}

export function LeaderboardPage() {
  const [tab, setTab] = useState<LeaderboardTab>('kelas')
  const { classEntries, globalEntries, playerGlobalRank } = useLeaderboard()
  const { profile } = usePlayerProfile()

  const entries = tab === 'kelas' ? classEntries : globalEntries
  const top3 = entries.slice(0, 3)
  const rest = entries.slice(3)
  const playerInList = entries.some((e) => e.isCurrentPlayer)

  const podiumOrder = [top3[1], top3[0], top3[2]].filter((e): e is LeaderboardEntry => Boolean(e))

  return (
    <div className="flex flex-col">
      <div className="bg-gradient-to-b from-garuda-blue to-sky-500 px-4 pb-6 pt-4">
        <h1 className="mb-3 text-center text-lg font-extrabold text-white">🏆 PAPAN PERINGKAT</h1>

        <div className="mb-5 flex rounded-2xl bg-white/20 p-1">
          <button
            onClick={() => setTab('kelas')}
            className={`flex-1 rounded-xl py-2 text-sm font-bold transition-colors ${
              tab === 'kelas' ? 'bg-white text-garuda-blue shadow' : 'text-white'
            }`}
          >
            🏫 Kelas
          </button>
          <button
            onClick={() => setTab('semua')}
            className={`flex-1 rounded-xl py-2 text-sm font-bold transition-colors ${
              tab === 'semua' ? 'bg-white text-garuda-blue shadow' : 'text-white'
            }`}
          >
            🌏 Semua
          </button>
        </div>

        <div className="flex items-end justify-center gap-3">
          {podiumOrder.map((entry) => (
            <PodiumSlot key={entry.rank} entry={entry} />
          ))}
        </div>
      </div>

      <div className="space-y-2 p-4">
        {rest.map((entry) => (
          <RankRow key={entry.rank} entry={entry} />
        ))}

        {!playerInList && (
          <>
            <p className="py-1 text-center text-xs text-garuda-blue/40">• • •</p>
            <RankRow
              entry={{
                rank: playerGlobalRank,
                name: profile.name,
                level: profile.level,
                xp: profile.xp,
                kepingGaruda: profile.kepingGaruda,
                isCurrentPlayer: true,
              }}
            />
          </>
        )}
      </div>

      <div className="h-4" />
    </div>
  )
}
