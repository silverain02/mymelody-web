'use client';

import { useGetMelodyFiltered } from '@/apis/api/get/useGetMelodyFiltered';
import { Center, Select } from '@chakra-ui/react';
import { useState, ChangeEvent, useEffect } from 'react';

export const FilterSelectBar = () => {
  // State for storing selected filter
  const [filter, setFilter] = useState<'likes' | 'created' | 'comment'>(
    'likes'
  );

  const { melodyFiltered, isLoading, isSuccess, error } =
    useGetMelodyFiltered(filter);

  // Handle filter change
  const handleFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value !== 'all')
      setFilter(event.target.value as 'likes' | 'created' | 'comment');
  };

  useEffect(() => {
    console.log(melodyFiltered);
  }, [filter]);

  return (
    <>
      <Center
        className="absolute top-5 left-1/2 transform -translate-x-1/2"
        top="5vh"
        zIndex="10"
      >
        <Select
          value={filter} // Sync with state
          onChange={handleFilterChange} // Handle change
          size="sm"
          bg="whiteAlpha.800" // 투명하게 설정
          color="black"
          borderRadius="md"
          shadow="sm"
          maxWidth="400px"
          width="50vw" // 원하는 크기로 설정
          _hover={{ bg: 'whiteAlpha.900' }}
        >
          <option value="all">모든 멜로디</option>
          <option value="created">내가 생성한 멜로디</option>
          <option value="liked">내가 좋아한 멜로디</option>
          <option value="comment">내가 반응한 멜로디</option>
        </Select>
      </Center>
    </>
  );
};