import React, { useState, useCallback } from 'react';
import {
  FiPackage, FiUsers, FiShoppingBag, FiSettings,
  FiDollarSign, FiPlus, FiEdit2, FiTrash2, FiX,
  FiGrid, FiSearch
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import * as store from '../store/productStore';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [products, setProducts] = useState(() => store.getAllProducts());
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: '', basePrice: '', discountPrice: '', category: 'Formal',
    image: '', stock: '', isFeatured: false, isNew: false, isActive: true,
    description: '', sizes: 'S, M, L, XL', colors: '', colorImages: ''
  });

  const refreshProducts = useCallback(() => {
    setProducts(store.getAllProducts());
  }, []);

  const handleProductToggle = (id, field) => {
    store.updateProduct(id, { [field]: !products.find(p => p.id === id)?.[field] });
    refreshProducts();
    toast.success('Product updated');
  };

  const deleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      store.deleteProduct(id);
      refreshProducts();
      toast.success('Product deleted');
    }
  };

  const openProductModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setProductForm({
        name: product.name || '',
        basePrice: product.basePrice || '',
        discountPrice: product.discountPrice || '',
        category: product.category || 'Formal',
        image: product.image || '',
        stock: product.stock || '',
        isFeatured: product.isFeatured || false,
        isNew: product.isNew || false,
        isActive: product.isActive !== false,
        description: product.description || '',
        sizes: (product.sizes || []).join(', '),
        colors: (product.colors || []).map(c => `${c.name}:${c.code}`).join(', '),
        colorImages: product.colorImages
          ? Object.entries(product.colorImages).map(([name, path]) => `${name}:${path}`).join(', ')
          : ''
      });
    } else {
      setEditingProduct(null);
      setProductForm({
        name: '', basePrice: '', discountPrice: '', category: 'Formal',
        image: '', stock: '', isFeatured: false, isNew: false, isActive: true,
        description: '', sizes: 'S, M, L, XL', colors: '', colorImages: ''
      });
    }
    setIsProductModalOpen(true);
  };

  const saveProduct = (e) => {
    e.preventDefault();
    const sizesArr = productForm.sizes.split(',').map(s => s.trim()).filter(Boolean);

    // Parse colors — format: "Blue:#7A9FB5, Red:#FF0000" or just "Blue, Red"
    const colorsArr = productForm.colors.split(',').map(s => s.trim()).filter(Boolean).map(entry => {
      const [name, code] = entry.split(':').map(s => s.trim());
      return { name, code: code || '#888888' };
    });

    // Parse colorImages — format: "Blue:/shirts/blue.jpg, Red:/shirts/red.jpg"
    const colorImagesObj = {};
    if (productForm.colorImages) {
      productForm.colorImages.split(',').forEach(entry => {
        const colonIdx = entry.indexOf(':');
        if (colonIdx > 0) {
          const name = entry.substring(0, colonIdx).trim();
          const path = entry.substring(colonIdx + 1).trim();
          if (name && path) colorImagesObj[name] = path;
        }
      });
    }

    const data = {
      name: productForm.name,
      basePrice: parseFloat(productForm.basePrice),
      discountPrice: productForm.discountPrice ? parseFloat(productForm.discountPrice) : null,
      category: productForm.category,
      image: productForm.image,
      stock: parseInt(productForm.stock) || 0,
      isFeatured: productForm.isFeatured,
      isNew: productForm.isNew,
      isActive: productForm.isActive,
      description: productForm.description,
      sizes: sizesArr,
      colors: colorsArr,
      colorImages: Object.keys(colorImagesObj).length > 0 ? colorImagesObj : undefined
    };

    if (editingProduct) {
      store.updateProduct(editingProduct.id, data);
      toast.success('Product updated — changes are live on the website!');
    } else {
      store.addProduct(data);
      toast.success('Product added — now visible in Collections!');
    }
    refreshProducts();
    setIsProductModalOpen(false);
  };

  const filteredProducts = searchQuery
    ? products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase()))
    : products;

  const getStatusClass = (status) => `status-badge status-${status.toLowerCase()}`;
  const categories = store.getCategories();
  const totalRevenue = products.reduce((sum, p) => sum + ((p.discountPrice || p.basePrice) * (p.stock || 0)), 0);
  const activeCount = products.filter(p => p.isActive).length;

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>Admin Dashboard</h1>
        <span style={{ color: 'var(--text-secondary)' }}>Manage your store</span>
      </div>

      <div className="admin-tabs">
        <button className={`admin-tab ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}><FiGrid style={{ marginRight: '6px' }} /> Overview</button>
        <button className={`admin-tab ${activeTab === 'products' ? 'active' : ''}`} onClick={() => setActiveTab('products')}><FiPackage style={{ marginRight: '6px' }} /> Products</button>
        <button className={`admin-tab ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')}><FiShoppingBag style={{ marginRight: '6px' }} /> Orders</button>
        <button className={`admin-tab ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}><FiSettings style={{ marginRight: '6px' }} /> Settings</button>
      </div>

      {activeTab === 'overview' && (
        <div style={{ animation: 'fadeIn 0.3s' }}>
          <div className="admin-stats">
            <div className="admin-stat-card">
              <div className="admin-stat-header"><span className="admin-stat-label">Total Products</span><FiPackage className="admin-stat-icon" style={{ color: 'var(--accent-gold)' }} size={24} /></div>
              <div className="admin-stat-value">{products.length}</div>
              <div className="admin-stat-change">{activeCount} active listings</div>
            </div>
            <div className="admin-stat-card">
              <div className="admin-stat-header"><span className="admin-stat-label">Featured</span><FiGrid className="admin-stat-icon" style={{ color: 'var(--info)' }} size={24} /></div>
              <div className="admin-stat-value">{products.filter(p => p.isFeatured).length}</div>
              <div className="admin-stat-change">Shown on homepage</div>
            </div>
            <div className="admin-stat-card">
              <div className="admin-stat-header"><span className="admin-stat-label">New Arrivals</span><FiShoppingBag className="admin-stat-icon" style={{ color: 'var(--success)' }} size={24} /></div>
              <div className="admin-stat-value">{products.filter(p => p.isNew).length}</div>
              <div className="admin-stat-change">Marked as new</div>
            </div>
            <div className="admin-stat-card">
              <div className="admin-stat-header"><span className="admin-stat-label">Categories</span><FiUsers className="admin-stat-icon" style={{ color: '#9c27b0' }} size={24} /></div>
              <div className="admin-stat-value">{categories.length}</div>
              <div className="admin-stat-change">{categories.join(', ')}</div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'products' && (
        <div style={{ animation: 'fadeIn 0.3s' }}>
          <div className="admin-table-container">
            <div className="admin-table-header">
              <div className="admin-table-title">Products ({filteredProducts.length})</div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ position: 'relative' }}>
                  <FiSearch style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type="text"
                    className="admin-search"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ paddingLeft: '36px' }}
                  />
                </div>
                <button className="btn btn-primary btn-sm" onClick={() => openProductModal()}>
                  <FiPlus /> Add Product
                </button>
              </div>
            </div>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Featured</th>
                  <th>New</th>
                  <th>Active</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map(product => (
                  <tr key={product.id}>
                    <td>
                      <div className="admin-product-cell">
                        <img src={product.image} alt={product.name} className="admin-product-img" />
                        <div>
                          <div className="admin-product-name">{product.name}</div>
                          <div className="admin-product-category">{product.category}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      {product.discountPrice ? (
                        <div>
                          <span style={{ color: 'var(--accent-gold)', fontWeight: 600 }}>₹{product.discountPrice.toLocaleString()}</span>
                          <span style={{ textDecoration: 'line-through', fontSize: '0.8rem', marginLeft: '8px', color: 'var(--text-muted)' }}>₹{product.basePrice.toLocaleString()}</span>
                        </div>
                      ) : (
                        <span style={{ fontWeight: 600 }}>₹{product.basePrice?.toLocaleString()}</span>
                      )}
                    </td>
                    <td>
                      <span style={{ color: product.stock < 20 ? 'var(--error)' : 'inherit' }}>{product.stock} units</span>
                    </td>
                    <td>
                      <div className={`admin-toggle ${product.isFeatured ? 'active' : ''}`} onClick={() => handleProductToggle(product.id, 'isFeatured')} />
                    </td>
                    <td>
                      <div className={`admin-toggle ${product.isNew ? 'active' : ''}`} onClick={() => handleProductToggle(product.id, 'isNew')} />
                    </td>
                    <td>
                      <div className={`admin-toggle ${product.isActive ? 'active' : ''}`} onClick={() => handleProductToggle(product.id, 'isActive')} />
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button className="admin-action-btn admin-action-edit" onClick={() => openProductModal(product)}><FiEdit2 /></button>
                        <button className="admin-action-btn admin-action-delete" onClick={() => deleteProduct(product.id)}><FiTrash2 /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'orders' && (
        <div style={{ animation: 'fadeIn 0.3s' }}>
          <div className="admin-table-container" style={{ padding: '40px', textAlign: 'center' }}>
            <FiShoppingBag size={48} style={{ color: 'var(--text-muted)', marginBottom: '16px' }} />
            <h3 style={{ marginBottom: '8px' }}>Orders will appear here</h3>
            <p style={{ color: 'var(--text-secondary)' }}>When customers place orders, they will be listed here for management.</p>
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div style={{ animation: 'fadeIn 0.3s' }}>
          <div className="admin-table-container" style={{ padding: '30px' }}>
            <h2 style={{ marginBottom: '24px', fontFamily: 'var(--font-display)' }}>Store Settings</h2>
            <div style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '6px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Store Name</label>
                <input type="text" className="admin-search" style={{ width: '100%' }} defaultValue="Black Label" />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '6px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Support Email</label>
                <input type="email" className="admin-search" style={{ width: '100%' }} defaultValue="support@blacklabel.com" />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '6px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Instagram Handle</label>
                <input type="text" className="admin-search" style={{ width: '100%' }} defaultValue="@blacklabeloutfits" />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '6px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Currency</label>
                <select className="admin-search" style={{ width: '100%' }}>
                  <option value="INR">INR (₹)</option>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                </select>
              </div>
              <button className="btn btn-primary" style={{ width: 'fit-content', borderRadius: '10px' }}>Save Settings</button>
            </div>
          </div>
        </div>
      )}

      {/* Product Modal */}
      {isProductModalOpen && (
        <div className="admin-modal-overlay" onClick={() => setIsProductModalOpen(false)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()} style={{ borderRadius: '16px' }}>
            <div className="admin-modal-header">
              <h2 style={{ fontFamily: 'var(--font-display)' }}>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
              <button className="admin-modal-close" onClick={() => setIsProductModalOpen(false)}><FiX /></button>
            </div>
            <form onSubmit={saveProduct}>
              <div className="admin-modal-body" style={{ maxHeight: '65vh', overflowY: 'auto' }}>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '6px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Product Name *</label>
                  <input type="text" className="admin-search" style={{ width: '100%' }} required
                    value={productForm.name} onChange={e => setProductForm({ ...productForm, name: e.target.value })} />
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '6px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Description</label>
                  <textarea className="admin-search" style={{ width: '100%', minHeight: '80px', resize: 'vertical' }}
                    value={productForm.description} onChange={e => setProductForm({ ...productForm, description: e.target.value })} />
                </div>
                <div className="admin-form-row">
                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Base Price (₹) *</label>
                    <input type="number" step="1" className="admin-search" style={{ width: '100%' }} required
                      value={productForm.basePrice} onChange={e => setProductForm({ ...productForm, basePrice: e.target.value })} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Sale Price (₹) - Optional</label>
                    <input type="number" step="1" className="admin-search" style={{ width: '100%' }}
                      value={productForm.discountPrice || ''} onChange={e => setProductForm({ ...productForm, discountPrice: e.target.value })} />
                  </div>
                </div>
                <div className="admin-form-row">
                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Category *</label>
                    <select className="admin-search" style={{ width: '100%' }} value={productForm.category} onChange={e => setProductForm({ ...productForm, category: e.target.value })}>
                      <option value="Formal">Formal</option>
                      <option value="Casual">Casual</option>
                      <option value="Premium">Premium</option>
                      <option value="Evening">Evening</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Stock *</label>
                    <input type="number" className="admin-search" style={{ width: '100%' }} required
                      value={productForm.stock} onChange={e => setProductForm({ ...productForm, stock: e.target.value })} />
                  </div>
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '6px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Default Image Path *  <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>(e.g. /shirts/my-shirt.jpg)</span></label>
                  <input type="text" className="admin-search" style={{ width: '100%' }} required placeholder="/shirts/filename.jpg"
                    value={productForm.image} onChange={e => setProductForm({ ...productForm, image: e.target.value })} />
                  {productForm.image && (
                    <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img src={productForm.image} alt="Preview" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--border-color)' }}
                        onError={(e) => { e.target.style.display = 'none'; }} />
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Preview</span>
                    </div>
                  )}
                </div>
                <div className="admin-form-row">
                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Sizes (comma-separated)</label>
                    <input type="text" className="admin-search" style={{ width: '100%' }} placeholder="S, M, L, XL"
                      value={productForm.sizes} onChange={e => setProductForm({ ...productForm, sizes: e.target.value })} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '6px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Colors  <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>(Name:#hex)</span></label>
                    <input type="text" className="admin-search" style={{ width: '100%' }} placeholder="Blue:#7A9FB5, Red:#FF0000"
                      value={productForm.colors} onChange={e => setProductForm({ ...productForm, colors: e.target.value })} />
                  </div>
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '6px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Color Images  <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>(ColorName:/shirts/file.jpg)</span></label>
                  <input type="text" className="admin-search" style={{ width: '100%' }} placeholder="Blue:/shirts/blue.jpg, Red:/shirts/red.jpg"
                    value={productForm.colorImages} onChange={e => setProductForm({ ...productForm, colorImages: e.target.value })} />
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
                    Color names must match exactly with the Colors field above
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '24px', padding: '12px 0' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input type="checkbox" checked={productForm.isFeatured} onChange={e => setProductForm({ ...productForm, isFeatured: e.target.checked })} style={{ accentColor: 'var(--accent-gold)' }} />
                    <span>Featured</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input type="checkbox" checked={productForm.isNew} onChange={e => setProductForm({ ...productForm, isNew: e.target.checked })} style={{ accentColor: 'var(--accent-gold)' }} />
                    <span>New Arrival</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input type="checkbox" checked={productForm.isActive} onChange={e => setProductForm({ ...productForm, isActive: e.target.checked })} style={{ accentColor: 'var(--accent-gold)' }} />
                    <span>Active</span>
                  </label>
                </div>
              </div>
              <div className="admin-modal-footer">
                <button type="button" className="btn btn-ghost" onClick={() => setIsProductModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ borderRadius: '10px' }}>{editingProduct ? 'Save Changes' : 'Add Product'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
