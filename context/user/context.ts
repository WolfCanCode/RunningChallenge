'use client';

import React, { createContext, useContext } from 'react';

export interface IUserContext {
  userToken: string | null;
  login: () => Promise<boolean>;
}

const defaultState: IUserContext = {
  userToken: null,
  login: async () => false,
};

export const UserContext = createContext<IUserContext>(defaultState);

export const useUserContext = () => useContext(UserContext);
