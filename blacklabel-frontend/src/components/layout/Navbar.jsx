import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiUser, FiShield, FiMenu, FiX, FiSun, FiMoon, FiLogOut } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const Navbar = () => {
  const { cartCount, setIsCartOpen } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const { toggleTheme, isDark } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isMobileMenuOpen ? 'mobile-open' : ''} ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container navbar-content">
        <div className="mobile-menu-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </div>

        <Link to="/" className="nav-logo gradient-text" style={{ fontFamily: 'var(--font-display)', letterSpacing: '3px' }}>
          BLACK LABEL
        </Link>

        <div className={`nav-links ${isMobileMenuOpen ? 'nav-links-open' : ''}`}>
          <Link to="/" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link to="/collections" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Collections</Link>
          {isAuthenticated && user?.role === 'admin' && (
            <Link to="/admin" className="nav-link nav-link-admin" onClick={() => setIsMobileMenuOpen(false)}>Admin Panel</Link>
          )}
        </div>

        <div className="nav-icons">
          <div className="nav-icon theme-toggle" onClick={toggleTheme} title={isDark ? 'Light Mode' : 'Dark Mode'}>
            {isDark ? <FiSun /> : <FiMoon />}
          </div>

          <div className="nav-icon cart-icon" onClick={() => setIsCartOpen(true)} title="Cart">
            <FiShoppingCart />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </div>

          <div
            className="nav-icon user-icon-wrapper"
            ref={dropdownRef}
            onClick={(e) => { e.stopPropagation(); setShowDropdown(prev => !prev); }}
            title="Account"
          >
            <div className={`user-icon-btn ${isAuthenticated ? 'active-user' : ''}`}>
              <FiUser size={20} />
            </div>

            {showDropdown && (
              <div className="user-dropdown-menu">
                {isAuthenticated ? (
                  <>
                    <div className="dropdown-user-header">
                      <div className="dropdown-user-name">Hi, {user?.name}</div>
                      <div className="dropdown-user-role-badge">🛡️ Administrator</div>
                    </div>
                    <div className="dropdown-divider" />
                    <Link to="/admin" className="dropdown-item-link dropdown-admin-highlight" onClick={() => setShowDropdown(false)}>
                      <FiShield /> Admin Dashboard
                    </Link>
                    <div className="dropdown-divider" />
                    <div onClick={() => { setShowDropdown(false); logout(); navigate('/'); }} className="dropdown-item-link dropdown-logout-action">
                      <FiLogOut /> Logout
                    </div>
                  </>
                ) : (
                  <>
                    <div className="dropdown-user-header">
                      <div className="dropdown-user-name">Welcome</div>
                      <div className="dropdown-subtitle">Administrator access only</div>
                    </div>
                    <div className="dropdown-divider" />
                    <Link to="/admin/login" className="dropdown-item-link dropdown-admin-btn" onClick={() => setShowDropdown(false)}>
                      <FiShield /> Admin Login
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
