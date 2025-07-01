import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to attach access token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers['authorization'] = `${import.meta.env.VITE_BEARER_KEY} ${token}`;
  }
  return config;
});

// Interceptor to handle 401 and refresh token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        try {
          const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/refresh-token`, { refreshToken });
          if (res.data && res.data.access_token) {
            localStorage.setItem('access_token', res.data.access_token);
            // أعد إرسال الطلب الأصلي مع التوكن الجديد
            originalRequest.headers['authorization'] = `${import.meta.env.VITE_BEARER_KEY} ${res.data.access_token}`;
            return api(originalRequest);
          }
        } catch (refreshError) {
          // إذا فشل التجديد، احذف التوكنات وأعد التوجيه لتسجيل الدخول
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          window.location.href = '/login';
        }
      } else {
        // لا يوجد refresh token
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api; 