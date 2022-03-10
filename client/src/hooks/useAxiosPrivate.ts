import {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosRequestHeaders,
} from 'axios';
import { useEffect } from 'react';
import { axiosPrivate } from '../api/axios';
import { useAuth } from './useAuth';
import { useRefreshToken } from './useRefreshToken';

export const useAxiosPrivate = (): AxiosInstance => {
  const { auth } = useAuth();
  const refresh = useRefreshToken();

  useEffect(() => {
    /* REQUEST INTERCEPT: sets the access token to authorize */
    /* the request for a new refresh token */
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        const configHeaders = config.headers as AxiosRequestHeaders;
        if (!configHeaders['Authorization']) {
          configHeaders['Authorization'] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (error: AxiosError) => Promise.reject(error)
    );

    /* RESPONSE INTERCEPT: gets the new access token */
    const responseInterceptor = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const prevRequest = error?.config as AxiosRequestConfig & {
          sent: boolean;
          headers: {
            Authorization: string;
          };
        };
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptor);
      axiosPrivate.interceptors.response.eject(responseInterceptor);
    };
  }, [auth, refresh]);

  return axiosPrivate;
};
