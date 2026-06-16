package id.legendagaruda.core.battle;

import jakarta.validation.constraints.Min;

public record BattleResultRequest(
        @Min(0) int xpEarned,
        @Min(0) int kepingEarned,
        @Min(0) int questionsAnswered,
        @Min(0) int questionsCorrect,
        boolean victory
) {}
