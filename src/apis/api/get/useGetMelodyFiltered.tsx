import { useQuery } from '@tanstack/react-query';
import { authBeAPI } from '@/apis';
import useUserTokenStore from '@/states/useUserTokenStore';
import useLocationInfo from '@/hooks/useLocationInfo';

// 필터링 멜로디 받기
export const useGetMelodyFiltered = (
  filter: 'likes' | 'created' | 'comment' | 'all'
) => {
  const { userToken } = useUserTokenStore();
  const authBeInstance = authBeAPI(
    process.env.NEXT_PUBLIC_BE_URL as string,
    userToken?.accessToken || ''
  );

  const { data, isLoading, isSuccess, error } = useQuery({
    queryKey: ['melodyFiltered', filter],
    queryFn: async () => {
      if (filter == 'all') {
        return false;
      }
      const res = await authBeInstance.get(`mymelody/${filter}`);
      return res.data.myMelodyInfos;
    },
  });

  return {
    melodyFiltered: data,
    isLoading,
    isSuccess,
    error,
  };
};
