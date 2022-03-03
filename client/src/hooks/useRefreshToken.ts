import axios from '~src/api/axios';
import { REFRESH_URL } from '~src/constants';
import { useAuth } from '~src/hooks';

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async (): Promise<string> => {
    const response = await axios.get<{
      accessToken: string;
      roles: number[];
    }>(REFRESH_URL, { withCredentials: true });

    setAuth((prevState) => {
      console.log(JSON.stringify(prevState));
      console.log(response?.data?.accessToken);

      return {
        ...prevState,
        roles: response.data.roles,
        accessToken: response.data.accessToken,
      };
    });

    return response.data.accessToken;
  };

  return refresh;
};

export { useRefreshToken };
