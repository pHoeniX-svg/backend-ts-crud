import axios from '~src/api/axios';
import { AuthState } from '~src/context';
import { useAuth } from '~src/hooks';

const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = async () => {
    setAuth({} as AuthState);

    try {
      // axios to /logout endpoint
      const response = await axios('/logout', {
        withCredentials: true,
      });
    } catch (error) {
      console.error(error);
    }
  };
  return logout;
};

export { useLogout };
