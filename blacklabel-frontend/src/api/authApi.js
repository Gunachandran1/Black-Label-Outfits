import axiosClient from './axiosClient';

export const authApi = {
  login: (data) => axiosClient.post('/api/auth/login', data),
  register: (data) => axiosClient.post('/api/auth/register', data),
  getProfile: () => axiosClient.get('/api/auth/profile'),
  updateProfile: (data) => axiosClient.put('/api/auth/profile', data),
};
