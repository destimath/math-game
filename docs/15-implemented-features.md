# Legenda Garuda: Petualangan Matematika Nusantara
## Fitur yang Telah Diimplementasi & Rencana Fitur Berikutnya

**Dokumen ini mencatat semua fitur yang sudah dibangun di atas MVP dasar, beserta spesifikasi teknis lengkapnya untuk referensi pengembangan selanjutnya.**

---

## Bagian A — Fitur yang Sudah Diimplementasi

---

### A1. Level Soal (Difficulty: Mudah / Sedang / Sulit)

**Status:** ✅ Selesai

#### Gambaran
Setiap battle memiliki 3 tingkat kesulitan yang dapat dipilih pemain sebelum masuk ke arena. Tingkat kesulitan memengaruhi jumlah soal, waktu per soal, penalti Semangat, dan reward Keping Garuda.

#### Konfigurasi Per Level

| Parameter | Mudah (easy) | Sedang (medium) | Sulit (hard) |
|---|---|---|---|
| Jumlah soal | 8 | 10 | 12 |
| Waktu per soal | 20 detik | 15 detik | 12 detik |
| Penalti Semangat (salah) | −10 | −15 | −20 |
| Keping per soal benar | 3 | 5 | 8 |
| ID soal | e1–e12 | m1–m12 | h1–h12 |

#### Bank Soal (`frontend/src/domain/data/questionBank.ts`)
- **Mudah** (e1–e12): operasi bilangan ≤100, nilai satuan & puluhan
- **Sedang** (m1–m12): operasi bilangan ≤999, nilai ratusan
- **Sulit** (h1–h12): operasi bilangan ≤1.000, soal cerita kontekstual

#### Alur UX
1. Pemain tap region di Peta Dunia → `DifficultyModal` muncul
2. Pilih 🌱 MUDAH / ⚡ SEDANG / 🔥 SULIT
3. Battle berjalan sesuai konfigurasi yang dipilih
4. Jika kalah, `DefeatPage` menawarkan "Coba Level Lebih Mudah"

#### File Utama
| File | Keterangan |
|---|---|
| `domain/entities/BattleQuestion.ts` | Type `DifficultyLevel = 'easy' \| 'medium' \| 'hard'` |
| `domain/data/questionBank.ts` | 36 soal (12 per level), sudah diverifikasi jawabannya |
| `application/battle/useBattleSession.ts` | `DIFFICULTY_CONFIG`, shuffle Fisher-Yates, soal dikunci saat mount |
| `presentation/components/DifficultyModal.tsx` | Modal pilih tingkat kesulitan |
| `presentation/pages/BattlePage.tsx` | Baca `difficulty` dari `location.state` |
| `presentation/pages/DefeatPage.tsx` | Tombol "Coba Level Lebih Mudah" |

---

### A2. Integrasi Backend (React ↔ Spring Boot)

**Status:** ✅ Selesai

#### Gambaran
Frontend React terhubung ke backend Spring Boot melalui Axios. Setiap API call menggunakan token JWT yang disimpan di `tokenStorage`. Terdapat fallback mock data saat `VITE_API_BASE_URL` tidak disetel.

#### Konfigurasi
| Parameter | Nilai |
|---|---|
| Backend port | `8081` |
| Frontend port | `5173` |
| Env variable | `VITE_API_BASE_URL=http://localhost:8081` |
| Auth header | `Authorization: Bearer <token>` |
| CORS origins | `localhost:5173`, `localhost:3000`, `localhost:4173` |

#### Endpoint Utama

| Method | Path | Guard | Fungsi |
|---|---|---|---|
| POST | `/api/auth/student-login` | public | Login siswa (classCode + nama + PIN) |
| POST | `/api/auth/teacher-login` | public | Login guru (email + password) |
| GET | `/api/player/me` | JWT | Profil pemain (level, XP, Keping) |
| POST | `/api/battle/complete` | JWT | Submit hasil battle → dapat XP/Keping |
| GET | `/api/leaderboard` | JWT | Daftar peringkat kelas |
| GET | `/api/teacher/roster?classCode=X` | JWT + ROLE_TEACHER | Daftar siswa + progres |

#### Keamanan Backend
- `SecurityConfig`: Stateless JWT, CSRF disabled, CORS configured
- `JwtAuthFilter`: Validasi token, set `ROLE_TEACHER` / `ROLE_STUDENT` ke SecurityContext
- `@EnableMethodSecurity` + `@PreAuthorize("hasRole('TEACHER')")` untuk endpoint guru
- PIN siswa disimpan sebagai BCrypt hash

