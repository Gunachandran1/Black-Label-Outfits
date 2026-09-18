package com.blacklabel.ecommerce.dto.response;
import lombok.Builder;
import lombok.Data;
@Data
@Builder
public class AddressResponse {
    private Long id;
    private String fullName;
    private String streetAddress;
    private String city;
    private String state;
    private String postalCode;
    private String country;
    private String phone;
    private boolean isDefault;
}
