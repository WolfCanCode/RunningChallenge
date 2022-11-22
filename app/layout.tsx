"use client";

import { useWindowSize } from "hooks/useWindowSize";
import { useEffect } from "react";
import { UserContextWrapper, useUserContext } from "../context/user";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { width, height } = useWindowSize();

  useEffect(() => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }, [width, height]);

  return (
    <html lang="en">
      <head />
      <body className="lg:py-edges w-screen bg-lead relative flex flex-col justify-center">
        <div className="
            lg:h-[932px] lg:w-[430px] lg:max-h-[932px] lg:max-w-[430px] h-full w-full  overflow-hidden 
            bg-coronation m-auto relative lg:border-coronation lg:border-solid lg:border-2
            lg:rounded-xl">
          {/* Manages user token */}
          <UserContextWrapper>
            {children}
          </UserContextWrapper>
        </div>
      </body>
    </html>
  );
}
