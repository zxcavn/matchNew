import type { CosmosCurrency, ProposalMessageType } from '@/shared/types';

export type TextProposalFormValues = {
  title: string;
  description: string;
};

export type CommunityPoolSpendProposalFormValues = {
  title: string;
  description: string;
  recipient: string;
};

export type SoftwareUpgradeProposalFormValues = {
  title: string;
  description: string;
  name: string;
  height: string;
  info: string;
};

export type CreateProposalFormValues = TextProposalFormValues &
  CommunityPoolSpendProposalFormValues &
  SoftwareUpgradeProposalFormValues;

export type TextProposalValues = TextProposalFormValues & {
  type: ProposalMessageType.TEXT;
};

export type CommunityPoolSpendProposalValues = {
  type: ProposalMessageType.COMMUNITY_POOL_SPEND;
  title: string;
  description: string;
  recipient: string;
  amount: {
    amount: string;
    denom: CosmosCurrency;
  }[];
};

export type SoftwareUpgradeProposalValues = SoftwareUpgradeProposalFormValues & {
  type: ProposalMessageType.SOFTWARE_UPGRADE;
};

export type CreateProposalOutputValues =
  | TextProposalValues
  | SoftwareUpgradeProposalValues
  | CommunityPoolSpendProposalValues;
