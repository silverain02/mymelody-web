'use client';

import { useGetTrackInfo } from '@/apis/api/get/useGetTrackInfo';
import { getCleanTrackInfo } from '@/apis/services/getCleanTrackInfo';
import { useEffect, useRef, useState } from 'react';
import { Image, Text, Box, Flex, keyframes } from '@chakra-ui/react';

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
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 노래정보 받아오기
  const { trackDetail, isLoading } = useGetTrackInfo(isrc);

  useEffect(() => {
    if (!isLoading && trackDetail) {
      const cleanTrackInfo = getCleanTrackInfo(trackDetail);
      setTrack(cleanTrackInfo);
    }
  }, [isLoading, trackDetail]);

  // 앨범 이미지 회전 애니메이션 정의
  const rotate = keyframes`
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  `;

  // 앨범 클릭 시 회전 및 음악 재생/정지 토글
  const handleAlbumClick = async () => {
    console.log(`${isrc}클릭`);

    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        try {
          await audioRef.current.play();
          console.log('오디오 재생 중');
        } catch (error) {
          console.error('오디오 재생 오류:', error);
        }
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <Flex
      direction="row"
      align="center"
      p="1vh"
      bg="white"
      borderRadius="lg"
      boxShadow="md"
      cursor="pointer"
      maxW="80vw"
      onClick={handleAlbumClick}
    >
      {/* 앨범 이미지 */}
      <Box position="relative" mr="2vw">
        <Image
          src={track.imageUrl}
          alt={track.name}
          boxSize="6vh"
          borderRadius="full"
          objectFit="cover"
          animation={isPlaying ? `${rotate} 2s linear infinite` : undefined}
        />
      </Box>

      <Box flex="1" overflow="hidden">
        <Text fontSize="2.5vw" fontWeight="bold" isTruncated maxW="50vw">
          {track.name}
        </Text>
        <Text fontSize="2vw" color="gray.500" isTruncated maxW="45vw">
          {track.artist}
        </Text>
      </Box>

      {/* 오디오 프리뷰 */}
      <audio ref={audioRef} style={{ display: 'none' }}>
        <track kind="captions" />
        <source src={track.previewUrl} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </Flex>
  );
};

export default TrackModule;
