'use client';

import { useEffect } from 'react';
import { getToken } from '@/services/musicInfo';

const CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const SECRET_KEY = process.env.NEXT_PUBLIC_SPOTIFY_SECRET_KEY;

const SpotifyTesting = () => {
  //access token 발급 받기
  useEffect(() => {
    console.log('스포티파이 테스팅 시작');
    getToken();
  }, []);

  return <h1>This is Spotify</h1>;
};

export default SpotifyTesting;
