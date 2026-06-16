# Legenda Garuda: Petualangan Matematika Nusantara
## Game Design Document (GDD) — Phase 1: Discovery, Prompt 3

**Genre:** Educational Adventure / RPG-lite, Browser-based
**Tema:** Budaya & Sejarah Nusantara x Matematika SD
**Target Pemain:** Siswa SD kelas 1–6

---

## 1. Story

### Premis
Di balik keindahan **Nusantara Agung** — dunia yang merefleksikan kepulauan Indonesia dengan sentuhan legenda — tersimpan kekuatan kuno bernama **Aksara Angka**, yaitu pengetahuan numerik yang menjaga keseimbangan seluruh kerajaan: perdagangan, pertanian, arsitektur candi, hingga penanggalan musim.

Suatu hari, **Patih Angka Hitam**, penasihat kerajaan yang dahulu dihormati, dikuasai ambisi dan melepaskan **Kabut Kebingungan** — sebuah kutukan yang membuat penduduk lupa cara berhitung. Pasar-pasar lumpuh, candi tak bisa dibangun, kapal tersesat karena navigasi rusak, dan musim panen menjadi kacau.

**Garuda Wisanggeni**, burung mitologi penjaga kebijaksanaan Nusantara, terbangun dari tidur panjangnya dan memilih seorang anak — **Sang Penjelajah** (avatar pemain) — untuk mengembara dari satu kerajaan ke kerajaan lain, mengumpulkan kembali **Prasasti Bilangan** yang hilang, memulihkan ingatan numerik setiap kerajaan, dan akhirnya menghadapi Patih Angka Hitam di **Istana Garuda** di puncak Semeru.

### Struktur Narasi
- **Babak 1 (Fase A — Kelas 1-2):** Pengenalan dunia, kerajaan-kerajaan kecil di pesisir, fokus operasi dasar (penjumlahan/pengurangan).
- **Babak 2 (Fase B — Kelas 3-4):** Penjelajahan ke kerajaan besar pedalaman, perkalian/pembagian & pecahan, Kabut mulai menyebar lebih luas.
- **Babak 3 (Fase C — Kelas 5-6):** Konfrontasi akhir, topik lanjutan (geometri, pengukuran, data), klimaks di Istana Garuda.

Setiap chapter ditutup dengan **animasi cutscene ringan** (gaya ilustrasi 2D bergerak/parallax) yang memajukan cerita.

---

## 2. World — "Nusantara Agung"

Peta dunia berupa **gugusan pulau interaktif**, masing-masing merepresentasikan kerajaan/wilayah dengan tema matematika spesifik:

| Wilayah | Inspirasi Budaya | Tema Matematika | Fase Kurikulum |
|---|---|---|---|
| **Kerajaan Bahari Selat** | Sriwijaya, pelabuhan dagang Sumatra | Penjumlahan & Pengurangan | Fase A (Kls 1-2) |
| **Lembah Padi Mataram** | Kerajaan agraris Jawa | Perkalian & Pembagian | Fase B (Kls 3) |
| **Kepulauan Rempah Maluku** | Jalur rempah, navigasi laut | Pecahan & Desimal | Fase B (Kls 4) |
| **Dataran Candi Mataram Kuno** | Candi Borobudur/Prambanan | Geometri & Bangun Ruang | Fase C (Kls 5) |
| **Tanah Tinggi Toraja-Papua** | Pola ukir, kalender adat | Pengukuran, Waktu & Data | Fase C (Kls 6) |
| **Istana Garuda (Puncak Semeru)** | Klimaks — gabungan seluruh budaya Nusantara | Semua topik (final) | Final Boss |

Setiap wilayah memiliki **hub desa** (tempat NPC, toko kosmetik, papan misi) dan beberapa **zona stage** yang dibuka secara berurutan.

---

## 3. Characters

### Sang Penjelajah (Player Avatar)
- Karakter dapat dikustomisasi (gender, warna, pakaian adat) seiring progres.
- Tidak memiliki dialog suara — direpresentasikan lewat ekspresi & pilihan respons sederhana.

