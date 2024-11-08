import type { NextApiRequest, NextApiResponse } from 'next';
import qs from 'querystring';
import { BASE_URL, SPOTIFY_AUTHORIZE_URL } from '@/constants/url';

export default function page(req: NextApiRequest, res: NextApiResponse) {
  res.redirect(
    SPOTIFY_AUTHORIZE_URL +
      '?' +
      qs.stringify({
        response_type: 'code',
        client_id: process.env.NEXT_PUBLIC_SPOTIFY_BE_CLIENT_ID,
        redirect_uri: `${BASE_URL}/callback`,
      })
  );
}
