# Legenda Garuda: Petualangan Matematika Nusantara
## Project Structure — Clean Architecture — Phase 1: Discovery, Prompt 14

> **Catatan konsistensi**: struktur backend mengikuti **modular monolith** dari MVP Roadmap (Prompt 13) — 6 modul (`auth`, `player`, `content`, `battle`, `classroom`, `leaderboard`) yang persis memetakan ke 6 service target pada System Architecture (Prompt 12), masing-masing mengikuti **Clean Architecture** secara internal. Frontend mengikuti React + Phaser + Tailwind (Prompt 12), screen mengacu Screen Inventory (Prompt 9) & Wireframes (Prompt 10).

---

## 1. Prinsip Clean Architecture yang Diterapkan

```
┌──────────────────────────────────────────────────────────┐
│  WEB / INFRASTRUCTURE  (Controllers, JPA, Redis, adapters) │
│  ┌────────────────────────────────────────────────────┐   │
│  │  APPLICATION  (Use Cases, Port In/Out)               │   │
│  │  ┌──────────────────────────────────────────────┐   │   │
│  │  │  DOMAIN  (Entities, Value Objects, Rules)      │   │   │
│  │  └──────────────────────────────────────────────┘   │   │
│  └────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────┘
        Dependency Rule: lapisan luar → lapisan dalam
        (domain TIDAK BOLEH bergantung pada Spring/JPA/Redis/React/Phaser)
```

| Lapisan | Isi | Aturan |
|---|---|---|
| **Domain** | Entity, value object, kalkulasi/aturan bisnis murni | Tanpa dependency framework — bisa di-unit-test tanpa Spring context atau browser |
| **Application** | Use case (`port/in`), kontrak keluar (`port/out`), service yang mengorkestrasi domain | Hanya depend ke `domain`; boleh pakai anotasi Spring ringan (`@Service`, `@Transactional`) |
| **Infrastructure** | Implementasi `port/out`: JPA repository/entity, Redis adapter, adapter ke modul lain | Implements interface dari `application/port/out` |
| **Web / Presentation** | Controller REST (backend) atau Page/Component (frontend) | Memanggil `application/port/in`, melakukan mapping DTO ↔ domain |

---

## 2. Backend — Spring Boot (Modular Monolith)

**Base package**: `id.legendagaruda.core`

