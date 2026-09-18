package com.blacklabel.ecommerce.service.impl;

import com.blacklabel.ecommerce.dto.response.PagedResponse;
import com.blacklabel.ecommerce.dto.response.ProductResponse;
import com.blacklabel.ecommerce.dto.response.ProductSummaryResponse;
import com.blacklabel.ecommerce.exception.ResourceNotFoundException;
import com.blacklabel.ecommerce.model.Product;
import com.blacklabel.ecommerce.repository.ProductRepository;
import com.blacklabel.ecommerce.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    @Override
    public PagedResponse<ProductSummaryResponse> getAllProducts(Pageable pageable) {
        Page<Product> page = productRepository.findByIsActiveTrue(pageable);
        return mapToPagedResponse(page);
    }

    @Override
    public ProductResponse getBySlug(String slug) {
        Product product = productRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .slug(product.getSlug())
                .description(product.getDescription())
                .basePrice(product.getBasePrice())
                .discountPrice(product.getDiscountPrice())
                .categoryName(product.getCategory() != null ? product.getCategory().getName() : null)
                .fitType(product.getFitType() != null ? product.getFitType().name() : null)
                .fabricComposition(product.getFabricComposition())
                .averageRating(product.getAverageRating())
                .reviewCount(product.getReviewCount())
                .isFeatured(product.getIsFeatured())
                .build();
    }

    @Override
    public List<ProductSummaryResponse> getFeatured() {
        return productRepository.findByIsFeaturedTrue().stream()
                .map(this::mapToSummary)
                .collect(Collectors.toList());
    }

    @Override
    public PagedResponse<ProductSummaryResponse> search(String query, Pageable pageable) {
        Page<Product> page = productRepository.search(query, pageable);
        return mapToPagedResponse(page);
    }

    private ProductSummaryResponse mapToSummary(Product p) {
        return ProductSummaryResponse.builder()
                .id(p.getId())
                .name(p.getName())
                .slug(p.getSlug())
                .basePrice(p.getBasePrice())
                .discountPrice(p.getDiscountPrice())
                .averageRating(p.getAverageRating())
                .reviewCount(p.getReviewCount())
                .categoryName(p.getCategory() != null ? p.getCategory().getName() : null)
                .build();
    }

    private PagedResponse<ProductSummaryResponse> mapToPagedResponse(Page<Product> page) {
        List<ProductSummaryResponse> content = page.getContent().stream()
                .map(this::mapToSummary).collect(Collectors.toList());
        return new PagedResponse<>(content, page.getNumber(), page.getSize(),
                page.getTotalElements(), page.getTotalPages(), page.isLast());
    }
}
