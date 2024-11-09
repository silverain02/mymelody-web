/* eslint-disable react/function-component-definition */
import KakaoMap from '@/components/Map/KakaoMap';
import { ChakraProvider } from '@chakra-ui/react';
import { Box, Center, Flex, Select } from '@chakra-ui/react';
export default function Page() {
  return (
    <>
      <ChakraProvider>
        <Box className="relative w-screen h-screen">
          <KakaoMap />
          {/* 필터링 선택 바 */}
          <Center
            className="absolute top-5 left-1/2 transform -translate-x-1/2"
            top="5vh"
            zIndex="10"
          >
            <Select
              defaultValue="all"
              size="sm"
              bg="whiteAlpha.800" // 투명하게 설정
              color="black"
              borderRadius="md"
              shadow="sm"
              maxWidth="400px"
              width="50vw" // 원하는 크기로 설정
              _hover={{ bg: 'whiteAlpha.900' }}
            >
              <option value="all">모든 멜로디</option>
              <option value="created">내가 생성한 멜로디</option>
              <option value="liked">내가 좋아한 멜로디</option>
              <option value="reacted">내가 반응한 멜로디</option>
            </Select>
          </Center>
        </Box>
      </ChakraProvider>
    </>
  );
}
