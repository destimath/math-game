import { Button } from './Button'

interface PauseModalProps {
  onResume: () => void
  onRestart: () => void
  onExitToMap: () => void
}

export function PauseModal({ onResume, onRestart, onExitToMap }: PauseModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6">
      <div className="w-full max-w-xs space-y-3 rounded-card bg-white p-6 shadow-xl">
        <h2 className="text-center text-xl font-extrabold text-garuda-blue">⏸ DIJEDA</h2>

        <Button className="w-full" onClick={onResume}>
          ▶ LANJUTKAN
        </Button>

        <Button variant="secondary" className="w-full" onClick={onRestart}>
          🔄 MULAI ULANG
        </Button>

        <button
          onClick={onExitToMap}
          className="w-full pt-1 text-sm font-bold text-garuda-blue/50 underline"
        >
          🗺️ Keluar ke Peta
        </button>
      </div>
    </div>
  )
}
