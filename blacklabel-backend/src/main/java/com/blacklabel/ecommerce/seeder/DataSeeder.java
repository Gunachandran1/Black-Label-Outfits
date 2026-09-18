package com.blacklabel.ecommerce.seeder;

import com.blacklabel.ecommerce.model.*;
import com.blacklabel.ecommerce.model.enums.FitType;
import com.blacklabel.ecommerce.model.enums.Role;
import com.blacklabel.ecommerce.model.enums.ShirtSize;
import com.blacklabel.ecommerce.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final ProductVariantRepository productVariantRepository;
    private final ProductImageRepository productImageRepository;
    private final ReviewRepository reviewRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        if (userRepository.count() > 0) {
            return;
        }

        // Users
        User admin = User.builder()
                .email("admin@blacklabel.com")
                .passwordHash(passwordEncoder.encode("admin123"))
                .firstName("Admin")
                .lastName("User")
                .role(Role.ROLE_ADMIN)
                .isActive(true)
                .build();
        userRepository.save(admin);

        User customer = User.builder()
                .email("john@blacklabel.com")
                .passwordHash(passwordEncoder.encode("customer123"))
                .firstName("John")
                .lastName("Smith")
                .role(Role.ROLE_CUSTOMER)
                .isActive(true)
                .build();
        customer = userRepository.save(customer);

        // Categories
        Category formal = Category.builder().name("Formal Shirts").slug("formal-shirts").description("Elevate your professional wardrobe").imageUrl("https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600").isActive(true).build();
        Category casual = Category.builder().name("Casual Shirts").slug("casual-shirts").description("Weekend-ready comfort").imageUrl("https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600").isActive(true).build();
        Category linen = Category.builder().name("Linen Collection").slug("linen-collection").description("Breathable luxury").imageUrl("https://images.unsplash.com/photo-1564859228273-274232fdb516?w=600").isActive(true).build();
        Category oxford = Category.builder().name("Oxford Collection").slug("oxford-collection").description("Timeless elegance").imageUrl("https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=600").isActive(true).build();
        Category premium = Category.builder().name("Premium Collection").slug("premium-collection").description("Uncompromising quality").imageUrl("https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=600").isActive(true).build();
        Category polo = Category.builder().name("Polo Shirts").slug("polo-shirts").description("Smart casual essentials").imageUrl("https://images.unsplash.com/photo-1625910513413-5fc421e0b6cd?w=600").isActive(true).build();

        categoryRepository.saveAll(List.of(formal, casual, linen, oxford, premium, polo));

        // Product 1: Classic White Oxford
        Product p1 = Product.builder().name("Classic White Oxford").slug("classic-white-oxford")
                .description("A timeless classic white oxford shirt tailored to perfection. It features an impeccable collar, durable buttons, and a flawless finish that ensures a sharp look all day. Ideal for both boardroom meetings and evening gatherings.")
                .fabricComposition("100% Egyptian Cotton, Oxford Weave")
                .fitType(FitType.SLIM_FIT).basePrice(new BigDecimal("89.99"))
                .category(formal).isFeatured(true).isActive(true)
                .averageRating(0.0).reviewCount(0).build();
        p1 = productRepository.save(p1);
        saveVariants(p1, "FRM", "WHT", "White", "#FFFFFF", List.of(ShirtSize.S, ShirtSize.M, ShirtSize.L, ShirtSize.XL), 20);
        saveVariants(p1, "FRM", "LBL", "Light Blue", "#ADD8E6", List.of(ShirtSize.S, ShirtSize.M, ShirtSize.L, ShirtSize.XL), 15);
        saveImage(p1, "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800", true);

        // Product 2: Royal Blue Formal
        Product p2 = Product.builder().name("Royal Blue Formal").slug("royal-blue-formal")
                .description("Crafted with premium materials, this royal blue formal shirt stands out. Designed for a pristine look.")
                .fabricComposition("100% Premium Cotton Twill")
                .fitType(FitType.REGULAR_FIT).basePrice(new BigDecimal("99.99")).discountPrice(new BigDecimal("79.99"))
                .category(formal).isFeatured(true).isActive(true)
                .averageRating(0.0).reviewCount(0).build();
        p2 = productRepository.save(p2);
        saveVariants(p2, "FRM", "RBL", "Royal Blue", "#4169E1", List.of(ShirtSize.M, ShirtSize.L, ShirtSize.XL), 18);
        saveImage(p2, "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800", true);

        // Product 3: Black Slim Fit
        Product p3 = Product.builder().name("Black Slim Fit").slug("black-slim-fit")
                .description("An essential black slim fit shirt combining stretch and style. Suitable for evening events.")
                .fabricComposition("Cotton-Elastane Blend")
                .fitType(FitType.SLIM_FIT).basePrice(new BigDecimal("109.99"))
                .category(formal).isFeatured(true).isActive(true)
                .averageRating(0.0).reviewCount(0).build();
        p3 = productRepository.save(p3);
        saveVariants(p3, "FRM", "BLK", "Black", "#000000", List.of(ShirtSize.S, ShirtSize.M, ShirtSize.L, ShirtSize.XL), 25);
        saveImage(p3, "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=800", true);

        // Product 4: Navy Linen Casual
        Product p4 = Product.builder().name("Navy Linen Casual").slug("navy-linen-casual")
                .description("Experience breathability with this navy linen casual shirt. Perfectly relaxed and exceptionally comfortable.")
                .fabricComposition("100% French Linen")
                .fitType(FitType.RELAXED_FIT).basePrice(new BigDecimal("119.99"))
                .category(linen).isFeatured(false).isActive(true)
                .averageRating(0.0).reviewCount(0).build();
        p4 = productRepository.save(p4);
        saveVariants(p4, "LIN", "NVY", "Navy", "#001F3F", List.of(ShirtSize.M, ShirtSize.L, ShirtSize.XL), 12);
        saveVariants(p4, "LIN", "SND", "Sand", "#C2B280", List.of(ShirtSize.M, ShirtSize.L, ShirtSize.XL), 10);
        saveImage(p4, "https://images.unsplash.com/photo-1564859228273-274232fdb516?w=800", true);

        // Product 5: Charcoal Premium
        Product p5 = Product.builder().name("Charcoal Premium").slug("charcoal-premium")
                .description("Luxurious charcoal shirt made with a soft silk-cotton blend. Ensures an unmatched premium feel.")
                .fabricComposition("Silk-Cotton Blend")
                .fitType(FitType.SLIM_FIT).basePrice(new BigDecimal("179.99")).discountPrice(new BigDecimal("149.99"))
                .category(premium).isFeatured(true).isActive(true)
                .averageRating(0.0).reviewCount(0).build();
        p5 = productRepository.save(p5);
        saveVariants(p5, "PRM", "CHR", "Charcoal", "#36454F", List.of(ShirtSize.S, ShirtSize.M, ShirtSize.L, ShirtSize.XL), 8);
        saveImage(p5, "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=800", true);

        // Product 6: Ivory Silk Blend
        Product p6 = Product.builder().name("Ivory Silk Blend").slug("ivory-silk-blend")
                .description("An exquisite ivory silk blend shirt offering both comfort and sophistication. Ideal for upscale occasions.")
                .fabricComposition("70% Silk, 30% Cotton")
                .fitType(FitType.REGULAR_FIT).basePrice(new BigDecimal("189.99"))
                .category(premium).isFeatured(true).isActive(true)
                .averageRating(0.0).reviewCount(0).build();
        p6 = productRepository.save(p6);
        saveVariants(p6, "PRM", "IVY", "Ivory", "#FFFFF0", List.of(ShirtSize.M, ShirtSize.L, ShirtSize.XL), 6);
        saveImage(p6, "https://images.unsplash.com/photo-1598033129183-c4f50c736c10?w=800", true);

        // Product 7: Midnight Blue Oxford
        Product p7 = Product.builder().name("Midnight Blue Oxford").slug("midnight-blue-oxford")
                .description("A versatile midnight blue oxford shirt that transitions seamlessly from day to night.")
                .fabricComposition("Oxford Cotton")
                .fitType(FitType.REGULAR_FIT).basePrice(new BigDecimal("94.99"))
                .category(oxford).isFeatured(false).isActive(true)
                .averageRating(0.0).reviewCount(0).build();
        p7 = productRepository.save(p7);
        saveVariants(p7, "OXF", "MDB", "Midnight Blue", "#191970", List.of(ShirtSize.S, ShirtSize.M, ShirtSize.L, ShirtSize.XL), 20);
        saveImage(p7, "https://images.unsplash.com/photo-1588359348347-9bc6cbbb689e?w=800", true);

        // Product 8: Wine Red Formal
        Product p8 = Product.builder().name("Wine Red Formal").slug("wine-red-formal")
                .description("Stand out with this rich wine red formal shirt made from Supima cotton.")
                .fabricComposition("100% Supima Cotton")
                .fitType(FitType.SLIM_FIT).basePrice(new BigDecimal("99.99"))
                .category(formal).isFeatured(false).isActive(true)
                .averageRating(0.0).reviewCount(0).build();
        p8 = productRepository.save(p8);
        saveVariants(p8, "FRM", "WRD", "Wine Red", "#722F37", List.of(ShirtSize.M, ShirtSize.L, ShirtSize.XL), 14);
        saveImage(p8, "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800", true);

        // Product 9: Sand Beige Linen
        Product p9 = Product.builder().name("Sand Beige Linen").slug("sand-beige-linen")
                .description("The quintessential sand beige linen shirt for ultimate comfort in warm weather.")
                .fabricComposition("100% Belgian Linen")
                .fitType(FitType.RELAXED_FIT).basePrice(new BigDecimal("109.99")).discountPrice(new BigDecimal("89.99"))
                .category(linen).isFeatured(false).isActive(true)
                .averageRating(0.0).reviewCount(0).build();
        p9 = productRepository.save(p9);
        saveVariants(p9, "LIN", "SBE", "Sand Beige", "#D2B48C", List.of(ShirtSize.S, ShirtSize.M, ShirtSize.L, ShirtSize.XL), 15);
        saveImage(p9, "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=800", true);

        // Product 10: Forest Green Polo
        Product p10 = Product.builder().name("Forest Green Polo").slug("forest-green-polo")
                .description("A high-quality forest green polo made of durable pique cotton. A modern smart-casual staple.")
                .fabricComposition("Pique Cotton")
                .fitType(FitType.REGULAR_FIT).basePrice(new BigDecimal("69.99"))
                .category(polo).isFeatured(false).isActive(true)
                .averageRating(0.0).reviewCount(0).build();
        p10 = productRepository.save(p10);
        saveVariants(p10, "POL", "FGR", "Forest Green", "#228B22", List.of(ShirtSize.S, ShirtSize.M, ShirtSize.L, ShirtSize.XL, ShirtSize.XXL), 30);
        saveVariants(p10, "POL", "NVY", "Navy", "#001F3F", List.of(ShirtSize.S, ShirtSize.M, ShirtSize.L, ShirtSize.XL, ShirtSize.XXL), 25);
        saveImage(p10, "https://images.unsplash.com/photo-1625910513413-5fc421e0b6cd?w=800", true);

        // Product 11: Pearl White Premium
        Product p11 = Product.builder().name("Pearl White Premium").slug("pearl-white-premium")
                .description("An immaculate pearl white premium shirt crafted from the finest Sea Island cotton.")
                .fabricComposition("Sea Island Cotton")
                .fitType(FitType.SLIM_FIT).basePrice(new BigDecimal("159.99"))
                .category(premium).isFeatured(false).isActive(true)
                .averageRating(0.0).reviewCount(0).build();
        p11 = productRepository.save(p11);
        saveVariants(p11, "PRM", "PWT", "Pearl White", "#F0EAD6", List.of(ShirtSize.M, ShirtSize.L, ShirtSize.XL), 10);
        saveImage(p11, "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800", true);

        // Product 12: Dusty Rose Casual
        Product p12 = Product.builder().name("Dusty Rose Casual").slug("dusty-rose-casual")
                .description("Soft organic cotton casual shirt in a contemporary dusty rose tone.")
                .fabricComposition("Organic Cotton")
                .fitType(FitType.RELAXED_FIT).basePrice(new BigDecimal("79.99")).discountPrice(new BigDecimal("59.99"))
                .category(casual).isFeatured(false).isActive(true)
                .averageRating(0.0).reviewCount(0).build();
        p12 = productRepository.save(p12);
        saveVariants(p12, "CSL", "DRO", "Dusty Rose", "#DCAE96", List.of(ShirtSize.S, ShirtSize.M, ShirtSize.L, ShirtSize.XL), 22);
        saveVariants(p12, "CSL", "SGR", "Sage Green", "#9DC183", List.of(ShirtSize.S, ShirtSize.M, ShirtSize.L, ShirtSize.XL), 18);
        saveImage(p12, "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=800", true);

        // Reviews
        addReview(p1, customer, 5, "Perfect for the office", "Great fit and amazing material. Highly recommended for work.");
        addReview(p2, customer, 4, "Great value for money", "Solid shirt for the price, the color really pops.");
        addReview(p4, customer, 5, "Best linen shirt I own", "Super comfortable and keeps me cool all day long.");
        addReview(p5, customer, 5, "Premium feel", "You can definitely tell this is a high-end shirt. Worth every penny.");
        addReview(p3, customer, 3, "Runs slightly small", "The quality is there but it fits a bit tighter than expected.");
        addReview(p9, customer, 4, "Excellent summer shirt", "Really nice texture and good for hot weather.");
        addReview(p6, customer, 5, "Luxurious fabric", "The silk blend feels incredible against the skin.");
        addReview(p10, customer, 4, "Great polo", "Perfect for casual Fridays. Nice and durable.");

    }

    private void saveVariants(Product product, String catShort, String colorShort, String colorName, String colorHex, List<ShirtSize> sizes, int stock) {
        for (ShirtSize size : sizes) {
            String sku = "BL-" + catShort + "-" + colorShort + "-" + size.name();
            ProductVariant variant = ProductVariant.builder()
                    .product(product)
                    .sku(sku)
                    .size(size)
                    .colorName(colorName)
                    .colorHex(colorHex)
                    .stockQuantity(stock)
                    .isActive(true)
                    .build();
            productVariantRepository.save(variant);
        }
    }

    private void saveImage(Product product, String url, boolean isPrimary) {
        ProductImage image = ProductImage.builder()
                .product(product)
                .imageUrl(url)
                .isPrimary(isPrimary)
                .build();
        productImageRepository.save(image);
    }

    private void addReview(Product product, User user, int rating, String title, String comment) {
        Review review = Review.builder()
                .product(product)
                .user(user)
                .rating(rating)
                .title(title)
                .comment(comment)
                .isVerifiedPurchase(true)
                .build();
        reviewRepository.save(review);
        
        // Update product average rating and count (simple logic for seeder)
        int newCount = product.getReviewCount() + 1;
        double currentTotal = product.getAverageRating() * product.getReviewCount();
        double newAvg = (currentTotal + rating) / newCount;
        
        product.setAverageRating(Math.round(newAvg * 10.0) / 10.0);
        product.setReviewCount(newCount);
        productRepository.save(product);
    }
}
