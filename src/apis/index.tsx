// apiInstance.ts
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const baseAPI = (
  url: string,
  options: AxiosRequestConfig = {}
): AxiosInstance => {
  return axios.create({ baseURL: url, ...options });
};

//auth
const authAPI = (
  url: string,
  tokenKey: string,
  options: AxiosRequestConfig = {}
): AxiosInstance => {
  const token = localStorage.getItem(tokenKey);
  return axios.create({
    baseURL: url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    ...options,
  });
};

export const baseInstance = baseAPI(process.env.REACT_APP_BASE_URL as string);
export const spotifyApiInstance = authAPI(
  'https://api.spotify.com/v1/',
  'spotifyAccessToken'
);
