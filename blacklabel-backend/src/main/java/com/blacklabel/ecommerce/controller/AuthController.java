package com.blacklabel.ecommerce.controller;

import com.blacklabel.ecommerce.dto.request.LoginRequest;
import com.blacklabel.ecommerce.dto.request.RegisterRequest;
import com.blacklabel.ecommerce.dto.response.ApiResponse;
import com.blacklabel.ecommerce.dto.response.AuthResponse;
import com.blacklabel.ecommerce.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AuthResponse>> register(@Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.ok(new ApiResponse<>(true, "User registered successfully", authService.register(request)));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Logged in successfully", authService.login(request)));
    }

    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<AuthResponse>> refresh(@RequestParam String token) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Token refreshed", authService.refreshToken(token)));
    }
}
