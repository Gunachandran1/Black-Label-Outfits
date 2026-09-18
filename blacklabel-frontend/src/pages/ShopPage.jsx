import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Breadcrumb from '../components/common/Breadcrumb';
import ProductGrid from '../components/product/ProductGrid';
import { FiChevronDown, FiChevronUp, FiFilter, FiX } from 'react-icons/fi';
import { getProducts, getCategories } from '../store/productStore';

const FILTER_TABS = [
  { key: 'all', label: 'All' },
  { key: 'trending', label: 'Trending' },
  { key: 'new', label: 'New Arrivals' },
  { key: 'sale', label: 'On Sale' },
];

const SORT_OPTIONS = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest First' },
  { value: 'rating', label: 'Highest Rated' },
];

const ShopPage = () => {
  const [searchParams] = useSearchParams();
  const initialFilter = searchParams.get('filter') || 'all';
  const initialCategory = searchParams.get('category') || '';

  const [activeFilter, setActiveFilter] = useState(initialFilter);
  const [selectedCategories, setSelectedCategories] = useState(
    initialCategory ? [initialCategory.charAt(0).toUpperCase() + initialCategory.slice(1)] : []
  );
  const [sortBy, setSortBy] = useState('recommended');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [expandedSections, setExpandedSections] = useState({ category: true, price: true });
  const [priceRange, setPriceRange] = useState([0, 10000]);

  const allProducts = useMemo(() => getProducts(), []);
  const categories = useMemo(() => getCategories(), []);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleCategory = (cat) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 10000]);
    setActiveFilter('all');
  };

  // Apply filters
  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    // Tab filter
    if (activeFilter === 'trending') {
      result = result.sort((a, b) => b.reviewsCount - a.reviewsCount);
    } else if (activeFilter === 'new') {
      result = result.filter(p => p.isNew);
    } else if (activeFilter === 'sale') {
      result = result.filter(p => p.discountPrice && p.discountPrice < p.basePrice);
    }

    // Category filter
    if (selectedCategories.length > 0) {
      result = result.filter(p => selectedCategories.includes(p.category));
    }

    // Price filter
    result = result.filter(p => {
      const price = p.discountPrice || p.basePrice;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => (a.discountPrice || a.basePrice) - (b.discountPrice || b.basePrice));
        break;
      case 'price-desc':
        result.sort((a, b) => (b.discountPrice || b.basePrice) - (a.discountPrice || a.basePrice));
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return result;
  }, [allProducts, activeFilter, selectedCategories, priceRange, sortBy]);

  const filterSidebar = (
    <div className="collections-sidebar" style={{
      width: '260px',
      flexShrink: 0,
      position: 'sticky',
      top: '100px',
      maxHeight: 'calc(100vh - 120px)',
      overflowY: 'auto',
      paddingRight: '8px',
      paddingBottom: '40px'
    }}>
      {/* Filter Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h3 style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
          <FiFilter style={{ marginRight: '8px' }} /> Filters
        </h3>
        {(selectedCategories.length > 0 || priceRange[0] > 0 || priceRange[1] < 10000) && (
          <button onClick={clearFilters} style={{
            background: 'none', border: 'none', color: 'var(--accent-gold)',
            fontSize: '0.78rem', cursor: 'pointer', fontWeight: 600
          }}>Clear All</button>
        )}
      </div>

      {/* Active Filters */}
      {selectedCategories.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
          {selectedCategories.map(cat => (
            <span key={cat} onClick={() => toggleCategory(cat)} style={{
              background: 'rgba(201,169,110,0.1)', border: '1px solid var(--border-gold)',
              color: 'var(--accent-gold)', padding: '4px 10px', borderRadius: '8px',
              fontSize: '0.72rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px'
            }}>
              {cat} <FiX size={12} />
            </span>
          ))}
        </div>
      )}

      {/* Category Section */}
      <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '20px', marginBottom: '20px' }}>
        <div onClick={() => toggleSection('category')} style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          cursor: 'pointer', marginBottom: expandedSections.category ? '14px' : '0'
        }}>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 600 }}>Category</h4>
          {expandedSections.category ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
        </div>
        {expandedSections.category && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {categories.map(cat => (
              <label key={cat} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '0.88rem' }}>
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                  style={{ accentColor: 'var(--accent-gold)', width: '16px', height: '16px' }}
                />
                <span style={{ color: selectedCategories.includes(cat) ? 'var(--text-primary)' : 'var(--text-secondary)' }}>{cat}</span>
                <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  ({allProducts.filter(p => p.category === cat).length})
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div style={{ paddingBottom: '20px' }}>
        <div onClick={() => toggleSection('price')} style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          cursor: 'pointer', marginBottom: expandedSections.price ? '14px' : '0'
        }}>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 600 }}>Price Range</h4>
          {expandedSections.price ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
        </div>
        {expandedSections.price && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
              <span>₹{priceRange[0].toLocaleString()}</span>
              <span>₹{priceRange[1].toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="0" max="10000" step="500"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              style={{ width: '100%', accentColor: 'var(--accent-gold)' }}
            />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="container" style={{ padding: '40px 20px', animation: 'fadeIn 0.4s' }}>
      <Breadcrumb items={[{ label: 'Collections' }]} />

      {/* Page Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.8rem', fontWeight: 600, letterSpacing: '1px', marginBottom: '8px' }}>
          Collections
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Explore our curated collection of premium shirts
        </p>
      </div>

      {/* Filter Tabs + Sort */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: '32px', flexWrap: 'wrap', gap: '16px'
      }}>
        <div className="filter-tabs-wrapper" style={{ display: 'flex', gap: '4px', background: 'var(--bg-card)', borderRadius: '12px', padding: '4px', border: '1px solid var(--border-color)', overflowX: 'auto' }}>
          {FILTER_TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key)}
              style={{
                padding: '10px 20px',
                borderRadius: '10px',
                border: 'none',
                background: activeFilter === tab.key ? 'var(--accent-gold)' : 'transparent',
                color: activeFilter === tab.key ? '#050505' : 'var(--text-secondary)',
                fontWeight: activeFilter === tab.key ? 700 : 500,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.25s',
                letterSpacing: '0.3px'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
          </span>
          <div style={{ position: 'relative' }}>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                appearance: 'none',
                background: 'var(--bg-input)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                padding: '10px 40px 10px 16px',
                borderRadius: '10px',
                cursor: 'pointer',
                fontSize: '0.85rem'
              }}
            >
              {SORT_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <FiChevronDown style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-secondary)' }} />
          </div>
        </div>
      </div>

      {/* Main Content: Sidebar + Grid */}
      <div className="collections-layout" style={{ display: 'flex', gap: '32px' }}>
        {filterSidebar}
        <div style={{ flex: 1, minWidth: 0 }}>
          <ProductGrid products={filteredProducts} columns={4} />
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
