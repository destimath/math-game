package id.legendagaruda.core.user;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataSeederRunner implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (userRepository.count() > 0) return;

        // Siswa demo — login: email + PIN
        save(UserEntity.newEmailUser("Sari",   "sari@demo.id",   passwordEncoder.encode("1234")));
        save(UserEntity.newEmailUser("Budi",   "budi@demo.id",   passwordEncoder.encode("5678")));
        save(UserEntity.newEmailUser("Ayu",    "ayu@demo.id",    passwordEncoder.encode("9999")));
        save(UserEntity.newEmailUser("Rian",   "rian@demo.id",   passwordEncoder.encode("1111")));

        // Guru demo — login: email + PIN (pinHash)
        UserEntity guru = UserEntity.newEmailUser("Pak Bimo", "guru@sekolah.id", passwordEncoder.encode("0000"));
        guru.setRole(Role.TEACHER);
        userRepository.save(guru);

        log.info("Seed selesai: {} users. Login: email + PIN", userRepository.count());
    }

    private void save(UserEntity u) {
        userRepository.save(u);
    }
}
