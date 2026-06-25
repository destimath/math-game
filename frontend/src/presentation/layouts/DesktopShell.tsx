import { ReactNode, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useBackgroundMusic } from '../../application/audio/useBackgroundMusic'
import { sfxPlayer } from '../../infrastructure/audio/sfxPlayer'
import { useAuthStore } from '../../store/authStore'
import { useSettingsStore } from '../../store/settingsStore'
import { PrasastiToast } from '../components/PrasastiToast'
import { SideNav } from '../components/SideNav'

interface DesktopShellProps {
  children: ReactNode
}

const GAME_SCREENS = ['/battle', '/victory', '/defeat', '/map', '/login']
const FULLPAGE_SCREENS = ['/guru']

export function DesktopShell({ children }: DesktopShellProps) {
  useBackgroundMusic()
  const sfxEnabled = useSettingsStore((s) => s.sfxEnabled)
  useEffect(() => { sfxPlayer.setEnabled(sfxEnabled) }, [sfxEnabled])
  const location = useLocation()
  const session = useAuthStore((s) => s.session)
  const isGameScreen = GAME_SCREENS.includes(location.pathname)
  const isFullpage = FULLPAGE_SCREENS.includes(location.pathname)
  const showSidebar = Boolean(session) && !isGameScreen && !isFullpage

  if (isFullpage) {
    return (
      <div className="min-h-screen">
        <main>{children}</main>
        <PrasastiToast />
      </div>
    )
  }

  if (!showSidebar) {
    return (
      <div className="flex h-dvh items-center justify-center bg-garuda-blue">
        <div className="flex h-full w-full max-w-md flex-col overflow-hidden bg-gradient-to-b from-sky-100 to-amber-50 shadow-2xl">
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
        <PrasastiToast />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-sky-50 to-amber-50">
      <SideNav />
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl">{children}</div>
      </main>
      <PrasastiToast />
    </div>
  )
}
