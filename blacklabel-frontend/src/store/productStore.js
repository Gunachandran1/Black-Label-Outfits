/**
 * Centralized Product Store
 * ─────────────────────────
 * Single source of truth for all product data.
 * Uses localStorage for persistence so admin changes
 * reflect instantly across the entire website.
 */

const STORAGE_KEY = 'bl-products';
const VERSION_KEY = 'bl-products-version';
const STORE_VERSION = 'v5';

// ─── Product Data ──────────────────────────────────

const SEED_PRODUCTS = [
  {
    id: 1,
    name: 'Boxy Fit Red',
    slug: 'boxy-fit-red',
    basePrice: 649,
    discountPrice: 499,
    category: 'Casual',
    image: '/shirts/boxy_fit_red.PNG',
    stock: 3,
    isFeatured: true,
    isNew: true,
    isActive: true,
    rating: 4.8,
    reviewsCount: 8,
    sizes: ['M', 'L', 'XL'],
    description: 'Premium Red, grey & white check shirt with a stylish modern look. Soft and comfortable fabric, perfect for all-day wear. Ideal for casual outings, college, travel and everyday styling.',
    createdAt: '2026-09-18'
  },
  {
    id: 2,
    name: 'Boxy Fit Green',
    slug: 'boxy-fit-green',
    basePrice: 649,
    discountPrice: 499,
    category: 'Casual',
    image: '/shirts/boxy_fit_green.PNG',
    stock: 3,
    isFeatured: true,
    isNew: true,
    isActive: true,
    rating: 4.5,
    reviewsCount: 7,
    sizes: ['M', 'L', 'XL'],
    description: 'Premium Green check shirt with a stylish modern look. Soft and comfortable fabric, perfect for all-day wear. Ideal for casual outings, college, travel and everyday styling.',
    createdAt: '2026-09-18'
  },
  {
    id: 3,
    name: 'Boxy Fit Brown',
    slug: 'boxy-fit-brown',
    basePrice: 649,
    discountPrice: 499,
    category: 'Casual',
    image: '/shirts/boxy_fit_brown.PNG',
    stock: 3,
    isFeatured: true,
    isNew: true,
    isActive: true,
    rating: 4.9,
    reviewsCount: 5,
    sizes: ['M', 'L', 'XL'],
    description: 'Premium Brown, grey & black check shirt with a stylish modern look. Soft and comfortable fabric, perfect for all-day wear. Ideal for casual outings, college, travel and everyday styling.',
    createdAt: '2026-09-18'
  },
  {
    id: 4,
    name: 'Boxy Fit Blue',
    slug: 'boxy-fit-blue',
    basePrice: 649,
    discountPrice: 499,
    category: 'Casual',
    image: '/shirts/boxy_fit_blue.png',
    stock: 3,
    isFeatured: true,
    isNew: true,
    isActive: true,
    rating: 4.2,
    reviewsCount: 6,
    sizes: ['M', 'L', 'XL'],
    description: 'Premium Blue check shirt with a stylish modern look. Soft and comfortable fabric, perfect for all-day wear. Ideal for casual outings, college, travel and everyday styling.',
    createdAt: '2026-09-18'
  },
  {
    id: 5,
    name: 'Navy Blue Stripe Formal Shirt',
    slug: 'navy-blue-stripe-formal-shirt',
    basePrice: 699,
    discountPrice: 499,
    category: 'Formal',
    image: '/shirts/stripped_blue.PNG',
    stock: 4,
    isFeatured: true,
    isNew: true,
    isActive: true,
    rating: 4.7,
    reviewsCount: 7,
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Premium hand-woven stripe formal shirt. Clean finish with elegant navy blue stripes. Perfect for office and formal occasions.',
    createdAt: '2026-09-18'
  },
  {
    id: 6,
    name: 'Maroon Stripe Formal Shirt',
    slug: 'maroon-stripe-formal-shirt',
    basePrice: 699,
    discountPrice: 499,
    category: 'Formal',
    image: '/shirts/stripped_red.PNG',
    stock: 4,
    isFeatured: true,
    isNew: true,
    isActive: true,
    rating: 4.8,
    reviewsCount: 7,
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Premium hand-woven stripe formal shirt. Elegant maroon stripes with a refined finish. Perfect for office and formal occasions.',
    createdAt: '2026-09-18'
  },
  {
    id: 7,
    name: 'Imported Korean Plum Shade',
    slug: 'imported-korean-plum-shade',
    basePrice: 499,
    discountPrice: 399,
    category: 'Formal',
    image: '/shirts/imported_korean_plumShade.png',
    stock: 3,
    isFeatured: false,
    isNew: false,
    isActive: true,
    rating: 4.1,
    reviewsCount: 8,
    sizes: ['M', 'L', 'XL'],
    description: 'Premium Plum Shade full-sleeve shirt with a clean textured finish. Designed with a smart button-down collar and comfortable regular fit. Perfect for casual outings, office wear, and everyday styling.',
    createdAt: '2026-09-18'
  },
  {
    id: 8,
    name: 'Imported Korean Blue',
    slug: 'imported-korean-blue',
    basePrice: 499,
    discountPrice: 399,
    category: 'Formal',
    image: '/shirts/imported_korean_blue.PNG',
    stock: 3,
    isFeatured: false,
    isNew: false,
    isActive: true,
    rating: 4.2,
    reviewsCount: 9,
    sizes: ['M', 'L', 'XL'],
    description: 'Premium blue full-sleeve shirt with a clean textured finish. Designed with a smart button-down collar and comfortable regular fit. Perfect for casual outings, office wear, and everyday styling.',
    createdAt: '2026-09-18'
  },
  {
    id: 9,
    name: 'Imported Korean Light Yellow',
    slug: 'imported-korean-light-yellow',
    basePrice: 499,
    discountPrice: 399,
    category: 'Formal',
    image: '/shirts/imported_korean_light_yellow.PNG',
    stock: 3,
    isFeatured: false,
    isNew: false,
    isActive: true,
    rating: 4.4,
    reviewsCount: 8,
    sizes: ['M', 'L', 'XL'],
    description: 'Premium Light Yellow full-sleeve shirt with a clean textured finish. Designed with a smart button-down collar and comfortable regular fit. Perfect for casual outings, office wear, and everyday styling.',
    createdAt: '2026-09-18'
  },
  {
    id: 10,
    name: 'Classic White Grey Stripe Shirt',
    slug: 'classic-white-grey-stripe-shirt',
    basePrice: 749,
    discountPrice: 499,
    category: 'Formal',
    image: '/shirts/white_stripe_formal.png',
    stock: 3,
    isFeatured: false,
    isNew: false,
    isActive: true,
    rating: 4.8,
    reviewsCount: 8,
    sizes: ['M', 'L', 'XL'],
    description: 'Classic white shirt with stylish grey vertical stripes. Comfortable and perfect for all-day wear. Ideal for casual, office, and smart occasions.',
    createdAt: '2026-09-18'
  },
];

