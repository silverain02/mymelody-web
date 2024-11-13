import { useQuery } from '@tanstack/react-query';
import { authBeAPI } from '@/apis';
import useUserTokenStore from '@/states/useUserTokenStore';

// 유저 이름 받기
export const useGetUserName = () => {
  const { userToken } = useUserTokenStore();
  const authBeInstance = authBeAPI(
    process.env.NEXT_PUBLIC_BE_URL as string,
    userToken?.accessToken || ''
  );
  const { data, isLoading, isSuccess, error } = useQuery({
    queryKey: ['userName'],
    queryFn: async () => {
      const res = await authBeInstance.get(`auth/test`);
      return res.data;
    },
  });

  return {
    userName: data,
    isLoading,
    isSuccess,
    error,
  };
};
