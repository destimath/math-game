import { ReactNode } from 'react'

interface RevealRowProps {
  visible: boolean
  children: ReactNode
}

export function RevealRow({ visible, children }: RevealRowProps) {
  return (
    <div
      className={`flex items-center justify-between transition-all duration-500 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
      }`}
    >
      {children}
    </div>
  )
}
