import { create } from 'zustand'
import { Prasasti, PusakaItem } from '../domain/entities/Pusaka'

const INITIAL_PUSAKA: PusakaItem[] = [
  { id: 'bulu-waktu', name: 'Bulu Waktu', icon: '🪶', description: 'Tambah 10 detik waktu menjawab.', quantity: 2 },
  {
    id: 'bulu-petunjuk',
    name: 'Bulu Petunjuk',
    icon: '💡',
    description: 'Hilangkan 2 pilihan jawaban yang salah.',
    quantity: 5,
  },
  {
    id: 'tameng-semangat',
    name: 'Tameng Semangat',
    icon: '🛡️',
    description: 'Lindungi Bar Semangat dari 1 jawaban salah.',
    quantity: 0,
  },
]

const INITIAL_PRASASTI: Prasasti[] = [
  {
    id: 'garuda-berlatih',
    name: 'Garuda Berlatih',
    icon: '🏅',
    description: 'Selesaikan Tantangan Angka pertamamu.',
    isUnlocked: true,
  },
  {
    id: 'penakluk-kabut',
    name: 'Penakluk Kabut',
    icon: '👻',
    description: 'Kalahkan Sosok Kabut pertamamu.',
    isUnlocked: false,
  },
  {
    id: 'raja-combo',
    name: 'Raja Combo',
    icon: '🔥',
    description: 'Raih combo 5x dalam satu Tantangan Angka.',
    isUnlocked: false,
  },
  {
    id: 'tak-terhentikan',
    name: 'Tak Terhentikan',
    icon: '⭐',
    description: 'Login 7 hari berturut-turut.',
    isUnlocked: false,
  },
]

interface InventoryState {
  pusaka: PusakaItem[]
  prasasti: Prasasti[]
  useItem: (id: string) => boolean
  unlockPrasasti: (id: string) => Prasasti | null
}

export const useInventoryStore = create<InventoryState>((set, get) => ({
  pusaka: INITIAL_PUSAKA,
  prasasti: INITIAL_PRASASTI,
  useItem: (id) => {
    const item = get().pusaka.find((p) => p.id === id)
    if (!item || item.quantity <= 0) return false
    set((state) => ({
      pusaka: state.pusaka.map((p) =>
        p.id === id ? { ...p, quantity: p.quantity - 1 } : p,
      ),
    }))
    return true
  },
  unlockPrasasti: (id) => {
    const target = get().prasasti.find((p) => p.id === id)
    if (!target || target.isUnlocked) return null
    set((state) => ({
      prasasti: state.prasasti.map((p) => (p.id === id ? { ...p, isUnlocked: true } : p)),
    }))
    return target
  },
}))
