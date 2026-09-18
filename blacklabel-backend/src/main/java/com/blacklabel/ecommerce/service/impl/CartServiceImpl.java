package com.blacklabel.ecommerce.service.impl;

import com.blacklabel.ecommerce.dto.request.AddToCartRequest;
import com.blacklabel.ecommerce.dto.request.UpdateCartRequest;
import com.blacklabel.ecommerce.dto.response.CartItemResponse;
import com.blacklabel.ecommerce.dto.response.CartResponse;
import com.blacklabel.ecommerce.exception.BadRequestException;
import com.blacklabel.ecommerce.exception.InsufficientStockException;
import com.blacklabel.ecommerce.exception.ResourceNotFoundException;
import com.blacklabel.ecommerce.model.*;
import com.blacklabel.ecommerce.repository.*;
import com.blacklabel.ecommerce.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductVariantRepository productVariantRepository;
    private final UserRepository userRepository;
    private final ProductImageRepository productImageRepository;

    @Override
    @Transactional
    public CartResponse getCart(Long userId) {
        Cart cart = getOrCreateCart(userId);
        return mapCartToResponse(cart);
    }

    @Override
    @Transactional
    public CartResponse addToCart(Long userId, AddToCartRequest request) {
        ProductVariant variant = productVariantRepository.findById(request.getProductVariantId())
                .orElseThrow(() -> new ResourceNotFoundException("Product Variant not found"));

        if (variant.getStockQuantity() < request.getQuantity()) {
            throw new InsufficientStockException("Not enough stock available");
        }

        Cart cart = getOrCreateCart(userId);

        Optional<CartItem> existingItemOpt = cart.getItems().stream()
                .filter(item -> item.getProductVariant().getId().equals(variant.getId()))
                .findFirst();

        if (existingItemOpt.isPresent()) {
            CartItem existingItem = existingItemOpt.get();
            int newQuantity = existingItem.getQuantity() + request.getQuantity();
            if (variant.getStockQuantity() < newQuantity) {
                throw new InsufficientStockException("Not enough stock available for the requested quantity");
            }
            existingItem.setQuantity(newQuantity);
            cartItemRepository.save(existingItem);
        } else {
            CartItem newItem = CartItem.builder()
                    .cart(cart)
                    .productVariant(variant)
                    .quantity(request.getQuantity())
                    .build();
            cart.getItems().add(newItem);
            cartItemRepository.save(newItem);
        }

        return mapCartToResponse(cartRepository.save(cart));
    }

    @Override
    @Transactional
    public CartResponse updateQuantity(Long userId, Long itemId, UpdateCartRequest request) {
        Cart cart = getOrCreateCart(userId);

        CartItem cartItem = cart.getItems().stream()
                .filter(item -> item.getId().equals(itemId))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Cart item not found in user's cart"));

        if (cartItem.getProductVariant().getStockQuantity() < request.getQuantity()) {
            throw new InsufficientStockException("Not enough stock available");
        }

        cartItem.setQuantity(request.getQuantity());
        cartItemRepository.save(cartItem);

        return mapCartToResponse(cart);
    }

    @Override
    @Transactional
    public CartResponse removeItem(Long userId, Long itemId) {
        Cart cart = getOrCreateCart(userId);

        CartItem cartItem = cart.getItems().stream()
                .filter(item -> item.getId().equals(itemId))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Cart item not found in user's cart"));

        cart.getItems().remove(cartItem);
        cartItemRepository.delete(cartItem);

        return mapCartToResponse(cart);
    }

    @Override
    @Transactional
    public void clearCart(Long userId) {
        Cart cart = getOrCreateCart(userId);
        cartItemRepository.deleteAll(cart.getItems());
        cart.getItems().clear();
        cartRepository.save(cart);
    }

    private Cart getOrCreateCart(Long userId) {
        return cartRepository.findByUserId(userId).orElseGet(() -> {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new ResourceNotFoundException("User not found"));
            Cart newCart = Cart.builder()
                    .user(user)
                    .items(new ArrayList<>())
                    .build();
            return cartRepository.save(newCart);
        });
    }

    private CartResponse mapCartToResponse(Cart cart) {
        List<CartItemResponse> itemResponses = new ArrayList<>();
        BigDecimal subtotal = BigDecimal.ZERO;
        int totalItems = 0;

        for (CartItem item : cart.getItems()) {
            ProductVariant variant = item.getProductVariant();
            Product product = variant.getProduct();

            BigDecimal price = product.getDiscountPrice() != null ? product.getDiscountPrice() : product.getBasePrice();
            if (variant.getPriceAdjustment() != null) {
                price = price.add(variant.getPriceAdjustment());
            }

            BigDecimal itemSubtotal = price.multiply(BigDecimal.valueOf(item.getQuantity()));
            subtotal = subtotal.add(itemSubtotal);
            totalItems += item.getQuantity();

            String imageUrl = productImageRepository.findByProductIdAndIsPrimaryTrue(product.getId())
                    .map(ProductImage::getImageUrl)
                    .orElse(null);

            CartItemResponse itemResponse = CartItemResponse.builder()
                    .id(item.getId())
                    .variantId(variant.getId())
                    .productName(product.getName())
                    .productSlug(product.getSlug())
                    .size(variant.getSize().name())
                    .color(variant.getColorName())
                    .colorHex(variant.getColorHex())
                    .imageUrl(imageUrl)
                    .unitPrice(price)
                    .quantity(item.getQuantity())
                    .subtotal(itemSubtotal)
                    .build();
            
            itemResponses.add(itemResponse);
        }

        return CartResponse.builder()
                .items(itemResponses)
                .totalItems(totalItems)
                .subtotal(subtotal)
                .total(subtotal) // Adjust if cart has tax/shipping logic
                .build();
    }
}
