import React from 'react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { FiUser, FiMapPin, FiLogOut } from 'react-icons/fi';

const ProfilePage = () => {
  const { user, logout } = useAuth();

  return (
    <div className="container" style={{ padding: '40px 20px', animation: 'fadeIn 0.4s' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '40px' }}>My Account</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '40px' }}>
        {/* Sidebar */}
        <div style={{ background: 'var(--bg-card)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', alignSelf: 'start' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px', paddingBottom: '20px', borderBottom: '1px solid var(--border-color)' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'var(--accent-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontSize: '1.2rem', fontWeight: 'bold' }}>
              {user?.name.charAt(0)}
            </div>
            <div>
              <div style={{ fontWeight: 'bold' }}>{user?.name}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{user?.email}</div>
            </div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <a href="#profile" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-gold)', fontWeight: 'bold' }}><FiUser /> Profile Details</a>
            <a href="#addresses" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-secondary)' }}><FiMapPin /> Saved Addresses</a>
            <div onClick={logout} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--error)', cursor: 'pointer', marginTop: '20px', paddingTop: '20px', borderTop: '1px solid var(--border-color)' }}>
              <FiLogOut /> Logout
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <div style={{ background: 'var(--bg-card)', padding: '30px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '20px', color: 'var(--accent-gold)' }}>Profile Details</h2>
            <form style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <Input label="Full Name" defaultValue={user?.name} />
              <Input label="Email Address" defaultValue={user?.email} disabled />
              <Input label="Phone Number" defaultValue="+1 234 567 8900" />
              <Input label="Date of Birth" type="date" />
              <div style={{ gridColumn: 'span 2' }}>
                <Button>Save Changes</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
