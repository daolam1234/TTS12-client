import axios from "axios";
import { toast } from "react-toastify";

// ✅ Mở rộng AxiosRequestConfig để thêm skipErrorHandler
declare module 'axios' {
  export interface AxiosRequestConfig {
    skipErrorHandler?: boolean;
  }
}

const instanceAxios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
    
  },
})

// // 🟢 Thêm đoạn này ngay sau khi tạo instanceAxios:
// instanceAxios.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// Add a request interceptor
instanceAxios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token")
  if (token) {
    if (config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

instanceAxios.interceptors.response.use(function (response) {

  return response;
}, async function (error) {

  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    const newToken = await refreshToken();
    instanceAxios.defaults.headers.common['Authorization'] = 'Bearer ' + newToken;
    return instanceAxios(originalRequest);
  }
  // ✅ Nếu không có skipErrorHandler thì mới hiện toast
    if (!originalRequest?.skipErrorHandler) {
      const message = error.response?.data?.message || "Có lỗi xảy ra";
      toast.error(message);
    }
});

const refreshToken = async () => {
  const user = localStorage.getItem('user');

  if (user) {
    const { _id } = JSON.parse(user)
    try {
      const response = await instanceAxios.post('/token/refresh', { _id });
      const newToken = response.data.accessToken;
      localStorage.setItem('token', newToken);
      return newToken;
    } catch (error) {
      console.error('Lỗi khi làm mới token:', error);
    }
  }


};

export default instanceAxios