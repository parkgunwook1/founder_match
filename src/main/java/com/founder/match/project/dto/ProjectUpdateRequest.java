package com.founder.match.project.dto;

import com.founder.match.project.domain.ProjectDomain;
import com.founder.match.project.domain.ProjectStage;
import com.founder.match.project.domain.RewardType;
import com.founder.match.project.domain.WorkStyle;
import jakarta.validation.constraints.Size;
import lombok.Data;

/**
 * Project 부분 업데이트 요청 DTO.
 */
@Data
public class ProjectUpdateRequest {

    @Size(max = 100)
    private String name;

    @Size(max = 150)
    private String oneLineIntro;

    @Size(max = 2000)
    private String description;

    private ProjectStage stage;

    private ProjectDomain domain;

    private WorkStyle workStyle;

    private RewardType rewardType;

    @Size(max = 50)
    private String expectedDuration;
}
