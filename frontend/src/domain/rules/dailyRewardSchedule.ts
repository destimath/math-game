import { DailyRewardEntry } from '../entities/DailyReward'

export const DAILY_REWARD_SCHEDULE: DailyRewardEntry[] = [
  { day: 1, icon: '🪶', label: '10 Keping Garuda', kepingGaruda: 10 },
  { day: 2, icon: '🪶', label: '15 Keping Garuda', kepingGaruda: 15 },
  { day: 3, icon: '🪶', label: '20 Keping Garuda', kepingGaruda: 20 },
  { day: 4, icon: '🪶', label: '25 Keping Garuda', kepingGaruda: 25 },
  { day: 5, icon: '🪶', label: '30 Keping Garuda', kepingGaruda: 30 },
  { day: 6, icon: '🪶', label: '40 Keping Garuda', kepingGaruda: 40 },
  { day: 7, icon: '🎁', label: 'Hadiah Spesial!', kepingGaruda: 100 },
]

export function getRewardForDay(day: number): DailyRewardEntry {
  const index = (day - 1) % DAILY_REWARD_SCHEDULE.length
  return DAILY_REWARD_SCHEDULE[index]
}
