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
import Script from 'next/script';
import { NextScript } from 'next/document';
import TrackModule from '../TrackModule';
import { getCleanTrackInfo } from '@/apis/services/getCleanTrackInfo';
import { useGetTrackInfo } from '@/apis/api/get/useGetTrackInfo';
import { getSpotifyToken } from '@/apis/utils/getSpotifyToken';
import { getToken } from '@chakra-ui/react';
import ISRCForm from '../ISRCForm';
import usePinStore from '@/utils/store';

const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_KEY_JS}&autoload=false&libraries=services,clusterer`;

interface EventMarkerContainerProps {
  position: {
    lat: number;
    lng: number;
  };
  isrc: string;
}

const KakaoMap = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { locationInfo, setLocationInfo } = useLocationInfo();
  const pinList = usePinStore((state) => state.pinList); // pinList 가져오기

  useEffect(() => {
    console.log(locationInfo);
  }, [locationInfo]);

  // mount 시
  useEffect(() => {
    //토큰 발행
    getSpotifyToken();

    navigator.geolocation.getCurrentPosition((pos) => {
      setLocationInfo({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    });

    navigator.geolocation.watchPosition((pos) => {
      setLocationInfo({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    });
  }, []);

  //카카오맵 불러오기
  const [loading, error] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_APP_KEY_JS || '',
  });

  //마커 이벤트
  const EventMarkerContainer = ({
    position,
    isrc,
  }: EventMarkerContainerProps) => {
    const map = useMap();
    const [isVisible, setIsVisible] = useState(false);
    const timeoutRef = useRef<number | null>(null);

    const handleMouseOver = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = window.setTimeout(() => setIsVisible(true), 100);
    };

    const handleMouseOut = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = window.setTimeout(() => setIsVisible(false), 100);
    };

    useEffect(() => {
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, []);

    return (
      <MapMarker
        position={position} // 마커를 표시할 위치
        //마커 이미지
        image={{
          src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png', // 마커이미지의 주소입니다
          size: {
            width: 24,
            height: 35,
          },
        }}
        clickable={true}
        onClick={(marker) => map.panTo(marker.getPosition())}
        onMouseOver={() => {
          setIsVisible(true);
        }}
        onMouseOut={() => {
          setIsVisible(false);
        }}
      >
        {isVisible && (
          // <CustomOverlayMap position={position}>
          <TrackModule isrc={isrc} />
          // </CustomOverlayMap>
        )}
      </MapMarker>
    );
  };

  //현위치 클릭 시 이벤트
  const handleCurrentLocClick = () => {
    console.log('현위치 클릭!');
    setIsOpen(!isOpen);
  };

  //핀추가
  const addPin = usePinStore((state) => state.addPin);

  return (
    <>
      {isOpen && <ISRCForm />}
      <Map
        center={locationInfo} //지도 중심의 좌표
        style={{ width: '500px', height: '400px' }} //지도크기
        level={3} //지도 확대 레벨
      >
        {/* 현 위치 마커 */}
        <MapMarker
          position={locationInfo}
          onClick={() => {
            handleCurrentLocClick();
          }}
        />

        {/* 다중마커 이벤트 */}
        {pinList.map((value) => (
          <EventMarkerContainer
            key={`EventMarkerContainer-${value.latlng.lat}-${value.latlng.lng}`}
            position={value.latlng}
            isrc={value.isrc}
          />
        ))}
      </Map>
    </>
  );
};

export default KakaoMap;
