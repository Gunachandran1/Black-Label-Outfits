import axios from 'axios';

const axiosClient = axios.create({
  baseURL: '',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to outgoing requests
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('bl-token');
  if (token && token !== 'null') {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors WITHOUT triggering page reload loops
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Only handle network errors that have a response (not CORS / connection refused)
    if (error.response && error.response.status === 401) {
      // Silently clear credentials - do NOT redirect or reload
      // The React AuthContext will handle the UI state
      localStorage.removeItem('bl-token');
      localStorage.removeItem('bl-user');
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
