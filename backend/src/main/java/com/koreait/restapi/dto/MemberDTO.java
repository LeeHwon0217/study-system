package com.koreait.restapi.dto;


import lombok.Data;

@Data
public class MemberDTO {
    private int id;
    private String username;
    private String password;
    private String name;
}
