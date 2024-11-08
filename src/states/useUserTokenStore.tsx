import create from 'zustand';

interface Store {
  userToken: { accessToken: string; refreshToken: string } | null;
  setUserToken: (accessToken: string, refreshToken: string) => void;
}

const useUserTokenStore = create<Store>((set) => ({
  userToken: null,
  setUserToken: (accessToken: string, refreshToken: string) =>
    set({
      userToken: {
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
    }),
}));

export default useUserTokenStore;
