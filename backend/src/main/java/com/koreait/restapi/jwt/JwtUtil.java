package com.koreait.restapi.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    private final Key key;
    private final long EXPIRATION = 1000 * 60 * 60; // 1시간

    public JwtUtil(@Value("${jwt.secret}") String secret) {
        this.key = Keys.hmacShaKeyFor(secret.getBytes());
    }

    // ✅ 토큰 발급
    public String generateToken(String username, int userId) {
        return Jwts.builder()
                .setSubject(username)
                .claim("id", userId)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    // ✅ username 추출
    public String getUsernameFromToken(String token) {
        return parseClaims(token).getSubject();
    }

    // ✅ userId 추출
    public int getUserIdFromToken(String token) {
        return parseClaims(token).get("id", Integer.class);
    }

    // ✅ 유효성 검사
    public boolean isTokenValid(String token) {
        try {
            parseClaims(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }

    // ✅ Claims 파싱
    private Claims parseClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // ✅ 요청 객체에서 userId 꺼내기 (실패 시 null 또는 Optional로 바꿔도 됨)
    public Integer getUserIdFromRequest(HttpServletRequest request) {
        String bearer = request.getHeader("Authorization");
        if (bearer != null && bearer.startsWith("Bearer ")) {
            String token = bearer.substring(7);
            if (isTokenValid(token)) {
                return getUserIdFromToken(token);
            }
        }
        throw new IllegalStateException("유효하지 않은 JWT 토큰입니다.");
    }
}
