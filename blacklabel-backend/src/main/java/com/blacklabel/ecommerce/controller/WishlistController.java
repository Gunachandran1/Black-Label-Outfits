package com.blacklabel.ecommerce.controller;
import com.blacklabel.ecommerce.dto.response.ApiResponse;
import com.blacklabel.ecommerce.dto.response.WishlistResponse;
import com.blacklabel.ecommerce.service.WishlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/wishlist")
@RequiredArgsConstructor
public class WishlistController {
    private final WishlistService wishlistService;

    @GetMapping
    public ResponseEntity<ApiResponse<WishlistResponse>> getWishlist() {
        return ResponseEntity.ok(new ApiResponse<>(true, "Wishlist fetched", wishlistService.getByUser(1L)));
    }

    @PostMapping("/{productId}")
    public ResponseEntity<ApiResponse<Void>> addToWishlist(@PathVariable Long productId) {
        wishlistService.addToWishlist(1L, productId);
        return ResponseEntity.ok(new ApiResponse<>(true, "Added to wishlist", null));
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<ApiResponse<Void>> removeFromWishlist(@PathVariable Long productId) {
        wishlistService.removeFromWishlist(1L, productId);
        return ResponseEntity.ok(new ApiResponse<>(true, "Removed from wishlist", null));
    }
}
