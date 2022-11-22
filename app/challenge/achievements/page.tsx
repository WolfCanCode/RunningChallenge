"use client";

import { ChallengeItem, Loader } from "components";
import { useUserContext } from "context/user";
import dayjs from "dayjs";
import { AchievementData } from "pages/api/getPlayerAchievements";
import { useEffect, useState } from "react";

export default function AllAchievement() {
  const { userToken } = useUserContext();
  const [isLoading, setLoading] = useState(false);
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
        />
      ))}
    </div>
  );
}