### Garuda Wisanggeni (Mentor/Companion)
- Burung emas raksasa, pemandu utama, memberi instruksi, hint, dan narasi.
- Tumbuh secara visual (bulu makin bersinar) seiring progres pemain — representasi simbolis dari "tumbuhnya kebijaksanaan".

### Penjaga Kerajaan (Regional Guides)
NPC lokal di setiap wilayah yang mengajarkan konsep matematika melalui dialog naratif sebelum stage dimulai:
- **Nakhoda Wira** (Kerajaan Bahari Selat) — pedagang/nakhoda, mengajarkan penjumlahan/pengurangan lewat transaksi barang.
- **Mpu Tantra** (Lembah Padi Mataram) — petani-cendekiawan, mengajarkan perkalian/pembagian lewat pembagian hasil panen.
- **Putri Cengkih** (Kepulauan Rempah Maluku) — pedagang rempah, mengajarkan pecahan lewat pembagian rempah ke kapal-kapal.
- **Arsitek Wastu** (Dataran Candi) — pembangun candi, mengajarkan geometri lewat desain candi & ornamen.
- **Tetua Rasi** (Tanah Tinggi Toraja-Papua) — penjaga kalender adat, mengajarkan pengukuran waktu & data lewat pola musim/ukiran.

### Companion Collectibles
Hewan-hewan khas Nusantara (komodo kecil, burung cendrawasih, anoa) yang bisa dikumpulkan sebagai partner kosmetik — memberi dialog ringan/dorongan semangat.

---

## 4. Villains

### Patih Angka Hitam (Main Antagonist)
- Dahulu penasihat kerajaan yang menyusun sistem hitung Nusantara, kini terobsesi membuktikan bahwa "angka adalah miliknya sendiri" dan menyembunyikannya dari rakyat.
- Visual: sosok berjubah gelap dengan motif aksara yang "rusak"/terbalik.
- Tidak digambarkan sebagai jahat secara mengerikan — lebih ke **sosok tersesat** yang di akhir cerita "disembuhkan" (bukan dikalahkan secara permanen), selaras nilai pendidikan karakter (non-violent resolution).

### Pasukan Kabut (Fog Minions) — representasi miskonsepsi matematika
Setiap minion adalah personifikasi lucu dari kesalahan umum siswa, muncul sebagai mini-boss di tiap wilayah:

| Minion | Miskonsepsi yang Direpresentasikan | Wilayah |
|---|---|---|
| **Si Tukar Posisi** | Kesalahan urutan pengurangan (a-b ≠ b-a) | Kerajaan Bahari Selat |
| **Si Lupa Sisa** | Lupa sisa pada pembagian | Lembah Padi Mataram |
| **Si Penyebut Liar** | Kesalahan penyamaan penyebut pecahan | Kepulauan Rempah Maluku |
| **Si Sudut Bengkok** | Kesalahan pengukuran sudut/bentuk | Dataran Candi |
| **Si Satuan Tertukar** | Kesalahan konversi satuan & waktu | Tanah Tinggi Toraja-Papua |

Mengalahkan minion = "menyembuhkan" miskonsepsi (visual: kabut berubah jadi cahaya), bukan menghancurkan.

---

## 5. Artifacts

| Artifact | Fungsi Gameplay | Fungsi Naratif |
|---|---|---|
| **Prasasti Bilangan** | Item utama tiap chapter; mengumpulkan semua = membuka boss kerajaan | Memulihkan "ingatan numerik" kerajaan |
| **Pusaka Garuda** | Power-up: "Bulu Waktu" (+15 detik), "Bulu Petunjuk" (hint jawaban), "Bulu Pelindung" (1x maaf jawaban salah) | Hadiah dari Garuda Wisanggeni sebagai bekal perjalanan |
| **Koleksi Budaya** | Kosmetik avatar/companion (motif batik, wayang mini, alat musik tradisional) | Hadiah eksplorasi, mendorong "100% completion" |
| **Peta Kuno** | Membuka jalur tersembunyi/side-quest | Lore tambahan tentang sejarah kerajaan |

---

## 6. Battle System — "Duel Angka" (Number Duel)

