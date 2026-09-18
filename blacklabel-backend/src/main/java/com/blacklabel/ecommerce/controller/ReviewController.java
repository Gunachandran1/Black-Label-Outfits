package com.blacklabel.ecommerce.controller;
import com.blacklabel.ecommerce.dto.request.ReviewRequest;
import com.blacklabel.ecommerce.dto.response.ApiResponse;
import com.blacklabel.ecommerce.dto.response.PagedResponse;
import com.blacklabel.ecommerce.dto.response.ReviewResponse;
import com.blacklabel.ecommerce.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewService reviewService;

    @GetMapping("/{productId}/reviews")
    public ResponseEntity<ApiResponse<PagedResponse<ReviewResponse>>> getReviews(
            @PathVariable Long productId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int limit) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Reviews fetched", reviewService.getByProduct(productId, PageRequest.of(page, limit))));
    }

    @PostMapping("/{productId}/reviews")
    public ResponseEntity<ApiResponse<ReviewResponse>> addReview(
            @PathVariable Long productId,
            @RequestBody ReviewRequest request) {
        // Assume user ID is 1L for simplicity in this generated code
        return ResponseEntity.ok(new ApiResponse<>(true, "Review added", reviewService.addReview(1L, productId, request)));
    }
}
