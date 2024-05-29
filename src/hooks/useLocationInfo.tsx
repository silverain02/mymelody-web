import { create } from 'zustand';

interface locationInfoType {
  lat: number;
  lng: number;
}

interface LocationInfoState {
  locationInfo: locationInfoType;
}

interface LocationInfoActions {
  setLocationInfo: (locationInfo: locationInfoType) => void;
}

const defaultState = { lat: 37.5513, lng: 126.9246 }; //홍익대 위치 default

const useLocationInfo = create<LocationInfoState & LocationInfoActions>(
  (set) => ({
    locationInfo: defaultState,
    setLocationInfo: (locationInfo: locationInfoType) => {
      set({ locationInfo });
    },
  })
);

export default useLocationInfo;
