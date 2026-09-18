import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import CartDrawer from '../cart/CartDrawer';

const MainLayout = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', paddingTop: '80px' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
};

export default MainLayout;
