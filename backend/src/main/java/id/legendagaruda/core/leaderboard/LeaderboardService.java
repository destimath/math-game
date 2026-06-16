package id.legendagaruda.core.leaderboard;

import id.legendagaruda.core.user.Role;
import id.legendagaruda.core.user.UserEntity;
import id.legendagaruda.core.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

@Service
@RequiredArgsConstructor
public class LeaderboardService {

    private final UserRepository userRepository;

    public List<LeaderboardEntryResponse> getLeaderboard(Long currentUserId, String scope) {
        UserEntity me = userRepository.findById(currentUserId)
                .orElseThrow(() -> new IllegalArgumentException("User tidak ditemukan"));

        List<UserEntity> users = "class".equals(scope) && me.getClassCode() != null
                ? userRepository.findFirst50ByRoleAndClassCodeOrderByLevelDescXpDesc(Role.STUDENT, me.getClassCode())
                : userRepository.findFirst50ByRoleOrderByLevelDescXpDesc(Role.STUDENT);

        AtomicInteger rank = new AtomicInteger(1);
        return users.stream()
                .map(u -> LeaderboardEntryResponse.from(u, rank.getAndIncrement()))
                .toList();
    }
}
