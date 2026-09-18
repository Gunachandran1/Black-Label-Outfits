package com.blacklabel.ecommerce.controller;

import com.blacklabel.ecommerce.dto.request.AddToCartRequest;
import com.blacklabel.ecommerce.dto.request.UpdateCartRequest;
import com.blacklabel.ecommerce.dto.response.ApiResponse;
import com.blacklabel.ecommerce.dto.response.CartResponse;
import com.blacklabel.ecommerce.security.CustomUserDetails;
import com.blacklabel.ecommerce.service.CartService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {
    private final CartService cartService;

    @GetMapping
    public ResponseEntity<ApiResponse<CartResponse>> getCart(@AuthenticationPrincipal CustomUserDetails user) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Cart fetched", cartService.getCart(user.getUser().getId())));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<CartResponse>> addToCart(@AuthenticationPrincipal CustomUserDetails user, @Valid @RequestBody AddToCartRequest req) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Added to cart", cartService.addToCart(user.getUser().getId(), req)));
    }

    @PutMapping("/{itemId}")
    public ResponseEntity<ApiResponse<CartResponse>> updateCart(@AuthenticationPrincipal CustomUserDetails user, @PathVariable Long itemId, @Valid @RequestBody UpdateCartRequest req) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Updated cart", cartService.updateQuantity(user.getUser().getId(), itemId, req)));
    }

    @DeleteMapping("/{itemId}")
    public ResponseEntity<ApiResponse<CartResponse>> deleteItem(@AuthenticationPrincipal CustomUserDetails user, @PathVariable Long itemId) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Removed from cart", cartService.removeItem(user.getUser().getId(), itemId)));
    }
}
