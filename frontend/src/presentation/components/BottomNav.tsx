import { Link, useLocation } from 'react-router-dom'

interface NavItem {
  to: string
  icon: string
  label: string
  enabled: boolean
}

const NAV_ITEMS: NavItem[] = [
  { to: '/map', icon: '🗺️', label: 'Map', enabled: true },
  { to: '/profil', icon: '👤', label: 'Profil', enabled: true },
  { to: '/tas', icon: '🎒', label: 'Tas', enabled: true },
  { to: '/leaderboard', icon: '🏆', label: 'LB', enabled: true },
  { to: '/atur', icon: '⚙️', label: 'Atur', enabled: true },
]

export function BottomNav() {
  const location = useLocation()

  return (
    <nav className="flex items-center justify-around border-t border-black/10 bg-white py-2 shadow-[0_-2px_8px_rgba(0,0,0,0.05)]">
      {NAV_ITEMS.map((item) => {
        if (!item.enabled) {
          return (
            <span
              key={item.to}
              className="flex flex-col items-center text-xs font-bold text-garuda-blue/30"
            >
              <span className="text-xl">{item.icon}</span>
              {item.label}
            </span>
          )
        }

        const isActive = location.pathname === item.to
        return (
          <Link
            key={item.to}
            to={item.to}
            className={`flex flex-col items-center text-xs font-bold transition-transform ${
              isActive ? 'scale-110 text-garuda-red' : 'text-garuda-blue/60'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
