package com.blacklabel.ecommerce.controller;
import com.blacklabel.ecommerce.dto.response.ApiResponse;
import com.blacklabel.ecommerce.dto.response.DashboardStatsResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/dashboard")
public class AdminDashboardController {
    @GetMapping("/stats")
    public ResponseEntity<ApiResponse<DashboardStatsResponse>> getStats() {
        return ResponseEntity.ok(new ApiResponse<>(true, "Stats fetched", DashboardStatsResponse.builder().build()));
    }
}
