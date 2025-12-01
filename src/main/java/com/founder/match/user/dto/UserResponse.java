package com.founder.match.user.dto;

import java.time.LocalDateTime;

import com.founder.match.user.domain.User;
import lombok.Builder;
import lombok.Getter;

/**
 * 사용자 정보를 외부로 노출하기 위한 DTO.
 */
@Getter
@Builder
public class UserResponse {

    private final Long id;
    private final String email;
    private final String nickname;
    private final String contact;
    private final LocalDateTime createdAt;

    public static UserResponse from(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .nickname(user.getNickname())
                .contact(user.getContact())
                .createdAt(user.getCreatedAt())
                .build();
    }
}

