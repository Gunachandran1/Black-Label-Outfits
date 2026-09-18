package com.blacklabel.ecommerce.service;

import com.blacklabel.ecommerce.dto.response.CategoryResponse;
import java.util.List;

public interface CategoryService {
    List<CategoryResponse> getAllCategories();
    CategoryResponse getBySlug(String slug);
}
