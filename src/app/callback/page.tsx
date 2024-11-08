'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

/* eslint-disable react/function-component-definition */
export default function Page() {
  const searchParams = useSearchParams();
  console.log(searchParams);

  return (
    <>
      <h1>this is callback</h1>
    </>
  );
}
