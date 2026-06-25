import { AnimatePresence } from 'framer-motion'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AppShell } from '../presentation/layouts/AppShell'
import { PageTransition } from '../presentation/components/PageTransition'
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

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/login" element={<PageTransition><LoginPage /></PageTransition>} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <PageTransition><HomePage /></PageTransition>
            </PrivateRoute>
          }
        />
        <Route
          path="/map"
          element={
            <PrivateRoute>
              <PageTransition><WorldMapPage /></PageTransition>
            </PrivateRoute>
          }
        />
        <Route
          path="/battle"
          element={
            <PrivateRoute>
              <PageTransition><BattlePage /></PageTransition>
            </PrivateRoute>
          }
        />
        <Route
          path="/defeat"
          element={
            <PrivateRoute>
              <PageTransition><DefeatPage /></PageTransition>
            </PrivateRoute>
          }
        />
        <Route
          path="/victory"
          element={
            <PrivateRoute>
              <PageTransition><VictoryPage /></PageTransition>
            </PrivateRoute>
          }
        />
        <Route
          path="/profil"
          element={
            <PrivateRoute>
              <PageTransition><ProfilePage /></PageTransition>
            </PrivateRoute>
          }
        />
        <Route
          path="/tas"
          element={
            <PrivateRoute>
              <PageTransition><InventoryPage /></PageTransition>
            </PrivateRoute>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <PrivateRoute>
              <PageTransition><LeaderboardPage /></PageTransition>
            </PrivateRoute>
          }
        />
        <Route
          path="/atur"
          element={
            <PrivateRoute>
              <PageTransition><SettingsPage /></PageTransition>
            </PrivateRoute>
          }
        />
        <Route
          path="/guru"
          element={
            <TeacherRoute>
              <PageTransition><TeacherDashboardPage /></PageTransition>
            </TeacherRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  )
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <AppShell>
        <AnimatedRoutes />
      </AppShell>
    </BrowserRouter>
  )
}
