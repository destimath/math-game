package id.legendagaruda.core.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record LoginTeacherRequest(
        @NotBlank @Email String email,
        @NotBlank String password
) {}
