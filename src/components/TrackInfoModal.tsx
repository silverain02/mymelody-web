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
  Input,
  IconButton,
  VStack,
  HStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { AddIcon, StarIcon } from '@chakra-ui/icons'; // Chakra UI의 StarIcon 사용

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

interface Comment {
  id: number;
  text: string;
  author: string;
  createdAt: string;
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
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');

  const { trackDetail, isLoading } = useGetTrackInfo(isrc);

  // Rotate animation
  const rotate = keyframes`
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  `;

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

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleAddComment = () => {
    if (newComment.trim() !== '') {
      setComments((prevComments) => [
        ...prevComments,
        {
          id: prevComments.length + 1,
          text: newComment,
          author: 'User', // Replace with actual user data
          createdAt: new Date().toLocaleString(),
        },
      ]);
      setNewComment('');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        maxW={['80vw', '50vw']} // 모달 너비를 viewport 너비로 설정
        mx="auto"
        display="flex"
        flexDirection="column"
        p="2vh" // 패딩을 viewport 높이로 설정하여 여유 공간 제공
      >
        <ModalHeader></ModalHeader>
        <ModalCloseButton />

        <ModalBody mt="2vh">
          <Flex align="center" gap="2vw">
            {/* 간격을 viewport 너비로 조정 */}
            <Box position="relative" onClick={handleAlbumClick}>
              <Image
                src={track.imageUrl}
                alt={track.name}
                boxSize="8vh" // 앨범 이미지 크기를 viewport 높이로 설정
                borderRadius="full"
                objectFit="cover"
                animation={
                  isPlaying ? `${rotate} 2s linear infinite` : undefined
                }
              />
            </Box>
            <Box overflow="hidden">
              <Text fontSize="2vh" fontWeight="bold" isTruncated maxW="20vw">
                {track.name}
              </Text>
              <Text fontSize="1.5vh" color="gray.500" isTruncated maxW="18vw">
                {track.artist}
              </Text>
            </Box>
            <IconButton
              icon={<StarIcon color={liked ? 'yellow.400' : 'gray.300'} />}
              aria-label="Like"
              variant="ghost"
              onClick={handleLike}
            />
          </Flex>
          <VStack align="stretch" spacing="1.5vh">
            {/* 간격을 viewport 높이로 조정 */}
            {comments.map((comment) => (
              <Box key={comment.id} p="1.5vh" bg="gray.100" borderRadius="md">
                <Text fontWeight="bold" fontSize="1.5vh">
                  {comment.author}
                </Text>
                <Text fontSize="1.5vh" color="gray.600">
                  {comment.text}
                </Text>
              </Box>
            ))}
          </VStack>
        </ModalBody>

        <ModalFooter p={0} mt="2vh">
          <Flex w="full" align="center" gap="1.5vw">
            <Input
              placeholder="멜로디 댓글"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              height="6vh" // 버튼과 높이 일치
            />
            <IconButton
              icon={<AddIcon />}
              aria-label="Add Comment"
              colorScheme="blue"
              onClick={handleAddComment}
              height="6vh" // 인풋과 높이 일치
            />
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TrackInfoModal;
