import axios from 'axios';

export const axiosInstance = axios.create({
  // baseURL: 'https://api.dagudok-service.com/api', // 베포용 백엔드 API 주소
  baseURL: 'http://localhost:8001/api', // 백엔드 API 주소
  withCredentials: true, // CORS 쿠키 인증을 사용하는 경우
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터에서 토큰 헤더 자동 추가
axiosInstance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token'); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // 헤더에 추가
  }
  return config;
});

export default axiosInstance;
