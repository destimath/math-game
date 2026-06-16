package id.legendagaruda.core.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
        @NotBlank @Size(min = 2, max = 50) String name,
        @NotBlank @Email String email,
        @NotBlank @Pattern(regexp = "\\d{4,6}", message = "PIN harus 4–6 digit angka") String pin
) {}
