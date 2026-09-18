import axiosClient from './axiosClient';

export const wishlistApi = {
  getWishlist: () => axiosClient.get('/api/wishlist'),
  addToWishlist: (productId) => axiosClient.post(`/api/wishlist/${productId}`),
  removeFromWishlist: (productId) => axiosClient.delete(`/api/wishlist/${productId}`),
};
