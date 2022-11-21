import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ success: boolean }>
) {
  const { challengeId } = JSON.parse(req.body);
  const challengeData = await fetch(
    `https://api.stg.rastro.ch/v1/juoco/joinPlayerOnChallenge/${challengeId} `,
    {
      method: 'POST',
      headers: { authorization: req.headers.authorization as string },
    }
  )
    .then((response) => response.json())
    .then((data) => data);
  if (challengeData) {
    res.status(200).json({ success: true });
  } else {
    res.status(400).json({ success: false });
  }
}
