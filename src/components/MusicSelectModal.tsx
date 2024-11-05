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
} from '@chakra-ui/react';
import { SearchBar } from './SearchBar';
import { useState } from 'react';
import { SelectBar } from './SelectBar';
import usePinStore from '@/utils/store';

interface MusicSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLocation: {
    lat: number;
    lng: number;
  };
}

export const MusicSelectModal: React.FC<MusicSelectModalProps> = ({
  isOpen,
  onClose,
  currentLocation,
}) => {
  const [isListOpen, setIsListOpen] = useState(false); // 음악정보 리스트 열람 여부
  const [musicName, setMusicName] = useState(''); // 검색 데이터
  const [isrcInfo, setIsrcInfo] = useState('');
  const submitMusic = usePinStore((state) => state.addPin);

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
          <Button
            colorScheme="blue"
            mr={3}
            onClick={() => {
              submitMusic({ isrc: isrcInfo, latlng: currentLocation });
              onClose(); // Close the modal after submitting
            }}
          >
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
