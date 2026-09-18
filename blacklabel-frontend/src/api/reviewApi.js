import axiosClient from './axiosClient';

export const reviewApi = {
  getProductReviews: (productId) => axiosClient.get(`/api/products/${productId}/reviews`),
  addReview: (productId, data) => axiosClient.post(`/api/products/${productId}/reviews`, data),
};
