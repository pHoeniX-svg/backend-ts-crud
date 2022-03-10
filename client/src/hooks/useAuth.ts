import { useContext, useDebugValue } from 'react';
import { AuthContext } from '~src/context';

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }

  const { auth, setAuth } = context;
  useDebugValue(auth, (auth) => (auth?.user ? 'Logged In' : 'Logged Out'));

  return {
    auth,
    setAuth,
  };
}

export { useAuth };
