package com.founder.match.profile.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.founder.match.profile.domain.FounderProfile;
import lombok.Builder;
import lombok.Getter;

/**
 * FounderProfile 조회 응답 DTO.
 */
@Getter
@Builder
public class FounderProfileResponse {

    private final Long id;
    private final Long userId;
    private final String role;
    private final List<String> skills;
    private final List<String> interests;
    private final String availability;
    private final String bio;
    private final LocalDateTime createdAt;
    private final LocalDateTime updatedAt;

    public static FounderProfileResponse from(FounderProfile profile) {
        return FounderProfileResponse.builder()
                .id(profile.getId())
                .userId(profile.getUserId())
                .role(profile.getRole())
                .skills(profile.getSkills())
                .interests(profile.getInterests())
                .availability(profile.getAvailability())
                .bio(profile.getBio())
                .createdAt(profile.getCreatedAt())
                .updatedAt(profile.getUpdatedAt())
                .build();
    }
}

