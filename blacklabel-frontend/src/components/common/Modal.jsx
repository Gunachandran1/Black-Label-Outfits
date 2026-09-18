import React from 'react';
import { FiX } from 'react-icons/fi';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="glass-card" style={{ width: '90%', maxWidth: '500px', background: 'var(--bg-card)', padding: '20px', position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
          <h2 style={{ fontSize: '1.2rem', color: 'var(--accent-gold)' }}>{title}</h2>
          <FiX size={24} style={{ cursor: 'pointer' }} onClick={onClose} />
        </div>
        <div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
