import { Store } from '@reduxjs/toolkit';
import { redirect } from '@xfi/helpers';
import { AxiosInstance } from 'axios';

import { DEFAULT_LOCALE } from '@/lib/i18n';
import { LocalStorageService } from '@/services';
import { PAGES } from '@/shared/constants';
import { AxiosErrorType } from '@/shared/types';
import { RootState } from '@/store';
import { logout as logoutWalletAction } from '@/store/wallet';

import { api, REFRESH_TOKEN_URL } from './api';

enum ApiRequestHeader {
  REFRESH = 'X-Refresh',
  AUTHORIZATION = 'X-Authorization',
  LANGUAGE = 'X-Language',
}

let isRefreshing = false;
let failedQueue: {
  resolve: (value: unknown) => typeof value;
  reject: (reason?: unknown) => typeof reason;
}[] = [];

const processQueue = (error: AxiosErrorType | null, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

const setupAxios = (axiosInstance: AxiosInstance, store: Store<RootState>) => {
  axiosInstance.interceptors.request.use(
    config => {
      const { accessToken } = LocalStorageService.getTokens();

      if (config.headers) {
        if (accessToken) config.headers[ApiRequestHeader.AUTHORIZATION] = accessToken;

        config.headers[ApiRequestHeader.LANGUAGE] = LocalStorageService.getLocale() || DEFAULT_LOCALE;
      }

      return config;
    },
    error => {
      Promise.reject(error);
    }
  );
  axiosInstance.interceptors.response.use(
    response => {
      return response;
    },
    async error => {
      const originalRequest = error.config;

      if (originalRequest.url === REFRESH_TOKEN_URL) {
        redirect(PAGES.home.pathname);

        return Promise.reject(error);
      }

      if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise(function (resolve, reject) {
            failedQueue.push({ resolve, reject });
          })
            .then(token => {
              originalRequest.headers[ApiRequestHeader.AUTHORIZATION] = token;

              return axiosInstance(originalRequest);
            })
            .catch(err => {
              redirect(PAGES.home.pathname);

              return Promise.reject(err);
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        const { refreshToken } = LocalStorageService.getTokens();

        return new Promise(function (resolve, reject) {
          api
            .refreshToken({
              headers: {
                [ApiRequestHeader.REFRESH]: refreshToken,
              },
            })
            .then(({ data }) => {
              LocalStorageService.setTokens({ accessToken: data.authorizationToken.token, refreshToken });

              axiosInstance.defaults.headers.common[ApiRequestHeader.AUTHORIZATION] = data.authorizationToken.token;
              originalRequest.headers[ApiRequestHeader.AUTHORIZATION] = data.authorizationToken.token;
              processQueue(null, data.authorizationToken.token);

              resolve(axiosInstance(originalRequest));
            })
            .catch(err => {
              processQueue(err, null);
              store.dispatch(logoutWalletAction());
              redirect(PAGES.home.pathname);
              reject(err);
            })
            .finally(() => {
              isRefreshing = false;
            });
        });
      }

      return Promise.reject(error);
    }
  );
};

export default setupAxios;
