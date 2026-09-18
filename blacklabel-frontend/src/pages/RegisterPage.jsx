import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiUser } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    setLoading(true);
    try {
      // For demo, we just simulate a registration then try to login (which will likely fail if using mock, but we can mock it here too)
      await new Promise(resolve => setTimeout(resolve, 800));
      toast.success('Account created successfully! Please login.');
      navigate('/login');
    } catch (err) {
      toast.error('Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card glass-card">
        <div className="auth-header">
          <h1 className="gradient-text auth-title">BLACK LABEL</h1>
          <p className="auth-subtitle">Create your account</p>
        </div>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="admin-form-row">
            <div className="input-group">
              <label className="input-label">First Name</label>
              <div className="input-with-icon">
                <FiUser className="input-icon" />
                <input type="text" className="input-field" name="firstName" value={formData.firstName} onChange={handleChange} required placeholder="First Name" />
              </div>
            </div>
            <div className="input-group">
              <label className="input-label">Last Name</label>
              <div className="input-with-icon">
                <FiUser className="input-icon" />
                <input type="text" className="input-field" name="lastName" value={formData.lastName} onChange={handleChange} required placeholder="Last Name" />
              </div>
            </div>
          </div>
          
          <div className="input-group">
            <label className="input-label">Email Address</label>
            <div className="input-with-icon">
              <FiMail className="input-icon" />
              <input type="email" className="input-field" name="email" value={formData.email} onChange={handleChange} required placeholder="your@email.com" />
            </div>
          </div>
          
          <div className="input-group">
            <label className="input-label">Password</label>
            <div className="input-with-icon">
              <FiLock className="input-icon" />
              <input type="password" className="input-field" name="password" value={formData.password} onChange={handleChange} required placeholder="Create password" />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Confirm Password</label>
            <div className="input-with-icon">
              <FiLock className="input-icon" />
              <input type="password" className="input-field" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required placeholder="Confirm password" />
            </div>
          </div>
          
          <button type="submit" className="btn btn-primary btn-lg auth-submit" disabled={loading}>
            {loading ? <span className="spinner-sm"></span> : 'Create Account'}
          </button>
        </form>
        
        <div className="auth-footer">
          <p>Already have an account? <Link to="/login" className="auth-link">Sign In</Link></p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
