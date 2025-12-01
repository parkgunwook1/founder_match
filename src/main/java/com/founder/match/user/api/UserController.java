package com.founder.match.user.api;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.founder.match.user.domain.User;
import com.founder.match.user.dto.UserCreateRequest;
import com.founder.match.user.dto.UserLoginRequest;
import com.founder.match.user.dto.UserLoginResponse;
import com.founder.match.user.dto.UserResponse;
import com.founder.match.user.service.UserService;

import jakarta.validation.Valid;

/**
 * User REST API 컨트롤러.
 */
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<UserResponse> createUser(@Valid @RequestBody UserCreateRequest request) {
        User created = userService.createUser(request);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(UserResponse.from(created));
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUser(@PathVariable Long id) {
        User user = userService.getUser(id);
        return ResponseEntity.ok(UserResponse.from(user));
    }

    @GetMapping
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        List<UserResponse> responses = userService.getAllUsers()
                .stream()
                .map(UserResponse::from)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }

    @PostMapping("/login")
    public ResponseEntity<UserLoginResponse> login(@Valid @RequestBody UserLoginRequest request) {
        User user = userService.login(request);
        return ResponseEntity.ok(new UserLoginResponse(user.getId(), user.getNickname()));
    }
}

