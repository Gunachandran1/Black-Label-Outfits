package com.blacklabel.ecommerce.controller;

import com.blacklabel.ecommerce.dto.response.ApiResponse;
import com.blacklabel.ecommerce.dto.response.UserResponse;
import com.blacklabel.ecommerce.security.CustomUserDetails;
import com.blacklabel.ecommerce.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<UserResponse>> getProfile(@AuthenticationPrincipal CustomUserDetails userDetails) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Profile fetched", userService.getProfile(userDetails.getUser().getId())));
    }
}
