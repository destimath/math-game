# Legenda Garuda: Petualangan Matematika Nusantara
## Battle Engine — "Tantangan Angka" Design — Phase 1: Discovery, Prompt 7

> **Catatan istilah** (selaras Prompt 5): "Damage" → pengurangan **Bar Kebingungan** musuh ("Sosok Kabut"). "Counterattack" → **Efek Kabut Sesaat** yang mengurangi **Bar Semangat** pemain (bukan nyawa/HP — tidak ada game over). Saat Bar Semangat mencapai 0, sistem memicu **Bantuan Garuda** (auto-hint + isi ulang sebagian Semangat), bukan "kalah". Seluruh rumus di bawah tetap memenuhi struktur yang diminta (damage, combo, counterattack, XP, boss, difficulty scaling) dengan bahasa & konsekuensi yang ramah anak.

---

## 1. Core Stats

| Stat | Deskripsi | Nilai Awal |
|---|---|---|
| **Bar Kebingungan** (musuh) | Analog HP "Sosok Kabut" — berkurang saat jawaban benar | tergantung tipe musuh/boss |
| **Bar Semangat** (pemain) | Analog fokus/energi — berkurang sedikit saat jawaban salah, regen saat benar | 100 |
| **Combo** | Counter jawaban benar berurutan | 0 |
| **Difficulty Tier** | Tunas / Pelajar / Cendekia | adaptif |

```
DifficultyMultiplier (DM):
    Tunas    = 1.0
    Pelajar  = 1.2
    Cendekia = 1.5
```

---

## 2. Damage Formula

Jawaban benar → mengurangi Bar Kebingungan musuh.

```
BASE_DAMAGE      = 10
COMBO_STEP       = 0.10   // +10% per stack combo
COMBO_CAP        = 1.00   // maksimum +100% (combo >= 10)
SPEED_BONUS_MAX  = 0.20   // hingga +20% jika jawab cepat

function calculateDamage(combo, tier, timeRemaining, timeLimit):
    comboMultiplier = min(combo * COMBO_STEP, COMBO_CAP)
    speedRatio      = clamp(timeRemaining / timeLimit, 0, 1)
    speedBonus      = speedRatio * SPEED_BONUS_MAX
    DM              = DifficultyMultiplier[tier]

    damage = BASE_DAMAGE * (1 + comboMultiplier + speedBonus) * DM
    return round(damage)
```

**Contoh**: combo=5, tier=Pelajar (1.2), sisa waktu 70% dari limit
→ comboMultiplier=0.5, speedBonus=0.14
→ damage = 10 * (1 + 0.5 + 0.14) * 1.2 ≈ **20**

---

## 3. Combo Formula

```
COMBO_BURST_INTERVAL = 3   // setiap 3 combo berturut → Serangan Garuda
BURST_BONUS_DAMAGE   = 15  // damage tambahan flat saat burst

function onCorrectAnswer(state):
    state.combo += 1
    damage = calculateDamage(state.combo, state.tier,
                              state.timeRemaining, state.timeLimit)

    if state.combo % COMBO_BURST_INTERVAL == 0:
        damage += BURST_BONUS_DAMAGE
        triggerEffect("Serangan Garuda")   // animasi spesial
        playVoiceLine(random("Wow, hebat banget!", "Keren!"))

    applyDamageToEnemy(damage)
    regenSemangat(state)
    return damage

function onWrongAnswer(state):
    state.combo = 0   // "Lose combo"
    applyKabutEffect(state)
    playVoiceLine(random("Hampir! Yuk coba lagi~", "Belum tepat, ayo coba lagi!"))
```

> **Combo Shield**: jika pemain memegang Pusaka "Bulu Pelindung", combo TIDAK reset pada 1x jawaban salah (item terpakai otomatis).

---

## 4. "Efek Kabut Sesaat" (Counterattack) Formula

Jawaban salah → Bar Semangat pemain berkurang sedikit (bukan damage ke "nyawa").