#### File Utama
| File | Keterangan |
|---|---|
| `infrastructure/api/apiClient.ts` | Axios instance + Bearer token interceptor |
| `infrastructure/api/authApi.ts` | loginStudent, loginTeacher |
| `infrastructure/api/battleApi.ts` | complete(result) |
| `infrastructure/api/leaderboardApi.ts` | getLeaderboard() |
| `infrastructure/api/classroomApi.ts` | getRoster(classCode) |
| `backend/.../shared/SecurityConfig.java` | CORS, filter chain, method security |
| `backend/.../shared/JwtAuthFilter.java` | Token validation + authority mapping |

---

### A3. Sistem Pindah Pulau (Region Unlock)

**Status:** ✅ Selesai

#### Gambaran
Pemain harus menyelesaikan 10 battle di sebuah pulau untuk membuka pulau berikutnya. Progres tersimpan di `localStorage` via Zustand persist. Peta Dunia memperlihatkan status tiap pulau secara real-time.

#### Urutan Region
```
Sumatra → Kalimantan → Jawa → Bali → Sulawesi → Maluku → Papua
```

#### Status Region
| Status | Tampilan di Peta | Aksi |
|---|---|---|
| `active` | ikon region | Bisa di-tap → pilih difficulty → battle |
| `locked` | 🔒 | Tidak bisa di-tap |
| `completed` | ⭐ | Bisa di-tap (replay) |

#### Aturan Unlock
- 10 battle (menang/kalah sama-sama dihitung) di region aktif → region `completed`
- Region berikutnya dalam `REGION_ORDER` berubah dari `locked` → `active`
- Jika sudah selesai semua, tidak ada unlock baru

#### Penyimpanan
- Zustand store: `useRegionStore` (persist key: `legenda-garuda:regions`)
- Field per region: `{ status, battleCount, completedAt }`
- `completeBattle(regionId)` mengembalikan `newlyUnlockedRegionId | null`

#### Feedback Pemain
- `VictoryPage` menampilkan banner "🎊 Pulau Baru Terbuka! [NamaPulau]" jika ada unlock
- `WorldMapPage` bottom bar menampilkan `ProgressBar` dengan label `X/10 battle`
- Node region di Phaser scene diperbarui otomatis saat store berubah

#### File Utama
| File | Keterangan |
|---|---|
| `store/regionStore.ts` | Zustand persist — state & actions seluruh region |
| `application/world/useRegions.ts` | Merge store + metadata statis menjadi array Region |
| `game/scenes/WorldMapScene.ts` | Render node dengan ikon sesuai status |
| `presentation/pages/WorldMapPage.tsx` | DifficultyModal + ProgressBar bottom bar |
| `presentation/pages/VictoryPage.tsx` | Banner unlock + panggil completeBattle() |

---

### A4. Teacher Dashboard

**Status:** ✅ Selesai

#### Gambaran
Halaman khusus guru (`/guru`) untuk memantau progres seluruh siswa di kelas. Guru login dengan tab "Guru" di halaman Login dan langsung diarahkan ke dashboard setelah autentikasi berhasil.

#### Fitur Dashboard
- Search kelas berdasarkan kode (misal `SUMTR-4A`)
- Kartu statistik ringkas: jumlah siswa, total menang, rata-rata akurasi kelas
- Tabel desktop dengan kolom: nama, level, XP, Keping Garuda, streak, battle, menang, akurasi + bar warna
- Kartu mobile per siswa (responsive)
- AccuracyBar: hijau (≥80%), kuning (60–79%), merah (<60%)

#### Routing & Guard
- Route `/guru` dijaga `TeacherRoute` — redirect ke `/login` jika belum auth, ke `/` jika bukan guru
- Login guru → `useAuthStore.getState().session?.role === 'teacher'` → `navigate('/guru')`
- Layout `/guru` full-width tanpa SideNav (desktop) dan tanpa BottomNav (mobile)

#### Backend Endpoint
```
GET /api/teacher/roster?classCode=SUMTR-4A
Authorization: Bearer <token>   (role: TEACHER)
```

Response:
```json
[
  {
    "id": 1, "name": "Sari", "level": 3, "xp": 250,
    "kepingGaruda": 80, "streakDays": 5,
    "totalBattles": 8, "victories": 6,
    "totalAnswered": 64, "totalCorrect": 52
  }
]
```

