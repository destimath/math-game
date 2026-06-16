package id.legendagaruda.core.auth;

public record TokenResponse(String accessToken, String role, String displayName, String classCode) {}
