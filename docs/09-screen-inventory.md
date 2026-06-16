# Legenda Garuda: Petualangan Matematika Nusantara
## Screen Inventory — UX Documentation — Phase 1: Discovery, Prompt 9

**Konvensi API**: Semua endpoint berbasis `/api/v1/...`, autentikasi via Bearer token (JWT) yang didapat dari endpoint login. Role: `student` (Sahabat Garuda) dan `teacher`.

---

## Ringkasan Layar

| # | Screen | Tujuan Singkat | Role |
|---|---|---|---|
| 1 | Login | Masuk ke akun siswa/guru | Siswa, Guru |
| 2 | Home | Dashboard utama & pintu masuk fitur | Siswa |
| 3 | Map | Navigasi World Map & pilih region | Siswa |
| 4 | Battle | Gameplay inti — Tantangan Angka/Besar | Siswa |
| 5 | Rewards | Tampilan hasil/reward setelah stage | Siswa |
| 6 | Profile | Identitas, statistik, Sahabat Garuda | Siswa |
| 7 | Inventory | Kelola Pusaka, kostum, koleksi, companion | Siswa |
| 8 | Leaderboard | Peringkat kelas/sekolah | Siswa |
| 9 | Teacher Dashboard | Monitoring & pengaturan kelas | Guru |
| 10 | Settings | Audio, bahasa, akun, bantuan | Siswa, Guru |

---

## Navigation Flow

```
[Login]
   │
   ├─(role: Siswa)──► [Home]
   │                    ├──► [Map] ──► Hub Desa/Stage ──► [Battle] ──► [Rewards] ──┐
   │                    │       ▲_____________________________________________────┘
   │                    ├──► [Profile]
   │                    ├──► [Inventory]
   │                    ├──► [Leaderboard]
   │                    └──► [Settings]
   │
   └─(role: Guru)───► [Teacher Dashboard] ──► [Settings]
```

---

## 1. Login

### Purpose
Autentikasi pemain (siswa) atau guru sebelum mengakses konten game/dashboard.

### Components
- Logo & ilustrasi Garuda Wisanggeni
- Tab "Siswa" / "Guru"
- Form Siswa: Kode Kelas + Pilih Avatar Nama + PIN 4 digit
- Form Guru: Email + Password
- Tombol "Masuk"
- Link "Lupa PIN/Password"
- Dropdown pilihan bahasa (Indonesia / Bahasa Daerah - opsional)

### Actions
- Login sebagai siswa (kode kelas + nama + PIN)
- Login sebagai guru (email + password)
- Reset PIN/password
- Ganti bahasa aplikasi

### API Dependencies
- `POST /api/v1/auth/student/login`
- `POST /api/v1/auth/teacher/login`
- `POST /api/v1/auth/forgot-password`
- `GET /api/v1/config/languages`

---

## 2. Home

### Purpose
Dashboard utama setelah login — ringkasan progres, notifikasi harian, dan pintu masuk ke semua fitur.

### Components
- Avatar & nama Sahabat Garuda aktif + level (Garuda Rank)
- Progress bar XP ke level berikutnya
- Counter Keping Garuda
- Banner "Hadiah Login Harian" (klaim jika tersedia)
- Kartu Misi Harian (3 misi + status)
- Tombol besar "Lanjutkan Petualangan" → Map
- Navigasi bawah: Map, Profile, Inventory, Leaderboard, Settings

### Actions
- Klaim hadiah login harian
- Lihat/centang misi harian
- Tap "Lanjutkan Petualangan" → ke Map (region/stage terakhir)
- Navigasi ke screen lain via bottom nav

### API Dependencies
- `GET /api/v1/player/summary`
- `GET /api/v1/player/daily-rewards`
- `POST /api/v1/player/daily-rewards/claim`
- `GET /api/v1/player/daily-missions`

---

## 3. Map

### Purpose
Navigasi **World Map Nusantara Agung** — memilih region/stage yang akan dimainkan.

### Components
- Peta 7 region (Sumatra, Java, Bali, Kalimantan, Sulawesi, Maluku, Papua) dengan status: locked / unlocked / completed
- Indikator progres per region (Prasasti terkumpul, jumlah bintang stage)
- Avatar Sahabat Garuda bergerak di peta
- Tooltip info region terkunci (syarat unlock)
- Tombol masuk Hub Desa (region unlocked)
- Animasi cutscene singkat saat region baru terbuka

