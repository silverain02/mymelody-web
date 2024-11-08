'use client';

import { useGetUserToken } from '@/apis/api/get/useGetUserToken';
import useUserTokenStore from '@/states/useUserTokenStore';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

/* eslint-disable react/function-component-definition */
export default function Page() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  console.log(code);

  //userToken 받아오기
  const { userTokenObj, error } = useGetUserToken(code);
  //userToken 전역변수 저장
  // const { userToken, setUserToken } = useUserTokenStore();

  useEffect(() => {
    if (userTokenObj) {
      console.log(userTokenObj);
      // setUserToken(userAccessToken, userRefreshToken);
      // console.log(userToken?.accessToken);
    }

    if (error) {
      console.error('Error fetching userToken: ', error);
    }
  }, [userTokenObj, error]);

  return <div>callbackPage</div>;
}
