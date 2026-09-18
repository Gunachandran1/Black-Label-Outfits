package com.blacklabel.ecommerce.controller;

import com.blacklabel.ecommerce.dto.response.ApiResponse;
import com.blacklabel.ecommerce.dto.response.CategoryResponse;
import com.blacklabel.ecommerce.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<CategoryResponse>>> getAll() {
        return ResponseEntity.ok(new ApiResponse<>(true, "Categories fetched", categoryService.getAllCategories()));
    }

    @GetMapping("/{slug}")
    public ResponseEntity<ApiResponse<CategoryResponse>> getBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Category fetched", categoryService.getBySlug(slug)));
    }
}
