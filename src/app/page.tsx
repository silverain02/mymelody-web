import KakaoMap from '@/components/Map/KakaoMap';
import SpotifyTesting from '@/components/SpotifyTesting';
import { ChakraProvider } from '@chakra-ui/react';

export default function Page() {
  return (
    <>
      <ChakraProvider>
        <KakaoMap />
        <SpotifyTesting />
      </ChakraProvider>
    </>
  );
}
