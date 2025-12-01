package com.founder.match.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * 로그인 응답 DTO.
 */
@Getter
@AllArgsConstructor
public class UserLoginResponse {
    private final Long userId;
    private final String nickname;
}

