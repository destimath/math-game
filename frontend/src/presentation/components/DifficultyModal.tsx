import { DifficultyLevel } from '../../domain/entities/BattleQuestion'

interface DifficultyOption {
  level: DifficultyLevel
  icon: string
  label: string
  description: string
  timeLabel: string
  color: string
  bg: string
  border: string
}

const OPTIONS: DifficultyOption[] = [
  {
    level: 'easy',
    icon: '🌱',
    label: 'MUDAH',
    description: 'Penjumlahan & pengurangan dasar (sampai 100)',
    timeLabel: '20 detik/soal',
    color: 'text-garuda-green',
    bg: 'bg-green-50',
    border: 'border-garuda-green',
  },
  {
    level: 'medium',
    icon: '⚡',
    label: 'SEDANG',
    description: 'Nilai tempat & operasi bilangan (sampai 999)',
    timeLabel: '15 detik/soal',
    color: 'text-garuda-gold',
    bg: 'bg-amber-50',
    border: 'border-garuda-gold',
  },
  {
    level: 'hard',
    icon: '🔥',
    label: 'SULIT',
    description: 'Soal cerita & operasi campuran (sampai 1.000)',
    timeLabel: '12 detik/soal',
    color: 'text-garuda-red',
    bg: 'bg-red-50',
    border: 'border-garuda-red',
  },
]

interface DifficultyModalProps {
  regionName: string
  onSelect: (level: DifficultyLevel) => void
  onClose: () => void
}

export function DifficultyModal({ regionName, onSelect, onClose }: DifficultyModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-2xl">
        <div className="mb-4 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-garuda-blue/50">
            ⛵ {regionName}
          </p>
          <h2 className="mt-1 text-xl font-extrabold text-garuda-blue">Pilih Level Kesulitan</h2>
        </div>

        <div className="space-y-3">
          {OPTIONS.map((opt) => (
            <button
              key={opt.level}
              onClick={() => onSelect(opt.level)}
              className={`flex w-full items-center gap-3 rounded-2xl border-2 p-3 text-left transition-all active:scale-95 ${opt.bg} ${opt.border}`}
            >
              <span className="text-3xl">{opt.icon}</span>
              <div className="flex-1">
                <div className={`font-extrabold ${opt.color}`}>{opt.label}</div>
                <div className="text-xs text-garuda-blue/70">{opt.description}</div>
              </div>
              <div className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-bold ${opt.color} bg-white/80`}>
                {opt.timeLabel}
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full text-center text-sm font-bold text-garuda-blue/40 underline"
        >
          Batal
        </button>
      </div>
    </div>
  )
}
