import Phaser from 'phaser'
import { RegionNode, RegionStatus } from '../../domain/entities/Region'
import { GAME_EVENTS, phaserEvents } from '../../infrastructure/game/PhaserBridge'

const STATUS_RING_COLOR: Record<RegionStatus, number> = {
  completed: 0x4caf7d,
  active: 0xe8a33d,
  locked: 0x9aa5ad,
}

interface WorldMapSceneData {
  regions: RegionNode[]
}

export class WorldMapScene extends Phaser.Scene {
  private regions: RegionNode[] = []

  constructor() {
    super('WorldMapScene')
  }

  init(data: WorldMapSceneData) {
    this.regions = data.regions
  }

  create() {
    const { width, height } = this.scale

    const startY = height - 80
    const spacingY = 110
    const centerX = width / 2
    const zigzag = 50

    const positions = this.regions.map((_, i) => ({
      x: centerX + (i % 2 === 1 ? (i % 4 === 1 ? zigzag : -zigzag) : 0),
      y: startY - i * spacingY,
    }))

    // Jalur "trophy road" menghubungkan setiap node region
    const path = this.add.graphics()
    path.lineStyle(8, 0xffffff, 0.6)
    path.beginPath()
    positions.forEach((pos, i) => {
      if (i === 0) path.moveTo(pos.x, pos.y)
      else path.lineTo(pos.x, pos.y)
    })
    path.strokePath()

    // Node tiap region
    this.regions.forEach((region, i) => {
      const pos = positions[i]
      const ringColor = STATUS_RING_COLOR[region.status]

      const circle = this.add.circle(pos.x, pos.y, 32, 0xffffff)
      circle.setStrokeStyle(6, ringColor)
      circle.setInteractive({ useHandCursor: true })

      const iconEmoji =
        region.status === 'locked' ? '🔒' :
        region.status === 'completed' ? '⭐' :
        region.icon

      const icon = this.add
        .text(pos.x, pos.y, iconEmoji, { fontSize: '28px' })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true })

      this.add
        .text(pos.x, pos.y - 50, region.name.toUpperCase(), {
          fontSize: '14px',
          fontStyle: 'bold',
          color: '#1B4D6B',
          backgroundColor: '#ffffffaa',
          padding: { x: 6, y: 2 },
        })
        .setOrigin(0.5)

      if (region.status === 'active') {
        this.tweens.add({
          targets: circle,
          scale: { from: 1, to: 1.1 },
          duration: 600,
          yoyo: true,
          repeat: -1,
        })
      }

      const onTap = () => phaserEvents.emit(GAME_EVENTS.REGION_SELECTED, region)
      circle.on('pointerdown', onTap)
      icon.on('pointerdown', onTap)
    })

    // Fokuskan kamera ke region yang sedang aktif (Sumatra di MVP)
    const activeIndex = this.regions.findIndex((r) => r.status === 'active')
    const totalHeight = startY + spacingY * this.regions.length

    this.cameras.main.setBounds(0, -50, width, totalHeight)
    if (activeIndex >= 0) {
      this.cameras.main.scrollY = Math.max(0, positions[activeIndex].y - height / 2)
    }
  }
}
