import { generateRandomString } from '@/apis/utils/generateRandomString';
import type { NextApiRequest, NextApiResponse } from 'next';
import qs from 'querystring';
import { BASE_URL, SPOTIFY_AUTHORIZE_URL } from '@/constants/url';

export default function page(req: NextApiRequest, res: NextApiResponse) {
  const state = generateRandomString(16);
  const scope =
    'user-read-private user-read-email user-read-playback-state user-modify-playback-state streaming';

  res.redirect(
    SPOTIFY_AUTHORIZE_URL +
      '?' +
      qs.stringify({
        response_type: 'code',
        client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
        scope: scope,
        redirect_uri: `${BASE_URL}/callback`,
        state: state,
      })
  );
}
