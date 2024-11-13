import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  useDisclosure,
} from '@chakra-ui/react';
import { SearchBar } from './SearchBar';
import { useEffect, useState } from 'react';
import { SelectBar } from './SelectBar';
import { usePinStore, refineMyPin, Pin } from '@/utils/store';
import { usePostMelody } from '@/apis/api/post/usePostMelody';
import { MusicCommentModal } from './MusicCommentModal';

interface MusicSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLocation: {
    lat: number;
    lng: number;
  };
}
interface MelodyInfo {
  longitude: number;
  latitude: number;
  isrc: string;
  content: string;
}

export const MusicSelectModal: React.FC<MusicSelectModalProps> = ({
  isOpen,
  onClose,
  currentLocation,
}) => {
  const { postMelody, isSuccess, data, error } = usePostMelody();
  const [isListOpen, setIsListOpen] = useState(false); // 음악정보 리스트 열람 여부
  const [musicName, setMusicName] = useState(''); // 검색 데이터
  const [isrcInfo, setIsrcInfo] = useState('');

  const submitMusic = usePinStore((state) => state.addPin);
  const handleSaveMelody = (melodyInfo: MelodyInfo) => {
    postMelody({ melodyInfo });
  };
  const {
    isOpen: isCommentOpen,
    onOpen: onCommentOpen,
    onClose: onCommentClose,
  } = useDisclosure();
  const [comment, setComment] = useState('');
  const handleCommentSubmit = (enteredComment: string) => {
    setComment(enteredComment);
    // Call your submit functions here after the comment is confirmed
    submitMusic(
      refineMyPin(isrcInfo, currentLocation.lat, currentLocation.lng)
    );
    handleSaveMelody({
      latitude: currentLocation.lat,
      longitude: currentLocation.lng,
      isrc: isrcInfo,
      content: enteredComment,
    });
    onClose(); // Close the main modal after submit
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
        <ModalHeader>멜로디 검색</ModalHeader>
        <ModalCloseButton />

        <ModalBody flex="1" display="flex" flexDirection="column">
          <SearchBar
            musicName={musicName}
            setMusicName={setMusicName}
            isListOpen={isListOpen}
            setIsListOpen={setIsListOpen}
          />

          {isListOpen && (
            <Box
              maxH="60vh"
              overflowY="auto"
              mt={4} /* Add margin-top for spacing */
            >
              <SelectBar
                musicName={musicName}
                isrcInfo={isrcInfo}
                setIsrcInfo={setIsrcInfo}
              />
            </Box>
          )}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onCommentOpen}>
            Submit
          </Button>
        </ModalFooter>

        <MusicCommentModal
          isOpen={isCommentOpen}
          onClose={onCommentClose}
          onSubmitComment={handleCommentSubmit}
        />
      </ModalContent>
    </Modal>
  );
};
