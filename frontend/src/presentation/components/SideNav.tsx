import { Link, useLocation, useNavigate } from 'react-router-dom'
import { usePlayerProfile } from '../../application/player/usePlayerProfile'
import { useAuthStore } from '../../store/authStore'

interface NavItem {
  to: string
  icon: string
  label: string
}

const NAV_ITEMS: NavItem[] = [
  { to: '/', icon: '🏠', label: 'Beranda' },
  { to: '/map', icon: '🗺️', label: 'Peta Dunia' },
  { to: '/profil', icon: '👤', label: 'Profil' },
  { to: '/tas', icon: '🎒', label: 'Tas Pusaka' },
  { to: '/leaderboard', icon: '🏆', label: 'Peringkat' },
  { to: '/atur', icon: '⚙️', label: 'Pengaturan' },
]

export function SideNav() {
  const location = useLocation()
  const navigate = useNavigate()
  const { profile } = usePlayerProfile()
  const logout = useAuthStore((s) => s.logout)

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-black/5 bg-garuda-blue shadow-xl">
      <div className="px-6 py-7">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-2xl">
            🦅
          </div>
          <div>
            <div className="text-sm font-extrabold leading-tight text-white">Legenda Garuda</div>
            <div className="text-xs text-white/50">Petualangan Matematika</div>
          </div>
        </div>
      </div>

      <div className="mx-4 mb-4 h-px bg-white/10" />

      <nav className="flex-1 space-y-1 px-3">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.to
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition-all ${
                isActive
                  ? 'bg-white text-garuda-blue shadow-md'
                  : 'text-white/65 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="mx-4 mb-4 h-px bg-white/10" />

      <div className="p-4">
        <div className="flex items-center gap-3 rounded-2xl bg-white/10 px-3 py-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-garuda-gold text-xl">
            🧒
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-bold text-white">{profile.name}</div>
            <div className="text-xs text-white/50">Lv.{profile.level} · 🪶 {profile.kepingGaruda}</div>
          </div>
        </div>
        <button
          onClick={() => { logout(); navigate('/login') }}
          className="mt-3 w-full text-center text-xs font-bold text-white/30 hover:text-white/60"
        >
          Keluar →
        </button>
      </div>
    </aside>
  )
}
