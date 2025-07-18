package com.koreait.restapi.mapper;

import com.koreait.restapi.dto.MemberDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface MemberMapper {
    void save(MemberDTO member);
    MemberDTO findByUsername(@Param("username") String username);
    void update(MemberDTO member);
}
