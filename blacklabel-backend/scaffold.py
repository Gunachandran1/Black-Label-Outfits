import os

base_dir = r"e:\Black Label\blacklabel-backend\src\main\java\com\blacklabel\ecommerce"

def write_file(path, content):
    full_path = os.path.join(base_dir, path)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, "w") as f:
        f.write(content)

# DTOs
write_file("dto/request/AddressRequest.java", """package com.blacklabel.ecommerce.dto.request;
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
""")

write_file("dto/request/ReviewRequest.java", """package com.blacklabel.ecommerce.dto.request;
import lombok.Data;
@Data
public class ReviewRequest {
    private int rating;
    private String title;
    private String comment;
}
""")

write_file("dto/response/AddressResponse.java", """package com.blacklabel.ecommerce.dto.response;
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
""")

write_file("dto/response/ReviewResponse.java", """package com.blacklabel.ecommerce.dto.response;
import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;
@Data
@Builder
public class ReviewResponse {
    private Long id;
    private int rating;
    private String title;
    private String comment;
    private String reviewerName;
    private boolean verifiedPurchase;
    private LocalDateTime createdAt;
}
""")

write_file("dto/response/WishlistResponse.java", """package com.blacklabel.ecommerce.dto.response;
import lombok.Builder;
import lombok.Data;
import java.util.List;
@Data
@Builder
public class WishlistResponse {
    private Long id;
    private List<ProductSummaryResponse> items;
}
""")

write_file("dto/response/DashboardStatsResponse.java", """package com.blacklabel.ecommerce.dto.response;
import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;
import java.util.List;
@Data
@Builder
public class DashboardStatsResponse {
    private long totalOrders;
    private BigDecimal totalRevenue;
    private long totalProducts;
    private long totalCustomers;
    private List<OrderResponse> recentOrders;
}
""")

# Exceptions
write_file("exception/InsufficientStockException.java", """package com.blacklabel.ecommerce.exception;
public class InsufficientStockException extends RuntimeException {
    public InsufficientStockException(String message) {
        super(message);
    }
}
""")

write_file("exception/DuplicateResourceException.java", """package com.blacklabel.ecommerce.exception;
public class DuplicateResourceException extends RuntimeException {
    public DuplicateResourceException(String message) {
        super(message);
    }
}
""")

# Controllers
write_file("controller/ReviewController.java", """package com.blacklabel.ecommerce.controller;
import com.blacklabel.ecommerce.dto.request.ReviewRequest;
import com.blacklabel.ecommerce.dto.response.ApiResponse;
import com.blacklabel.ecommerce.dto.response.PagedResponse;
import com.blacklabel.ecommerce.dto.response.ReviewResponse;
import com.blacklabel.ecommerce.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewService reviewService;

    @GetMapping("/{productId}/reviews")
    public ResponseEntity<ApiResponse<PagedResponse<ReviewResponse>>> getReviews(
            @PathVariable Long productId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int limit) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Reviews fetched", reviewService.getByProduct(productId, PageRequest.of(page, limit))));
    }

    @PostMapping("/{productId}/reviews")
    public ResponseEntity<ApiResponse<ReviewResponse>> addReview(
            @PathVariable Long productId,
            @RequestBody ReviewRequest request) {
        // Assume user ID is 1L for simplicity in this generated code
        return ResponseEntity.ok(new ApiResponse<>(true, "Review added", reviewService.addReview(1L, productId, request)));
    }
}
""")

write_file("controller/WishlistController.java", """package com.blacklabel.ecommerce.controller;
import com.blacklabel.ecommerce.dto.response.ApiResponse;
import com.blacklabel.ecommerce.dto.response.WishlistResponse;
import com.blacklabel.ecommerce.service.WishlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/wishlist")
@RequiredArgsConstructor
public class WishlistController {
    private final WishlistService wishlistService;

    @GetMapping
    public ResponseEntity<ApiResponse<WishlistResponse>> getWishlist() {
        return ResponseEntity.ok(new ApiResponse<>(true, "Wishlist fetched", wishlistService.getByUser(1L)));
    }

    @PostMapping("/{productId}")
    public ResponseEntity<ApiResponse<Void>> addToWishlist(@PathVariable Long productId) {
        wishlistService.addToWishlist(1L, productId);
        return ResponseEntity.ok(new ApiResponse<>(true, "Added to wishlist", null));
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<ApiResponse<Void>> removeFromWishlist(@PathVariable Long productId) {
        wishlistService.removeFromWishlist(1L, productId);
        return ResponseEntity.ok(new ApiResponse<>(true, "Removed from wishlist", null));
    }
}
""")

