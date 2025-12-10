package com.founder.match.project.repository;

import java.util.List;
import java.util.Optional;

import com.founder.match.project.domain.Project;

/**
 * Project 저장소 인터페이스.
 */
public interface ProjectRepository {
    Project save(Project project);
    Optional<Project> findById(Long projectId);
    List<Project> findAll();
    void deleteById(Long projectId);
}
