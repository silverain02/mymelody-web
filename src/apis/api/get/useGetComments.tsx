import { useQuery } from '@tanstack/react-query';
import { authBeAPI } from '@/apis';
import useUserTokenStore from '@/states/useUserTokenStore';

// 멜로디 댓글 받기
export const useGetComments = (melodyId: number = 0) => {
  const { userToken } = useUserTokenStore();
  const authBeInstance = authBeAPI(
    process.env.NEXT_PUBLIC_BE_URL as string,
    userToken?.accessToken || ''
  );

  const { data, isLoading, isSuccess, error } = useQuery({
    queryKey: ['melodyComments', melodyId],
    queryFn: async () => {
      const res = await authBeInstance.get(`comment/mymelody/${melodyId}`);
      return res.data.commentInfos;
    },
  });

  return {
    melodyComments: data,
    isLoading,
    isSuccess,
    error,
  };
};
