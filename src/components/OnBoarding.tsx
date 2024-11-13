'use client';
import { Box, Button, Image, Text, Center } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

export const OnBoarding = () => {
  const router = useRouter();
  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
      bg="pink.50"
    >
      {/* 중앙 로고와 이름 */}
      <Center flex="1" flexDirection="column">
        <Image
          src="/images/FullLogo_Transparent.png"
          alt="MyMelody Logo"
          width="120vw" // 원하는 크기로 설정
          height="auto" // 비율을 유지하면서 크기 조절
          mb={4}
        />
      </Center>

      {/* 하단 로그인 버튼 */}
      <Box width="100%" p={4} pb={8}>
        <Button
          width="100%"
          colorScheme="pink"
          size="lg"
          onClick={() => {
            router.push('/login');
            // router.push('/main');
          }}
        >
          로그인
        </Button>
      </Box>
    </Box>
  );
};
