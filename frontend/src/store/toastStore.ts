import { create } from 'zustand'
import { Prasasti } from '../domain/entities/Pusaka'

interface ToastState {
  prasasti: Prasasti | null
  show: (prasasti: Prasasti) => void
  clear: () => void
}

export const useToastStore = create<ToastState>((set) => ({
  prasasti: null,
  show: (prasasti) => set({ prasasti }),
  clear: () => set({ prasasti: null }),
}))
