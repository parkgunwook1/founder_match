package com.founder.match.profile.domain;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Founder(창업자) 상세 프로필 도메인.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FounderProfile {

    private Long id;
    private Long userId;
    private String role;
    private List<String> skills;
    private List<String> interests;
    private String availability;
    private String bio;
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
    @Builder.Default
    private LocalDateTime updatedAt = LocalDateTime.now();

    public static FounderProfile create(Long userId,
                                        String role,
                                        List<String> skills,
                                        List<String> interests,
                                        String availability,
                                        String bio) {
        LocalDateTime now = LocalDateTime.now();
        return FounderProfile.builder()
                .userId(userId)
                .role(role)
                .skills(skills)
                .interests(interests)
                .availability(availability)
                .bio(bio)
                .createdAt(now)
                .updatedAt(now)
                .build();
    }

    public void update(String role,
                       List<String> skills,
                       List<String> interests,
                       String availability,
                       String bio) {
        this.role = role;
        this.skills = skills;
        this.interests = interests;
        this.availability = availability;
        this.bio = bio;
        this.updatedAt = LocalDateTime.now();
    }
}

