package com.koreait.restapi.controller;

import com.koreait.restapi.dto.StudyApplicationDTO;
import com.koreait.restapi.dto.StudyDTO;
import com.koreait.restapi.jwt.JwtUtil;
import com.koreait.restapi.service.StudyService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RestController
@RequestMapping("/api/study")
@RequiredArgsConstructor
public class StudyController {

    private final StudyService studyService;
    private final JwtUtil jwtUtil;

    // ✅ 스터디 개설
    @PostMapping
    public ResponseEntity<?> createStudy(@RequestBody StudyDTO study, HttpServletRequest request) {
        int userId = jwtUtil.getUserIdFromRequest(request);
        study.setCreatorId(userId);
        studyService.insertStudy(study);
        return ResponseEntity.ok("스터디가 개설되었습니다");
    }

    // ✅ 전체 스터디 목록 조회 (페이징 + totalCount 포함)
    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllStudies(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Map<String, Object> result = studyService.getStudyList(page, size);
        return ResponseEntity.ok(result);
    }

    // ✅ 전체 스터디 수 조회
    @GetMapping("/count")
    public int getTotalStudyCount() {
        return studyService.getStudyCount();
    }

    // ✅ 스터디 상세 조회
    @GetMapping("/{id}")
    public ResponseEntity<?> getStudyDetail(@PathVariable int id) {
        StudyDTO study = studyService.getStudyById(id);
        return study != null ? ResponseEntity.ok(study) : ResponseEntity.notFound().build();
    }

    // ✅ 스터디 검색 (제목+내용, 페이징 포함)
    @GetMapping("/search")
    public ResponseEntity<Map<String, Object>> searchStudies(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "6") int size
    ) {
        int offset = (page - 1) * size;
        List<StudyDTO> list = studyService.searchStudies(keyword, offset, size);
        int totalCount = studyService.getSearchCount(keyword);

        Map<String, Object> result = new HashMap<>();
        result.put("content", list);
        result.put("totalCount", totalCount);
        return ResponseEntity.ok(result);
    }

    // ✅ 내가 만든 스터디 목록 (페이징 + 전체 개수 포함)
    @GetMapping("/my")
    public ResponseEntity<Map<String, Object>> getMyCreatedStudies(
            HttpServletRequest request,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "5") int size
    ) {
        int userId = jwtUtil.getUserIdFromRequest(request);
        int offset = (page - 1) * size;
        List<StudyDTO> list = studyService.getMyStudiesByPaging(userId, offset, size);
        int totalCount = studyService.getMyStudyCount(userId);

        Map<String, Object> result = new HashMap<>();
        result.put("content", list);
        result.put("totalCount", totalCount);
        return ResponseEntity.ok(result);
    }

    // ✅ 스터디 신청
    @PostMapping("/{studyId}/apply")
    public ResponseEntity<?> applyToStudy(@PathVariable int studyId, HttpServletRequest request) {
        int userId = jwtUtil.getUserIdFromRequest(request);
        StudyApplicationDTO application = new StudyApplicationDTO();
        application.setMemberId(userId);
        application.setStudyId(studyId);

        boolean success = studyService.applyStudy(application);
        if (!success) {
            return ResponseEntity.badRequest().body("신청 실패: 중복 신청 또는 정원 초과");
        }
        return ResponseEntity.ok("신청 완료");
    }

    // ✅ 내가 신청한 스터디 목록
    @GetMapping("/applied")
    public List<StudyDTO> getAppliedStudies(HttpServletRequest request) {
        int userId = jwtUtil.getUserIdFromRequest(request);
        return studyService.getAppliedStudies(userId);
    }
}
