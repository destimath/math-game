export function getGarudaRank(level: number): string {
  if (level >= 20) return 'Garuda Agung'
  if (level >= 10) return 'Garuda Perkasa'
  if (level >= 5) return 'Garuda Muda'
  return 'Anak Garuda'
}
