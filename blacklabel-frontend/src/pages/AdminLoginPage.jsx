import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiShield, FiMail, FiLock, FiAlertCircle } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const userData = await login(email, password);
      if (userData.role !== 'admin') {
        toast.error('Access denied. Admin credentials required.');
        setError('Invalid admin credentials. Only authorized administrators can access this panel.');
        setLoading(false);
        return;
      }
      toast.success('Welcome to Admin Panel!');
      navigate('/admin');
    } catch (err) {
      setError('Invalid admin credentials. Please check your email and password.');
      toast.error('Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page admin-login-page">
      <div className="auth-card admin-login-card">
        <div className="auth-header">
          <div className="auth-icon admin-auth-icon">
            <FiShield size={36} />
          </div>
          <h1 className="gradient-text auth-title">ADMIN PANEL</h1>
          <p className="auth-subtitle">Secure administrator access</p>
        </div>

        {error && (
          <div className="auth-error">
            <FiAlertCircle /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <label className="input-label">Admin Email</label>
            <div className="input-with-icon">
              <FiMail className="input-icon" />
              <input
                type="email"
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@blacklabel.com"
              />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Admin Password</label>
            <div className="input-with-icon">
              <FiLock className="input-icon" />
              <input
                type="password"
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter admin password"
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-lg auth-submit" disabled={loading}>
            {loading ? <span className="spinner-sm"></span> : 'Access Admin Panel'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
