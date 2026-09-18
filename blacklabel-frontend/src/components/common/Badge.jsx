import React from 'react';

const Badge = ({ children, type = 'default', position = 'relative' }) => {
  const types = {
    default: { bg: 'var(--bg-elevated)', color: 'var(--text-primary)' },
    gold: { bg: 'var(--accent-gold)', color: '#000' },
    sale: { bg: 'var(--error)', color: '#fff' },
    new: { bg: 'var(--success)', color: '#fff' }
  };
  
  const currentStyle = types[type] || types.default;
  
  const style = {
    background: currentStyle.bg,
    color: currentStyle.color,
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '0.75rem',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    zIndex: 10,
    ...(position === 'absolute' ? { position: 'absolute', top: '10px', left: '10px' } : {})
  };

  return <span style={style}>{children}</span>;
};

export default Badge;