```
BASE_KABUT      = 8
MAX_SEMANGAT    = 100
SEMANGAT_REGEN  = 5    // regen tiap jawaban benar

function calculateKabutEffect(tier):
    DM = DifficultyMultiplier[tier]
    return round(BASE_KABUT * DM)

function applyKabutEffect(state):
    kabut = calculateKabutEffect(state.tier)
    state.semangat = max(0, state.semangat - kabut)

    if state.semangat == 0:
        triggerBantuanGaruda(state)  // bukan game over

function regenSemangat(state):
    state.semangat = min(MAX_SEMANGAT, state.semangat + SEMANGAT_REGEN)

function triggerBantuanGaruda(state):
    // Auto-hint: highlight 1 opsi/petunjuk langkah
    showHint(state.currentQuestion)
    // Isi ulang sebagian agar tetap nyaman
    state.semangat = 30
    playVoiceLine("Tenang, Garuda bantu kamu ya~")
```

---

## 5. XP Formula

```
BASE_XP        = 5
XP_COMBO_STEP  = 0.05   // +5% XP per stack combo (lebih kecil dari damage bonus)

function calculateXP(combo, tier):
    DM = DifficultyMultiplier[tier]
    comboBonus = combo * XP_COMBO_STEP
    xp = BASE_XP * DM * (1 + comboBonus)
    return round(xp)

function xpToNextLevel(level):
    return 100 + (level - 1) * 50   // pertumbuhan linear, mudah diprediksi

function onLevelUp(state):
    state.level += 1
    state.semangatMax += 5          // hadiah kecil: kapasitas Semangat naik
    unlockRewardsForLevel(state.level)
```

---

## 6. Boss Formula ("Tantangan Besar")

```
BASE_BOSS_BAR       = 300
REGION_SCALING_STEP = 0.5   // +50% per region berikutnya
PHASE_COUNT         = 3
PhaseTierOverride   = [Tunas/sesuai region, +1 tier, +1 tier]  // fase 3 = paling menantang

function bossTotalBar(regionIndex):           // regionIndex: 1..7
    return BASE_BOSS_BAR * (1 + REGION_SCALING_STEP * (regionIndex - 1))

function bossPhaseBar(regionIndex):
    return bossTotalBar(regionIndex) / PHASE_COUNT

function runBossPhase(state, regionIndex, phaseNumber):
    phaseBar = bossPhaseBar(regionIndex)
    state.tier = upgradeTier(state.baseTier, phaseNumber - 1)
    // fase 3: soal cerita bertema budaya region

    while phaseBar > 0:
        question = generateQuestion(state.topic, state.tier, phaseType=phaseNumber)
        answer = waitForPlayerAnswer(question, timeLimit(state.tier))

        if answer.correct:
            dmg = calculateDamage(state.combo, state.tier,
                                   answer.timeRemaining, timeLimit(state.tier))
            phaseBar -= dmg
            onCorrectAnswer(state)
        else:
            onWrongAnswer(state)

    triggerEffect("Kabut Memudar — Fase " + phaseNumber + " Selesai")

function runBossEncounter(state, regionIndex):
    for phaseNumber in 1..PHASE_COUNT:
        runBossPhase(state, regionIndex, phaseNumber)

    triggerEffect("Sosok Kabut Kembali Jernih")
    grantPrasasti(regionIndex)
    grantXP(calculateXP(state.combo, state.tier) * 5 + 50)  // bonus XP boss
```

---

## 7. Difficulty Scaling (Adaptive Engine)

```
WINDOW              = 10     // rolling window jawaban terakhir
TIER_UP_ACCURACY    = 0.8    // >= 80% benar
TIER_DOWN_ACCURACY  = 0.5    // <= 50% benar
TIER_UP_TIME_RATIO  = 0.6    // rata-rata jawab dalam <= 60% time limit

TIERS = [Tunas, Pelajar, Cendekia]

function evaluateDifficulty(state):
    last10 = state.answerHistory[-WINDOW:]
    accuracy = countCorrect(last10) / len(last10)
    avgTimeRatio = average(a.timeUsed / a.timeLimit for a in last10)

    currentIndex = indexOf(TIERS, state.tier)

    if accuracy >= TIER_UP_ACCURACY and avgTimeRatio <= TIER_UP_TIME_RATIO:
        state.tier = TIERS[min(currentIndex + 1, len(TIERS)-1)]
    elif accuracy <= TIER_DOWN_ACCURACY:
        state.tier = TIERS[max(currentIndex - 1, 0)]
    // else: tier tetap

    // Perubahan tier TIDAK ditampilkan eksplisit sebagai "naik/turun level"
    // - cukup pengaruhi tampilan soal & time limit secara halus
```

