import React from 'react';

const Spinner = ({ size = 'md' }) => {
  const sizeMap = {
    sm: '16px',
    md: '24px',
    lg: '32px'
  };
  
  return (
    <div style={{ 
      width: sizeMap[size], 
      height: sizeMap[size], 
      border: '2px solid rgba(201, 169, 110, 0.3)', 
      borderTopColor: 'var(--accent-gold)', 
      borderRadius: '50%', 
      animation: 'spin 1s linear infinite' 
    }}>
      <style>
        {`@keyframes spin { to { transform: rotate(360deg); } }`}
      </style>
    </div>
  );
};

export default Spinner;
