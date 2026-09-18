package com.blacklabel.ecommerce.service;
import com.blacklabel.ecommerce.dto.response.WishlistResponse;

public interface WishlistService {
    WishlistResponse getByUser(Long userId);
    void addToWishlist(Long userId, Long productId);
    void removeFromWishlist(Long userId, Long productId);
    boolean isInWishlist(Long userId, Long productId);
}
