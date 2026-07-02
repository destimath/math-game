# Legenda Garuda — Frontend

React + Phaser 3 client untuk game [Legenda Garuda: Petualangan Matematika Nusantara](../README.md).

## Tech Stack

- React 18 + TypeScript + Vite
- Phaser 3 — engine untuk scene World Map, Battle, Boss
- Tailwind CSS 3 — styling UI
- Zustand — state management
- React Router — routing dengan route guard berbasis role
- Axios — API client

## Menjalankan

```bash
cp .env.example .env   # atur VITE_API_BASE_URL jika perlu
npm install
npm run dev
```

Berjalan di `http://localhost:5173`.

```bash
npm run build     # type-check (tsc -b) + build produksi
npm run preview   # preview hasil build
```

## Variabel Lingkungan (`.env`)

```env
VITE_API_BASE_URL=http://localhost:8081
```

Jika dikosongkan, frontend otomatis berjalan dalam **mode mock** (tanpa backend) menggunakan data dummy — berguna untuk mengembangkan UI tanpa menjalankan backend.

## Struktur Folder (`src/`)

Mengikuti pemisahan gaya Clean Architecture:

| Folder | Isi |
|---|---|
| `domain/` | Entities & business rules murni — `calculateDamage`, `calculateXp`, `getGarudaRank`, question bank |
| `application/` | Custom hooks per fitur (use case), mis. `useBattleSession` |
| `infrastructure/` | Axios API clients, token storage, audio, jembatan ke Phaser |
| `game/` | Phaser scenes (World Map, Battle, Boss) |
| `presentation/` | Pages, components, layouts (React/Tailwind) |
| `store/` | Zustand stores (auth, player, region, inventory, dll) |
| `router/` | `AppRouter` + route guard berbasis role (siswa/guru) |
| `hooks/` | Hooks React generik lintas fitur |

Detail lengkap ada di `docs/14-project-structure.md` di root repo.

## Catatan

- Formula gameplay (damage, XP, combo) hidup di `domain/rules/` — belum sepenuhnya sinkron dengan spesifikasi di `docs/07-battle-engine.md`; lihat checklist di `docs/16-battle-engine-implementation-checklist.md`.
- Akun demo siswa untuk mode nyata (backend jalan): kode kelas `SUMTR-4A`, nama `Sari`, PIN `1234`.
