import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';
import type { ApiResponse } from '@/types';

//1. 创建axios对象
const service: AxiosInstance = axios.create();

//2. 请求拦截器
service.interceptors.request.use((config: AxiosRequestConfig) => {
  return config;
}, (error) => {
  return Promise.reject(error);
});

//3. 响应拦截器
service.interceptors.response.use((response: AxiosResponse<ApiResponse | Blob>) => {
  //判断code码
  // 如果是 blob 类型，直接返回
  if (response.config.responseType === 'blob') {
    return response.data as Blob;
  }
  return response.data;
}, (error) => {
  return Promise.reject(error);
});

export default service;
