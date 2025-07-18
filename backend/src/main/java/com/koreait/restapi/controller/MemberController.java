package com.koreait.restapi.controller;
import com.koreait.restapi.dto.LoginResponse;

import com.koreait.restapi.dto.MemberDTO;
import com.koreait.restapi.service.MemberService;
import com.koreait.restapi.jwt.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RestController
@RequestMapping("/api/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService service;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody MemberDTO member) {
        service.register(member);
        return ResponseEntity.ok("회원가입 성공");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody MemberDTO loginRequest) {
        String token = service.login(loginRequest.getUsername(), loginRequest.getPassword());
        if (token != null) {
            MemberDTO member = service.getUserInfoFromToken(token); // ✅ userId 가져오기

            // ✅ token + userId를 같이 반환
            return ResponseEntity.ok().body(
                    new LoginResponse(token, member.getId()) // 아래 클래스 참고
            );
        } else {
            return ResponseEntity.status(401).body("로그인 실패");
        }
    }


    @GetMapping("/info")
    public ResponseEntity<?> getUserInfo(@RequestHeader("Authorization") String token) {
        MemberDTO member = service.getUserInfoFromToken(token);
        if (member != null) {
            return ResponseEntity.ok(member);
        }else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("사용자를 찾을 수 없습니다");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader("Authorization") String token) {
        service.logout(token);
        return ResponseEntity.ok("로그아웃 성공");
    }

    @PutMapping("/update")
    public ResponseEntity<?> update(@RequestHeader("Authorization") String token, @RequestBody MemberDTO member) {
        service.update(token, member);
        return ResponseEntity.ok("회원정보 수정 성공");
    }
}
