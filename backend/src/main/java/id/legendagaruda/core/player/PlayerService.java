package id.legendagaruda.core.player;

import id.legendagaruda.core.user.UserEntity;
import id.legendagaruda.core.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class PlayerService {

    private static final int[] DAILY_REWARD_TABLE = {10, 15, 20, 25, 30, 50, 100};

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public PlayerProfileResponse getProfile(Long userId) {
        UserEntity user = findUser(userId);
        return PlayerProfileResponse.from(user);
    }

    @Transactional
    public ClaimRewardResponse claimDailyReward(Long userId) {
        UserEntity user = findUser(userId);
        if (user.isDailyRewardClaimed()) {
            throw new IllegalArgumentException("Reward harian sudah diklaim hari ini");
        }
        int reward = DAILY_REWARD_TABLE[(user.getStreakDays() - 1) % DAILY_REWARD_TABLE.length];
        user.addKeping(reward);
        user.setDailyRewardClaimed(true);
        userRepository.save(user);
        return new ClaimRewardResponse(reward, user.getKepingGaruda(), user.getStreakDays());
    }

    @Transactional
    public void changePin(Long userId, ChangePinRequest req) {
        UserEntity user = findUser(userId);
        String hash = user.getPinHash() != null ? user.getPinHash() : user.getPasswordHash();
        if (hash == null || !passwordEncoder.matches(req.currentPin(), hash)) {
            throw new IllegalArgumentException("PIN saat ini salah");
        }
        user.setPinHash(passwordEncoder.encode(req.newPin()));
        userRepository.save(user);
    }

    private UserEntity findUser(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User tidak ditemukan"));
    }
}
