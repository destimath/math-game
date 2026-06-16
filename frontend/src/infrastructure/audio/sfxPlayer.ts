class SfxPlayer {
  private ctx: AudioContext | null = null
  private enabled = true

  setEnabled(val: boolean) {
    this.enabled = val
  }

  playCorrect() {
    if (!this.enabled) return
    const ctx = this.getCtx()
    if (!ctx) return
    // Dua nada naik — E5 → B5 (terasa menyenangkan untuk anak)
    this.tone(ctx, 659.25, 0.07, 'triangle', 0)
    this.tone(ctx, 987.77, 0.12, 'triangle', 0.09)
  }

  playWrong() {
    if (!this.enabled) return
    const ctx = this.getCtx()
    if (!ctx) return
    // Buzz turun pendek — tidak terlalu keras/kasar
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'square'
    osc.frequency.setValueAtTime(220, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.28)
    gain.gain.setValueAtTime(0.18, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.28)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start()
    osc.stop(ctx.currentTime + 0.3)
  }

  playGarudaStrike() {
    if (!this.enabled) return
    const ctx = this.getCtx()
    if (!ctx) return
    // Tiga nada dramatis naik — efek serangan
    this.tone(ctx, 523.25, 0.06, 'square', 0)
    this.tone(ctx, 783.99, 0.08, 'square', 0.07)
    this.tone(ctx, 1046.5, 0.15, 'triangle', 0.14)
  }

  playTimerTick() {
    if (!this.enabled) return
    const ctx = this.getCtx()
    if (!ctx) return
    this.tone(ctx, 880, 0.04, 'sine', 0)
  }

  private tone(
    ctx: AudioContext,
    freq: number,
    dur: number,
    type: OscillatorType,
    delay: number,
  ) {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = type
    osc.frequency.value = freq
    const t = ctx.currentTime + delay
    gain.gain.setValueAtTime(0.001, t)
    gain.gain.linearRampToValueAtTime(0.28, t + 0.01)
    gain.gain.exponentialRampToValueAtTime(0.001, t + dur)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(t)
    osc.stop(t + dur + 0.02)
  }

  private getCtx(): AudioContext | null {
    try {
      if (!this.ctx || this.ctx.state === 'closed') {
        this.ctx = new AudioContext()
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {})
      }
      return this.ctx
    } catch {
      return null
    }
  }
}

export const sfxPlayer = new SfxPlayer()
