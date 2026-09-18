import React from 'react';
import Spinner from './Spinner';

const Button = ({ children, variant = 'primary', size = 'md', loading = false, className = '', ...props }) => {
  const baseClass = `btn btn-${variant} ${className}`;
  const sizeStyles = {
    sm: { padding: '6px 12px', fontSize: '0.875rem' },
    md: { padding: '10px 20px', fontSize: '1rem' },
    lg: { padding: '14px 28px', fontSize: '1.125rem' }
  };

  return (
    <button 
      className={baseClass} 
      style={{ ...sizeStyles[size], opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
      disabled={loading}
      {...props}
    >
      {loading ? <Spinner size="sm" /> : children}
    </button>
  );
};

export default Button;
