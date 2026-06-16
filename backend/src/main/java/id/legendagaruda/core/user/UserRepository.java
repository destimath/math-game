package id.legendagaruda.core.user;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

    Optional<UserEntity> findByDisplayNameIgnoreCaseAndClassCodeIgnoreCase(String displayName, String classCode);

    Optional<UserEntity> findByEmail(String email);

    boolean existsByEmail(String email);

    List<UserEntity> findFirst50ByRoleOrderByLevelDescXpDesc(Role role);

    List<UserEntity> findFirst50ByRoleAndClassCodeOrderByLevelDescXpDesc(Role role, String classCode);

    List<UserEntity> findByRoleAndClassCodeIgnoreCaseOrderByDisplayNameAsc(Role role, String classCode);
}
