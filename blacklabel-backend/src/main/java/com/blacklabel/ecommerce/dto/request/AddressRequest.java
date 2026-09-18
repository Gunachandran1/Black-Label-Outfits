package com.blacklabel.ecommerce.dto.request;
import lombok.Data;
@Data
public class AddressRequest {
    private String fullName;
    private String streetAddress;
    private String city;
    private String state;
    private String postalCode;
    private String country;
    private String phone;
    private boolean isDefault;
}
