package id.legendagaruda.core.teacher;

import id.legendagaruda.core.shared.ApiResponse;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/teacher")
@RequiredArgsConstructor
public class TeacherController {

    private final TeacherService teacherService;

    @GetMapping("/roster")
    @PreAuthorize("hasRole('TEACHER')")
    public ResponseEntity<ApiResponse<List<StudentProgressResponse>>> getRoster(
            @RequestParam @NotBlank String classCode) {
        return ResponseEntity.ok(ApiResponse.of(teacherService.getClassRoster(classCode)));
    }
}
