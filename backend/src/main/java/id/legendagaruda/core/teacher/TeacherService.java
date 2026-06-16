package id.legendagaruda.core.teacher;

import id.legendagaruda.core.user.BattleSessionRepository;
import id.legendagaruda.core.user.Role;
import id.legendagaruda.core.user.UserEntity;
import id.legendagaruda.core.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class TeacherService {

    private final UserRepository userRepository;
    private final BattleSessionRepository battleSessionRepository;

    public List<StudentProgressResponse> getClassRoster(String classCode) {
        List<UserEntity> students = userRepository
                .findByRoleAndClassCodeIgnoreCaseOrderByDisplayNameAsc(Role.STUDENT, classCode);

        if (students.isEmpty()) return List.of();

        List<Long> ids = students.stream().map(UserEntity::getId).toList();

        // Build stat map: userId -> [totalBattles, victories, totalAnswered, totalCorrect]
        Map<Long, long[]> stats = new HashMap<>();
        for (Object[] row : battleSessionRepository.aggregateByUserIds(ids)) {
            long userId        = ((Number) row[0]).longValue();
            long totalBattles  = ((Number) row[1]).longValue();
            long victories     = ((Number) row[2]).longValue();
            long totalAnswered = ((Number) row[3]).longValue();
            long totalCorrect  = ((Number) row[4]).longValue();
            stats.put(userId, new long[]{totalBattles, victories, totalAnswered, totalCorrect});
        }

        return students.stream().map(u -> {
            long[] s = stats.getOrDefault(u.getId(), new long[]{0, 0, 0, 0});
            return StudentProgressResponse.of(u, s[0], s[1], s[2], s[3]);
        }).toList();
    }
}
