import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react';
import { SearchBar } from './SearchBar';
import { useState } from 'react';
import { SelectBar } from './SelectBar';

interface MusicSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MusicSelectModal: React.FC<MusicSelectModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [isListOpen, setIsListOpen] = useState(false); // 음악정보 리스트 열람 여부
  const [musicName, setMusicName] = useState(''); // 검색 데이터

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        maxW={['90%', '80%', '500px']} // Adjust width based on screen size
        mx="auto" // Center horizontally with margin on smaller screens
        maxH="90vh" // Ensure the modal doesn't exceed 90% of viewport height
        overflowY="auto" // Allow scrolling if content exceeds height
      >
        <ModalHeader>멜로디 검색</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <SearchBar
            musicName={musicName}
            setMusicName={setMusicName}
            isListOpen={isListOpen}
            setIsListOpen={setIsListOpen}
          />
          {isListOpen && <SelectBar musicName={musicName}></SelectBar>}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost">Submit</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
