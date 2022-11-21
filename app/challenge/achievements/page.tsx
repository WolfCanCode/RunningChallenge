"use client";

import { ChallengeItem, Loader } from "components";
import { routePath } from "components/BottomBar/config";
import { useUserContext } from "context/user";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { ChallengeData } from "pages/api/getActiveChallengesForPlayer";
import { AchievementData } from "pages/api/getPlayerAchievements";
import { useEffect, useState } from "react";

export default function AllAchievement() {
  const router = useRouter();
  const { userToken } = useUserContext();
  const [isLoading, setLoading] = useState(false);
  const [isLoadingChallenge, setLoadingChallenge] = useState<
    { [key: string]: boolean }
  >({});
  const [challenges, setChallenges] = useState<AchievementData[]>([]);

  const fetchData = async () => {
    setLoading(true);
    const challenges: AchievementData[] = await fetch(
      "/api/getPlayerAchievements",
      {
        headers: { "Authorization": `Bearer ${userToken}` },
      },
    ).then((response) => response.json()).then((data) => data);
    setChallenges(challenges);
    setLoading(false);
  };

  const joinChallenge = async (challengeId: string) => {
    setLoadingChallenge({ [challengeId]: true });
    const data: { success: boolean } = await fetch(
      "/api/joinPlayerOnChallenge",
      {
        method: "POST",
        headers: { "Authorization": `Bearer ${userToken}` },
        body: JSON.stringify({ challengeId }),
      },
    ).then((response) => response.json()).then((data) => data);
    setLoadingChallenge({ [challengeId]: false });
    router.push(routePath.onGoingList);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-[40px]">
      <p className="text-4xl font-bold">Completed 🏅</p>
      {isLoading ? <Loader /> : null}
      {challenges.map((challenge) => (
        <ChallengeItem
          key={challenge.id}
          title={challenge.title}
          description={challenge.description}
          logo={challenge.imageUrl}
          items={[{
            label: "🔥",
            value: challenge.level,
          }, {
            label: "🏅",
            value: dayjs(challenge.grantedAt).format("YYYY/MM/DD"),
          }]}
          onClick={() => joinChallenge(challenge.id)}
        />
      ))}
    </div>
  );
}
