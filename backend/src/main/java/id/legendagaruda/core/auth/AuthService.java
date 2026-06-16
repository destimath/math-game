package id.legendagaruda.core.auth;

import id.legendagaruda.core.shared.JwtTokenProvider;
import id.legendagaruda.core.user.UserEntity;
import id.legendagaruda.core.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtProvider;

    @Transactional
    public TokenResponse loginStudent(LoginStudentRequest req) {
        UserEntity user = userRepository
                .findByDisplayNameIgnoreCaseAndClassCodeIgnoreCase(req.name(), req.classCode())
                .orElseThrow(() -> new SecurityException("Nama atau kode kelas tidak ditemukan"));

        if (!passwordEncoder.matches(req.pin(), user.getPinHash())) {
            throw new SecurityException("PIN salah");
        }

        user.handleDailyLogin();
        userRepository.save(user);

        String token = jwtProvider.generateToken(user.getId(), user.getRole().name());
        return new TokenResponse(token, user.getRole().name().toLowerCase(), user.getDisplayName(), user.getClassCode());
    }

    @Transactional
    public TokenResponse login(LoginRequest req) {
        UserEntity user = userRepository.findByEmail(req.email())
                .orElseThrow(() -> new SecurityException("Email tidak ditemukan"));

        String hash = user.getPinHash() != null ? user.getPinHash() : user.getPasswordHash();
        if (hash == null || !passwordEncoder.matches(req.pin(), hash)) {
            throw new SecurityException("PIN salah");
        }

        user.handleDailyLogin();
        userRepository.save(user);

        String token = jwtProvider.generateToken(user.getId(), user.getRole().name());
        return new TokenResponse(token, user.getRole().name().toLowerCase(), user.getDisplayName(), user.getClassCode());
    }

    @Transactional
    public TokenResponse register(RegisterRequest req) {
        if (userRepository.existsByEmail(req.email())) {
            throw new IllegalArgumentException("Email sudah terdaftar");
        }

        UserEntity user = UserEntity.newEmailUser(
                req.name().trim(),
                req.email().trim().toLowerCase(),
                passwordEncoder.encode(req.pin())
        );
        userRepository.save(user);

        String token = jwtProvider.generateToken(user.getId(), user.getRole().name());
        return new TokenResponse(token, user.getRole().name().toLowerCase(), user.getDisplayName(), null);
    }

    @Transactional
    public TokenResponse loginTeacher(LoginTeacherRequest req) {
        UserEntity user = userRepository
                .findByEmail(req.email())
                .orElseThrow(() -> new SecurityException("Email tidak ditemukan"));

        if (!passwordEncoder.matches(req.password(), user.getPasswordHash())) {
            throw new SecurityException("Password salah");
        }

        user.handleDailyLogin();
        userRepository.save(user);

        String token = jwtProvider.generateToken(user.getId(), user.getRole().name());
        return new TokenResponse(token, user.getRole().name().toLowerCase(), user.getDisplayName(), null);
    }
}
