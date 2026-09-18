package com.blacklabel.ecommerce.service;

import com.blacklabel.ecommerce.dto.request.CreateOrderRequest;
import com.blacklabel.ecommerce.dto.response.OrderResponse;
import com.blacklabel.ecommerce.dto.response.PagedResponse;
import org.springframework.data.domain.Pageable;

public interface OrderService {
    OrderResponse createOrder(Long userId, CreateOrderRequest request);
    PagedResponse<OrderResponse> getOrdersByUser(Long userId, Pageable pageable);
    OrderResponse getOrderById(Long orderId);
}
