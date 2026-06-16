package id.legendagaruda.core.user;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @Column(nullable = false)
    private String displayName;

    @Column(unique = true)
    private String email;

    private String passwordHash;

    private String classCode;

    private String pinHash;

    // Player stats — digunakan oleh modul player, battle, leaderboard
    private int level = 1;
    private int xp = 0;
    private int xpToNextLevel = 100;
    private int kepingGaruda = 0;
    private int streakDays = 1;
    private boolean dailyRewardClaimed = false;

    @Column(nullable = false)
    private LocalDate lastLoginDate = LocalDate.now();

    public static UserEntity newStudent(String displayName, String classCode, String pinHash) {
        UserEntity u = new UserEntity();
        u.role = Role.STUDENT;
        u.displayName = displayName;
        u.classCode = classCode;
        u.pinHash = pinHash;
        u.lastLoginDate = LocalDate.now();
        return u;
    }

    public static UserEntity newTeacher(String displayName, String email, String passwordHash) {
        UserEntity u = new UserEntity();
        u.role = Role.TEACHER;
        u.displayName = displayName;
        u.email = email;
        u.passwordHash = passwordHash;
        u.lastLoginDate = LocalDate.now();
        return u;
    }

    public static UserEntity newEmailUser(String displayName, String email, String pinHash) {
        UserEntity u = new UserEntity();
        u.role = Role.STUDENT;
        u.displayName = displayName;
        u.email = email;
        u.pinHash = pinHash;
        u.lastLoginDate = LocalDate.now();
        return u;
    }

    public void addXp(int amount) {
        xp += amount;
        while (xp >= xpToNextLevel) {
            xp -= xpToNextLevel;
            level++;
            xpToNextLevel = 100 + (level - 1) * 50;
        }
    }

    public void addKeping(int amount) {
        kepingGaruda += amount;
    }

    /** Dipanggil setiap login untuk reset daily reward jika hari baru. */
    public void handleDailyLogin() {
        LocalDate today = LocalDate.now();
        if (!today.equals(lastLoginDate)) {
            boolean consecutive = today.equals(lastLoginDate.plusDays(1));
            streakDays = consecutive ? streakDays + 1 : 1;
            dailyRewardClaimed = false;
            lastLoginDate = today;
        }
    }
}
