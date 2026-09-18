package com.blacklabel.ecommerce.service.impl;
import com.blacklabel.ecommerce.dto.request.ReviewRequest;
import com.blacklabel.ecommerce.dto.response.PagedResponse;
import com.blacklabel.ecommerce.dto.response.ReviewResponse;
import com.blacklabel.ecommerce.service.ReviewService;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ReviewServiceImpl implements ReviewService {
    @Override
    public PagedResponse<ReviewResponse> getByProduct(Long productId, Pageable pageable) {
        return new PagedResponse<>();
    }
    @Override
    public ReviewResponse addReview(Long userId, Long productId, ReviewRequest request) {
        return ReviewResponse.builder().build();
    }
    @Override
    public double getAverageRating(Long productId) {
        return 0.0;
    }
}
