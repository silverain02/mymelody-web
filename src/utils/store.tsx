// store.ts
import create from 'zustand';

export interface Pin {
  content: string;
  isLiked: boolean;
  isrc: string;
  latitude: number;
  longitude: number;
  myMelodyId: number;
  nickname: string;
  totalComments: number;
  totalLikes: number;
}

interface PinStore {
  pinList: Pin[];
  addPin: (newPin: Pin) => void;
  setPinList: (newPins: Pin[]) => void;
}

export const usePinStore = create<PinStore>((set) => ({
  pinList: [],
  addPin: (newPin) => set((state) => ({ pinList: [...state.pinList, newPin] })),
  setPinList: (newPins) => set({ pinList: newPins }),
}));

export const refineMyPin = (
  isrc: string,
  latitude: number,
  longitude: number
) => {
  return {
    content: '',
    isLiked: false,
    isrc: isrc,
    latitude: latitude,
    longitude: longitude,
    myMelodyId: 0,
    nickname: 'userName',
    totalComments: 0,
    totalLikes: 0,
  };
};
