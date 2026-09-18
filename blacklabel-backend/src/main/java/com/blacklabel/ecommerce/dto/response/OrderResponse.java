package com.blacklabel.ecommerce.dto.response;

import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class OrderResponse {
    private Long id;
    private String orderNumber;
    private String status;
    private String paymentStatus;
    private List<OrderItemResponse> items;
    private BigDecimal subtotal;
    private BigDecimal shipping;
    private BigDecimal tax;
    private BigDecimal total;
    private Object shippingAddress; // Will be JSON mapped
    private LocalDateTime createdAt;
}
