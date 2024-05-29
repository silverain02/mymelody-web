'use client';
import Head from 'next/head';
import Script from 'next/script';
import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import useLocationInfo from '@/hooks/useLocationInfo';
import { useEffect, useState } from 'react';

const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_KEY_JS}&autoload=false&libraries=services`;

const KakaoMap = () => {
  //유저의 현 위치 받기
  const { locationInfo, setLocationInfo } = useLocationInfo();
  useEffect(() => {
    console.log(locationInfo);
  }, [locationInfo]);

  // 지도가 처음 렌더링되면 중심좌표를 현위치로 설정하고 위치 변화 감지
  useEffect(() => {
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

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Script src={KAKAO_SDK_URL} />
      <Map
        center={locationInfo} //지도 중심의 좌표
        style={{ width: '500px', height: '400px' }} //지도크기
        level={3} //지도 확대 레벨
      >
        {/* 현 위치 마커 */}
        <MapMarker
          position={locationInfo}
          image={{
            src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png', // 마커이미지의 주소입니다
            size: {
              width: 64,
              height: 69,
            }, // 마커이미지의 크기입니다
            options: {
              offset: {
                x: 27,
                y: 69,
              }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
            },
          }}
          onClick={() => setIsOpen(true)}
        ></MapMarker>
        {/* 커스텀 오버레이 */}
        <CustomOverlayMap position={locationInfo} yAnchor={1}>
          <div className="customoverlay">
            <span className="title">구의야구공원</span>
          </div>
        </CustomOverlayMap>
      </Map>
    </>
  );
};

export default KakaoMap;
