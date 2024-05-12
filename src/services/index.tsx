'use client';
import axios from 'axios';
// import { getCookie } from './cookies';

// axios client instance, next js rewrites로 백엔드로 proxy 처리

export const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BE_URL,
});

client.interceptors.request.use((config) => {
  const auth_header = config.headers['x-auth-not-required'];
  if (auth_header) return config;

  //   const token = getCookie('token')?.value;
  //   config.headers['Authorization'] = `Bearer ${token}`;

  return config;
});
