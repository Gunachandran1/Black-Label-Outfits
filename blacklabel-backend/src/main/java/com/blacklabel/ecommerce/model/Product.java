package com.blacklabel.ecommerce.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import com.blacklabel.ecommerce.model.enums.FitType;

@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product extends BaseEntity {

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String slug;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String fabricComposition;

    @Enumerated(EnumType.STRING)
    private FitType fitType;

    private String careInstructions;

    @Column(nullable = false)
    private BigDecimal basePrice;

    private BigDecimal discountPrice;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @Column(nullable = false)
    private Boolean isFeatured;

    @Column(nullable = false)
    private Boolean isActive;

    private Double averageRating = 0.0;
    private Integer reviewCount = 0;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductVariant> variants = new ArrayList<>();

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductImage> images = new ArrayList<>();
}
