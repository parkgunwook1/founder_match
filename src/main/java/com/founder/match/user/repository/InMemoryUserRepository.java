package com.founder.match.user.repository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.stereotype.Repository;

import com.founder.match.user.domain.User;

/**
 * 스레드 안전한 인메모리 UserRepository 구현체.
 */
@Repository
public class InMemoryUserRepository implements UserRepository {

    private final ConcurrentMap<Long, User> storage = new ConcurrentHashMap<>();
    private final AtomicLong sequence = new AtomicLong(0L);

    @Override
    public User save(User user) {
        if (user.getId() == null) {
            long id = sequence.incrementAndGet();
            user.setId(id);
            if (user.getCreatedAt() == null) {
                user.setCreatedAt(LocalDateTime.now());
            }
        }
        storage.put(user.getId(), user);
        return user;
    }

    @Override
    public Optional<User> findById(Long id) {
        return Optional.ofNullable(storage.get(id));
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return storage.values().stream()
                .filter(user -> user.getEmail().equalsIgnoreCase(email))
                .findFirst();
    }

    @Override
    public List<User> findAll() {
        return new ArrayList<>(storage.values());
    }
}

