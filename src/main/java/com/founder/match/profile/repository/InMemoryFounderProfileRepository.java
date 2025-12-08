package com.founder.match.profile.repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.stereotype.Repository;

import com.founder.match.profile.domain.FounderProfile;

/**
 * FounderProfile용 인메모리 저장소.
 */
@Repository
public class InMemoryFounderProfileRepository implements FounderProfileRepository {

    private final ConcurrentMap<Long, FounderProfile> storage = new ConcurrentHashMap<>();
    private final AtomicLong sequence = new AtomicLong(0L);

    @Override
    public FounderProfile save(FounderProfile profile) {
        if (profile.getId() == null) {
            long id = sequence.incrementAndGet();
            profile.setId(id);
        }
        storage.put(profile.getUserId(), profile);
        return profile;
    }

    @Override
    public Optional<FounderProfile> findByUserId(Long userId) {
        return Optional.ofNullable(storage.get(userId));
    }

    @Override
    public List<FounderProfile> findAll() {
        return new ArrayList<>(storage.values());
    }

    @Override
    public void deleteByUserId(Long userId) {
        storage.remove(userId);
    }
}

