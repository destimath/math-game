package id.legendagaruda.core.player;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record ChangePinRequest(
        @NotBlank String currentPin,
        @NotBlank @Pattern(regexp = "\\d{4,6}", message = "PIN baru harus 4–6 digit angka") String newPin
) {}
