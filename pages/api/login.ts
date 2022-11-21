// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  accessToken: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const accessToken = await fetch(
    'https://api.stg.rastro.ch/v1/public/user/newAccount/scc',
    {
      method: 'POST',
    }
  )
    .then((response) => response.json())
    .then((data) => data.accessToken);

  res.status(200).json({ accessToken });
}
