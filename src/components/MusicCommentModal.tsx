import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
} from '@chakra-ui/react';
import { useState } from 'react';

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitComment: (comment: string) => void;
}

export const MusicCommentModal: React.FC<CommentModalProps> = ({
  isOpen,
  onClose,
  onSubmitComment,
}) => {
  const [comment, setComment] = useState('');

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Enter a Comment</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            placeholder="멜로디에 대한 생각은?"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            onClick={() => {
              onSubmitComment(comment);
              setComment(''); // Clear the input after submit
              onClose();
            }}
          >
            Submit Comment
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
