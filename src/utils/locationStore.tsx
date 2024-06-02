// locationStore.ts
import create from 'zustand';

interface LocationState {
  lat: number;
  lng: number;
  setLat: (lat: number) => void;
  setLng: (lng: number) => void;
}

const useLocationStore = create<LocationState>((set) => ({
  lat: 0,
  lng: 0,
  setLat: (lat) => set({ lat }),
  setLng: (lng) => set({ lng }),
}));

export default useLocationStore;
