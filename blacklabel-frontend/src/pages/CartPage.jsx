import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import Breadcrumb from '../components/common/Breadcrumb';
import Button from '../components/common/Button';

const CartPage = () => {
  const { cartItems } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="container" style={{ padding: '60px 20px', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', animation: 'fadeIn 0.4s' }}>
        <FiShoppingBag size={80} style={{ color: 'var(--text-muted)', marginBottom: '30px' }} />
        <h2 style={{ fontSize: '2rem', marginBottom: '15px' }}>Your Cart is Empty</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '30px', maxWidth: '400px' }}>
          Looks like you haven't added any items to your cart yet. Discover our premium collection and elevate your style.
        </p>
        <Link to="/collections">
          <Button size="lg">Start Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '40px 20px', animation: 'fadeIn 0.4s' }}>
      <Breadcrumb items={[{ label: 'Cart' }]} />
      
      <h1 style={{ fontSize: '2.5rem', marginBottom: '30px' }}>Shopping Cart</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px' }}>
        {/* Cart Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {cartItems.map((item, idx) => (
            <div key={idx} style={{ padding: '5px' }}>
              <CartItem item={item} index={idx} />
            </div>
          ))}
          <div style={{ marginTop: '20px' }}>
            <Link to="/collections" style={{ color: 'var(--accent-gold)', display: 'inline-block', padding: '10px 0' }}>
              &larr; Continue Shopping
            </Link>
          </div>
        </div>
        
        {/* Summary */}
        <div>
          <div style={{ position: 'sticky', top: '100px' }}>
            <CartSummary />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
