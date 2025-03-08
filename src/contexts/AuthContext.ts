import { createContext } from 'react';

type AuthContextType = {
  accessToken: string;
  login: (accessToken: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);