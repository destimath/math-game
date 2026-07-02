# Checklist: Kesesuaian Implementasi vs `07-battle-engine.md`

> Dibuat dari audit implementasi backend (`backend/.../battle/`) dan frontend
> (`frontend/src/domain/rules/`, `frontend/src/application/battle/useBattleSession.ts`)
> terhadap spesifikasi di `07-battle-engine.md`. Semua item di bawah masih
> **belum sesuai** dokumen kecuali ditandai selesai.

## Backend

- [ ] `BattleService.completeBattle()` tidak menghitung ulang/validasi `xpEarned` & `kepingEarned` — hanya mempercayai nilai dari client (rawan dimanipulasi via request langsung ke `/api/battle/complete`)
- [ ] Tidak ada implementasi server-side untuk formula damage, combo, XP, kabut, boss, atau adaptive difficulty

## Damage Formula (`calculateDamage.ts`)

- [ ] `BASE_DAMAGE` = 12, seharusnya **10**
- [ ] Combo bonus 15%/stack tanpa cap, seharusnya **10%/stack dengan cap 100% (combo ≥ 10)**
- [ ] Tidak ada speed bonus (hingga +20% jika jawab cepat berdasarkan `timeRemaining/timeLimit`)
- [ ] Difficulty Multiplier (DM per tier) tidak diterapkan ke damage
- [ ] Garuda Strike (combo kelipatan 3) dikalikan ×1.5, seharusnya **+15 damage flat**

## XP Formula (`calculateXp.ts`)

- [ ] `BASE_XP` = 10, seharusnya **5**
- [ ] Combo bonus flat +2/stack, seharusnya **+5% dari base per stack (proporsional, bukan flat)**
- [ ] Difficulty Multiplier (DM per tier) tidak diterapkan ke XP

## Efek Kabut Sesaat / Bar Semangat (`useBattleSession.ts`)

- [ ] Penalty Semangat flat per difficulty (10/15/20), seharusnya **`round(8 × DM)`** (≈8/10/12)
- [ ] Tidak ada regen Semangat (+5) saat jawaban benar
- [ ] Semangat mencapai 0 memicu **Defeat / kalah** (`onDefeat` → DefeatPage) — bertentangan dengan spesifikasi eksplisit dokumen: seharusnya trigger **"Bantuan Garuda"** (auto-hint + isi ulang Semangat ke 30), **bukan game over**

## Difficulty Tier / Adaptive Engine

- [ ] Tidak ada sistem tier adaptif (Tunas / Pelajar / Cendekia) yang dihitung otomatis
- [ ] Level kesulitan saat ini dipilih manual pemain (`DifficultyModal.tsx`: Mudah/Sedang/Sulit) dan statis sepanjang battle, bukan hasil evaluasi rolling window 10 jawaban terakhir (akurasi & rasio waktu)

## Boss Encounter ("Tantangan Besar")

- [ ] Tidak ditemukan implementasi `bossTotalBar(regionIndex)`, scaling per region (+50%/region), atau pembagian 3 fase dengan tier meningkat per fase
- [ ] `BossCharacter.tsx` hanya komponen visual, belum terhubung ke logic boss multi-fase

## Combo Shield (Pusaka "Bulu Pelindung")

- [ ] Belum diverifikasi apakah item combo shield (combo tidak reset saat 1x salah) sudah diimplementasikan — perlu dicek ulang di `inventoryStore.ts`
