package com.blacklabel.ecommerce.service.impl;

import com.blacklabel.ecommerce.dto.request.CreateOrderRequest;
import com.blacklabel.ecommerce.dto.response.OrderItemResponse;
import com.blacklabel.ecommerce.dto.response.OrderResponse;
import com.blacklabel.ecommerce.dto.response.PagedResponse;
import com.blacklabel.ecommerce.exception.BadRequestException;
import com.blacklabel.ecommerce.exception.InsufficientStockException;
import com.blacklabel.ecommerce.exception.ResourceNotFoundException;
import com.blacklabel.ecommerce.model.*;
import com.blacklabel.ecommerce.model.enums.OrderStatus;
import com.blacklabel.ecommerce.model.enums.PaymentStatus;
import com.blacklabel.ecommerce.repository.*;
import com.blacklabel.ecommerce.service.OrderService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductVariantRepository productVariantRepository;
    private final UserRepository userRepository;
    private final AddressRepository addressRepository;
    private final ProductImageRepository productImageRepository;
    private final ObjectMapper objectMapper;

    @Override
    @Transactional
    public OrderResponse createOrder(Long userId, CreateOrderRequest request) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new BadRequestException("Cart is empty"));

        if (cart.getItems() == null || cart.getItems().isEmpty()) {
            throw new BadRequestException("Cart is empty");
        }

        Address address = addressRepository.findByIdAndUserId(request.getShippingAddressId(), userId)
                .orElseThrow(() -> new ResourceNotFoundException("Shipping address not found"));

        String addressSnapshot;
        try {
            addressSnapshot = objectMapper.writeValueAsString(address);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Failed to serialize shipping address", e);
        }

        BigDecimal subtotal = BigDecimal.ZERO;

        for (CartItem item : cart.getItems()) {
            ProductVariant variant = item.getProductVariant();
            if (variant.getStockQuantity() < item.getQuantity()) {
                throw new InsufficientStockException("Not enough stock for " + variant.getProduct().getName());
            }
        }

        Order order = Order.builder()
                .orderNumber("BL-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase())
                .user(cart.getUser())
                .shippingAddressSnapshot(addressSnapshot)
                .orderStatus(OrderStatus.PENDING)
                .paymentStatus(PaymentStatus.PENDING)
                .paymentMethod(request.getPaymentMethod())
                .notes(request.getNotes())
                .items(new ArrayList<>())
                .build();

        for (CartItem item : cart.getItems()) {
            ProductVariant variant = item.getProductVariant();
            Product product = variant.getProduct();

            BigDecimal price = product.getDiscountPrice() != null ? product.getDiscountPrice() : product.getBasePrice();
            if (variant.getPriceAdjustment() != null) {
                price = price.add(variant.getPriceAdjustment());
            }

            BigDecimal itemSubtotal = price.multiply(BigDecimal.valueOf(item.getQuantity()));
            subtotal = subtotal.add(itemSubtotal);

            String imageUrl = productImageRepository.findByProductIdAndIsPrimaryTrue(product.getId())
                    .map(ProductImage::getImageUrl)
                    .orElse(null);

            OrderItem orderItem = OrderItem.builder()
                    .order(order)
                    .productVariant(variant)
                    .productNameSnapshot(product.getName())
                    .skuSnapshot(variant.getSku())
                    .sizeSnapshot(variant.getSize())
                    .colorSnapshot(variant.getColorName())
                    .imageSnapshot(imageUrl)
                    .unitPrice(price)
                    .quantity(item.getQuantity())
                    .subtotal(itemSubtotal)
                    .build();

            order.getItems().add(orderItem);

            variant.setStockQuantity(variant.getStockQuantity() - item.getQuantity());
            productVariantRepository.save(variant);
        }

        BigDecimal shippingFee = subtotal.compareTo(new BigDecimal("100")) > 0 ? BigDecimal.ZERO : new BigDecimal("9.99");
        BigDecimal taxAmount = subtotal.multiply(new BigDecimal("0.08"));
        BigDecimal totalAmount = subtotal.add(shippingFee).add(taxAmount);

        order.setSubtotal(subtotal);
        order.setShippingFee(shippingFee);
        order.setTaxAmount(taxAmount);
        order.setDiscountAmount(BigDecimal.ZERO);
        order.setTotalAmount(totalAmount);

        Order savedOrder = orderRepository.save(order);

        cartItemRepository.deleteAll(cart.getItems());
        cart.getItems().clear();
        cartRepository.save(cart);

        return mapOrderToResponse(savedOrder);
    }

    @Override
    @Transactional(readOnly = true)
    public PagedResponse<OrderResponse> getOrdersByUser(Long userId, Pageable pageable) {
        Page<Order> orders = orderRepository.findByUserIdOrderByCreatedAtDesc(userId, pageable);
        List<OrderResponse> responses = orders.getContent().stream()
                .map(this::mapOrderToResponse)
                .collect(Collectors.toList());

        return PagedResponse.<OrderResponse>builder()
                .content(responses)
                .page(orders.getNumber())
                .size(orders.getSize())
                .totalElements(orders.getTotalElements())
                .totalPages(orders.getTotalPages())
                .last(orders.isLast())
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public OrderResponse getOrderById(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));
        return mapOrderToResponse(order);
    }

    @Transactional(readOnly = true)
    public PagedResponse<OrderResponse> getAllOrders(Pageable pageable) {
        Page<Order> orders = orderRepository.findAll(pageable);
        List<OrderResponse> responses = orders.getContent().stream()
                .map(this::mapOrderToResponse)
                .collect(Collectors.toList());

        return PagedResponse.<OrderResponse>builder()
                .content(responses)
                .page(orders.getNumber())
                .size(orders.getSize())
                .totalElements(orders.getTotalElements())
                .totalPages(orders.getTotalPages())
                .last(orders.isLast())
                .build();
    }

    @Transactional
    public OrderResponse updateOrderStatus(Long orderId, OrderStatus status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));
        order.setOrderStatus(status);
        return mapOrderToResponse(orderRepository.save(order));
    }

    private OrderResponse mapOrderToResponse(Order order) {
        List<OrderItemResponse> itemResponses = order.getItems().stream().map(item -> 
            OrderItemResponse.builder()
                .productName(item.getProductNameSnapshot())
                .sku(item.getSkuSnapshot())
                .size(item.getSizeSnapshot() != null ? item.getSizeSnapshot().name() : null)
                .color(item.getColorSnapshot())
                .imageUrl(item.getImageSnapshot())
                .unitPrice(item.getUnitPrice())
                .quantity(item.getQuantity())
                .subtotal(item.getSubtotal())
                .build()
        ).collect(Collectors.toList());

        Object shippingAddress = null;
        try {
            shippingAddress = objectMapper.readValue(order.getShippingAddressSnapshot(), Object.class);
        } catch (Exception e) {
            // Ignored
        }

        return OrderResponse.builder()
                .id(order.getId())
                .orderNumber(order.getOrderNumber())
                .status(order.getOrderStatus().name())
                .paymentStatus(order.getPaymentStatus().name())
                .items(itemResponses)
                .subtotal(order.getSubtotal())
                .shipping(order.getShippingFee())
                .tax(order.getTaxAmount())
                .total(order.getTotalAmount())
                .shippingAddress(shippingAddress)
                .createdAt(order.getCreatedAt())
                .build();
    }
}
