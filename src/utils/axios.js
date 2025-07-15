import axios from 'axios';

const bearerKey = import.meta.env.VITE_BEARER_KEY;

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers['authorization'] = `${bearerKey} ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        try {
          const res = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/auth/refresh-token`,
            { refreshToken }
          );

          const newToken = res.data.token ?? res.data.access_token;

          if (newToken) {
            localStorage.setItem('access_token', newToken);
            originalRequest.headers['authorization'] = `${bearerKey} ${newToken}`;
            return api(originalRequest);
          }
        } catch (err) {
          console.error('Token refresh failed:', err);
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          setTimeout(() => window.location.href = '/login', 100);
        }
      } else {
        setTimeout(() => window.location.href = '/login', 100);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
