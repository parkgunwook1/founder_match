package com.founder.match.profile.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.founder.match.profile.domain.FounderProfile;
import com.founder.match.profile.dto.FounderProfileRequest;
import com.founder.match.profile.repository.FounderProfileRepository;

import lombok.extern.slf4j.Slf4j;

/**
 * FounderProfile 도메인 서비스.
 */
@Service
@Slf4j
public class FounderProfileService {

    private final FounderProfileRepository profileRepository;

    public FounderProfileService(FounderProfileRepository profileRepository) {
        this.profileRepository = profileRepository;
    }

    public FounderProfile createProfile(Long userId, FounderProfileRequest request) {
        log.debug("프로필 생성 요청: userId={}", userId);
        profileRepository.findByUserId(userId).ifPresent(profile -> {
            log.warn("프로필 생성 실패 - 이미 존재: userId={}", userId);
            throw new IllegalArgumentException("이미 프로필이 존재합니다.");
        });

        FounderProfile profile = FounderProfile.create(
                userId,
                request.getRole(),
                request.getSkills(),
                request.getInterests(),
                request.getAvailability(),
                request.getBio()
        );

        FounderProfile saved = profileRepository.save(profile);
        log.info("프로필 생성 완료: userId={}, profileId={}", saved.getUserId(), saved.getId());
        return saved;
    }

    public FounderProfile updateProfile(Long userId, FounderProfileRequest request) {
        log.debug("프로필 수정 요청: userId={}", userId);
        FounderProfile profile = profileRepository.findByUserId(userId)
                .orElseThrow(() -> {
                    log.warn("프로필 수정 실패 - 존재하지 않음: userId={}", userId);
                    return new IllegalArgumentException("프로필을 찾을 수 없습니다.");
                });

        profile.update(
                request.getRole(),
                request.getSkills(),
                request.getInterests(),
                request.getAvailability(),
                request.getBio()
        );

        profileRepository.save(profile);
        log.info("프로필 수정 완료: userId={}, profileId={}", profile.getUserId(), profile.getId());
        return profile;
    }

    public FounderProfile getProfile(Long userId) {
        log.debug("프로필 조회 요청: userId={}", userId);
        return profileRepository.findByUserId(userId)
                .orElseThrow(() -> new IllegalArgumentException("프로필을 찾을 수 없습니다."));
    }

    public List<FounderProfile> getAllProfiles() {
        log.debug("전체 프로필 조회");
        return profileRepository.findAll();
    }

    public void deleteProfile(Long userId) {
        log.debug("프로필 삭제 요청: userId={}", userId);
        profileRepository.deleteByUserId(userId);
    }
}

