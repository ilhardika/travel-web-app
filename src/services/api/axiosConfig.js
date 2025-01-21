import axios from "axios";
import { API_CONFIG } from "../utils/constants";

const axiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: {
    apiKey: API_CONFIG.API_KEY,
  },
});

// Interceptor untuk token
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;

// Semua service files
// Authentication
// Protected API calls
