import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [activeColor, setActiveColor] = useState(0);

  // Pick image: use colorImages map if available, otherwise fallback to default image
  const getImage = () => {
    if (product.colorImages && product.colors?.[activeColor]) {
      const colorName = product.colors[activeColor].name;
      return product.colorImages[colorName] || product.image;
    }
    return product.image;
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      ...product,
      price: product.discountPrice || product.basePrice || product.price,
      quantity: 1,
      size: product.sizes?.[0] || 'M',
      color: product.colors?.[activeColor]?.name || 'Default',
      image: getImage()
    });
    toast.success(`${product.name} added to cart`);
  };

  const handleColorClick = (e, index) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveColor(index);
  };

  const price = product.discountPrice || product.basePrice || product.price || 0;
  const originalPrice = product.discountPrice ? (product.basePrice || product.price) : null;
  const hasDiscount = originalPrice && originalPrice > price;

  return (
    <Link
      to={`/product/${product.slug}`}
      className="product-card-link"
    >
      {/* Image */}
      <div className="product-card-image-wrapper">
        <img
          src={getImage()}
          alt={product.name}
          loading="lazy"
          className="product-card-image"
        />

        {/* Badges */}
        <div className="product-card-badges">
          {product.isNew && (
            <span className="badge badge-new">New</span>
          )}
          {hasDiscount && (
            <span className="badge badge-sale">
              {Math.round(((originalPrice - price) / originalPrice) * 100)}% OFF
            </span>
          )}
        </div>

        {/* Quick Add Button */}
        <div className="quick-add-wrapper">
          <button onClick={handleAddToCart} className="quick-add-btn">
            <FiShoppingCart size={16} /> Add to Cart
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="product-card-info">
        <div className="product-card-category">{product.category}</div>
        <h3 className="product-card-name">{product.name}</h3>

        {/* Color Dots */}
        {product.colors && product.colors.length > 1 && (
          <div className="product-card-colors">
            {product.colors.map((color, idx) => (
              <button
                key={color.name}
                title={color.name}
                className={`color-dot ${idx === activeColor ? 'active' : ''}`}
                style={{ background: color.code }}
                onClick={(e) => handleColorClick(e, idx)}
              />
            ))}
          </div>
        )}

        {/* Rating */}
        {product.rating > 0 && (
          <div className="product-card-rating">
            <span className={`rating-badge ${product.rating >= 4 ? 'rating-good' : 'rating-ok'}`}>
              {product.rating} ★
            </span>
            <span className="rating-count">
              {product.reviewsCount?.toLocaleString()} Reviews
            </span>
          </div>
        )}

        {/* Price */}
        <div className="product-card-price">
          <span className="price-current">₹{price.toLocaleString()}</span>
          {hasDiscount && (
            <span className="price-original">₹{originalPrice.toLocaleString()}</span>
          )}
        </div>
      </div>

      <style>{`
        .product-card-link {
          display: block;
          background: var(--bg-card);
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid var(--border-color);
          transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          text-decoration: none;
          color: inherit;
          position: relative;
        }
        .product-card-link:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.4), 0 0 1px rgba(201,169,110,0.2);
          border-color: var(--border-gold);
        }
        .product-card-image-wrapper {
          position: relative;
          width: 100%;
          aspect-ratio: 3 / 4;
          overflow: hidden;
          background: var(--bg-elevated);
        }
        .product-card-image {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .product-card-link:hover .product-card-image {
          transform: scale(1.06);
        }
        .product-card-badges {
          position: absolute; top: 12px; left: 12px;
          display: flex; flex-direction: column; gap: 6px;
        }
        .badge {
          padding: 4px 12px; border-radius: 6px;
          font-size: 0.7rem; font-weight: 700;
          letter-spacing: 1px; text-transform: uppercase;
        }
        .badge-new {
          background: var(--accent-gold); color: #050505;
        }
        .badge-sale {
          background: var(--error); color: #fff; letter-spacing: 0.5px;
        }
        .quick-add-wrapper {
          position: absolute; bottom: 12px; left: 12px; right: 12px;
          opacity: 0; transform: translateY(10px);
          transition: all 0.3s ease;
        }
        .product-card-link:hover .quick-add-wrapper {
          opacity: 1; transform: translateY(0);
        }
        .quick-add-btn {
          width: 100%; padding: 12px;
          background: rgba(5,5,5,0.85); backdrop-filter: blur(8px);
          color: #f0ece4; border: 1px solid rgba(201,169,110,0.3);
          border-radius: 10px; font-size: 0.82rem; font-weight: 600;
          cursor: pointer; display: flex; align-items: center;
          justify-content: center; gap: 8px; transition: all 0.2s;
          letter-spacing: 0.5px;
        }
        .quick-add-btn:hover {
          background: rgba(201,169,110,0.9); color: #050505;
        }
        .product-card-info {
          padding: 16px 16px 20px;
        }
        .product-card-category {
          font-size: 0.72rem; color: var(--accent-gold);
          margin-bottom: 6px; font-weight: 600;
          letter-spacing: 1px; text-transform: uppercase;
        }
        .product-card-name {
          font-size: 0.95rem; font-weight: 600;
          margin-bottom: 8px; white-space: nowrap;
          overflow: hidden; text-overflow: ellipsis; line-height: 1.4;
        }
        .product-card-colors {
          display: flex; gap: 6px; margin-bottom: 10px;
        }
        .color-dot {
          width: 20px; height: 20px;
          border-radius: 50%; border: 2px solid var(--border-color);
          cursor: pointer; transition: all 0.2s;
          padding: 0; outline: none;
        }
        .color-dot:hover {
          transform: scale(1.2);
        }
        .color-dot.active {
          border-color: var(--accent-gold);
          box-shadow: 0 0 0 2px var(--bg-card), 0 0 0 4px var(--accent-gold);
          transform: scale(1.1);
        }
        .product-card-rating {
          display: flex; align-items: center; gap: 8px; margin-bottom: 10px;
        }
        .rating-badge {
          padding: 2px 8px; border-radius: 6px;
          font-size: 0.75rem; font-weight: 700;
          display: flex; align-items: center; gap: 3px;
        }
        .rating-good {
          background: rgba(76,175,80,0.15); color: var(--success);
        }
        .rating-ok {
          background: rgba(255,152,0,0.15); color: var(--warning);
        }
        .rating-count {
          font-size: 0.75rem; color: var(--text-muted);
        }
        .product-card-price {
          display: flex; align-items: baseline; gap: 8px;
        }
        .price-current {
          font-size: 1.1rem; font-weight: 700;
          color: var(--text-primary); font-family: var(--font-price);
          letter-spacing: 0.3px;
        }
        .price-original {
          font-size: 0.82rem; color: var(--text-muted);
          text-decoration: line-through; font-family: var(--font-price);
        }
      `}</style>
    </Link>
  );
};

export default ProductCard;
