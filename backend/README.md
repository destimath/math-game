# Legenda Garuda — Backend

Spring Boot 3 (Java 21) modular monolith yang menyediakan REST API untuk game
[Legenda Garuda: Petualangan Matematika Nusantara](../README.md).

## Tech Stack

- Spring Boot 3.2.5 (Web, Security, Data JPA, Validation)
- Java 21
- H2 in-memory (dev) / PostgreSQL (prod, `MODE=PostgreSQL` sudah aktif di H2 agar kompatibel)
- JWT (`io.jsonwebtoken` / jjwt 0.12.3) untuk autentikasi stateless

## Menjalankan

```bash
mvn spring-boot:run
```

Berjalan di `http://localhost:8081`. Data demo di-seed otomatis lewat `DataSeederRunner` saat startup — tidak perlu setup database untuk mencoba.

- H2 console: `http://localhost:8081/h2-console` (JDBC URL: `jdbc:h2:mem:legendagaruda`, user: `sa`, password kosong)

Build & test:

```bash
mvn clean verify
```

## Struktur Package

Modular monolith berbasis fitur di `src/main/java/id/legendagaruda/core/`:

| Package | Tanggung Jawab |
|---|---|
| `auth/` | Login siswa (kode kelas + nama + PIN) & guru (email + password), penerbitan JWT |
| `player/` | Profil pemain, XP, level, Keping Garuda |
| `battle/` | Endpoint penyelesaian battle (`BattleController`, `BattleService`) |
| `leaderboard/` | Skor & peringkat kelas |
| `teacher/` | Dashboard guru & progres siswa per kelas |
| `user/` | Entity inti pengguna & sesi battle (`UserEntity`, `BattleSessionEntity`) |
| `shared/` | Security config, JWT filter, `ApiResponse` envelope |

> **Catatan**: `battle/BattleService` saat ini hanya mencatat `xpEarned`/`kepingEarned` yang dikirim client — belum ada perhitungan/validasi ulang formula damage, XP, atau combo di server. Lihat `docs/16-battle-engine-implementation-checklist.md` di root repo.

## Konfigurasi (`src/main/resources/application.yml`)

```yaml
server:
  port: 8081

app:
  jwt:
    secret: "<ganti-dengan-string-256-bit-di-production>"
    expiration-ms: 86400000   # 24 jam
```

Untuk production, timpa `spring.datasource.*` agar mengarah ke PostgreSQL dan set `app.jwt.secret` via environment variable, jangan hardcode di file.

## Endpoint Utama

| Method | Path | Akses | Deskripsi |
|---|---|---|---|
| POST | `/api/auth/student-login` | Public | Login siswa |
| POST | `/api/auth/teacher-login` | Public | Login guru |
| GET | `/api/player/me` | JWT | Profil pemain |
| POST | `/api/battle/complete` | JWT | Submit hasil battle |
| GET | `/api/leaderboard` | JWT | Leaderboard kelas |
| GET | `/api/teacher/roster` | JWT + TEACHER | Daftar & progres siswa |

Detail arsitektur lebih lengkap ada di `docs/12-system-architecture.md` dan `docs/14-project-structure.md` di root repo.
