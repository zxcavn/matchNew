import { createAsyncThunk } from '@reduxjs/toolkit';

import { TokenType, xfiScanApi } from '@/crud';
import type { GetTokenInventoryParams, TokenInventoryListResponse } from '@/crud/xfiScan';
import { getApiErrorMessage } from '@/helpers';
import { NftStorageService } from '@/services';
import type { ErrorType } from '@/shared/types';
import type { RootState } from '@/store';
import { TOKEN_INVENTORY_LIMIT } from '@/store/tokenInventory/constants';

import { PREFIX, TokenInventoryFetchMethodsEnum } from './types';

export const getTokenInventoryAsync = createAsyncThunk<
  TokenInventoryListResponse,
  GetTokenInventoryParams,
  { rejectValue: ErrorType; state: RootState }
>(`${PREFIX}/${TokenInventoryFetchMethodsEnum.getTokenInventory}`, async ({ ownerAddress }, { rejectWithValue }) => {
  try {
    const { data } = await xfiScanApi.getTokenInventory({
      limit: TOKEN_INVENTORY_LIMIT,
      tokenType: TokenType.CFC_721,
      page: 1,
      ownerAddress,
    });

    const newItems = data.docs.map(({ ownerAddress, contractAddress, tokenId, tokenName, metadata }) => ({
      ownerAddress,
      contractAddress,
      tokenId,
      tokenName,
      metadata,
    }));

    NftStorageService.syncItems(ownerAddress, newItems);

    return { ...data, docs: NftStorageService.getAll(ownerAddress) };
  } catch (error) {
    return rejectWithValue(getApiErrorMessage(error));
  }
});
