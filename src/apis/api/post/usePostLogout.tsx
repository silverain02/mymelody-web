import { useMutation } from 'react-query';
import { BeApiInstance } from '@/apis';

// code로 user Token받기
export const usePostLogout = () => {
  const { data, isLoading, error, isSuccess } = useMutation({
    mutationKey: ['logout'],
    mutationFn: async () => {
      await BeApiInstance.post(`auth/logout`);
    },
  });

  return {
    isLoading,
    isSuccess,
    error,
  };
};
