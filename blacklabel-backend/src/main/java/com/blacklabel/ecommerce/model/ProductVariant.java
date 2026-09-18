package com.blacklabel.ecommerce.model;

import jakarta.persistence.*;
import lombok.*;
import com.blacklabel.ecommerce.model.enums.ShirtSize;
import java.math.BigDecimal;

@Entity
@Table(name = "product_variants")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductVariant extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(nullable = false, unique = true)
    private String sku;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ShirtSize size;

    @Column(nullable = false)
    private String colorName;

    private String colorHex;

    private BigDecimal priceAdjustment;

    @Column(nullable = false)
    private Integer stockQuantity;

    @Column(nullable = false)
    private Boolean isActive;
}
