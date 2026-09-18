package com.blacklabel.ecommerce.service;

import com.blacklabel.ecommerce.dto.response.PagedResponse;
import com.blacklabel.ecommerce.dto.response.ProductResponse;
import com.blacklabel.ecommerce.dto.response.ProductSummaryResponse;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ProductService {
    PagedResponse<ProductSummaryResponse> getAllProducts(Pageable pageable);
    ProductResponse getBySlug(String slug);
    List<ProductSummaryResponse> getFeatured();
    PagedResponse<ProductSummaryResponse> search(String query, Pageable pageable);
}
