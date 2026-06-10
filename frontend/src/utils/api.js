import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth endpoints
export const authAPI = {
  register: (data) => API.post('/auth/register', data),
  login: (data) => API.post('/auth/login', data),
  getCurrentUser: () => API.get('/auth/me'),
  updateProfile: (data) => {
    // Handle FormData for file uploads
    if (data instanceof FormData) {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      return API.put('/auth/profile', data, config);
    }
    return API.put('/auth/profile', data);
  },
  logout: () => API.post('/auth/logout'),
};

// Category endpoints
export const categoryAPI = {
  getAll: () => API.get('/categories'),
  getById: (id) => API.get(`/categories/${id}`),
  create: (data) => API.post('/categories', data),
  update: (id, data) => API.put(`/categories/${id}`, data),
  delete: (id) => API.delete(`/categories/${id}`),
};

// Product endpoints
export const productAPI = {
  getAll: (params) => API.get('/products', { params }),
  getById: (id) => API.get(`/products/${id}`),
  create: (data) => {
    // Handle FormData for file uploads
    if (data instanceof FormData) {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      return API.post('/products', data, config);
    }
    return API.post('/products', data);
  },
  update: (id, data) => {
    // Handle FormData for file uploads
    if (data instanceof FormData) {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      return API.put(`/products/${id}`, data, config);
    }
    return API.put(`/products/${id}`, data);
  },
  delete: (id) => API.delete(`/products/${id}`),
  addReview: (id, data) => API.post(`/products/${id}/review`, data),
};

// Cart endpoints
export const cartAPI = {
  get: () => API.get('/cart'),
  add: (data) => API.post('/cart/add', data),
  update: (productId, data) => API.put(`/cart/${productId}`, data),
  remove: (productId) => API.delete(`/cart/${productId}`),
  clear: () => API.delete('/cart'),
};

// Order endpoints
export const orderAPI = {
  create: (data) => API.post('/orders', data),
  getAll: () => API.get('/orders'),
  getById: (id) => API.get(`/orders/${id}`),
  updateStatus: (id, data) => API.put(`/orders/${id}/status`, data),
  processPayment: (data) => API.post('/orders/payment/process', data),
  getAllAdmin: () => API.get('/orders/admin/all'),
};

export default API;
