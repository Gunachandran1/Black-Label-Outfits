package com.blacklabel.ecommerce.service;
import com.blacklabel.ecommerce.dto.request.AddressRequest;
import com.blacklabel.ecommerce.dto.response.AddressResponse;
import java.util.List;

public interface AddressService {
    List<AddressResponse> getByUser(Long userId);
    AddressResponse addAddress(Long userId, AddressRequest request);
    AddressResponse updateAddress(Long userId, Long addressId, AddressRequest request);
    void deleteAddress(Long userId, Long addressId);
    void setDefault(Long userId, Long addressId);
}