```
backend/
├── pom.xml
├── Dockerfile
├── src/main/java/id/legendagaruda/core/
│   ├── LegendaGarudaApplication.java
│   │
│   ├── shared/
│   │   ├── config/
│   │   │   ├── SecurityConfig.java          # JWT filter, RBAC, CORS
│   │   │   ├── RedisConfig.java
│   │   │   ├── JacksonConfig.java
│   │   │   └── OpenApiConfig.java
│   │   ├── web/
│   │   │   ├── ApiResponse.java             # envelope {data, meta} — Prompt 12 §3.2
│   │   │   ├── ApiError.java
│   │   │   └── GlobalExceptionHandler.java
│   │   └── domain/
│   │       ├── DifficultyTier.java          # enum TUNAS/PELAJAR/CENDEKIA
│   │       └── DomainException.java
│   │
│   ├── auth/
│   │   ├── domain/
│   │   │   ├── Role.java
│   │   │   └── AuthToken.java
│   │   ├── application/
│   │   │   ├── port/in/
│   │   │   │   ├── LoginStudentUseCase.java
│   │   │   │   ├── LoginTeacherUseCase.java
│   │   │   │   └── RefreshTokenUseCase.java
│   │   │   ├── port/out/
│   │   │   │   ├── CredentialRepository.java
│   │   │   │   ├── RefreshTokenStore.java
│   │   │   │   └── PasswordHasher.java
│   │   │   └── service/
│   │   │       ├── LoginStudentService.java
│   │   │       └── LoginTeacherService.java
│   │   ├── infrastructure/
│   │   │   ├── persistence/JpaCredentialRepository.java
│   │   │   ├── security/JwtTokenProvider.java
│   │   │   ├── security/BCryptPasswordHasher.java
│   │   │   └── redis/RedisRefreshTokenStore.java
│   │   └── web/
│   │       ├── AuthController.java
│   │       └── dto/StudentLoginRequest.java, TokenResponse.java
│   │
│   ├── player/
│   │   ├── domain/
│   │   │   ├── Player.java
│   │   │   ├── GarudaRank.java
│   │   │   ├── InventoryItem.java
│   │   │   └── Achievement.java
│   │   ├── application/
│   │   │   ├── port/in/
│   │   │   │   ├── GetPlayerProfileUseCase.java
│   │   │   │   ├── ClaimDailyRewardUseCase.java
│   │   │   │   ├── EquipItemUseCase.java
│   │   │   │   └── ApplyBattleRewardUseCase.java   # dipanggil modul battle
│   │   │   ├── port/out/
│   │   │   │   ├── PlayerRepository.java
│   │   │   │   ├── InventoryRepository.java
│   │   │   │   └── AchievementRepository.java
│   │   │   └── service/
│   │   │       ├── PlayerProfileService.java
│   │   │       └── ApplyBattleRewardService.java
│   │   ├── infrastructure/persistence/
│   │   │   ├── PlayerEntity.java, InventoryEntity.java
│   │   │   └── JpaPlayerRepository.java
│   │   └── web/
│   │       ├── PlayerController.java
│   │       └── dto/PlayerSummaryResponse.java, InventoryItemResponse.java
│   │
│   ├── content/
│   │   ├── domain/
│   │   │   ├── Region.java, Topic.java, Question.java
│   │   │   ├── Boss.java, BossPhase.java
│   │   │   └── Artifact.java
│   │   ├── application/
│   │   │   ├── port/in/
│   │   │   │   ├── GetRegionsUseCase.java
│   │   │   │   ├── GetBossUseCase.java
│   │   │   │   └── SelectQuestionUseCase.java      # dipanggil modul battle
│   │   │   ├── port/out/
│   │   │   │   ├── RegionRepository.java
│   │   │   │   ├── QuestionRepository.java
│   │   │   │   └── ContentCache.java
│   │   │   └── service/
│   │   │       ├── RegionCatalogService.java
│   │   │       └── QuestionSelectionService.java
│   │   ├── infrastructure/
│   │   │   ├── persistence/ (Jpa*Repository + *Entity per tabel Prompt 11)
│   │   │   └── redis/RedisContentCache.java
│   │   └── web/
│   │       ├── ContentController.java
│   │       └── dto/RegionResponse.java, BossResponse.java
│   │
│   ├── battle/
│   │   ├── domain/
│   │   │   ├── BattleSession.java
│   │   │   ├── ComboState.java
│   │   │   ├── DamageCalculator.java          # formula Prompt 7
│   │   │   ├── KabutEffectCalculator.java
│   │   │   ├── XpCalculator.java
│   │   │   └── AdaptiveDifficultyEngine.java
│   │   ├── application/
│   │   │   ├── port/in/
│   │   │   │   ├── StartBattleSessionUseCase.java
│   │   │   │   ├── SubmitAnswerUseCase.java
│   │   │   │   ├── UseItemUseCase.java
│   │   │   │   └── CompleteBattleSessionUseCase.java
│   │   │   ├── port/out/
│   │   │   │   ├── BattleSessionStore.java         # Redis
│   │   │   │   ├── QuestionProviderPort.java        # -> content.application
│   │   │   │   ├── RewardPort.java                  # -> player.application
│   │   │   │   └── LeaderboardPort.java             # -> leaderboard.application
│   │   │   └── service/
│   │   │       ├── BattleSessionService.java
│   │   │       └── AnswerEvaluationService.java
│   │   ├── infrastructure/
│   │   │   ├── redis/RedisBattleSessionStore.java
│   │   │   └── adapter/
│   │   │       ├── ContentQuestionProviderAdapter.java
│   │   │       ├── PlayerRewardAdapter.java
│   │   │       └── LeaderboardSubmitAdapter.java
│   │   └── web/
│   │       ├── BattleController.java
│   │       └── dto/StartSessionRequest.java, SubmitAnswerRequest.java, BattleStateResponse.java
│   │
│   ├── classroom/
│   │   ├── domain/School.java, SchoolClass.java, Teacher.java
│   │   ├── application/
│   │   │   ├── port/in/
│   │   │   │   ├── GetClassRosterUseCase.java
│   │   │   │   ├── GetClassProgressUseCase.java
│   │   │   │   └── ResetStudentPinUseCase.java
│   │   │   ├── port/out/ClassRepository.java, TeacherRepository.java
│   │   │   └── service/ClassroomService.java
│   │   ├── infrastructure/persistence/ (Jpa*Repository + *Entity)
│   │   └── web/
│   │       ├── TeacherController.java
│   │       └── dto/ClassProgressResponse.java
│   │
│   └── leaderboard/
│       ├── domain/LeaderboardEntry.java, LeaderboardPeriod.java
│       ├── application/
│       │   ├── port/in/
│       │   │   ├── SubmitScoreUseCase.java          # dipanggil modul battle
│       │   │   └── GetClassLeaderboardUseCase.java
│       │   ├── port/out/LeaderboardStore.java (Redis ZSET), LeaderboardEntryRepository.java (JPA)
│       │   └── service/LeaderboardService.java, LeaderboardSyncJob.java
│       ├── infrastructure/
│       │   ├── redis/RedisLeaderboardStore.java
│       │   └── persistence/JpaLeaderboardEntryRepository.java
│       └── web/
│           ├── LeaderboardController.java
│           └── dto/LeaderboardResponse.java
│
├── src/main/resources/
│   ├── application.yml
│   ├── application-dev.yml
│   ├── application-prod.yml
│   └── db/migration/
│       ├── V1__reference_data.sql     # schools, classes, teachers, regions, characters, topics
│       ├── V2__content_tables.sql     # questions, bosses, boss_phases, artifacts, items, achievements
│       ├── V3__player_tables.sql      # players, player_*, inventory
│       └── V4__leaderboard.sql
│
└── src/test/java/id/legendagaruda/core/
    └── battle/
        ├── domain/DamageCalculatorTest.java         # pure unit test, tanpa Spring
        ├── application/BattleSessionServiceTest.java # mocked port/out
        └── web/BattleControllerIT.java               # Testcontainers Postgres+Redis
        # (struktur sama untuk modul lain)
```

