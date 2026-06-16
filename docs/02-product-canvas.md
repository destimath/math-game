# Legenda Garuda: Petualangan Matematika Nusantara
## Product Canvas — Phase 1: Discovery, Prompt 2

---

## 1. Problem Statement

- **Matematika dianggap menakutkan/membosankan** oleh sebagian besar siswa SD di Indonesia — berdampak pada rendahnya numeracy literacy (tercermin dari skor AKM/PISA).
- **Metode latihan konvensional** (LKS, worksheet cetak) bersifat repetitif dan tidak memberikan feedback instan, sehingga motivasi belajar rendah.
- **Game edukasi matematika yang ada** umumnya bertema asing/generik (luar angkasa, hewan, karakter Barat) — kurang relevan secara budaya dan tidak menumbuhkan rasa kebanggaan lokal.
- **Banyak platform edukasi digital butuh device/koneksi tinggi**, tidak cocok untuk sekolah dengan infrastruktur terbatas (terutama luar Jawa).
- **Guru kekurangan alat bantu** yang interaktif, selaras kurikulum, dan mudah dipantau progresnya tanpa beban administratif tambahan.
- **Pendidikan karakter & cinta budaya Nusantara** seringkali berjalan terpisah dari pembelajaran akademik, padahal idealnya terintegrasi.

---

## 2. Solution

Game edukasi matematika berbasis **browser, ringan, story-driven**, dengan tema eksplorasi Nusantara:

- Setiap topik matematika (penjumlahan, pengurangan, pecahan, geometri, dst) dikemas sebagai **misi/quest** dalam dunia kerajaan Nusantara yang dipandu maskot Garuda.
- **Kesulitan adaptif** — soal menyesuaikan kemampuan siswa secara real-time, menjaga zona belajar optimal (tidak terlalu mudah/sulit).
- **Sistem reward & progresi** — badge, item budaya, unlock "kerajaan" baru — menjaga motivasi intrinsik & ekstrinsik.
- **Dashboard guru** — laporan progres per siswa/kelas, selaras kurikulum, minim beban administratif.
- **Akses gratis/freemium & ringan** — kompatibel device low-end & koneksi terbatas, cocok untuk sekolah di seluruh Indonesia.

---

## 3. User Personas

### Persona 1 — Dito (Primary Player)
| Atribut | Detail |
|---|---|
| Usia / Peran | 9 tahun, siswa kelas 4 SD |
| Tujuan | Ingin bermain game yang seru, tidak suka "belajar" yang terasa seperti tugas |
| Pain Point | Cepat bosan dengan soal latihan berulang; takut salah & dimarahi |
| Bagaimana produk membantu | Soal matematika disamarkan sebagai misi seru, kesalahan = bagian dari eksplorasi (tanpa hukuman), reward visual langsung terasa |

### Persona 2 — Bu Sari (Guru)
| Atribut | Detail |
|---|---|
| Usia / Peran | 34 tahun, guru kelas 4 SD |
| Tujuan | Variasi metode mengajar matematika, ingin tahu siswa mana yang butuh perhatian ekstra |
| Pain Point | Waktu terbatas untuk menilai/cek pekerjaan tiap siswa, butuh data cepat & jelas |
| Bagaimana produk membantu | Dashboard otomatis menampilkan progres & topik yang masih lemah per siswa, bisa langsung dipakai sebagai sesi 10-15 menit di kelas |

### Persona 3 — Pak Andi (Orang Tua)
| Atribut | Detail |
|---|---|
| Usia / Peran | 38 tahun, orang tua siswa kelas 2 SD, bekerja kantoran |
| Tujuan | Ingin anak belajar produktif saat memegang gadget di rumah |
| Pain Point | Khawatir konten game tidak aman/edukatif, sulit memantau progres belajar anak |
| Bagaimana produk membantu | Konten aman & ramah anak, laporan progres bisa diakses orang tua, sesi bermain singkat & terstruktur |

### Persona 4 — Ibu Wulan (Kepala Sekolah / Pengambil Keputusan)
| Atribut | Detail |
|---|---|
| Usia / Peran | 45 tahun, kepala sekolah SD negeri |
| Tujuan | Meningkatkan capaian numerasi sekolah, mencari solusi hemat biaya yang selaras Kurikulum Merdeka |
| Pain Point | Anggaran terbatas, perlu bukti efektivitas sebelum adopsi alat baru |
| Bagaimana produk membantu | Free tier untuk uji coba, laporan dampak pembelajaran, lisensi sekolah terjangkau |

---

## 4. Core Loop

Siklus permainan inti (per sesi/level):

```
1. Jelajah Map  →  2. Temui Tantangan Matematika (gerbang/quest)
        ↑                          ↓
6. Lanjut Eksplorasi   ←   3. Selesaikan Soal (jawab)
        ↑                          ↓
5. Dapat Reward (poin/XP)  ←  4. Feedback Instan (benar/salah + penjelasan)
```

- Pemain menjelajahi peta Nusantara → bertemu "gerbang soal" → menjawab soal matematika → mendapat feedback instan & poin → gerbang terbuka, eksplorasi lanjut.
- Durasi 1 siklus: ±30–60 detik, dirancang agar terasa cepat & memuaskan ("snackable").

---

## 5. Reward Loop

