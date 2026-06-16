import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from '../presentation/layouts/AppShell'
import { BattlePage } from '../presentation/pages/BattlePage'
import { DefeatPage } from '../presentation/pages/DefeatPage'
import { HomePage } from '../presentation/pages/HomePage'
import { InventoryPage } from '../presentation/pages/InventoryPage'
import { LeaderboardPage } from '../presentation/pages/LeaderboardPage'
import { LoginPage } from '../presentation/pages/LoginPage'
import { ProfilePage } from '../presentation/pages/ProfilePage'
import { SettingsPage } from '../presentation/pages/SettingsPage'
import { TeacherDashboardPage } from '../presentation/pages/TeacherDashboardPage'
import { VictoryPage } from '../presentation/pages/VictoryPage'
import { WorldMapPage } from '../presentation/pages/WorldMapPage'
import { useAuthStore } from '../store/authStore'

function PrivateRoute({ children }: { children: JSX.Element }) {
  const session = useAuthStore((s) => s.session)
  return session ? children : <Navigate to="/login" replace />
}

function TeacherRoute({ children }: { children: JSX.Element }) {
  const session = useAuthStore((s) => s.session)
  if (!session) return <Navigate to="/login" replace />
  if (session.role !== 'teacher') return <Navigate to="/" replace />
  return children
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <AppShell>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/map"
            element={
              <PrivateRoute>
                <WorldMapPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/battle"
            element={
              <PrivateRoute>
                <BattlePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/defeat"
            element={
              <PrivateRoute>
                <DefeatPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/victory"
            element={
              <PrivateRoute>
                <VictoryPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/profil"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/tas"
            element={
              <PrivateRoute>
                <InventoryPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/leaderboard"
            element={
              <PrivateRoute>
                <LeaderboardPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/atur"
            element={
              <PrivateRoute>
                <SettingsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/guru"
            element={
              <TeacherRoute>
                <TeacherDashboardPage />
              </TeacherRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  )
}
