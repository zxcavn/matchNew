import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { LocalStorageService } from '@/services/localStorage';

import { updateTokenBalancesAsync, updateTokensListAsync } from './thunk';
import { EmpxTokens, SLICE_NAME, StorageToken, WalletStorageTokens, WalletTokensState } from './types';

const initialState: WalletTokensState = {
  tokens: LocalStorageService.get<WalletStorageTokens>('erc20Tokens') || {},
  isLoading: false,
  extraToken: {
    data: null,
  },
  eMpxTokens: {
    eMpx: null,
    mpxCheque: null,
  },
};

const walletTokensSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    addToken: (state, { payload }: { payload: { evmWalletAddress: string; token: StorageToken } }) => {
      const tokens = state.tokens[payload.evmWalletAddress] || [];
      const updatedTokens = [...tokens, payload.token];

      state.tokens[payload.evmWalletAddress] = updatedTokens;
      LocalStorageService.set<WalletStorageTokens>('erc20Tokens', state.tokens);
    },

    deleteToken: (state, { payload }: { payload: { evmWalletAddress: string; contractAddress: string } }) => {
      const tokens = state.tokens[payload.evmWalletAddress] || [];
      const updatedTokens = tokens.filter(({ contractAddress }) => payload.contractAddress !== contractAddress);

      state.tokens[payload.evmWalletAddress] = updatedTokens;
      LocalStorageService.set<WalletStorageTokens>('erc20Tokens', state.tokens);
    },

    setExtraToken: (state, { payload }: PayloadAction<StorageToken | null>) => {
      state.extraToken.data = payload;
    },

    updateExtraTokenBalance: (state, { payload }: PayloadAction<string>) => {
      if (state.extraToken.data) {
        state.extraToken.data.balance = payload;
      }
    },

    setEMpxToken: (state, { payload }: PayloadAction<{ key: keyof EmpxTokens; token: StorageToken | null }>) => {
      const { key, token } = payload;

      state.eMpxTokens[key] = token;
    },

    updateEMpxTokenBalance: (state, { payload }: PayloadAction<{ key: keyof EmpxTokens; balance: string }>) => {
      const { key, balance } = payload;

      if (state.eMpxTokens && state.eMpxTokens[key]) {
        state.eMpxTokens[key]!.balance = balance;
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(updateTokenBalancesAsync.pending, state => {
        state.isLoading = true;
      })
      .addCase(updateTokenBalancesAsync.fulfilled, (state, { payload }) => {
        const { emvWalletAddress, tokens } = payload;

        state.tokens[emvWalletAddress] = tokens;
        LocalStorageService.set<WalletStorageTokens>('erc20Tokens', state.tokens);

        state.isLoading = false;
      })
      .addCase(updateTokensListAsync.pending, state => {
        state.isLoading = true;
      })
      .addCase(updateTokensListAsync.fulfilled, (state, { payload }) => {
        const { emvWalletAddress, tokens } = payload;

        state.tokens[emvWalletAddress] = tokens;
        LocalStorageService.set<WalletStorageTokens>('erc20Tokens', state.tokens);

        state.isLoading = false;
      });
  },
});

export const { addToken, deleteToken, setExtraToken, updateExtraTokenBalance, setEMpxToken, updateEMpxTokenBalance } =
  walletTokensSlice.actions;

export default walletTokensSlice.reducer;
