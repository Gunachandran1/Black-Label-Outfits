package com.blacklabel.ecommerce.service.impl;

import com.blacklabel.ecommerce.dto.response.CategoryResponse;
import com.blacklabel.ecommerce.exception.ResourceNotFoundException;
import com.blacklabel.ecommerce.model.Category;
import com.blacklabel.ecommerce.repository.CategoryRepository;
import com.blacklabel.ecommerce.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;

    @Override
    public List<CategoryResponse> getAllCategories() {
        return categoryRepository.findByIsActiveTrue().stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    @Override
    public CategoryResponse getBySlug(String slug) {
        Category category = categoryRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
        return mapToResponse(category);
    }

    private CategoryResponse mapToResponse(Category category) {
        return CategoryResponse.builder()
                .id(category.getId())
                .name(category.getName())
                .slug(category.getSlug())
                .description(category.getDescription())
                .imageUrl(category.getImageUrl())
                .productCount(category.getSubCategories().size())
                .build();
    }
}
