import { useQuery } from '@tanstack/react-query';
import { baseInstance } from '@/apis';

// code로 user Token받기
export const useGetUserToken = (code: string | null) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['userToken'],
    queryFn: async () => {
      const res = await baseInstance.get(`auth/login?code=${code}`);
      console.log(res.data);
      return res.data;
    },
  });

  return {
    userTokenObj: data,
    isLoading,
    error,
  };
};
