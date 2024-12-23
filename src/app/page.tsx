/* eslint-disable react/function-component-definition */
import { OnBoarding } from '@/components/OnBoarding';
import { ChakraProvider } from '@chakra-ui/react';

export default function Page() {
  return (
    <>
      <ChakraProvider>
        <OnBoarding />
      </ChakraProvider>
    </>
  );
}
