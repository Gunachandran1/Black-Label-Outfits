package com.blacklabel.ecommerce.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateOrderRequest {
    @NotNull
    private Long shippingAddressId;
    
    @NotNull
    private String paymentMethod;
    
    private String notes;
}
