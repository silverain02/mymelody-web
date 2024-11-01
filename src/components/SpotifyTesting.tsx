'use client';

import { useEffect } from 'react';
import { getSpotifyToken } from '@/apis/utils/getSpotifyToken';
import { useGetTrackInfo } from '@/apis/api/get/useGetTrackInfo';
import { getCleanTrackInfo } from '@/apis/services/getCleanTrackInfo';
import TrackModule from './TrackModule';
const SpotifyTesting = () => {
  console.log('스포티파이 테스팅 시작');
  return (
    <>
      <TrackModule isrc="USA2P2254487" />
    </>
  );
};

export default SpotifyTesting;
