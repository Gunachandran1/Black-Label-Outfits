package com.blacklabel.ecommerce.dto.response;
import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;
@Data
@Builder
public class ReviewResponse {
    private Long id;
    private int rating;
    private String title;
    private String comment;
    private String reviewerName;
    private boolean verifiedPurchase;
    private LocalDateTime createdAt;
}
