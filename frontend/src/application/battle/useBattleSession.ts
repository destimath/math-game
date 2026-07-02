import { useCallback, useEffect, useRef, useState } from 'react'
import { QUESTION_BANK } from '../../domain/data/questionBank'
import { BattleQuestion, DifficultyLevel } from '../../domain/entities/BattleQuestion'
import { calculateDamage } from '../../domain/rules/calculateDamage'
import { calculateXp } from '../../domain/rules/calculateXp'
import { calculateKabutEffect } from '../../domain/rules/calculateKabutEffect'
import { sfxPlayer } from '../../infrastructure/audio/sfxPlayer'

const SEMANGAT_REGEN = 5

const DIFFICULTY_CONFIG: Record<
  DifficultyLevel,
  { questionCount: number; kepingPerCorrect: number }
> = {
  easy:   { questionCount: 8,  kepingPerCorrect: 3 },
  medium: { questionCount: 10, kepingPerCorrect: 5 },
  hard:   { questionCount: 12, kepingPerCorrect: 8 },
}

function shufflePick<T>(arr: T[], n: number): T[] {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy.slice(0, n)
}

const STARTING_BAR = 100

export type AnswerFeedback = 'correct' | 'wrong' | null

export interface BattleResult {
  xpEarned: number
  kepingEarned: number
  questionsAnswered: number
  questionsCorrect: number
  difficulty: DifficultyLevel
  maxCombo: number
}

export interface DefeatResult {
  questionsAnswered: number
  questionsCorrect: number
  difficulty: DifficultyLevel
}

export function useBattleSession(
  onComplete: (result: BattleResult) => void,
  onDefeat: (result: DefeatResult) => void,
  difficulty: DifficultyLevel = 'easy',
  isPaused: boolean = false,
) {
  const config = DIFFICULTY_CONFIG[difficulty]

  const questionsRef = useRef<BattleQuestion[]>(
    shufflePick(
      QUESTION_BANK.filter((q) => q.difficulty === difficulty),
      config.questionCount,
    ),
  )
  const QUESTIONS = questionsRef.current

  const [questionIndex, setQuestionIndex] = useState(0)
  const [bossBar, setBossBar] = useState(STARTING_BAR)
  const [semangatBar, setSemangatBar] = useState(STARTING_BAR)
  const [combo, setCombo] = useState(0)
  const [maxCombo, setMaxCombo] = useState(0)
  const maxComboRef = useRef(0)
  const [xpEarned, setXpEarned] = useState(0)
  const [kepingEarned, setKepingEarned] = useState(0)
  const [questionsCorrect, setQuestionsCorrect] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [feedback, setFeedback] = useState<AnswerFeedback>(null)
  const [showGarudaStrike, setShowGarudaStrike] = useState(false)
  const [secondsLeft, setSecondsLeft] = useState(QUESTIONS[0].timeLimitSeconds)
  const [eliminatedOptions, setEliminatedOptions] = useState<number[]>([])

  const currentQuestion = QUESTIONS[questionIndex]
  const isLastQuestion = questionIndex === QUESTIONS.length - 1

  const advance = useCallback(
    (finalBossBar: number, finalXp: number, finalKeping: number, finalCorrect: number) => {
      if (finalBossBar <= 0 || isLastQuestion) {
        onComplete({
          xpEarned: finalXp,
          kepingEarned: finalKeping,
          questionsAnswered: questionIndex + 1,
          questionsCorrect: finalCorrect,
          difficulty,
          maxCombo: maxComboRef.current,
        })
        return
      }
      const nextIndex = questionIndex + 1
      setQuestionIndex(nextIndex)
      setSelectedAnswer(null)
      setFeedback(null)
      setShowGarudaStrike(false)
      setEliminatedOptions([])
      setSecondsLeft(QUESTIONS[nextIndex].timeLimitSeconds)
    },
    [isLastQuestion, questionIndex, onComplete, difficulty, QUESTIONS],
  )

  const submitAnswer = useCallback(
    (answer: number | null) => {
      if (feedback) return
      const isCorrect = answer !== null && answer === currentQuestion.correctAnswer
      setSelectedAnswer(answer)

      if (isCorrect) {
        const newCombo = combo + 1
        const newMaxCombo = Math.max(maxComboRef.current, newCombo)
        maxComboRef.current = newMaxCombo
        const { damage, isGarudaStrike } = calculateDamage(
          newCombo, difficulty, secondsLeft, currentQuestion.timeLimitSeconds,
        )
        const newBossBar = Math.max(0, bossBar - damage)
        const xpGain = calculateXp(newCombo, difficulty)
        const newXp = xpEarned + xpGain
        const newKeping = kepingEarned + config.kepingPerCorrect
        const newCorrect = questionsCorrect + 1
        const newSemangat = Math.min(STARTING_BAR, semangatBar + SEMANGAT_REGEN)

        setCombo(newCombo)
        setMaxCombo(newMaxCombo)
        setBossBar(newBossBar)
        setXpEarned(newXp)
        setKepingEarned(newKeping)
        setQuestionsCorrect(newCorrect)
        setSemangatBar(newSemangat)
        setFeedback('correct')
        setShowGarudaStrike(isGarudaStrike)

        if (isGarudaStrike) sfxPlayer.playGarudaStrike()
        else sfxPlayer.playCorrect()

        setTimeout(() => advance(newBossBar, newXp, newKeping, newCorrect), 1000)
      } else {
        const kabut = calculateKabutEffect(difficulty)
        const newSemangat = Math.max(0, semangatBar - kabut)
        setCombo(0)
        setSemangatBar(newSemangat)
        setFeedback('wrong')
        sfxPlayer.playWrong()

        if (newSemangat <= 0) {
          setTimeout(
            () => onDefeat({ questionsAnswered: questionIndex + 1, questionsCorrect, difficulty }),
            1000,
          )
        } else {
          setTimeout(() => advance(bossBar, xpEarned, kepingEarned, questionsCorrect), 1000)
        }
      }
    },
    [
      feedback, currentQuestion, combo, bossBar, semangatBar, xpEarned, kepingEarned,
      questionsCorrect, advance, onDefeat, questionIndex, config, difficulty,
    ],
  )

  const addExtraSeconds = useCallback((sec: number) => {
    setSecondsLeft((s) => s + sec)
  }, [])

  const eliminateWrongOptions = useCallback(() => {
    const wrong = currentQuestion.options.filter((o) => o !== currentQuestion.correctAnswer)
    setEliminatedOptions(shufflePick(wrong, Math.min(2, wrong.length)))
  }, [currentQuestion])

  useEffect(() => {
    if (feedback || isPaused) return
    if (secondsLeft <= 0) {
      submitAnswer(null)
      return
    }
    if (secondsLeft <= 3) sfxPlayer.playTimerTick()
    const timeout = setTimeout(() => setSecondsLeft((s) => s - 1), 1000)
    return () => clearTimeout(timeout)
  }, [secondsLeft, feedback, isPaused, submitAnswer])

  return {
    currentQuestion,
    questionNumber: questionIndex + 1,
    totalQuestions: QUESTIONS.length,
    bossBar,
    semangatBar,
    combo,
    maxCombo,
    secondsLeft,
    selectedAnswer,
    feedback,
    showGarudaStrike,
    eliminatedOptions,
    submitAnswer,
    addExtraSeconds,
    eliminateWrongOptions,
    difficulty,
  }
}