### Actions
- Tap region unlocked → masuk Hub Desa
- Tap region locked → tampilkan syarat unlock
- Tap Hub Desa → pilih stage (eksplorasi/duel/mini-tantangan/Tantangan Besar)
- Kembali ke Home

### API Dependencies
- `GET /api/v1/world/regions`
- `GET /api/v1/world/regions/{regionId}/progress`
- `GET /api/v1/world/regions/{regionId}/stages`
- `POST /api/v1/world/regions/{regionId}/enter`

---

## 4. Battle (Tantangan Angka / Tantangan Besar)

### Purpose
Layar gameplay inti — penyelesaian soal matematika dalam format "duel ramah" sesuai Battle Engine (Prompt 7).

### Components
- Bar Kebingungan (musuh/Sosok Kabut) + Bar Semangat (pemain)
- Combo counter & indikator "Serangan Garuda" (saat combo kelipatan 3)
- Timer soal (sesuai tier kesulitan)
- Panel soal matematika (teks/visual/diagram sesuai topik region)
- Opsi jawaban (multiple choice / input numerik / drag-drop, sesuai tipe soal)
- Tombol Pusaka Garuda (Bulu Waktu, Bulu Petunjuk, Bulu Pelindung)
- Tombol "Kekuatan Sahabat" (aktifkan kemampuan karakter aktif)
- Animasi karakter & efek visual (benar/salah, Efek Kabut Sesaat, Bantuan Garuda)
- Tombol pause (dengan konfirmasi keluar)

### Actions
- Submit jawaban
- Gunakan Pusaka (item)
- Aktifkan Kekuatan Sahabat / ganti karakter aktif dalam tim
- Pause / keluar sesi (progres tersimpan otomatis)

### API Dependencies
- `POST /api/v1/battle/sessions` (mulai sesi)
- `GET /api/v1/battle/sessions/{sessionId}/question`
- `POST /api/v1/battle/sessions/{sessionId}/answer`
- `POST /api/v1/battle/sessions/{sessionId}/use-item`
- `GET /api/v1/battle/sessions/{sessionId}/state`
- `POST /api/v1/battle/sessions/{sessionId}/complete`

---

## 5. Rewards

### Purpose
Menampilkan hasil & reward setelah menyelesaikan stage, Tantangan Besar, atau membuka achievement.

### Components
- Animasi perayaan (confetti, Sahabat Garuda melompat/bertepuk tangan)
- Daftar reward: Keping Garuda, XP, item Pusaka, Prasasti (jika region selesai), kostum/companion baru
- Banner achievement baru (jika ada)
- Tombol "Lanjutkan" (kembali ke Map/Hub Desa) atau "Stage Berikutnya"

### Actions
- Lihat detail item/achievement baru
- Lanjut ke stage berikutnya / kembali ke Map

### API Dependencies
- `GET /api/v1/battle/sessions/{sessionId}/rewards`
- `GET /api/v1/player/achievements/new`
- `POST /api/v1/player/achievements/{achievementId}/acknowledge`

---

## 6. Profile

### Purpose
Menampilkan identitas pemain, statistik progres, dan pengelolaan anggota Sahabat Garuda.

### Components
- Avatar besar dengan kostum terpasang
- Nama, kelas/sekolah, Garuda Rank (level)
- Statistik: total XP, jumlah Prasasti, jumlah achievement, streak login
- Daftar 5 anggota Sahabat Garuda (Sari, Bayu, Made, Tiwi, Rian) + status unlock
- Tombol ganti karakter aktif
- Tombol "Lihat Semua Achievement"

### Actions
- Ganti karakter aktif (Sahabat Garuda)
- Lihat daftar achievement lengkap
- Lihat detail statistik per topik (akurasi per topik matematika)

### API Dependencies
- `GET /api/v1/player/profile`
- `PATCH /api/v1/player/profile/active-character`
- `GET /api/v1/player/achievements`
- `GET /api/v1/player/stats`

---

## 7. Inventory

### Purpose
Mengelola item yang dimiliki pemain: Pusaka Garuda, kostum, koleksi budaya, dan companion.

