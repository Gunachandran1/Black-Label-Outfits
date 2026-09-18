package com.blacklabel.ecommerce.dto.response;

import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;

@Data
@Builder
public class OrderItemResponse {
    private String productName;
    private String sku;
    private String size;
    private String color;
    private String imageUrl;
    private BigDecimal unitPrice;
    private Integer quantity;
    private BigDecimal subtotal;
}
