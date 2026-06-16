import { ReactNode } from 'react'
import { useIsMobile } from '../../hooks/useIsMobile'
import { DesktopShell } from './DesktopShell'
import { MobileShell } from './MobileShell'

interface AppShellProps {
  children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const isMobile = useIsMobile()
  return isMobile ? <MobileShell>{children}</MobileShell> : <DesktopShell>{children}</DesktopShell>
}
