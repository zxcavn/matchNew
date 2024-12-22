import { createAsyncThunk } from '@reduxjs/toolkit';

import { xfiScanApi } from '@/crud/xfiScan';
import { getApiErrorMessage, normalizeName } from '@/helpers';

import type { RootState } from '../index';
import { XDS_NAMES_LIMIT } from './constants';
import { mapXdsNameResponse } from './mappers';
import {
  GetXdsNameListThunkParams,
  GetXdsNameListThunkResponse,
  GetXdsNameThunkParams,
  GetXdsNameThunkResponse,
  XdsFetchMethod,
} from './types';

const getXdsGracePeriod = async (getState: () => RootState) => {
  const gracePeriodTimestamp = getState().xds.gracePeriodTimestamp;

  if (gracePeriodTimestamp) {
    return gracePeriodTimestamp;
  }

  const { data } = await xfiScanApi.getXdsGracePeriod();

  return data.gracePeriod;
};

export const getXdsNameListAsync = createAsyncThunk<
  GetXdsNameListThunkResponse,
  GetXdsNameListThunkParams,
  { rejectValue: string; state: RootState }
>(XdsFetchMethod.getXdsNameListAsync, async ({ owner, page = 1 }, { rejectWithValue, getState, signal }) => {
  try {
    const { data: response } = await xfiScanApi.getXdsNames(
      { limit: XDS_NAMES_LIMIT, sort: '-primary -createDate', page, owner },
      { signal }
    );
    const gracePeriodTimestamp = await getXdsGracePeriod(getState);

    return {
      state: {
        data: response.docs.map(xdsNameResponse => mapXdsNameResponse(xdsNameResponse, gracePeriodTimestamp)),
        ...response,
      },
      gracePeriodTimestamp,
    };
  } catch (error) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});

export const getXdsNameAsync = createAsyncThunk<
  GetXdsNameThunkResponse,
  GetXdsNameThunkParams,
  { rejectValue: string; state: RootState }
>(XdsFetchMethod.getXdsNameAsync, async ({ label, ownerAddress }, { rejectWithValue, signal, getState }) => {
  try {
    const { data } = await xfiScanApi.getXdsName(label, { signal });
    const gracePeriodTimestamp = await getXdsGracePeriod(getState);
    const name = !ownerAddress ? data : ownerAddress.toLowerCase() === data.owner.toLowerCase() && data;

    return {
      xdsName: name ? mapXdsNameResponse(name, gracePeriodTimestamp) : null,
      gracePeriodTimestamp,
    };
  } catch (error) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});

export const getXdsPrimaryNameAsync = createAsyncThunk<string | undefined, string, { rejectValue: string }>(
  XdsFetchMethod.getXdsPrimaryNameAsync,
  async (address, { rejectWithValue, signal }) => {
    try {
      const { data: response } = await xfiScanApi.getXdsNames(
        { page: 1, limit: 1, address, primary: true },
        { signal }
      );
      const [data] = response.docs;

      return data && normalizeName(data.name)?.name;
    } catch (error) {
      return rejectWithValue(getApiErrorMessage(error));
    }
  }
);
