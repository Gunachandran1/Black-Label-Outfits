import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboard from './pages/AdminDashboard';
import NotFoundPage from './pages/NotFoundPage';
import AdminRoute from './components/common/AdminRoute';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/collections" element={<ShopPage />} />
        <Route path="/product/:slug" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
