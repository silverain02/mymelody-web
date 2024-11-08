'use client';

import { useGetUserToken } from '@/apis/api/get/useGetUserToken';
import useUserTokenStore from '@/states/useUserTokenStore';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

/* eslint-disable react/function-component-definition */
export default function Page() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  //userToken 받아오기
  const { userAccessToken, userRefreshToken, isLoading, error } =
    useGetUserToken(code);

  //userToken 전역변수 저장

  const { userToken, setUserToken } = useUserTokenStore();

  useEffect(() => {
    if (userAccessToken) {
      setUserToken(userAccessToken, userRefreshToken);
      console.log(userToken);
    }

    if (error) {
      console.error('Error fetching userToken: ', error);
    }
  }, [userAccessToken, error]);

  return <></>;
}
