import React from 'react';

const ProductFilter = ({ filters, setFilters }) => {
  const categories = ['Casual', 'Formal'];
  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
  const colors = [
    { name: 'Black', code: '#000000' },
    { name: 'White', code: '#FFFFFF' },
    { name: 'Navy', code: '#000080' },
    { name: 'Grey', code: '#808080' },
    { name: 'Gold', code: '#C9A96E' },
    { name: 'Burgundy', code: '#800020' }
  ];

  const handleCategoryToggle = (category) => {
    // simplified for mock
  };

  return (
    <div className="filter-sidebar">
      <div className="filter-header">
        <h3 className="filter-title">Filters</h3>
        <button className="clear-filters">Clear All</button>
      </div>

      {/* Categories */}
      <div className="filter-section">
        <h4 className="filter-section-title">Category</h4>
        <div className="filter-list">
          {categories.map(cat => (
            <label key={cat} className="checkbox-container">
              <input type="checkbox" className="checkbox-input" />
              <span className="checkmark"></span>
              <span>{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="filter-section">
        <h4 className="filter-section-title">Price Range</h4>
        <div className="price-slider-container">
          <input type="range" min="399" max="499" style={{ width: '100%', accentColor: 'var(--accent-gold)' }} />
          <div className="price-inputs">
            <input type="text" className="price-input" value="₹399" readOnly />
            <span>-</span>
            <input type="text" className="price-input" value="₹499" readOnly />
          </div>
        </div>
      </div>

      {/* Sizes */}
      <div className="filter-section">
        <h4 className="filter-section-title">Size</h4>
        <div className="size-grid">
          {sizes.map(size => (
            <div key={size} className="size-pill">
              {size}
            </div>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div className="filter-section">
        <h4 className="filter-section-title">Color</h4>
        <div className="color-grid">
          {colors.map(color => (
            <div 
              key={color.name} 
              title={color.name} 
              className="color-swatch"
              style={{ backgroundColor: color.code }} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
