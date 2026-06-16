interface TimerRingProps {
  secondsLeft: number
  totalSeconds: number
}

const RADIUS = 18
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export function TimerRing({ secondsLeft, totalSeconds }: TimerRingProps) {
  const fraction = totalSeconds > 0 ? Math.max(0, secondsLeft / totalSeconds) : 0
  const offset = CIRCUMFERENCE * (1 - fraction)
  const color = fraction > 0.5 ? '#4CAF7D' : fraction > 0.25 ? '#E8A33D' : '#E25822'

  return (
    <div className="relative h-10 w-10">
      <svg className="h-10 w-10 -rotate-90" viewBox="0 0 44 44">
        <circle cx="22" cy="22" r={RADIUS} fill="none" stroke="#e5e7eb" strokeWidth="4" />
        <circle
          cx="22"
          cy="22"
          r={RADIUS}
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-300"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-garuda-blue">
        {secondsLeft}
      </span>
    </div>
  )
}
