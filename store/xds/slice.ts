import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { LocalStorageService } from '@/services/localStorage';

import { SLICE_NAME, XDS_NAMES_LIMIT } from './constants';
import { getXdsNameAsync, getXdsNameListAsync, getXdsPrimaryNameAsync } from './thunk';
import { ActionPayload, RegistrationData, XdsState } from './types';

const updateAndGetInitialItems = (): RegistrationData[] => {
  if (typeof window === 'undefined') {
    return [];
  }

  const items = LocalStorageService.getXdsRegistrationItems().filter(({ isCompleted }) => !isCompleted);

  LocalStorageService.setXdsRegistrationItems(items);

  return items;
};

const initialState: XdsState = {
  registration: {
    items: updateAndGetInitialItems(),
    currentItem: null,
  },
  isLoadingInit: false,
  primaryNames: {
    names: {},
    isLoading: true,
  },
  nameList: {
    data: [],
    page: 1,
    hasNext: false,
    limit: XDS_NAMES_LIMIT,
  },
  name: {
    data: null,
    isLoading: false,
  },
};

const xdsSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setIsLoadingInit: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoadingInit = payload;
    },
    /**
     * Registration data
     */
    updateRegistrationData: (
      state,
      { payload: { address, chainId, data, name } }: PayloadAction<ActionPayload.UpdateRegistrationData>
    ) => {
      const updatedItems = [...state.registration.items];
      const itemIndex = updatedItems.findIndex(
        ({ payload, chainId: _chainId }) => payload.owner === address && payload.name === name && _chainId === chainId
      );

      if (itemIndex !== -1) {
        updatedItems.splice(itemIndex, 1, data);
      } else {
        updatedItems.push(data);
      }

      state.registration.items = updatedItems;
      LocalStorageService.setXdsRegistrationItems(updatedItems);
    },
    deleteRegistrationData: (
      state,
      { payload: { address, name, chainId } }: PayloadAction<ActionPayload.DeleteRegistrationData>
    ) => {
      const updatedItems = [...state.registration.items];
      const itemIndex = updatedItems.findIndex(
        ({ payload, chainId: _chainId }) => payload.owner === address && payload.name === name && _chainId === chainId
      );

      if (itemIndex !== -1) {
        updatedItems.splice(itemIndex, 1);
        state.registration.items = updatedItems;
        LocalStorageService.setXdsRegistrationItems(updatedItems);
      }
    },
    /**
     * Current registration data
     */
    setCurrentRegistrationData: (state, { payload }: PayloadAction<ActionPayload.SetCurrentRegistrationData>) => {
      state.registration.currentItem = payload;
    },
    updateCurrentRegistrationData: (state, { payload }: PayloadAction<ActionPayload.UpdateCurrentRegistrationData>) => {
      if (state.registration.currentItem) {
        state.registration.currentItem = {
          ...state.registration.currentItem,
          ...payload,
        };
      }
    },

    /**
     * primary name
     */
    setPrimaryName: (state, { payload }: PayloadAction<ActionPayload.SetPrimaryName>) => {
      const { address, name } = payload;

      if (address) {
        state.primaryNames.names[address] = name;
      }
    },

    resetXdsName: state => {
      state.name.data = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(getXdsNameListAsync.pending, state => {
      state.nameList.isLoading = true;
      state.nameList.error = null;
    });
    builder.addCase(getXdsNameListAsync.fulfilled, (state, { payload }) => {
      state.nameList.isLoading = false;
      state.nameList.data = payload.state.data;
      state.nameList.hasNext = payload.state.hasNext;
      state.nameList.limit = payload.state.limit;
      state.nameList.page = payload.state.page;
      state.gracePeriodTimestamp = payload.gracePeriodTimestamp;
    });
    builder.addCase(getXdsNameListAsync.rejected, (state, { payload }) => {
      state.nameList.isLoading = false;
      state.nameList.error = payload;
      state.nameList = initialState.nameList;
    });

    builder.addCase(getXdsNameAsync.pending, state => {
      state.name.isLoading = true;
    });
    builder.addCase(getXdsNameAsync.rejected, state => {
      state.name.isLoading = false;
      state.name.data = null;
    });
    builder.addCase(getXdsNameAsync.fulfilled, (state, { payload }) => {
      state.name.isLoading = false;
      state.gracePeriodTimestamp = payload.gracePeriodTimestamp;
      state.name.data = payload.xdsName;
    });

    builder.addCase(getXdsPrimaryNameAsync.pending, state => {
      state.primaryNames.isLoading = true;
    });
    builder.addCase(getXdsPrimaryNameAsync.rejected, (state, { meta }) => {
      state.primaryNames.isLoading = false;
      state.primaryNames.names[meta.arg] = undefined;
    });
    builder.addCase(getXdsPrimaryNameAsync.fulfilled, (state, { payload, meta }) => {
      state.primaryNames.isLoading = false;
      state.primaryNames.names[meta.arg] = payload;
    });
  },
});

export const {
  updateRegistrationData,
  deleteRegistrationData,

  setCurrentRegistrationData,
  updateCurrentRegistrationData,

  setIsLoadingInit,
  setPrimaryName,
  resetXdsName,
} = xdsSlice.actions;

export default xdsSlice.reducer;
