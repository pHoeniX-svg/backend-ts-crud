/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createContext, Dispatch, useState } from 'react';

export type AuthState = {
  user: string;
  pwd: string;
  roles: number[];
  accessToken?: string;
};

type AuthDispatch = Dispatch<React.SetStateAction<AuthState>>;

type AuthContextProps = {
  auth: AuthState;
  setAuth: AuthDispatch;
};

type AuthProviderProps = { children: React.ReactNode };

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useState<AuthState>({} as AuthState);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
