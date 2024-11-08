import qs from 'querystring';
import { BASE_URL, SPOTIFY_AUTHORIZE_URL } from '@/constants/url';
import { redirect } from 'next/navigation';

export default function page() {
  redirect(
    SPOTIFY_AUTHORIZE_URL +
      '?' +
      qs.stringify({
        response_type: 'code',
        client_id: process.env.NEXT_PUBLIC_SPOTIFY_BE_CLIENT_ID,
        redirect_uri: `${BASE_URL}/callback`,
      })
  );
}
