import { getSpotifyToken } from '@/apis/utils/getSpotifyToken';
import KakaoMap from '@/components/Map/KakaoMap';
import SpotifyTesting from '@/components/SpotifyTesting';
import { ChakraProvider, useEditable } from '@chakra-ui/react';

export default function Page() {
  return (
    <>
      <ChakraProvider>
        <div className="w-16 h-16 bg-red-500">테스트요</div>
        <KakaoMap />
        <SpotifyTesting />
      </ChakraProvider>
    </>
  );
}
