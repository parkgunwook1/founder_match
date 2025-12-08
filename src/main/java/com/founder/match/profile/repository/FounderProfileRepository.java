package com.founder.match.profile.repository;

import java.util.List;
import java.util.Optional;

import com.founder.match.profile.domain.FounderProfile;

/**
 * FounderProfile 저장소 인터페이스.
 */
public interface FounderProfileRepository {
    FounderProfile save(FounderProfile profile);
    Optional<FounderProfile> findByUserId(Long userId);
    List<FounderProfile> findAll();
    void deleteByUserId(Long userId);
}

