package com.blacklabel.ecommerce.service;

import com.blacklabel.ecommerce.dto.request.AddToCartRequest;
import com.blacklabel.ecommerce.dto.request.UpdateCartRequest;
import com.blacklabel.ecommerce.dto.response.CartResponse;

public interface CartService {
    CartResponse getCart(Long userId);
    CartResponse addToCart(Long userId, AddToCartRequest request);
    CartResponse updateQuantity(Long userId, Long itemId, UpdateCartRequest request);
    CartResponse removeItem(Long userId, Long itemId);
    void clearCart(Long userId);
}
