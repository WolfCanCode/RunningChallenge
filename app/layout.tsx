"use client";

import { useRouter } from "next/router";
import { useEffect } from "react";
import { UserContextWrapper, useUserContext } from "../context/user";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <div className="h-screen w-screen bg-lead relative flex flex-col justify-center">
          <div className="
            lg:h-[932px] lg:w-[430px] lg:max-h-[932px] lg:max-w-[430px] h-full w-full  overflow-hidden 
            bg-coronation m-auto relative border-coronation border-solid border-2
            rounded-xl">
            {/* Manages user token */}
            <UserContextWrapper>
              {children}
            </UserContextWrapper>
          </div>
        </div>
      </body>
    </html>
  );
}
