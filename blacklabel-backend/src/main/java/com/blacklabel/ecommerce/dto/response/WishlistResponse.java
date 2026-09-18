package com.blacklabel.ecommerce.dto.response;
import lombok.Builder;
import lombok.Data;
import java.util.List;
@Data
@Builder
public class WishlistResponse {
    private Long id;
    private List<ProductSummaryResponse> items;
}
