package com.blacklabel.ecommerce.model;

import jakarta.persistence.*;
import lombok.*;
import com.blacklabel.ecommerce.model.enums.OrderStatus;
import com.blacklabel.ecommerce.model.enums.PaymentStatus;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Order extends BaseEntity {

    @Column(nullable = false, unique = true)
    private String orderNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(columnDefinition = "TEXT")
    private String shippingAddressSnapshot;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OrderStatus orderStatus;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PaymentStatus paymentStatus;

    private String paymentMethod;

    @Column(nullable = false)
    private BigDecimal subtotal;

    @Column(nullable = false)
    private BigDecimal shippingFee;

    @Column(nullable = false)
    private BigDecimal taxAmount;

    @Column(nullable = false)
    private BigDecimal discountAmount;

    @Column(nullable = false)
    private BigDecimal totalAmount;

    private String trackingNumber;
    
    private String notes;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> items = new ArrayList<>();
}
