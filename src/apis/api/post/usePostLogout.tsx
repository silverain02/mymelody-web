import { useMutation } from 'react-query';
import { authBeAPI } from '@/apis';
import useUserTokenStore from '@/states/useUserTokenStore';
// code로 user Token받기
export const usePostLogout = () => {
  const { userToken } = useUserTokenStore();
  const authBeInstance = authBeAPI(
    process.env.NEXT_PUBLIC_BE_URL as string,
    userToken?.accessToken || ''
  );
  const { isLoading, error, isSuccess } = useMutation({
    mutationKey: ['logout'],
    mutationFn: async () => {
      await authBeInstance.post(`auth/logout`);
    },
  });

  return {
    isLoading,
    isSuccess,
    error,
  };
};
