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

//Mock Data
// const pinList = [
//   {
//     isrc: 'US5TA2300179',
//     latlng: { lat: 37.55543673765699, lng: 126.90673385881081 },
//   },
//   {
//     isrc: 'USA2P2230223',
//     latlng: { lat: 37.55428413833823, lng: 126.90759539909989 },
//   },
//   {
//     isrc: 'USUM71407116',
//     latlng: { lat: 37.55370364774336, lng: 126.9027976789222 },
//   },
//   {
//     isrc: 'USA2P2414844',
//     latlng: { lat: 37.55720029242072, lng: 126.9037438152235 },
//   },
// ];

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

    return (
      <>
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
          onClick={(marker) => map.panTo(marker.getPosition())}
          onMouseOver={() => setIsVisible(true)}
          onMouseOut={() => setIsVisible(false)}
        />
        {isVisible && (
          <CustomOverlayMap position={position}>
            <TrackModule isrc={isrc} />
          </CustomOverlayMap>
        )}
      </>
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
      {/* <NextScript />
      <Script src={KAKAO_SDK_URL} strategy="beforeInteractive" /> */}
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
        {/* 다중 마커 */}
        {/* {pinList.map((position, index) => (
          <MapMarker
            key={`${position.isrc}-${position.latlng}`}
            position={position.latlng} // 마커를 표시할 위치
            image={{
              src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png', // 마커이미지의 주소입니다
              size: {
                width: 24,
                height: 35,
              }, // 마커이미지의 크기입니다
            }}
            title={position.isrc} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
          />
        ))} */}
        {/* 커스텀 오버레이 */}
        {/* {isOpen && (
          <CustomOverlayMap position={{ lat: 37.5577222, lng: 126.9010131 }}>
            <div className="w-16 h-16 bg-red-500">테스트요</div>
          </CustomOverlayMap>
        )} */}

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
