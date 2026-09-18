import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../components/common/Breadcrumb';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const INSTA_URL = 'https://www.instagram.com/blacklabeloutfits/';

const CheckoutPage = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [form, setForm] = useState({
    firstName: '', lastName: '', address: '', apartment: '',
    city: '', postalCode: '', phone: ''
  });

  useEffect(() => {
    if (cartItems.length === 0) setIsEmpty(true);
  }, [cartItems]);

  useEffect(() => {
    if (isEmpty) navigate('/cart');
  }, [isEmpty, navigate]);

  const updateForm = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Build the Instagram DM message with order details
    const orderItems = cartItems.map(item =>
      `• ${item.name} (Size: ${item.size}, Color: ${item.color || 'Default'}, Qty: ${item.quantity}) - ₹${(item.price * item.quantity).toLocaleString()}`
    ).join('\n');

    const message = `🛍️ NEW ORDER - Black Label\n\n` +
      `📦 Order Summary:\n${orderItems}\n\n` +
      `💰 Total: ₹${cartTotal.toLocaleString()}\n🚚 Shipping: Free\n\n` +
      `📍 Shipping Address:\n` +
      `${form.firstName} ${form.lastName}\n` +
      `${form.address}${form.apartment ? ', ' + form.apartment : ''}\n` +
      `${form.city} - ${form.postalCode}\n` +
      `📱 Phone: ${form.phone}`;

    // Copy message to clipboard first
    try {
      await navigator.clipboard.writeText(message);
    } catch {
      // Fallback: create a temporary textarea
      const ta = document.createElement('textarea');
      ta.value = message;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }

    // Clear cart and redirect to Instagram DM
    setTimeout(() => {
      clearCart();
      setLoading(false);
      toast.success('Order details copied! Paste it in the Instagram DM 📋', { duration: 5000 });

      // Open Instagram DM
      window.open('https://ig.me/m/blacklabeloutfits', '_blank');
      navigate('/');
    }, 800);
  };

  if (isEmpty) return null;

  return (
    <div className="container" style={{ padding: '40px 20px', animation: 'fadeIn 0.4s' }}>
      <Breadcrumb items={[{ label: 'Cart', link: '/cart' }, { label: 'Checkout' }]} />

      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.8rem', marginBottom: '30px', fontWeight: 600 }}>Checkout</h1>

      <form onSubmit={handleSubmit} className="checkout-form-layout">
        {/* Left Column — Shipping Only */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <div style={{ background: 'var(--bg-card)', padding: '30px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '20px', color: 'var(--accent-gold)' }}>Shipping Address</h2>
            <div className="grid grid-cols-2" style={{ gap: '15px' }}>
              <Input label="First Name" required value={form.firstName} onChange={(e) => updateForm('firstName', e.target.value)} />
              <Input label="Last Name" required value={form.lastName} onChange={(e) => updateForm('lastName', e.target.value)} />
            </div>
            <Input label="Address" required value={form.address} onChange={(e) => updateForm('address', e.target.value)} />
            <Input label="Apartment, suite, etc. (optional)" value={form.apartment} onChange={(e) => updateForm('apartment', e.target.value)} />
            <div className="grid grid-cols-2" style={{ gap: '15px' }}>
              <Input label="City" required value={form.city} onChange={(e) => updateForm('city', e.target.value)} />
              <Input label="Postal Code" required value={form.postalCode} onChange={(e) => updateForm('postalCode', e.target.value)} />
            </div>
            <Input label="Phone Number" type="tel" required value={form.phone} onChange={(e) => updateForm('phone', e.target.value)} />
          </div>

          <div style={{ background: 'var(--bg-card)', padding: '24px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-gold)', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span style={{ fontSize: '1.5rem' }}>📸</span>
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '2px' }}>Payment via Instagram</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.82rem' }}>
                After placing order, your order details will be sent to our Instagram (@blacklabeloutfits) where we'll handle the payment.
              </div>
            </div>
          </div>
        </div>

        {/* Right Column — Summary */}
        <div>
          <div style={{ position: 'sticky', top: '100px', background: 'var(--bg-elevated)', padding: '30px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>Order Summary</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '20px', maxHeight: '300px', overflowY: 'auto' }}>
              {cartItems.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <img src={item.image} alt={item.name} style={{ width: '40px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
                    <div>
                      <div>{item.name}</div>
                      <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Qty: {item.quantity} | Size: {item.size}</div>
                    </div>
                  </div>
                  <span>₹{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>

            <hr style={{ borderColor: 'var(--border-color)', margin: '20px 0' }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>Subtotal</span>
                <span>₹{cartTotal.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>Shipping</span>
                <span style={{ color: 'var(--success)', fontWeight: 600 }}>Free</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.3rem', fontWeight: 'bold', borderTop: '1px solid var(--border-color)', paddingTop: '20px', marginBottom: '24px' }}>
              <span>Total</span>
              <span className="text-gold">₹{cartTotal.toLocaleString()}</span>
            </div>

            <Button type="submit" size="lg" style={{ width: '100%', padding: '18px 32px', fontSize: '1.05rem', borderRadius: '12px', letterSpacing: '1px' }} loading={loading}>
              Place Order
            </Button>

            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '12px', lineHeight: 1.5 }}>
              By placing this order, you'll be redirected to our Instagram to complete the payment.
            </p>
          </div>
        </div>
      </form>

      <style>{`
        .checkout-form-layout {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 40px;
        }
        @media (max-width: 992px) {
          .checkout-form-layout {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default CheckoutPage;
