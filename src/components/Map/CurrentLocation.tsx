'use client';
import { useEffect } from 'react';

const CurrentLocation = () => {
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords.latitude, position.coords.longitude);
    });
  }, []);
  return <></>;
};

export default CurrentLocation;
