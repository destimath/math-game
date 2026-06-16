import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { BattleResult, DefeatResult, useBattleSession } from '../../application/battle/useBattleSession'
import { usePlayerProfile } from '../../application/player/usePlayerProfile'
import { DifficultyLevel } from '../../domain/entities/BattleQuestion'
import { useInventoryStore } from '../../store/inventoryStore'
import { BossCharacter } from '../components/BossCharacter'
import { ComboMeter } from '../components/ComboMeter'
import { PauseModal } from '../components/PauseModal'
import { ProgressBar } from '../components/ProgressBar'
import { TimerRing } from '../components/TimerRing'

const DIFFICULTY_LABEL: Record<DifficultyLevel, string> = {
  easy: '🌱 MUDAH',
  medium: '⚡ SEDANG',
  hard: '🔥 SULIT',
}

const MAX_ITEM_USE_PER_BATTLE = 2

export function BattlePage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { profile } = usePlayerProfile()
  const [isPaused, setIsPaused] = useState(false)

  const locationState = (location.state as { difficulty?: DifficultyLevel; regionId?: string } | null) ?? {}
  const difficulty: DifficultyLevel = locationState.difficulty ?? 'easy'
  const regionId: string = locationState.regionId ?? 'sumatra'

  // Item state
  const pusaka = useInventoryStore((s) => s.pusaka)
  const useItem = useInventoryStore((s) => s.useItem)
  const [itemBattleUse, setItemBattleUse] = useState<Record<string, number>>({})
  const buluWaktu = pusaka.find((p) => p.id === 'bulu-waktu')
  const buluPetunjuk = pusaka.find((p) => p.id === 'bulu-petunjuk')

  const handleComplete = (result: BattleResult) =>
    navigate('/victory', { state: { ...result, regionId } })
  const handleDefeat = (result: DefeatResult) =>
    navigate('/defeat', { state: { ...result, regionId } })

  const {
    currentQuestion,
    questionNumber,
    totalQuestions,
    bossBar,
    semangatBar,
    combo,
    secondsLeft,
    selectedAnswer,
    feedback,
    showGarudaStrike,
    eliminatedOptions,
    submitAnswer,
    addExtraSeconds,
    eliminateWrongOptions,
  } = useBattleSession(handleComplete, handleDefeat, difficulty, isPaused)

  function handleUseItem(id: string) {
    const used = itemBattleUse[id] ?? 0
    if (used >= MAX_ITEM_USE_PER_BATTLE) return
    if (!useItem(id)) return
    if (id === 'bulu-waktu') addExtraSeconds(10)
    if (id === 'bulu-petunjuk') eliminateWrongOptions()
    setItemBattleUse((prev) => ({ ...prev, [id]: used + 1 }))
  }

  // Key untuk paksa restart animasi setiap feedback baru
  const [animKey, setAnimKey] = useState(0)
  const prevFeedback = useRef(feedback)
  useEffect(() => {
    if (feedback !== null && feedback !== prevFeedback.current) {
      setAnimKey((k) => k + 1)
    }
    prevFeedback.current = feedback
  }, [feedback])

  // Key khusus untuk animasi boss (hanya saat jawaban benar)
  const [correctHitKey, setCorrectHitKey] = useState(0)
  useEffect(() => {
    if (feedback === 'correct') setCorrectHitKey((k) => k + 1)
  }, [feedback])

  const timedOut = feedback === 'wrong' && selectedAnswer === null

  return (
    <div className={`relative flex h-full flex-col gap-2 p-4 ${feedback === 'wrong' ? 'animate-shake' : ''}`}>

      {/* Flash overlay seluruh layar */}
      {feedback && (
        <div
          key={animKey}
          className={`pointer-events-none absolute inset-0 z-20 rounded-card ${
            feedback === 'correct'
              ? 'animate-flash-correct bg-garuda-green'
              : 'animate-flash-wrong bg-garuda-red'
          }`}
        />
      )}

      {/* Floating feedback text */}
      {feedback && (
        <div
          key={`float-${animKey}`}
          className="pointer-events-none absolute inset-x-0 top-1/3 z-30 flex justify-center"
        >
          <span
            className={`animate-float-up rounded-full px-5 py-2 text-2xl font-extrabold text-white shadow-lg ${
              feedback === 'correct' ? 'bg-garuda-green' : 'bg-garuda-red'
            }`}
          >
            {feedback === 'correct' ? '✓ Benar!' : timedOut ? '⏰ Waktu Habis!' : '✗ Salah!'}
          </span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <button onClick={() => setIsPaused(true)} className="text-xl text-garuda-blue">
          ⏸
        </button>
        <div className="text-center">
          <h1 className="font-bold text-garuda-blue">TANTANGAN ANGKA</h1>
          <span className="text-xs font-bold text-garuda-blue/50">{DIFFICULTY_LABEL[difficulty]}</span>
        </div>
        <TimerRing secondsLeft={secondsLeft} totalSeconds={currentQuestion.timeLimitSeconds} />
      </div>

      {/* Boss HP */}
      <div className="rounded-card bg-white/80 p-3 shadow-md">
        <div className="mb-2 flex items-center justify-between text-sm font-bold text-garuda-blue">
          <span>👻 SI KABUT BILANGAN</span>
          <span>Soal {questionNumber}/{totalQuestions}</span>
        </div>
        <ProgressBar value={bossBar} max={100} colorClassName="bg-gradient-to-r from-slate-400 to-slate-600" />
      </div>

      {/* Boss character */}
      <div className="relative flex flex-col items-center">
        {showGarudaStrike && (
          <>
            <div
              key={`ring-${correctHitKey}`}
              className="animate-strike-ring absolute h-24 w-24 rounded-full border-4 border-garuda-gold"
            />
            <div className="absolute -top-1 animate-bounce rounded-full bg-garuda-gold px-3 py-0.5 text-xs font-extrabold text-white shadow">
              ✨ Serangan Garuda!
            </div>
          </>
        )}
        <BossCharacter bossBar={bossBar} hitKey={correctHitKey} isGarudaStrike={showGarudaStrike} />
      </div>

      {/* Soal */}
      <div className="flex flex-1 flex-col justify-center gap-3">
        <div className="rounded-card bg-white p-5 text-center shadow-md">
          <p className="text-3xl font-extrabold text-garuda-blue">{currentQuestion.prompt}</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {currentQuestion.options.map((option) => {
            const isCorrectOption = option === currentQuestion.correctAnswer
            const isSelected = option === selectedAnswer
            const isEliminated = eliminatedOptions.includes(option) && !feedback

            let stateClasses = 'border-garuda-blue/20 bg-white text-garuda-blue'
            let icon: string | null = null
            let extraAnim = ''

            if (isEliminated) {
              stateClasses = 'border-garuda-blue/10 bg-garuda-blue/5 text-garuda-blue/30 line-through'
            } else if (feedback) {
              if (isCorrectOption) {
                stateClasses = 'border-garuda-green bg-garuda-green text-white'
                icon = '✅'
                extraAnim = 'animate-pop-correct'
              } else if (isSelected) {
                stateClasses = 'border-garuda-red bg-garuda-red/80 text-white'
                icon = '✗'
              } else {
                stateClasses = 'border-garuda-blue/10 bg-white/50 text-garuda-blue/40'
              }
            }

            return (
              <button
                key={option}
                disabled={Boolean(feedback) || isEliminated}
                onClick={() => submitAnswer(option)}
                className={`flex items-center justify-center gap-2 rounded-2xl border-2 py-4 text-xl font-bold shadow-[0_4px_0_rgba(0,0,0,0.1)] transition-all active:translate-y-1 active:shadow-none ${stateClasses} ${extraAnim}`}
              >
                {option}
                {icon && <span>{icon}</span>}
              </button>
            )
          })}
        </div>
      </div>

      {/* Combo meter */}
      <ComboMeter combo={combo} feedback={feedback} />

      {/* Semangat bar */}
      <div className="space-y-1.5 rounded-card bg-white/80 p-3 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-bold text-garuda-blue">
            <span>🧒 {profile.name}</span>
            <span className="text-xs text-garuda-blue/40">SEMANGAT</span>
          </div>
          {/* Item buttons */}
          <div className="flex gap-2">
            {buluWaktu && (
              <button
                disabled={
                  Boolean(feedback) ||
                  buluWaktu.quantity <= 0 ||
                  (itemBattleUse['bulu-waktu'] ?? 0) >= MAX_ITEM_USE_PER_BATTLE
                }
                onClick={() => handleUseItem('bulu-waktu')}
                title="Bulu Waktu: +10 detik"
                className={`flex items-center gap-1 rounded-xl border-2 px-2 py-1 text-xs font-bold transition-all ${
                  buluWaktu.quantity > 0 && (itemBattleUse['bulu-waktu'] ?? 0) < MAX_ITEM_USE_PER_BATTLE
                    ? 'border-garuda-gold bg-garuda-gold/10 text-garuda-blue hover:bg-garuda-gold/20 active:scale-95'
                    : 'border-garuda-blue/10 bg-white/30 text-garuda-blue/30'
                }`}
              >
                🪶 <span>{buluWaktu.quantity}</span>
              </button>
            )}
            {buluPetunjuk && (
              <button
                disabled={
                  Boolean(feedback) ||
                  buluPetunjuk.quantity <= 0 ||
                  (itemBattleUse['bulu-petunjuk'] ?? 0) >= MAX_ITEM_USE_PER_BATTLE ||
                  eliminatedOptions.length > 0
                }
                onClick={() => handleUseItem('bulu-petunjuk')}
                title="Bulu Petunjuk: hapus 2 jawaban salah"
                className={`flex items-center gap-1 rounded-xl border-2 px-2 py-1 text-xs font-bold transition-all ${
                  buluPetunjuk.quantity > 0 &&
                  (itemBattleUse['bulu-petunjuk'] ?? 0) < MAX_ITEM_USE_PER_BATTLE &&
                  eliminatedOptions.length === 0
                    ? 'border-garuda-blue/40 bg-sky-50 text-garuda-blue hover:bg-sky-100 active:scale-95'
                    : 'border-garuda-blue/10 bg-white/30 text-garuda-blue/30'
                }`}
              >
                💡 <span>{buluPetunjuk.quantity}</span>
              </button>
            )}
          </div>
        </div>
        <ProgressBar value={semangatBar} max={100} colorClassName="bg-gradient-to-r from-sky-400 to-purple-400" />
      </div>

      {isPaused && (
        <PauseModal
          onResume={() => setIsPaused(false)}
          onRestart={() => navigate('/battle')}
          onExitToMap={() => navigate('/map')}
        />
      )}
    </div>
  )
}
