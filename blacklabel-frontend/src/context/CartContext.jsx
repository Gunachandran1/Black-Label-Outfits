import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Synchronously initialize cart from localStorage (no flicker)
  const [cartItems, setCartItems] = useState(() => {
    let key = 'bl-guest-cart';
    try {
      const savedUser = localStorage.getItem('bl-user');
      if (savedUser) {
        const u = JSON.parse(savedUser);
        if (u && u.email) key = `bl-cart-user-${u.email}`;
      }
    } catch {}
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const prevKeyRef = useRef(null);

  // Derive the storage key
  const userCartKey = isAuthenticated && user?.email
    ? `bl-cart-user-${user.email}`
    : 'bl-guest-cart';

  // When user changes (login / logout), load from the NEW key
  useEffect(() => {
    if (prevKeyRef.current !== null && prevKeyRef.current !== userCartKey) {
      try {
        const saved = localStorage.getItem(userCartKey);
        setCartItems(saved ? JSON.parse(saved) : []);
      } catch { setCartItems([]); }
    }
    prevKeyRef.current = userCartKey;
  }, [userCartKey]);

  // Persist cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem(userCartKey, JSON.stringify(cartItems));
  }, [cartItems, userCartKey]);

  const addToCart = useCallback((product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id && item.size === product.size && item.color === product.color);
      if (existing) {
        return prev.map(item => item === existing ? { ...item, quantity: item.quantity + product.quantity } : item);
      }
      return [...prev, product];
    });
    setIsCartOpen(true);
  }, []);

  const removeFromCart = useCallback((index) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  }, []);

  const updateQuantity = useCallback((index, delta) => {
    setCartItems(prev => prev.map((item, i) => {
      if (i === index) {
        const newQ = item.quantity + delta;
        return newQ > 0 ? { ...item, quantity: newQ } : item;
      }
      return item;
    }));
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
    localStorage.removeItem(userCartKey);
  }, [userCartKey]);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, isCartOpen, setIsCartOpen, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
