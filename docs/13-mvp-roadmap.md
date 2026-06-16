# Legenda Garuda: Petualangan Matematika Nusantara
## MVP Definition & Development Roadmap — Phase 1: Discovery, Prompt 13

**Target**: Launch dalam **8 minggu**. Hanya fitur yang benar-benar diperlukan untuk rilis pertama (pilot 1-2 kelas) yang dimasukkan ke "Must Have".

---

## 1. Keputusan Cakupan Teknis untuk MVP

Mengacu pada System Architecture (Prompt 12), 8 minggu **tidak cukup** untuk 6 microservices + full OpenShift HA. Keputusan cakupan:

| Area | Desain Penuh (Prompt 12) | Cakupan MVP | Alasan |
|---|---|---|---|
| **Backend** | 6 service Spring Boot terpisah | **1 modular monolith** Spring Boot dengan modul/package terpisah (auth, player, content, battle, classroom, leaderboard) — boundary sama, siap di-split nanti | Mengurangi overhead deployment/observability; modul tetap terpisah secara kode agar migrasi ke microservices (Could Have) tidak perlu refactor besar |
| **Konten Dunia** | 7 region + Istana Garuda | **1 region penuh: Sumatra** (Kelas 1-2 / Fase A) | Sumatra adalah titik awal alur (Prompt 4 & 8) — satu vertical slice lengkap (eksplorasi → Tantangan Angka → Tantangan Besar → Prasasti) cukup untuk validasi produk |
| **Karakter** | 5 Sahabat Garuda | **Sari** (default) + **Bayu** (unlock dari boss Sumatra) | Bayu berasal dari Sumatra — unlock-nya tematik & memvalidasi sistem unlock karakter tanpa perlu 5 power kit lengkap |
| **Difficulty Engine** | 3 tier (Tunas/Pelajar/Cendekia) + adaptive penuh | **Tunas** tetap + transisi sederhana ke **Pelajar** | Cendekia baru relevan di region Kelas 4+; adaptive penuh (rolling window 10) cukup disederhanakan dulu |
| **Deployment** | Multi-env (dev/staging/prod), Postgres operator HA, Redis cluster, HPA penuh | **1 namespace OpenShift** (prod + dev terpisah minimal), Postgres single instance + daily backup, Redis single instance | HA penuh belum kritis untuk pilot skala kecil |
| **Observability** | Prometheus+Grafana+Jaeger+EFK | **Logging dasar + health check** | Tracing lintas-service tidak relevan untuk monolith |

---

## 2. MoSCoW

### 2.1 Must Have (Launch Blocker)

| Kategori | Fitur | Deskripsi |
|---|---|---|
| **Auth** | Login Siswa | `class_code` + nama + PIN 4 digit (Prompt 9/11) |
| **Auth** | Login Guru | Email + password |
| **Auth** | JWT + RBAC dasar | Role `student`/`teacher`, akses terbatas sesuai kelas |
| **Home** | Dashboard utama | Profil ringkas (avatar Sari, Garuda Rank, XP, Keping Garuda), CTA "Lanjutkan Petualangan" |
| **World Map** | Region Sumatra aktif | 6 region lain tampil **terkunci** (teaser, tanpa konten) |
| **Tantangan Angka** | Battle Engine inti | Formula damage/combo/XP (Prompt 7) — Tier **Tunas** |
| **Tantangan Besar** | Boss Sumatra ("Ombak Hitam"/"Ombak Kecil") | Minimal 2 fase (vs. 3 fase desain penuh) |
| **Victory Screen** | Reward feedback | Animasi reward, XP, Keping Garuda, level-up |
| **Progresi Pemain** | Persistensi | Garuda Rank, XP, Keping Garuda, Prasasti Selat Emas tersimpan |
| **Konten Soal** | Bank soal Sumatra | Topik: Nilai Tempat, Penjumlahan/Pengurangan sampai 1.000 (Kelas 1-2, Fase A) |
| **Karakter** | Sari (default, aktif) | Termasuk voice line dasar (Prompt 5) |
| **Teacher Dashboard** | MVP guru | Daftar siswa di kelas + progres dasar (region/topik) |
| **Platform** | Modular monolith + PostgreSQL + Redis | Sesuai §1 |
| **Deployment** | Docker + 1 namespace OpenShift | Build & deploy pipeline dasar |
| **Security** | JWT, PIN hashing, rate limit login | Cegah brute-force PIN (maks 5 percobaan/menit) |

