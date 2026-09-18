package com.blacklabel.ecommerce.dto.response;

import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;

@Data
@Builder
public class ProductSummaryResponse {
    private Long id;
    private String name;
    private String slug;
    private BigDecimal basePrice;
    private BigDecimal discountPrice;
    private String primaryImageUrl;
    private Double averageRating;
    private Integer reviewCount;
    private String categoryName;
}