| Tier | Range Bilangan (indikatif) | Time Limit | DM |
|---|---|---|---|
| Tunas | kecil, 1 langkah | 20s | 1.0 |
| Pelajar | menengah, 1-2 langkah | 15s | 1.2 |
| Cendekia | kombinasi/soal cerita | 12s | 1.5 |

---

## 8. Flow Diagrams

### 8.1 Tantangan Angka (Regular Battle Flow)

```
[Mulai Tantangan Angka]
        ↓
[Tampilkan Soal sesuai Tier]
        ↓
[Pemain Menjawab] ──(timeout)──► [Dianggap "Jawaban Kurang Tepat"]
        ↓
   Benar? ──Yes──► onCorrectAnswer()
        │              ↓
        │         [Combo +1, Damage ke Bar Kebingungan]
        │              ↓
        │         [Combo % 3 == 0?] ──Yes──► [Serangan Garuda + Bonus Damage]
        │              ↓
        │         [Regen Semangat]
        │              ↓
        │         [XP += calculateXP()]
        │
        └──No───► onWrongAnswer()
                       ↓
                  [Combo = 0]
                       ↓
                  [Efek Kabut Sesaat → Semangat -= kabut]
                       ↓
                  [Semangat == 0?] ──Yes──► [Bantuan Garuda: hint + isi Semangat]
        ↓
[Bar Kebingungan <= 0?] ──Yes──► [Tantangan Selesai → "Sosok Kabut" Jernih → Reward]
        │
        No → [evaluateDifficulty()] → [Soal Berikutnya]
```

### 8.2 Tantangan Besar (Boss Flow, Multi-Phase)

```
[Mulai Tantangan Besar — Region N]
        ↓
[Set bossTotalBar = bossTotalBar(N)]
        ↓
┌─────────────────────────────────────────┐
│ Fase 1 (Tier dasar region)               │
│   - Soal dasar sesuai topik region       │
│   - Loop Tantangan Angka hingga          │
│     phaseBar Fase 1 <= 0                 │
└─────────────────────────────────────────┘
        ↓
┌─────────────────────────────────────────┐
│ Fase 2 (Tier +1, soal kombinasi)         │
│   - Gabungan topik region + sebelumnya   │
└─────────────────────────────────────────┘
        ↓
┌─────────────────────────────────────────┐
│ Fase 3 (Tier +2, soal cerita budaya)     │
│   - Word problem bertema region          │
└─────────────────────────────────────────┘
        ↓
[Semua Fase Selesai]
        ↓
[Cutscene: Sosok Kabut → Jernih Kembali]
        ↓
[grantPrasasti(N)] + [Bonus XP] + [Unlock Region N+1]
```

### 8.3 Adaptive Difficulty Loop

```
[Setiap kali jawaban tercatat]
        ↓
[answerHistory.push(result)]
        ↓
[len(answerHistory) >= WINDOW?] ──No──► [lanjut, tier tetap]
        │ Yes
        ↓
[Hitung accuracy & avgTimeRatio dari 10 jawaban terakhir]
        ↓
accuracy >= 0.8 AND avgTimeRatio <= 0.6 ?
        │Yes → [Tier naik 1 level (maks Cendekia)]
        │No
        ↓
accuracy <= 0.5 ?
        │Yes → [Tier turun 1 level (min Tunas)]
        │No  → [Tier tetap]
        ↓
[Soal berikutnya mengikuti Tier baru — tanpa notifikasi eksplisit]
```

---

*Dokumen ini adalah output Phase 1 — Discovery, Prompt 7 (Battle Engine) untuk proyek "Legenda Garuda: Petualangan Matematika Nusantara".*
