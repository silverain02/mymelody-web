// 기본 사용 예시
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface SpotifyTokenState {
  spotifyToken: string;
  setSpotifyToken: (spotifyToken: string) => void;
}

export const useSpotifyTokenStore = create(
  persist(
    (set) => ({
      spotifyToken: '',
      setSpotifyToken: (newSpotifyToken: string) =>
        set({ spotifyToken: newSpotifyToken }),
    }),
    {
      name: 'spotifyAccessToken',
    }
  )
);
