package com.founder.match.user.repository;

import java.util.List;
import java.util.Optional;

import com.founder.match.user.domain.User;

/**
 * User 저장소 인터페이스.
 * 지금은 인메모리 구현을 사용하지만, 추후 JPA로 교체할 예정이다.
 */
public interface UserRepository {
    User save(User user);
    Optional<User> findById(Long id);
    Optional<User> findByEmail(String email);
    List<User> findAll();
}

