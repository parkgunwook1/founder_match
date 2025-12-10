package com.founder.match.project.repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.stereotype.Repository;

import com.founder.match.project.domain.Project;

/**
 * Project용 인메모리 저장소.
 */
@Repository
public class InMemoryProjectRepository implements ProjectRepository {

    private final ConcurrentMap<Long, Project> storage = new ConcurrentHashMap<>();
    private final AtomicLong sequence = new AtomicLong(0L);

    @Override
    public Project save(Project project) {
        if (project.getId() == null) {
            long id = sequence.incrementAndGet();
            project.setId(id);
        }
        storage.put(project.getId(), project);
        return project;
    }

    @Override
    public Optional<Project> findById(Long projectId) {
        return Optional.ofNullable(storage.get(projectId));
    }

    @Override
    public List<Project> findAll() {
        return new ArrayList<>(storage.values());
    }

    @Override
    public void deleteById(Long projectId) {
        storage.remove(projectId);
    }
}
