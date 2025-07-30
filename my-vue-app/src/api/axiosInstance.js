// src/api/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001/api", // hoặc đường dẫn API bạn dùng
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Gắn token vào header nếu có
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosInstance;
