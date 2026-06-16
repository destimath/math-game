import { useNavigate } from 'react-router-dom'
import { useInventory } from '../../application/player/useInventory'
import { usePlayerProfile } from '../../application/player/usePlayerProfile'
import { getGarudaRank } from '../../domain/rules/getGarudaRank'
import { useAuthStore } from '../../store/authStore'
import { usePlayerStore } from '../../store/playerStore'
import { ProgressBar } from '../components/ProgressBar'

const CHARACTER_EMOJI: Record<string, string> = {
  sari: '🧒',
  bayu: '🦅',
  made: '🌺',
  tiwi: '🌸',
  rian: '⚡',
}

export function ProfilePage() {
  const navigate = useNavigate()
  const { profile } = usePlayerProfile()
  const { prasasti } = useInventory()
  const logout = useAuthStore((s) => s.logout)
  const setActiveCharacter = usePlayerStore((s) => s.setActiveCharacter)

  const unlockedPrasasti = prasasti.filter((item) => item.isUnlocked).length

  return (
    <div className="p-4 md:p-6">
      <div className="gap-6 md:grid md:grid-cols-[260px_1fr]">
        {/* Kolom kiri — avatar & identitas */}
        <div className="space-y-4">
          <div className="flex flex-col items-center gap-3 rounded-card bg-white/80 p-5 shadow-md">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-garuda-gold text-4xl ring-4 ring-garuda-gold/50">
              🧒
            </div>
            <h1 className="text-xl font-extrabold text-garuda-blue">{profile.name}</h1>
            <span className="rounded-full bg-garuda-blue/10 px-3 py-1 text-xs font-bold text-garuda-blue">
              🦅 {getGarudaRank(profile.level)}
            </span>
            <div className="w-full">
              <div className="mb-1 flex justify-between text-xs font-bold text-garuda-blue">
                <span>Lv.{profile.level}</span>
                <span>{profile.xp}/{profile.xpToNextLevel} XP</span>
              </div>
              <ProgressBar value={profile.xp} max={profile.xpToNextLevel} />
            </div>
          </div>

          <button
            onClick={() => { logout(); navigate('/login') }}
            className="hidden w-full pb-2 text-center text-xs font-bold text-garuda-blue/40 underline md:block"
          >
            Keluar
          </button>
        </div>

        {/* Kolom kanan — stats & koleksi */}
        <div className="mt-4 space-y-4 md:mt-0">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="rounded-card bg-white/80 p-3 shadow-md">
              <div className="text-2xl">🪶</div>
              <div className="font-bold text-garuda-blue">{profile.kepingGaruda.toLocaleString('id-ID')}</div>
              <div className="text-xs text-garuda-blue/60">Keping Garuda</div>
            </div>
            <div className="rounded-card bg-white/80 p-3 shadow-md">
              <div className="text-2xl">🔥</div>
              <div className="font-bold text-garuda-blue">{profile.streakDays}</div>
              <div className="text-xs text-garuda-blue/60">Streak Hari</div>
            </div>
            <div className="rounded-card bg-white/80 p-3 shadow-md">
              <div className="text-2xl">🏅</div>
              <div className="font-bold text-garuda-blue">{unlockedPrasasti}/{prasasti.length}</div>
              <div className="text-xs text-garuda-blue/60">Prasasti</div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-garuda-blue">SAHABAT GARUDA</h3>
            <div className="grid grid-cols-3 gap-3 md:grid-cols-5">
              {profile.characters.map((character) => (
                <button
                  key={character.id}
                  disabled={!character.isUnlocked || character.isActive}
                  onClick={() => setActiveCharacter(character.id)}
                  className={`flex flex-col items-center gap-1 rounded-card border-2 p-3 transition-transform active:scale-95 ${
                    character.isActive
                      ? 'border-garuda-gold bg-amber-100 ring-2 ring-garuda-gold/40'
                      : character.isUnlocked
                        ? 'border-garuda-blue/20 bg-white hover:border-garuda-blue/50'
                        : 'border-dashed border-garuda-blue/20 bg-garuda-blue/5 opacity-40 cursor-not-allowed'
                  }`}
                >
                  <div className="text-3xl">
                    {character.isUnlocked ? (CHARACTER_EMOJI[character.id] ?? '🧒') : '🔒'}
                  </div>
                  <span className="text-xs font-bold text-garuda-blue">
                    {character.name}
                  </span>
                  {character.isActive && (
                    <span className="rounded-full bg-garuda-gold px-2 py-0.5 text-[10px] font-bold text-white">
                      AKTIF
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Keluar hanya tampil di mobile (desktop ada di sidebar) */}
      <button
        onClick={() => { logout(); navigate('/login') }}
        className="mt-4 w-full pb-2 text-center text-xs font-bold text-garuda-blue/40 underline md:hidden"
      >
        Keluar
      </button>
    </div>
  )
}
