import axiosClient from './axiosClient';

export const productApi = {
  getProducts: (params) => axiosClient.get('/api/products', { params }),
  getProductBySlug: (slug) => axiosClient.get(`/api/products/${slug}`),
  getFeatured: () => axiosClient.get('/api/products/featured'),
  searchProducts: (query) => axiosClient.get('/api/products/search', { params: { q: query } }),
  getCategories: () => axiosClient.get('/api/categories'),
};