### 2.1 Tabel Tanggung Jawab

| Folder | Tanggung Jawab | Boleh Depend Pada |
|---|---|---|
| `shared/config/` | Konfigurasi Spring lintas modul (security, Redis, JSON, OpenAPI) | - |
| `shared/web/` | Envelope response/error, exception handler global (Prompt 12 §3.2) | - |
| `shared/domain/` | Tipe domain lintas modul (mis. `DifficultyTier`) | - |
| `<modul>/domain/` | Entity & value object murni, kalkulasi (Battle Engine, dll) | `shared/domain` |
| `<modul>/application/port/in/` | Use case (kontrak masuk) — 1 interface = 1 aksi pengguna | `<modul>/domain` |
| `<modul>/application/port/out/` | Kontrak keluar ke persistence/cache/modul lain | `<modul>/domain` |
| `<modul>/application/service/` | Implementasi use case, orkestrasi domain + port/out | `<modul>/domain`, `port/in`, `port/out` |
| `<modul>/infrastructure/persistence/` | Entity JPA + repository implementasi `port/out` | `<modul>/application/port/out` |
| `<modul>/infrastructure/redis/` | Adapter Redis (session, cache, ZSET) | `<modul>/application/port/out` |
| `<modul>/infrastructure/adapter/` | Adapter panggilan ke modul lain (implements `port/out`, memanggil `port/in` modul target) | `<modul>/application/port/out` + `<modulLain>/application/port/in` |
| `<modul>/web/` | Controller REST + DTO, mapping ke `port/in` | `<modul>/application/port/in` |

### 2.2 Konvensi Komunikasi Antar-Modul

Modul **tidak boleh** mengakses `domain` atau `infrastructure` modul lain secara langsung. Akses lintas-modul **selalu** melalui `application/port/in` (use case) milik modul tujuan — diimplementasikan sebagai adapter di `infrastructure/adapter/` modul pemanggil.