| Jangka Waktu | Reward | Tujuan |
|---|---|---|
| **Instan** (per soal) | Bintang/poin, animasi & suara "benar!", streak counter | Feedback positif langsung, memperkuat motivasi jangka pendek |
| **Per sesi** | "Keping Garuda" (mata uang dalam game), pecahan cerita baru | Mendorong menyelesaikan satu sesi penuh |
| **Per chapter/kerajaan** | Badge pencapaian, item koleksi budaya (wayang, motif batik, senjata tradisional) | Rasa pencapaian & koleksi, mendorong replay/eksplorasi ulang |
| **Jangka panjang** | Unlock kerajaan/peta baru, kustomisasi avatar, posisi leaderboard kelas | Retensi jangka panjang & kompetisi sehat antar siswa |

---

## 6. Progression Loop

```
Topik Matematika (per Capaian Pembelajaran)
        ↓
Chapter / "Kerajaan" tematik (mis. Kerajaan Sriwijaya = Pecahan)
        ↓
Level dengan kesulitan adaptif (mudah → sedang → sulit)
        ↓
Penyelesaian Chapter → Unlock Kerajaan Baru + Item Koleksi
        ↓
Profil Pemain naik level (Garuda Rank) → Akses fitur/kostumisasi baru
```

- **Progresi konten**: linear per kelas/kurikulum (kelas 1 → 6), tetapi eksplorasi map bersifat semi-terbuka agar tidak monoton.
- **Progresi kesulitan**: adaptive difficulty engine menyesuaikan tingkat soal berdasarkan akurasi & waktu jawab siswa.
- **Progresi meta**: "Garuda Rank" (level akun) membuka kostumisasi avatar, mode tantangan harian, dan akses ke leaderboard.

---

## 7. Monetization Options

| Model | Deskripsi | Target |
|---|---|---|
| **Freemium** | Chapter/kerajaan dasar (kelas 1-2) gratis selamanya; kerajaan lanjutan (kelas 3-6) berbayar one-time/subscription | Individu/orang tua |
| **B2B/B2G School License** | Lisensi tahunan per sekolah/per siswa, termasuk dashboard guru penuh & laporan kelas | Sekolah, Dinas Pendidikan |
| **Parent Subscription** | Akses penuh semua modul + laporan progres detail + latihan tambahan | Orang tua |
| **Cosmetic/Non-Pay-to-Win** | Kostum avatar, tema visual map — tidak memengaruhi gameplay/soal | Siswa (dengan persetujuan orang tua) |
| **Partnership/Grant** | Kerja sama dengan Kemendikbud, CSR korporasi, NGO pendidikan untuk distribusi gratis di daerah 3T | Non-revenue langsung, tapi mendukung adopsi & dampak sosial |

---

## 8. Risks

| Kategori | Risiko | Mitigasi Awal |
|---|---|---|
| **Teknis** | Performa di device low-end/browser lama, kebutuhan dukungan offline | Desain aset ringan (sprite 2D, audio terkompresi), progressive web app dengan caching |
| **Konten/Kurikulum** | Akurasi & keselarasan dengan Kurikulum Merdeka per jenjang | Libatkan ahli pedagogi/guru sebagai konsultan konten sejak awal |
| **Adopsi** | Resistensi sekolah/guru terhadap alat digital baru, kebutuhan pelatihan | Buat onboarding sederhana, panduan guru, free trial tanpa friksi |
| **Kompetisi Pasar** | Platform edukasi besar (Ruangguru, Quipper, dll) sudah established | Diferensiasi lewat tema budaya Nusantara & fokus niche numerasi SD |
| **Monetisasi** | Tekanan menjaga akses gratis (misi sosial) vs kebutuhan revenue | Model freemium + B2G agar sekolah kurang mampu tetap bisa akses gratis |
| **Privasi & Keamanan Anak** | Data pribadi siswa (terutama anak di bawah umur) | Kepatuhan pada regulasi perlindungan data anak, minim data collection |
| **Representasi Budaya** | Risiko penggambaran sejarah/kerajaan yang kurang akurat/sensitif | Riset & review oleh ahli sejarah/budaya sebelum rilis konten |

---

## 9. Success Metrics

| Kategori | Metrik | Target Awal (indikatif) |
|---|---|---|
| **Engagement** | DAU/MAU, rata-rata durasi sesi, retensi D1/D7/D30 | Sesi rata-rata 10-15 menit, retensi D7 ≥ 30% |
| **Learning Outcome** | Peningkatan skor pre/post-test per topik, tingkat penguasaan (mastery rate) | Peningkatan skor ≥ 20% setelah menyelesaikan 1 chapter |
| **Adopsi** | Jumlah sekolah onboarded, jumlah akun siswa aktif, penggunaan dashboard guru | 10 sekolah pilot dalam 3 bulan pertama |
| **Monetisasi** | Konversi free→premium, ARPU, renewal rate lisensi sekolah | Konversi ≥ 5% (parent subscription) |
| **Kepuasan/Virality** | NPS guru & orang tua, jumlah referral organik | NPS ≥ 40 dari guru pilot |

---

*Dokumen ini adalah output Phase 1 — Discovery, Prompt 2 (Product Canvas) untuk proyek "Legenda Garuda: Petualangan Matematika Nusantara".*
