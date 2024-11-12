'use client';

import { AddIcon } from '@chakra-ui/icons';
import {
  Center,
  Select,
  Button,
  HStack,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import { useState, ChangeEvent, useEffect } from 'react';
import { useGetMelodyFiltered } from '@/apis/api/get/useGetMelodyFiltered';
import { useGetMelodyNear } from '@/apis/api/get/useGetMelodyNear';
import useLocationInfo from '@/hooks/useLocationInfo';
import { usePinStore, Pin } from '@/utils/store';
import { MusicSelectModal } from './MusicSelectModal';

export const FilterSelectBar = () => {
  const [filter, setFilter] = useState<'all' | 'likes' | 'created' | 'comment'>(
    'all'
  );
  const { locationInfo } = useLocationInfo();
  const setPins = usePinStore((state) => state.setPinList);
  const { melodyFiltered } = useGetMelodyFiltered(filter);
  const { melodyNear } = useGetMelodyNear(
    { locationInfo: locationInfo },
    filter == 'all'
  );

  const handleFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value as 'all' | 'likes' | 'created' | 'comment');
  };

  // Set initial pins to all melodies on first render
  useEffect(() => {
    if (Array.isArray(melodyNear)) {
      setPins(melodyNear);
    }
  }, [melodyNear, setPins]);

  useEffect(() => {
    if (filter === 'all' && Array.isArray(melodyNear)) {
      console.log('모든멜로디');
      setPins(melodyNear);
    } else if (Array.isArray(melodyFiltered)) {
      console.log('필터링멜로디');
      setPins(melodyFiltered);
    }
  }, [melodyFiltered, melodyNear, filter]);

  //멜로디 추가 로직
  const {
    isOpen: isMusicModalOpen,
    onOpen: onMusicModalOpen,
    onClose: onMusicModalClose,
  } = useDisclosure();

  return (
    <>
      <Center
        className="absolute top-5 left-1/2 transform -translate-x-1/2"
        top="5vh"
        zIndex="10"
      >
        <HStack spacing={2} maxWidth="100%" width="60vw">
          <Select
            value={filter}
            onChange={handleFilterChange}
            size="sm"
            bg="whiteAlpha.800"
            color="black"
            borderRadius="md"
            shadow="sm"
            _hover={{ bg: 'whiteAlpha.900' }}
          >
            <option value="all">모든 멜로디</option>
            <option value="created">내가 생성한 멜로디</option>
            <option value="likes">내가 좋아한 멜로디</option>
            <option value="comment">내가 반응한 멜로디</option>
          </Select>

          <IconButton
            aria-label="Add Melody"
            icon={<AddIcon />}
            size="sm"
            bg="whiteAlpha.800"
            color="black"
            borderRadius="md"
            shadow="sm"
            _hover={{ bg: 'whiteAlpha.900' }}
            onClick={onMusicModalOpen}
          />
        </HStack>
      </Center>
      <MusicSelectModal
        isOpen={isMusicModalOpen}
        onClose={onMusicModalClose}
        currentLocation={locationInfo}
      />
    </>
  );
};
