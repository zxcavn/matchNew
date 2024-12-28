import { createAsyncThunk } from '@reduxjs/toolkit';

import { xfiPadApi } from '@/crud';
import {
  CheckHashParams,
  CheckMissionProgressParams,
  CheckSocialNetworkParams,
  GetMissionListPayload,
  MissionResponse,
} from '@/crud/xfiPad';
import { getApiErrorMessage, mapApiErrorToText, pushNotification } from '@/helpers';
import { ErrorType } from '@/shared/types';

import { MISSION_LIMIT } from './constants';
import { MissionFetchMethod } from './types';

export const getMissionsAsync = createAsyncThunk<MissionResponse, GetMissionListPayload, { rejectValue: string }>(
  MissionFetchMethod.getMissionAsync,
  async (params, { rejectWithValue, signal }) => {
    try {
      const { data } = await xfiPadApi.getMissions(
        {
          ...params,
          offset: 0,
          limit: MISSION_LIMIT,
        },
        { signal }
      );
      const { docs, ...other } = data;

      return { docs, ...other };
    } catch (error) {
      const errorMessage = getApiErrorMessage(error);

      return rejectWithValue(errorMessage);
    }
  }
);

export const checkMissionProgressAsync = createAsyncThunk<void, CheckMissionProgressParams, { rejectValue: ErrorType }>(
  MissionFetchMethod.postMissionAsync,
  async (params, { rejectWithValue }) => {
    try {
      await xfiPadApi.checkMissionProgress(params);
      pushNotification({
        type: 'success',
        message: {
          id: 'NOTIFICATIONS.CONFIRMATION',
        },
        additional: {
          id: 'NOTIFICATIONS.TASK_COMPLETED_SUCCESSFULLY',
        },
      });
    } catch (error) {
      const errorMessage = getApiErrorMessage(error);

      const message = mapApiErrorToText(errorMessage);

      pushNotification({
        type: 'error',
        message: { id: 'NOTIFICATIONS.EXECUTION_ERROR' },
        additional: { id: message },
      });

      return rejectWithValue(message);
    }
  }
);

export const checkSwapMissionAsync = createAsyncThunk<boolean, CheckHashParams, { rejectValue: ErrorType }>(
  MissionFetchMethod.checkSwapMissionAsync,
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await xfiPadApi.checkSwapMpxCrossFi(params);

      if (data.ok) {
        pushNotification({
          type: 'success',
          message: {
            id: 'NOTIFICATIONS.HASH_VERIFICATION',
          },
          additional: {
            id: 'NOTIFICATIONS.HASH_HAS_BEEN_VERIFIED',
          },
        });

        return true;
      } else {
        pushNotification({
          type: 'error',
          message: { id: 'ERRORS.UNEXPECTED_ERROR' },
        });

        return false;
      }
    } catch (error) {
      const errorMessage = getApiErrorMessage(error);

      const message = mapApiErrorToText(errorMessage);

      pushNotification({
        type: 'error',
        message: { id: 'NOTIFICATIONS.EXECUTION_ERROR' },
        additional: { id: message },
      });

      return rejectWithValue(message);
    }
  }
);

export const checkExchangeBuyXfiAsync = createAsyncThunk<boolean, CheckHashParams, { rejectValue: string }>(
  MissionFetchMethod.checkExchangeBuyXfiAsync,
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await xfiPadApi.checkExchangeBuyXfi(params);

      if (data.ok) {
        pushNotification({
          type: 'success',
          message: { id: 'NOTIFICATIONS.HASH_VERIFICATION' },
          additional: { id: 'NOTIFICATIONS.HASH_HAS_BEEN_VERIFIED' },
        });

        return true;
      } else {
        pushNotification({
          type: 'error',
          message: { id: 'ERRORS.UNEXPECTED_ERROR' },
        });

        return false;
      }
    } catch (error) {
      const errorMessage = getApiErrorMessage(error);

      const message = mapApiErrorToText(errorMessage);

      pushNotification({
        type: 'error',
        message: { id: message },
      });

      return rejectWithValue(errorMessage);
    }
  }
);

export const checkSocialNetworkSubscriptionAsync = createAsyncThunk<
  void,
  CheckSocialNetworkParams & {
    missionId: string;
  },
  { rejectValue: ErrorType }
>(MissionFetchMethod.checkSocialNetworkSubscriptionAsync, async (params, { rejectWithValue }) => {
  try {
    await xfiPadApi.checkSocialNetworkSubscription({
      hash: params.hash,
      socialNetwork: params.socialNetwork,
    });
    pushNotification({
      type: 'success',
      message: {
        id: 'NOTIFICATIONS.CONFIRMATION',
      },
      additional: {
        id: 'NOTIFICATIONS.TASK_COMPLETED_SUCCESSFULLY',
      },
    });
  } catch (error) {
    const errorMessage = getApiErrorMessage(error);

    const message = mapApiErrorToText(errorMessage);

    pushNotification({
      type: 'error',
      message: { id: 'NOTIFICATIONS.EXECUTION_ERROR' },
      additional: { id: message },
    });

    return rejectWithValue(message);
  }
});
