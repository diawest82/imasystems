/**
 * API client for backend communication
 */

import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

const client = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
client.interceptors.request.use((config) => {
  const token = Cookies.get('auth_token');
  if (token) {
    config.params = { ...config.params, token };
  }
  return config;
});

export const api = {
  // Auth
  login: (username, password) =>
    client.post('/auth/login', { username, password }),
  verify: (token) =>
    client.post('/auth/verify', {}, { params: { token } }),
  getCurrentUser: (token) =>
    client.get('/auth/current-user', { params: { token } }),
  initAdmin: (username, email, password) =>
    client.post('/auth/init-admin', { username, email, password }),

  // Patents
  getPatents: () => client.get('/patents/'),
  getPublishedPatents: () => client.get('/patents/published'),
  getPatent: (id) => client.get(`/patents/${id}`),
  createPatent: (patent, token) =>
    client.post('/patents/', patent, { params: { token } }),
  updatePatent: (id, patent, token) =>
    client.put(`/patents/${id}`, patent, { params: { token } }),
  deletePatent: (id, token) =>
    client.delete(`/patents/${id}`, { params: { token } }),

  // Config
  getConfig: () => client.get('/config/'),
  getConfigKey: (key) => client.get(`/config/${key}`),
  updateConfig: (key, value, token) =>
    client.put(`/config/${key}`, { value }, { params: { token } }),
  deleteConfig: (key, token) =>
    client.delete(`/config/${key}`, { params: { token } }),
};

export default client;
