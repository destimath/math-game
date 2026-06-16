package id.legendagaruda.core.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BattleSessionRepository extends JpaRepository<BattleSessionEntity, Long> {

    /**
     * Aggregate battle stats per user for a list of user IDs.
     * Returns rows: [userId(Long), totalBattles(Long), victories(Long), totalAnswered(Long), totalCorrect(Long)]
     */
    @Query(value = """
            SELECT b.user_id,
                   COUNT(*)                                           AS total_battles,
                   SUM(CASE WHEN b.victory = TRUE THEN 1 ELSE 0 END) AS victories,
                   COALESCE(SUM(b.questions_answered), 0)            AS total_answered,
                   COALESCE(SUM(b.questions_correct), 0)             AS total_correct
            FROM battle_sessions b
            WHERE b.user_id IN (:userIds)
            GROUP BY b.user_id
            """, nativeQuery = true)
    List<Object[]> aggregateByUserIds(@Param("userIds") List<Long> userIds);
}
