import React from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';

const Breadcrumb = ({ items }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
      <Link to="/" style={{ hover: { color: 'var(--accent-gold)' } }}>Home</Link>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <FiChevronRight size={14} style={{ color: 'var(--accent-gold)' }} />
          {item.link ? (
            <Link to={item.link}>{item.label}</Link>
          ) : (
            <span style={{ color: 'var(--text-primary)' }}>{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumb;
