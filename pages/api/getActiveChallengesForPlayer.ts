import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  id: string;
  durationInMillis: number;
  achievement: {
    level: number;
    resources: {
      [key: string]: ResourceData;
    };
  };
};

type ResourceData = {
  title: string;
  description: string;
  imageUrl: string;
};

export type ChallengeData = {
  id: string;
  title: string;
  description: string;
  durationInMillis: number;
  imageUrl: string;
  level: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ChallengeData[] | null>
) {
  const challengeData = await fetch(
    'https://api.stg.rastro.ch/v1/juoco/getActiveChallengesForPlayer',
    {
      headers: { authorization: req.headers.authorization as string },
    }
  )
    .then((response) => response.json())
    .then((data) => data);

  res.status(200).json(mappingData(challengeData));
}

const mappingData = (data: Data[]): ChallengeData[] | null => {
  if (!data) return null;
  const getResource = (challenge: Data): ResourceData =>
    challenge.achievement.resources?.['en'] ??
    challenge.achievement.resources[
      Object.keys(challenge.achievement.resources)[0]
    ];
  return data.map((challenge) => ({
    id: challenge.id,
    title: getResource(challenge).title,
    description: getResource(challenge).description,
    durationInMillis: challenge.durationInMillis,
    imageUrl: getResource(challenge).imageUrl,
    level: challenge.achievement.level,
  }));
};
