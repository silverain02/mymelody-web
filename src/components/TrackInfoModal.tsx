import { useGetTrackInfo } from '@/apis/api/get/useGetTrackInfo';
import { getCleanTrackInfo } from '@/apis/services/getCleanTrackInfo';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  keyframes,
  Box,
  Flex,
  Text,
  Image,
  Input,
  IconButton,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { AddIcon, StarIcon } from '@chakra-ui/icons'; // Chakra UI의 StarIcon 사용
import { Pin } from '@/utils/store';
import { useGetUserName } from '@/apis/api/get/useGetUserName';
import { useGetComments } from '@/apis/api/get/useGetComments';

interface TrackInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  pinInfo: Pin | null;
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
  pinInfo,
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
  const [liked, setLiked] = useState(pinInfo?.isLiked);
  const [commentsByTrack, setCommentsByTrack] = useState<
    Record<string, Comment[]>
  >({});
  const [newComment, setNewComment] = useState('');
  const currentComments = commentsByTrack[pinInfo?.isrc || ''] || [];

  const { trackDetail, isLoading } = useGetTrackInfo(pinInfo?.isrc ?? '');
  const { userName } = useGetUserName();
  const { melodyComments } = useGetComments(pinInfo?.myMelodyId);

  // Rotate animation
  const rotate = keyframes`
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  `;

  const handleAlbumClick = () => {
    const audio = document.getElementById(
      `audio-${pinInfo?.isrc}`
    ) as HTMLAudioElement;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (pinInfo?.isrc && melodyComments) {
      setCommentsByTrack((prevComments) => ({
        ...prevComments,
        [pinInfo.isrc]: melodyComments,
      }));
    }
  }, [pinInfo?.isrc, melodyComments]);

  useEffect(() => {
    if (!isLoading && trackDetail) {
      const cleanTrackInfo = getCleanTrackInfo(trackDetail);
      setTrack(cleanTrackInfo);
    }
  }, [isLoading, trackDetail]);
  useEffect(() => {
    if (pinInfo) {
      setLiked(pinInfo.isLiked);
    }
  }, [pinInfo]);

  const handleLike = () => {
    setLiked(!liked);
  };
  // Handle adding a comment specific to the current track
  const handleAddComment = () => {
    if (newComment.trim() !== '') {
      const updatedComments = [
        ...currentComments,
        {
          id: currentComments.length + 1,
          text: newComment,
          author: userName,
          createdAt: new Date().toLocaleString(),
        },
      ];

      setCommentsByTrack((prevCommentsByTrack) => ({
        ...prevCommentsByTrack,
        [pinInfo?.isrc || '']: updatedComments,
      }));
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
        <ModalCloseButton />
        <ModalBody mt="2vh">
          <Flex align="center" gap="2vw" justify="space-evenly" w="full">
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
            <Box overflow="hidden" w="50%">
              <Text fontSize="2vh" fontWeight="bold" isTruncated maxW="100%">
                {track.name}
              </Text>
              <Text fontSize="1.5vh" color="gray.500" isTruncated maxW="100%">
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
          <Box w="full" mt="1vh">
            <Text
              fontSize="1.5vh"
              color="gray.500"
              overflowWrap="break-word"
              maxW="100%"
              whiteSpace="normal"
            >
              {pinInfo?.content}
            </Text>
            <Text fontSize="1.5vh" color="gray.500" isTruncated maxW="100%">
              by{pinInfo?.nickname}
            </Text>
          </Box>
          <VStack align="stretch" spacing="1.5vh" w="full" mt="1vh">
            {currentComments.map((comment) => (
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
              height="5vh"
            />
            <IconButton
              icon={<AddIcon />}
              aria-label="Add Comment"
              colorScheme="blue"
              onClick={handleAddComment}
              height="5vh"
            />
          </Flex>
        </ModalFooter>
        {/* 오디오 프리뷰 */}
        <audio id={`audio-${pinInfo?.isrc}`} style={{ display: 'none' }}>
          <track kind="captions" />
          <source src={track.previewUrl} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </ModalContent>
    </Modal>
  );
};

export default TrackInfoModal;
