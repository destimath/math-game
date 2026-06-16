package id.legendagaruda.core.auth;

import id.legendagaruda.core.shared.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<TokenResponse>> login(@Valid @RequestBody LoginRequest req) {
        return ResponseEntity.ok(ApiResponse.of(authService.login(req)));
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<TokenResponse>> register(@Valid @RequestBody RegisterRequest req) {
        return ResponseEntity.ok(ApiResponse.of(authService.register(req)));
    }

    @PostMapping("/login/student")
    public ResponseEntity<ApiResponse<TokenResponse>> loginStudent(@Valid @RequestBody LoginStudentRequest req) {
        return ResponseEntity.ok(ApiResponse.of(authService.loginStudent(req)));
    }

    @PostMapping("/login/teacher")
    public ResponseEntity<ApiResponse<TokenResponse>> loginTeacher(@Valid @RequestBody LoginTeacherRequest req) {
        return ResponseEntity.ok(ApiResponse.of(authService.loginTeacher(req)));
    }
}
