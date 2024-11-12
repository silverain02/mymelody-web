import { useQuery } from '@tanstack/react-query';
import { authBeAPI, baseInstance } from '@/apis';
import useUserTokenStore from '@/states/useUserTokenStore';

interface LocationInfo {
  lng: number;
  lat: number;
}

// 근처 멜로디 받기
export const useGetMelodyNear = (
  {
    locationInfo,
  }: {
    locationInfo: LocationInfo;
  },
  isAll: boolean
) => {
  const { userToken } = useUserTokenStore();
  const authBeInstance = authBeAPI(
    process.env.NEXT_PUBLIC_BE_URL as string,
    userToken?.accessToken || ''
  );
  const { data, isLoading, isSuccess, error } = useQuery({
    queryKey: ['melodyNear', locationInfo, isAll],
    queryFn: async () => {
      const res = await authBeInstance.get(
        `mymelody/location?latitude=${locationInfo.lat}&longitude=${locationInfo.lng}&page=1&size=10`
      );
      return res.data.myMelodyInfos;
    },
  });

  return {
    melodyNear: data,
    isLoading,
    isSuccess,
    error,
  };
};
