import axios from '~src/api/axios';
import { REFRESH_URL } from '~src/constants';
import { useAuth } from '~src/hooks';

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get<{
      accessToken: string;
      roles: number[];
    }>(REFRESH_URL, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    });

    setAuth((prev) => {
      return {
        ...prev,
        roles: response.data.roles,
        accessToken: response.data.accessToken,
      };
    });
    return response.data.accessToken;
  };
  return refresh;
};

export { useRefreshToken };
