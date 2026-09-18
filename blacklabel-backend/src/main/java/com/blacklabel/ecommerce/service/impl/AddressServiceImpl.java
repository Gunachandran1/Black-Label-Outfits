package com.blacklabel.ecommerce.service.impl;
import com.blacklabel.ecommerce.dto.request.AddressRequest;
import com.blacklabel.ecommerce.dto.response.AddressResponse;
import com.blacklabel.ecommerce.service.AddressService;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AddressServiceImpl implements AddressService {
    @Override
    public List<AddressResponse> getByUser(Long userId) { return List.of(); }
    @Override
    public AddressResponse addAddress(Long userId, AddressRequest request) { return AddressResponse.builder().build(); }
    @Override
    public AddressResponse updateAddress(Long userId, Long addressId, AddressRequest request) { return AddressResponse.builder().build(); }
    @Override
    public void deleteAddress(Long userId, Long addressId) {}
    @Override
    public void setDefault(Long userId, Long addressId) {}
}
