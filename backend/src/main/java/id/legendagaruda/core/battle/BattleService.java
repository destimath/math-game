package id.legendagaruda.core.battle;

import id.legendagaruda.core.user.BattleSessionEntity;
import id.legendagaruda.core.user.BattleSessionRepository;
import id.legendagaruda.core.user.UserEntity;
import id.legendagaruda.core.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class BattleService {

    private final UserRepository userRepository;
    private final BattleSessionRepository battleSessionRepository;

    @Transactional
    public BattleResultResponse completeBattle(Long userId, BattleResultRequest req) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User tidak ditemukan"));

        int levelBefore = user.getLevel();

        user.addXp(req.xpEarned());
        user.addKeping(req.kepingEarned());

        battleSessionRepository.save(BattleSessionEntity.of(
                user, req.xpEarned(), req.kepingEarned(),
                req.questionsAnswered(), req.questionsCorrect(), req.victory()
        ));
        userRepository.save(user);

        return new BattleResultResponse(
                user.getLevel(), user.getXp(), user.getXpToNextLevel(),
                user.getKepingGaruda(), user.getLevel() > levelBefore
        );
    }
}
