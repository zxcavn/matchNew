import { createAsyncThunk } from '@reduxjs/toolkit';

import { cosmosApi } from '@/crud';
import { ProposalResponse, ProposalStatus } from '@/crud/cosmos';
import { getApiErrorMessage } from '@/helpers';

import { PROPOSAL_DEPOSITS_LIMIT, PROPOSAL_VOTES_LIMIT, PROPOSALS_LIMIT } from './constants';
import {
  mapGovParamsResponse,
  mapProposalDepositResponse,
  mapProposalResponse,
  mapProposalVotesResponse,
} from './mappers';
import { GovFetchMethod, GovParams, Proposal, ProposalDeposits, Proposals, ProposalVote, ProposalVotes } from './types';

export const getGovParamsAsync = createAsyncThunk<GovParams, void, { rejectValue: string }>(
  GovFetchMethod.getGovParamsAsync,
  async (_, { rejectWithValue }) => {
    try {
      const [depositResponse, tallyResponse, votingResponse] = await Promise.all([
        cosmosApi.getGovParams({ params_type: 'deposit' }),
        cosmosApi.getGovParams({ params_type: 'tallying' }),
        cosmosApi.getGovParams({ params_type: 'voting' }),
      ]);

      const { deposit_params } = depositResponse.data;
      const { tally_params } = tallyResponse.data;
      const { voting_params } = votingResponse.data;

      return mapGovParamsResponse({
        deposit_params,
        tally_params,
        voting_params,
      });
    } catch (error) {
      const errorMessage = getApiErrorMessage(error);

      return rejectWithValue(errorMessage);
    }
  }
);

export const getProposalsAsync = createAsyncThunk<Proposals, { page: number }, { rejectValue: string }>(
  GovFetchMethod.getProposalsAsync,
  async ({ page }, { rejectWithValue }) => {
    try {
      const offset = (page - 1) * PROPOSALS_LIMIT;

      const { data } = await cosmosApi.getProposals({
        'pagination.count_total': true,
        'pagination.limit': PROPOSALS_LIMIT,
        'pagination.offset': offset,
        'pagination.reverse': true,
      });

      const votingPeriodProposals = data.proposals.filter(proposal => proposal.status === ProposalStatus.VOTING_PERIOD);

      const votesDataPromises = votingPeriodProposals.map(async proposal => {
        const votes = await cosmosApi.getProposalTally({ proposal_id: proposal.proposal_id });

        return { proposal_id: proposal.proposal_id, votes };
      });

      const votesData = await Promise.all(votesDataPromises);

      const updatedProposals: ProposalResponse[] = data.proposals.map(proposal => {
        if (proposal.status === ProposalStatus.VOTING_PERIOD) {
          const proposalVotes = votesData.find(vote => vote.proposal_id === proposal.proposal_id);

          if (proposalVotes) return { ...proposal, final_tally_result: proposalVotes.votes.data.tally };

          return proposal;
        }
        return proposal;
      });

      return { data: updatedProposals.map(mapProposalResponse), pagination: { ...data.pagination, page } };
    } catch (error) {
      const errorMessage = getApiErrorMessage(error);

      return rejectWithValue(errorMessage);
    }
  }
);

export const getProposalDetailsAsync = createAsyncThunk<
  Proposal,
  { proposalId: string; withLoader?: boolean },
  { rejectValue: string }
>(GovFetchMethod.getProposalDetailsAsync, async ({ proposalId }, { rejectWithValue }) => {
  try {
    const {
      data: { proposal },
    } = await cosmosApi.getProposalDetails({
      proposal_id: proposalId,
    });

    if (proposal.status === ProposalStatus.VOTING_PERIOD) {
      const votes = await cosmosApi.getProposalTally({ proposal_id: proposal.proposal_id });

      if (votes) return mapProposalResponse({ ...proposal, final_tally_result: votes.data.tally });
    }

    return mapProposalResponse(proposal);
  } catch (error) {
    const errorMessage = getApiErrorMessage(error);

    return rejectWithValue(errorMessage);
  }
});

export const getProposalDepositsAsync = createAsyncThunk<
  ProposalDeposits,
  { proposalId: string; page: number },
  { rejectValue: string }
>(GovFetchMethod.getProposalDepositsAsync, async ({ proposalId, page }, { rejectWithValue }) => {
  try {
    const offset = (page - 1) * PROPOSAL_DEPOSITS_LIMIT;

    const {
      data: { deposits, pagination },
    } = await cosmosApi.getProposalDeposits({
      proposal_id: proposalId,
      'pagination.count_total': true,
      'pagination.limit': PROPOSAL_DEPOSITS_LIMIT,
      'pagination.offset': offset,
      'pagination.reverse': true,
    });

    return { data: deposits.map(mapProposalDepositResponse), pagination: { ...pagination, page } };
  } catch (error) {
    const errorMessage = getApiErrorMessage(error);

    return rejectWithValue(errorMessage);
  }
});

export const getProposalVotesAsync = createAsyncThunk<
  ProposalVotes,
  { proposalId: string; page: number },
  { rejectValue: string }
>(GovFetchMethod.getProposalVotesAsync, async ({ proposalId, page }, { rejectWithValue }) => {
  try {
    const offset = (page - 1) * PROPOSAL_VOTES_LIMIT;

    const {
      data: { votes, pagination },
    } = await cosmosApi.getProposalVotes({
      proposal_id: proposalId,
      'pagination.count_total': true,
      'pagination.limit': PROPOSAL_VOTES_LIMIT,
      'pagination.offset': offset,
      'pagination.reverse': true,
    });

    return { data: votes.map(mapProposalVotesResponse), pagination: { ...pagination, page } };
  } catch (error) {
    const errorMessage = getApiErrorMessage(error);

    return rejectWithValue(errorMessage);
  }
});

export const getProposalVoteByAddressAsync = createAsyncThunk<
  ProposalVote,
  { proposalId: string; voter: string },
  { rejectValue: string }
>(GovFetchMethod.getProposalVoteByAddressAsync, async ({ proposalId, voter }, { rejectWithValue }) => {
  try {
    const {
      data: { vote },
    } = await cosmosApi.getProposalVoteByAddress({
      proposal_id: proposalId,
      voter,
    });

    return mapProposalVotesResponse(vote);
  } catch (error) {
    const errorMessage = getApiErrorMessage(error);

    return rejectWithValue(errorMessage);
  }
});
