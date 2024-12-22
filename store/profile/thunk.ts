import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
import { toBeHex } from 'ethers';

import { ProfileResponse, xfiPadApi } from '@/crud/xfiPad';
import { getApiErrorMessage, isExtensionActionRejectedError, mapApiErrorToText, pushNotification } from '@/helpers';
import { LocalStorageService } from '@/services';

import type { AuthorizeParams } from './types';
import { ProfileFetchMethod } from './types';

export const getProfileAsync = createAsyncThunk<ProfileResponse, void, { rejectValue: string }>(
  ProfileFetchMethod.getProfileAsync,
  async (_, { rejectWithValue, signal }) => {
    try {
      const { data } = await xfiPadApi.getProfile({ signal });

      return data;
    } catch (error) {
      return rejectWithValue(getApiErrorMessage(error));
    }
  }
);

export const authorizeAsync = createAsyncThunk<ProfileResponse, AuthorizeParams, { rejectValue: string }>(
  ProfileFetchMethod.authorizeAsync,
  async ({ signer }, { rejectWithValue }) => {
    try {
      if (!signer.provider) {
        throw new Error('Provider is not defined');
      }

      const { chainId } = await signer.provider.getNetwork();
      const address = await signer.getAddress();
      const { data: nonceData } = await xfiPadApi.getNonce({
        address,
        chainId: toBeHex(chainId),
      });
      const signature = await signer.signMessage(nonceData.msg);
      const { data } = await xfiPadApi.authorize({ address, chainId: toBeHex(chainId), signature });

      LocalStorageService.setTokens({
        accessToken: data.authorizationToken.token,
        refreshToken: data.refreshToken.token,
      });

      const { data: profile } = await xfiPadApi.getProfile();

      return profile;
    } catch (error) {
      if (isAxiosError(error)) {
        const apiMessage = getApiErrorMessage(error);
        const message = mapApiErrorToText(apiMessage);

        pushAuthErrorNotification(message);

        return rejectWithValue(message);
      }

      if (isExtensionActionRejectedError(error)) {
        pushAuthErrorNotification('ERRORS.USER_DENIED_MESSAGE_SIGNATURE');

        return rejectWithValue('ERRORS.USER_DENIED_MESSAGE_SIGNATURE');
      }

      pushAuthErrorNotification('MESSAGES.ERROR');

      return rejectWithValue('MESSAGES.ERROR');
    }
  }
);

const pushAuthErrorNotification = (message: string) => {
  pushNotification({
    type: 'error',
    message: { id: 'ERRORS.AUTH_ERROR' },
    additional: { id: message },
  });
};
