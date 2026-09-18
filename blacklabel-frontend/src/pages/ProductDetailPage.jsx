import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumb from '../components/common/Breadcrumb';
import StarRating from '../components/common/StarRating';
import SizeSelector from '../components/product/SizeSelector';
import ColorSelector from '../components/product/ColorSelector';
import Button from '../components/common/Button';
import Spinner from '../components/common/Spinner';
import { FiMinus, FiPlus, FiTruck, FiShield } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { getProductBySlug } from '../store/productStore';
import toast from 'react-hot-toast';


const ProductDetailPage = () => {
  const { slug } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    setLoading(true);
    // Load product from centralized store
    const storeProduct = getProductBySlug(slug);
    if (storeProduct) {
      const p = {
        ...storeProduct,
        price: storeProduct.discountPrice || storeProduct.basePrice,
        images: [storeProduct.image],
        details: storeProduct.description ? storeProduct.description.split('. ').filter(Boolean) : ['Premium Quality Fabric']
      };
      setProduct(p);
      setMainImage(p.images[0]);
      setSelectedSize(p.sizes?.[1] || p.sizes?.[0] || 'M');
      setSelectedColor(p.colors?.[0] || null);
    }
    setLoading(false);
  }, [slug]);

  if (loading) {
    return <div style={{ height: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Spinner size="lg" /></div>;
  }

  if (!product) return <div>Product not found</div>;

  const handleAddToCart = () => {
    addToCart({ ...product, quantity, size: selectedSize, color: selectedColor, image: mainImage });
    toast.success('Added to cart');
  };

  return (
    <div className="container" style={{ padding: '40px 20px', animation: 'fadeIn 0.4s' }}>
      <Breadcrumb items={[{ label: 'Collections', link: '/collections' }, { label: product.name }]} />
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px', marginTop: '30px' }}>
        {/* Images */}
        <div style={{ display: 'flex', gap: '20px' }}>
          {/* Thumbnails */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '80px' }}>
            {product.images.map((img, idx) => (
              <img 
                key={idx} 
                src={img} 
                alt={`${product.name} ${idx}`} 
                onClick={() => setMainImage(img)}
                style={{ width: '100%', height: '100px', objectFit: 'cover', border: mainImage === img ? '2px solid var(--accent-gold)' : '2px solid transparent', cursor: 'pointer', borderRadius: 'var(--radius-sm)' }}
              />
            ))}
          </div>
          {/* Main Image */}
          <div style={{ flex: 1, background: 'var(--bg-card)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
            <img src={mainImage} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>

        {/* Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>{product.name}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <StarRating rating={product.rating} />
              <span style={{ color: 'var(--text-secondary)' }}>{product.reviewsCount} Reviews</span>
            </div>
          </div>
          
          <div style={{ fontSize: '1.8rem', fontWeight: '700', color: 'var(--accent-gold)', fontFamily: 'var(--font-price)', letterSpacing: '0.5px' }}>
            ₹{product.price.toLocaleString()}
          </div>
          
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            {product.description}
          </p>
          
          <hr style={{ borderColor: 'var(--border-color)' }} />
          
          <ColorSelector colors={product.colors} selectedColor={selectedColor} onSelectColor={setSelectedColor} />
          
          <SizeSelector sizes={product.sizes} selectedSize={selectedSize} onSelectSize={setSelectedSize} />
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', height: '50px' }}>
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ padding: '0 15px', background: 'transparent', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}><FiMinus /></button>
              <span style={{ width: '30px', textAlign: 'center' }}>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} style={{ padding: '0 15px', background: 'transparent', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}><FiPlus /></button>
            </div>
            
            <Button size="lg" style={{ flex: 1, padding: '16px 32px', fontSize: '1rem', borderRadius: '12px', letterSpacing: '0.5px' }} onClick={handleAddToCart}>
              ADD TO CART
            </Button>
          </div>
          
          {/* Guarantees */}
          <div style={{ display: 'flex', gap: '30px', marginTop: '20px', padding: '20px', background: 'var(--bg-card)', borderRadius: 'var(--radius-md)', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FiTruck size={24} style={{ color: 'var(--accent-gold)' }} />
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Free Shipping</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>On all orders</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FiShield size={24} style={{ color: 'var(--accent-gold)' }} />
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Secure Order</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Payment via Instagram</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ marginTop: '80px' }}>
        <div style={{ display: 'flex', gap: '40px', borderBottom: '1px solid var(--border-color)', paddingBottom: '15px', marginBottom: '30px' }}>
          {['Description', 'Details & Care', 'Reviews'].map(tab => (
            <span 
              key={tab} 
              onClick={() => setActiveTab(tab.toLowerCase().replace(' & ', '-'))}
              style={{ fontSize: '1.2rem', cursor: 'pointer', color: activeTab === tab.toLowerCase().replace(' & ', '-') ? 'var(--accent-gold)' : 'var(--text-secondary)', borderBottom: activeTab === tab.toLowerCase().replace(' & ', '-') ? '2px solid var(--accent-gold)' : 'none', paddingBottom: '15px', marginBottom: '-16px', transition: 'var(--transition-fast)' }}
            >
              {tab}
            </span>
          ))}
        </div>
        
        <div style={{ minHeight: '200px' }}>
          {activeTab === 'description' && (
             <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, maxWidth: '800px' }}>{product.description}</p>
          )}
          {activeTab === 'details-care' && (
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {product.details.map((det, i) => <li key={i}>{det}</li>)}
            </ul>
          )}
          {activeTab === 'reviews' && (
            <div>
               <p style={{ color: 'var(--text-secondary)' }}>Reviews will be displayed here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
