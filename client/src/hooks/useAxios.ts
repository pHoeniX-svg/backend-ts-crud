import {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { useEffect, useState } from 'react';

type HookReturnType<T> = [T, string, boolean, () => void];

type TConfig = {
  axiosInstance: AxiosInstance;
  method: string;
  url: string;
  requestConfig: AxiosRequestConfig;
};

const useAxios = <T>(configObj: TConfig): HookReturnType<T> => {
  const { axiosInstance, url, requestConfig = {} } = configObj;
  const [response, setResponse] = useState<T>([] as unknown as T);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(0);

  const refetch = () => {
    setReload((prev) => prev + 1);
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const result: AxiosResponse = await axiosInstance(url, {
          ...requestConfig,
          signal: controller.signal,
        });
        console.log(result);
        setResponse(result.data);
      } catch (error) {
        const e = error as AxiosError;
        console.error(e.message);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  return [response, error, loading, refetch];
};

export { useAxios };
