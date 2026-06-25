import { ReactNode, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useBackgroundMusic } from '../../application/audio/useBackgroundMusic'
import { sfxPlayer } from '../../infrastructure/audio/sfxPlayer'
import { useAuthStore } from '../../store/authStore'
import { useSettingsStore } from '../../store/settingsStore'
import { BottomNav } from '../components/BottomNav'
import { PrasastiToast } from '../components/PrasastiToast'

interface MobileShellProps {
  children: ReactNode
}

const SCREENS_WITH_BOTTOM_NAV = ['/', '/profil', '/tas', '/leaderboard', '/atur']
const FULLSCREEN_SCREENS = ['/guru']

export function MobileShell({ children }: MobileShellProps) {
  useBackgroundMusic()
  const sfxEnabled = useSettingsStore((s) => s.sfxEnabled)
  useEffect(() => { sfxPlayer.setEnabled(sfxEnabled) }, [sfxEnabled])
  const location = useLocation()
  const session = useAuthStore((s) => s.session)
  const showBottomNav = SCREENS_WITH_BOTTOM_NAV.includes(location.pathname) && Boolean(session)
  const isFullscreen = FULLSCREEN_SCREENS.includes(location.pathname)

  if (isFullscreen) {
    return (
      <div className="min-h-screen">
        <main>{children}</main>
        <PrasastiToast />
      </div>
    )
  }

  return (
    <div className="flex h-dvh items-center justify-center bg-garuda-blue">
      <div className="flex h-full w-full max-w-md flex-col overflow-hidden bg-gradient-to-b from-sky-100 to-amber-50">
        <main className="flex-1 overflow-y-auto">{children}</main>
        {showBottomNav && <BottomNav />}
        <PrasastiToast />
      </div>
    </div>
  )
}
