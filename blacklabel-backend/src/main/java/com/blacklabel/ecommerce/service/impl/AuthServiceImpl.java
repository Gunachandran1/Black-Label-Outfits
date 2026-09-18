package com.blacklabel.ecommerce.service.impl;

import com.blacklabel.ecommerce.dto.request.LoginRequest;
import com.blacklabel.ecommerce.dto.request.RegisterRequest;
import com.blacklabel.ecommerce.dto.response.AuthResponse;
import com.blacklabel.ecommerce.dto.response.UserResponse;
import com.blacklabel.ecommerce.exception.DuplicateResourceException;
import com.blacklabel.ecommerce.exception.UnauthorizedException;
import com.blacklabel.ecommerce.model.User;
import com.blacklabel.ecommerce.model.enums.Role;
import com.blacklabel.ecommerce.repository.UserRepository;
import com.blacklabel.ecommerce.security.JwtTokenProvider;
import com.blacklabel.ecommerce.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;

    @Override
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateResourceException("Email already in use!");
        }

        User user = User.builder()
                .email(request.getEmail())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .phone(request.getPhone())
                .role(Role.ROLE_CUSTOMER)
                .isActive(true)
                .build();

        user = userRepository.save(user);

        return authenticateAndGenerateResponse(request.getEmail(), request.getPassword(), user);
    }

    @Override
    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UnauthorizedException("Invalid credentials"));
        return authenticateAndGenerateResponse(request.getEmail(), request.getPassword(), user);
    }

    @Override
    public AuthResponse refreshToken(String refreshToken) {
        if (tokenProvider.validateToken(refreshToken)) {
            String username = tokenProvider.getUsernameFromJWT(refreshToken);
            User user = userRepository.findByEmail(username)
                    .orElseThrow(() -> new UnauthorizedException("Invalid token"));
                    
            Authentication authentication = new UsernamePasswordAuthenticationToken(user.getEmail(), null, null);
            String newAccessToken = tokenProvider.generateToken(authentication);
            
            return AuthResponse.builder()
                    .accessToken(newAccessToken)
                    .refreshToken(refreshToken)
                    .user(mapToUserResponse(user))
                    .build();
        }
        throw new UnauthorizedException("Invalid refresh token");
    }
    
    private AuthResponse authenticateAndGenerateResponse(String email, String password, User user) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, password));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.generateToken(authentication);
        String refreshToken = tokenProvider.generateRefreshToken(authentication);

        return AuthResponse.builder()
                .accessToken(jwt)
                .refreshToken(refreshToken)
                .user(mapToUserResponse(user))
                .build();
    }
    
    private UserResponse mapToUserResponse(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .phone(user.getPhone())
                .role(user.getRole().name())
                .build();
    }
}
