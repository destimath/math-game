const STORAGE_KEY = 'legenda-garuda:onboarding-seen'

export function hasSeenOnboarding(): boolean {
  return localStorage.getItem(STORAGE_KEY) === 'true'
}

export function markOnboardingSeen() {
  localStorage.setItem(STORAGE_KEY, 'true')
}