Contoh: `battle.application.port.out.RewardPort` diimplementasikan oleh `battle.infrastructure.adapter.PlayerRewardAdapter`, yang memanggil `player.application.port.in.ApplyBattleRewardUseCase`. Konvensi ini menjaga batas modul tetap jelas dan **siap di-extract menjadi microservice** (Prompt 12, Could Have Prompt 13) — adapter tinggal diganti dari in-process call menjadi HTTP client tanpa mengubah `application`/`domain`.

### 2.3 Strategi Testing

| Jenis Test | Lokasi | Tanpa Spring? | Tools |
|---|---|---|---|
| Unit — domain | `<modul>/domain/*Test.java` | Ya | JUnit 5, AssertJ |
| Unit — application | `<modul>/application/service/*Test.java` | Ya (mock port/out) | JUnit 5, Mockito |
| Integration — web/infrastructure | `<modul>/web/*IT.java` | Tidak | Testcontainers (Postgres, Redis), `@SpringBootTest` |
| Arsitektur | `architecture/*Test.java` | Ya | ArchUnit — menegakkan aturan §2.2 (domain tidak depend ke infrastructure, dll.) |

---

## 3. Frontend — React + Phaser + Tailwind

```
frontend/
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── Dockerfile
├── public/
│   ├── index.html
│   └── assets/
│       ├── characters/sari/, bayu/      # sprite & portrait Sahabat Garuda
│       ├── regions/sumatra/             # tileset, background, ikon boss
│       ├── ui/                          # ikon Keping Garuda, Pusaka, frame
│       └── audio/                       # sfx & musik (placeholder MVP)
│
└── src/
    ├── main.tsx
    ├── App.tsx
    │
    ├── domain/
    │   ├── entities/
    │   │   ├── Player.ts
    │   │   ├── Region.ts
    │   │   ├── Question.ts
    │   │   └── BattleSession.ts
    │   ├── value-objects/
    │   │   ├── DifficultyTier.ts
    │   │   └── ComboState.ts
    │   └── rules/
    │       ├── calculateDamage.ts       # cermin formula Prompt 7 (prediksi animasi)
    │       └── calculateXp.ts
    │
    ├── application/                     # custom hooks "use case"
    │   ├── auth/useLogin.ts
    │   ├── player/usePlayerProfile.ts, useInventory.ts, useDailyMissions.ts
    │   ├── world/useRegions.ts, useRegionProgress.ts
    │   ├── battle/useBattleSession.ts, useSubmitAnswer.ts
    │   ├── classroom/useClassRoster.ts, useClassProgress.ts
    │   └── leaderboard/useLeaderboard.ts
    │
    ├── infrastructure/
    │   ├── api/
    │   │   ├── httpClient.ts            # axios instance + interceptor refresh token
    │   │   ├── authApi.ts, playerApi.ts, contentApi.ts
    │   │   ├── battleApi.ts, classroomApi.ts, leaderboardApi.ts
    │   ├── auth/tokenStorage.ts
    │   └── game/
    │       ├── PhaserBridge.ts          # EventBus React ⇄ Phaser
    │       └── gameConfig.ts
    │
    ├── game/                            # kode Phaser
    │   ├── scenes/
    │   │   ├── PreloadScene.ts
    │   │   ├── WorldMapScene.ts
    │   │   ├── BattleScene.ts
    │   │   └── BossScene.ts
    │   ├── entities/
    │   │   ├── PlayerSprite.ts
    │   │   └── FogCreatureSprite.ts
    │   └── ui/
    │       ├── HealthBar.ts             # Bar Kebingungan/Semangat
    │       └── ComboCounter.ts
    │
    ├── presentation/
    │   ├── components/                  # Button, Card, ProgressBar, Modal (Tailwind)
    │   ├── layouts/
    │   │   ├── AppShell.tsx
    │   │   ├── BottomNav.tsx
    │   │   └── TeacherLayout.tsx
    │   └── pages/                       # 10 screen — Prompt 9 & 10
    │       ├── LoginPage.tsx
    │       ├── HomePage.tsx
    │       ├── WorldMapPage.tsx         # embed Phaser WorldMapScene
    │       ├── BattlePage.tsx           # embed Phaser BattleScene
    │       ├── VictoryPage.tsx
    │       ├── InventoryPage.tsx
    │       ├── ProfilePage.tsx
    │       ├── LeaderboardPage.tsx
    │       ├── TeacherDashboardPage.tsx
    │       └── SettingsPage.tsx
    │
    ├── store/
    │   ├── authStore.ts
    │   └── playerStore.ts
    │
    ├── router/
    │   └── AppRouter.tsx                # route + guard berbasis role
    │
    └── styles/
        └── index.css                    # @tailwind base/components/utilities
```

