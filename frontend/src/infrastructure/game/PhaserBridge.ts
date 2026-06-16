import Phaser from 'phaser'

/**
 * Event bus bersama untuk komunikasi dua arah antara React (presentation)
 * dan scene Phaser (game/), tanpa membuat keduanya saling import langsung.
 */
export const phaserEvents = new Phaser.Events.EventEmitter()

export const GAME_EVENTS = {
  REGION_SELECTED: 'region-selected',
} as const
