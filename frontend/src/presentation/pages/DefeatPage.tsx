import { useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { DefeatResult } from '../../application/battle/useBattleSession'
import { DifficultyLevel } from '../../domain/entities/BattleQuestion'
import { useMissionStore } from '../../store/missionStore'
import { Button } from '../components/Button'

const TIPS = [
  'Gunakan 💡 Bulu Petunjuk untuk menghilangkan 2 pilihan jawaban yang salah.',
  'Baca soal dengan tenang — jangan terburu-buru sebelum memilih jawaban.',
  'Perhatikan nilai tempat setiap angka sebelum menjawab.',
  'Latihan setiap hari akan membuatmu semakin cepat dan akurat!',
]

const DIFFICULTY_LABEL: Record<DifficultyLevel, string> = {
  easy: '🌱 MUDAH',
  medium: '⚡ SEDANG',
  hard: '🔥 SULIT',
}

const EASIER: Record<DifficultyLevel, DifficultyLevel | null> = {
  easy: null,
  medium: 'easy',
  hard: 'medium',
}

const DEFAULT_RESULT: DefeatResult = { questionsAnswered: 0, questionsCorrect: 0, difficulty: 'easy' }

export function DefeatPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const result = (location.state as DefeatResult | null) ?? DEFAULT_RESULT
  const trackBattlePlayed = useMissionStore((s) => s.trackBattlePlayed)
  const trackBattleLost = useMissionStore((s) => s.trackBattleLost)
  const tracked = useRef(false)
  useEffect(() => {
    if (tracked.current) return
    tracked.current = true
    trackBattlePlayed()
    trackBattleLost()
  }, [trackBattlePlayed, trackBattleLost])
  const tip = TIPS[result.questionsAnswered % TIPS.length]
  const difficulty = result.difficulty ?? 'easy'
  const easierLevel = EASIER[difficulty]

  return (
    <div className="flex h-full flex-col items-center overflow-y-auto p-6 text-center">
    <div className="m-auto flex w-full flex-col items-center gap-5">
      <div className="animate-bounce text-6xl">😔</div>

      <div>
        <h1 className="text-2xl font-extrabold text-garuda-red">SEMANGAT HABIS!</h1>
        <p className="mt-1 text-garuda-blue/70">Jangan menyerah, Pejuang Garuda!</p>
      </div>

      <div className="w-full rounded-card bg-white/80 p-4 shadow-md">
        <span className="mb-2 inline-block rounded-full bg-garuda-blue/10 px-3 py-0.5 text-xs font-bold text-garuda-blue">
          {DIFFICULTY_LABEL[difficulty]}
        </span>
        <p className="mb-1 text-sm text-garuda-blue/60">Soal terjawab benar</p>
        <p className="text-4xl font-extrabold text-garuda-blue">
          {result.questionsCorrect}
          <span className="text-xl font-bold text-garuda-blue/40"> / {result.questionsAnswered}</span>
        </p>
      </div>

      <div className="flex w-full items-start gap-3 rounded-card bg-garuda-gold/10 p-4 text-left shadow-md">
        <span className="shrink-0 text-xl">💡</span>
        <p className="text-sm text-garuda-blue">{tip}</p>
      </div>

      <div className="flex w-full flex-col gap-3">
        <Button
          className="w-full"
          onClick={() => navigate('/battle', { state: { difficulty } })}
        >
          🔄 COBA LAGI ({DIFFICULTY_LABEL[difficulty]})
        </Button>
        {easierLevel && (
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => navigate('/battle', { state: { difficulty: easierLevel } })}
          >
            ⬇ Coba Level {DIFFICULTY_LABEL[easierLevel]}
          </Button>
        )}
        <Button variant="secondary" className="w-full" onClick={() => navigate('/map')}>
          🗺️ Kembali ke Peta
        </Button>
      </div>
    </div>
    </div>
  )
}
