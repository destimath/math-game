import { FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useClassRoster } from '../../application/classroom/useClassRoster'
import { useAuthStore } from '../../store/authStore'
import { Button } from '../components/Button'

function AccuracyBar({ pct }: { pct: number | null }) {
  if (pct === null) return <span className="text-garuda-blue/40">—</span>
  const color = pct >= 80 ? 'bg-garuda-green' : pct >= 60 ? 'bg-garuda-gold' : 'bg-garuda-red'
  return (
    <div className="flex items-center gap-2">
      <div className="h-2 w-16 overflow-hidden rounded-full bg-garuda-blue/10">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs font-bold text-garuda-blue">{pct}%</span>
    </div>
  )
}

export function TeacherDashboardPage() {
  const navigate = useNavigate()
  const logout = useAuthStore((s) => s.logout)
  const session = useAuthStore((s) => s.session)
  const { students, classCode, isLoading, error, searched, search } = useClassRoster()
  const [inputCode, setInputCode] = useState('SUMTR-4A')

  // Auto-search on mount
  useEffect(() => { search('SUMTR-4A') }, [search])

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (inputCode.trim()) search(inputCode.trim())
  }

  const avgAccuracy = students.length
    ? Math.round(
        students.reduce((sum, s) => sum + (s.totalAnswered > 0 ? (s.totalCorrect / s.totalAnswered) * 100 : 0), 0) /
          students.length,
      )
    : 0

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-amber-50">
      {/* Header */}
      <div className="flex items-center justify-between bg-garuda-blue px-6 py-4 shadow-md">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🦅</span>
          <div>
            <h1 className="text-base font-extrabold text-white">Dashboard Guru</h1>
            <p className="text-xs text-white/60">{session?.displayName}</p>
          </div>
        </div>
        <button
          onClick={() => { logout(); navigate('/login') }}
          className="text-xs font-bold text-white/50 hover:text-white"
        >
          Keluar →
        </button>
      </div>

      <div className="mx-auto max-w-3xl space-y-5 p-4 md:p-6">
        {/* Search kelas */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value.toUpperCase())}
            placeholder="Kode kelas, mis. SUMTR-4A"
            className="flex-1 rounded-2xl border-2 border-garuda-blue/20 bg-white px-4 py-2 text-sm font-bold text-garuda-blue placeholder:font-normal placeholder:text-garuda-blue/40 focus:border-garuda-blue focus:outline-none"
          />
          <Button type="submit" disabled={isLoading} className="shrink-0 px-5 py-2 text-sm">
            {isLoading ? '⏳' : '🔍 Cari'}
          </Button>
        </form>

        {/* Summary cards */}
        {searched && !isLoading && !error && students.length > 0 && (
          <>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="rounded-card bg-white p-3 shadow-md">
                <div className="text-2xl font-extrabold text-garuda-blue">{students.length}</div>
                <div className="text-xs text-garuda-blue/60">Siswa</div>
              </div>
              <div className="rounded-card bg-white p-3 shadow-md">
                <div className="text-2xl font-extrabold text-garuda-blue">
                  {students.reduce((s, x) => s + x.victories, 0)}
                </div>
                <div className="text-xs text-garuda-blue/60">Total Menang</div>
              </div>
              <div className="rounded-card bg-white p-3 shadow-md">
                <div className="text-2xl font-extrabold text-garuda-blue">{avgAccuracy}%</div>
                <div className="text-xs text-garuda-blue/60">Rata Akurasi</div>
              </div>
            </div>

            {/* Tabel siswa */}
            <div className="overflow-hidden rounded-2xl bg-white shadow-md">
              <div className="border-b border-garuda-blue/10 px-4 py-3">
                <h2 className="font-bold text-garuda-blue">
                  📋 Daftar Siswa — {classCode}
                </h2>
              </div>

              {/* Mobile: kartu per siswa */}
              <div className="divide-y divide-garuda-blue/5 md:hidden">
                {students.map((s, i) => {
                  const pct = s.totalAnswered > 0
                    ? Math.round((s.totalCorrect / s.totalAnswered) * 100)
                    : null
                  return (
                    <div key={s.id} className="flex items-center gap-3 px-4 py-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-garuda-blue/10 text-sm font-extrabold text-garuda-blue">
                        {i + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-garuda-blue truncate">{s.name}</span>
                          <span className="ml-2 shrink-0 rounded-full bg-garuda-gold/20 px-2 py-0.5 text-xs font-bold text-garuda-blue">
                            Lv.{s.level}
                          </span>
                        </div>
                        <div className="mt-1 flex items-center gap-3 text-xs text-garuda-blue/60">
                          <span>⚔️ {s.victories}/{s.totalBattles}</span>
                          <span>🔥 {s.streakDays}h</span>
                          <AccuracyBar pct={pct} />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Desktop: tabel */}
              <table className="hidden w-full md:table">
                <thead>
                  <tr className="bg-garuda-blue/5 text-xs font-bold uppercase tracking-wide text-garuda-blue/60">
                    <th className="px-4 py-3 text-left">#</th>
                    <th className="px-4 py-3 text-left">Nama</th>
                    <th className="px-4 py-3 text-center">Level</th>
                    <th className="px-4 py-3 text-center">XP</th>
                    <th className="px-4 py-3 text-center">🪶 Keping</th>
                    <th className="px-4 py-3 text-center">🔥 Streak</th>
                    <th className="px-4 py-3 text-center">Battle</th>
                    <th className="px-4 py-3 text-center">Menang</th>
                    <th className="px-4 py-3 text-left">Akurasi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-garuda-blue/5">
                  {students.map((s, i) => {
                    const pct = s.totalAnswered > 0
                      ? Math.round((s.totalCorrect / s.totalAnswered) * 100)
                      : null
                    return (
                      <tr key={s.id} className="transition-colors hover:bg-garuda-blue/5">
                        <td className="px-4 py-3 text-sm font-bold text-garuda-blue/40">{i + 1}</td>
                        <td className="px-4 py-3 font-bold text-garuda-blue">{s.name}</td>
                        <td className="px-4 py-3 text-center">
                          <span className="rounded-full bg-garuda-gold/20 px-2 py-0.5 text-xs font-bold text-garuda-blue">
                            Lv.{s.level}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center text-sm text-garuda-blue">{s.xp.toLocaleString('id-ID')}</td>
                        <td className="px-4 py-3 text-center text-sm font-bold text-garuda-gold">{s.kepingGaruda}</td>
                        <td className="px-4 py-3 text-center text-sm text-garuda-blue">{s.streakDays}</td>
                        <td className="px-4 py-3 text-center text-sm text-garuda-blue">{s.totalBattles}</td>
                        <td className="px-4 py-3 text-center text-sm font-bold text-garuda-green">{s.victories}</td>
                        <td className="px-4 py-3"><AccuracyBar pct={pct} /></td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Empty / error states */}
        {isLoading && (
          <div className="py-10 text-center text-garuda-blue/60">⏳ Memuat data kelas...</div>
        )}
        {error && (
          <div className="rounded-2xl bg-red-50 p-4 text-center text-sm font-bold text-garuda-red">
            ⚠️ {error}
          </div>
        )}
        {searched && !isLoading && !error && students.length === 0 && (
          <div className="py-10 text-center text-garuda-blue/60">
            Tidak ada siswa di kelas <strong>{classCode}</strong>
          </div>
        )}
      </div>
    </div>
  )
}
