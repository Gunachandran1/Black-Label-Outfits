import React from 'react';
import { FiX, FiShoppingBag } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import Button from '../common/Button';

const CartDrawer = () => {
  const { isCartOpen, setIsCartOpen, cartItems } = useCart();

  return (
    <>
      {/* Backdrop */}
      {isCartOpen && (
        <div 
          style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', zIndex: 1000, backdropFilter: 'blur(2px)' }} 
          onClick={() => setIsCartOpen(false)}
        />
      )}
      
      {/* Drawer */}
      <div style={{ 
        position: 'fixed', top: 0, right: isCartOpen ? 0 : '-100%', width: '100%', maxWidth: '400px', height: '100%', 
        background: 'var(--bg-primary)', zIndex: 1001, transition: 'right 0.3s ease', display: 'flex', flexDirection: 'column',
        borderLeft: '1px solid var(--border-color)', boxShadow: 'var(--shadow-lg)'
      }}>
        
        {/* Header */}
        <div style={{ padding: '20px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px' }}><FiShoppingBag /> Your Cart</h2>
          <FiX size={24} style={{ cursor: 'pointer' }} onClick={() => setIsCartOpen(false)} />
        </div>
        
        {/* Cart Items List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '10px' }}>
          {cartItems.length === 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-secondary)', gap: '15px' }}>
              <FiShoppingBag size={48} style={{ opacity: 0.5 }} />
              <p>Your cart is empty.</p>
              <Button variant="outline" onClick={() => setIsCartOpen(false)}>Continue Shopping</Button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {cartItems.map((item, idx) => (
                <CartItem key={idx} item={item} index={idx} />
              ))}
            </div>
          )}
        </div>
        
        {/* Footer / Summary */}
        {cartItems.length > 0 && (
          <div style={{ padding: '20px', borderTop: '1px solid var(--border-color)', background: 'var(--bg-card)' }}>
            <CartSummary isDrawer={true} />
            <Link to="/cart" onClick={() => setIsCartOpen(false)} style={{ display: 'block', textAlign: 'center', marginTop: '15px', color: 'var(--text-secondary)', fontSize: '0.9rem', textDecoration: 'underline' }}>
              View Full Cart
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
