package com.blacklabel.ecommerce.service;

import com.blacklabel.ecommerce.dto.response.UserResponse;

public interface UserService {
    UserResponse getProfile(Long userId);
    // Add updateProfile if needed
}