### Components
- Tab kategori: Pusaka Garuda | Kostum & Aksesori | Koleksi Budaya | Companion
- Grid item dengan ikon, nama, jumlah (untuk Pusaka yang stackable)
- Panel detail item (deskripsi, fungsi, sumber perolehan)
- Tombol "Pakai" / "Lepas" untuk kostum & companion
- Indikator item baru (badge "Baru!")

### Actions
- Filter berdasarkan kategori
- Tap item → lihat detail
- Equip/unequip kostum atau companion
- Tutup detail / kembali

### API Dependencies
- `GET /api/v1/player/inventory`
- `GET /api/v1/player/inventory/{itemId}`
- `PATCH /api/v1/player/inventory/{itemId}/equip`

---

## 8. Leaderboard

### Purpose
Menampilkan peringkat pemain di kelas/sekolah sebagai bentuk kompetisi sehat (sesuai Retention Strategy, Prompt 6).

### Components
- Tab periode: Harian | Mingguan
- Toggle scope: Kelas Saya | Sekolah
- Daftar ranking: avatar, nama, poin/XP periode ini, posisi
- Highlight baris milik pemain sendiri
- Badge "Bintang Minggu Ini" untuk top performer/most-improved

### Actions
- Ganti tab periode (harian/mingguan)
- Ganti scope (kelas/sekolah)
- Scroll daftar ranking
- Tap nama pemain lain → lihat avatar & badge publik (info terbatas)

### API Dependencies
- `GET /api/v1/leaderboard/class/{classId}?period=daily|weekly`
- `GET /api/v1/leaderboard/school/{schoolId}?period=weekly`
- `GET /api/v1/leaderboard/highlight/{classId}` (Bintang Minggu Ini)

---

## 9. Teacher Dashboard

### Purpose
Memungkinkan guru memantau progres siswa, mengatur konten kelas, dan mengunduh laporan (selaras Product Canvas, Prompt 2).

### Components
- Daftar siswa di kelas dengan progress bar per region/topik
- Grafik agregat penguasaan topik (kelas)
- Filter: per topik, per region, per rentang tanggal
- Panel "Mode Guru": kunci topik/tier kesulitan untuk kelas (Battle Engine, Prompt 7)
- Tombol unduh/cetak Laporan Mingguan
- Manajemen kelas: kode kelas, tambah/hapus siswa, reset PIN siswa
- Tombol kirim apresiasi/badge ke siswa tertentu

### Actions
- Lihat detail progres siswa individu
- Atur topik/tier wajib untuk kelas (Mode Guru)
- Generate & unduh laporan mingguan (PDF)
- Tambah/hapus siswa, reset PIN
- Kirim badge apresiasi ke siswa

### API Dependencies
- `GET /api/v1/teacher/classes/{classId}/students`
- `GET /api/v1/teacher/classes/{classId}/progress`
- `POST /api/v1/teacher/classes/{classId}/settings`
- `GET /api/v1/teacher/classes/{classId}/report?period=weekly`
- `POST /api/v1/teacher/classes/{classId}/students`
- `DELETE /api/v1/teacher/classes/{classId}/students/{studentId}`
- `POST /api/v1/teacher/classes/{classId}/students/{studentId}/reset-pin`
- `POST /api/v1/teacher/classes/{classId}/students/{studentId}/badge`

---

## 10. Settings

### Purpose
Pengaturan aplikasi: audio, bahasa, akun, dan bantuan — tersedia untuk siswa & guru.

### Components
- Toggle Musik & SFX (on/off + slider volume)
- Dropdown bahasa
- Info akun (nama, kelas/sekolah, kode kelas)
- Tombol ganti PIN (siswa) / ganti password (guru)
- Link "Bantuan / FAQ"
- Info versi aplikasi
- Tombol "Keluar" (logout)

### Actions
- Atur volume musik/SFX
- Ganti bahasa
- Ganti PIN/password
- Buka halaman bantuan
- Logout

### API Dependencies
- `GET /api/v1/player/settings`
- `PATCH /api/v1/player/settings`
- `POST /api/v1/auth/change-pin`
- `POST /api/v1/auth/logout`
- `GET /api/v1/config/help`

---

*Dokumen ini adalah output Phase 1 — Discovery, Prompt 9 (Screen Inventory / UX Documentation) untuk proyek "Legenda Garuda: Petualangan Matematika Nusantara".*
