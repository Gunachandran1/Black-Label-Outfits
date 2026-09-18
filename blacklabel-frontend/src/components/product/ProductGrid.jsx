import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ products, loading = false }) => {
  if (loading) {
    return (
      <div className="product-grid">
        {[...Array(8)].map((_, i) => (
          <div key={i} style={{
            height: '420px',
            background: 'var(--bg-card)',
            borderRadius: '12px',
            animation: 'pulse 1.5s infinite',
            border: '1px solid var(--border-color)'
          }} />
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 20px', color: 'var(--text-secondary)' }}>
        <p style={{ fontSize: '1.1rem' }}>No products found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
