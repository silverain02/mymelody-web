// TrackInfoModal.tsx
import { useGetTrackInfo } from '@/apis/api/get/useGetTrackInfo';
import { getCleanTrackInfo } from '@/apis/services/getCleanTrackInfo';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  keyframes,
  Box,
  Flex,
  Text,
  Image,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

interface TrackInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  isrc: string;
}

interface CleanTrackInfo {
  name: string;
  artist: string;
  isrc: string;
  previewUrl: string;
  imageUrl: string;
  albumName: string;
}

const TrackInfoModal: React.FC<TrackInfoModalProps> = ({
  isOpen,
  onClose,
  isrc,
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

  useEffect(() => {
    if (!isLoading && trackDetail) {
      const cleanTrackInfo = getCleanTrackInfo(trackDetail);
      setTrack(cleanTrackInfo);
    }
  }, [isLoading, trackDetail]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        maxW={['90%', '80%', '500px']}
        mx="auto"
        maxH="90vh"
        display="flex"
        flexDirection="column"
      >
        <ModalHeader>{isrc}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex
            direction="row"
            align="center"
            p={4}
            bg="white"
            borderRadius="lg"
            boxShadow="md"
            cursor="pointer"
            maxW="100%"
          >
            {/* 앨범 이미지 */}
            <Box position="relative" onClick={handleAlbumClick}>
              <Image
                src={track.imageUrl}
                alt={track.name}
                boxSize="50px"
                borderRadius="full"
                objectFit="cover"
                animation={isPlaying ? `rotate 2s linear infinite` : undefined}
              />
            </Box>

            <Box ml={3} overflow="hidden">
              <Text fontSize="md" fontWeight="bold" isTruncated maxW="120px">
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
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TrackInfoModal;