// ─── Internal Helpers ──────────────────────────────

/** Load products from localStorage or seed initial data */
function loadProducts() {
  try {
    const currentVersion = localStorage.getItem(VERSION_KEY);
    if (currentVersion !== STORE_VERSION) {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.setItem(VERSION_KEY, STORE_VERSION);
    }
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_PRODUCTS));
  return [...SEED_PRODUCTS];
}

/** Save products to localStorage */
function saveProducts(products) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

/** Generate slug from product name */
function generateSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

// ─── Public API ────────────────────────────────────

export function getProducts() {
  return loadProducts().filter(p => p.isActive);
}

export function getAllProducts() {
  return loadProducts();
}

export function getProductBySlug(slug) {
  return loadProducts().find(p => p.slug === slug) || null;
}

export function getProductById(id) {
  return loadProducts().find(p => p.id === id) || null;
}

export function getFeaturedProducts() {
  return loadProducts().filter(p => p.isActive && p.isFeatured);
}

export function getNewProducts() {
  return loadProducts().filter(p => p.isActive && p.isNew);
}

export function getTrendingProducts() {
  return loadProducts()
    .filter(p => p.isActive)
    .sort((a, b) => b.reviewsCount - a.reviewsCount)
    .slice(0, 8);
}

export function getCategories() {
  const products = loadProducts();
  return [...new Set(products.map(p => p.category))].sort();
}

export function addProduct(productData) {
  const products = loadProducts();
  const newProduct = {
    ...productData,
    id: Date.now(),
    slug: productData.slug || generateSlug(productData.name),
    createdAt: new Date().toISOString().split('T')[0],
    rating: productData.rating || 0,
    reviewsCount: productData.reviewsCount || 0,
  };
  const updated = [newProduct, ...products];
  saveProducts(updated);
  return newProduct;
}

export function updateProduct(id, changes) {
  const products = loadProducts();
  const updated = products.map(p => {
    if (p.id === id) {
      const merged = { ...p, ...changes };
      if (changes.name && changes.name !== p.name) {
        merged.slug = generateSlug(changes.name);
      }
      return merged;
    }
    return p;
  });
  saveProducts(updated);
  return updated.find(p => p.id === id);
}

export function deleteProduct(id) {
  const products = loadProducts();
  const updated = products.filter(p => p.id !== id);
  saveProducts(updated);
}

export function resetToDefaults() {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(VERSION_KEY);
  return loadProducts();
}
