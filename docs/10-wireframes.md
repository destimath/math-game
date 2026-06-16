# Legenda Garuda: Petualangan Matematika Nusantara
## UI Wireframes & Design System — Phase 1: Discovery, Prompt 10

**Acting as**: Senior Game UI Designer
**Style Direction**: *Duolingo* (ramah, progress-driven, mascot-centric) x *Brawl Stars* (bold, colorful, chunky cards/buttons) x **Motif Budaya Nusantara** (batik, wayang, ukiran sebagai aksen, bukan dominasi).

---

## 0. Design System Notes

| Aspek | Pedoman |
|---|---|
| **Palet Warna Utama** | Emas/Terracotta (#E8A33D), Biru Laut Dalam (#1B4D6B), Hijau Daun (#4CAF7D) untuk aksi positif, Merah-Oranye Batik (#E25822) untuk highlight/CTA |
| **Tipografi** | Sans-serif bulat & tebal (gaya Duolingo: "Feather Bold"/"Baloo"-like) — angka besar & jelas untuk soal matematika |
| **Bentuk Komponen** | Card rounded-corner (radius 16-24px), tombol chunky dengan shadow drop 3D ala Brawl Stars |
| **Aksen Budaya** | Border tipis bermotif batik/ukiran pada card & frame, ikon bulu Garuda untuk currency/Pusaka, siluet wayang pada background layar loading |
| **Portrait Karakter** | Frame lingkaran/hexagon dengan ring warna sesuai elemen/rarity (gaya Brawl Stars) |
| **Progress Bar** | Bar tebal dengan ujung membulat, warna isi gradient emas→hijau saat penuh, ikon bintang di milestone |
| **Animasi** | Squash & stretch pada tombol saat ditekan, partikel confetti bermotif batik saat reward, karakter melompat/bertepuk saat sukses |
| **Audio Cue** | Bunyi "pop" ceria saat tap, jingle pendek gamelan saat reward/level up |

---

## 1. Home Screen

### Wireframe
```
┌─────────────────────────────────────────────┐
│ [👧Sari] Lv.7  XP ███████░░░  |  🪶1,250     │ ← Status bar
├─────────────────────────────────────────────┤
│ 🔥 Streak 4 hari      [🎁 Klaim Hadiah!]     │ ← Daily reward banner
├─────────────────────────────────────────────┤
│ ┌───────────────────────────────────────┐   │
│ │  🌾  LEMBAH PADI MATARAM (Java)        │   │ ← Region card aktif
│ │  Progres: ███████░░░ 7/10              │   │   (ilustrasi region,
│ │                                         │   │    motif batik border)
│ │        [   ▶ AYO LANJUT!   ]           │   │
│ └───────────────────────────────────────┘   │
│                                               │
│  MISI HARIAN                                 │
│ ┌───────────────────────────────────────┐   │
│ │ ✅ Selesaikan 5 Tantangan Angka         │   │
│ │ ⬜ Bantu 1 Sosok Kabut Tersesat          │   │
│ │ ⬜ Kumpulkan 10 Keping Garuda            │   │
│ └───────────────────────────────────────┘   │
│                                               │
│  SAHABAT GARUDA                              │
│ ┌────┐┌────┐┌────┐┌────┐┌────┐               │
│ │Sari││Bayu││Made││Tiwi││Rian│ ← portrait hex │
│ │ ★  ││    ││    ││    ││    │   ring = aktif│
│ └────┘└────┘└────┘└────┘└────┘               │
├─────────────────────────────────────────────┤
│  🗺️Map   👤Profil   🎒Tas   🏆LB   ⚙️Atur    │ ← Bottom nav (5 ikon)
└─────────────────────────────────────────────┘
```

### Component Descriptions
- **Status Bar**: Portrait bulat Sari (karakter aktif) dengan ring emas, label Level + bar XP gradient kuning→hijau, counter "Keping Garuda" dengan ikon bulu emas kecil.
- **Daily Reward Banner**: Pita horizontal warna terracotta dengan ikon api streak; tombol "Klaim Hadiah!" berdenyut (pulse animation) jika tersedia.
- **Region Card Aktif**: Card besar full-width, ilustrasi region (sawah & candi untuk Java), progress bar Prasasti, border tipis ukiran candi. Tombol CTA hijau besar "AYO LANJUT!" dengan shadow 3D.
- **Misi Harian**: List 3 item dengan checkbox bulat; item selesai = centang hijau + strikethrough ringan, animasi confetti kecil saat checklist baru tercapai.
- **Sahabat Garuda Strip**: 5 portrait karakter dalam frame hexagon, karakter aktif memiliki ring emas + bintang kecil di pojok. Tap untuk membuka quick-switch popup.
- **Bottom Nav**: 5 ikon flat dengan label, ikon aktif berwarna terracotta dan sedikit membesar (scale 1.1).

---

## 2. World Map

### Wireframe
```
┌─────────────────────────────────────────────┐
│ ←        NUSANTARA AGUNG          🪶1,250    │
├─────────────────────────────────────────────┤
│                                               │
│              🏯 ISTANA GARUDA                │
│                  🔒 (4/7 Prasasti)           │
│                     │                        │
│           🦜 PAPUA ●  ⭐⭐☆  (sedang dimainkan)│
│                     │                        │
│           🏰 MALUKU 🔒 ┄┄ tooltip: ┐         │
│                     │   "Selesaikan Sulawesi"│
│           ⛵ SULAWESI 🔒                      │
│                     │                        │
│           🛕 BALI ✅ ⭐⭐⭐                    │
│                     │                        │
│           🌾 JAVA ✅ ⭐⭐⭐                    │
│                     │                        │
│           🌳 KALIMANTAN ✅ ⭐⭐☆               │
│                     │                        │
│           ⛵ SUMATRA ✅ ⭐⭐⭐ (Awal)           │
│                                               │
├─────────────────────────────────────────────┤
│  [👧 Sari] sedang berdiri di node "Papua"    │
└─────────────────────────────────────────────┘
```

### Component Descriptions
- **Map Path**: Jalur melengkung vertikal (scrollable) menghubungkan 7 node region + Istana Garuda di puncak — gaya "trophy road" Brawl Stars/Candy Crush.
- **Node Region**: Ikon bulat besar bertema region (perahu=Sumatra, pohon=Kalimantan, padi=Java, pura=Bali, layar=Sulawesi, benteng=Maluku, burung=Papua), dikelilingi ring:
  - **Hijau solid** = completed (+ 1-3 bintang berdasarkan performa)
  - **Emas berkedip** = unlocked, belum selesai (node aktif saat ini)
  - **Abu-abu + 🔒** = locked, tap menampilkan tooltip syarat unlock
- **Avatar Pemain**: Sprite Sahabat Garuda aktif berdiri/berjalan di node terbaru, dengan animasi idle ringan (melambai).
- **Tooltip Locked**: Bubble putih dengan ekor mengarah ke node, border motif batik tipis, teks singkat syarat unlock.
- **Top Bar**: Tombol back kiri, judul "Nusantara Agung" di tengah, counter Keping Garuda kanan.
- **Background**: Ilustrasi peta bergaya watercolor dengan elemen awan/ombak animasi parallax ringan saat scroll.

---

## 3. Battle Screen (Tantangan Angka)

### Wireframe
```
┌─────────────────────────────────────────────┐
│ ⏸               TANTANGAN ANGKA      ⏱ 12   │
├─────────────────────────────────────────────┤
│                                               │
│        👻 SI LUPA SISA                       │
│        Bar Kebingungan ████████░░ 80%        │
│              (animasi kabut bergoyang)       │
│                                               │
├─────────────────────────────────────────────┤
│   ┌───────────────────────────────────┐     │
│   │        24  ÷  5  = ?  (sisa)       │     │ ← Soal card besar
│   └───────────────────────────────────┘     │
│                                               │
│   ┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐    │
│   │   3   │ │   4   │ │   5   │ │   6   │    │ ← Jawaban 2x2 grid
│   └───────┘ └───────┘ └───────┘ └───────┘    │
│                                               │
├─────────────────────────────────────────────┤
│ [😀Bayu] Semangat ████████░░  Combo x3 🔥    │
│ [🪶x2 Bulu Waktu] [💡x5 Bulu Petunjuk]        │ ← Pusaka quick-bar
└─────────────────────────────────────────────┘
```

### Component Descriptions
- **Top Bar**: Tombol pause kiri (memicu konfirmasi keluar), label "Tantangan Angka", timer berbentuk **ring melingkar** di kanan yang mengecil seiring waktu (gaya Duolingo lesson timer), warna ring berubah hijau→kuning→merah saat mendekati 0.
- **Sosok Kabut**: Ilustrasi karakter ramah-lucu (bukan menyeramkan) dengan animasi idle bergoyang. **Bar Kebingungan** = bar horizontal tebal bertekstur kabut, berkurang dengan animasi "menguap" saat jawaban benar.
- **Soal Card**: Card putih besar di tengah, angka soal berukuran besar (font tebal bulat), bisa berisi elemen visual tambahan (gambar buah/objek untuk kelas rendah).
- **Opsi Jawaban**: 4 tombol besar grid 2x2, warna netral (putih/krem) → berubah **hijau + ikon ✅ + animasi "pop"** jika benar, atau **kuning lembut + ikon 🔁** (bukan merah/X tajam) jika kurang tepat, lalu otomatis kembali ke soal.
- **Bottom Bar**: Portrait karakter aktif (Bayu) dengan **Bar Semangat** (gradient biru→ungu, ikon bulu kecil di ujung), counter **Combo** dengan ikon api yang membesar tiap kelipatan combo, dan **Pusaka quick-bar** (2 ikon item dengan badge jumlah).
- **Efek Khusus**:
  - Combo kelipatan 3 → layar berkilau emas + teks besar "Serangan Garuda!" muncul sebentar.
  - Jawaban salah → partikel kabut tipis menyelimuti tepi layar sejenak (Efek Kabut Sesaat), Bar Semangat berkurang sedikit dengan animasi halus.

---

## 4. Victory Screen (Layar Kemenangan / Rewards)

### Wireframe
```
┌─────────────────────────────────────────────┐
│                                               │
│        🎉✨   HOREE!   ✨🎉                  │
│                                               │
│      [👧Sari]   [👦Bayu]                      │
│      (animasi lompat & tepuk tangan)         │
│                                               │
│       "Sahabat Garuda Hebat!"                │
│                                               │
│  ┌─────────────────────────────────────┐    │
│  │ ⭐ +50 XP    Lv.7 ████████░░ Lv.8     │    │
│  │ 🪶 +30 Keping Garuda                  │    │
│  │ 🎁 +1 Pusaka "Bulu Waktu"             │    │
│  │ 🏅 Achievement Baru: "Ahli Sisa"      │    │
│  └─────────────────────────────────────┘    │
│                                               │
│           [   ▶ LANJUTKAN   ]                │
└─────────────────────────────────────────────┘
```

### Component Descriptions
- **Header Animasi**: Teks "HOREE!" muncul dengan efek bounce-in, dikelilingi partikel confetti bermotif batik kecil (segitiga/garis emas-merah).
- **Karakter Selebrasi**: 1-2 anggota Sahabat Garuda (sesuai yang aktif/relevan) muncul dengan animasi lompat/tepuk tangan + voice line ("Yay! Hebat sekali!").
- **Reward Card**: Card vertikal berisi list reward, masing-masing baris muncul berurutan (staggered fade-in + slide-up) dengan suara "ting":
  - **XP**: progress bar level yang terisi dengan animasi, jika penuh → trigger animasi "Level Up!" tambahan.
  - **Keping Garuda**: ikon bulu emas + angka bertambah dengan count-up animation.
  - **Item Pusaka**: ikon item + nama, badge "+1".
  - **Achievement**: pita emas dengan ikon medali, judul achievement.
- **Tombol Lanjutkan**: Tombol besar hijau di bawah, full-width, muncul setelah semua reward card selesai dianimasikan (delay ~1.5s agar anak sempat membaca).

---

## 5. Inventory

### Wireframe
```
┌─────────────────────────────────────────────┐
│ ←            TAS SAHABAT GARUDA   🪶1,250    │
├─────────────────────────────────────────────┤
│ [🪶Pusaka] [👕Kostum] [🏺Koleksi] [🐾Teman]  │ ← Tab selector
├─────────────────────────────────────────────┤
│ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐      │
│ │ 🪶  │ │ 💡  │ │ 🛡️  │ │     │ │     │      │
│ │ x3  │ │ x5  │ │ x1  │ │     │ │     │      │ ← Grid item 5 kolom
│ │Waktu│ │Tunjk│ │Lindg│ │     │ │     │      │
│ └─────┘ └─────┘ └─────┘ └─────┘ └─────┘      │
│                                               │
│ ┌───────────────────────────────────────┐   │
│ │ 🪶 Bulu Waktu (x3)                     │   │
│ │ "Tambah 15 detik saat Tantangan Angka. │   │ ← Detail panel
│ │  Hadiah dari Garuda Wisanggeni."        │   │
│ │                                         │   │
│ │            [   GUNAKAN   ]             │   │
│ └───────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
```

### Component Descriptions
- **Tab Selector**: 4 tab dengan ikon + label, tab aktif memiliki underline emas tebal dan background sedikit terangkat (elevation).
- **Grid Item**: Card kecil rounded, ikon item besar di tengah, badge jumlah (x3) di pojok kanan bawah. Item terkunci/belum dimiliki ditampilkan abu-abu transparan dengan ikon 🔒.
- **Tab Kostum**: Item yang sedang dipakai memiliki ring emas di sekeliling card + label "Dipakai".
- **Tab Companion**: Card menampilkan sprite hewan companion dengan animasi idle kecil; tombol "Jadikan Teman Aktif" di detail panel.
- **Detail Panel**: Muncul di bawah grid saat item ditap, slide-up animation, berisi ikon besar, nama, deskripsi singkat (1-2 kalimat ramah anak), dan tombol aksi kontekstual (Gunakan / Pakai / Lepas / Jadikan Aktif).
- **Empty Slot**: Slot kosong ditampilkan sebagai outline putus-putus dengan ikon "?" — mendorong eksplorasi untuk mengisinya.

---

## 6. Teacher Dashboard

### Wireframe (Desktop/Web Layout)
```
┌────────────────────────────────────────────────────────────────────┐
│ 🦅 Legenda Garuda — Dashboard Guru     Kelas: 4A     [Bu Sari ▾]    │
├───────────────┬──────────────────────────────────────────────────┤
│ 📊 Ringkasan   │  PENGUASAAN TOPIK — KELAS 4A                       │
│ 👥 Siswa       │  Pecahan        ████████░░ 78%                    │
│ 📈 Laporan     │  Operasi Camp.  ██████░░░░ 60%                     │
│ ⚙️ Mode Guru   │  Pengukuran     ███░░░░░░░ 32%  ⚠️ perlu perhatian │
│                │                                                    │
│                │  DAFTAR SISWA                    🔍 [cari siswa]   │
│                │ ┌────────────────────────────────────────────────┐│
│                │ │ Nama   │ Region │ Progres        │ Topik Lemah  ││
│                │ │────────┼────────┼─────────────────┼─────────────││
│                │ │ Dito   │ Bali   │ ███████░ 70%   │ Pengukuran   ││
│                │ │ Sinta  │ Bali   │ █████░░░ 50%   │ Pecahan      ││
│                │ │ Andi   │ Java   │ █████████ 95%  │ -            ││
│                │ └────────────────────────────────────────────────┘│
│                │                                                    │
│                │  [ 📄 Unduh Laporan Mingguan ]  [ 🏅 Beri Badge ]  │
└───────────────┴──────────────────────────────────────────────────┘
```

### Component Descriptions
- **Top Bar**: Logo & nama produk kiri, selector kelas tengah (dropdown jika guru pegang >1 kelas), profil guru kanan dengan dropdown (Settings/Logout).
- **Sidebar Navigasi**: Ikon + label vertikal (Ringkasan, Siswa, Laporan, Mode Guru), item aktif memiliki background terracotta muda + border kiri emas.
- **Panel Penguasaan Topik**: Horizontal bar chart per topik kurikulum, warna bar berubah (hijau/kuning/merah) berdasarkan persentase, label "⚠️ perlu perhatian" muncul otomatis untuk topik < 40%.
- **Tabel Siswa**: Tabel dengan kolom Nama, Region terakhir, Progress bar, Topik Lemah (badge merah muda jika ada). Baris dapat diklik untuk membuka detail siswa (modal/side panel).
- **Search Bar**: Input pencarian nama siswa di atas tabel, real-time filter.
- **Action Buttons**: Tombol sekunder (outline style) "Unduh Laporan Mingguan" (generate PDF) dan "Beri Badge" (kirim apresiasi ke siswa terpilih) — keduanya di bawah tabel, full-width pada layar kecil.
- **Mode Guru Panel** (di tab terpisah): Daftar topik dengan toggle "Wajibkan untuk kelas ini" + dropdown tier kesulitan (Tunas/Pelajar/Cendekia) per topik.
- **Aksen Visual**: Lebih minim elemen "game" dibanding screen siswa — palet lebih netral (putih/abu muda + aksen terracotta/emas tipis), tipografi lebih standar/profesional namun tetap rounded agar konsisten dengan brand.

---

*Dokumen ini adalah output Phase 1 — Discovery, Prompt 10 (UI Wireframes & Design System) untuk proyek "Legenda Garuda: Petualangan Matematika Nusantara".*
