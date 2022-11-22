"use client";

import { ChallengeItem, Loader } from "components";
import { useUserContext } from "context/user";
import { ChallengeOngoingData } from "pages/api/getPlayerChallenges";
import { useEffect, useMemo, useState } from "react";

export default function OngoingChallenge() {
  const { userToken } = useUserContext();
  const [isLoading, setLoading] = useState(false);
  const [challenges, setChallenges] = useState<ChallengeOngoingData[]>([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const challenges: ChallengeOngoingData[] = await fetch(
        "/api/getPlayerChallenges",
        {
          headers: { "Authorization": `Bearer ${userToken}` },
        },
      ).then((response) => response.json()).then((data) => data);
      const sortedChallenges = challenges.sort((a, b) =>
        new Date(b.startedDate).getTime() - new Date(a.startedDate).getTime()
      );
      setChallenges(sortedChallenges);
    } catch (e) {
      throw e;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getStatusIcon = (
    status: ChallengeOngoingData["status"],
  ): string => {
    if (status === "PENDING") return "◻️";
    if (status === "SUCCESS") return "✅";
    if (status === "FAILED") return "❌";
    return "";
  };

  return (
    <div className="flex flex-col gap-[40px]">
      <p className="text-4xl font-bold">Running 🏃</p>
      {isLoading ? <Loader /> : null}
      {challenges.map((challenge) => (
        <>
          <ChallengeItem
            title={challenge.title}
            description={challenge.description}
            logo={challenge.imageUrl}
            status={challenge.status}
            items={[{
              label: "🔥",
              value: challenge.level,
            }, {
              label: "🏁",
              value: challenge.expiresDate,
              isSmall: true,
            }]}
            isTime
            buttonLabel={getStatusIcon(challenge.status)}
          />
        </>
      ))}
    </div>
  );
}
