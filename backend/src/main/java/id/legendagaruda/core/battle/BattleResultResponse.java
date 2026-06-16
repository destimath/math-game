package id.legendagaruda.core.battle;

public record BattleResultResponse(
        int newLevel,
        int newXp,
        int newXpToNextLevel,
        int newKepingGaruda,
        boolean leveledUp
) {}