### 2.2 Should Have (High Value, Tidak Blocking)

| Kategori | Fitur | Deskripsi |
|---|---|---|
| **Engagement** | Hadiah Login Harian + Streak | Sesuai Daily Loop (Prompt 6) |
| **Engagement** | Misi Harian | 3 misi ringan |
| **Sosial** | Leaderboard Kelas (harian) | `leaderboard_entries`, scope kelas saja |
| **Reward** | Achievement dasar | 3-5 achievement awal |
| **Inventory** | Pusaka Garuda dasar | Bulu Waktu & Bulu Petunjuk, dapat dipakai di battle |
| **Karakter** | Unlock Bayu | Reward dari Tantangan Besar Sumatra |
| **Difficulty** | Adaptive Tunas↔Pelajar | Versi sederhana dari `evaluateDifficulty` (Prompt 7) |
| **UX** | Settings dasar | Toggle audio, ganti PIN, logout |

### 2.3 Could Have (Fast Follow Pasca-Launch)

| Kategori | Fitur |
|---|---|
| **Konten** | Region 2 (Kalimantan) — lanjutan kurva Kelas 3 |
| **Karakter** | Made, Tiwi, Rian + Kekuatan Sahabat lengkap |
| **Inventory** | Kostum, Koleksi Budaya, Companion |
| **Sosial** | Leaderboard mingguan + "Bintang Minggu Ini", scope sekolah |
| **Engagement** | Tantangan mingguan tematik / event musiman |
| **Guru** | Laporan mingguan (PDF) untuk orang tua |
| **Difficulty** | Tier Cendekia + adaptive engine penuh (rolling window 10) |
| **Platform** | Split modular monolith → microservices (per Prompt 12) |
| **Platform** | Multi-environment OpenShift, Postgres HA, Redis cluster, HPA penuh |

### 2.4 Won't Have (Eksplisit di Luar Cakupan v1)

| Kategori | Fitur | Catatan |
|---|---|---|
| **Konten** | Region 3-7 + Istana Garuda (final boss Patih Angka Hitam) | Pasca pilot, setelah validasi region 1 |
| **Monetisasi** | Shop kosmetik / pembelian dalam aplikasi | Belum relevan untuk pilot edukasi |
| **Lokalisasi** | Bahasa daerah | Bahasa Indonesia saja di v1 |
| **Platform** | Aplikasi mobile native (iOS/Android) | Browser-based saja (sesuai Prompt 1) |
| **Audio** | Voice acting penuh / scoring musik orisinal | Placeholder SFX/musik royalty-free di v1 |
| **AI/Analytics** | Adaptive difficulty berbasis ML, analitik lanjutan guru | Engine rule-based (Prompt 7) sudah cukup |
| **Arsitektur** | Message broker (RabbitMQ/Kafka), tracing terdistribusi | Tidak perlu untuk monolith pilot |

---

## 3. Development Roadmap (8 Minggu)

