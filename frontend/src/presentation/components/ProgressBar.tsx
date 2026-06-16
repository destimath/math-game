interface ProgressBarProps {
  value: number
  max: number
  colorClassName?: string
}

export function ProgressBar({
  value,
  max,
  colorClassName = 'bg-gradient-to-r from-garuda-gold to-garuda-green',
}: ProgressBarProps) {
  const percent = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0

  return (
    <div className="h-4 w-full overflow-hidden rounded-full border border-black/10 bg-white/40">
      <div
        className={`h-full rounded-full transition-all duration-500 ${colorClassName}`}
        style={{ width: `${percent}%` }}
      />
    </div>
  )
}
