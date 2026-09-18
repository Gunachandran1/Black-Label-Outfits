import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import { FiAlertTriangle } from 'react-icons/fi';

const NotFoundPage = () => {
  return (
    <div style={{ height: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', animation: 'fadeIn 0.5s' }}>
      <FiAlertTriangle size={80} style={{ color: 'var(--accent-gold)', marginBottom: '20px' }} />
      <h1 style={{ fontSize: '4rem', marginBottom: '10px' }}>404</h1>
      <h2 style={{ fontSize: '1.5rem', color: 'var(--text-secondary)', marginBottom: '30px' }}>Page Not Found</h2>
      <p style={{ color: 'var(--text-muted)', maxWidth: '400px', marginBottom: '40px' }}>
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link to="/">
        <Button size="lg">Back to Home</Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
