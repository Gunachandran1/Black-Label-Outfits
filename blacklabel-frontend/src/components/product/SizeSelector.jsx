import React from 'react';

const SizeSelector = ({ sizes, selectedSize, onSelectSize }) => {
  if (!sizes || sizes.length === 0) return null;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <span style={{ color: 'var(--text-secondary)' }}>Size</span>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {sizes.map(size => (
          <button
            key={size}
            onClick={() => onSelectSize(size)}
            style={{
              padding: '10px 15px',
              background: selectedSize === size ? 'var(--accent-gold)' : 'var(--bg-input)',
              color: selectedSize === size ? '#000' : 'var(--text-primary)',
              border: `1px solid ${selectedSize === size ? 'var(--accent-gold)' : 'var(--border-color)'}`,
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer',
              fontWeight: selectedSize === size ? 'bold' : 'normal',
              transition: 'var(--transition-fast)'
            }}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;
