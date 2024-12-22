import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NftStorageService } from '@/services';
import { DEFAULT_SHORT_PAGINATED_STATE } from '@/shared/types';

import { getTokenInventoryAsync } from './thunk';
import { PREFIX, TokenInventoryState } from './types';

const initialState: TokenInventoryState = { ...DEFAULT_SHORT_PAGINATED_STATE, isLoading: false };
const tokenInventorySlice = createSlice({
  name: PREFIX,
  initialState,
  reducers: {
    getLocalStorageTokenInventory: (state, action: PayloadAction<{ ownerAddress: string }>) => {
      const { ownerAddress } = action.payload;

      state.data = NftStorageService.getAll(ownerAddress.toLowerCase());
    },
    removeTokenInventoryItem: (
      state,
      action: PayloadAction<{ ownerAddress: string; contractAddress: string; tokenId: string }>
    ) => {
      const { ownerAddress, contractAddress, tokenId } = action.payload;

      NftStorageService.removeItem(ownerAddress, contractAddress, tokenId);

      state.data = NftStorageService.getAll(ownerAddress);
    },
  },
  extraReducers: builder => {
    builder.addCase(getTokenInventoryAsync.pending, (state, { meta }) => {
      const ownerAddress = meta.arg.ownerAddress;

      state.isLoading = true;
      state.error = null;
      if (ownerAddress) state.data = NftStorageService.getAll(ownerAddress);
    });
    builder.addCase(getTokenInventoryAsync.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    });
    builder.addCase(getTokenInventoryAsync.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.data = payload.docs;
      state.hasNext = payload.hasNext;
      state.limit = payload.limit;
      state.page = payload.page;
    });
  },
});

export default tokenInventorySlice.reducer;

export const { getLocalStorageTokenInventory, removeTokenInventoryItem } = tokenInventorySlice.actions;
