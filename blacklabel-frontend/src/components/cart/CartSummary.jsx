import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import Button from '../common/Button';

const CartSummary = ({ isDrawer = false }) => {
  const { cartTotal, setIsCartOpen } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (isDrawer) setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <div style={{ background: 'var(--bg-elevated)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
      <h3 style={{ marginBottom: '20px', fontSize: '1.2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>Order Summary</h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
          <span>Subtotal</span>
          <span>₹{cartTotal.toLocaleString()}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
          <span>Shipping</span>
          <span style={{ color: 'var(--success)', fontWeight: 600 }}>Free</span>
        </div>
      </div>
      
      {!isDrawer && (
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <input type="text" placeholder="Promo code" style={{ flex: 1, padding: '10px', background: 'var(--bg-input)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', borderRadius: 'var(--radius-sm)' }} />
          <Button variant="outline" size="sm">Apply</Button>
        </div>
      )}
      
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 'bold', borderTop: '1px solid var(--border-color)', paddingTop: '15px', marginBottom: '20px' }}>
        <span>Total</span>
        <span className="text-gold">₹{cartTotal.toLocaleString()}</span>
      </div>
      
      <Button variant="primary" style={{ width: '100%', padding: '16px 28px', fontSize: '1rem', borderRadius: '12px', letterSpacing: '0.5px' }} onClick={handleCheckout}>
        Proceed to Checkout
      </Button>
    </div>
  );
};

export default CartSummary;
