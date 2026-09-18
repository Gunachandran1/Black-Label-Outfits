package com.blacklabel.ecommerce.dto.response;
import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;
import java.util.List;
@Data
@Builder
public class DashboardStatsResponse {
    private long totalOrders;
    private BigDecimal totalRevenue;
    private long totalProducts;
    private long totalCustomers;
    private List<OrderResponse> recentOrders;
}
