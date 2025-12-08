package com.founder.match.profile.dto;

import java.util.List;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;

/**
 * FounderProfile 생성/수정을 위한 요청 DTO.
 */
@Data
public class FounderProfileRequest {

    @NotBlank
    private String role;

    @NotEmpty
    private List<@NotBlank @Size(max = 30) String> skills;

    @NotEmpty
    private List<@NotBlank @Size(max = 30) String> interests;

    @NotBlank
    @Size(max = 50)
    private String availability;

    @NotBlank
    @Size(max = 500)
    private String bio;
}

