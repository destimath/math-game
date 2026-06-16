# Legenda Garuda: Petualangan Matematika Nusantara

Game edukasi matematika berbasis browser untuk siswa SD kelas 1–6. Pemain menjelajahi peta Nusantara — dari Sumatra hingga Papua — sambil menyelesaikan tantangan matematika yang terbungkus dalam alur cerita kerajaan dan legenda Indonesia.

---

## Fitur Utama

- **World Map 7 Region** — Sumatra, Kalimantan, Jawa, Bali, Sulawesi, Maluku, Papua; region dibuka bertahap setelah 10 battle
- **Battle Engine** — soal matematika dengan 3 tingkat kesulitan (Mudah / Sedang / Sulit), sistem combo, timer per soal, dan reward Keping Garuda
- **Progresi Pemain** — XP, level, Garuda Rank, dan Keping Garuda tersimpan persisten
- **Teacher Dashboard** — guru memantau progres seluruh siswa per kelas secara real-time
- **Leaderboard Kelas** — peringkat harian berbasis poin battle
- **Auth Dual-Role** — siswa login via kode kelas + nama + PIN 4 digit; guru via email + password

---

## Tech Stack

| Layer | Teknologi |
|---|---|
| Frontend | React 18 + TypeScript + Vite |
| Game Engine | Phaser 3 |
| UI Styling | Tailwind CSS 3 |
| State Management | Zustand |
| Backend | Spring Boot 3 (Java 17) |
| Database | PostgreSQL (prod) / H2 in-memory (dev) |
| Cache & Session | Redis |
| Auth | JWT (stateless) |
| Deployment | Docker + OpenShift / Kubernetes |

---

## Struktur Repo

```
math-game/
├── backend/          # Spring Boot modular monolith
│   └── src/main/java/id/legendagaruda/core/
│       ├── auth/         # Login siswa & guru, JWT
│       ├── player/       # Profil, XP, Keping Garuda
│       ├── battle/       # Battle session, damage/XP formula
│       ├── leaderboard/  # Skor & peringkat kelas
│       ├── teacher/      # Dashboard guru, progres siswa
│       └── shared/       # Security, JWT filter, response envelope
├── frontend/         # React + Phaser + Tailwind
│   └── src/
│       ├── domain/       # Entities, rules (calculateDamage, XP)
│       ├── application/  # Custom hooks (use cases)
│       ├── infrastructure/ # Axios API clients, tokenStorage, Phaser bridge
│       ├── game/         # Phaser scenes (WorldMap, Battle, Boss)
│       ├── presentation/ # Pages, components, layouts
│       ├── store/        # Zustand stores (auth, player, region, dll)
│       └── router/       # AppRouter + route guard berbasis role
└── docs/             # Dokumentasi produk & teknis (15 dokumen)
```

---

## Menjalankan Secara Lokal

### Prasyarat

- Java 17+
- Maven 3.9+
- Node.js 20+ dan npm

### Backend

```bash
cd backend
mvn spring-boot:run
```

Backend berjalan di `http://localhost:8081`. Mode dev menggunakan H2 in-memory — tidak perlu PostgreSQL untuk mencoba. Konsol H2 tersedia di `http://localhost:8081/h2-console`.

### Frontend

```bash
cd frontend
cp .env.example .env          # atur VITE_API_BASE_URL jika perlu
npm install
npm run dev
```

Frontend berjalan di `http://localhost:5173`. Jika `VITE_API_BASE_URL` tidak diset, frontend otomatis menggunakan mock data.

---

## Akun Demo (Seed Data)

Data awal di-seed otomatis saat backend pertama kali jalan (`DataSeederRunner`).

| Role | Kredensial |
|---|---|
| Siswa | Kode kelas: `SUMTR-4A` · Nama: `Sari` · PIN: `1234` |
| Guru | Email: `guru@legendagaruda.id` · Password: `password123` |

---

## Variabel Lingkungan

### Frontend (`.env`)

```env
VITE_API_BASE_URL=http://localhost:8081
```

### Backend (`application.yml`)

```yaml
app:
  jwt:
    secret: "<ganti-dengan-string-256-bit-di-production>"
    expiration-ms: 86400000   # 24 jam
```

---

## API Endpoint Utama

| Method | Path | Akses | Deskripsi |
|---|---|---|---|
| POST | `/api/auth/student-login` | Public | Login siswa |
| POST | `/api/auth/teacher-login` | Public | Login guru |
| GET | `/api/player/me` | JWT | Profil pemain |
| POST | `/api/battle/complete` | JWT | Submit hasil battle |
| GET | `/api/leaderboard` | JWT | Leaderboard kelas |
| GET | `/api/teacher/roster` | JWT + TEACHER | Daftar & progres siswa |

---

## Status Fitur MVP

| Fitur | Status |
|---|---|
| Login Siswa & Guru + JWT | ✅ |
| World Map 7 Region + Unlock | ✅ |
| Battle Engine (Mudah/Sedang/Sulit) | ✅ |
| Progresi Pemain (XP, Level, Keping) | ✅ |
| Victory & Defeat Screen | ✅ |
| Leaderboard Kelas | ✅ |
| Teacher Dashboard | ✅ |
| Integrasi React ↔ Spring Boot | ✅ |
| Hadiah Login Harian + Streak | 📋 Direncanakan |
| Misi Harian | 📋 Direncanakan |
| Achievement / Lencana | 📋 Direncanakan |
| Pusaka / Item Battle | 📋 Direncanakan |

---

## Dokumentasi

Folder `docs/` berisi 15 dokumen yang mencakup seluruh siklus desain produk:

| File | Isi |
|---|---|
| `01-product-vision.md` | Visi produk, target pengguna, USP |
| `03-game-design-document.md` | Mekanik gameplay, sistem reward |
| `07-battle-engine.md` | Formula damage, combo, XP, adaptive difficulty |
| `11-database-schema.md` | Skema PostgreSQL lengkap |
| `12-system-architecture.md` | Arsitektur sistem & diagram |
| `13-mvp-roadmap.md` | Roadmap 8 minggu & MoSCoW |
| `14-project-structure.md` | Clean Architecture backend & frontend |
| `15-implemented-features.md` | Fitur selesai & spesifikasi fitur berikutnya |
