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
        maxW={['90%', '80%', '500px']}
        mx="auto"
        maxH="90vh"
        display="flex"
        flexDirection="column"
      >
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex
            minWidth="max-content"
            direction="row"
            align="space-between"
            cursor="pointer"
            maxW="100%"
            gap="2"
          >
            <Box position="relative" onClick={handleAlbumClick}>
              <Image
                src={track.imageUrl}
                alt={track.name}
                boxSize="50px"
                borderRadius="full"
                objectFit="cover"
                animation={
                  isPlaying ? `${rotate} 2s linear infinite` : undefined
                }
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

            {/* Like Button */}
            <IconButton
              icon={<StarIcon color={liked ? 'yellow.400' : 'gray.300'} />}
              aria-label="Like"
              variant="ghost"
              onClick={handleLike}
            />
          </Flex>

          {/* Social Section */}
          <Box mt={4} p={2}>
            {/* Comments */}
            <VStack align="stretch" spacing={3}>
              {comments.map((comment) => (
                <Box key={comment.id} p={2} bg="gray.100" borderRadius="md">
                  <Text fontWeight="bold" fontSize="sm">
                    {comment.author}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    {comment.text}
                  </Text>
                </Box>
              ))}
            </VStack>
          </Box>
        </ModalBody>

        <ModalFooter flexDirection="row">
          <Flex
            minWidth="max-content"
            direction="row"
            align="space-between"
            cursor="pointer"
            maxW="100%"
            gap="2"
          >
            <Input
              placeholder="멜로디 댓글"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              mb={2}
            />
            <IconButton
              icon={<AddIcon />}
              aria-label="Like"
              colorScheme="blue"
              onClick={handleAddComment}
            />
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TrackInfoModal;
