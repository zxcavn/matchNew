import { createAsyncThunk } from '@reduxjs/toolkit';
import { openNewSource } from '@xfi/helpers';

import { faucetApi } from '@/crud/faucet';
import { TelegramAuthResponse, TokenResponse } from '@/crud/faucet/types';
import { getApiErrorMessage, mapApiErrorToText, pushNotification } from '@/helpers';
import { notificationTypes } from '@/shared/constants';
import { CosmosCurrency } from '@/shared/types';

import { FaucetFetchMethod } from './constants';
import { TgAuthTokenType } from './types';

export const getLinkAsync = createAsyncThunk<TokenResponse, void, { rejectValue: string }>(
  FaucetFetchMethod.getLinkAsync,
  async (_, { rejectWithValue, signal }) => {
    try {
      const { data } = await faucetApi.getLink({ signal });

      openNewSource(data.link, '_blank', 'noopener noreferrer');

      return data;
    } catch (error) {
      const errorMessage = getApiErrorMessage(error);

      const message = mapApiErrorToText(errorMessage);

      pushNotification({
        ...notificationTypes.error,
        message: { id: message },
      });

      return rejectWithValue(errorMessage);
    }
  }
);

export const checkAuthAsync = createAsyncThunk<
  TelegramAuthResponse & { mpx: { lastClaimTime: number }; xfi: { lastClaimTime: number } },
  TgAuthTokenType,
  { rejectValue: string }
>(FaucetFetchMethod.checkAuthAsync, async (tgAuthToken, { rejectWithValue, signal }) => {
  try {
    const { data } = await faucetApi.checkAuth(tgAuthToken.token, { signal });
    let mpxData;
    let xfiData;

    if (!data.telegram_user) {
      throw new Error();
    } else {
      const [{ data: mpxResponse }, { data: xfiResponse }] = await Promise.all([
        faucetApi.getLastClaimData(CosmosCurrency.MPX, { telegram_id: String(data.telegram_user.id) }),
        faucetApi.getLastClaimData(CosmosCurrency.XFI, { telegram_id: String(data.telegram_user.id) }),
      ]);

      mpxData = mpxResponse;
      xfiData = xfiResponse;
    }

    return {
      status: data.status,
      telegram_user: data.telegram_user,
      mpx: {
        lastClaimTime: mpxData.last_claim_time,
      },
      xfi: {
        lastClaimTime: xfiData.last_claim_time,
      },
    };
  } catch (error) {
    const errorMessage = getApiErrorMessage(error);

    const message = mapApiErrorToText(errorMessage);

    pushNotification({
      ...notificationTypes.error,
      message: { id: message },
    });

    setTimeout(() => {
      openNewSource(tgAuthToken.link, '_blank', 'noopener noreferrer');
    }, 2000);

    return rejectWithValue(message);
  }
});

export const getClaimCoinAsync = createAsyncThunk<
  { lastClaimTime: number },
  { coin: CosmosCurrency; account: string; telegram_id: string; token: string },
  { rejectValue: string }
>(FaucetFetchMethod.claimCoinAsync, async ({ coin, token, account, telegram_id }, { rejectWithValue, signal }) => {
  try {
    const params = new URLSearchParams();

    params.set('token', token);
    params.set('address', account);

    await faucetApi.getClaimData(coin, params);

    const { data } = await faucetApi.getLastClaimData(coin, { telegram_id }, { signal });

    pushNotification({
      ...notificationTypes.success,
      message: { id: 'SUMMARY.FAUCET.SUCCESS' },
    });

    return { lastClaimTime: data.last_claim_time };
  } catch (error) {
    const errorMessage = getApiErrorMessage(error);

    const message = mapApiErrorToText(errorMessage);

    pushNotification({
      ...notificationTypes.error,
      message: { id: 'NOTIFICATIONS.EXECUTION_ERROR' },
      additional: { id: message },
    });

    return rejectWithValue(message);
  }
});
