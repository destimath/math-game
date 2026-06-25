import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { BattleResult } from '../../application/battle/useBattleSession'
import { usePlayerProfile } from '../../application/player/usePlayerProfile'
import { battleApi } from '../../infrastructure/api/battleApi'
import { useInventoryStore } from '../../store/inventoryStore'
import { useMissionStore } from '../../store/missionStore'
import { usePlayerStore } from '../../store/playerStore'
import { BATTLES_PER_REGION, useRegionStore } from '../../store/regionStore'
import { useToastStore } from '../../store/toastStore'
import { Button } from '../components/Button'
import { RevealRow } from '../components/RevealRow'
import { XpBar } from '../components/XpBar'

const API_ENABLED = import.meta.env.VITE_API_ENABLED === 'true'

const DIFFICULTY_LABEL: Record<string, string> = {
  easy: '🌱 MUDAH',
  medium: '⚡ SEDANG',
  hard: '🔥 SULIT',
}

const REGION_LABEL: Record<string, string> = {
  sumatra: 'Sumatra ⛵',
  kalimantan: 'Kalimantan 🌳',
  java: 'Jawa 🌾',
  bali: 'Bali 🛕',
  sulawesi: 'Sulawesi 🌊',
  maluku: 'Maluku 🏰',
  papua: 'Papua 🦜',
}

const DEFAULT_RESULT: BattleResult = {
  xpEarned: 0,
  kepingEarned: 0,
  questionsAnswered: 0,
  questionsCorrect: 0,
  difficulty: 'easy',
  maxCombo: 0,
}

type LocationState = BattleResult & { regionId?: string }

