package id.legendagaruda.core.shared;

import java.time.Instant;

public record ApiResponse<T>(T data, Meta meta) {

    public record Meta(String timestamp) {}

    public static <T> ApiResponse<T> of(T data) {
        return new ApiResponse<>(data, new Meta(Instant.now().toString()));
    }
}
