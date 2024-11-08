// 기본 베이스 URL
export const BASE_URL = process.env.NEXT_PUBLIC_FE_URL;

// Spotify 관련 URL
export const SPOTIFY_AUTHORIZE_URL = 'https://accounts.spotify.com/authorize';
export const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';

// API 엔드포인트 URL
export const API_BASE_URL = `${BASE_URL}/api`;
export const API_CALLBACK_URL = `${API_BASE_URL}/callback`;
