"use client";

import { BottomBar } from "components";

export default function ChallengeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col justify-between h-full w-full p-edges">
      {children}
      <BottomBar />
    </div>
  );
}
