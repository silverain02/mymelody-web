import create from 'zustand';

interface Store {
  userToken: { accessToken: string; refreshToken: string } | null;
  setUserToken: (accessToken: string, refreshToken: string) => void;
}

const useUserTokenStore = create<Store>((set) => ({
  userToken: {
    accessToken: process.env.NEXT_PUBLIC_TEMP_ACCESS_TOKEN || '',
    refreshToken: '',
  },
  setUserToken: (accessToken: string, refreshToken: string) =>
    set({
      userToken: {
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
    }),
}));

export default useUserTokenStore;
