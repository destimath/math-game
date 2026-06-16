export type DifficultyLevel = 'easy' | 'medium' | 'hard'

export interface BattleQuestion {
  id: string
  prompt: string
  options: number[]
  correctAnswer: number
  timeLimitSeconds: number
  difficulty: DifficultyLevel
}
