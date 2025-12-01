package com.founder.match.user.domain;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 단순 POJO 형태의 User 도메인.
 * 지금은 인메모리 전용이며, 추후 JPA 엔티티로 교체할 예정이다.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    private Long id;
    private String email;
    private String password;
    private String nickname;
    private String contact;
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    /**
     * 신규 사용자 생성을 위한 헬퍼 메서드.
     */
    public static User create(String email, String password, String nickname, String contact) {
        return User.builder()
                .email(email)
                .password(password)
                .nickname(nickname)
                .contact(contact)
                .createdAt(LocalDateTime.now())
                .build();
    }
}

