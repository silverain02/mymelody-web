import { useGetTrackInfoByName } from '@/apis/api/get/useGetTrackInfoByName';
import { cleanTrackData } from '@/apis/services/getCleanTrackList';
import { useEffect, useState, useRef } from 'react';
import {
  SimpleGrid,
  Image,
  Text,
  Box,
  Flex,
  keyframes,
} from '@chakra-ui/react';

interface SelectBarProps {
  musicName: string;
}

export const SelectBar: React.FC<SelectBarProps> = ({ musicName }) => {
  const [cleanedTrackData, setCleanedTrackData] = useState<any[]>([]);
  const [isPlaying, setIsPlaying] = useState<number | null>(null); // 현재 재생 중인 트랙 ID
  const currentAudioRef = useRef<HTMLAudioElement | null>(null); // 현재 재생 중인 오디오 엘리먼트 추적
  const [selectedTrack, setSelectedTrack] = useState<number | null>(null); // 선택된 트랙 ID

  // Fetch track details
  const { trackDetail, isLoading, error } = useGetTrackInfoByName(musicName);

  useEffect(() => {
    if (trackDetail) {
      const cleanedData = cleanTrackData(trackDetail);
      setCleanedTrackData(cleanedData);
    }

    if (error) {
      console.error('Error fetching track details:', error);
    }
  }, [trackDetail, error]);

  const handlePlayClick = (index: number) => {
    const newAudio = document.getElementById(
      `audio-${index}`
    ) as HTMLAudioElement;

    // 기존 음악이 재생 중이면 정지
    if (currentAudioRef.current && currentAudioRef.current !== newAudio) {
      currentAudioRef.current.pause();
      currentAudioRef.current.currentTime = 0; // 재생 위치를 처음으로 돌림
      setIsPlaying(null); // 이전 트랙의 상태 초기화
    }

    // 새로운 음악 재생 처리
    if (isPlaying === index) {
      newAudio.pause();
      setIsPlaying(null); // 재생 중이던 음악을 클릭하면 멈춤
    } else {
      newAudio.play();
      setIsPlaying(index); // 새로 재생할 트랙 설정
      currentAudioRef.current = newAudio; // 새로 재생되는 오디오를 참조에 저장

      // 음악이 끝났을 때 애니메이션도 멈추도록 설정
      newAudio.onended = () => {
        setIsPlaying(null);
        currentAudioRef.current = null; // 음악이 끝나면 참조도 초기화
      };
    }
  };

  // 앨범 이미지 회전 애니메이션 정의
  const rotate = keyframes`
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  `;

  const handleCardClick = (index: number) => {
    // 카드 클릭 시 선택된 트랙을 업데이트
    setSelectedTrack(index);
  };

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
      {cleanedTrackData && cleanedTrackData.length > 0 ? (
        cleanedTrackData.map((track, index) => (
          <Flex
            key={index}
            direction="row"
            align="center"
            p={4}
            border="1px solid"
            borderColor="gray.200"
            borderRadius="md"
            overflow="hidden"
            boxShadow="md"
            cursor="pointer"
            onClick={() => handleCardClick(index)} // 카드 영역 클릭 시
            // 선택된 카드에 배경색 추가
            bg={selectedTrack === index ? 'blue.100' : 'white'} // 선택된 카드에 색 채움
            transition="background-color 0.3s ease" // 부드러운 색 전환
          >
            {/* 앨범 이미지 */}
            <Box position="relative">
              <Image
                src={track.imageUrl}
                alt={track.name}
                boxSize="80px"
                borderRadius="full"
                objectFit="cover"
                onClick={() => handlePlayClick(index)}
                cursor="pointer"
                // 음악이 재생 중일 때 이미지가 회전하도록 애니메이션 추가
                animation={
                  isPlaying === index ? `${rotate} 4s linear infinite` : 'none'
                }
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
            <audio id={`audio-${index}`} style={{ display: 'none' }}>
              <track kind="captions" />
              <source src={track.previewUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </Flex>
        ))
      ) : (
        <Text>No track data found.</Text>
      )}
    </SimpleGrid>
  );
};
