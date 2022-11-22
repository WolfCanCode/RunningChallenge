"use client";

import { Loader } from "components";
import { routePath } from "components/BottomBar/config";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UserStatus, useUserContext } from "../context/user";

export default function LandingPage() {
  const { login, userStatus } = useUserContext();
  const [isLoading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (userStatus !== UserStatus.AUTHENTICATED) return;
    router.push(routePath.challengeList);
  }, [userStatus]);

  const loginHandler = async () => {
    setLoading(true);
    const isAuthenticated = await login();
    if (isAuthenticated) {
      router.push(routePath.challengeList);
    }
    setLoading(false);
  };

  return (
    userStatus === UserStatus.UNAUTHENTICATED
      ? (
        <div className="flex flex-col justify-between bg-landing h-full w-full p-edges">
          <div className="text-center">
            <span className="text-4xl text-lead">
              Accept the <strong>challenge</strong> with us!
            </span>
          </div>
          <div className="flex flex-col gap-[40px]">
            <div>
              <span className="text-lg text-coronation">
                Start the challenge by click on the “Start” button below
              </span>
            </div>
            <div className="text-center">
              <button
                disabled={isLoading}
                onClick={loginHandler}
                className="h-[80px] w-[80px] bg-coronation text-lead text-xl rounded-full font-bold active:scale-90"
              >
                {isLoading ? "..." : "Start"}
              </button>
            </div>
          </div>
        </div>
      )
      : <Loader />
  );
}
