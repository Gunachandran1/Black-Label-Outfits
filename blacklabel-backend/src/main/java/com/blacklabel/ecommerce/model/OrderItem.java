package com.blacklabel.ecommerce.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import com.blacklabel.ecommerce.model.enums.ShirtSize;

@Entity
@Table(name = "order_items")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderItem extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_variant_id")
    private ProductVariant productVariant;

    private String productNameSnapshot;
    private String skuSnapshot;
    
    @Enumerated(EnumType.STRING)
    private ShirtSize sizeSnapshot;
    
    private String colorSnapshot;
    private String imageSnapshot;

    @Column(nullable = false)
    private BigDecimal unitPrice;

    @Column(nullable = false)
    private Integer quantity;

    @Column(nullable = false)
    private BigDecimal subtotal;
}
