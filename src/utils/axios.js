import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers['authorization'] = `${import.meta.env.VITE_BEARER_KEY} ${token}`;
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
          const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/refresh-token`, {
            refreshToken,
          });

          const newToken = res.data.access_token || res.data.token;
          if (newToken) {
            localStorage.setItem('access_token', newToken);
            originalRequest.headers['authorization'] = `${import.meta.env.VITE_BEARER_KEY} ${newToken}`;
            return api(originalRequest);
          }
        } catch (err) {
          console.log('Error: ' ,err);
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          window.location.href = '/login';
        }
      } else {
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default api;
