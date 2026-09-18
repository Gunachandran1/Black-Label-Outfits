import React from 'react';
import { FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';

const CartItem = ({ item, index }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div style={{ display: 'flex', gap: '15px', padding: '15px', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-card)' }}>
      <img src={item.image} alt={item.name} style={{ width: '80px', height: '100px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} />
      
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <h4 style={{ fontSize: '1rem', marginBottom: '5px' }}>{item.name}</h4>
            <span style={{ fontWeight: 'bold', fontFamily: 'var(--font-price)', letterSpacing: '0.3px' }}>₹{(item.price * item.quantity).toLocaleString()}</span>
          </div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', display: 'flex', gap: '10px' }}>
            <span>Size: {item.size}</span>
            <span>Color: {item.color?.name || item.color}</span>
          </div>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)' }}>
            <button onClick={() => updateQuantity(index, -1)} style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', padding: '5px 10px', cursor: 'pointer' }}><FiMinus size={12} /></button>
            <span style={{ padding: '0 10px', fontSize: '0.9rem' }}>{item.quantity}</span>
            <button onClick={() => updateQuantity(index, 1)} style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', padding: '5px 10px', cursor: 'pointer' }}><FiPlus size={12} /></button>
          </div>
          
          <button onClick={() => removeFromCart(index)} style={{ background: 'transparent', border: 'none', color: 'var(--error)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.85rem' }}>
            <FiTrash2 size={14} /> Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