### 3.1 Tabel Tanggung Jawab

| Folder | Tanggung Jawab | Boleh Depend Pada |
|---|---|---|
| `domain/entities`, `value-objects` | Tipe data inti, identik secara konsep dengan `domain` backend | - |
| `domain/rules` | Fungsi murni — duplikasi ringan formula Battle Engine untuk animasi instan di client sebelum konfirmasi server | `domain/entities`, `value-objects` |
| `application/*` | Hook "use case" — gabungkan panggilan `infrastructure/api` + state, tanpa tahu detail komponen UI | `domain`, `infrastructure` |
| `infrastructure/api/*` | Klien HTTP per modul backend (mirror §3.3 Prompt 12) + auth header/refresh | `domain` |
| `infrastructure/game/PhaserBridge` | Jembatan event dua arah React ⇄ Phaser (mis. submit jawaban dari UI React ke `BattleScene`) | `domain` |
| `game/scenes` | Scene Phaser — render canvas, animasi, input gameplay | `infrastructure/game`, `domain/rules` |
| `game/entities`, `game/ui` | Sprite & elemen UI-in-canvas (Bar Kebingungan/Semangat, combo) | `game/scenes` |
| `presentation/components` | Komponen UI reusable bergaya Duolingo x Brawl Stars (Prompt 10) | - |
| `presentation/layouts` | Kerangka layout per role (Bottom Nav siswa vs sidebar guru) | `components` |
| `presentation/pages` | 10 screen — compose layout + components + `application` hooks + (jika perlu) canvas Phaser | `application`, `components`, `layouts`, `game` |
| `store/` | State global (sesi auth, profil ringkas untuk Home/Status Bar) | `domain` |
| `router/` | Definisi route + guard (`student`/`teacher`), redirect berbasis role | `store`, `presentation/pages` |

### 3.2 Strategi Testing

| Jenis Test | Lokasi | Tools |
|---|---|---|
| Unit — domain rules | `domain/rules/*.test.ts` | Vitest |
| Unit — hooks | `application/**/*.test.ts` | Vitest + Testing Library (mock `infrastructure/api`) |
| Component | `presentation/components/**/*.test.tsx` | Vitest + Testing Library |
| Scene (smoke) | `game/scenes/*.test.ts` | Phaser headless test runner (render tanpa crash) |
| E2E | `e2e/*.spec.ts` (root) | Playwright — alur login → Map → Tantangan Angka → Victory |

---

## 4. Pemetaan ke Arsitektur Masa Depan

| Modul Backend (sekarang) | Service Target (Prompt 12) | Tabel Postgres (Prompt 11) |
|---|---|---|
| `auth/` | Auth Service | *(read-only players/teachers/classes)* |
| `player/` | Player Service | `players`, `player_*`, `inventory` |
| `content/` | Content Service | `regions`, `topics`, `questions`, `bosses`, `boss_phases`, `artifacts`, `items`, `achievements`, `characters` |
| `battle/` | Battle Service | *(Redis only)* |
| `classroom/` | Classroom Service | `schools`, `classes`, `teachers`, `teacher_classes` |
| `leaderboard/` | Leaderboard Service | `leaderboard_entries` |

Karena setiap modul sudah memiliki `application/port/in` & `port/out` sendiri (§2.2), migrasi modular monolith → microservices (Could Have, Prompt 13) dilakukan dengan: (1) pindahkan folder modul ke repo/deployment terpisah, (2) ganti adapter in-process di `infrastructure/adapter/` menjadi HTTP client ke service baru, (3) `domain` & `application` tidak berubah.

---

*Dokumen ini adalah output Phase 1 — Discovery, Prompt 14 (Project Structure — Clean Architecture) untuk proyek "Legenda Garuda: Petualangan Matematika Nusantara".*

Siap lanjut ke Prompt 15 kapan saja.
