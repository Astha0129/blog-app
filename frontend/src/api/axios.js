import axios from "axios";

/**
 * Centralized Axios instance.
 *
 * During development the Vite proxy forwards /api/* requests to
 * http://localhost:5000, so we don't need the full host here.
 *
 * For production builds set VITE_API_BASE_URL in your Vercel / Netlify
 * environment variables to point to your deployed backend URL.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ─── Request Interceptor ──────────────────────────────────────────────────────
api.interceptors.request.use(
  (config) => {
    // Add auth token here if needed: config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);

// ─── Response Interceptor ────────────────────────────────────────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      "An unexpected error occurred";
    
    console.error("API Error:", {
      status: error.response?.status,
      url: error.config?.url,
      method: error.config?.method,
      message,
    });
    return Promise.reject(error);
  },
);

export default api;
