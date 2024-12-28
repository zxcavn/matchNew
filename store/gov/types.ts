import { Pagination } from '@/crud/cosmos';
import { PaginatedState } from '@/shared/types';

import type {
  mapGovParamsResponse,
  mapProposalDepositResponse,
  mapProposalResponse,
  mapProposalVotesResponse,
} from './mappers';

export const SLICE_NAME = 'GOV';

export const enum GovFetchMethod {
  getGovParamsAsync = `${SLICE_NAME}/getGovParamsAsync`,
  getProposalsAsync = `${SLICE_NAME}/getProposalsAsync`,
  getProposalDetailsAsync = `${SLICE_NAME}/getProposalDetailsAsync`,
  getProposalDepositsAsync = `${SLICE_NAME}/getProposalDepositsAsync`,
  getProposalVotesAsync = `${SLICE_NAME}/getProposalVotesAsync`,
  getProposalVoteByAddressAsync = `${SLICE_NAME}/getProposalVoteByAddressAsync`,
}

export type GovState = {
  govParams: {
    data?: GovParams;
    isLoading: boolean;
  };
  proposals: PaginatedState.Default<Proposal>;
  proposal: {
    data?: Proposal;
    isLoading: boolean;
  };
  votes: PaginatedState.Default<ProposalVote>;
  deposits: PaginatedState.Default<ProposalDeposit>;
  currentVote: {
    data?: ProposalVote;
    isLoading: boolean;
  };
};

export type GovParams = ReturnType<typeof mapGovParamsResponse>;

export type Proposal = ReturnType<typeof mapProposalResponse>;

export type ProposalVote = ReturnType<typeof mapProposalVotesResponse>;

export type ProposalDeposit = ReturnType<typeof mapProposalDepositResponse>;

export type Proposals = {
  data: Proposal[];
  pagination: Pagination & { page: number };
};

export type ProposalVotes = {
  data: ProposalVote[];
  pagination: Pagination & { page: number };
};

export type ProposalDeposits = {
  data: ProposalDeposit[];
  pagination: Pagination & { page: number };
};
