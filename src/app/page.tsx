import KakaoMap from '@/components/Map/KakaoMap';
import TrackModule from '@/components/TrackModule';
import { ChakraProvider, Tr } from '@chakra-ui/react';
export default function Page() {
  return (
    <>
      <ChakraProvider>
        <KakaoMap />
      </ChakraProvider>
    </>
  );
}
