import { create } from 'zustand'
import { AppSettings } from '../domain/entities/Settings'

interface SettingsState extends AppSettings {
  setMusic: (enabled: boolean) => void
  setSfx: (enabled: boolean) => void
  setNotifications: (enabled: boolean) => void
}

export const useSettingsStore = create<SettingsState>((set) => ({
  musicEnabled: true,
  sfxEnabled: true,
  notificationsEnabled: true,
  setMusic: (enabled) => set({ musicEnabled: enabled }),
  setSfx: (enabled) => set({ sfxEnabled: enabled }),
  setNotifications: (enabled) => set({ notificationsEnabled: enabled }),
}))
