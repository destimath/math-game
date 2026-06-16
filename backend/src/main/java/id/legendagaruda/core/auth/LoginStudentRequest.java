package id.legendagaruda.core.auth;

import jakarta.validation.constraints.NotBlank;

public record LoginStudentRequest(
        @NotBlank String classCode,
        @NotBlank String name,
        @NotBlank String pin
) {}
