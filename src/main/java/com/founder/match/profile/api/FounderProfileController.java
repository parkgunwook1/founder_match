package com.founder.match.profile.api;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.founder.match.profile.domain.FounderProfile;
import com.founder.match.profile.dto.FounderProfileRequest;
import com.founder.match.profile.dto.FounderProfileResponse;
import com.founder.match.profile.service.FounderProfileService;

import jakarta.validation.Valid;

/**
 * FounderProfile REST API.
 */
@RestController
@RequestMapping("/api")
public class FounderProfileController {

    private final FounderProfileService profileService;

    public FounderProfileController(FounderProfileService profileService) {
        this.profileService = profileService;
    }

    @PostMapping("/users/{userId}/profile")
    public ResponseEntity<FounderProfileResponse> createProfile(@PathVariable Long userId,
                                                                @Valid @RequestBody FounderProfileRequest request) {
        FounderProfile created = profileService.createProfile(userId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(FounderProfileResponse.from(created));
    }

    @PutMapping("/users/{userId}/profile")
    public ResponseEntity<FounderProfileResponse> updateProfile(@PathVariable Long userId,
                                                                @Valid @RequestBody FounderProfileRequest request) {
        FounderProfile updated = profileService.updateProfile(userId, request);
        return ResponseEntity.ok(FounderProfileResponse.from(updated));
    }

    @GetMapping("/users/{userId}/profile")
    public ResponseEntity<FounderProfileResponse> getProfile(@PathVariable Long userId) {
        FounderProfile profile = profileService.getProfile(userId);
        return ResponseEntity.ok(FounderProfileResponse.from(profile));
    }

    @DeleteMapping("/users/{userId}/profile")
    public ResponseEntity<Void> deleteProfile(@PathVariable Long userId) {
        profileService.deleteProfile(userId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/profiles")
    public ResponseEntity<List<FounderProfileResponse>> getAllProfiles() {
        List<FounderProfileResponse> responses = profileService.getAllProfiles()
                .stream()
                .map(FounderProfileResponse::from)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }
}

