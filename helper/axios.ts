import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import useAuthStore from '@/store/auth';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Gắn token tự động
axiosInstance.interceptors.request.use((config) => {
  const { id, isLoggedIn } = useAuthStore.getState();
  if (isLoggedIn && config.headers) {
    config.headers.Authorization = `Bearer ${id}`;
  }
  return config;
});

const handleResponse = <T>(response: any): T => {
  if (response?.data?.message == 'Ok') {
    return response.data.data as T;
  }
  throw new Error(response?.data?.message || 'Unknown error');
};

// Helper chung
const http = {
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const res = await axiosInstance.get(url, config);
    return handleResponse<T>(res);
  },

  post: async <T, U = unknown>(
    url: string,
    data: U,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const res = await axiosInstance.post(url, data, config);
    return handleResponse<T>(res);
  },

  put: async <T, U = unknown>(
    url: string,
    data: U,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const res = await axiosInstance.put(url, data, config);
    return handleResponse<T>(res);
  },

  delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const res = await axiosInstance.delete(url, config);
    return handleResponse<T>(res);
  },

  postFile: async <T>(
    url: string,
    file: File,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const formData = new FormData();
    formData.append('file', file);

    const res = await axiosInstance.post(url, formData, {
      ...config,
      headers: {
        'Content-Type': 'multipart/form-data',
        ...(config?.headers || {}),
      },
    });

    return handleResponse<T>(res);
  },
};

export default http;
