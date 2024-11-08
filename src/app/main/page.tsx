/* eslint-disable react/function-component-definition */
import KakaoMap from '@/components/Map/KakaoMap';
import { ChakraProvider } from '@chakra-ui/react';
export default function Page() {
  return (
    <>
      <ChakraProvider>
        <KakaoMap />
      </ChakraProvider>
    </>
  );
}
