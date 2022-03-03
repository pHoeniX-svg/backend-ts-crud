import { useContext, useDebugValue } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext, AuthState } from '~src/context';

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }

  const { auth, setAuth } = context;
  useDebugValue(auth, (auth) => (auth?.user ? 'Logged In' : 'Logged Out'));

  const navigate = useNavigate();

  const logout = async () => {
    // axios to /logout endpoint
    setAuth({} as AuthState);
    navigate('/linkpage');
  };

  return {
    auth,
    setAuth,
    logout,
  };
}

export { useAuth };
