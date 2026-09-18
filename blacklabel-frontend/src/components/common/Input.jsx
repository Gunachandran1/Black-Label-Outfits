import React, { forwardRef } from 'react';

const Input = forwardRef(({ label, error, className = '', ...props }, ref) => {
  return (
    <div className={`input-group ${className}`}>
      {label && <label className="input-label">{label}</label>}
      <input 
        className="input-field" 
        style={{ borderColor: error ? 'var(--error)' : 'var(--border-color)' }}
        ref={ref} 
        {...props} 
      />
      {error && <span style={{ color: 'var(--error)', fontSize: '0.8rem' }}>{error}</span>}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