export function VictoryPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { profile } = usePlayerProfile()
  const applyBattleResult = usePlayerStore((s) => s.applyBattleResult)
  const completeBattle = useRegionStore((s) => s.completeBattle)
  const storeRegions = useRegionStore((s) => s.regions)

  const [revealCount, setRevealCount] = useState(0)
  const [leveledUp, setLeveledUp] = useState(false)
  const [unlockedRegionId, setUnlockedRegionId] = useState<string | null>(null)
  const [bayuUnlocked, setBayuUnlocked] = useState(false)

  const unlockPrasasti = useInventoryStore((s) => s.unlockPrasasti)
  const prasasti = useInventoryStore((s) => s.prasasti)
  const showToast = useToastStore((s) => s.show)
  const unlockCharacter = usePlayerStore((s) => s.unlockCharacter)
  const winStreak = useMissionStore((s) => s.winStreak)
  const toastFired = useRef(false)
  const regionProcessed = useRef(false)
  const missionsTracked = useRef(false)

  const trackBattleWon = useMissionStore((s) => s.trackBattleWon)
  const trackBattlePlayed = useMissionStore((s) => s.trackBattlePlayed)

  const state = (location.state as LocationState | null) ?? {}
  const result: BattleResult = {
    xpEarned: state.xpEarned ?? DEFAULT_RESULT.xpEarned,
    kepingEarned: state.kepingEarned ?? DEFAULT_RESULT.kepingEarned,
    questionsAnswered: state.questionsAnswered ?? DEFAULT_RESULT.questionsAnswered,
    questionsCorrect: state.questionsCorrect ?? DEFAULT_RESULT.questionsCorrect,
    difficulty: state.difficulty ?? DEFAULT_RESULT.difficulty,
    maxCombo: state.maxCombo ?? DEFAULT_RESULT.maxCombo,
  }
  const regionId = state.regionId ?? 'sumatra'
  const regionData = storeRegions[regionId]
  const battlesLeft = regionData
    ? Math.max(0, BATTLES_PER_REGION - regionData.battlesCompleted - 1)
    : 0

  // Track missions & region progress once on mount
  useEffect(() => {
    if (regionProcessed.current || !result.questionsAnswered) return
    regionProcessed.current = true
    const unlocked = completeBattle(regionId)
    if (unlocked) {
      setUnlockedRegionId(unlocked)
      // Sumatra selesai → Kalimantan terbuka → unlock karakter Bayu
      if (unlocked === 'kalimantan') {
        const didUnlock = unlockCharacter('bayu')
        if (didUnlock) setBayuUnlocked(true)
      }
    }
  }, [completeBattle, regionId, result.questionsAnswered, unlockCharacter])

  useEffect(() => {
    if (missionsTracked.current || !result.questionsAnswered) return
    missionsTracked.current = true
    trackBattlePlayed()
    trackBattleWon(result.kepingEarned)
  }, [result.questionsAnswered, result.kepingEarned, trackBattlePlayed, trackBattleWon])

  // Submit to backend once on mount
  const battleSent = useRef(false)
  useEffect(() => {
    if (!API_ENABLED || battleSent.current || !result.questionsAnswered) return
    battleSent.current = true
    battleApi
      .complete({
        xpEarned: result.xpEarned,
        kepingEarned: result.kepingEarned,
        questionsAnswered: result.questionsAnswered,
        questionsCorrect: result.questionsCorrect,
        victory: true,
      })
      .then((res) => {
        applyBattleResult({
          level: res.newLevel,
          xp: res.newXp,
          xpToNextLevel: res.newXpToNextLevel,
          kepingGaruda: res.newKepingGaruda,
          leveledUp: res.leveledUp,
        })
        if (res.leveledUp) setLeveledUp(true)
      })
      .catch(console.error)
  }, [result, applyBattleResult])

  // Staggered reveal animation
  useEffect(() => {
    if (revealCount >= 4) return
    const timeout = setTimeout(() => setRevealCount((c) => c + 1), 500)
    return () => clearTimeout(timeout)
  }, [revealCount])

  // Prasasti checks after all rows revealed
  useEffect(() => {
    if (revealCount < 4 || toastFired.current) return
    toastFired.current = true

    const timeout = setTimeout(() => {
      // Urutan prioritas: cek satu per satu, tampilkan yang pertama berhasil
      const checks: [string, () => boolean][] = [
        ['penakluk-kabut', () => !prasasti.find((p) => p.id === 'penakluk-kabut')?.isUnlocked],
        ['raja-combo', () => result.maxCombo >= 5 && !prasasti.find((p) => p.id === 'raja-combo')?.isUnlocked],
        ['tak-terhentikan', () => profile.streakDays >= 7 && !prasasti.find((p) => p.id === 'tak-terhentikan')?.isUnlocked],
      ]

      for (const [id, condition] of checks) {
        if (condition()) {
          const unlocked = unlockPrasasti(id)
          if (unlocked) {
            showToast(unlocked)
            break
          }
        }
      }
    }, 600)
    return () => clearTimeout(timeout)
  }, [revealCount, unlockPrasasti, showToast, prasasti, result.maxCombo, profile.streakDays])

  // Row 4 label: most notable prasasti dari battle ini
  const prasastiLabel = result.maxCombo >= 5 ? 'Raja Combo! (x' + result.maxCombo + ')' : 'Garuda Berlatih'

  return (
    <div className="flex h-full flex-col items-center overflow-y-auto p-6 text-center">
    <div className="m-auto flex w-full flex-col items-center gap-4">

      {/* Unlock banner — muncul di atas jika pulau baru terbuka */}
      {unlockedRegionId && (
        <div className="animate-pop-correct w-full rounded-2xl bg-gradient-to-r from-garuda-gold to-amber-400 p-4 shadow-xl">
          <p className="text-xs font-bold uppercase tracking-wider text-white/80">Pulau Baru Terbuka!</p>
          <p className="text-xl font-extrabold text-white">
            🎊 {REGION_LABEL[unlockedRegionId]}
          </p>
          <p className="text-sm text-white/80">Kamu sudah siap berpetualang ke sana!</p>
        </div>
      )}

      {/* Karakter Bayu terbuka */}
      {bayuUnlocked && (
        <div className="animate-pop-correct w-full rounded-2xl bg-gradient-to-r from-garuda-blue to-sky-500 p-4 shadow-xl">
          <p className="text-xs font-bold uppercase tracking-wider text-white/80">Karakter Baru!</p>
          <p className="text-xl font-extrabold text-white">🦅 Bayu terbuka!</p>
          <p className="text-sm text-white/80">Pilih Bayu di halaman Profil-mu.</p>
        </div>
      )}

      {/* Level-up banner */}
      {leveledUp && (
        <div className="animate-pop-correct rounded-2xl bg-garuda-gold px-6 py-3 shadow-lg">
          <p className="text-lg font-extrabold text-white">🌟 NAIK LEVEL! Lv.{profile.level}</p>
        </div>
      )}

      <h1 className="text-2xl font-extrabold text-garuda-blue">🎉 KEMENANGAN! 🎉</h1>
      <p className="text-garuda-blue/70">
        Kamu menjawab {result.questionsCorrect}/{result.questionsAnswered} soal dengan benar!
      </p>
      <span className="rounded-full bg-garuda-blue/10 px-3 py-1 text-xs font-bold text-garuda-blue">
        {DIFFICULTY_LABEL[result.difficulty ?? 'easy']}
      </span>

      <div className="w-full space-y-4 rounded-card bg-white/80 p-4 shadow-md">
        <RevealRow visible={revealCount >= 1}>
          <div className="w-full text-left">
            <XpBar
              fromXp={profile.xp}
              xpEarned={result.xpEarned}
              maxXp={profile.xpToNextLevel}
              level={profile.level}
              active={revealCount >= 1}
            />
          </div>
        </RevealRow>

        <RevealRow visible={revealCount >= 2}>
          <span className="font-bold text-garuda-blue">🪶 Keping Garuda</span>
          <span className="font-bold text-garuda-gold">+{result.kepingEarned}</span>
        </RevealRow>

        <RevealRow visible={revealCount >= 3}>
          <span className="font-bold text-garuda-blue">🗺️ {REGION_LABEL[regionId] ?? regionId}</span>
          {!unlockedRegionId && battlesLeft > 0 ? (
            <span className="text-sm font-bold text-garuda-blue/60">{battlesLeft} battle lagi</span>
          ) : (
            <span className="font-bold text-garuda-green">✓ SELESAI!</span>
          )}
        </RevealRow>

        <RevealRow visible={revealCount >= 4}>
          <span className="font-bold text-garuda-blue">🏅 Pencapaian</span>
          <span className="font-bold text-garuda-blue">{prasastiLabel}</span>
        </RevealRow>
      </div>

      <div
        className={`w-full space-y-3 transition-opacity ${revealCount >= 4 ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
      >
        <Button className="w-full" onClick={() => navigate('/map')}>
          {unlockedRegionId ? '🗺️ LIHAT PETA BARU' : '▶ LANJUTKAN'}
        </Button>

        {/* Adaptive difficulty hint: streak >= 3 dan bukan level hard */}
        {winStreak >= 3 && result.difficulty !== 'hard' && (
          <Button
            variant="secondary"
            className="w-full"
            onClick={() =>
              navigate('/battle', {
                state: {
                  regionId,
                  difficulty: result.difficulty === 'easy' ? 'medium' : 'hard',
                },
              })
            }
          >
            💪 Kamu hebat! Coba {result.difficulty === 'easy' ? '⚡ SEDANG' : '🔥 SULIT'}?
          </Button>
        )}
      </div>
    </div>
    </div>
  )
}
