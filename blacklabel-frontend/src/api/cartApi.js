import axiosClient from './axiosClient';

export const cartApi = {
  getCart: () => axiosClient.get('/api/cart'),
  addToCart: (data) => axiosClient.post('/api/cart/add', data),
  updateCartItem: (id, data) => axiosClient.put(`/api/cart/${id}`, data),
  removeCartItem: (id) => axiosClient.delete(`/api/cart/${id}`),
  clearCart: () => axiosClient.delete('/api/cart'),
};
