"use client";

import React, { Children, ReactNode, useEffect, useState } from "react";
import { UserContext, UserStatus } from "./context";
import { Cookies } from "react-cookie";
import { ACCESS_TOKEN_KEY, DEFAULT_EXPIRED_DAYS } from "./constants";

interface UserContextWrapperProps {
  children: JSX.Element | ReactNode;
}
export const UserContextWrapper = ({ children }: UserContextWrapperProps) => {
  const cookies = new Cookies();

  const [userToken, setUserToken] = useState<string>("");
  const [userStatus, setUserStatus] = useState<UserStatus>(UserStatus.INITIAL);

  const nextDays = (days: number) =>
    new Date(new Date().setDate(new Date().getDate() + days));

  /**
   * If there's an access token in the cookies, set the user token to that value
   */
  const initializeToken = () => {
    // init state from cookies
    const accessToken = cookies.get(ACCESS_TOKEN_KEY) || "";
    if (accessToken) {
      setUserToken(accessToken);
      setUserStatus(UserStatus.AUTHENTICATED);
    } else {
      setUserToken("");
      setUserStatus(UserStatus.UNAUTHENTICATED);
    }
  };

  useEffect(() => {
    initializeToken();
  }, []);

  /**
   * It fetches an access token from the API, stores it in a cookie, and returns a boolean indicating
   * whether the operation was successful
   * @returns A boolean value.
   */
  const login = async () => {
    const accessToken = await fetch(
      "/api/login",
      {
        method: "POST",
      },
    ).then((response) => response.json()).then((data) => data.accessToken);
    cookies.set(ACCESS_TOKEN_KEY, accessToken, {
      expires: nextDays(DEFAULT_EXPIRED_DAYS),
    });
    if (Boolean(accessToken)) {
      setUserToken(accessToken);
      setUserStatus(UserStatus.AUTHENTICATED);
    }
    return Boolean(accessToken);
  };

  return (
    <UserContext.Provider
      value={{
        userToken,
        login,
        userStatus,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
