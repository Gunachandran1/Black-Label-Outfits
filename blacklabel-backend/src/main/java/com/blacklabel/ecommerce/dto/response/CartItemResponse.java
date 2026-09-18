package com.blacklabel.ecommerce.dto.response;

import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;

@Data
@Builder
public class CartItemResponse {
    private Long id;
    private Long variantId;
    private String productName;
    private String productSlug;
    private String size;
    private String color;
    private String colorHex;
    private String imageUrl;
    private BigDecimal unitPrice;
    private Integer quantity;
    private BigDecimal subtotal;
}
