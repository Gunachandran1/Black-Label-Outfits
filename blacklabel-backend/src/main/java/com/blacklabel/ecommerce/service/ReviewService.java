package com.blacklabel.ecommerce.service;
import com.blacklabel.ecommerce.dto.request.ReviewRequest;
import com.blacklabel.ecommerce.dto.response.PagedResponse;
import com.blacklabel.ecommerce.dto.response.ReviewResponse;
import org.springframework.data.domain.Pageable;

public interface ReviewService {
    PagedResponse<ReviewResponse> getByProduct(Long productId, Pageable pageable);
    ReviewResponse addReview(Long userId, Long productId, ReviewRequest request);
    double getAverageRating(Long productId);
}
