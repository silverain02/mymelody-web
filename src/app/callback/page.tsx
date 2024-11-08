/* eslint-disable react/function-component-definition */
import { NextApiRequest, NextApiResponse } from 'next';

export default function Page(req: NextApiRequest, res: NextApiResponse) {
  const code = typeof req.query.code === 'string' ? req.query.code : null;
  const state = typeof req.query.state === 'string' ? req.query.state : null;

  console.log(code);
  console.log(state);

  return (
    <>
      <h1>this is callback</h1>
    </>
  );
}