Sistem "battle" sepenuhnya berbasis penyelesaian soal matematika, dikemas sebagai duel ringan tanpa kekerasan:

1. **Tampilan**: Pemain vs. Minion Kabut, masing-masing memiliki "Bilah Kejernihan" (Clarity Bar) — analog HP.
2. **Mekanik Inti**:
   - Soal matematika muncul dengan batas waktu (disesuaikan tingkat kesulitan).
   - **Jawaban benar** → mengurangi Bilah Kejernihan musuh ("serangan kebijaksanaan").
   - **Jawaban salah** → tidak ada damage ke pemain, namun mengurangi sedikit "Momentum" (combo).
   - **Combo/Streak**: 3 jawaban benar berturut-turut memicu "Serangan Garuda" (damage besar + animasi spesial).
3. **Tanpa Penalti Keras**: Tidak ada "game over"/nyawa habis — pemain dapat mengulang soal hingga benar, menjaga semangat *growth mindset*.
4. **Bantuan Garuda**: pemain dapat menggunakan Pusaka untuk hint/tambahan waktu, dengan sedikit pengurangan reward akhir (mendorong kemandirian tanpa menghukum).

---

## 7. Progression

### Progresi Konten (Linear + Eksplorasi)
- Wilayah dibuka berurutan sesuai jenjang kelas, namun setiap wilayah memiliki beberapa stage opsional (side-quest) yang dapat dieksplorasi bebas.

### Progresi Karakter — "Garuda Rank"
- XP diperoleh dari menyelesaikan Duel Angka, side-quest, dan pencapaian.
- Naik rank membuka: slot kostum baru, companion baru, dan akses ke "Tantangan Harian".

### Pohon Kebijaksanaan (Wisdom Tree)
Skill tree ringan berbasis Pusaka yang dikumpulkan:
- Cabang **Ketelitian**: memperpanjang waktu duel.
- Cabang **Eksplorasi**: mempercepat regenerasi hint.
- Cabang **Budaya**: membuka lore/cutscene tambahan.

---

## 8. Levels

### Struktur Hierarki
```
World Map (Nusantara Agung)
 └─ Wilayah/Kerajaan (Chapter) — 6 total
     └─ Hub Desa (NPC, toko, papan misi)
     └─ Stage (8-10 per wilayah)
         ├─ Stage Naratif (dialog + lore, tanpa soal)
         ├─ Stage Duel Reguler (5-6 stage, soal sesuai topik)
         ├─ Stage Mini-Boss (1x, melawan Minion Kabut)
         └─ Stage Boss Kerajaan (1x, di akhir chapter)
```

### Tipe Stage
| Tipe | Deskripsi |
|---|---|
| **Eksplorasi** | Pemain berjalan di peta, berinteraksi dengan NPC/objek, memicu dialog |
| **Duel Angka** | Soal matematika dengan format battle (lihat Section 6) |
| **Puzzle Logika** | Teka-teki non-duel (mis. menyusun pola, mencocokkan pecahan dengan gambar) |
| **Koleksi** | Mencari item tersembunyi di peta sebagai side-quest |

---

## 9. Achievements

| Kategori | Contoh Achievement | Kriteria |
|---|---|---|
| **Cerita (Story)** | "Penakluk Bahari Selat" | Menyelesaikan chapter 1 |
| **Penguasaan (Mastery)** | "Ahli Pecahan" | Skor sempurna di seluruh stage pecahan |
| **Eksplorasi** | "Kolektor Pusaka" | Mengumpulkan semua artifact di 1 wilayah |
| **Kecepatan** | "Kilat Garuda" | Menyelesaikan Duel Angka dalam waktu rekor |
| **Konsistensi** | "Tanpa Cela" | 10 jawaban benar berturut-turut |
| **Sosial (kelas)** | "Bintang Kelas" | Masuk top 3 leaderboard kelas mingguan |

---

## 10. Rewards

