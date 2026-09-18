package com.blacklabel.ecommerce.dto.response;

import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
public class ProductResponse {
    private Long id;
    private String name;
    private String slug;
    private String description;
    private BigDecimal basePrice;
    private BigDecimal discountPrice;
    private String categoryName;
    private String fitType;
    private String fabricComposition;
    private Double averageRating;
    private Integer reviewCount;
    private List<ProductImageResponse> images;
    private List<ProductVariantResponse> variants;
    private Boolean isFeatured;
}
