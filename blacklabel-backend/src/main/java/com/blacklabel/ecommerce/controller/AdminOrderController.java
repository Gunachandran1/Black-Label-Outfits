package com.blacklabel.ecommerce.controller;
import com.blacklabel.ecommerce.dto.response.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/orders")
public class AdminOrderController {
    @GetMapping
    public ResponseEntity<ApiResponse<Void>> getOrders() {
        return ResponseEntity.ok(new ApiResponse<>(true, "Orders fetched", null));
    }
    @PutMapping("/{id}/status")
    public ResponseEntity<ApiResponse<Void>> updateStatus(@PathVariable Long id) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Status updated", null));
    }
}
