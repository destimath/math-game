package id.legendagaruda.core.player;

import id.legendagaruda.core.user.UserEntity;

public record PlayerProfileResponse(
        Long id,
        String name,
        int level,
        int xp,
        int xpToNextLevel,
        int kepingGaruda,
        int streakDays,
        boolean dailyRewardClaimed,
        String classCode
) {
    public static PlayerProfileResponse from(UserEntity u) {
        return new PlayerProfileResponse(
                u.getId(), u.getDisplayName(),
                u.getLevel(), u.getXp(), u.getXpToNextLevel(),
                u.getKepingGaruda(), u.getStreakDays(),
                u.isDailyRewardClaimed(), u.getClassCode()
        );
    }
}
