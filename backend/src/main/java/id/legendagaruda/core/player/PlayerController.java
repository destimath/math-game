package id.legendagaruda.core.player;

import id.legendagaruda.core.shared.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/player")
@RequiredArgsConstructor
public class PlayerController {

    private final PlayerService playerService;

    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<PlayerProfileResponse>> getProfile() {
        return ResponseEntity.ok(ApiResponse.of(playerService.getProfile(currentUserId())));
    }

    @PostMapping("/daily-reward/claim")
    public ResponseEntity<ApiResponse<ClaimRewardResponse>> claimDailyReward() {
        return ResponseEntity.ok(ApiResponse.of(playerService.claimDailyReward(currentUserId())));
    }

    @PutMapping("/pin")
    public ResponseEntity<ApiResponse<Void>> changePin(@Valid @RequestBody ChangePinRequest req) {
        playerService.changePin(currentUserId(), req);
        return ResponseEntity.ok(ApiResponse.of(null));
    }

    private Long currentUserId() {
        return (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }
}
