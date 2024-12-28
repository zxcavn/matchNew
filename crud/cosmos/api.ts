import urlJoin from 'url-join';

import { cosmosAxiosInstance } from './axiosInstance';
import {
  GovParamsRequest,
  GovParamsResponse,
  ProposalDepositsRequest,
  ProposalDepositsResponse,
  ProposalDetailsRequest,
  ProposalDetailsResponse,
  ProposalsRequest,
  ProposalsResponse,
  ProposalTallyRequest,
  ProposalTallyResponse,
  ProposalVoteByAddressRequest,
  ProposalVoteByAddressResponse,
  ProposalVotesRequest,
  ProposalVotesResponse,
} from './types';

export const PARAMS = '/gov/v1beta1/params';
export const PROPOSALS = '/gov/v1beta1/proposals';

const cosmosApi = {
  getGovParams: ({ params_type }: GovParamsRequest) => {
    return cosmosAxiosInstance.get<GovParamsResponse>(urlJoin(PARAMS, params_type));
  },
  getProposals: (params: ProposalsRequest) => {
    return cosmosAxiosInstance.get<ProposalsResponse>(PROPOSALS, { params });
  },
  getProposalDetails: ({ proposal_id }: ProposalDetailsRequest) => {
    return cosmosAxiosInstance.get<ProposalDetailsResponse>(urlJoin(PROPOSALS, proposal_id));
  },
  getProposalVotes: ({ proposal_id, ...params }: ProposalVotesRequest) => {
    return cosmosAxiosInstance.get<ProposalVotesResponse>(urlJoin(PROPOSALS, proposal_id, 'votes'), { params });
  },
  getProposalVoteByAddress: ({ proposal_id, voter }: ProposalVoteByAddressRequest) => {
    return cosmosAxiosInstance.get<ProposalVoteByAddressResponse>(urlJoin(PROPOSALS, proposal_id, 'votes', voter));
  },
  getProposalTally: ({ proposal_id, ...params }: ProposalTallyRequest) => {
    return cosmosAxiosInstance.get<ProposalTallyResponse>(urlJoin(PROPOSALS, proposal_id, 'tally'), { params });
  },
  getProposalDeposits: ({ proposal_id, ...params }: ProposalDepositsRequest) => {
    return cosmosAxiosInstance.get<ProposalDepositsResponse>(urlJoin(PROPOSALS, proposal_id, 'deposits'), { params });
  },
};

export default cosmosApi;
