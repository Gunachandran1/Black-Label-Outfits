import axiosClient from './axiosClient';

export const adminApi = {
  getStats: () => axiosClient.get('/api/admin/stats'),
  getAllOrders: () => axiosClient.get('/api/admin/orders'),
  updateOrderStatus: (id, status) => axiosClient.patch(`/api/admin/orders/${id}/status`, { status }),
  createProduct: (data) => axiosClient.post('/api/admin/products', data),
  updateProduct: (id, data) => axiosClient.put(`/api/admin/products/${id}`, data),
  deleteProduct: (id) => axiosClient.delete(`/api/admin/products/${id}`),
};
