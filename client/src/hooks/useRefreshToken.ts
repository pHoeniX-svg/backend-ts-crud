import axios from '~src/api/axios';
import { useAuth } from '~src/hooks';

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get<{
      accessToken: string;
    }>('/refresh', { withCredentials: true });

    setAuth((prevState) => {
      console.log(JSON.stringify(prevState));
      console.log(response?.data?.accessToken);
      return {
        ...prevState,
        accessToken: response?.data?.accessToken,
      };
    });

    return response.data.accessToken;
  };

  return refresh;
};

export { useRefreshToken };
