-- ============================================
-- BLACK LABEL - Premium Shirt Ecommerce
-- MySQL Database Schema
-- ============================================

CREATE DATABASE IF NOT EXISTS blacklabel_db 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE blacklabel_db;

-- ============================================
-- 1. USERS
-- ============================================
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(191) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(30) NULL,
    role ENUM('ROLE_CUSTOMER', 'ROLE_ADMIN') NOT NULL DEFAULT 'ROLE_CUSTOMER',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ============================================
-- 2. ADDRESSES
-- ============================================
CREATE TABLE IF NOT EXISTS addresses (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    recipient_name VARCHAR(150) NOT NULL,
    phone_number VARCHAR(30) NOT NULL,
    street_address_line1 VARCHAR(255) NOT NULL,
    street_address_line2 VARCHAR(255) NULL,
    city VARCHAR(100) NOT NULL,
    state_province VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    country VARCHAR(100) NOT NULL DEFAULT 'India',
    is_default BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_addresses_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ============================================
-- 3. CATEGORIES (Hierarchical)
-- ============================================
CREATE TABLE IF NOT EXISTS categories (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    parent_id BIGINT NULL,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(120) NOT NULL UNIQUE,
    description TEXT NULL,
    image_url VARCHAR(512) NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_categories_parent FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- ============================================
-- 4. PRODUCTS (Base Shirt Entity)
-- ============================================
CREATE TABLE IF NOT EXISTS products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    category_id BIGINT NOT NULL,
    name VARCHAR(200) NOT NULL,
    slug VARCHAR(220) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    fabric_composition VARCHAR(150) NULL COMMENT 'e.g. 100% Egyptian Cotton',
    fit_type ENUM('SLIM_FIT', 'REGULAR_FIT', 'RELAXED_FIT', 'OVERSIZED') NOT NULL DEFAULT 'REGULAR_FIT',
    care_instructions TEXT NULL,
    base_price DECIMAL(10, 2) NOT NULL,
    discount_price DECIMAL(10, 2) NULL,
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    average_rating DECIMAL(3, 2) NOT NULL DEFAULT 0.00,
    review_count INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_products_category FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT
) ENGINE=InnoDB;

-- ============================================
-- 5. PRODUCT VARIANTS (Size + Color)
-- ============================================
CREATE TABLE IF NOT EXISTS product_variants (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    product_id BIGINT NOT NULL,
    sku VARCHAR(80) NOT NULL UNIQUE COMMENT 'e.g. BL-OXF-WHT-M',
    size ENUM('XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL') NOT NULL,
    color_name VARCHAR(50) NOT NULL COMMENT 'e.g. Classic White',
    color_hex VARCHAR(7) NOT NULL COMMENT 'e.g. #FFFFFF',
    price_adjustment DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    stock_quantity INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_variants_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    UNIQUE KEY uq_product_size_color (product_id, size, color_name)
) ENGINE=InnoDB;

-- ============================================
-- 6. PRODUCT IMAGES
-- ============================================
CREATE TABLE IF NOT EXISTS product_images (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    product_id BIGINT NOT NULL,
    image_url VARCHAR(512) NOT NULL,
    alt_text VARCHAR(200) NULL,
    is_primary BOOLEAN NOT NULL DEFAULT FALSE,
    sort_order INT NOT NULL DEFAULT 0,
    CONSTRAINT fk_images_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ============================================
-- 7. CARTS
-- ============================================
CREATE TABLE IF NOT EXISTS carts (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NULL UNIQUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_carts_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ============================================
-- 8. CART ITEMS
-- ============================================
CREATE TABLE IF NOT EXISTS cart_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    cart_id BIGINT NOT NULL,
    product_variant_id BIGINT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_cart_items_cart FOREIGN KEY (cart_id) REFERENCES carts(id) ON DELETE CASCADE,
    CONSTRAINT fk_cart_items_variant FOREIGN KEY (product_variant_id) REFERENCES product_variants(id) ON DELETE CASCADE,
    UNIQUE KEY uq_cart_variant (cart_id, product_variant_id)
) ENGINE=InnoDB;

-- ============================================
-- 9. ORDERS
-- ============================================
CREATE TABLE IF NOT EXISTS orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_number VARCHAR(64) NOT NULL UNIQUE,
    user_id BIGINT NOT NULL,
    shipping_recipient_name VARCHAR(150) NULL,
    shipping_phone VARCHAR(30) NULL,
    shipping_street_line1 VARCHAR(255) NULL,
    shipping_street_line2 VARCHAR(255) NULL,
    shipping_city VARCHAR(100) NULL,
    shipping_state VARCHAR(100) NULL,
    shipping_postal_code VARCHAR(20) NULL,
    shipping_country VARCHAR(100) NULL,
    order_status ENUM('PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'REFUNDED') NOT NULL DEFAULT 'PENDING',
    payment_status ENUM('PENDING', 'PAID', 'FAILED', 'REFUNDED') NOT NULL DEFAULT 'PENDING',
    payment_method VARCHAR(50) NOT NULL DEFAULT 'CARD',
    subtotal DECIMAL(10, 2) NOT NULL,
    shipping_fee DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    tax_amount DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    discount_amount DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    total_amount DECIMAL(10, 2) NOT NULL,
    tracking_number VARCHAR(100) NULL,
    customer_notes TEXT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_orders_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT
) ENGINE=InnoDB;

-- ============================================
-- 10. ORDER ITEMS (Immutable Snapshots)
-- ============================================
CREATE TABLE IF NOT EXISTS order_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT NOT NULL,
    product_variant_id BIGINT NULL,
    product_name_snapshot VARCHAR(200) NOT NULL,
    sku_snapshot VARCHAR(80) NOT NULL,
    size_snapshot VARCHAR(20) NOT NULL,
    color_snapshot VARCHAR(50) NOT NULL,
    image_snapshot VARCHAR(512) NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    quantity INT NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_order_items_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    CONSTRAINT fk_order_items_variant FOREIGN KEY (product_variant_id) REFERENCES product_variants(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- ============================================
-- 11. REVIEWS
-- ============================================
CREATE TABLE IF NOT EXISTS reviews (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    product_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    rating TINYINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    title VARCHAR(150) NULL,
    comment TEXT NOT NULL,
    is_verified_purchase BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_reviews_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    CONSTRAINT fk_reviews_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY uq_user_product_review (product_id, user_id)
) ENGINE=InnoDB;

-- ============================================
-- 12. WISHLISTS
-- ============================================
CREATE TABLE IF NOT EXISTS wishlists (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_wishlists_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_wishlists_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    UNIQUE KEY uq_user_product_wishlist (user_id, product_id)
) ENGINE=InnoDB;

-- ============================================
-- PERFORMANCE INDEXES
-- ============================================
CREATE INDEX idx_products_category ON products(category_id, is_active);
CREATE INDEX idx_products_featured ON products(is_featured, is_active);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_variants_product ON product_variants(product_id, is_active);
CREATE INDEX idx_variants_sku ON product_variants(sku);
CREATE INDEX idx_orders_user ON orders(user_id, created_at DESC);
CREATE INDEX idx_orders_number ON orders(order_number);
CREATE INDEX idx_reviews_product ON reviews(product_id, rating);
CREATE INDEX idx_wishlists_user ON wishlists(user_id);
CREATE INDEX idx_addresses_user ON addresses(user_id);
