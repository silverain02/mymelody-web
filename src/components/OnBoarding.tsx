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
          src="/path/to/logo.png"
          alt="MyMelody Logo"
          boxSize="80px"
          mb={4}
        />
        <Text fontSize="3xl" fontWeight="bold" color="pink.600">
          MyMelody
        </Text>
      </Center>

      {/* 하단 로그인 버튼 */}
      <Box width="100%" p={4} pb={8}>
        <Button
          width="100%"
          colorScheme="pink"
          size="lg"
          onClick={() => {
            router.push('/login');
          }}
        >
          로그인
        </Button>
      </Box>
    </Box>
  );
};
