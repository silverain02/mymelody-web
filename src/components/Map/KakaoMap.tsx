import Head from 'next/head';
import Script from 'next/script';
import { Map } from 'react-kakao-maps-sdk';

const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_KEY_JS}&autoload=false&libraries=services`;

const KakaoMap = () => {
  return (
    <>
      <Script src={KAKAO_SDK_URL} />
      <Map
        center={{ lat: 33.450701, lng: 126.570667 }} //지도 중심의 좌표
        style={{ width: '500px', height: '400px' }} //지도크기
        level={3} //지도 확대 레벨
      ></Map>
    </>
  );
};

export default KakaoMap;
