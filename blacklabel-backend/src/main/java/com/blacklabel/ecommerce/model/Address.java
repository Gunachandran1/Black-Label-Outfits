package com.blacklabel.ecommerce.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "addresses")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Address extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String recipientName;
    private String phone;
    private String streetLine1;
    private String streetLine2;
    private String city;
    private String state;
    private String postalCode;
    private String country;
    
    @Column(nullable = false)
    private Boolean isDefault;
}
