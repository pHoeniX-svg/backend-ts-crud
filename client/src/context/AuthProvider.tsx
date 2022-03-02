import { createContext, Dispatch, useContext, useState } from 'react';

type AuthState = {
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
  // const value = useMemo(() => [auth, setAuth], [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
}

export { AuthProvider, useAuth };
