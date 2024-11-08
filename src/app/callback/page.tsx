import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

/* eslint-disable react/function-component-definition */
export default function Page() {
  const router = useRouter();
  const [queryParams, setQueryParams] = useState({});

  useEffect(() => {
    if (router.isReady) {
      setQueryParams(router.query);
      console.log(JSON.stringify(queryParams, null, 2));
    }
  }, [router.isReady, router.query]);

  return (
    <>
      <h1>this is callback</h1>
    </>
  );
}
