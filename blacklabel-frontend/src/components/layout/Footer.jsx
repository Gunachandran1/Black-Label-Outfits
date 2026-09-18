import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiInstagram } from 'react-icons/fi';

const INSTA_URL = 'https://www.instagram.com/blacklabeloutfits/';

const Footer = () => {
  const [showShipping, setShowShipping] = useState(false);
  const [showFaq, setShowFaq] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  return (
    <footer className="bl-footer">
      <div className="container footer-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <div className="footer-brand">
          <h3 className="gradient-text footer-logo">BLACK LABEL</h3>
          <p className="footer-desc">Redefining luxury fashion with uncompromising quality and timeless design.</p>
        </div>

        <div>
          <h4 className="footer-heading">Customer Service</h4>
          <ul className="footer-links">
            <li><a href={INSTA_URL} target="_blank" rel="noopener noreferrer">Contact Us</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); setShowShipping(true); }} style={{ cursor: 'pointer' }}>Shipping Details</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); setShowFaq(true); setOpenFaq(null); }} style={{ cursor: 'pointer' }}>FAQ</a></li>
          </ul>
        </div>

        <div>
          <h4 className="footer-heading">Follow Us</h4>
          <p className="footer-desc">Stay updated with our latest collections and offers.</p>
          <div className="footer-socials">
            <a href={INSTA_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FiInstagram size={22} />
            </a>
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>&copy; {new Date().getFullYear()} Black Label. All rights reserved.</p>
        <div className="footer-legal">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
        </div>
      </div>

      {/* Shipping Details Modal */}
      {showShipping && (
        <div className="shipping-modal-overlay" onClick={() => setShowShipping(false)}>
          <div className="shipping-modal" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', marginBottom: '20px', color: 'var(--accent-gold)' }}>🚚 Shipping Details</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              <div style={{ padding: '16px', background: 'var(--bg-input)', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px', fontSize: '1rem' }}>📦 Delivery Time</div>
                <div>Delivered in <strong style={{ color: 'var(--accent-gold)' }}>3 to 5 working days</strong> across India.</div>
              </div>
              <div style={{ padding: '16px', background: 'var(--bg-input)', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px', fontSize: '1rem' }}>💰 Shipping Cost</div>
                <div><strong style={{ color: 'var(--success)' }}>Free shipping</strong> on all orders!</div>
              </div>
              <div style={{ padding: '16px', background: 'var(--bg-input)', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px', fontSize: '1rem' }}>📍 Shipping Area</div>
                <div>We currently ship to all locations within India.</div>
              </div>
            </div>
            <button
              onClick={() => setShowShipping(false)}
              style={{ marginTop: '24px', width: '100%', padding: '14px', background: 'var(--accent-gold)', color: '#050505', border: 'none', borderRadius: '10px', fontSize: '0.95rem', fontWeight: 700, cursor: 'pointer', letterSpacing: '0.5px' }}
            >
              Got it
            </button>
          </div>
        </div>
      )}

      {/* FAQ Modal */}
      {showFaq && (
        <div className="shipping-modal-overlay" onClick={() => setShowFaq(false)}>
          <div className="shipping-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '560px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', marginBottom: '24px', color: 'var(--accent-gold)' }}>❓ Frequently Asked Questions</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                {
                  q: 'How long will delivery take?',
                  a: 'Orders are usually delivered within 3–5 working days after dispatch.'
                },
                {
                  q: 'Do you offer free shipping?',
                  a: 'Yes! We provide FREE shipping on all orders across India.'
                },
                {
                  q: 'How can I track my order?',
                  a: 'Once your order is shipped, you will receive tracking details to follow your delivery.'
                },
                {
                  q: 'Can I return or exchange my order?',
                  a: 'No, returns/exchanges are not available for products.'
                },
                {
                  q: 'What payment methods do you accept?',
                  a: 'We accept UPI and other secure online payment methods.'
                }
              ].map((faq, idx) => (
                <div
                  key={idx}
                  className="faq-item"
                  style={{
                    border: '1px solid var(--border-color)',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    background: openFaq === idx ? 'var(--bg-input)' : 'transparent',
                    transition: 'all 0.2s'
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    style={{
                      width: '100%', padding: '16px 18px',
                      background: 'transparent', border: 'none',
                      color: 'var(--text-primary)', cursor: 'pointer',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      fontSize: '0.92rem', fontWeight: 600, textAlign: 'left',
                      gap: '12px'
                    }}
                  >
                    <span>{faq.q}</span>
                    <span style={{
                      fontSize: '1.2rem', fontWeight: 300, flexShrink: 0,
                      transform: openFaq === idx ? 'rotate(45deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s', color: 'var(--accent-gold)'
                    }}>+</span>
                  </button>
                  {openFaq === idx && (
                    <div style={{
                      padding: '0 18px 16px',
                      color: 'var(--text-secondary)',
                      fontSize: '0.88rem',
                      lineHeight: 1.7,
                      animation: 'fadeIn 0.2s ease'
                    }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowFaq(false)}
              style={{ marginTop: '24px', width: '100%', padding: '14px', background: 'var(--accent-gold)', color: '#050505', border: 'none', borderRadius: '10px', fontSize: '0.95rem', fontWeight: 700, cursor: 'pointer', letterSpacing: '0.5px' }}
            >
              Got it
            </button>
          </div>
        </div>
      )}

      <style>{`
        .bl-footer {
          background: var(--bg-secondary);
          border-top: 2px solid var(--accent-gold);
          padding-top: 60px;
          padding-bottom: 20px;
          margin-top: auto;
        }
        .footer-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 40px;
          margin-bottom: 40px;
        }
        .footer-logo {
          font-family: var(--font-display);
          margin-bottom: 20px;
          letter-spacing: 2px;
        }
        .footer-desc {
          color: var(--text-secondary);
          font-size: 0.9rem;
          line-height: 1.7;
          margin-bottom: 15px;
        }
        .footer-heading {
          margin-bottom: 20px;
          font-family: var(--font-display);
          font-size: 1rem;
        }
        .footer-links {
          display: flex;
          flex-direction: column;
          gap: 10px;
          list-style: none;
        }
        .footer-links a {
          color: var(--text-secondary);
          text-decoration: none;
          transition: color 0.2s;
          font-size: 0.9rem;
        }
        .footer-links a:hover {
          color: var(--accent-gold);
        }
        .footer-socials {
          display: flex;
          gap: 15px;
          margin-top: 10px;
        }
        .footer-socials a {
          color: var(--text-secondary);
          transition: color 0.2s;
        }
        .footer-socials a:hover {
          color: var(--accent-gold);
        }
        .footer-bottom {
          border-top: 1px solid var(--border-color);
          padding-top: 20px;
          display: flex;
          justify-content: space-between;
          color: var(--text-muted);
          font-size: 0.8rem;
          flex-wrap: wrap;
          gap: 10px;
        }
        .footer-legal {
          display: flex;
          gap: 15px;
        }
        .footer-legal a {
          color: var(--text-muted);
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-legal a:hover {
          color: var(--accent-gold);
        }

        /* ── Responsive ── */
        @media (max-width: 992px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 32px;
          }
        }
        @media (max-width: 576px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 28px;
          }
          .bl-footer {
            padding-top: 40px;
          }
          .footer-bottom {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
          .footer-legal {
            justify-content: center;
          }
        }

        /* ── Shipping Modal ── */
        .shipping-modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(4px);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: fadeIn 0.2s ease;
        }
        .shipping-modal {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 16px;
          padding: 32px;
          max-width: 480px;
          width: 100%;
          box-shadow: 0 24px 48px rgba(0,0,0,0.4);
          animation: fadeIn 0.3s ease;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
