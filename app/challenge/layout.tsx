"use client";

import { BottomBar, Loader, TopBar } from "components";
import { UserStatus, useUserContext } from "context/user";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ChallengeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userStatus } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    if (userStatus !== UserStatus.UNAUTHENTICATED) return;
    router.push("/");
  }, [userStatus]);
  return (
    userStatus && userStatus === UserStatus.AUTHENTICATED
      ? (
        <div className="relative w-full h-full bg-coronation px-edges">
          <div className="w-full h-[calc(100%_-_86px)]  overflow-y-auto">
            <div className="my-[40px]">
              <TopBar />
              <div className="mt-[40px]">
                {children}
              </div>
            </div>
          </div>
          <BottomBar />
        </div>
      )
      : <Loader />
  );
}
