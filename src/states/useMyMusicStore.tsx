import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface MyMusicState {
  melodyInfo: { isrc: string; latlng: { lat: string; lng: string } };
  setMelodyInfo: (melodyInfo: {
    isrc: string;
    latlng: { lat: string; lng: string };
  }) => void;
}

export const useMusicStore = create<MyMusicState>()(
  persist(
    (set) => ({
      melodyInfo: { isrc: '', latlng: { lat: '', lng: '' } }, // Initial state
      setMelodyInfo: (melodyInfo) => set({ melodyInfo }), // Update state function
    }),
    {
      name: 'music-storage', // Unique name for the local storage
      storage: createJSONStorage(() => localStorage), // Use localStorage to persist
    }
  )
);
