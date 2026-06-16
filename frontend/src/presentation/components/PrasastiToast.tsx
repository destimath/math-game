import { useEffect } from 'react'
import { useToastStore } from '../../store/toastStore'

const DISPLAY_MS = 3500

export function PrasastiToast() {
  const { prasasti, clear } = useToastStore()

  useEffect(() => {
    if (!prasasti) return
    const timeout = setTimeout(clear, DISPLAY_MS)
    return () => clearTimeout(timeout)
  }, [prasasti, clear])

  if (!prasasti) return null

  return (
    <div className="fixed bottom-20 left-0 right-0 z-50 flex justify-center px-4">
      <div className="w-full max-w-sm animate-slide-up">
        <div className="flex items-center gap-3 rounded-card bg-garuda-blue px-4 py-3 shadow-xl">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-2xl">
            {prasasti.icon}
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold text-garuda-gold">🏅 PRASASTI BARU!</p>
            <p className="font-bold text-white">{prasasti.name}</p>
            <p className="text-xs text-white/70">{prasasti.description}</p>
          </div>
          <button onClick={clear} className="shrink-0 text-white/40 hover:text-white/70">
            ✕
          </button>
        </div>
      </div>
    </div>
  )
}
