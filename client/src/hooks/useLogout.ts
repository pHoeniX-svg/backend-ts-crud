import axios from '~src/api/axios';
import { AuthState } from '~src/context';
import { useAuth } from '~src/hooks';

const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = async () => {
    setAuth({} as AuthState);
    try {
      const response = await axios('/logout', {
        withCredentials: true,
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return logout;
};

export { useLogout };