#### Query Backend
- `UserRepository.findByRoleAndClassCodeIgnoreCaseOrderByDisplayNameAsc()` — daftar siswa
- `BattleSessionRepository.aggregateByUserIds()` — native SQL aggregate (COUNT, SUM battle stats)
- `TeacherService` merge kedua hasil → `StudentProgressResponse`

#### File Utama
| File | Keterangan |
|---|---|
| `presentation/pages/TeacherDashboardPage.tsx` | Halaman utama dashboard |
| `application/classroom/useClassRoster.ts` | Hook fetch + mock fallback |
| `infrastructure/api/classroomApi.ts` | API client untuk roster |
| `router/AppRouter.tsx` | `TeacherRoute` guard + route `/guru` |
| `presentation/pages/LoginPage.tsx` | Redirect role-based pasca login |
| `presentation/layouts/DesktopShell.tsx` | `/guru` → fullpage (tanpa SideNav) |
| `presentation/layouts/MobileShell.tsx` | `/guru` → fullscreen (tanpa BottomNav) |
| `backend/.../teacher/TeacherController.java` | `GET /api/teacher/roster` |
| `backend/.../teacher/TeacherService.java` | Logika merge student + battle stats |
| `backend/.../teacher/StudentProgressResponse.java` | DTO dengan helper `accuracyPct()` |

---

## Bagian B — Rencana Fitur Berikutnya

Berdasarkan prioritas **Should Have** di roadmap MVP (doc 13), berikut spesifikasi fitur yang siap diimplementasi:

---

### B1. Hadiah Login Harian + Streak

**Prioritas:** Should Have | **Estimasi:** 1–2 hari

#### Gambaran
Siswa yang login setiap hari mendapatkan hadiah kecil (Keping Garuda). Jika login berturut-turut (streak), hadiah meningkat. Jika melewatkan satu hari, streak reset ke 1.

#### Aturan Streak
| Hari Streak | Hadiah Keping Garuda |
|---|---|
| Hari 1 | +5 🪶 |
| Hari 2 | +8 🪶 |
| Hari 3 | +12 🪶 |
| Hari 4 | +15 🪶 |
| Hari 5+ | +20 🪶 |

#### Spesifikasi Backend
- Field baru di `UserEntity`: `lastLoginDate: LocalDate`, `streakDays: int`
- Endpoint: `POST /api/player/daily-claim`
  - Jika `lastLoginDate == kemarin` → `streakDays++`
  - Jika `lastLoginDate < kemarin` → `streakDays = 1`
  - Jika `lastLoginDate == hari ini` → return `{ alreadyClaimed: true }`
  - Update `kepingGaruda`, return `{ streakDays, kepingEarned, alreadyClaimed }`
- Dipanggil otomatis saat `GET /api/player/me` (atau dipanggil eksplisit di HomePage)

#### Spesifikasi Frontend
- Hook: `useDailyReward()` — panggil `POST /api/player/daily-claim` saat mount HomePage
- Komponen: `DailyRewardModal` — muncul sekali per hari
  - Tampilkan animasi api 🔥 untuk streak
  - Tampilkan "+X 🪶 Keping Garuda"
  - Tampilkan "Hari ke-N berturut-turut!"
- Simpan `lastClaimedDate` di localStorage sebagai guard agar modal tidak muncul dua kali
- Update `playerStore.kepingGaruda` dan `streakDays` setelah claim

#### File yang Perlu Dibuat/Diubah
| File | Aksi |
|---|---|
| `backend/.../player/UserEntity.java` | Tambah field `lastLoginDate`, `streakDays` |
| `backend/.../player/PlayerController.java` | Tambah endpoint `POST /api/player/daily-claim` |
| `backend/.../player/PlayerService.java` | Logika streak + reward Keping |
| `frontend/infrastructure/api/playerApi.ts` | Fungsi `claimDailyReward()` |
| `frontend/application/player/useDailyReward.ts` | Hook claim + state modal |
| `frontend/presentation/components/DailyRewardModal.tsx` | UI modal animasi |
| `frontend/presentation/pages/HomePage.tsx` | Panggil `useDailyReward()` + render modal |

---

### B2. Misi Harian

**Prioritas:** Should Have | **Estimasi:** 2–3 hari

#### Gambaran
Setiap hari siswa mendapat 3 misi ringan. Misi reset pukul 00:00 WIB. Menyelesaikan misi memberi bonus Keping Garuda ekstra.

#### Daftar Misi (Pool)

