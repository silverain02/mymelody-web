'use client';

import { useSearchParams } from 'next/navigation';

/* eslint-disable react/function-component-definition */
export default function Page() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  return (
    <>
      <h1>code</h1>
    </>
  );
}
