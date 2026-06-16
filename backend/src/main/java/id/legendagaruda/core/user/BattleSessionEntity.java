package id.legendagaruda.core.user;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "battle_sessions")
@Getter
@Setter
@NoArgsConstructor
public class BattleSessionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    private int xpEarned;
    private int kepingEarned;
    private int questionsAnswered;
    private int questionsCorrect;
    private boolean victory;

    @Column(nullable = false)
    private LocalDateTime playedAt = LocalDateTime.now();

    public static BattleSessionEntity of(UserEntity user, int xpEarned, int kepingEarned,
                                          int questionsAnswered, int questionsCorrect, boolean victory) {
        BattleSessionEntity s = new BattleSessionEntity();
        s.user = user;
        s.xpEarned = xpEarned;
        s.kepingEarned = kepingEarned;
        s.questionsAnswered = questionsAnswered;
        s.questionsCorrect = questionsCorrect;
        s.victory = victory;
        return s;
    }
}
