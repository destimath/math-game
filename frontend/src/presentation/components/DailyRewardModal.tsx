import { DailyRewardEntry } from '../../domain/entities/DailyReward'
import { DAILY_REWARD_SCHEDULE, getRewardForDay } from '../../domain/rules/dailyRewardSchedule'
import { Button } from './Button'

interface DailyRewardModalProps {
  currentDay: number
  onClaim: (reward: DailyRewardEntry) => void
  onClose: () => void
}

export function DailyRewardModal({ currentDay, onClaim, onClose }: DailyRewardModalProps) {
  const todayReward = getRewardForDay(currentDay)
  const todayIndex = (currentDay - 1) % DAILY_REWARD_SCHEDULE.length

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-sm space-y-4 rounded-card bg-white p-5 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-garuda-blue">🔥 Hadiah Harian</h2>
          <button onClick={onClose} className="text-xl text-garuda-blue/40">
            ✕
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1">
          {DAILY_REWARD_SCHEDULE.map((reward, index) => {
            const isToday = index === todayIndex
            const isClaimed = index < todayIndex

            return (
              <div
                key={reward.day}
                className={`flex flex-col items-center gap-0.5 rounded-xl border-2 py-2 text-center ${
                  isToday
                    ? 'scale-105 border-garuda-gold bg-amber-100'
                    : isClaimed
                      ? 'border-garuda-green/40 bg-garuda-green/10'
                      : 'border-garuda-blue/10 bg-garuda-blue/5 opacity-60'
                }`}
              >
                <span className="text-[10px] font-bold text-garuda-blue/50">H{reward.day}</span>
                <span className="text-lg">{isClaimed ? '✅' : reward.icon}</span>
              </div>
            )
          })}
        </div>

        <div className="rounded-card bg-garuda-gold/10 p-4 text-center">
          <p className="text-sm font-bold text-garuda-blue">Hadiah Hari Ini</p>
          <p className="text-3xl">{todayReward.icon}</p>
          <p className="font-bold text-garuda-blue">{todayReward.label}</p>
        </div>

        <Button className="w-full" onClick={() => onClaim(todayReward)}>
          🎁 Klaim Sekarang!
        </Button>
      </div>
    </div>
  )
}
