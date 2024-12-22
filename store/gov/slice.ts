import { createSlice } from '@reduxjs/toolkit';

import { PROPOSAL_DEPOSITS_LIMIT, PROPOSAL_VOTES_LIMIT, PROPOSALS_LIMIT } from './constants';
import {
  getGovParamsAsync,
  getProposalDepositsAsync,
  getProposalDetailsAsync,
  getProposalsAsync,
  getProposalVoteByAddressAsync,
  getProposalVotesAsync,
} from './thunk';
import { GovState, SLICE_NAME } from './types';

const initialState: GovState = {
  govParams: {
    isLoading: false,
  },
  proposals: {
    data: [],
    page: 1,
    pages: 0,
    isLoading: false,
  },
  proposal: {
    isLoading: false,
  },
  votes: {
    data: [],
    page: 1,
    pages: 0,
    isLoading: false,
  },
  deposits: {
    data: [],
    page: 1,
    pages: 0,
    isLoading: false,
  },
  currentVote: {
    isLoading: false,
  },
};

const govSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getGovParamsAsync.pending, state => {
      state.govParams.isLoading = true;
    });
    builder.addCase(getGovParamsAsync.fulfilled, (state, { payload }) => {
      state.govParams.data = payload;
      state.govParams.isLoading = false;
    });
    builder.addCase(getGovParamsAsync.rejected, state => {
      state.govParams.isLoading = false;
    });

    builder.addCase(getProposalsAsync.pending, state => {
      state.proposals.isLoading = true;
    });
    builder.addCase(getProposalsAsync.fulfilled, (state, { payload }) => {
      state.proposals.data = payload.data;
      state.proposals.page = payload.pagination.page;
      state.proposals.pages = Math.ceil(Number(payload.pagination.total) / PROPOSALS_LIMIT);
      state.proposals.isLoading = false;
    });
    builder.addCase(getProposalsAsync.rejected, state => {
      state.proposals.isLoading = false;
    });

    builder.addCase(getProposalDetailsAsync.pending, (state, action) => {
      const withLoader = action.meta.arg?.withLoader ?? true;

      if (withLoader) {
        state.proposal.data = undefined;
        state.proposal.isLoading = true;
      }
    });
    builder.addCase(getProposalDetailsAsync.fulfilled, (state, { payload, meta }) => {
      state.proposal.data = payload;

      const withLoader = meta.arg.withLoader ?? true;

      if (withLoader) {
        state.proposal.isLoading = false;
      }
    });
    builder.addCase(getProposalDetailsAsync.rejected, (state, action) => {
      const withLoader = action.meta.arg?.withLoader ?? true;

      if (withLoader) {
        state.proposal.data = undefined;
        state.proposal.isLoading = false;
      }
    });

    builder.addCase(getProposalDepositsAsync.pending, state => {
      state.deposits.isLoading = true;
    });
    builder.addCase(getProposalDepositsAsync.fulfilled, (state, { payload }) => {
      state.deposits.data = payload.data;
      state.deposits.page = payload.pagination.page;
      state.deposits.pages = Math.ceil(Number(payload.pagination.total) / PROPOSAL_DEPOSITS_LIMIT);
      state.deposits.isLoading = false;
    });
    builder.addCase(getProposalDepositsAsync.rejected, state => {
      state.deposits.isLoading = false;
    });

    builder.addCase(getProposalVotesAsync.pending, state => {
      state.votes.isLoading = true;
    });
    builder.addCase(getProposalVotesAsync.fulfilled, (state, { payload }) => {
      state.votes.data = payload.data;
      state.votes.page = payload.pagination.page;
      state.votes.pages = Math.ceil(Number(payload.pagination.total) / PROPOSAL_VOTES_LIMIT);
      state.votes.isLoading = false;
    });
    builder.addCase(getProposalVotesAsync.rejected, state => {
      state.votes.isLoading = false;
    });

    builder.addCase(getProposalVoteByAddressAsync.pending, state => {
      state.currentVote.data = undefined;
      state.currentVote.isLoading = true;
    });
    builder.addCase(getProposalVoteByAddressAsync.fulfilled, (state, { payload }) => {
      state.currentVote.data = payload;
      state.currentVote.isLoading = false;
    });
    builder.addCase(getProposalVoteByAddressAsync.rejected, state => {
      state.currentVote.data = undefined;
      state.currentVote.isLoading = false;
    });
  },
});

export default govSlice.reducer;