| Minggu | Fokus | Backend | Frontend/Game | Konten | DevOps/QA | Milestone |
|---|---|---|---|---|---|---|
| **1** | Foundation | Setup repo, skema DB inti (subset Prompt 11), modul Auth (login siswa/guru, JWT) | Setup React+Tailwind, routing, screen Login | Finalisasi spesifikasi konten Sumatra (topik & jumlah soal) | Docker base image, pipeline CI dasar, namespace OpenShift dev | Login siswa & guru berfungsi end-to-end di dev |
| **2** | Home & Map | Modul Player (profile/summary), modul Content (seed region/topik Sumatra) | Screen Home, World Map (Sumatra terbuka, region lain terkunci), integrasi Phaser canvas | Mulai penulisan 60-100 soal Sumatra (Nilai Tempat, +/-) | - | Siswa login → lihat Home & Map dengan Sumatra aktif |
| **3** | Battle Engine | Modul Battle: sesi, pemilihan soal, formula damage/combo/XP (Tier Tunas), state sesi di Redis | Battle Screen (Phaser): soal, opsi jawaban, Bar Kebingungan/Semangat, efek combo | Seed bank soal ke DB (script/seed SQL) | Setup Redis di environment dev | Tantangan Angka playable end-to-end |
| **4** | Reward Loop | Penerapan reward (XP, Keping Garuda, level up), persistensi progres pemain | Victory Screen, animasi XP/level-up, update counter Keping Garuda | Balancing nilai formula via playtest internal | - | Loop penuh: Map → Battle → Victory → Map (progres tersimpan) |
| **5** | Boss & Inventory | Modul Boss (Ombak Hitam/Kecil, 2 fase), modul Inventory (Bulu Waktu/Petunjuk), grant Prasasti | UI variasi Boss Battle, Inventory screen (tab Pusaka), indikator Prasasti di Map | Finalisasi soal fase boss (kombinasi + cerita ringan) | - | Pemain menyelesaikan Tantangan Besar Sumatra & dapat Prasasti Selat Emas |
| **6** | Engagement & Guru | Hadiah harian + streak, misi harian, modul Classroom (roster + progres siswa), leaderboard kelas harian | Banner hadiah harian, kartu Misi Harian, Teacher Dashboard MVP, Leaderboard screen | Definisi 3 misi harian + 3-5 achievement | - | Guru login & lihat progres kelas; siswa lihat misi harian & streak |
| **7** | Polish & Karakter 2 | Achievement engine dasar, unlock Bayu (reward boss), endpoint Settings, adaptive Tunas↔Pelajar | Banner achievement di Victory, Profile screen (roster Sari+Bayu), Settings screen | Review konten & voice line, QA copy Bahasa Indonesia | Security review dasar (rate limit, JWT, NetworkPolicy) | Achievement & unlock Bayu berfungsi; tier adaptif aktif |
| **8** | QA, Pilot, Launch | Bugfix dari pilot test, finalisasi deploy production | Cross-browser/device testing, optimasi loading asset Phaser | - | Pilot test 1-2 kelas riil, fix berdasarkan feedback, deploy prod | **MVP Launch** — live di sekolah pilot |

### Critical Path (Ringkasan)

```
Minggu:        1        2        3        4        5        6        7        8
Auth & Setup   ████
Home & Map        ████
Battle Engine        ████
Reward Loop             ████
Boss+Inventory             ████
Engage.+Guru                  ████
Polish+Char2                       ████
QA & Launch                              ████
                                                                          ▲
                                                                    MVP LIVE
```

---

## 4. Kriteria Sukses MVP

Selaras Success Metrics (Product Canvas, Prompt 2), diukur pada pilot 1-2 kelas selama 2-4 minggu pasca-launch:

| Metrik | Target Pilot |
|---|---|
| Siswa menyelesaikan region Sumatra (Tantangan Besar) | ≥ 50% siswa pilot |
| Retensi harian (D1-D7) | ≥ 40% siswa kembali bermain di hari ke-7 |
| Rata-rata sesi per siswa/hari | 1-2 sesi (10-20 menit/sesi, sesuai Session Loop Prompt 6) |
| Guru mengakses Teacher Dashboard | ≥ 1x/minggu per guru pilot |
| Bug kritis (blocking) pasca-launch minggu 1 | 0 |
| Feedback kualitatif guru & siswa | Dikumpulkan via survei singkat untuk prioritisasi Could Have |

---

*Dokumen ini adalah output Phase 1 — Discovery, Prompt 13 (MVP Definition & Development Roadmap) untuk proyek "Legenda Garuda: Petualangan Matematika Nusantara".*

Siap lanjut ke Prompt 14 kapan saja.
