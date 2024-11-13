'use client';

import { useGetUserToken } from '@/apis/api/get/useGetUserToken';
import useUserTokenStore from '@/states/useUserTokenStore';
import { Box, Spinner, VStack, Text } from '@chakra-ui/react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

/* eslint-disable react/function-component-definition */
export default function Page() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const router = useRouter();

  //userToken 받아오기
  const { userTokenObj, error } = useGetUserToken(code);
  //userToken 전역변수 저장
  const { userToken, setUserToken } = useUserTokenStore();

  useEffect(() => {
    if (userTokenObj) {
      console.log(userTokenObj);
      setUserToken(userTokenObj.accessToken, userTokenObj.refreshToken);
      console.log(userToken?.accessToken);
      router.push('/main');
    }

    if (error) {
      console.error('Error fetching userToken: ', error);
    }
  }, [userTokenObj, error]);

  return (
    <Box className="flex h-screen items-center justify-center bg-gray-100">
      <VStack spacing={4} className="text-center">
        <Spinner size="xl" color="blue.500" />
        <Text fontSize="2xl" fontWeight="bold" className="text-gray-700">
          Loading...
        </Text>
      </VStack>
    </Box>
  );
}