| Jenis Reward | Sumber | Penggunaan |
|---|---|---|
| **Keping Garuda** (currency) | Menyelesaikan stage, achievement | Membeli kosmetik di toko hub desa |
| **Pusaka Garuda** | Hadiah chapter, achievement tertentu | Power-up dalam Duel Angka |
| **Kostum & Aksesori Budaya** | Toko (Keping Garuda) / achievement eksklusif | Kustomisasi avatar (non-pay-to-win) |
| **Companion Baru** | Side-quest koleksi | Partner kosmetik dengan dialog ringan |
| **Sertifikat Digital** (opsional, untuk sekolah) | Menyelesaikan chapter/fase | Dapat dicetak guru sebagai penghargaan kelas |

---

## 11. Boss Battles

### Boss Kerajaan (5x — satu per wilayah, sebelum final)
- Setiap boss adalah **versi "raksasa" dari Minion Kabut** wilayah tersebut, dengan **multi-phase Duel Angka**:
  - **Fase 1**: Soal dasar sesuai topik wilayah.
  - **Fase 2**: Soal kombinasi (topik wilayah + topik sebelumnya) — menguji retensi.
  - **Fase 3**: "Soal Cerita" (word problem) bertema budaya wilayah tersebut sebagai puncak duel.
- Kemenangan memicu **cutscene pemulihan** — kabut di wilayah tersebut menghilang, prasasti bersinar kembali.

### Final Boss — Patih Angka Hitam (Istana Garuda)
- Battle 3-babak yang menggabungkan **seluruh topik matematika dari Fase A-C** secara acak adaptif.
- Babak terakhir bukan "mengalahkan" tapi **"menyadarkan"** — pemain menyelesaikan satu soal kolaboratif besar yang merepresentasikan "menyatukan kembali Aksara Angka", memicu transformasi Patih Angka Hitam kembali ke wujud aslinya (resolusi damai, sesuai nilai pendidikan karakter).

---

## 12. Difficulty System

### Adaptive Difficulty Engine
- Sistem memantau **akurasi** dan **waktu jawab** pemain secara real-time per topik.
- 3 tingkatan dinamis:
  - **Tunas** (dasar) — soal dengan angka kecil, waktu lebih panjang.
  - **Pelajar** (menengah) — variasi soal lebih kompleks, waktu standar.
  - **Cendekia** (mahir) — soal kombinasi/word problem, waktu lebih singkat.
- Pemain naik/turun tingkat secara halus (tidak terlihat eksplisit sebagai "kamu turun level") untuk menjaga rasa percaya diri.

### Mode Tambahan
- **Mode Guru**: Guru dapat mengunci tingkat kesulitan/topik tertentu sesuai rencana pembelajaran kelas.
- **Mode Latihan Bebas**: tanpa batas waktu, untuk siswa yang butuh lebih banyak waktu proses.

---

## 13. Educational Objectives

Selaras dengan **Capaian Pembelajaran (CP) Matematika — Kurikulum Merdeka**:

| Fase | Kelas | Topik Utama | Wilayah Terkait |
|---|---|---|---|
| **Fase A** | 1-2 | Bilangan, penjumlahan & pengurangan dasar, pengenalan bentuk | Kerajaan Bahari Selat |
| **Fase B** | 3-4 | Perkalian, pembagian, pecahan sederhana, pengukuran dasar | Lembah Padi Mataram, Kepulauan Rempah Maluku |
| **Fase C** | 5-6 | Pecahan/desimal lanjutan, geometri, pengukuran, data & statistika dasar | Dataran Candi, Tanah Tinggi Toraja-Papua |

### Tujuan Lintas-Topik
- **Numerasi (AKM)**: penalaran kuantitatif, interpretasi data/grafik sederhana.
- **Problem Solving**: soal cerita kontekstual budaya melatih kemampuan menerjemahkan masalah nyata ke operasi matematika.
- **Computational Thinking**: pengenalan pola (pattern recognition) lewat motif budaya (batik, ukiran).
- **Pendidikan Karakter**: *growth mindset* (kesalahan = bagian belajar, tanpa hukuman), kebanggaan identitas Nusantara, gotong royong (fitur kompetisi kelas yang sehat).

---

*Dokumen ini adalah output Phase 1 — Discovery, Prompt 3 (Game Design Document) untuk proyek "Legenda Garuda: Petualangan Matematika Nusantara".*
