'use client';
import {
  Map,
  MapMarker,
  CustomOverlayMap,
  useKakaoLoader,
  useMap,
} from 'react-kakao-maps-sdk';
import useLocationInfo from '@/hooks/useLocationInfo';
import { useEffect, useRef, useState } from 'react';
import TrackModule from '../TrackModule';
import { getSpotifyToken } from '@/apis/utils/getSpotifyToken';
import { usePinStore } from '@/utils/store';
import { MusicSelectModal } from '../MusicSelectModal';
import { useDisclosure, Button, Center } from '@chakra-ui/react';
import TrackInfoModal from '../TrackInfoModal';
import { AddIcon } from '@chakra-ui/icons';
interface EventMarkerContainerProps {
  position: {
    lat: number;
    lng: number;
  };
  isrc: string;
}

interface Melody {
  isrc: string;
  latitude: number;
  longitude: number;
  content: string;
}

const KakaoMap = () => {
  const { locationInfo, setLocationInfo, updateLocationInfo } =
    useLocationInfo();
  const [currentLocation, setCurrentLocation] = useState(locationInfo);
  const pinList = usePinStore((state) => state.pinList);
  const {
    isOpen: isMusicModalOpen,
    onOpen: onMusicModalOpen,
    onClose: onMusicModalClose,
  } = useDisclosure();
  const {
    isOpen: isTrackInfoOpen,
    onOpen: onTrackInfoOpen,
    onClose: onTrackInfoClose,
  } = useDisclosure();
  const [selectedIsrc, setSelectedIsrc] = useState('');
  const handleTrackClick = (isrc: string) => {
    setSelectedIsrc(isrc);
    onTrackInfoOpen();
  };

  useEffect(() => {
    getSpotifyToken();
    updateLocationInfo();
  }, []);

  const [loading, error] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_APP_KEY_JS || '',
  });

  // Track currently visible overlay
  const [visibleOverlayId, setVisibleOverlayId] = useState<string | null>(null);

  // Custom marker component with unique overlay visibility per marker
  const EventMarkerContainer = ({
    position,
    isrc,
    id,
  }: EventMarkerContainerProps & { id: string }) => {
    const map = useMap();
    const overlayRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      const handleOutsideClick = (event: MouseEvent) => {
        const target = event.target as HTMLElement | null; // Cast to HTMLElement
        // 클릭한 요소가 overlayRef 안에 포함되지 않은 경우에만 오버레이를 닫음
        if (overlayRef.current && !overlayRef.current.contains(target)) {
          setVisibleOverlayId(null);
        }
      };

      document.addEventListener('mousedown', handleOutsideClick);
      return () => {
        document.removeEventListener('mousedown', handleOutsideClick);
      };
    }, []);

    return (
      <>
        <MapMarker
          position={position}
          image={{
            src: '/images/musicPin.svg',
            size: {
              width: 40,
              height: 40,
            },
          }}
          clickable={true}
          onClick={(marker) => {
            setVisibleOverlayId(visibleOverlayId === id ? null : id);
            map.panTo(marker.getPosition());
          }}
        />
        {visibleOverlayId === id && (
          <CustomOverlayMap
            position={position}
            yAnchor={1.5}
            xAnchor={0.8}
            zIndex={10}
          >
            <div ref={overlayRef} className="custom-overlay">
              <TrackModule isrc={isrc} onTrackClick={handleTrackClick} />
            </div>
          </CustomOverlayMap>
        )}
      </>
    );
  };

  return (
    <>
      <Map
        center={currentLocation}
        style={{ width: '100vw', height: '100vh' }}
        level={3}
      >
        <MapMarker position={currentLocation} onClick={onMusicModalOpen} />

        {pinList.map((value) => (
          <EventMarkerContainer
            key={`EventMarkerContainer-${value.latitude}-${value.longitude}`}
            id={`${value.latitude}-${value.longitude}`}
            position={{ lat: value.latitude, lng: value.longitude }}
            isrc={value.isrc}
          />
        ))}

        <MusicSelectModal
          isOpen={isMusicModalOpen}
          onClose={onMusicModalClose}
          currentLocation={currentLocation}
        />
        <TrackInfoModal
          isOpen={isTrackInfoOpen}
          onClose={onTrackInfoClose}
          isrc={selectedIsrc}
        />
      </Map>
    </>
  );
};

export default KakaoMap;
