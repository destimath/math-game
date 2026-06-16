package id.legendagaruda.core.teacher;

import id.legendagaruda.core.user.UserEntity;

public record StudentProgressResponse(
        Long id,
        String name,
        int level,
        int xp,
        int kepingGaruda,
        int streakDays,
        long totalBattles,
        long victories,
        long totalAnswered,
        long totalCorrect
) {
    public static StudentProgressResponse of(UserEntity u,
                                             long totalBattles, long victories,
                                             long totalAnswered, long totalCorrect) {
        return new StudentProgressResponse(
                u.getId(), u.getDisplayName(),
                u.getLevel(), u.getXp(), u.getKepingGaruda(), u.getStreakDays(),
                totalBattles, victories, totalAnswered, totalCorrect
        );
    }

    /** Accuracy 0-100, -1 jika belum pernah menjawab. */
    public int accuracyPct() {
        return totalAnswered == 0 ? -1 : (int) Math.round(totalCorrect * 100.0 / totalAnswered);
    }
}
