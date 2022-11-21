"use client";

import React, { Children, ReactNode, useEffect, useState } from "react";
import { UserContext } from "./context";
import { Cookies } from "react-cookie";
import { ACCESS_TOKEN_KEY, DEFAULT_EXPIRED_DAYS } from "./constants";

interface UserContextWrapperProps {
  children: JSX.Element | ReactNode;
}
export const UserContextWrapper = ({ children }: UserContextWrapperProps) => {
  const cookies = new Cookies();

  const [userToken, setUserToken] = useState<string>("");

  const nextDays = (days: number) =>
    new Date(new Date().setDate(new Date().getDate() + days));

  useEffect(() => {
    // init state from cookies
    const accessToken = cookies.get(ACCESS_TOKEN_KEY) || "";

    if (accessToken) {
      setUserToken(accessToken);
    }
  }, []);

  const login = async () => {
    const accessToken = await fetch(
      "https://api.stg.rastro.ch/v1/public/user/newAccount/scc",
      {
        method: "POST",
      },
    ).then((response) => response.json()).then((data) => data.accessToken);
    cookies.set(ACCESS_TOKEN_KEY, accessToken, {
      expires: nextDays(DEFAULT_EXPIRED_DAYS),
    });
    return Boolean(accessToken);
  };

  return (
    <UserContext.Provider
      value={{
        userToken,
        login,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