| Kode | Deskripsi | Target | Reward |
|---|---|---|---|
| `WIN_2` | Menangkan 2 battle | 2 kemenangan | +10 🪶 |
| `ANSWER_10` | Jawab 10 soal dengan benar | 10 jawaban benar | +8 🪶 |
| `STREAK_ANSWER_5` | Jawab 5 soal benar berturut-turut dalam 1 battle | 5 combo | +12 🪶 |
| `PLAY_HARD` | Mainkan 1 battle tingkat Sulit | 1 battle hard | +15 🪶 |
| `PLAY_3` | Mainkan 3 battle (apapun hasilnya) | 3 battle | +6 🪶 |
| `FAST_ANSWER_5` | Jawab 5 soal dalam waktu < 5 detik masing-masing | 5 jawaban cepat | +10 🪶 |

#### Spesifikasi Backend
- Tabel `daily_missions`: `id, user_id, mission_code, date, progress, completed, claimed`
- Endpoint `GET /api/missions/today` → 3 misi hari ini (generate + return progress)
- Endpoint `POST /api/missions/{id}/claim` → tandai claimed, grant Keping
- Progress diupdate otomatis di `BattleService.completeBattle()` berdasarkan hasil battle

#### Spesifikasi Frontend
- Hook: `useDailyMissions()` — fetch dari `/api/missions/today`, fallback mock
- Komponen: `MissionCard` — menampilkan icon, deskripsi, progress bar, tombol Klaim
- Ditampilkan di `HomePage` dalam section "Misi Hari Ini"
- Badge notifikasi jika ada misi yang selesai belum diklaim

#### File yang Perlu Dibuat/Diubah
| File | Aksi |
|---|---|
| `backend/.../mission/DailyMission.java` | Entity + enum `MissionCode` |
| `backend/.../mission/MissionController.java` | GET today, POST claim |
| `backend/.../mission/MissionService.java` | Generate misi harian, cek progress, grant reward |
| `frontend/infrastructure/api/missionApi.ts` | Fungsi `getTodayMissions()`, `claimMission(id)` |
| `frontend/application/mission/useDailyMissions.ts` | Hook fetch + claim |
| `frontend/presentation/components/MissionCard.tsx` | UI kartu misi |
| `frontend/presentation/pages/HomePage.tsx` | Section misi harian |

---

### B3. Achievement / Lencana

**Prioritas:** Should Have | **Estimasi:** 2–3 hari

#### Gambaran
3–5 achievement pertama yang bisa diraih siswa. Achievement muncul sebagai banner di Victory Screen dan tersimpan di tab Profil.

#### Daftar Achievement MVP

| ID | Nama | Kondisi | Ikon |
|---|---|---|---|
| `first_win` | Pahlawan Pertama | Menangkan battle pertama | 🏅 |
| `streak_3` | Api Semangat | Login 3 hari berturut-turut | 🔥 |
| `correct_20` | Ahli Angka | Jawab 20 soal benar total | 🧮 |
| `hard_win` | Penakluk Sulit | Menangkan 1 battle tingkat Sulit | 💪 |
| `region_done` | Penjelajah Sumatra | Selesaikan seluruh battle di Sumatra | ⭐ |

#### Spesifikasi Backend
- Tabel `achievements`: `id, user_id, achievement_code, granted_at`
- `AchievementService.checkAndGrant(userId, context)` dipanggil setelah event penting (battle selesai, login, dll)
- Endpoint `GET /api/achievements` → daftar achievement yang sudah diraih
- Response battle complete (`POST /api/battle/complete`) menyertakan `newAchievements: string[]`

#### Spesifikasi Frontend
- Hook: `useAchievements()` — fetch daftar achievement dari API
- Komponen: `AchievementBanner` — animasi slide-in di Victory Screen jika ada achievement baru
- Tab "Lencana" di `ProfilePage` — grid semua achievement (diraih vs. terkunci/samar)
- `playerStore` menyimpan sementara `pendingAchievements: string[]` untuk ditampilkan di Victory

#### File yang Perlu Dibuat/Diubah
| File | Aksi |
|---|---|
| `backend/.../achievement/Achievement.java` | Entity + enum `AchievementCode` |
| `backend/.../achievement/AchievementService.java` | Logika cek & grant per event |
| `backend/.../achievement/AchievementController.java` | GET /api/achievements |
| `backend/.../battle/BattleCompleteResponse.java` | Tambah field `newAchievements` |
| `frontend/infrastructure/api/achievementApi.ts` | getAchievements() |
| `frontend/application/achievement/useAchievements.ts` | Hook fetch |
| `frontend/presentation/components/AchievementBanner.tsx` | Banner animasi |
| `frontend/presentation/pages/ProfilePage.tsx` | Tab lencana |
| `frontend/presentation/pages/VictoryPage.tsx` | Tampilkan banner achievement baru |

