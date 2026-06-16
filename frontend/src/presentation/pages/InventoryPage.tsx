import { useState } from 'react'
import { useInventory } from '../../application/player/useInventory'

type InventoryTab = 'pusaka' | 'prasasti'

export function InventoryPage() {
  const { pusaka, prasasti } = useInventory()
  const [tab, setTab] = useState<InventoryTab>('pusaka')

  return (
    <div className="space-y-4 p-4 md:p-6">
      <h1 className="text-center text-lg font-extrabold text-garuda-blue md:text-left">
        🎒 TAS PUSAKA GARUDA
      </h1>

      <div className="flex rounded-2xl bg-garuda-blue/10 p-1 md:w-64">
        <button
          onClick={() => setTab('pusaka')}
          className={`flex-1 rounded-xl py-2 text-sm font-bold transition-colors ${
            tab === 'pusaka' ? 'bg-garuda-red text-white shadow' : 'text-garuda-blue/60'
          }`}
        >
          🪶 Pusaka
        </button>
        <button
          onClick={() => setTab('prasasti')}
          className={`flex-1 rounded-xl py-2 text-sm font-bold transition-colors ${
            tab === 'prasasti' ? 'bg-garuda-red text-white shadow' : 'text-garuda-blue/60'
          }`}
        >
          🏅 Prasasti
        </button>
      </div>

      {tab === 'pusaka' ? (
        <div className="grid gap-2 md:grid-cols-2 md:gap-3">
          {pusaka.map((item) => (
            <div key={item.id} className="flex items-center gap-3 rounded-card bg-white/80 p-3 shadow-md">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-garuda-gold/20 text-2xl">
                {item.icon}
              </div>
              <div className="flex-1">
                <div className="font-bold text-garuda-blue">{item.name}</div>
                <div className="text-xs text-garuda-blue/60">{item.description}</div>
              </div>
              <div className="shrink-0 rounded-full bg-garuda-blue/10 px-3 py-1 text-sm font-bold text-garuda-blue">
                x{item.quantity}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {prasasti.map((item) => (
            <div
              key={item.id}
              className={`flex flex-col items-center gap-1 rounded-card p-3 text-center shadow-md ${
                item.isUnlocked
                  ? 'border-2 border-garuda-gold bg-white'
                  : 'border-2 border-dashed border-garuda-blue/20 bg-garuda-blue/5 opacity-50'
              }`}
            >
              <div className="text-3xl">{item.isUnlocked ? item.icon : '🔒'}</div>
              <div className="text-sm font-bold text-garuda-blue">{item.name}</div>
              <div className="text-xs text-garuda-blue/60">{item.description}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
