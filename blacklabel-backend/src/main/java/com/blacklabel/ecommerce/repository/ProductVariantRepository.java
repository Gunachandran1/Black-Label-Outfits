package com.blacklabel.ecommerce.repository;

import com.blacklabel.ecommerce.model.ProductVariant;
import com.blacklabel.ecommerce.model.enums.ShirtSize;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductVariantRepository extends JpaRepository<ProductVariant, Long> {
    List<ProductVariant> findByProductId(Long productId);
    Optional<ProductVariant> findByProductIdAndSizeAndColorName(Long productId, ShirtSize size, String colorName);
    Optional<ProductVariant> findBySku(String sku);
}
