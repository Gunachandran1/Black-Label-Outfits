package com.blacklabel.ecommerce.dto.request;

import jakarta.validation.constraints.Min;
import lombok.Data;

@Data
public class UpdateCartRequest {
    @Min(1)
    private Integer quantity;
}
