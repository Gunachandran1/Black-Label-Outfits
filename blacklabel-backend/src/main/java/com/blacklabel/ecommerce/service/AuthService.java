package com.blacklabel.ecommerce.service;

import com.blacklabel.ecommerce.dto.request.LoginRequest;
import com.blacklabel.ecommerce.dto.request.RegisterRequest;
import com.blacklabel.ecommerce.dto.response.AuthResponse;

public interface AuthService {
    AuthResponse register(RegisterRequest request);
    AuthResponse login(LoginRequest request);
    AuthResponse refreshToken(String refreshToken);
}
