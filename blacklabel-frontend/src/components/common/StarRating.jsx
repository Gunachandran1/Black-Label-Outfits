import React from 'react';

const StarRating = ({ rating, max = 5, size = 16 }) => {
  return (
    <div style={{ display: 'flex', gap: '2px' }}>
      {[...Array(max)].map((_, i) => (
        <span key={i} style={{ color: i < rating ? 'var(--accent-gold)' : 'var(--border-color)', fontSize: size }}>
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
