package com.blacklabel.ecommerce.controller;

import com.blacklabel.ecommerce.dto.response.ApiResponse;
import com.blacklabel.ecommerce.dto.response.PagedResponse;
import com.blacklabel.ecommerce.dto.response.ProductResponse;
import com.blacklabel.ecommerce.dto.response.ProductSummaryResponse;
import com.blacklabel.ecommerce.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping
    public ResponseEntity<ApiResponse<PagedResponse<ProductSummaryResponse>>> getAllProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int limit) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Products fetched",
                productService.getAllProducts(PageRequest.of(page, limit))));
    }

    @GetMapping("/{slug}")
    public ResponseEntity<ApiResponse<ProductResponse>> getProductBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Product fetched", productService.getBySlug(slug)));
    }

    @GetMapping("/featured")
    public ResponseEntity<ApiResponse<List<ProductSummaryResponse>>> getFeatured() {
        return ResponseEntity.ok(new ApiResponse<>(true, "Featured products fetched", productService.getFeatured()));
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<PagedResponse<ProductSummaryResponse>>> searchProducts(
            @RequestParam String q,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int limit) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Search results",
                productService.search(q, PageRequest.of(page, limit))));
    }
}
