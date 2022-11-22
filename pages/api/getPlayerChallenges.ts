import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  status: 'PENDING' | 'FAILED' | 'SUCCESS';
  challenge: {
    id: string;
    durationInMillis: number;
    achievement: {
      level: number;
      resources: {
        [key: string]: ResourceData;
      };
    };
  };
  startedDate: string;
  expiresDate: string;
};

type ResourceData = {
  title: string;
  description: string;
  imageUrl: string;
};

export type ChallengeOngoingData = {
  id: string;
  status: 'PENDING' | 'FAILED' | 'SUCCESS';
  title: string;
  description: string;
  durationInMillis: number;
  imageUrl: string;
  level: number;
  startedDate: string;
  expiresDate: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ChallengeOngoingData[] | null>
) {
  const challengeData = await fetch(
    'https://api.stg.rastro.ch/v1/juoco/getPlayerChallenges',
    {
      headers: { authorization: req.headers.authorization as string },
    }
  )
    .then((response) => response.json())
    .then((data) => data);
  res.status(200).json(mappingData(challengeData));
}

const mappingData = (data: Data[]): ChallengeOngoingData[] | null => {
  if (!data) return null;
  const getResource = (challenge: Data['challenge']): ResourceData =>
    challenge.achievement.resources?.['en'] ??
    challenge.achievement.resources[
      Object.keys(challenge.achievement.resources)[0]
    ];
  return data.map(({ challenge, status, expiresDate, startedDate }) => ({
    id: challenge.id,
    status: status,
    title: getResource(challenge).title,
    description: getResource(challenge).description,
    durationInMillis: challenge.durationInMillis,
    imageUrl: getResource(challenge).imageUrl,
    level: challenge.achievement.level,
    expiresDate: expiresDate,
    startedDate: startedDate,
  }));
};
