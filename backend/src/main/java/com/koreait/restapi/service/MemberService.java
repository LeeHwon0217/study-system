package com.koreait.restapi.service;

import com.koreait.restapi.dto.MemberDTO;

public interface MemberService {
    void register(MemberDTO member);
    String login(String username, String password);
    MemberDTO getUserInfoFromToken(String token);
    void logout(String token);
    void update(String token, MemberDTO member);
}
