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
            h-[932px] w-[430px] max-h-[932px] max-w-[430px] overflow-hidden 
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
