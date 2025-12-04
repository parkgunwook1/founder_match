import axios from 'axios';

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080/api',
  timeout: 10000
});

httpClient.interceptors.request.use(
  (config) => {
    // TODO: 추후 백엔드 연동 시 zustand 상태의 토큰을 Authorization 헤더로 주입
    return config;
  },
  (error) => Promise.reject(error)
);

httpClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    // TODO: 공통 에러 로깅/토스트 처리
    return Promise.reject(error);
  }
);

export default httpClient;



