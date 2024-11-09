/* eslint-disable react/function-component-definition */
import KakaoMap from '@/components/Map/KakaoMap';
import { ChakraProvider } from '@chakra-ui/react';
import { Box, Center, Flex, Button } from '@chakra-ui/react';
export default function Page() {
  return (
    <>
      <ChakraProvider>
        <Box className="relative w-screen h-screen">
          <KakaoMap />
          {/* 필터링 선택 바 */}
          <Center
            className="absolute top-5 left-1/2 transform -translate-x-1/2"
            zIndex="10"
          >
            <Box
              bg="whiteAlpha.800"
              p="4"
              borderRadius="lg"
              shadow="md"
              className="w-full max-w-md"
            >
              <Flex justifyContent="space-between" alignItems="center">
                <Button colorScheme="blue" size="sm">
                  필터 1
                </Button>
                <Button colorScheme="green" size="sm">
                  필터 2
                </Button>
                <Button colorScheme="red" size="sm">
                  필터 3
                </Button>
              </Flex>
            </Box>
          </Center>
        </Box>
      </ChakraProvider>
    </>
  );
}
