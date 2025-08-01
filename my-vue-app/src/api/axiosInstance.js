import axios from "axios"

const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api"

const axiosInstance = axios.create({
  baseURL,
  timeout: 5000,
  // ❌ Bỏ Content-Type mặc định ở đây để cho Axios tự đoán (JSON, FormData...)
})

// Gắn token tự động nếu có
axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default axiosInstance
