export enum CosmosCurrency {
  xfi = 'xfi',
  mpx = 'mpx',
}

export type CoinType = {
  amount: string;
  denom: CosmosCurrency;
};

export enum ProposalStatusType {
  UNSPECIFIED = 'UNSPECIFIED',
  PASSED = 'PASSED',
  FAILED = 'FAILED',
  REJECTED = 'REJECTED',
  DEPOSIT_PERIOD = 'DEPOSIT_PERIOD',
  VOTING_PERIOD = 'VOTING_PERIOD',
}
