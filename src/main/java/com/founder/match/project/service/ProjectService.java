package com.founder.match.project.service;

import java.util.List;
import java.util.Locale;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.founder.match.project.domain.Project;
import com.founder.match.project.domain.ProjectDomain;
import com.founder.match.project.domain.ProjectStage;
import com.founder.match.project.domain.RewardType;
import com.founder.match.project.domain.WorkStyle;
import com.founder.match.project.dto.ProjectRequest;
import com.founder.match.project.dto.ProjectUpdateRequest;
import com.founder.match.project.repository.ProjectRepository;

import lombok.extern.slf4j.Slf4j;

/**
 * Project 도메인 서비스.
 */
@Service
@Slf4j
public class ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public Project create(ProjectRequest request) {
        log.debug("프로젝트 생성 요청: ownerId={}, name={}", request.getOwnerId(), request.getName());

        Project project = Project.create(
                request.getOwnerId(),
                request.getName(),
                request.getOneLineIntro(),
                request.getDescription(),
                request.getStage(),
                request.getDomain(),
                request.getWorkStyle(),
                request.getRewardType(),
                request.getExpectedDuration()
        );

        Project saved = projectRepository.save(project);
        log.info("프로젝트 생성 완료: id={}, ownerId={}", saved.getId(), saved.getOwnerId());
        return saved;
    }

    public Project update(Long projectId, ProjectUpdateRequest request) {
        log.debug("프로젝트 수정 요청: projectId={}", projectId);
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new IllegalArgumentException("프로젝트를 찾을 수 없습니다."));

        applyUpdates(project, request);
        projectRepository.save(project);
        log.info("프로젝트 수정 완료: id={}", project.getId());
        return project;
    }

    public Project get(Long projectId) {
        log.debug("프로젝트 조회 요청: projectId={}", projectId);
        return projectRepository.findById(projectId)
                .orElseThrow(() -> new IllegalArgumentException("프로젝트를 찾을 수 없습니다."));
    }

    public List<Project> getProjects(ProjectStage stage,
                                     ProjectDomain domain,
                                     WorkStyle workStyle,
                                     RewardType rewardType,
                                     String keyword) {
        log.debug("프로젝트 목록 조회 - filters stage={}, domain={}, workStyle={}, rewardType={}, keyword={}",
                stage, domain, workStyle, rewardType, keyword);

        String normalizedKeyword = keyword == null ? null : keyword.toLowerCase(Locale.ROOT).trim();

        return projectRepository.findAll().stream()
                .filter(p -> stage == null || Objects.equals(p.getStage(), stage))
                .filter(p -> domain == null || Objects.equals(p.getDomain(), domain))
                .filter(p -> workStyle == null || Objects.equals(p.getWorkStyle(), workStyle))
                .filter(p -> rewardType == null || Objects.equals(p.getRewardType(), rewardType))
                .filter(p -> {
                    if (normalizedKeyword == null || normalizedKeyword.isEmpty()) {
                        return true;
                    }
                    return containsIgnoreCase(p.getName(), normalizedKeyword)
                            || containsIgnoreCase(p.getOneLineIntro(), normalizedKeyword)
                            || containsIgnoreCase(p.getDescription(), normalizedKeyword);
                })
                .collect(Collectors.toList());
    }

    public void delete(Long projectId) {
        log.debug("프로젝트 삭제 요청: projectId={}", projectId);
        projectRepository.deleteById(projectId);
    }

    private void applyUpdates(Project project, ProjectUpdateRequest request) {
        if (request.getName() != null) {
            project.setName(request.getName());
        }
        if (request.getOneLineIntro() != null) {
            project.setOneLineIntro(request.getOneLineIntro());
        }
        if (request.getDescription() != null) {
            project.setDescription(request.getDescription());
        }
        if (request.getStage() != null) {
            project.setStage(request.getStage());
        }
        if (request.getDomain() != null) {
            project.setDomain(request.getDomain());
        }
        if (request.getWorkStyle() != null) {
            project.setWorkStyle(request.getWorkStyle());
        }
        if (request.getRewardType() != null) {
            project.setRewardType(request.getRewardType());
        }
        if (request.getExpectedDuration() != null) {
            project.setExpectedDuration(request.getExpectedDuration());
        }
        project.setUpdatedAt(java.time.LocalDateTime.now());
    }

    private boolean containsIgnoreCase(String text, String keyword) {
        if (text == null) {
            return false;
        }
        return text.toLowerCase(Locale.ROOT).contains(keyword);
    }
}
