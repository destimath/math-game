package id.legendagaruda.core.leaderboard;

import id.legendagaruda.core.user.UserEntity;

public record LeaderboardEntryResponse(Long id, String name, int level, int xp, int kepingGaruda, String classCode) {

    public static LeaderboardEntryResponse from(UserEntity u, int rank) {
        return new LeaderboardEntryResponse(
                u.getId(), u.getDisplayName(), u.getLevel(), u.getXp(),
                u.getKepingGaruda(), u.getClassCode()
        );
    }
}
