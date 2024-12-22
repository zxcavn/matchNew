import { type CosmosCurrency, ProposalMessageType } from '@/shared/types';

export type PaginationRequest = {
  'pagination.offset': number;
  'pagination.limit': number;
  'pagination.count_total': boolean;
  'pagination.reverse': boolean;
};

export type ProposalsRequest = PaginationRequest;

export type Pagination = {
  next_key: string;
  total: string;
};

export type ProposalsResponse = {
  proposals: ProposalResponse[];
  pagination: Pagination;
};

type ProposalVotesResult = {
  yes: string;
  abstain: string;
  no: string;
  no_with_veto: string;
};

export type TextProposalContent = {
  '@type': ProposalMessageType.TEXT;
  title: string;
  description: string;
};

export type SoftwareUpgradeContent = {
  '@type': ProposalMessageType.SOFTWARE_UPGRADE;
  title: string;
  description: string;
  plan: {
    name: string;
    height: string;
    info: string;
  };
};

export type CommunityPoolSpendContent = {
  '@type': ProposalMessageType.COMMUNITY_POOL_SPEND;
  title: string;
  description: string;
  recipient: string;
  amount: {
    amount: string;
    denom: CosmosCurrency;
  }[];
};

export type ProposalResponse = {
  proposal_id: string;
  content: TextProposalContent | SoftwareUpgradeContent | CommunityPoolSpendContent;
  status: ProposalStatus;
  final_tally_result: ProposalVotesResult;
  submit_time: string;
  deposit_end_time: string;
  total_deposit: {
    denom: string;
    amount: string;
  }[];
  voting_start_time: string;
  voting_end_time: string;
};

export type GovParamsRequest = {
  params_type: 'voting' | 'tallying' | 'deposit';
};

export type GovParamsResponse = {
  voting_params: {
    voting_period: string;
  };
  deposit_params: {
    min_deposit: [
      {
        denom: string;
        amount: string;
      }
    ];
    max_deposit_period: string;
  };
  tally_params: {
    quorum: string;
    threshold: string;
    veto_threshold: string;
  };
};

export type ProposalVotesRequest = PaginationRequest & {
  proposal_id: string;
};

export type ProposalVoteByAddressRequest = {
  proposal_id: string;
  voter: string;
};

export enum ProposalVoteOption {
  VOTE_OPTION_YES = 'VOTE_OPTION_YES',
  VOTE_OPTION_ABSTAIN = 'VOTE_OPTION_ABSTAIN',
  VOTE_OPTION_NO = 'VOTE_OPTION_NO',
  VOTE_OPTION_NO_WITH_VETO = 'VOTE_OPTION_NO_WITH_VETO',
}

export type ProposalVoteResponse = {
  proposal_id: string;
  voter: string;
  option: ProposalVoteOption;
  options: [
    {
      option: ProposalVoteOption;
      weight: string;
    }
  ];
};

export type ProposalVotesResponse = {
  votes: ProposalVoteResponse[];
  pagination: Pagination;
};

export type ProposalVoteByAddressResponse = {
  vote: ProposalVoteResponse;
};

export type ProposalTallyRequest = {
  proposal_id: string;
};

export type ProposalTallyResponse = {
  tally: ProposalVotesResult;
};

export type ProposalDepositsRequest = PaginationRequest & {
  proposal_id: string;
};

export type ProposalDepositResponse = {
  proposal_id: string;
  depositor: string;
  amount: {
    denom: string;
    amount: string;
  }[];
};

export type ProposalDepositsResponse = {
  deposits: ProposalDepositResponse[];
  pagination: Pagination;
};

export enum ProposalStatus {
  UNSPECIFIED = 'PROPOSAL_STATUS_UNSPECIFIED',
  PASSED = 'PROPOSAL_STATUS_PASSED',
  FAILED = 'PROPOSAL_STATUS_FAILED',
  REJECTED = 'PROPOSAL_STATUS_REJECTED',
  DEPOSIT_PERIOD = 'PROPOSAL_STATUS_DEPOSIT_PERIOD',
  VOTING_PERIOD = 'PROPOSAL_STATUS_VOTING_PERIOD',
}

export type ProposalDetailsRequest = {
  proposal_id: string;
};

export type ProposalDetailsResponse = {
  proposal: ProposalResponse;
};
