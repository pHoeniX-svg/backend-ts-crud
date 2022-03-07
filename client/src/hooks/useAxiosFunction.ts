import {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { useEffect, useState } from 'react';

type HookReturnType<T> = [
  T,
  string,
  boolean,
  (configObj: TConfig) => Promise<void>
];

type TConfig = {
  axiosInstance: AxiosInstance;
  method: string;
  url: string;
  requestConfig: AxiosRequestConfig;
};

const useAxiosFunction = <T>(): HookReturnType<T> => {
  const [response, setResponse] = useState<T>([] as unknown as T);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [controller, setController] = useState<AbortController>();

  const axiosFetch = async (configObj: TConfig) => {
    const { axiosInstance, url, requestConfig = {} } = configObj;
    try {
      setLoading(true);
      const ctrl = new AbortController();
      setController(ctrl);
      const result: AxiosResponse = await axiosInstance(url, {
        ...requestConfig,
        signal: ctrl.signal,
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

  useEffect(() => {
    console.log(controller);

    return () => {
      controller?.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controller]);

  return [response, error, loading, axiosFetch];
};

export { useAxiosFunction };
