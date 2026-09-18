package com.blacklabel.ecommerce.controller;
import com.blacklabel.ecommerce.dto.request.AddressRequest;
import com.blacklabel.ecommerce.dto.response.AddressResponse;
import com.blacklabel.ecommerce.dto.response.ApiResponse;
import com.blacklabel.ecommerce.service.AddressService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/users/addresses")
@RequiredArgsConstructor
public class AddressController {
    private final AddressService addressService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<AddressResponse>>> getAddresses() {
        return ResponseEntity.ok(new ApiResponse<>(true, "Addresses fetched", addressService.getByUser(1L)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<AddressResponse>> addAddress(@RequestBody AddressRequest request) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Address added", addressService.addAddress(1L, request)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<AddressResponse>> updateAddress(@PathVariable Long id, @RequestBody AddressRequest request) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Address updated", addressService.updateAddress(1L, id, request)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteAddress(@PathVariable Long id) {
        addressService.deleteAddress(1L, id);
        return ResponseEntity.ok(new ApiResponse<>(true, "Address deleted", null));
    }
}
