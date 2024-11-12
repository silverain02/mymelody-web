import { useMutation } from 'react-query';
import { authBeAPI } from '@/apis';
import useUserTokenStore from '@/states/useUserTokenStore';

// 지도에 멜로디 저장
interface MelodyInfo {
  longitude: number;
  latitude: number;
  isrc: string;
  content: string;
}

export const usePostMelody = () => {
  const { userToken } = useUserTokenStore();
  const authBeInstance = authBeAPI(
    process.env.NEXT_PUBLIC_BE_URL as string,
    userToken?.accessToken || ''
  );

  const { isLoading, error, isSuccess, data, mutate } = useMutation({
    mutationKey: ['postMelody'],
    mutationFn: async ({ melodyInfo }: { melodyInfo: MelodyInfo }) => {
      const res = await authBeInstance.post(`mymelody/create`, melodyInfo);
      return res.data;
    },
  });

  return {
    data,
    isLoading,
    isSuccess,
    error,
    postMelody: mutate, // mutate 함수를 postMelody로 반환
  };
};
