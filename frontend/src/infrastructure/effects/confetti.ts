import confetti from 'canvas-confetti'

const GARUDA_COLORS = ['#E8A33D', '#4CAF7D', '#1B4D6B', '#E25822', '#FFD700', '#FFFFFF']

export function launchLevelUpConfetti() {
  // Ledakan pertama — dari tengah layar
  confetti({
    particleCount: 110,
    spread: 80,
    startVelocity: 40,
    origin: { x: 0.5, y: 0.45 },
    colors: GARUDA_COLORS,
    ticks: 220,
  })

  // Delay sedikit → dua poppers dari sudut kiri dan kanan
  setTimeout(() => {
    confetti({
      particleCount: 60,
      angle: 60,
      spread: 60,
      startVelocity: 45,
      origin: { x: 0, y: 0.65 },
      colors: GARUDA_COLORS,
      ticks: 180,
    })
    confetti({
      particleCount: 60,
      angle: 120,
      spread: 60,
      startVelocity: 45,
      origin: { x: 1, y: 0.65 },
      colors: GARUDA_COLORS,
      ticks: 180,
    })
  }, 280)
}
