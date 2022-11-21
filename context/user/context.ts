('use client');

import { createContext, useContext } from 'react';

export enum UserStatus {
  INITIAL = 'initial',
  UNAUTHENTICATED = 'unAuthenticated',
  AUTHENTICATED = 'authenticated',
}

export interface IUserContext {
  userToken: string | null;
  userStatus: UserStatus;
  login: () => Promise<boolean>;
}

export const defaultState: IUserContext = {
  userToken: '',
  login: async () => false,
  userStatus: UserStatus.INITIAL,
};

/* Creating a context object that can be used to pass data down the component tree without having to
pass props down manually at every level. */
export const UserContext = createContext<IUserContext>(defaultState);

export const useUserContext = () => useContext(UserContext);
