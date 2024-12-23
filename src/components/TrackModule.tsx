'use client';

import { useGetTrackInfo } from '@/apis/api/get/useGetTrackInfo';
import { getCleanTrackInfo } from '@/apis/services/getCleanTrackInfo';
import { useEffect, useState } from 'react';
import { Image, Text, Box, Flex, keyframes } from '@chakra-ui/react';
import { Pin } from '@/utils/store';

interface CleanTrackInfo {
  name: string;
  artist: string;
  isrc: string;
  previewUrl: string;
  imageUrl: string;
  albumName: string;
}

interface TrackModuleProps {
  isrc: string;
  pinInfo: Pin;
  onTrackClick: (pinInfo: Pin) => void;
}

const TrackModule: React.FC<TrackModuleProps> = ({
  isrc,
  pinInfo,
  onTrackClick,
}) => {
  const [track, setTrack] = useState<CleanTrackInfo>({
    name: '',
    artist: '',
    isrc: '',
    previewUrl: '',
    imageUrl: '',
    albumName: '',
  });
  const [isPlaying, setIsPlaying] = useState(false);

  // 노래정보 받아오기
  const { trackDetail, isLoading, error } = useGetTrackInfo(isrc);

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
  const handleAlbumClick = () => {
    const audio = document.getElementById(`audio-${isrc}`) as HTMLAudioElement;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <Flex
      direction="row"
      align="center"
      p={2}
      bg="white"
      borderRadius="lg"
      boxShadow="md"
      cursor="pointer"
      minW="8rem"
    >
      {/* 앨범 이미지 */}
      <Box position="relative" onClick={handleAlbumClick}>
        <Image
          src={track.imageUrl}
          alt={track.name}
          boxSize="50px"
          minW="50px"
          borderRadius="full"
          objectFit="cover"
          animation={isPlaying ? `${rotate} 2s linear infinite` : undefined}
        />
      </Box>

      <Box ml={3} overflow="hidden" onClick={() => onTrackClick(pinInfo)}>
        <Text
          fontSize="sm"
          fontWeight="bold"
          isTruncated
          minW={'50px'}
          maxW={'120px'}
        >
          {track.name}
        </Text>
        <Text
          fontSize="xs"
          color="gray.500"
          isTruncated
          minW={'50px'}
          maxW={'120px'}
        >
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
