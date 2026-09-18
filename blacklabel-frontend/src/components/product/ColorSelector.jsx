import React from 'react';
import { FiCheck } from 'react-icons/fi';

const ColorSelector = ({ colors, selectedColor, onSelectColor }) => {
  if (!colors || colors.length === 0) return null;

  return (
    <div>
      <div style={{ marginBottom: '10px', color: 'var(--text-secondary)' }}>
        Color: <span style={{ color: 'var(--text-primary)', fontWeight: 'bold' }}>{selectedColor?.name}</span>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
        {colors.map(color => (
          <div
            key={color.name}
            onClick={() => onSelectColor(color)}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: color.code,
              border: '1px solid #444',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              outline: selectedColor?.name === color.name ? '2px solid var(--accent-gold)' : 'none',
              outlineOffset: '3px'
            }}
          >
            {selectedColor?.name === color.name && (
              <FiCheck color={color.code === '#FFFFFF' ? '#000' : '#FFF'} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorSelector;
