package com.koreait.restapi.service;

import com.koreait.restapi.dto.MemberDTO;
import com.koreait.restapi.jwt.JwtUtil;
import com.koreait.restapi.mapper.MemberMapper;
import lombok.RequiredArgsConstructor;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService, UserDetailsService {

    private final MemberMapper mapper;
    private final JwtUtil jwtUtil;

    // ✅ Spring Security용 UserDetailsService 구현
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        MemberDTO member = mapper.findByUsername(username);
        if (member == null) {
            throw new UsernameNotFoundException("user '" + username + "' not found");
        }

        return User.withUsername(member.getUsername())
                .password(member.getPassword()) // BCrypt 암호화된 비밀번호
                .roles("USER") // 권한 설정
                .build();
    }

    @Override
    public void register(MemberDTO member) {
        String hashed = BCrypt.hashpw(member.getPassword(), BCrypt.gensalt());
        member.setPassword(hashed);
        mapper.save(member);
    }

    @Override
    public String login(String username, String password) {
        MemberDTO member = mapper.findByUsername(username);
        if (member != null && BCrypt.checkpw(password, member.getPassword())) {
            return jwtUtil.generateToken(member.getUsername(), member.getId());
        }
        return null;
    }

    @Override
    public MemberDTO getUserInfoFromToken(String token) {
        String jwt = token.replace("Bearer ", "");
        String username = jwtUtil.getUsernameFromToken(jwt);
        MemberDTO member = mapper.findByUsername(username);
        if (member != null) {
            member.setPassword(null); // 비밀번호 숨김
        }
        return member;
    }

    @Override
    public void update(String token, MemberDTO member) {
        String jwt = token.replace("Bearer ", "");
        String username = jwtUtil.getUsernameFromToken(jwt);
        MemberDTO original = mapper.findByUsername(username);
        if (original != null) {
            if (StringUtils.hasText(member.getPassword())) {
                String hashed = BCrypt.hashpw(member.getPassword(), BCrypt.gensalt());
                original.setPassword(hashed);
            }
            if (StringUtils.hasText(member.getName())) {
                original.setName(member.getName());
            }
            mapper.update(original);
        }
    }

    @Override
    public void logout(String token) {
        // 클라이언트에서 토큰 제거로 로그아웃 처리
    }
}