---

### B4. Pusaka / Item Battle (Inventory)

**Prioritas:** Should Have | **Estimasi:** 2–3 hari

#### Gambaran
Dua item bisa digunakan pemain selama battle untuk membantu menjawab soal. Item dibeli/diperoleh dari Keping Garuda. Setiap item memiliki jumlah terbatas per battle (maks 2x pakai per battle).

#### Item MVP

| Item | Nama | Efek | Harga | Maks/Battle |
|---|---|---|---|---|
| `BULU_WAKTU` | Bulu Waktu | +10 detik ke soal saat ini | 15 🪶 | 2x |
| `BULU_PETUNJUK` | Bulu Petunjuk | Hapus 2 opsi jawaban salah | 20 🪶 | 2x |

#### Spesifikasi Backend
- Tabel `inventory`: `id, user_id, item_code, quantity`
- Endpoint `GET /api/inventory` → daftar item & jumlah yang dimiliki
- Endpoint `POST /api/inventory/use` → `{ itemCode }` → validasi stok, kurangi quantity, return konfirmasi
- Item bisa diperoleh dari reward achievement atau dibeli (skema beli bisa disederhanakan: grant langsung via admin/seed)

#### Spesifikasi Frontend
- `useInventory()` — fetch daftar item
- Tombol item muncul di Battle Screen (pojok kanan bawah, di luar canvas Phaser)
- Bulu Waktu: tambah `extraSeconds` ke `timeLeft` di `useBattleSession`
- Bulu Petunjuk: set state `eliminatedOptions: number[]` → opsi jawaban tampil abu-abu/dicoret
- Counter per-battle maksimal 2x — tombol disabled setelah 2x pakai atau stok habis

#### File yang Perlu Dibuat/Diubah
| File | Aksi |
|---|---|
| `backend/.../inventory/InventoryController.java` | GET /api/inventory, POST /api/inventory/use |
| `backend/.../inventory/InventoryService.java` | Stok check, deduct, konfirmasi |
| `backend/.../inventory/InventoryItem.java` | Entity + enum `ItemCode` |
| `frontend/infrastructure/api/inventoryApi.ts` | getInventory(), useItem() |
| `frontend/application/inventory/useInventory.ts` | Hook fetch + use action |
| `frontend/application/battle/useBattleSession.ts` | Tambah `addTime(sec)`, `eliminateOptions()` |
| `frontend/presentation/pages/BattlePage.tsx` | Render tombol item + handle click |
| `frontend/presentation/pages/InventoryPage.tsx` | Update tampilkan stok item |

---

## Ringkasan Status

| Fitur | Kategori MVP | Status |
|---|---|---|
| Login Siswa & Guru | Must Have | ✅ Selesai |
| JWT + RBAC | Must Have | ✅ Selesai |
| World Map + Region Sumatra | Must Have | ✅ Selesai |
| Battle Engine (Tantangan Angka) | Must Have | ✅ Selesai |
| Victory & Defeat Screen | Must Have | ✅ Selesai |
| Progresi Pemain (XP, Level, Keping) | Must Have | ✅ Selesai |
| Bank Soal (Easy/Medium/Hard) | Must Have | ✅ Selesai |
| Integrasi Backend | Must Have | ✅ Selesai |
| Sistem Pindah Pulau (7 region) | Must Have | ✅ Selesai |
| Teacher Dashboard | Must Have | ✅ Selesai |
| Leaderboard Kelas | Should Have | ✅ Selesai |
| Hadiah Login Harian + Streak | Should Have | 📋 Direncanakan (B1) |
| Misi Harian | Should Have | 📋 Direncanakan (B2) |
| Achievement / Lencana | Should Have | 📋 Direncanakan (B3) |
| Pusaka / Item Battle | Should Have | 📋 Direncanakan (B4) |
| Settings (audio, ganti PIN) | Should Have | ⚠️ UI ada, backend belum |
| Unlock Karakter Bayu | Should Have | 📋 Direncanakan |

---

*Dokumen ini diperbarui setiap kali ada fitur baru yang selesai diimplementasi atau direncanakan. Lihat juga: [13-mvp-roadmap.md](13-mvp-roadmap.md) untuk roadmap keseluruhan.*
