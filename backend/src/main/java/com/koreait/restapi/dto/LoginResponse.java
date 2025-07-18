// com.koreait.restapi.dto.LoginResponse.java
package com.koreait.restapi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponse {
    private String token;
    private int userId;
}
