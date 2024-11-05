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
        maxW="500px" // 모달 너비를 500px로 증가
        mx="auto"
        display="flex"
        flexDirection="column"
        p={5} // 패딩을 5로 변경하여 여유 공간 제공
      >
        <ModalHeader
          p={0}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Flex align="center" gap="4">
            {' '}
            {/* 간격을 4로 조정 */}
            <Box position="relative" onClick={handleAlbumClick}>
              <Image
                src={track.imageUrl}
                alt={track.name}
                boxSize="70px" // 앨범 이미지 크기를 70px로 증가
                borderRadius="full"
                objectFit="cover"
                animation={
                  isPlaying ? `${rotate} 2s linear infinite` : undefined
                }
              />
            </Box>
            <Box overflow="hidden">
              <Text fontSize="xl" fontWeight="bold" isTruncated maxW="200px">
                {track.name}
              </Text>
              <Text fontSize="md" color="gray.500" isTruncated maxW="180px">
                {track.artist}
              </Text>
            </Box>
          </Flex>
          <IconButton
            icon={<StarIcon color={liked ? 'yellow.400' : 'gray.300'} />}
            aria-label="Like"
            variant="ghost"
            onClick={handleLike}
            _hover={{ bg: 'blue.300' }} // 호버 효과 추가
          />
        </ModalHeader>

        <ModalCloseButton />

        <ModalBody mt={4}>
          <VStack align="stretch" spacing={3}>
            {/* 간격을 3으로 조정 */}
            {comments.map((comment) => (
              <Box key={comment.id} p={3} bg="gray.100" borderRadius="md">
                <Text fontWeight="bold" fontSize="md">
                  {comment.author}
                </Text>
                <Text fontSize="md" color="gray.600">
                  {comment.text}
                </Text>
              </Box>
            ))}
          </VStack>
        </ModalBody>

        <ModalFooter p={0} mt={4}>
          <Flex w="full" align="center" gap="3">
            <Input
              placeholder="멜로디 댓글"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              height="50px" // 버튼과 높이 일치
            />
            <IconButton
              icon={<AddIcon />}
              aria-label="Add Comment"
              colorScheme="blue"
              onClick={handleAddComment}
              height="50px" // 인풋과 높이 일치
            />
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TrackInfoModal;
