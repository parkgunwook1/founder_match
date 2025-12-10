package com.founder.match.project.api;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.founder.match.project.domain.Project;
import com.founder.match.project.domain.ProjectDomain;
import com.founder.match.project.domain.ProjectStage;
import com.founder.match.project.domain.RewardType;
import com.founder.match.project.domain.WorkStyle;
import com.founder.match.project.dto.ProjectRequest;
import com.founder.match.project.dto.ProjectResponse;
import com.founder.match.project.dto.ProjectUpdateRequest;
import com.founder.match.project.service.ProjectService;

import jakarta.validation.Valid;

/**
 * Project REST API.
 */
@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @PostMapping
    public ResponseEntity<ProjectResponse> createProject(@Valid @RequestBody ProjectRequest request) {
        Project created = projectService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ProjectResponse.from(created));
    }

    @PatchMapping("/{projectId}")
    public ResponseEntity<ProjectResponse> updateProject(@PathVariable Long projectId,
                                                         @Valid @RequestBody ProjectUpdateRequest request) {
        Project updated = projectService.update(projectId, request);
        return ResponseEntity.ok(ProjectResponse.from(updated));
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<ProjectResponse> getProject(@PathVariable Long projectId) {
        Project project = projectService.get(projectId);
        return ResponseEntity.ok(ProjectResponse.from(project));
    }

    @GetMapping
    public ResponseEntity<List<ProjectResponse>> getProjects(@RequestParam(required = false) ProjectStage stage,
                                                             @RequestParam(required = false) ProjectDomain domain,
                                                             @RequestParam(required = false) WorkStyle workStyle,
                                                             @RequestParam(required = false) RewardType rewardType,
                                                             @RequestParam(required = false) String keyword) {
        List<ProjectResponse> responses = projectService.getProjects(stage, domain, workStyle, rewardType, keyword)
                .stream()
                .map(ProjectResponse::from)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }

    @DeleteMapping("/{projectId}")
    public ResponseEntity<Void> deleteProject(@PathVariable Long projectId) {
        projectService.delete(projectId);
        return ResponseEntity.noContent().build();
    }
}
