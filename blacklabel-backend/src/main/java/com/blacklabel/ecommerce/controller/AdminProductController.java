package com.blacklabel.ecommerce.controller;
import com.blacklabel.ecommerce.dto.response.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/products")
public class AdminProductController {
    @PostMapping
    public ResponseEntity<ApiResponse<Void>> addProduct() {
        return ResponseEntity.ok(new ApiResponse<>(true, "Product created", null));
    }
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> updateProduct(@PathVariable Long id) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Product updated", null));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteProduct(@PathVariable Long id) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Product deleted", null));
    }
}
