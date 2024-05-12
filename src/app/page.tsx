import CurrentLocation from '@/components/Map/CurrentLocation';
import KakaoMap from '@/components/Map/KakaoMap';
import SpotifyTesting from '@/components/Map/SpotifyTesting';

export default function Page() {
  return (
    <>
      <h1>This is Page</h1>
      <KakaoMap />
      <SpotifyTesting />
      <CurrentLocation />
    </>
  );
}
