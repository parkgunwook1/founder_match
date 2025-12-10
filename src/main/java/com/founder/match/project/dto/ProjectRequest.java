package com.founder.match.project.dto;

import com.founder.match.project.domain.ProjectDomain;
import com.founder.match.project.domain.ProjectStage;
import com.founder.match.project.domain.RewardType;
import com.founder.match.project.domain.WorkStyle;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

/**
 * Project 생성 요청 DTO.
 */
@Data
public class ProjectRequest {

    @NotNull
    private Long ownerId;

    @NotBlank
    @Size(max = 100)
    private String name;

    @NotBlank
    @Size(max = 150)
    private String oneLineIntro;

    @NotBlank
    @Size(max = 2000)
    private String description;

    @NotNull
    private ProjectStage stage;

    @NotNull
    private ProjectDomain domain;

    @NotNull
    private WorkStyle workStyle;

    @NotNull
    private RewardType rewardType;

    @NotBlank
    @Size(max = 50)
    private String expectedDuration;
}
