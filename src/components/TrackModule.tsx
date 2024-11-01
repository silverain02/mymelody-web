'use client';

import { useGetTrackInfo } from '@/apis/api/get/useGetTrackInfo';
import { getCleanTrackInfo } from '@/apis/services/getCleanTrackInfo';
import { useEffect, useState } from 'react';
import {
  SimpleGrid,
  Image,
  Text,
  Box,
  Flex,
  keyframes,
} from '@chakra-ui/react';

interface CleanTrackInfo {
  name: string;
  artist: string;
  isrc: string;
  previewUrl: string;
  imageUrl: string;
  albumName: string;
}

const TrackModule = ({ isrc }: { isrc: string }) => {
  const [track, setTrack] = useState<CleanTrackInfo>({
    name: '',
    artist: '',
    isrc: '',
    previewUrl: '',
    imageUrl: '',
    albumName: '',
  });

  // 노래정보 받아오기
  const { trackDetail, isLoading, error } = useGetTrackInfo(isrc);

  useEffect(() => {
    if (!isLoading && trackDetail) {
      const cleanTrackInfo = getCleanTrackInfo(trackDetail);
      setTrack(cleanTrackInfo);
    }
  }, [isLoading, trackDetail]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading track info.</div>;
  }

  // 앨범 이미지 회전 애니메이션 정의
  const rotate = keyframes`
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  `;

  return (
    <Flex
      key={isrc}
      direction="row"
      align="center"
      p={4}
      border="1px solid"
      borderColor="gray.200"
      borderRadius="md"
      overflow="hidden"
      boxShadow="md"
      cursor="pointer"
    >
      {/* 앨범 이미지 */}
      <Box position="relative">
        <Image
          src={track.imageUrl}
          alt={track.name}
          boxSize="80px"
          borderRadius="full"
          objectFit="cover"
          cursor="pointer"
        />
      </Box>

      {/* 타이틀과 가수 */}
      <Box ml={4}>
        <Text
          fontSize="lg"
          fontWeight="bold"
          mr={2}
          isTruncated // 너무 길 경우 잘리도록 설정
          maxW="200px" // 텍스트 영역에 최대 너비 설정
        >
          {track.name}
        </Text>
        <Text fontSize="sm" color="gray.500" isTruncated maxW="100px">
          {track.artist}
        </Text>
      </Box>

      {/* 오디오 프리뷰 */}
      <audio id={`audio-${isrc}`} style={{ display: 'none' }}>
        <track kind="captions" />
        <source src={track.previewUrl} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </Flex>
  );
};

export default TrackModule;
