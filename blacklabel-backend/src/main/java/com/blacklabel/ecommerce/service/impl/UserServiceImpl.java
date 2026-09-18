package com.blacklabel.ecommerce.service.impl;

import com.blacklabel.ecommerce.dto.response.UserResponse;
import com.blacklabel.ecommerce.exception.ResourceNotFoundException;
import com.blacklabel.ecommerce.model.User;
import com.blacklabel.ecommerce.repository.UserRepository;
import com.blacklabel.ecommerce.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public UserResponse getProfile(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
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
