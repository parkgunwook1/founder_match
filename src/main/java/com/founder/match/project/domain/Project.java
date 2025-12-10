package com.founder.match.project.domain;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Project(Startup) 도메인 모델.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Project {

    private Long id;
    private Long ownerId;
    private String name;
    private String oneLineIntro;
    private String description;
    private ProjectStage stage;
    private ProjectDomain domain;
    private WorkStyle workStyle;
    private RewardType rewardType;
    private String expectedDuration;
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
    @Builder.Default
    private LocalDateTime updatedAt = LocalDateTime.now();

    public static Project create(Long ownerId,
                                 String name,
                                 String oneLineIntro,
                                 String description,
                                 ProjectStage stage,
                                 ProjectDomain domain,
                                 WorkStyle workStyle,
                                 RewardType rewardType,
                                 String expectedDuration) {
        LocalDateTime now = LocalDateTime.now();
        return Project.builder()
                .ownerId(ownerId)
                .name(name)
                .oneLineIntro(oneLineIntro)
                .description(description)
                .stage(stage)
                .domain(domain)
                .workStyle(workStyle)
                .rewardType(rewardType)
                .expectedDuration(expectedDuration)
                .createdAt(now)
                .updatedAt(now)
                .build();
    }

    public void update(String name,
                       String oneLineIntro,
                       String description,
                       ProjectStage stage,
                       ProjectDomain domain,
                       WorkStyle workStyle,
                       RewardType rewardType,
                       String expectedDuration) {
        this.name = name;
        this.oneLineIntro = oneLineIntro;
        this.description = description;
        this.stage = stage;
        this.domain = domain;
        this.workStyle = workStyle;
        this.rewardType = rewardType;
        this.expectedDuration = expectedDuration;
        this.updatedAt = LocalDateTime.now();
    }
}
