package com.blacklabel.ecommerce.controller;

import com.blacklabel.ecommerce.dto.request.CreateOrderRequest;
import com.blacklabel.ecommerce.dto.response.ApiResponse;
import com.blacklabel.ecommerce.dto.response.OrderResponse;
import com.blacklabel.ecommerce.dto.response.PagedResponse;
import com.blacklabel.ecommerce.security.CustomUserDetails;
import com.blacklabel.ecommerce.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<ApiResponse<OrderResponse>> createOrder(@AuthenticationPrincipal CustomUserDetails user, @Valid @RequestBody CreateOrderRequest req) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Order created", orderService.createOrder(user.getUser().getId(), req)));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PagedResponse<OrderResponse>>> getOrders(@AuthenticationPrincipal CustomUserDetails user,
            @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int limit) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Orders fetched", orderService.getOrdersByUser(user.getUser().getId(), PageRequest.of(page, limit))));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<OrderResponse>> getOrder(@PathVariable Long id) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Order fetched", orderService.getOrderById(id)));
    }
}
