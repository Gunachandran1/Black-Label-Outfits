import React from 'react';
import ProductGrid from '../components/product/ProductGrid';

const WishlistPage = () => {
  return (
    <div className="container" style={{ padding: '40px 20px', minHeight: '70vh', animation: 'fadeIn 0.4s' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '40px' }}>My Wishlist</h1>
      
      <div style={{ textAlign: 'center', padding: '60px', background: 'var(--bg-card)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
         <p style={{ color: 'var(--text-secondary)' }}>Your wishlist is currently empty. Start adding products you love!</p>
      </div>
    </div>
  );
};

export default WishlistPage;
