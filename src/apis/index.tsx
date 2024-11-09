import useUserTokenStore from '@/states/useUserTokenStore';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const baseAPI = (
  url: string,
  options: AxiosRequestConfig = {}
): AxiosInstance => {
  return axios.create({ baseURL: url, ...options });
};

// auth BE
export const authBeAPI = (
  url: string,
  token: string,
  options: AxiosRequestConfig = {}
): AxiosInstance => {
  return axios.create({
    baseURL: url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    ...options,
  });
};

// auth
const authAPI = (
  url: string,
  tokenKey: string,
  options: AxiosRequestConfig = {}
): AxiosInstance => {
  const token =
    typeof window !== 'undefined' ? localStorage.getItem(tokenKey) : null; // 클라이언트에서만 접근
  return axios.create({
    baseURL: url,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined, // 토큰이 있을 경우에만 추가
    },
    ...options,
  });
};

export const baseInstance = baseAPI(process.env.NEXT_PUBLIC_BE_URL as string);
export const spotifyApiInstance = authAPI(
  'https://api.spotify.com/v1/',
  'spotifyAccessToken'
);
