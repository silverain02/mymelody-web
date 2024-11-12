import { FilterSelectBar } from '@/components/FilterSelectBar';
import KakaoMap from '@/components/Map/KakaoMap';
import useLocationInfo from '@/hooks/useLocationInfo';
import { ChakraProvider } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';

// eslint-disable-next-line react/function-component-definition
export default function Page() {
  return (
    <>
      <ChakraProvider>
        <Box className="relative w-screen h-screen">
          <KakaoMap />
          <FilterSelectBar />
        </Box>
      </ChakraProvider>
    </>
  );
}