write_file("controller/AddressController.java", """package com.blacklabel.ecommerce.controller;
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
""")

write_file("controller/AdminProductController.java", """package com.blacklabel.ecommerce.controller;
import com.blacklabel.ecommerce.dto.response.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/products")
public class AdminProductController {
    @PostMapping
    public ResponseEntity<ApiResponse<Void>> addProduct() {
        return ResponseEntity.ok(new ApiResponse<>(true, "Product created", null));
    }
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> updateProduct(@PathVariable Long id) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Product updated", null));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteProduct(@PathVariable Long id) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Product deleted", null));
    }
}
""")

write_file("controller/AdminOrderController.java", """package com.blacklabel.ecommerce.controller;
import com.blacklabel.ecommerce.dto.response.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/orders")
public class AdminOrderController {
    @GetMapping
    public ResponseEntity<ApiResponse<Void>> getOrders() {
        return ResponseEntity.ok(new ApiResponse<>(true, "Orders fetched", null));
    }
    @PutMapping("/{id}/status")
    public ResponseEntity<ApiResponse<Void>> updateStatus(@PathVariable Long id) {
        return ResponseEntity.ok(new ApiResponse<>(true, "Status updated", null));
    }
}
""")

write_file("controller/AdminDashboardController.java", """package com.blacklabel.ecommerce.controller;
import com.blacklabel.ecommerce.dto.response.ApiResponse;
import com.blacklabel.ecommerce.dto.response.DashboardStatsResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/dashboard")
public class AdminDashboardController {
    @GetMapping("/stats")
    public ResponseEntity<ApiResponse<DashboardStatsResponse>> getStats() {
        return ResponseEntity.ok(new ApiResponse<>(true, "Stats fetched", DashboardStatsResponse.builder().build()));
    }
}
""")

# Services (Interfaces)
write_file("service/ReviewService.java", """package com.blacklabel.ecommerce.service;
import com.blacklabel.ecommerce.dto.request.ReviewRequest;
import com.blacklabel.ecommerce.dto.response.PagedResponse;
import com.blacklabel.ecommerce.dto.response.ReviewResponse;
import org.springframework.data.domain.Pageable;

public interface ReviewService {
    PagedResponse<ReviewResponse> getByProduct(Long productId, Pageable pageable);
    ReviewResponse addReview(Long userId, Long productId, ReviewRequest request);
    double getAverageRating(Long productId);
}
""")

write_file("service/WishlistService.java", """package com.blacklabel.ecommerce.service;
import com.blacklabel.ecommerce.dto.response.WishlistResponse;

public interface WishlistService {
    WishlistResponse getByUser(Long userId);
    void addToWishlist(Long userId, Long productId);
    void removeFromWishlist(Long userId, Long productId);
    boolean isInWishlist(Long userId, Long productId);
}
""")

write_file("service/AddressService.java", """package com.blacklabel.ecommerce.service;
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
""")

# Services (Impl)
write_file("service/impl/ReviewServiceImpl.java", """package com.blacklabel.ecommerce.service.impl;
import com.blacklabel.ecommerce.dto.request.ReviewRequest;
import com.blacklabel.ecommerce.dto.response.PagedResponse;
import com.blacklabel.ecommerce.dto.response.ReviewResponse;
import com.blacklabel.ecommerce.service.ReviewService;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ReviewServiceImpl implements ReviewService {
    @Override
    public PagedResponse<ReviewResponse> getByProduct(Long productId, Pageable pageable) {
        return new PagedResponse<>();
    }
    @Override
    public ReviewResponse addReview(Long userId, Long productId, ReviewRequest request) {
        return ReviewResponse.builder().build();
    }
    @Override
    public double getAverageRating(Long productId) {
        return 0.0;
    }
}
""")

write_file("service/impl/WishlistServiceImpl.java", """package com.blacklabel.ecommerce.service.impl;
import com.blacklabel.ecommerce.dto.response.WishlistResponse;
import com.blacklabel.ecommerce.service.WishlistService;
import org.springframework.stereotype.Service;

@Service
public class WishlistServiceImpl implements WishlistService {
    @Override
    public WishlistResponse getByUser(Long userId) {
        return WishlistResponse.builder().build();
    }
    @Override
    public void addToWishlist(Long userId, Long productId) {}
    @Override
    public void removeFromWishlist(Long userId, Long productId) {}
    @Override
    public boolean isInWishlist(Long userId, Long productId) { return false; }
}
""")

write_file("service/impl/AddressServiceImpl.java", """package com.blacklabel.ecommerce.service.impl;
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
""")
