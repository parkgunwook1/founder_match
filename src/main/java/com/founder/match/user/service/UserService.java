package com.founder.match.user.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.founder.match.user.domain.User;
import com.founder.match.user.dto.UserCreateRequest;
import com.founder.match.user.dto.UserLoginRequest;
import com.founder.match.user.repository.UserRepository;

import lombok.extern.slf4j.Slf4j;

/**
 * User 도메인 비즈니스 로직을 담당하는 서비스.
 */
@Service
@Slf4j
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * 회원 생성.
     */
    public User createUser(UserCreateRequest request) {
        log.debug("회원 생성 요청: email={}", request.getEmail());

        userRepository.findByEmail(request.getEmail())
                .ifPresent(user -> {
                    log.warn("회원 생성 실패 - 중복 이메일: {}", request.getEmail());
                    throw new IllegalArgumentException("이미 사용 중인 이메일입니다.");
                });

        User newUser = User.create(
                request.getEmail(),
                request.getPassword(),
                request.getNickname(),
                request.getContact()
        );

        User saved = userRepository.save(newUser);
        log.info("회원 생성 완료: id={}, email={}", saved.getId(), saved.getEmail());
        return saved;
    }

    /**
     * 단건 조회.
     */
    public User getUser(Long userId) {
        log.debug("사용자 단건 조회 요청: id={}", userId);
        return userRepository.findById(userId)
                .orElseThrow(() -> {
                    log.warn("사용자 조회 실패 - 존재하지 않음: id={}", userId);
                    return new IllegalArgumentException("사용자를 찾을 수 없습니다.");
                });
    }

    /**
     * 전체 조회.
     */
    public List<User> getAllUsers() {
        log.debug("전체 사용자 조회 요청");
        return userRepository.findAll();
    }

    /**
     * 단순 이메일/비밀번호 검사 방식의 로그인.
     */
    public User login(UserLoginRequest request) {
        log.debug("로그인 시도: email={}", request.getEmail());

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> {
                    log.warn("로그인 실패 - 이메일 없음: {}", request.getEmail());
                    return new IllegalArgumentException("이메일 또는 비밀번호가 올바르지 않습니다.");
                });

        if (!user.getPassword().equals(request.getPassword())) {
            log.warn("로그인 실패 - 비밀번호 불일치: {}", request.getEmail());
            throw new IllegalArgumentException("이메일 또는 비밀번호가 올바르지 않습니다.");
        }

        log.info("로그인 성공: userId={}, email={}", user.getId(), user.getEmail());
        return user;
    }
}

