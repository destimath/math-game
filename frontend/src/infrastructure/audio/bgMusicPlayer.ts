// Nada pentatonik C mayor (C3, E3, G3, A3) untuk synthesizer fallback
const PAD_FREQS = [130.81, 164.81, 196.0, 220.0]

class BgMusicPlayer {
  private audioEl: HTMLAudioElement | null = null
  private ctx: AudioContext | null = null
  private masterGain: GainNode | null = null
  private oscs: OscillatorNode[] = []
  private lfos: OscillatorNode[] = []
  private initialized = false

  async start() {
    if (this.initialized) return
    this.initialized = true

    // Coba pakai file MP3 dulu
    if (await this.tryMp3()) return

    // Fallback: synthesizer Web Audio API
    this.startSynth()
  }

  private async tryMp3(): Promise<boolean> {
    try {
      const el = new Audio('/sounds/bg-music.mp3')
      el.loop = true
      el.volume = 0.4
      await el.play()
      this.audioEl = el
      return true
    } catch {
      return false
    }
  }

  private startSynth() {
    try {
      this.ctx = new AudioContext()
      this.masterGain = this.ctx.createGain()
      this.masterGain.gain.value = 0.07
      this.masterGain.connect(this.ctx.destination)

      PAD_FREQS.forEach((freq, i) => {
        if (!this.ctx || !this.masterGain) return

        const osc = this.ctx.createOscillator()
        osc.type = 'sine'
        osc.frequency.value = freq

        // LFO untuk modulasi halus (vibrato)
        const lfo = this.ctx.createOscillator()
        lfo.type = 'sine'
        lfo.frequency.value = 0.2 + i * 0.07

        const lfoGain = this.ctx.createGain()
        lfoGain.gain.value = 1.5
        lfo.connect(lfoGain)
        lfoGain.connect(osc.frequency)

        osc.connect(this.masterGain)
        osc.start()
        lfo.start()

        this.oscs.push(osc)
        this.lfos.push(lfo)
      })
    } catch {
      // Web Audio API tidak tersedia
    }
  }

  pause() {
    if (this.audioEl) this.audioEl.pause()
    if (this.ctx?.state === 'running') this.ctx.suspend().catch(() => {})
  }

  async resume() {
    if (!this.initialized) {
      await this.start()
      return
    }
    if (this.audioEl) {
      await this.audioEl.play().catch(() => {})
    } else if (this.ctx?.state === 'suspended') {
      await this.ctx.resume().catch(() => {})
    }
  }

  setVolume(v: number) {
    if (this.audioEl) this.audioEl.volume = Math.max(0, Math.min(1, v))
    if (this.masterGain) this.masterGain.gain.value = Math.max(0, Math.min(1, v)) * 0.18
  }
}

export const bgMusicPlayer = new BgMusicPlayer()
