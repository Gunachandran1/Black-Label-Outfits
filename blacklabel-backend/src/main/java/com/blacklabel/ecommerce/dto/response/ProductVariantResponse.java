package com.blacklabel.ecommerce.dto.response;

import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;

@Data
@Builder
public class ProductVariantResponse {
    private Long id;
    private String sku;
    private String size;
    private String colorName;
    private String colorHex;
    private BigDecimal priceAdjustment;
    private Integer stockQuantity;
}
