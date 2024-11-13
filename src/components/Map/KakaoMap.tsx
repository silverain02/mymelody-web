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
import { Pin, usePinStore } from '@/utils/store';
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
  pinInfo: Pin;
}

const KakaoMap = () => {
  const { locationInfo, updateLocationInfo } = useLocationInfo();
  const [currentLocation, setCurrentLocation] = useState(locationInfo);
  const pinList = usePinStore((state) => state.pinList);
  const {
    isOpen: isTrackInfoOpen,
    onOpen: onTrackInfoOpen,
    onClose: onTrackInfoClose,
  } = useDisclosure();
  const [selectedIsrc, setSelectedIsrc] = useState('');

  const handleTrackClick = (pinInfo: Pin) => {
    // setSelectedIsrc(isrc);
    setSelectedPin(pinInfo);
    onTrackInfoOpen();
  };

  const [loading, error] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_APP_KEY_JS || '',
  });

  useEffect(() => {
    getSpotifyToken();
    updateLocationInfo();
  }, []);

  //Pin관리
  const [selectedPin, setSelectedPin] = useState<Pin | null>(null);

  // Track currently visible overlay
  const [visibleOverlayId, setVisibleOverlayId] = useState<string | null>(null);

  // Custom marker component with unique overlay visibility per marker
  const EventMarkerContainer = ({
    position,
    isrc,
    id,
    pinInfo,
  }: EventMarkerContainerProps & { id: string }) => {
    const map = useMap();
    const overlayRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      const handleOutsideClick = (event: MouseEvent) => {
        const target = event.target as HTMLElement | null;
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
              <TrackModule
                isrc={isrc}
                pinInfo={pinInfo}
                onTrackClick={handleTrackClick}
              />
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
        {pinList.map((value) => (
          <EventMarkerContainer
            key={`EventMarkerContainer-${value.latitude}-${value.longitude}`}
            id={`${value.latitude}-${value.longitude}`}
            position={{ lat: value.latitude, lng: value.longitude }}
            isrc={value.isrc}
            pinInfo={value}
          />
        ))}
        <TrackInfoModal
          isOpen={isTrackInfoOpen}
          onClose={onTrackInfoClose}
          pinInfo={selectedPin}
        />
      </Map>
    </>
  );
};

export default KakaoMap;
