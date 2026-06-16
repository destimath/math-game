package id.legendagaruda.core.battle;

import id.legendagaruda.core.shared.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/battle")
@RequiredArgsConstructor
public class BattleController {

    private final BattleService battleService;

    @PostMapping("/complete")
    public ResponseEntity<ApiResponse<BattleResultResponse>> completeBattle(@Valid @RequestBody BattleResultRequest req) {
        return ResponseEntity.ok(ApiResponse.of(battleService.completeBattle(currentUserId(), req)));
    }

    private Long currentUserId() {
        return (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }
}
