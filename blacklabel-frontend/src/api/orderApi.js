import axiosClient from './axiosClient';

export const orderApi = {
  createOrder: (data) => axiosClient.post('/api/orders', data),
  getOrders: () => axiosClient.get('/api/orders'),
  getOrderById: (id) => axiosClient.get(`/api/orders/${id}`),
};
