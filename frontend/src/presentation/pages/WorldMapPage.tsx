import Phaser from 'phaser'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePlayerProfile } from '../../application/player/usePlayerProfile'
import { useRegions } from '../../application/world/useRegions'
import { DifficultyLevel } from '../../domain/entities/BattleQuestion'
import { RegionNode } from '../../domain/entities/Region'
import { WorldMapScene } from '../../game/scenes/WorldMapScene'
import { createGameConfig } from '../../infrastructure/game/gameConfig'
import { GAME_EVENTS, phaserEvents } from '../../infrastructure/game/PhaserBridge'
import { BATTLES_PER_REGION } from '../../store/regionStore'
import { DifficultyModal } from '../components/DifficultyModal'
import { ProgressBar } from '../components/ProgressBar'

export function WorldMapPage() {
  const navigate = useNavigate()
  const { regions } = useRegions()
  const { profile } = usePlayerProfile()
  const containerRef = useRef<HTMLDivElement>(null)
  const gameRef = useRef<Phaser.Game | null>(null)
  const [selectedRegion, setSelectedRegion] = useState<RegionNode | null>(null)
  const [showDifficultyModal, setShowDifficultyModal] = useState(false)

  useEffect(() => {
    if (!containerRef.current || gameRef.current) return

    const game = new Phaser.Game(createGameConfig(containerRef.current, [WorldMapScene]))
    game.scene.start('WorldMapScene', { regions })
    gameRef.current = game

    const handleRegionSelected = (region: RegionNode) => setSelectedRegion(region)
    phaserEvents.on(GAME_EVENTS.REGION_SELECTED, handleRegionSelected)

    return () => {
      phaserEvents.off(GAME_EVENTS.REGION_SELECTED, handleRegionSelected)
      game.destroy(true)
      gameRef.current = null
    }
  }, [regions])

  const activeRegion = regions.find((region) => region.status === 'active')

  return (
    <>
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between bg-white/90 px-4 py-3 shadow-sm">
          <button onClick={() => navigate('/')} className="text-xl text-garuda-blue">
            ←
          </button>
          <h1 className="font-bold text-garuda-blue">NUSANTARA AGUNG</h1>
          <span className="font-bold text-garuda-gold">
            🪶 {profile.kepingGaruda.toLocaleString('id-ID')}
          </span>
        </div>

        <div ref={containerRef} className="min-h-0 flex-1" />

        <div className="border-t border-black/10 bg-white/90 px-4 py-3 text-sm text-garuda-blue">
          {selectedRegion?.status === 'locked' && (
            <span>🔒 {selectedRegion.name}: {selectedRegion.unlockHint}</span>
          )}

          {selectedRegion?.status === 'completed' && (
            <span className="font-bold text-garuda-green">
              ✅ {selectedRegion.name} — Selesai! ({selectedRegion.progress.completed}/{BATTLES_PER_REGION})
            </span>
          )}

          {selectedRegion?.status === 'active' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-garuda-blue">
                  ⛵ {selectedRegion.name} — {selectedRegion.progress.completed}/{BATTLES_PER_REGION} battle
                </span>
                <button
                  onClick={() => setShowDifficultyModal(true)}
                  className="rounded-full bg-garuda-green px-4 py-1 text-xs font-bold text-white shadow"
                >
                  ▶ MULAI
                </button>
              </div>
              <ProgressBar value={selectedRegion.progress.completed} max={BATTLES_PER_REGION} />
            </div>
          )}

          {!selectedRegion && activeRegion && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold">⛵ {activeRegion.name}</span>
                <span className="text-garuda-blue/60">
                  {activeRegion.progress.completed}/{BATTLES_PER_REGION} battle
                </span>
              </div>
              <ProgressBar value={activeRegion.progress.completed} max={BATTLES_PER_REGION} />
            </div>
          )}
        </div>
      </div>

      {showDifficultyModal && selectedRegion && (
        <DifficultyModal
          regionName={selectedRegion.name}
          onSelect={(level: DifficultyLevel) => {
            setShowDifficultyModal(false)
            navigate('/battle', { state: { difficulty: level, regionId: selectedRegion.id } })
          }}
          onClose={() => setShowDifficultyModal(false)}
        />
      )}
    </>
  )
}
