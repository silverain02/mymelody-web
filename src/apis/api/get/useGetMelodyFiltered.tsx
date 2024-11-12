import { useQuery } from '@tanstack/react-query';
import { authBeAPI } from '@/apis';
import useUserTokenStore from '@/states/useUserTokenStore';

// 필터링 멜로디 받기
export const useGetMelodyFiltered = (
  filter: 'likes' | 'created' | 'comment'
) => {
  const { userToken } = useUserTokenStore();
  const authBeInstance = authBeAPI(
    process.env.NEXT_PUBLIC_BE_URL as string,
    userToken?.accessToken || ''
  );

  const { data, isLoading, isSuccess, error } = useQuery({
    queryKey: ['melodyFiltered'],
    queryFn: async () => {
      const res = await authBeInstance.get(`mymelody/${filter}`);
      return res.data;
    },
  });

  return {
    melodyFiltered: data,
    isLoading,
    isSuccess,
    error,
  };
};
