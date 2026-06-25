import { FormEvent, useState } from 'react'
import { playerApi } from '../../infrastructure/api/playerApi'
import { useSettingsStore } from '../../store/settingsStore'
import { SettingRow } from '../components/SettingRow'

const APP_VERSION = '0.1.0'
const API_ENABLED = import.meta.env.VITE_API_ENABLED === 'true'

function PinField({
  label, value, onChange,
}: { label: string; value: string; onChange: (v: string) => void }) {
  const [show, setShow] = useState(false)
  return (
    <div>
      <label className="mb-1 block text-xs font-bold text-slate-500">{label}</label>
      <div className="relative">
        <input
          type={show ? 'text' : 'password'}
          inputMode="numeric"
          maxLength={6}
          placeholder="••••"
          value={value}
          onChange={(e) => onChange(e.target.value.replace(/\D/g, '').slice(0, 6))}
          className="w-full rounded-xl border border-slate-200 px-4 py-2.5 pr-10 text-center text-lg tracking-[0.4em] outline-none focus:border-garuda-blue focus:ring-2 focus:ring-garuda-blue/20"
        />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400"
        >
          {show ? '🙈' : '👁'}
        </button>
      </div>
    </div>
  )
}

function ChangePinForm() {
  const [currentPin, setCurrentPin] = useState('')
  const [newPin, setNewPin] = useState('')
  const [confirmPin, setConfirmPin] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!/^\d{4,6}$/.test(newPin)) {
      setStatus('error'); setMessage('PIN baru harus 4–6 digit angka'); return
    }
    if (newPin !== confirmPin) {
      setStatus('error'); setMessage('Konfirmasi PIN tidak cocok'); return
    }
    setStatus('loading')
    try {
      if (API_ENABLED) {
        await playerApi.changePin(currentPin, newPin)
      } else {
        await new Promise((r) => setTimeout(r, 600))
      }
      setStatus('success')
      setMessage('PIN berhasil diubah!')
      setCurrentPin(''); setNewPin(''); setConfirmPin('')
    } catch (err) {
      setStatus('error')
      setMessage(err instanceof Error ? err.message : 'Gagal mengubah PIN')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 py-3">
      <PinField label="PIN Saat Ini" value={currentPin} onChange={setCurrentPin} />
      <PinField label="PIN Baru" value={newPin} onChange={setNewPin} />
      <PinField label="Konfirmasi PIN Baru" value={confirmPin} onChange={setConfirmPin} />

      {status === 'error' && (
        <p className="rounded-xl bg-red-50 px-3 py-2 text-center text-xs font-bold text-red-500">{message}</p>
      )}
      {status === 'success' && (
        <p className="rounded-xl bg-green-50 px-3 py-2 text-center text-xs font-bold text-green-600">✓ {message}</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading' || !currentPin || !newPin || !confirmPin}
        className="w-full rounded-xl bg-garuda-blue py-2.5 text-sm font-bold text-white disabled:opacity-40"
      >
        {status === 'loading' ? '⏳ Menyimpan...' : 'Simpan PIN Baru'}
      </button>
    </form>
  )
}

export function SettingsPage() {
  const { musicEnabled, sfxEnabled, notificationsEnabled, setMusic, setSfx, setNotifications } =
    useSettingsStore()
  const [showPinForm, setShowPinForm] = useState(false)

  return (
    <div className="p-4 md:p-6">
      <h1 className="mb-4 text-center text-lg font-extrabold text-garuda-blue md:text-left">
        ⚙️ PENGATURAN
      </h1>

      <div className="space-y-4 md:grid md:grid-cols-2 md:gap-4 md:space-y-0">
        <div className="space-y-4">
          {/* Audio */}
          <div className="rounded-card bg-white/80 px-4 shadow-md">
            <h2 className="border-b border-garuda-blue/10 py-3 text-sm font-extrabold uppercase tracking-wide text-garuda-blue/50">
              🔊 Audio
            </h2>
            <SettingRow label="Musik Latar" description="Musik pengiring petualangan" value={musicEnabled} onChange={setMusic} />
            <div className="border-t border-garuda-blue/10" />
            <SettingRow label="Efek Suara" description="Suara tombol & jawaban" value={sfxEnabled} onChange={setSfx} />
          </div>

          {/* Notifikasi */}
          <div className="rounded-card bg-white/80 px-4 shadow-md">
            <h2 className="border-b border-garuda-blue/10 py-3 text-sm font-extrabold uppercase tracking-wide text-garuda-blue/50">
              🔔 Notifikasi
            </h2>
            <SettingRow label="Pengingat Harian" description="Ingatkan aku untuk berlatih setiap hari" value={notificationsEnabled} onChange={setNotifications} />
          </div>
        </div>

        <div className="space-y-4">
          {/* Ganti PIN */}
          <div className="rounded-card bg-white/80 px-4 shadow-md">
            <button
              onClick={() => setShowPinForm((v) => !v)}
              className="flex w-full items-center justify-between py-3"
            >
              <h2 className="text-sm font-extrabold uppercase tracking-wide text-garuda-blue/50">
                🔑 Ganti PIN
              </h2>
              <span className="text-xs text-garuda-blue/40">{showPinForm ? '▲ Tutup' : '▼ Buka'}</span>
            </button>
            {showPinForm && (
              <>
                <div className="border-t border-garuda-blue/10" />
                <ChangePinForm />
              </>
            )}
          </div>

          {/* Tentang */}
          <div className="rounded-card bg-white/80 px-4 shadow-md">
            <h2 className="border-b border-garuda-blue/10 py-3 text-sm font-extrabold uppercase tracking-wide text-garuda-blue/50">
              ℹ️ Tentang
            </h2>
            <div className="space-y-3 py-3 text-sm text-garuda-blue">
              <div className="flex justify-between">
                <span>Versi</span>
                <span className="font-bold">{APP_VERSION}</span>
              </div>
              <div className="border-t border-garuda-blue/10" />
              <p className="text-center text-xs text-garuda-blue/60">
                Legenda Garuda: Petualangan Matematika Nusantara
              </p>
              <p className="text-center text-xs text-garuda-blue/40">
                Dibuat dengan ❤️ untuk pelajar Indonesia
              </p>
              <div className="border-t border-garuda-blue/10" />
              <div className="flex justify-between">
                <span>Kontak</span>
                <a href="mailto:sibertiga4@gmail.com" className="font-bold text-garuda-blue underline">
                  sibertiga4@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
