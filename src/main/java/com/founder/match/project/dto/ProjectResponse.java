package com.founder.match.project.dto;

import java.time.LocalDateTime;

import com.founder.match.project.domain.Project;
import com.founder.match.project.domain.ProjectDomain;
import com.founder.match.project.domain.ProjectStage;
import com.founder.match.project.domain.RewardType;
import com.founder.match.project.domain.WorkStyle;
import lombok.Builder;
import lombok.Getter;

/**
 * Project 조회 응답 DTO.
 */
@Getter
@Builder
public class ProjectResponse {

    private final Long id;
    private final Long ownerId;
    private final String name;
    private final String oneLineIntro;
    private final String description;
    private final ProjectStage stage;
    private final ProjectDomain domain;
    private final WorkStyle workStyle;
    private final RewardType rewardType;
    private final String expectedDuration;
    private final LocalDateTime createdAt;
    private final LocalDateTime updatedAt;

    public static ProjectResponse from(Project project) {
        return ProjectResponse.builder()
                .id(project.getId())
                .ownerId(project.getOwnerId())
                .name(project.getName())
                .oneLineIntro(project.getOneLineIntro())
                .description(project.getDescription())
                .stage(project.getStage())
                .domain(project.getDomain())
                .workStyle(project.getWorkStyle())
                .rewardType(project.getRewardType())
                .expectedDuration(project.getExpectedDuration())
                .createdAt(project.getCreatedAt())
                .updatedAt(project.getUpdatedAt())
                .build();
    }
}
