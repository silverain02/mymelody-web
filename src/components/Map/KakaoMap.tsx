'use client';
import {
  Map,
  MapMarker,
  CustomOverlayMap,
  useKakaoLoader,
  useMap,
} from 'react-kakao-maps-sdk';
import useLocationInfo from '@/hooks/useLocationInfo';
import { useEffect, useState } from 'react';
import TrackModule from '../TrackModule';
import { getSpotifyToken } from '@/apis/utils/getSpotifyToken';
import usePinStore from '@/utils/store';
import { getDistance } from '@/utils/distance';
import { MusicSelectModal } from '../MusicSelectModal';
import { useDisclosure } from '@chakra-ui/react';

interface EventMarkerContainerProps {
  position: {
    lat: number;
    lng: number;
  };
  isrc: string;
}

const KakaoMap = () => {
  const { locationInfo, setLocationInfo, updateLocationInfo } =
    useLocationInfo();
  const [currentLocation, setCurrentLocation] = useState(locationInfo);
  const pinList = usePinStore((state) => state.pinList);

  useEffect(() => {
    getSpotifyToken();
    updateLocationInfo();

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const newLat = pos.coords.latitude;
        const newLng = pos.coords.longitude;
        const distance = getDistance(
          locationInfo.lat,
          locationInfo.lng,
          newLat,
          newLng
        );
      },
      (err) => {
        console.error(err);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000,
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  const [loading, error] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_APP_KEY_JS || '',
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  // Track currently visible overlay
  const [visibleOverlayId, setVisibleOverlayId] = useState<string | null>(null);

  // Custom marker component with unique overlay visibility per marker
  const EventMarkerContainer = ({
    position,
    isrc,
    id,
  }: EventMarkerContainerProps & { id: string }) => {
    const map = useMap();

    useEffect(() => {
      const handleOutsideClick = (event: MouseEvent) => {
        const target = event.target as HTMLElement | null; // Cast to HTMLElement
        if (target && !target.closest('.custom-overlay')) {
          setVisibleOverlayId(null);
        }
      };

      document.addEventListener('mousedown', handleOutsideClick);
      return () => {
        document.removeEventListener('mousedown', handleOutsideClick);
      };
    }, []);

    return (
      <MapMarker
        position={position}
        image={{
          src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
          size: {
            width: 24,
            height: 35,
          },
        }}
        clickable={true}
        onClick={(marker) => {
          setVisibleOverlayId(visibleOverlayId === id ? null : id);
          map.panTo(marker.getPosition());
        }}
      >
        {visibleOverlayId === id && (
          <CustomOverlayMap
            position={position}
            yAnchor={1.5}
            xAnchor={1.5}
            zIndex={10}
          >
            <TrackModule isrc={isrc} />
          </CustomOverlayMap>
        )}
      </MapMarker>
    );
  };

  return (
    <>
      <Map
        center={currentLocation}
        style={{ width: '100vw', height: '100vh' }}
        level={3}
      >
        <MapMarker position={currentLocation} onClick={onOpen} />

        {pinList.map((value) => (
          <EventMarkerContainer
            key={`EventMarkerContainer-${value.latlng.lat}-${value.latlng.lng}`}
            id={`${value.latlng.lat}-${value.latlng.lng}`}
            position={value.latlng}
            isrc={value.isrc}
          />
        ))}

        <MusicSelectModal
          isOpen={isOpen}
          onClose={onClose}
          currentLocation={currentLocation}
        />
      </Map>
    </>
  );
};

export default KakaoMap;
