package com.blacklabel.ecommerce.service.impl;
import com.blacklabel.ecommerce.dto.response.WishlistResponse;
import com.blacklabel.ecommerce.service.WishlistService;
import org.springframework.stereotype.Service;

@Service
public class WishlistServiceImpl implements WishlistService {
    @Override
    public WishlistResponse getByUser(Long userId) {
        return WishlistResponse.builder().build();
    }
    @Override
    public void addToWishlist(Long userId, Long productId) {}
    @Override
    public void removeFromWishlist(Long userId, Long productId) {}
    @Override
    public boolean isInWishlist(Long userId, Long productId) { return false; }
}
